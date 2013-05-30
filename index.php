<!DOCTYPE html>
<html>
    <head>
        <title>Win 8 Prototype</title>
        <link rel="stylesheet" href="main.css" type="text/css" />
        <script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
        <script src="request_anim_frame.js"></script>
        <script src="jquery.projektor_new.js"></script>
        <script type="text/javascript">
        var stops = [0, 40, 70, 108, 150, 174];
        var currentStop = 0;
        var startScroll = 0;

        $(function () {
            $('.video-player').each(function () {
                var self = $(this);
                $(this).projektor({
                    onInit: function () {
                    },
                    onStop: function() {
                        var self = this;
                        setupScroll();
                        // this.reset();
                        // this.$el.unbind('click').bind('click', function() {

                        //     self.rewind();
                        // });
                    }
                });  
            });
            $('#btn_play').click( function() {
                $(this).parents('.video-player-container').find('.video-player').projektor('play');
            });
            $('#btn_rewind').click( function() {
                $(this).parents('.video-player-container').find('.video-player').projektor('rewind');
            });
            $('#btn_pause').click( function() {
                $(this).parents('.video-player-container').find('.video-player').projektor('stop');
            });

            $('#sliderVal').val(stops[currentStop]);
            $('#btn_prev').click( function() {
                changeStop('rev');
            });
            $('#btn_next').click( function() {
                changeStop('fwd');
            });

            
            $('#sliderVal').bind('change', function() {
                $(this).parents('.video-player-container').find('.video-player').projektor('stopAt', $(this).val() );
            });
            $('#sliderVal').trigger('change');
            
            // $(window).bind('DOMMouseScroll', function(e){
            //     if(e.originalEvent.detail > 0) {
            //     //scroll down
            //         startScroll += 3;
                    
            //     }else {
            //     //scroll up
            //         startScroll -= 3;
                    
            //     }
            //     if ( $('#sliderVal').val() < 0  ) {
            //         startScroll = 0;
            //     }
            //     if ( !!window.totalFrames && $('#sliderVal').val() > window.totalFrames  ) {
            //        startScroll = window.totalFrames;
            //     }
            //     if ( startScroll > $('#sliderVal').val() ) {
            //         $('#sliderVal').parents('.video-player-container').find('.video-player').projektor('stop').projektor('play');

            //     }
            //     else if ( startScroll < $('#sliderVal').val() ) {
            //         $('#sliderVal').parents('.video-player-container').find('.video-player').projektor('stop').projektor('rewind');
            //     }
            //      $('#sliderVal').val(startScroll).trigger('change');
            //     //prevent page fom scrolling
            //     return false;

                
            // });  

            function changeStop(dir) {
                if ( dir == 'rev' ) {
                    if ( currentStop > 0 ) {
                        currentStop--;
                        $('#sliderVal').val(stops[currentStop]).trigger('change');
                        $('#sliderVal').parents('.video-player-container').find('.video-player').projektor('stop').projektor('rewind');
                    }
                }
                else {
                    if ( currentStop < stops.length-1 ) {
                        currentStop++;
                        $('#sliderVal').val(stops[currentStop]).trigger('change');
                        $('#sliderVal').parents('.video-player-container').find('.video-player').projektor('stop').projektor('play');
                    }
                }

            }
            function setupScroll() {
                if(window.addEventListener) { document.addEventListener('DOMMouseScroll', scrollHandler, true); } 
                document.onmousewheel = scrollHandler;
            }
            setupScroll();
            function scrollHandler(e) {
                e.preventDefault();
                if(window.addEventListener) { document.removeEventListener('DOMMouseScroll', scrollHandler, false);}
                $(document).unbind('mousewheel');
                var dir = e.wheelDelta*-1 || e.detail ;
                if ( dir > 0 ) {
                    changeStop('fwd');
                }
                else {
                    changeStop('rev');
                }
            }
        });
        </script>
    </head>

    <body>  
        <div id="main-content">
            
            <div class="video-player-container">
                <div class="video-player" style="width: 1366px; height: 694px;">
                    <img data-src="img/strips/ContactSheet-025.jpg" />
                    <img data-src="img/strips/ContactSheet-024.jpg" />
                    <img data-src="img/strips/ContactSheet-023.jpg" />
                    <img data-src="img/strips/ContactSheet-022.jpg" />
                    <img data-src="img/strips/ContactSheet-021.jpg" />
                    <img data-src="img/strips/ContactSheet-020.jpg" />
                    <img data-src="img/strips/ContactSheet-019.jpg" />
                    <img data-src="img/strips/ContactSheet-018.jpg" />
                    <img data-src="img/strips/ContactSheet-017.jpg" />
                    <img data-src="img/strips/ContactSheet-016.jpg" />
                    <img data-src="img/strips/ContactSheet-015.jpg" />
                    <img data-src="img/strips/ContactSheet-014.jpg" />
                    <img data-src="img/strips/ContactSheet-013.jpg" />
                    <img data-src="img/strips/ContactSheet-012.jpg" />
                    <img data-src="img/strips/ContactSheet-011.jpg" />
                    <img data-src="img/strips/ContactSheet-010.jpg" />
                    <img data-src="img/strips/ContactSheet-009.jpg" />
                    <img data-src="img/strips/ContactSheet-008.jpg" />
                    <img data-src="img/strips/ContactSheet-007.jpg" />
                    <img data-src="img/strips/ContactSheet-006.jpg" />
                    <img data-src="img/strips/ContactSheet-005.jpg" />
                    <img data-src="img/strips/ContactSheet-004.jpg" />
                    <img data-src="img/strips/ContactSheet-003.jpg" />
                    <img data-src="img/strips/ContactSheet-002.jpg" />
                    <img data-src="img/strips/ContactSheet-001.jpg" />
                </div>
                <div id="controls">
                    <button type="button" id="btn_rewind">&lt;</button>
                    <button type="button" id="btn_pause">||</button>
                    <button type="button" id="btn_play">&gt;</button>
                    <button type="button" id="btn_prev">&lt;-</button>
                    <button type="button" id="btn_next">-&gt;</button>
                    <label for="sliderVal">Stop</label><input type="text" value="0" id="sliderVal" />
                    <label for="frameNum">Frame</label><input type="text" value="0" id="frameNum" />
                </div>
            </div>

        </div>
    </body>

</html>