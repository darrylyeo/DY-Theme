<?php
get_header();
/*while(have_posts()):*/ the_post();
?>
<dy-project-header></dy-project-header>
<article>
	<!--<hgroup>
		<h1><?php the_title() ?></h1>
	</hgroup>
	<?php //echo get_the_permalink();
	//the_content();
	// If comments are open or we have at least one comment, load up the comment template.
	/*if ( comments_open() || get_comments_number() ) {
		comments_template();
	}*/
	?>
	<dy-comments></dy-comments>-->
</article>
<?php
//endwhile;
get_sidebar();
get_footer();