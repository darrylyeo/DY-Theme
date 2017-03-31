<?php
get_header();
?>
<article>
	<!--<dy-about class="particle-field">
		<style>
		dy-about {
			background:
				repeating-linear-gradient(135deg, rgba(0, 0, 0, 0.025), rgba(0, 0, 0, 0.025) 2%, rgba(255, 255, 255, 0.025) 2%, rgba(255, 255, 255, 0.025) 4%) 0/200vw,
				linear-gradient(to bottom right, rgb(20, 180, 255), rgb(255, 184, 78));
			display: flex;
			flex-direction: column;
			justify-content: center;
			margin: var(--padding-neg);
			margin-bottom: 0;
			padding: var(--padding);
			position: relative;
			height: calc(100vh - var(--main-menu-height) - var(--secondary-menu-height));
			perspective: 100px;
		}
		#splash {
			/*animation: Splash 20s linear infinite;*/
			background:
				repeating-linear-gradient(135deg, rgba(0, 0, 0, 0.025), rgba(0, 0, 0, 0.025) 2%, rgba(255, 255, 255, 0.025) 2%, rgba(255, 255, 255, 0.025) 4%) 0/200vw,
				linear-gradient(to bottom right, rgb(20, 180, 255), rgb(255, 184, 78));
			position: absolute;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;

			box-sizing: content-box;
			margin-top: calc(var(--main-menu-height) * -1);
			padding-top: var(--main-menu-height);
		}
		</style>
		<div>
			<button>Projects</button>
			<button>Resume</button>
		</div>
	</dy-about>-->
	<dy-projects id="projects"></dy-projects>
</article>
<?php
//get_sidebar();
get_footer();