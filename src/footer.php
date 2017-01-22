		</main>
		<footer>
			<!--<form>
				<fieldset>
					<legend>Title</legend>
					<input type="radio" id="radio">
					<label for="radio">Click me</label>
				</fieldset>
				<div>
					<label>
						<input type="text" placeholder="First Name" required>
						<span>First Name</span>
					</label>
					<label>
						<input type="number" placeholder="Age">
						<span>Age</span>
					</label>
					<label>
						<input type="date" disabled>
						<span>Start Date</span>
					</label>
					<label>
						<input type="url">
						<span>Website</span>
					</label>
					<label>
						<input type="color" mode="hsl" value="hsl(201,67%,64%)">
						<span>Site Color</span>
					</label>
				</div>
				<fieldset>
					<legend>Your Details</legend>
					<label>
						<input type="text" placeholder="First Name" required>
						<span>First Name</span>
					</label>
					<label>
						<input type="number" placeholder="Age">
						<span>Age</span>
					</label>
					<label>
						<input type="date" disabled>
						<span>Start Date</span>
					</label>
					<label>
						<input type="url">
						<span>Website</span>
					</label>
					<label>
						<input type="color" value="#67b7e1">
						<span>Site Color</span>
					</label>
				</fieldset>
				<fieldset>
					<legend>Check all that apply:</legend>
					<label>
						<input type="checkbox">
						<span>I just like to check boxes.</span>
					</label>
					<label>
						<input type="radio" value="Yes">
						<input type="radio" value="No">
						<input type="radio" value="Maybe">
						<span>Are you ready?</span>
					</label>
					<label>
						<label>
							<input type="radio" value="Yes">
							<span>Yes</span>
						</label>
						<label>
							<input type="radio" value="No">
							<span>No</span>
						</label>
						<label>
							<input type="radio" value="Maybe">
							<span>Maybe</span>
						</label>
						<span>Are you ready?</span>
					</label>
				</fieldset>
				<fieldset>
					<legend>Other</legend>
					<label>
						<input type="password">
						<span>Passcode:</span>
					</label>
					<input type="range">
					<input type="bloink">
					<textarea></textarea>
					<select>
						<optgroup name="Group">
							Hey
							<option name="whee" value="whee">Whee</option>
							<option value="value1">Value 1</option>
							<option value="value2" selected>Value 2</option>
							<option value="value3">Value 3</option>
						</optgroup>
					</select>
					<label>Choose a browser from this list:
					<input list="browsers" name="myBrowser" /></label>
					<datalist id="browsers">
						<option value="Chrome">
						<option value="Firefox">
						<option value="Internet Explorer">
						<option value="Opera">
						<option value="Safari">
						<option value="Microsoft Edge">
					</datalist>
				</fieldset>
				<input type="submit">
				<input type="hidden">
			</form>-->
			<p>Website Design and Content © 2014-2016 Darryl Yeo. All Rights Reserved.<br>Powered by <a href="https://platformmeister.com">Platform Meister</a>.</p>
		</footer>
	</div>
	<div id="to-top"></div>
	<div id="notifications"></div>
</body>


<template id="dy-date">
	<style>
	:host {
		display: inline;
	}
	</style>
	<date></date>
</template>

<template id="dy-projects">
	<style>
		.dy-projects {
			--dy-project-margin: 0.25%;
			--dy-project-columns: 5;
			display: flex;
			flex-wrap: wrap;
			margin: calc(var(--dy-project-margin) * -1);
			margin-top: 1em;
			min-height: 90vh;
			transition: height var(--transition-fast);
			width: 100%;
		}
		@media (max-width: 93rem) {
			.dy-projects {
				--dy-project-columns: 4;
			}
		}
		@media (max-width: 74rem) {
			.dy-projects {
				--dy-project-columns: 3;
			}
		}
		@media (max-width: 55rem) {
			.dy-projects {
				--dy-project-columns: 2;
			}
		}
		@media (max-width: 36rem) {
			.dy-projects {
				--dy-project-margin: 1%;
				--dy-project-columns: 1;
			}
		}
		dy-project {
			border-radius: var(--padding-small);
			flex: 1 250px;
			margin: var(--dy-project-margin);
			width: calc(100% / var(--dy-project-columns) - var(--dy-project-margin) * 2);
		}
	</style>
	<dy-project-filters></dy-project-filters>
	<div class="dy-projects"></div>
