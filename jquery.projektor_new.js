(function ($) {
    var supports3d = false;

    // get transition information for the current browser
    var _transitionInfo = '';
    (function () {
        var 
			t
			, el = document.createElement('fakeelement')
			, transitions = {
			    'transition': {
			        transitionEnd: 'transitionEnd'
                    , prefix: ''
			    },
			    'MSTransition': {
			        transitionEnd: 'msTransitionEnd'
                    , prefix: '-ms-'
			    },
			    'MozTransition': {
			        transitionEnd: 'animationend'
                    , prefix: '-moz-'
			    },
			    'WebkitTransition': {
			        transitionEnd: 'webkitTransitionEnd'
                    , prefix: '-webkit-'
			    }
			};

        for (t in transitions) {
            if (el.style[t] !== undefined) {
                _transitionInfo = transitions[t];
                break;
            }
        }

    } ());


    $.fn.projektor = function () {
        var args = Array.prototype.slice.call(arguments);
        return this.each(function () {
            var $this = $(this);

            if (typeof args[0] === 'string') {
                //remove the command name from the arguments
                var action = args[0];
                args.splice(0, 1);

                var projektor = $this.data('projektor');
                if (projektor && typeof projektor[action] == 'function') {
                    projektor[action](args);
                }
            }
            else {
                //create video player if it doesn't already exist
                if (!$this.data('projektor')) {
                    var projektor = new Projektor($this, args[0]);
                    $this.data('projektor', projektor);
                }
            }
        });
    };

    function Projektor($el, options) {
        this.$el = $el;
        this.options = $.extend({}, this._defaults, options);

        this.fps = 1000 / this.options.fps;
        this.lastFramePlayedAt = +new Date();
        this.stagewidth = $el.width();
        this.stageHeight = $el.height();
        this.spritePlaying = this.options.spriteSrcs.length - 1;
        this.keyframeOffset = 0;
        this.sprites = [];

        this.isPlayed = false;
        this.hasPlayed = false;
        this.finished = false;

        this.totalFrames = 0;
        this.currentFrame = 0;

        if ( this.options.spriteSrcs.length == 0 ) {
            this.getSpritesFromImages.call(this);
        }
        this.$el.css({position: 'relative', overflow: 'hidden'})
        this.options.onInit.call(self);
    };

     Projektor.prototype = {
        _defaults: {
            repeat: false
            , repeatDelay: 0
            , fps: 14
            , spinnerSrc: 'img/spinner.gif'
            , showSpinner: true
            , spinnerClass: 'spinner'
            , intId: 0
            , lastFramePlayedAt: 0
            , onInit: $.noop
            , onLoadStart: $.noop
            , onImagesLoaded: $.noop
            , onPlayStart: $.noop
            , onPlayEnd: $.noop
            , onStop: $.noop
            , onImageLoadTick: $.noop
            , didInit: false
            , spriteSrcs: []
            , direction: 'forward'
            , playTo: 20
        }

        , getSpritesFromImages: function() {
            var self = this;
            var sprites = this.$el.find('img');
            sprites.each( function() {
                self.options.spriteSrcs.push($(this).attr('src') || $(this).data('src'));
                $(this).remove();
            });
        }

        , play: function () {
            var self = this;
            if ( this.isPlaying) {
                this.stop();
            }
            this.isPlaying = true;
            self.options.direction = 'forward';
            // if we're coming back to the video in the middle of it
            // resume where it left off
            if (this.hasPlayed && !this.isFinished) {
                self.advance();
            }
            // otherwise, go through the loading process again
            // regardless if the video has already played
            else {
                this.hasPlayed = true;
                this.reset();
                this.removeSprites();
                this.loadSprites()
                    .fail(function () {
                        // img loading failed for whatever reason
                        // handle it here
                    })
                    // two opacity changes: one for the top image and one for the previous one to make sure it's ready
                    .done(function () {
                        $(self.sprites[self.sprites.length - 1])
                            .hide()
                            .css('opacity','1')
                            .fadeIn(400, function () {
                                self.advance()
                            }).prev().css('opacity','1');
                    });
            }
        }

        , rewind: function () {
            var self = this;
            if ( this.isPlaying) {
                this.stop();
            }
            this.isPlaying = true;
            self.options.direction = 'reverse';

            

            // $(self.sprites).css('opacity','1');
            // if we're coming back to the video in the middle of it
            // resume where it left off
            if ((this.hasPlayed && !this.isFinished) || this.spritePlaying == 0 ) {
                $(self.sprites).eq(self.spritePlaying+1).css('opacity','1');
                self.keyframeOffset = parseInt($(self.sprites).eq(self.spritePlaying).attr('data-keyframes') - self.keyframeOffset);

                self.advance();
            }

            // otherwise, go through the loading process again
            // regardless if the video has already played
            else {
                this.hasPlayed = true;
                this.reset();
                this.removeSprites();
                this.loadSprites()
                    .fail(function () {
                        // img loading failed for whatever reason
                        // handle it here
                    })
                    // two opacity changes: one for the top image and one for the previous one to make sure it's ready
                    .done(function () {
                        self.currentFrame = self.totalFrames;
                        $(self.sprites).eq(self.spritePlaying).css('opacity','1');
                        $(self.sprites[self.sprites.length - 1])
                            .hide()
                            .css('opacity','1')
                            .fadeIn(400, function () {
                                self.advance()
                            }).prev().css('opacity','1');
                    });
            }
        }

        , stop: function () {
            if (this.isPlaying) {
                this.isPlaying = false;
                window.cancelAnimationFrame(this.intId);
                this.getRealCurrentFrame();
                this.options.onStop.call(this);
            }
        }

        , getRealCurrentFrame: function() {
            var self = this;
            var def = new $.Deferred();
            var sprite = self.sprites[self.spritePlaying];
            var spriteTop = parseInt(sprite.style.top, 10);
            self.keyframeOffset = Math.abs(spriteTop / this.stageHeight)+1;
            var newFrameNum = 0;
            $(sprite).nextAll().each( function() {
                newFrameNum += parseInt($(this).data('keyframes'), 10);
                // alert( newFrameNum);
            });
            newFrameNum += self.keyframeOffset; 
            // alert( newFrameNum);
            $(sprite).css('opacity','1');
            // $('#frameNum').val(newFrameNum);
            self.frameNum = newFrameNum;
            console.dir({
                'currentFrame': self.currentFrame, 
                'spritePlaying': this.spritePlaying,
                'spriteTop': parseInt(sprite.style.top, 10),
                'frameOffset': this.keyframeOffset,
                'spriteSrc': sprite.src 
            });
        }

         

        // returns a dfd object that gets resolved when sprites are finished loading
        , loadSprites: function () {
            // delete any old sprites
            this.deleteSprites(this.sprites);

            this.options.onLoadStart.call(this);

            var self = this;
            var def = new $.Deferred();
            var srcs = this.options.spriteSrcs;
            var total = srcs.length;
            var i = total;
            //var sprites = [];
            var loaded = 0;

            // load the images in reverse to prevent flashes of loading images
            while (i--) {
                var img = new Image();
                img.className = 'sprite';
                img.src = srcs[i];
                this.sprites.push(img);
            }

            // reverse them so they're in the right order and prepend them
            this.sprites.reverse();
            this.$el.prepend(this.sprites);
            var allSprites = self.$el.find('.sprite');
            allSprites.css({'opacity':'0', 'position': 'absolute'});

            self.totalFrames = 0;
            // onLoad event for sprites
            allSprites.unbind('load').bind('load', function () {
                loaded++;
                self.options.onImageLoadTick.call(self, loaded, total);
                var keyFrames = Math.round($(this).height() / self.stageHeight);
                $(this).attr('data-keyframes', keyFrames);
                self.totalFrames += keyFrames;

                if ( self.options.direction == 'reverse') {
                    $(this).css('top',-Math.abs($(this).height()));
                }
                // console.log('loaded: ' + loaded);
                if (loaded == total) {
                    self.$el.find('.sprite').unbind('load');
                    self.options.onImagesLoaded.call(self);
                    console.log("Total Frames: "+ self.totalFrames);
                    def.resolve();
                }
            });

            
            return def;
        }

        , advance: function () {
            var def = new $.Deferred();
            var self = this;
            var direction = this.options.direction;
            this.isFinished = false;
            
            self.options.onPlayStart.call(self);

            (function loop() {
                self.intId = window.requestAnimationFrame(loop);
                var lastPlayed = +new Date() - self.lastFramePlayedAt;

                if (lastPlayed >= self.fps) {
                    // console.log(lastPlayed);
                    var sprite = self.sprites[self.spritePlaying]; // grab the current sprite

                    // if there's no sprite, something went wrong so cancel animation 
                    if (!sprite) {
                        window.cancelAnimationFrame(self.intId);
                        return;
                    }

                    var keyframes = +sprite.getAttribute('data-keyframes'); // how many keyframes does it have? inquiring minds and the like
                    // console.log(keyframes);
                    // if it's the last sprite (remember, we count down backwards) and we're at the last keyframe, we're done!
                    if (  direction == 'forward' && ( self.spritePlaying == 0 && self.keyframeOffset == keyframes)
                        || ( direction == 'reverse' && ( self.spritePlaying == self.sprites.length-1 && self.keyframeOffset == keyframes) )) {
                        def.resolve();
                        self.reachedEnd();
                        return;
                    }
                    
                    // we pass the last frame because we like it when z stacking works in our favor (the next sprite's keyframe will show through below the last-played sprite)
                    if ((direction == 'forward' && self.keyframeOffset == keyframes + 1 ) || (direction == 'reverse' && self.keyframeOffset == keyframes)) {

                        // console.log( self.spritePlaying);

                        // remove it from the dom, we don't want a huge image hanging around to eat up memory
                        var parent = sprite.parentNode;

                        if (!!parent) {
                            // sprite.src = '';
                            // sprite.parentNode.removeChild(sprite);
                            $(sprite).css('opacity','0');
                            
                            if ( direction == 'reverse') {
                                self.spritePlaying++;
                                $(sprite).nextAll().eq(0).css('opacity','1');
                            }
                            else {
                                // $(sprite).css('opacity','0');
                                self.spritePlaying--;
                                self.currentFrame--;
                                $(sprite).prevAll().eq(1).css('opacity','1');
                            }
                            
                            // reset everything
                            sprite = self.sprites[self.spritePlaying];

                            // console.log( self.spritePlaying);
                            keyframes = +sprite.getAttribute('data-keyframes');
                            self.keyframeOffset = 0;
                        }
                        else {
                            self.stop();
                            return;
                        }
                    }
                    // $sprite.css('top', -$self.keyframeOffset * $self.stageHeight); // move to the next keyframe
                    
                    if ( direction == 'reverse') {
                        var pos = $(sprite).position();
                        var yPos = pos.top + self.stageHeight;
                        self.currentFrame--;
                        // console.log('rev');
                    }
                    else {
                        var yPos = -Math.abs(self.keyframeOffset * self.stageHeight);
                        self.currentFrame++;
                        // console.log('fwd');
                    }
                    // console.log(yPos);
                    sprite.style.top = yPos + 'px';
                    // console.log(self.keyframeOffset);
                    console.log(self.currentFrame);
                    self.keyframeOffset++;

                    self.lastFramePlayedAt = +new Date();
                    if ( self.currentFrame == self.options.playTo) {
                        window.cancelAnimationFrame(self.intId);
                        self.stop();
                        return;
                    }
                    $('#frameNum').val(self.currentFrame);
                }

            } ());

            return def;
        }

        , reachedEnd: function () {
            this.options.onPlayEnd.call(this);
            this.isFinished = true;
            this.keyframeOffset = 0;
            this.stop();

            // this.deleteSprites(this.sprites);
        }

        , deleteSprites: function (spriteList) {
            var l = spriteList.length;
            while (l--) {

                // keep the last sprite src there for display purposes
                if (l !== 0) {
                    spriteList[l].src = ''
                }

                delete spriteList[l];
            }
            spriteList.length = 0;
        }

        , reset: function () {
            this.keyframeOffset = 0;
            this.currentFrame = 0;
            if ( this.options.direction == 'reverse'){
                this.spritePlaying = 0;
                this.currentFrame = this.totalFrames;
            }
            else {
                this.spritePlaying = this.options.spriteSrcs.length - 1;
            }
            this.isFinished = true;
            this.deleteSprites(this.sprites);
        }

        , removeSprites: function () {
            //remove possible remaining sprite from previous plays
            this.$el.find('.sprite').remove();
        }
    };

    // any dom dependent junk in here
    $(function () {
        supports3d = ($('html').hasClass('csstransforms3d'));
    });

})(jQuery);  