<?php
add_action( 'wp_enqueue_scripts', function() {
	wp_dequeue_script( 'mediaelement' );
	wp_deregister_script( 'mediaelement' );
	wp_dequeue_script( 'wp-mediaelement' );
	wp_deregister_script( 'wp-mediaelement' );
}, 1000 );

add_filter('wp_video_shortcode_library', function(){
	return '';
});
add_filter('wp_audio_shortcode_library', function(){
	return '';
});