<?php
add_action('the_content', function($content){
    if(!empty($content)) return $content;
    ob_start();
    ?>
    <section>
		<p>Lorem <a>ipsum</a> dolor sit amet. Lorem <a href="https://darryl-yeo.com">ipsum</a> dolor sit amet. <em>Lorem ipsum dolor sit amet</em>. Lorem ipsum dolor sit amet.</p>
		<p>Lorem ipsum <strong>dolor sit amet</strong>. Lorem <a href="#">ipsum</a> dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.</p>
		<p>Lorem <a href="https://google.com">ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. <em>Lorem ipsum dolor</em> sit amet</a>.</p>
	</section>
	<section>
		<h2>That's one jittery critter.</h2>
		<p>Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.</p>
		<pre><code>* {
	--whee: #C0FFEE;
}
var DYKhan = document.registerElement('dy-khan', {
	prototype: Object.assign(Object.create(HTMLElement.prototype), {
		createdCallback: function(){
			let _this = this
			let root = this.createShadowRoot()
			root.appendChild(document.importNode(document.getElementById('dy-khan').content, true))
			document.importNode(style, true).insertBefore(root.querySelector('style'))
			
			let id = this.dataset.id
			let project = KhanProject(id)
			getJSON(project.scratchpad, function(data){
				_this.classList.add('load')
				root.updateWithModel({
					'#title': data.title,
					'#stats .votes': data.sumVotesIncremented,
					'#stats .spin-offs': data.spinoffCount,
					'#stats .lines': data.revision.code.split('\n').length,
					'#thumbnail[src]': data.imageUrl,
					'#project[style]': {
						'width': data.width + 'px',
					},
					'#fork[data-id]': data.originScratchpadId,
				})
			})
			
			root.find('#project').on('click', function(){
				this.classList.add('play')
				X(this.find('iframe'), project.embedded)
				this.find('iframe').src = project.embedded
				this.find('iframe').setAttribute('src', project.embedded)
			})
		},
		detachedCallback: function(){
			
		},
		attributeChangedCallback: function(attr, oldVal, newVal){
			
		}
	})
})</code></pre>
		<p>Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.</p>
		<p>Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.</p>
	</section>
	<aside>
		<dy-khan data-id="2722008038"></dy-khan>
	</aside>
	<section>
		<h2>That's one jittery critter.</h2>
		<p>Lorem ipsum dolor <button>sit amet</button>. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.</p>
		<p>Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.</p>
		<p>Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.</p>
		<div class="buttons">
			<button>Play</button>
			<button disabled>No Clicky</button>
			<button>Restart</button>
		</div>
	</section>
    <?php
    return ob_get_clean();
});