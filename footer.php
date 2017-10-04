		<?php $home = get_template_directory_uri(); ?>
		<footer class="footer-desktop hidden-xs">
		    <div class="container-fluid">
		        <div class="container">
		            <div class="row">
		                <div class="col-xs-12">
		                    <a href="">
		                        <img src="<?= $home ?>/img/igushuttle-w.png" alt="" class="img-responsive pull-left mtop-5 max-height-20">
		                    </a>
		                    <ul class="unstyled-list horizontal-list pull-left mbottom-0 mleft-50">
		                        <li><a href="" class="padhor-15">Mapa do site</a></li>
		                        <li><a href="" class="padhor-15">Política do site</a></li>
		                        <li><a href="" class="padhor-15">Contate-nos</a></li>
		                    </ul>
		                    <ul class="unstyled-list horizontal-list pull-right mbottom-0">
		                        <li><a href="" class="mleft-5"><i class="fa fa-lg fa-facebook-square"></i></a></li>
		                        <li><a href="" class="mleft-5"><i class="fa fa-lg fa-instagram"></i></a></li>
		                        <li><a href="" class="mleft-5"><i class="fa fa-lg fa-twitter"></i></a></li>
		                        <li><a href="" class="mleft-5"><i class="fa fa-lg fa-google-plus"></i></a></li>
		                    </ul>
		                </div>
		            </div>
		        </div>
		    </div>
		</footer>

		<footer class="footer-mobile index visible-xs-block">
		    <div class="container">
		        <div class="row">
		            <div class="col-xs-12 text-center">
		                <p class="mbottom-0 font-1-5em">
		                    <a href="" class="marhor-5"><i class="fa fa-facebook"></i></a>
		                    <a href="" class="marhor-5"><i class="fa fa-instagram"></i></a>
		                    <a href="" class="marhor-5"><i class="fa fa-twitter"></i></a>
		                    <a href="" class="marhor-5"><i class="fa fa-google-plus"></i></a>
		                </p>
		                <hr>
		                <p class="font-0-9em">&copy; Copyright 2017. IguShuttle - Foz do Iguaçu</p>
		            </div>
		        </div>
		    </div>
		</footer>

		<a href="" class="btn btn-primario reserve-ja-index visible-xs-block">Reserve já</a>

		<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
		<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css">
		<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
		<link rel="stylesheet" type="text/css" href="<?= $home; ?>/font-awesome-4.7.0/css/font-awesome.min.css">
		<script src="<?= $home; ?>/bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
		<script src="<?= $home; ?>/js/functions.js"></script>

		<script>
		    $(function () {
		        /**
		         * Parte do dropdown do menu desktop
		         **/
		        $(".dropdown-slave").css('maxWidth', $(".dropdown-master").outerWidth());
		        setTimeout(function () {
		            $(".dropdown-slave").css('maxWidth', $(".dropdown-master").outerWidth());
		        }, 5000);
		        setTimeout(function () {
		            $(".dropdown-slave").css('maxWidth', $(".dropdown-master").outerWidth());
		        }, 7000);
		        $(".dropdown-master").hover(
		            function () {
		                $(".dropdown-slave").removeClass("hidden");
		            }
		        );
		        $(".dropdown-master").click(
		            function (e) {
		                e.preventDefault();
		                $(".dropdown-slave").removeClass("hidden");
		            }
		        );
		        $(".dropdown-master").mouseleave(function () {
		            $(".dropdown-slave").addClass("hidden");
		        });
		        $("body").click(function () {
		            $(".dropdown-slave").addClass("hidden");
		        });

		        /**
		         * Ajustar a altura do background da index
		         **/
		        function adjustHeightIndexBg() {
		            $(".background-index").css("height", $(".background-index-height").outerHeight());
		        }
		        adjustHeightIndexBg();
		        $(window).resize(function () {
		            adjustHeightIndexBg();
		        });

		        /**
		         * Esconder a navegação mobile ao clicar nele ou no "x" da navigation-drawer
		         **/
		        $(".navigation-mobile-overlay, .navigation-drawer .fa-times").click(function () {
		            $(".navigation-mobile-overlay").addClass("hidden", { duration: 300 });
		            $("body").removeClass("overflow-hidden", { duration: 300 });
		            $(".navigation-drawer").removeClass("pulled-drawer", { duration: 300 });
		        });

		        /**
		         * Esconder a navegação mobile ao apertar esc
		         **/
		        $(document).keyup(function (e) {
		            if (e.keyCode == 27) { // escape key maps to keycode `27`
		                $(".navigation-mobile-overlay").addClass("hidden", { duration: 300 });
		                $("body").removeClass("overflow-hidden", { duration: 300 });
		                $(".navigation-drawer").removeClass("pulled-drawer", { duration: 300 });
		            }
		        });

		        /**
		         * Abre a navegação mobile ao clicar no ícone de hamburguer (.fa-bars)
		         **/
		        $(".navigation-mobile .fa-bars").on("click", function () {
		            $(".navigation-mobile-overlay").toggleClass("hidden", { duration: 300 });
		            $(".navigation-drawer").addClass("pulled-drawer", { duration: 300 });
		            $("body").addClass("overflow-hidden", { duration: 300 });
		        });
		    });
		</script>
		<?php wp_footer(); ?>
	</body>
</html>