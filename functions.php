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

		register_post_type( 'transportes', $args );
	}

	add_action('init', 'cadastrar_post_type_transportes');

	function registrar_menu_navegacao() {
		register_nav_menu('header-menu', 'main-menu');
	}

	add_action('init', 'registrar_menu_navegacao');
?>