</template>

<template id="dy-project-filters">
	<style>
		:host, #terms {
			display: flex;
			justify-content: space-between;
			margin: -0.25em -0.5em;
		}
		div[data-taxonomy] {
			justify-content: space-between;
			align-items: center;
			align-items: stretch;
			flex-wrap: wrap;
			align-content: flex-start;
			align-content: stretch;
			margin: -2px;
			padding: 0.25em 0.5em;
		}
		h3 {
			line-height: 0.5;
			margin: 2px;
			padding-right: 0.5ch;
			margin-right: auto;
			align-self: center;
		}
		[rel=tag] {
			margin: 2px;
		}
		@media (max-width: 36rem) {
			:host {
				flex-wrap: wrap;
			}
			div[data-taxonomy] {
				width: 100%;
			}
		}
	</style>
</template>


<template id="dy-project">
	<style>
		
	</style>
	<a id="featured-image" class="link"><img></a>
	<div id="details-wrapper">
		<div id="details">
			<div id="title-wrapper">
				<a class="link"><h2 id="title"></h2></a>
			</div>
			<div id="details-inner">
				<blockquote id="excerpt"></blockquote>
				<a class="link button read-more">Read More</a>
				<div id="dates">
					<h3><dy-date id="project-date"></dy-date></h3>
					<span id="modified-date-wrapper">Updated <dy-date id="modified-date"></dy-date></span>
				</div>
				<div id="terms"></div>
			</div>
		</div>
	</div>
</template>


<template id="dy-project-header">
	<style>
		dy-project-header, :host {
			flex-direction: column;
			flex: 100%;
			margin: 0;
			overflow: hidden;
			padding: var(--padding);
			position: relative;
		}
		#background, #background:before, #background * {
			background-size: 0;
			overflow: hidden;
			position: absolute;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
		}
		#background:before {
			content: '';
			background: center/contain fixed;
			background-image: inherit;
			/*filter: blur(2rem);*/background-size: 1px;
			transform: scale(1.2);
		}
		#background ~ * {
			z-index: 1;
		}
		#title-wrapper {
			background-image: radial-gradient(rgba(255, 255, 255, 0.25), transparent 75%);
			mix-blend-mode: overlay;
    		text-shadow: 0 0 5rem #fff;

			margin-bottom: var(--padding-small);
			width: 100%;
		}
		#title-wrapper h1 {
			font-size: 3.5em;
			line-height: 1.2;
			text-align: center;
			width: 100%;
		}
		#inner-wrapper {
			margin: calc(var(--padding-small-neg) / 2);
		}
		#inner-wrapper > * {
			margin: calc(var(--padding-small) / 2);
		}
		#featured-image {
			flex: 1 100%;
			max-width: max-content;
		}
		#details {
			flex-direction: column;
		}
		#details > * + * {
			margin-top: 1em;
		}
		#excerpt {
			background-color: rgba(255, 255, 255, 0.2);
			border-radius: 0.5em;
			font-size: 0.9em;
			font-style: italic;
			line-height: 1.6;
			padding: 0.75em;
			text-align: justify;
		}
		#dates {
			justify-content: space-between;
		}

		@media (max-width: 35rem) {
			#inner-wrapper {
				flex-direction: column;
			    align-items: center;
			}
			#featured-image {
				flex: 0;
			}
		}
	</style>
	<div id="background">
		<canvas></canvas>
	</div>
	<div id="title-wrapper">
		<h1 id="title"></h1>
	</div>
	<div id="inner-wrapper">
		<figure id="featured-image">
			<img>
			<figcaption></figcaption>
		</figure>
		<div id="details">
			<blockquote id="excerpt"></blockquote>
			<div id="dates">
				<h3><dy-date id="project-date"></dy-date></h3>
				<span id="modified-date-wrapper">Updated <dy-date id="modified-date"></dy-date></span>
			</div>
			<div id="terms"></div>
		</div>
	</div>
