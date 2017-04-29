<?php
add_filter('the_content', function($content){
	$content = '<section id="top">'.preg_replace_callback(
		'/<h2(.*?)>(.*?)<\/h2>/',
		function($matches){
			return '</section><section id="'.sanitize_title($matches[2]).'"><h2'.$matches[1].'>'.$matches[2].'</h2>';
		},
		$content
	).'</section>';
	$content = str_replace('<section></section>', '', $content);
	return $content;
});