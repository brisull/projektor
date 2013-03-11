<!DOCTYPE html>
<html>
	<head>
		<title>Win 8 Prototype</title>
		<link rel="stylesheet" href="main.css" type="text/css" />
		<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
        <script src="request_anim_frame.js"></script>
		<script src="jquery.projektor.js"></script>
		<script type="text/javascript">

        $(function () {
            $('.video-player').click(function () {
                $(this).projektor(/*{repeat: true}*/).projektor('play').unbind('click').click(function () {

                    $(this).projektor('reset').projektor('play');
                });
            });
        });
        </script>
	</head>

	<body>	
		<div id="main-content">
            <div class="video-player-container">
                <div class="video-player">
                    <img data-src="img/strips/strip_5.jpg" class="sprite" alt="" />
                    <img data-src="img/strips/strip_4.jpg" class="sprite" alt="" />
                    <img data-src="img/strips/strip_3.jpg" class="sprite" alt="" />
                    <img data-src="img/strips/strip_2.jpg" class="sprite" alt="" />
                    <img src="img/strips/strip_1.jpg" data-src="img/strips/strip_1.jpg" class="sprite" alt="" />
                </div>
            </div>
            <div class="video-player-container">
                <div class="video-player">
                    <img data-src="img/strips/strip_5.jpg" class="sprite" alt="" />
                    <img data-src="img/strips/strip_4.jpg" class="sprite" alt="" />
                    <img data-src="img/strips/strip_3.jpg" class="sprite" alt="" />
                    <img data-src="img/strips/strip_2.jpg" class="sprite" alt="" />
                    <img data-src="img/strips/strip_1.jpg" class="sprite" alt="" />
                    <img data-src="img/strips/strip_5.jpg" class="sprite" alt="" />
                    <img data-src="img/strips/strip_4.jpg" class="sprite" alt="" />
                    <img data-src="img/strips/strip_3.jpg" class="sprite" alt="" />
                    <img data-src="img/strips/strip_2.jpg" class="sprite" alt="" />
                    <img data-src="img/strips/strip_1.jpg" class="sprite" alt="" />
                    <img data-src="img/strips/strip_5.jpg" class="sprite" alt="" />
                    <img data-src="img/strips/strip_4.jpg" class="sprite" alt="" />
                    <img data-src="img/strips/strip_3.jpg" class="sprite" alt="" />
                    <img data-src="img/strips/strip_2.jpg" class="sprite" alt="" />
                    <img data-src="img/strips/strip_1.jpg" class="sprite" alt="" />
                    <img data-src="img/strips/strip_5.jpg" class="sprite" alt="" />
                    <img data-src="img/strips/strip_4.jpg" class="sprite" alt="" />
                    <img data-src="img/strips/strip_3.jpg" class="sprite" alt="" />
                    <img data-src="img/strips/strip_2.jpg" class="sprite" alt="" />
                    <img data-src="img/strips/strip_1.jpg" class="sprite" alt="" />
                </div>
            </div>
            <div class="video-player-container">
                <div class="video-player">
                    <img data-src="img/strips/strip_5.jpg" class="sprite" alt="" />
                    <img data-src="img/strips/strip_4.jpg" class="sprite" alt="" />
                    <img data-src="img/strips/strip_3.jpg" class="sprite" alt="" />
                    <img data-src="img/strips/strip_2.jpg" class="sprite" alt="" />
                    <img src="img/strips/strip_1.jpg" data-src="img/strips/strip_1.jpg" class="sprite" alt="" />
                </div>
            </div>
            <div class="video-player-container">
                <div class="video-player">
                    <img data-src="img/strips/strip_5.jpg" class="sprite" alt="" />
                    <img data-src="img/strips/strip_4.jpg" class="sprite" alt="" />
                    <img data-src="img/strips/strip_3.jpg" class="sprite" alt="" />
                    <img data-src="img/strips/strip_2.jpg" class="sprite" alt="" />
                    <img src="img/strips/strip_1.jpg" data-src="img/strips/strip_1.jpg" class="sprite" alt="" />
                </div>
            </div>
            <div class="video-player-container">
                <div class="video-player">
                    <img data-src="img/strips/strip_5.jpg" class="sprite" alt="" />
                    <img data-src="img/strips/strip_4.jpg" class="sprite" alt="" />
                    <img data-src="img/strips/strip_3.jpg" class="sprite" alt="" />
                    <img data-src="img/strips/strip_2.jpg" class="sprite" alt="" />
                    <img src="img/strips/strip_1.jpg" data-src="img/strips/strip_1.jpg" class="sprite" alt="" />
                </div>
            </div>
            <div class="video-player-container">
                <div class="video-player">
                    <img data-src="img/strips/strip_5.jpg" class="sprite" alt="" />
                    <img data-src="img/strips/strip_4.jpg" class="sprite" alt="" />
                    <img data-src="img/strips/strip_3.jpg" class="sprite" alt="" />
                    <img data-src="img/strips/strip_2.jpg" class="sprite" alt="" />
                    <img src="img/strips/strip_1.jpg" data-src="img/strips/strip_1.jpg" class="sprite" alt="" />
                </div>
            </div>
        </div>

	</body>

</html>