</template>


<template id="dy-notification">
	<style>
		dy-notification, :host {
			display: flex;
			justify-content: space-between;
			align-items: center;
			
			background-color: rgba(255,255,255,0.9);
			border-radius: 7px;
			border-bottom-right-radius: 4px;
			box-shadow: rgba(0,0,0,.118) 0 4px 3px -3px;
			box-sizing: content-box;
			position: relative;
			line-height: 1.4;
			margin: 3px;
			overflow: hidden;
			padding: 0.4em 0.5em;
			width: max-content;
			min-width: 10vw;
			max-width: 360px;
			min-height: min-content;
			max-height: 100px;
			transform-origin: right bottom;
			animation: NotificationShow .5s;
		}
		:host.success {
			background-color: rgba(139,195,74,0.9);
			color: rgba(255, 255, 255, 0.9);
		}
		:host.warning {
			background-color: rgba(255, 213, 79, 0.9);
		}
		:host.error {
			background-color: rgba(255,87,34,0.9);
			color: rgba(255, 255, 255, 0.9);
		}

		:host.repeat {
			animation: NotificationShow 0.3s, NotificationRepeat 0.3s;
		}
		:host.hide {
			animation: NotificationHide 0.3s ease-out forwards;
		}

		@keyframes NotificationShow {
			from {
				margin: 0;
				min-height: 0;
				max-height: 0;
				opacity: 0;
				padding-top: 0;
				padding-bottom: 0;
				transform: scale(0);
			}
		}
		@keyframes NotificationHide {
			to {
				margin: 0;
				min-height: 0;
				max-height: 0;
				opacity: 0;
				padding-top: 0;
				padding-bottom: 0;
				transform: scale(0);
			}
		}
		@keyframes NotificationRepeat {
			50% {
				transform: scale(1.1);
			}
		}

		:host > i {
			background-color: rgba(0, 0, 0, 0.05);
			display: flex;
			justify-content: center;
			align-items: center;
			margin: -0.4em -0.5em;
			/*height: 1.5em;*/
			margin-right: 1ch;
			position: absolute;
			width: 1.5em;
			height: 100%;
			right: 100%;
			top: 0;
		}
		:host > * + button {
			margin-left: 1ch;
		}
		:host > div {
			display: block;
		}
	</style>
	<i id="icon">i</i>
	<div>
		<content></content>
		<slot></slot>
	</div>
	<button class="small">OK</button>
</template>

<template id="dy-project-header">
	
</template>

<template id="dy-comments">
	<style>
		#reaction {
			flex-direction: column;
			/*align-items: center;*/
		}
		#reaction ~ * {
			margin-top: 1em;
		}
		dy-comment, dy-comment-reply {
			font-size: 0.9em;
		}
	</style>
	<div id="reaction">
		<!--<h2><span class="comment-count">Loading</span> <span class="reactions">Reactions</span></h2>-->
		<h2>Choose One or More Reactions: </h2>
		<ul>
			<li>Don't like it. Like it. Love it!</li>
			<li>Wow. Mind-blowing! HELP, I need a neurosurgeon!!</li>
			<li>Boring. Helpful.</li>
			<li>Learned something new.</li>
			<li>I have a question...</li>
			<li>I have some feedback...</li>
		</ul>
	</div>
	<dy-comment-reply></dy-comment-reply>
</template>

