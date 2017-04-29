<?php

add_action('init', function(){
	// Custom Taxonomies
	$post_types = array('page', 'post', 'project');
	
	register_post_type( 'project', array(
		'labels' => array(
			'name' => _x( 'Projects', 'taxonomy general name' ),
			'singular_name'	=> _x( 'Project', 'taxonomy singular name' ),
		),
		'description' => __( 'My projects.', 'DY' ),
		'public' => true,
		'publicly_queryable' => true,
		'show_ui' => true,
		'show_in_menu' => true,
		'show_in_admin_bar' => true,
		'query_var' => true,
		'rewrite' => array(
			//'slug' => '/',
			'with_front' => false
		),
		//'capability_type'	=> 'post',
		'has_archive' => true,
		'hierarchical' => true,
		//'menu_position' => null,
		'show_in_rest' => true,
		'rest_base' => 'projects',
		'rest_controller_class' => 'WP_REST_Posts_Controller',
		'supports' => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'trackbacks', 'custom-fields', 'comments', 'page-attributes' )
	));
	
	//Page Category (internal use only)
	// (use post category as project categories)
	register_taxonomy( 'page-category', array( 'page' ), array(
		'hierarchical' => true,
		'labels' => array(
			'name' => 'Page Categories',
			'singular_name' => 'Page Category',
		),
		'show_ui' => true,
		'show_admin_column' => true,
		'rewrite' => array( 'with_front' => 'false' ),
		'show_in_rest' => true
	) );

	//Topic
	register_taxonomy( 'topic', $post_types, array(
		'hierarchical' => true,
		'labels' => array(
			'name' => _x( 'Topics', 'taxonomy general name' ),
			'singular_name'	=> _x( 'Topic', 'taxonomy singular name' ),
		),
		'rewrite' => array(
			'with_front' => false
		),
		'show_admin_column' => true,
		'show_in_rest' => true
	) );
	
	
	// Programming Language (to merge with Tools)
	register_taxonomy( 'language', $post_types, array(
		'hierarchical' => true,
		'labels' => array(
			'name' => _x( 'Languages', 'taxonomy general name' ),
			'singular_name'	=> _x( 'Language', 'taxonomy singular name' ),
		),
		'rewrite' => array(
			'with_front' => false
		),
		'show_admin_column' => true,
		'show_in_rest' => true
	) );
	// Tools (Software Used)
	register_taxonomy( 'tools', $post_types, array(
		'hierarchical' => true,
		'labels' => array(
			'name' => _x( 'Tools', 'taxonomy general name' ),
			'singular_name' => _x( 'Software Used', 'taxonomy singular name' ),
			'menu_name'	=> _x( 'Programming Software', 'taxonomy menu name' ),
		),
		'rewrite' => array(
			'with_front' => false
		),
		'show_admin_column' => true,
		'show_in_rest' => true
	) );
	

	// Typeface
	register_taxonomy( 'typeface', $post_types, array(
		'hierarchical' => true,
		'labels' => array(
			'name' => _x( 'Typefaces', 'taxonomy general name' ),
			'singular_name'	=> _x( 'Typeface Used', 'taxonomy singular name' ),
		),
		'rewrite' => array(
			'with_front' => false
		),
		'show_admin_column' => true,
		'show_in_rest' => true
	) );
	
	/*// Music Software Used
	register_taxonomy( 'software', $post_types, array(
		'hierarchical' => true,
		'labels' => array(
			'name' => _x( 'Tools', 'taxonomy general name' ),
			'singular_name'	=> _x( 'Software Used', 'taxonomy singular name' ),
			'menu_name'	=> _x( 'Music Software', 'taxonomy menu name' ),
		),
		'rewrite' => array( 'slug' => 'music' ),
		//'rewrite' => array( 'slug' => 'music-software' ),
		'show_admin_column' => true
	) );*/
	
	// Music Genre
	register_taxonomy( 'genre', $post_types, array(
		'hierarchical' => true,
		'labels' => array(
			'name' => _x( 'Genres', 'taxonomy general name' ),
			'singular_name'	=> _x( 'Genre', 'taxonomy singular name' ),
		),
		'rewrite' => array(
			'with_front' => false
		),
		'show_admin_column' => true,
		'show_in_rest' => true
	) );
	
	
	// Allow pages to use post categories and tags
	register_taxonomy_for_object_type( 'post_tag', 'page' );
	register_taxonomy_for_object_type( 'category', 'page' );
});







/*function wpse_remove_cpt_slug( $post_link, $post, $leavename ) {
	// leave these CPT alone
	$whitelist = array ('project');

	if ( ! in_array( $post->post_type, $whitelist ) || 'publish' != $post->post_status )
		return $post_link;

	if( isset($GLOBALS['wp_post_types'][$post->post_type],
			 $GLOBALS['wp_post_types'][$post->post_type]->rewrite['slug'])){
		$slug = $GLOBALS['wp_post_types'][$post->post_type]->rewrite['slug'];
	} else {
		$slug = $post->post_type;
	}

	// remove post slug from url
	$post_link = str_replace( '/' . $slug  . '/', '/', $post_link );

	return $post_link;
}
add_filter( 'post_type_link', 'wpse_remove_cpt_slug', 10, 3 );
add_filter( 'post_link', 'wpse_remove_cpt_slug', 10, 3 );

add_action( 'pre_get_posts', function( $query ) {
	// Only noop the main query
	if ( ! $query->is_main_query() )
		return;

	// Only noop our very specific rewrite rule match
	if ( 2 != count( $query->query )
		 || ! isset( $query->query['page'] ) )
		return;

	// 'name' will be set if post permalinks are just post_name, otherwise the page rule will match
	if ( ! empty( $query->query['name'] ) )
		$query->set( 'post_type', array( 'post', 'project', 'page' ) );
});*/