<!DOCTYPE html>
<html>
	<head>
		<?php $home = get_template_directory_uri(); ?>
	    <meta charset="utf-8">
	    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	    <meta name="viewport" content="width=device-width, initial-scale=1">

		<title><?php generateTitle(); ?></title>

		<link rel="stylesheet" type="text/css" href="<?= $home; ?>/style.css">
	    <!-- Bootstrap -->
	    <link rel="stylesheet" type="text/css" href="<?= $home; ?>/bootstrap-3.3.7-dist/css/bootstrap.min.css">
	    <link rel="stylesheet" type="text/css" href="<?= $home; ?>/font-awesome-4.7.0/css/font-awesome.min.css">
	    <link rel="stylesheet" type="text/css" href="<?= $home; ?>/css/style-sass.css">

	    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
	    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
	    <!--[if lt IE 9]>
	    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
	    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
	    <![endif]-->
	    <?php wp_head(); ?>
	</head>
	<body>
	    <!--
	        * ################################
	        * Navegação e banner para desktop
	        * ################################
	    -->
	    <div class="navigation-desktop hidden-xs">
	        <div class="container">
	            <div class="row">
	                <div class="col-sm-12">
	                <a href="http://www.igushuttle.com/">
	                        <img src="<?= $home; ?>/img/igushuttle-b.png" alt="" class="img-responsive pull-left mtop-30 max-height-20">
	                    </a>
	                    <ul class="unstyled-list pull-right">
	                    	<?php
								$args = array(
								    'theme_location' => 'header-menu'
								);
								// wp_nav_menu( $args );
	                    	?>
							<li><?php get_search_form(); ?></li>
	                        <li><a href="http://igushuttle.com/">Ir para o site</a></li>
	                    </ul>
	                </div>
	            </div>
	        </div>
		</div>

		<div class="navigation-mobile-container visible-xs-block">
		    <div class="navigation-mobile-overlay hidden">
		    </div>
		    <div class="navigation-drawer">
		        <i class="fa fa-times fa-lg pull-right"></i>
		        <a href="http://www.igushuttle.com/">
		            <img src="<?= $home; ?>/img/igushuttle-b.png" alt="" class="img-responsive mbottom-50 max-height-20 pull-left" style="max-height: 15px; margin-top: 15px;">
		        </a>
		        <div class="clearfix"></div>
		        <ul class="unstyled-list">
					<li><?php get_search_form(); ?></li>
					<li><a href="http://igushuttle.com/">Ir para o site</a></li>
		        </ul>
		    </div>
		    <div class="navigation-mobile">
		        <div class="container">
		            <div class="row">
		                <div class="col-xs-12">
		                    <p class="text-center mbottom-0">
		                        <a href="http://www.igushuttle.com/">
		                            <img src="<?= $home ?>/img/igushuttle-b.png" alt="" class="img-responsive inline-block max-height-20" style="max-height: 15px;">
		                        </a>
		                    </p>
		                    <i class="fa fa-lg fa-bars"></i>
		                </div>
		            </div>
		        </div>
		    </div>
		</div><!-- /navigation-mobile-container -->
