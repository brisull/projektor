<!DOCTYPE html>
<html>
	<head>
		<title>Win 8 Prototype</title>
		<link rel="stylesheet" href="main.css" type="text/css" />
		<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
        <script src="request_anim_frame.js"></script>
		<script src="jquery.projektor_new.js"></script>
		<script type="text/javascript">

        $(function () {
            $('.video-player').each(function () {
                var self = $(this);
                $(this).projektor({
                    onInit: function () {
                    },
                    onStop: function() {
                        var self = this;
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
        });
        </script>
	</head>

	<body>	
		<div id="main-content">
            
            <div class="video-player-container">
                <div class="video-player" style="width: 765px; height: 417px;">
                    <img data-src="//win8wwfb24.blob.core.windows.net/strips/gestsnap3_036.jpg">
                    <img data-src="//win8wwfb24.blob.core.windows.net/strips/gestsnap3_035.jpg">
                    <img data-src="//win8wwfb24.blob.core.windows.net/strips/gestsnap3_034.jpg">
                    <img data-src="//win8wwfb24.blob.core.windows.net/strips/gestsnap3_033.jpg">
                    <img data-src="//win8wwfb24.blob.core.windows.net/strips/gestsnap3_032.jpg">
                    <img data-src="//win8wwfb24.blob.core.windows.net/strips/gestsnap3_031.jpg">
                    <img data-src="//win8wwfb24.blob.core.windows.net/strips/gestsnap3_030.jpg">
                    <img data-src="//win8wwfb24.blob.core.windows.net/strips/gestsnap3_029.jpg">
                    <img data-src="//win8wwfb24.blob.core.windows.net/strips/gestsnap3_028.jpg">
                    <img data-src="//win8wwfb24.blob.core.windows.net/strips/gestsnap3_027.jpg">
                    <img data-src="//win8wwfb24.blob.core.windows.net/strips/gestsnap3_026.jpg">
                    <img data-src="//win8wwfb24.blob.core.windows.net/strips/gestsnap3_025.jpg">
                    <img data-src="//win8wwfb24.blob.core.windows.net/strips/gestsnap3_024.jpg">
                    <img data-src="//win8wwfb24.blob.core.windows.net/strips/gestsnap3_023.jpg">
                    <img data-src="//win8wwfb24.blob.core.windows.net/strips/gestsnap3_022.jpg">
                    <img data-src="//win8wwfb24.blob.core.windows.net/strips/gestsnap3_021.jpg">
                    <img data-src="//win8wwfb24.blob.core.windows.net/strips/gestsnap3_020.jpg">
                    <img data-src="//win8wwfb24.blob.core.windows.net/strips/gestsnap3_019.jpg">
                    <img data-src="//win8wwfb24.blob.core.windows.net/strips/gestsnap3_018.jpg">
                    <img data-src="//win8wwfb24.blob.core.windows.net/strips/gestsnap3_017.jpg">
                    <img data-src="//win8wwfb24.blob.core.windows.net/strips/gestsnap3_016.jpg">
                    <img data-src="//win8wwfb24.blob.core.windows.net/strips/gestsnap3_015.jpg">
                    <img data-src="//win8wwfb24.blob.core.windows.net/strips/gestsnap3_014.jpg">
                    <img data-src="//win8wwfb24.blob.core.windows.net/strips/gestsnap3_013.jpg">
                    <img data-src="//win8wwfb24.blob.core.windows.net/strips/gestsnap3_012.jpg">
                    <img data-src="//win8wwfb24.blob.core.windows.net/strips/gestsnap3_011.jpg">
                    <img data-src="//win8wwfb24.blob.core.windows.net/strips/gestsnap3_010.jpg">
                    <img data-src="//win8wwfb24.blob.core.windows.net/strips/gestsnap3_009.jpg">
                    <img data-src="//win8wwfb24.blob.core.windows.net/strips/gestsnap3_008.jpg">
                    <img data-src="//win8wwfb24.blob.core.windows.net/strips/gestsnap3_007.jpg">
                    <img data-src="//win8wwfb24.blob.core.windows.net/strips/gestsnap3_006.jpg">
                    <img data-src="//win8wwfb24.blob.core.windows.net/strips/gestsnap3_005.jpg">
                    <img data-src="//win8wwfb24.blob.core.windows.net/strips/gestsnap3_004.jpg">
                    <img data-src="//win8wwfb24.blob.core.windows.net/strips/gestsnap3_003.jpg">
                    <img data-src="//win8wwfb24.blob.core.windows.net/strips/gestsnap3_002.jpg">
                    <img data-src="//win8wwfb24.blob.core.windows.net/strips/gestsnap3_001.jpg">
                    <img data-src="//win8wwfb24.blob.core.windows.net/strips/gestsnap3_000.jpg">
                </div>
                <div>
                    <button type="button" id="btn_rewind">&lt;</button>
                    <button type="button" id="btn_pause">||</button>
                    <button type="button" id="btn_play">&gt;</button>
                </div>
            </div>

        </div>

	</body>

</html>