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
		<nav id="secondary-menu">
			<ul>
				<li>
					<a href="./about">About Me</a>
				</li>
				<li>
					<a href="./about-this-site">About This Site</a>
				</li>
				<li>
					<a href="./contact">Contact</a>
				</li>
				<li class="has-sub-menu">
					<a>Social Profiles</a>
					<ul id="social-profiles">
						<li>
							<a href="https://www.facebook.com/darrylyeoblog">Facebook</a>
						</li>
						<li>
							<a href="https://twitter.com/ddarrylyeo">Twitter</a>
						</li>
						<li>
							<a href="https://plus.google.com/+DarrylYeo">Google+</a>
						</li>
						<li>
							<a href="https://www.pinterest.com/darrylyeo/">Pinterest</a>
						</li>
						<li>
							<a href="https://www.linkedin.com/in/darrylyeo">LinkedIn</a>
						</li>
						<li>
							<a href="https://soundcloud.com/darrylyeo">SoundCloud</a>
						</li>
						<li>
							<a href="https://soundcloud.com/darrylyeo">GitHub</a>
						</li>
						<li>
							<a href="https://www.khanacademy.org/profile/darrylyeo/projects">Khan Academy</a>
						</li>
						<li>
							<a href="http://codepen.io/darrylyeo">CodePen</a>
						</li>
						<li>
							<a href="https://www.codingame.com/profile/be5e16d40e8760f2bf5dfcaadac87f6c2729851">CodinGame</a>
						</li>
						<li>
							<a href="https://musescore.com/darrylyeo">MuseScore</a>
						</li>
					</ul>
				</li>
				<li class="has-sub-menu">
					<a>Experiments</a>
					<ul id="experiments">
						<li>
							<a data-experiment="night-mode">Night Mode</a>
						</li>
						<li>
							<a data-experiment="jelly">Jelly</a>
						</li>
						<li>
							<a data-experiment="spotlight">Spotlight</a>
						</li>
						<li>
							<a data-experiment="tornado">Tornado</a>
						</li>
						<li>
							<a data-experiment="3d-parallax">3D Parallax</a>
						</li>
						<li>
							<a data-experiment="ajax-navigation">AJAX Navigation</a>
						</li>
					</ul>
				</li>
			</ul>
		</nav>
		<header class="immersive">
			<!--<h1>Darryl Yeo</h1>-->
			<nav id="main-menu">
				<a href="./" id="logo"><img src="<?php echo get_stylesheet_directory_uri() ?>/logo/Darryl-Yeo-Logo-Cropped.svg"></a>
				<ul>
					<li>
						<a href="./#projects">Projects</a>
						<ul>
							<li>
								<a href="./#code">Code</a>
							</li>
							<li>
								<a href="./#art">Art</a>
							</li>
							<li>
								<a href="./#music">Music</a>
							</li>
						</ul>
					</li>
					<li>
						<a href="./blog">Blog</a>
					</li>
					<li class="has-sub-menu">
						<a href="./learn">Learn</a>
						<ul>
							<li>
								<a href="./make-a-website-autobiography">Make A Website Autobiography!</a>
							</li>
							<li>
								<a href="./a-visual-introduction-to-javascript-programming">A Visual Inroduction To JavaScript Programming</a>
							</li>
						</ul>
					</li>
				</ul>
			</nav>
		</header>
		<main data-post-id="<?php echo get_queried_object_id() ?>">