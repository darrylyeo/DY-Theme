<!DOCTYPE HTML>
<html <?php language_attributes(); ?>>
<head>
	<script>console.time('ready');console.time('load')</script>
	<base href="<?php echo WP_SITEURL ?>">
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<?php if ( is_singular() && pings_open( get_queried_object() ) ) : ?>
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
	<?php endif; ?>

	<link rel="dns-prefetch" href="https://www.khanacademy.org/">

	<link rel="author" href="https://darryl-yeo.com/about">

	<?php wp_head() ?>
</head>
<body>
	<dy-page></dy-page>
	<?php wp_footer() ?>
</body>