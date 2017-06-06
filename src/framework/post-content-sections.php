<?php
add_filter('the_content', function($content){
	$content = '<section id="top">'.preg_replace_callback(
		'/<h2(?:.*?)>(.*?)<\/h2>/',
		function($matches){
			$title = $matches[1];
			$id = sanitize_title($title);
			return "</section><section id={$id}><h2><a href=#{$id} class=anchor>{$title}</a></h2>";
		},
		$content
	).'</section>';
	$content = str_replace('<section></section>', '', $content);
	return $content;
});