<template id="dy-comment">
	<style>
		:host {
			display: flex;
			/*flex-wrap: wrap;*/
			align-items: flex-start;
		}
		div {
			flex-direction: column;
		}
		div > * + *, div > * + p {
			margin-top: 0.5em;
		}

		#inner-wrapper {
			flex: 1;
		}
		blockquote, form {
			background-color: rgba(255, 255, 255, 0.5);
			box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
			border-radius: 0.75em;
			padding: 0.75em 1em;
			position: relative;
			flex-direction: column;
		}
		blockquote:before, form:before {
			content: '';
			border: solid transparent;
			border-width: 0.4em 0.5em;
			border-right-color: rgba(255, 255, 255, 0.5);
			position: absolute;
			right: 100%;
			top: 2em;
		}

		#avatar {
			border-radius: 0.75em;
			flex: 0 auto;
			margin: 0;
			margin-right: 0.75em;
			max-width: 10vw;
			width: 5em;
		/*}
		#avatar:not([src]) {*/
			height: 5em;
		}
		header {
			align-items: center;
			flex: 100%;
			font-size: 0.8em;
		}
		header * + * {
			margin-left: 0.5em;
		}
		cite {
			font-style: normal;
		}
		#author {
			font-family: var(--heading-font);
			font-size: 1.5em;
			font-weight: bold;
		}
		#comment-date {
			background: rgba(0, 0, 0, 0.05);
			padding: 0.25em;
			border-radius: 0.25em;
			display: inline-block;
			line-height: 1;
		}
		#content {
			display: block;
			margin-top: 0.25em;
		}
		#reply-button {
			margin-left: auto;
		}

		#replies:not(:empty) {
			font-size: 0.9em;
		}
		#replies > * {
			margin-top: 1em;
		}
	</style>
	<img id="avatar">
	<div id="inner-wrapper">
		<blockquote>
			<header>
				<cite>
					<a id="author" rel="nofollow"></a>
				</cite>
				<a class="link"><dy-date id="comment-date"></dy-date></a>
				<a id="reply-button">Reply</a>
				<a id="edit-button">Edit</a>
			</header>
			<div id="content"></div>
		</blockquote>
		<div id="replies">

		</div>
	</div>
</template>

