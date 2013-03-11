(function ($) {
    
    window.requestAnimFrame = (function(){
        return  
            window.requestAnimationFrame       || 
            window.webkitRequestAnimationFrame || 
            window.mozRequestAnimationFrame    || 
            window.oRequestAnimationFrame      || 
            window.msRequestAnimationFrame     || 
            function(/* function */ callback){
                window.setTimeout(callback, 1000 / 60);
            };
    })();
    
    var supports3d = false;
    
    function has3d() {
        var el = document.createElement('p'), 
            has3d,
            transforms = {
                'webkitTransform':'-webkit-transform',
                'OTransform':'-o-transform',
                'msTransform':'-ms-transform',
                'MozTransform':'-moz-transform',
                'transform':'transform'
            };

        // Add it to the body to get the computed style.
        document.body.insertBefore(el, null);

        for (var t in transforms) {
            if (el.style[t] !== undefined) {
                el.style[t] = "translateY(1px)";
                has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
            }
        }
        document.body.removeChild(el);
        return (has3d !== undefined && has3d.length > 0 && has3d !== "none");
    }

    // Public methods
    var commands = {
        play: play,
        stop: stop,
        reset: reset
    };

    $(document).ready( function() {
        supports3d = has3d();
    });

    $.fn.projektor = function () {
        var opts = arguments;
        
        return this.each( function() {
            if (typeof opts[0] === 'string') {
                //execute string comand on projektor  
                var property = opts[1];
                //remove the command name from the arguments  
                var args = Array.prototype.slice.call(opts);
                args.splice(0, 1);
                commands[opts[0]].apply($(this), args);
            }
            else {
                //create video player
                init.apply($(this), opts);
            }
        });
    };

    function init(options) {
        console.log(supports3d);
        // initialisation code
        if (options) {
            if (options.repeat) {
                this.repeat = options.repeat;
            }
            if (options.repeatDelay) {
                this.repeatDelay = options.repeatDelay;
            }
            if (options.fps) {
                this.fps = options.fps;
            }
            if (options.spinner) {
                this.spinner = options.spinner;
            }
            if (options.showSpinner) {
                this.showSpinner = options.showSpinner;
            }
        }
        else {
            options = {};
        }
        this.didInit = false;
        this.sprites = this.find('.sprite').css('position', 'absolute');
        this.stagewidth = this.width();
        this.stageHeight = this.height();
        this.repeat = options.repeat || false ;
        this.repeatDelay = options.repeatDelay || 0;
        this.fps = 1000 / (options.fps || 30);
        this.spinner = options.spinner || 'img/spinner.gif';
        this.showSpinner = options.showSpinner || true;
        this.intId = 0;

        this.totalSprites = this.sprites.length;
        this.loadedSprites = 0;
        this.spritesLoaded = false;

        this.spritePlaying = this.totalSprites - 1;
        this.keyframeOffset = 0;

        $(this).data('projektor', this);
        if ( this.showSpinner ) {
            var spinner = getSpinner.call($(this));
            $(this).append(spinner);
        }
        // console.log($self.sprites);
        loadSprites.apply($(this), arguments);
    }

    function getSpinner() {
        var $self = this.data('projektor');
        var $spinner = $('<img class="spinner" />');
        $spinner.attr('src', $self.spinner).bind('load', function() {
            var spinnerHeight = $(this).height();
            var spinnerWidth = $(this).width();
            $spinner.css({ 
                position: 'absolute',
                left: '50%',
                top: '50%',
                'z-index': '25',
                'margin-top': '-'+ Number(spinnerHeight/2) +'px',
                'margin-left': '-'+ Number(spinnerWidth/2) +'px'
            });
        }).each(function(){
        if (this.complete || this.complete === undefined){ 
                this.src = this.src;
            }
        });
        return $spinner;
    }

    function loadSprites() {
        var $self = $(this).data('projektor');
        var that = this;
        $self.sprites.each(function(i, val){
            $(this).attr('src', $(this).data('src')).bind('load', function() {
                $self.loadedSprites++;
                var kf = Math.round($(this).height() / $self.stageHeight);
                $(this).data('keyframes', kf).data('isLoaded', true);
                // console.log('Sprite ' + $self.loadedSprites + ' of ' + $self.totalSprites + ' loaded.');
                if ($self.loadedSprites == $self.totalSprites) {
                    // Chill for a second
                    setTimeout(function () {
                        $self.spritesLoaded = true;
                        console.log('all sprites loaded');
                        $(that).find('.spinner').remove();
                        $self.didInit = true;
                        return;
                    }, 1000);
                }
            }).each(function(){
            if (this.complete || this.complete === undefined){ 
                    this.src = this.src;
                }
            });
        });
    }

    //Exposed functions
    function play(options) {
        var $self = this.data('projektor');
        var that = this;
        if (options) {
            if (options.repeat) {
                $self.repeat = options.repeat;
            }
            if (options.repeatDelay) {
                $self.repeatDelay = options.repeatDelay;
            }
        }
        else {
            options = {};
        }
        //code to play media
        var play = setInterval(function () {
            if ($self.spritesLoaded) {
                clearInterval(play);
                clearInterval($self.intId);
                $self.intId = setInterval(function () { advance.call($(that)); }, $self.fps);
            }
            console.log('play');
        }, 500);

    }

    function advance() {
        var $self = this.data('projektor');
        var $sprite = $self.sprites.eq($self.spritePlaying), // grab the current sprite

        // how many keyframes does it have? inquiring minds and the like
        keyframes = $sprite.data('keyframes'); 
        // if it's the last sprite (remember, we count down backwards) and we're at the last keyframe, we're done!
        if ($self.spritePlaying == 0 && $self.keyframeOffset == keyframes) { 
            reachedEnd.call($(this));
            return;
        }
        // we pass the last frame because we like it when z stacking works in our favor (the next sprite's keyframe will show through below the last-played sprite)
        if ($self.keyframeOffset == keyframes + 1) { 
            // remove it from the dom, we don't want a huge image hanging around to eat up memory
            // $sprite.remove(); 
            $self.spritePlaying--;

            // reset everything
            $sprite = $self.sprites.eq($self.spritePlaying);
            keyframes = $sprite.data('keyframes');
            $self.keyframeOffset = 0;
        }
        // $sprite.css('top', -$self.keyframeOffset * $self.stageHeight); // move to the next keyframe
        var yPos = -Math.abs($self.keyframeOffset * $self.stageHeight);
        moveSprite($sprite, yPos );
        $self.keyframeOffset++;
    }

    function moveSprite(el, yPos)  {
        
        // Hardware acceleration doesn't really make a dif if you're repainting each
        supports3d = false;
        if ( supports3d ) {
            var s = "translateY("+ yPos + "px)";
            el.css({
                '-webkit-transform': s,
                '-moz-transform': s,
                '-ms-transform': s,
                'transform': s
            });
        }
        else {
            el.css('top', yPos );
        }
    }

    function reachedEnd() {
        var $self = this.data('projektor');
        var that = this;
        clearInterval($self.intId);
        if ($self.repeat) {
            setTimeout(function () {
                reset.call($(that));
                play.call($(that));
            }, $self.repeatDelay);

        }
        else {
            stop.call($(that));
        }
        // return;
    }

    function stop() {
        //code to stop media
        var $self = this.data('projektor');
        clearInterval($self.intId);
        console.log('stop');
    }

    function reset() {
        // reset to default
        var $self = this.data('projektor');
        // console.log($self);
        $self.sprites.each(function () {
            $(this).css('top', '0').removeClass('hide');
            moveSprite($(this), 0 );
            $self.keyframeOffset = 0;
            $self.spritePlaying = $self.totalSprites - 1;
        });
    }

})(jQuery);  