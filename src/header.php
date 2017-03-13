<!DOCTYPE HTML>
<html <?php language_attributes(); ?>>
<head>
	<script>console.time('ready');console.time('load')</script>
	<base href="<?php echo WP_SITEURL ?>">
	<!--<link rel="prefetch" href="https://fonts.googleapis.com/css?family=Asap:400,400i,700,700i|Slabo+13px">
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Asap:400,400i,700,700i|Slabo+13px">-->
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<?php if ( is_singular() && pings_open( get_queried_object() ) ) : ?>
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
	<?php endif; ?>

	<link rel="dns-prefetch" href="https://www.khanacademy.org/">

	<link rel="author" href="https://darryl-yeo.com/about">

	<?php wp_head() ?>

	<!--<script type="text/javascript" src="./wp-content/themes/DY/assets/libraries/prefixfree.min.js"></script>-->
	
	<!-- build:css assets/all.min.css -->
	<!--
	<link rel="stylesheet" href="assets/libraries/prism.css">

	<link rel="stylesheet" href="assets/fonts.css">
	<link rel="stylesheet" href="assets/css.css">
	<link rel="stylesheet" href="assets/copyright.css">
	<link rel="stylesheet" href="assets/scrollbars.css">
	<link rel="stylesheet" href="assets/forms.css">
	<link rel="stylesheet" href="assets/header.css">
	<link rel="stylesheet" href="assets/main.css">
	<link rel="stylesheet" href="assets/article.css">
	<link rel="stylesheet" href="assets/sidebar.css">
	<link rel="stylesheet" href="assets/footer.css">
	<link rel="stylesheet" href="assets/notifications.css">
	-->
	<!-- endbuild -->
</head>
<body>
	<div id="background">
		<iframe></iframe>
		<canvas></canvas>
	</div>
	<div id="wrapper">
		<!--<dy-header logo="<?php echo get_stylesheet_directory_uri() ?>"></dy-header>-->
		<!--<dy-header is="dy-header">-->
		<dy-header></dy-header>

		<?php
		if(is_archive())
			$type = 'archive';

		if(is_single())
			$type = 'single';

		if(is_404())
			$type = '404';

		if(is_search())
			$type = 'search';

		if(is_author())
			$type = 'author';
		?>
		<main data-type="<?php echo $type ?>" data-id="<?php echo get_queried_object_id() ?>">