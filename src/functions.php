<?php

$ASSETS = json_decode(file_get_contents(
	get_theme_file_uri('assets/assets.json')
));

/* PHP includes */
$framework = array(
	// Essentials
	'theme',
	'custom-post-types',
	'post-meta',
	
	// Templating
	'post-content-sections',
	'default-content',
	
	// WP Rest API
	'rest-api-terms',
	'rest-api-featured-images',

	// Feature Disabling
	'disable-jquery',
	'disable-wp-mediaelement',
	
	/*
	// Essentials
	'DY',
	'taxonomies',
	'widgets',
	'shortcodes',
	'custom-fields',
	
	// Templating
	'page-excerpts',
	'single-taxonomy-term-template',
	'shortcodes-everywhere',
	
	// Avada Features
	'avada-dynamic-css',
	
	// DY Custom Template Parts
	'dy-secondary-menu',
	'dy-project-menu',
	'dy-project-header',
	'dy-to-top',
	'dy-notifications',
	
	// Custom Default Avatar
	//'default-avatar',
	
	// Optimization (experimental)
	'inline-svgs',
	
	// Feature Disabling/Overriding
	'remove-emojis',
	'avada-disable-web-font-loader',
	'mime-types',*/
);
foreach($framework as $file){
	include_once 'framework/' . $file . '.php';
}


// Make a list of Active Plugins
$active_plugins = [];
include_once ABSPATH . 'wp-admin/includes/plugin.php';
$plugins = get_plugins();
foreach( $plugins as $plugin_path => $plugin_info ) {
	if (is_plugin_active($plugin_path)) {
		$plugin_slug = pathinfo($plugin_path, PATHINFO_DIRNAME);
		$active_plugins[] = $plugin_slug;
	}
}


function iterateThemeFiles($directory, $fileType, $callback){
	foreach(glob(get_stylesheet_directory().'/'.$directory.'/*.'.$fileType) as $uri) {
		$parts = pathinfo($uri);
		$file = $parts['basename'];
		$slug = $parts['filename'];
		$path = get_theme_file_uri($directory.'/'.$file);
		$callback($uri, $slug, $path);
	}
}



add_action('wp_enqueue_scripts', function(){
	global $post, $wp_query, $ASSETS;

	$prefix = 'dy-';
	
	$firstJSHandle;

	// CSS
	if($ASSETS->settings->optimizeCSS){
		wp_enqueue_style($prefix.'css', get_theme_file_uri('assets/all.min.css'));
	}else{
		foreach($ASSETS->css as $handle){
			wp_enqueue_style($prefix.$handle, get_theme_file_uri('assets/'.$handle.'.css'));
		}
	}

	// CSS by Plugin
	iterateThemeFiles('plugins', 'css', function($uri, $slug, $path){
		global $active_plugins;
		if(in_array($slug, $active_plugins)){
			wp_enqueue_style( 'plugin-'.$slug, $path);
		}
	});

	// JavaScript
	if($ASSETS->settings->optimizeJS){
		wp_enqueue_script($prefix.'js', get_theme_file_uri('assets/all.min.js'), null, null, true);
	}else{
		if(!$firstJSHandle) $firstJSHandle = 'js';

		foreach($ASSETS->js as $handle){
			if(!$firstJSHandle) $firstJSHandle = $handle;
			wp_enqueue_script($prefix.$handle, get_theme_file_uri('assets/'.$handle.'.js'), null, null, true);
		}
	}

	// Disable jQuery
	wp_dequeue_script( 'jquery' );
	
	// Localize WP variables
	wp_localize_script( $prefix.$firstJSHandle, 'WP', [
		'siteURL' => WP_SITEURL,
		'themes' => get_theme_root_uri(),
		'parentTheme' => get_template_directory_uri(),
		'childTheme' => get_stylesheet_directory_uri(),
		'nonce' => wp_create_nonce( 'wp_rest' ),
		'post' => $post,
		'query' => $wp_query
	] );

	// HTML Imports
	if(!$ASSETS->settings->asyncHTML){
		add_action( 'wp_footer', function(){
			global $ASSETS;

			foreach($ASSETS->html as $handle){
				echo file_get_contents( get_theme_file_uri('assets/components/'.$handle.'.html') );
			}
		}, 1000);
	}
});