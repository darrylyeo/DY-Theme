<?php
// Removes WordPress 4.2 emojis, which added unnecessary scripts (/wp-includes/js/wp-emoji-release.min.js)
// http://wordpress.stackexchange.com/questions/185577/disable-emojicons-introduced-with-wp-4-2
add_action( 'init', function() {
	remove_action( 'admin_print_styles', 'print_emoji_styles' );
	remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
	remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
	remove_action( 'wp_print_styles', 'print_emoji_styles' );
	remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
	remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
	remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );
	add_filter( 'tiny_mce_plugins', function( $plugins ) {
		if ( is_array( $plugins ) ) {
			return array_diff( $plugins, array( 'wpemoji' ) );
		} else {
			return array();
		}
	} );
	add_filter( 'emoji_svg_url', '__return_false' );
} );