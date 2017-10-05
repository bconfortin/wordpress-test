<?php
	add_theme_support('post-thumbnails');

	function cadastrar_post_type_transportes() {
		$nameSingular = 'Transporte';
		$namePlural = 'Transportes';
		$description = 'Cadastro de transportes do IguShuttle';

		$labels = array(
		    'name' => $namePlural,
		    'singular_name' => $nameSingular,
		    'add_new_item' => 'Adicionar novo ' . strtolower($nameSingular),
		    'edit_item' => 'Editar ' . strtolower($nameSingular)
		);

		$supports = array(
	        'title',
	        'editor',
	        'thumbnail'
		);

		$args = array(
		    'labels' => $labels,
		    'public' => true,
		    'description' => $description,
        	'menu_icon' => 'dashicons-cart',
		    'supports' => $supports
		);

		register_post_type('transportes', $args);
		flush_rewrite_rules();
	}

	add_action('init', 'cadastrar_post_type_transportes');

	function registrar_menu_navegacao() {
		register_nav_menu('header-menu', 'main-menu');
	}

	add_action('init', 'registrar_menu_navegacao');

	function generateTitle() {
		the_title();
		if (!is_home()) { echo ' - '; };
		bloginfo('name');
	}

	function custom_excerpt_length( $length ) {
		return 30;
	}
	add_filter( 'excerpt_length', 'custom_excerpt_length', 999 );

	/**
	 * Register our sidebars and widgetized areas.
	 *
	 */
	function new_widgets_init() {
		register_sidebar(
			array(
				'name'          => 'Widgets da direita',
				'id'            => 'widgets_direita',
				'before_widget' => '<div class="padding-15 bg-fff">',
				'after_widget'  => '</div>',
				'before_title'  => '<h3 class="margin-0 pbottom-15 mbottom-15 bbottom-1-secundario font-1-1em text-uppercase">',
				'after_title'   => '</h3>',
			)
		);
	}
	add_action( 'widgets_init', 'new_widgets_init' );
?>