<template id="dy-comment-reply">
	<style>
		:host {
			animation: Reply var(--transition-slow);
		}
		@keyframes Reply {
			from {
				max-height: 0;
				overflow: hidden;
				transform: scale(0.9);
			}
			to {
				max-height: 100vh;
			}
		}

		input, input:focus, textarea, textarea:focus {
			background: unset;
			border: unset;
    		border-radius: unset;
			box-shadow: unset;
			filter unset;
			margin: unset;
			padding: unset;
			display: inline;
		}
		textarea {
			max-width: 100%;
			width: 100%;
			min-height: 10em;
		}

		[name="author_email"] {
			font-family: var(--heading-font);
			font-size: 1.25em;
			text-align: right;
		}
	</style>
	<img id="avatar">
	<div id="inner-wrapper">
		<form action="">
			<div>
				<p><a id="sign-in">Sign in with a social account</a> to skip entering credentials: </p>
			</div>
			<hr>
			<header>
				<cite>
					<input type="text" id="author" placeholder="Your Name" name="author_name" required>
				</cite>
				<input type="email" placeholder="your_email@example.com" name="author_email" required>
			</header>
			<div id="content">
				<textarea name="content" placeholder="Your reaction..." required></textarea>
			</div>
			<button type="submit">Post Reaction</button>
		</form>
		<div>
			<h3>Formatting</h3>
			<p>**Bold** and *italics* and `code`</p>
			<p>[Link](https://darryl-yeo.com)</p>
			<p>```Code Block```</p>
		</div>
	</div>
	
	<!--<form>
		<label>
			<input type="text" name="author_name">
			<span>Name</span>
		</label>
		<label>
			<input type="email" name="author_email">
			<span>Email</span>
		</label>
	</form>-->
</template>

<template id="dy-khan">
	<style>
		:host, dy-khan {
			background-color: rgba(255, 255, 255, 0.6);
			border-radius: var(--padding-small);
			display: block;
			padding: var(--padding-small);
			margin-left: auto;
			margin-right: auto;
			max-width: 100%;
			width: max-content;
			text-align: center;
		}
		:host > * + * {
			margin-top: 0.5em;
		}
		
		#project {
			background-color: rgba(0, 0, 0, 0.02);
			border-radius: 0.5rem;
			overflow: hidden;
			/*width: var(--width, 300);
			height: var(--height, 300);*/
			max-width: 100%;
			margin-top: 0.5em;
			position: relative;
			will-change: transform;
		}
		/* Can't combine :host with class selector, doesn't work. */
		:host:not(.load) #project {
			width: 400px;
			height: 400px;
		}
		#project * {
			position: absolute;
			width: 100%;
			height: 100%;
		}
		iframe {
			position: absolute;
			width: 100%;
			transform-origin: left top;
		}
		#project.play iframe ~ * {
			pointer-events: none;
		}
		#project img {
			background-color: #000;
			background: radial-gradient(rgba(0, 0, 0, 0.6), #000);
			position: relative;
			transition: 0.3s;
		}
		#project img:not([src]) {
			width: 400px;
			padding-top: 100%;
		}
		#project:hover img {
			transform: scale(1.05);
		}
		#project.play img {
			opacity: 0;
			pointer-events: none;
			transform: scale(1.2);
		}
		#project span {
			background-image: radial-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5));
			color: #fff;
			cursor: pointer;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 3em;
			opacity: 0;
			text-shadow: 1px 2px 10px rgba(0, 0, 0, 0.2);
			transition: 0.3s;
			width: 100%;
		}
		#project:hover span {
			opacity: 1;
			transform: scale(1.2);
		}
		#project.play span {
			opacity: 0;
			transform: scale(2);
		}
		#buttons {
			overflow: hidden;
			max-height: 0;
			text-align: left;
			transition: 0.3s;
		}
		#project.play #buttons {
			margin-top: 5px;
			max-height: 42px;
		}
		#buttons > * + * {
			float: right;
		}
		#icon {
			position: absolute;
		}
	</style>
	<a class="link"><h3 id="title"></h3></a>
	<dy-khan-stats id="stats">
		<span slot="votes"></span>
		<span slot="spin-offs"></span>
		<span slot="lines"></span>
	</dy-khan-stats>
	<div id="project">
		<iframe></iframe>
		<img id="thumbnail">
		<span>►Play</span>
	</div>
	<div class="buttons">
		<button class="play-restart">Play</button>
		<button class="stop">Stop</button>
	</div>
	<dy-khan-badge id="fork" title-prefix="Based on"></dy-khan-badge>
	<span id="icon"></span>
</template>

<template id="dy-khan-badge">
	<a class="link">
		<img id="thumbnail">
	</a>
	<div>
		<p><a class="link"><span id="title-prefix"></span> <span id="title"></span></a></p>
		<dy-khan-stats id="stats">
			<span slot="votes"></span>
			<span slot="spin-offs"></span>
			<span slot="lines"></span>
		</dy-khan-stats>
	</div>
	<style>
		:host {
			display: flex;
			align-items: stretch;
			text-align: left;
		}
		img {
			height: 4em;
		}
		div {
			flex-direction: column;
			margin-left: 1em;
		}
	</style>
</template>

<template id="dy-khan-stats">
	<style>
		:host {
		}
		span + span {
			margin-left: 0.5em;
		}
		.votes {
			color: #7cb342;
		}
		.spin-offs {
			color: #7986cb;
		}
		.lines {
			color: #ec407a;
		}
	</style>
	<span class="votes"><slot name="votes"></slot> Votes</span>
	<span class="spin-offs"><slot name="spin-offs"></slot> Spin-offs</span>
	<span class="lines"><slot name="lines"></slot> Lines</span>
</template>
<?php wp_footer() ?>

<!-- build:js assets/all.min.js -->
<!--
<script src="assets/libraries/moment.min.js"></script>

<script src="assets/libraries/prism.js"></script>

<script src="assets/js.js"></script>
<script src="assets/notify.js"></script>
<script src="assets/DY.js"></script>

<script src="assets/libraries/webcomponents.min.js"></script>
<script src="assets/web-components.js"></script>

<script src="assets/main.js"></script>
<script src="assets/canvas.js"></script>
-->
<!-- endbuild -->
</html>