<?php
get_header();
?>
<article>
	<dy-about class="particle-field">
		<style>
		dy-about {
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
		@keyframes Splash {
			to {
				background-position: -100vw, 0;
			}
		}
		/*#splash {
			animation: Splash1 100s infinite alternate, Splash2 50s infinite both;
			background:
				repeating-linear-gradient(0, rgba(0, 0, 0, 0.025), rgba(0, 0, 0, 0.025) 2%, rgba(255, 255, 255, 0.025) 2%, rgba(255, 255, 255, 0.025) 4%) 0/10% 100%,
				repeating-linear-gradient(120deg, rgba(0, 0, 0, 0.025), rgba(0, 0, 0, 0.025) 2%, rgba(255, 255, 255, 0.025) 2%, rgba(255, 255, 255, 0.025) 4%) 0/10% 100%,
				repeating-linear-gradient(240deg, rgba(0, 0, 0, 0.025), rgba(0, 0, 0, 0.025) 2%, rgba(255, 255, 255, 0.025) 2%, rgba(255, 255, 255, 0.025) 4%) 0/100% 10%,
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
		@keyframes Splash1 {
			to {
				background-position: -100vw, 0 -100vh, 0 -100vh, 0;
				background-size: 100vh;
			}
		}
		@keyframes Splash2 {
			from {
			}
			to {
				filter: hue-rotate(360deg);
			}
		}*/
		#splash ~ * {
			position: relative;
		}

		.tagline {
			color: #fff;
			mix-blend-mode: overlay;

			/*background: linear-gradient(135deg, #fff, #000);
			background: linear-gradient(135deg, rgb(255, 184, 78), #fff, rgb(20, 180, 255));
			-webkit-background-clip: text;
			background-clip: text;
			color: transparent;*/

			display: flex;
			align-items: flex-start;
			justify-content: center;
			flex: 1;
			max-height: 100vmin;
		}
		.tagline span {
			display: inline-block;
		}
		.tagline > :nth-child(2) {
			margin-top: 10vh;
		}
		.tagline > :nth-child(3) {
			margin-top: 20vh;
		}
		.tagline > :nth-child(4) {
			margin-top: 30vh;
		}
		.tagline > :nth-child(5) {
			margin-top: 40vh;
		}
		.tagline > :nth-child(6) {
			margin-top: 50vh;
		}
		@media (max-width: 38rem) {
			.tagline {
				justify-content: space-around;
				align-items: center;
				flex-direction: column;
			}
			.tagline span.particle-wrapper {
				margin-top: 0;
			}
		}
		.tagline span a {
			background-color: rgba(255, 255, 255, 0.25);
			border-radius: 2em;
			color: inherit;
			display: inline-block;
			font-size: calc(0.7em + 0.75vw);
			padding: 0 1ch;
			white-space: nowrap;
		}

		.particle-wrapper {
			transform-style: preserve-3d;
		}
		.particles .particle-wrapper {
			/*animation: ParticleWrapper 20s infinite;*/
			position: absolute;
			left: 0;
			top: 0;
		}
		@keyframes ParticleWrapper {
			from {
				transform: translate(-10rem) rotate(0);
			}
			50% {
				transform: translate(-10rem) rotate(180deg);
			}
			to {
				transform: translate(-10rem) rotate(360deg);
			}
		}
		.particles .particle-wrapper .particle {
			background-color: rgba(255, 255, 255, 0.5);
			border-radius: 50%;
			display: inline-block;
			width: var(--particle-size, 1);
			height: var(--particle-size, 1);
		}
		.particle {
			/*transition: cubic-bezier(0.5, 1, 0, 2) 0.5s;*/
			/*transition: ease-out 0.5s;*/
		}
		</style>

		<div id="splash">
			<div class="particles"></div>
		</div>
		<div class="tagline">
			<span class="particle-wrapper">
				<a class="particle">writing code</a>
				<!--websites, games, visualizations, tools-->
			</span>
			<span class="particle-wrapper">
				<a class="particle">creating art</a>
				<!--animations, logos, graphics, typography, 3D-->
			</span>

			<!--<span>creating animations, games and interactivities, </span>-->

			<span class="particle-wrapper">
				<a class="particle">making music</a>
				<!--compositions, performances-->
			</span>
			
			<!--<span><u>inspiring others</u></span>
			<span>since the 2010s.</span>-->
			
			<span class="particle-wrapper">
				<a class="particle">teaching others</a>
			</span>
			
			<span class="particle-wrapper">
				<a class="particle">inspiring others</a>
			</span>
		</div>
		<div>
			<button>Projects</button>
			<button>Resume</button>
		</div>
	</dy-about>
	<dy-projects id="projects"></dy-projects>
</article>
<?php
//get_sidebar();
get_footer();