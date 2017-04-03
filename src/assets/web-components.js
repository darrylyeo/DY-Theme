const USING_SHADY_CSS = 'ShadyCSS' in window && !ShadyCSS.nativeShadow
const USING_SHADY_DOM ='ShadyDOM' in window

// Get Custom Element name from JS constructor
// Related: https://github.com/w3c/webcomponents/issues/566
{
	const elementConstructors = new WeakMap()

	// Can't we use CustomElementRegistry.prototype instead?
	customElements._define = customElements.define
	customElements.define = function(name, constructor, options){
		elementConstructors.set(constructor, name)
		return this._define(...arguments)
	}

	customElements.getName = function(constructor){
		return elementConstructors.get(constructor)
	}
}

const DYElement = class extends HTMLElement {
	constructor(){
		super()

		// TODO: Find a way to figure out if a custom element was made through cloning
		if(this.find('style').length){
			 this._init = true
		}
	}

	attributeChangedCallback(attr, oldVal, newVal){

	}

	static get $template(){
		const tagName = customElements.getName(this)

		let $template
		const id = '#' + tagName
		if(document.currentScript){
			// Called from within HTML Import, when the <template> may not yet have been added to the main document
			$template = document.currentScript.ownerDocument.find(`template${id}`)[0]
		}else{
			$template = $(id)
		}

		if(USING_SHADY_CSS){
			ShadyCSS.prepareTemplate($template, tagName)
		}

		return $template
	}

	static get $style(){
		if(this === DYElement){
			return DYElement._$style
		}
		return this.$template.content.find('style')[0]
	}
	
	/*get $template(){
		const id = '#' + this.tagName.toLowerCase()
		if(document.currentScript){
			// Called from within HTML Import, when the <template> may not yet have been added to the main document
			return document.currentScript.ownerDocument.find(`template${id}`)[0]
		}else{
			return $(id)
		}
	}*/

	/*get $style(){
		//console.log('$style', this.tagName, this.root, this.root.find('style')[0], this.root.querySelector('style'))
		//console.trace()
		return this.root.querySelector('style')
	}*/


	/*get root(){
		let root = this.shadowRoot || this._shadowRoot
		if(!root){
			root = this._shadowRoot = this.attachShadow({mode: 'open'})
			//root = this.createShadowRoot()
			X(this.shadowRoot, this.attachShadow({mode: 'open'}))
			this.init()
		}
		return root
	}*/
	get root(){
		let root = this.shadowRoot
		if(!root){
			root = this.attachShadow({mode: 'open'})
			this.init()
		}
		if(USING_SHADY_DOM){
			root.find = this.find.bind(this)
			root.querySelector = this.querySelector.bind(this)
			root.querySelectorAll = this.querySelectorAll.bind(this)
		}
		return root
	}
	/*get root(){
		let root = this.shadowRoot || this._shadowRoot
		if(!root){
			root = this._shadowRoot = this.attachShadow({mode: 'open'})
			X(root)
			this.init()

		}
		return root
	}*/

	init(){
		if(this._init) return

		if(USING_SHADY_CSS){
			ShadyCSS.styleElement(this)
		}

		const root = this.root

		this.addStyle(DYElement.$style)

		const inheritTemplate = this.constructor._DY_INHERIT_TEMPLATE !== false

		for(let Prototype = this.constructor; Prototype !== DYElement; Prototype = Object.getPrototypeOf(Prototype)){
			if(inheritTemplate || Prototype === this.constructor){
				// Inherit entire template

				this.addTemplate(Prototype.$template)
			}else{
				// Inherit styles only
				this.addStyle(Prototype.$style)
			}
		}

		DYNavigation.processLinks( root.find('a') )

		this._init = true
	}

	addTemplate($template){
		const root = this.root

		$template.content.import().appendTo(root)
		
		//root.appendChild(document.importNode($template.content, true))

		//root.append(unwrap(document.importNode($template.content, true)))
		//X('template content', this.tagName, $template.content, document.importNode(this.$template.content, true), root)
	}

	addStyle($style){
		const root = this.root

		if(this.$style)
			$style.import().insertBefore(this.$style)
		else
			$style.import().appendTo(root)

		document.importNode(DYElement.$style, true).insertBefore(root.find('style')[0])
	}
}

DYElement._$style = $$$('style', {
	html: Array.from(document.styleSheets)
		.filter(s => s.href &&
			(s.href.includes('css.css') || s.href.includes('copyright.css') || s.href.includes('forms.css'))
		)
		.map(s => `@import '${s.href}';`)
		.join('\n')
	//html: Array.from(document.styleSheets, s => s.href ? `@import "${s.href}";` : '').join('\n')

	// Doesn't work in Safari (TypeError: ...document.styleSheets is not a function?!)
		//html: [...document.styleSheets].map(s => s.href ? `@import "${s.href}";` : '').join('\n')
})


DY.getAssetsList.then(assets => {
	if(!assets.settings.asyncHTML) return

	const webComponents = assets.html

	for(let handle of webComponents){
		const $link = document.createElement('link')
		$link.rel = 'import'
		$link.href = WP.parentTheme + `/assets/components/${handle}.html`
		$link.id = handle + '-import'
		$link.on({
			load(){
				document.body.append(this.import.find('template'))
			}
		})
		document.head.appendChild($link)

		/*const $link = $$$('link').attr({
			rel: 'import',
			href: WP.parentTheme + `/assets/components/${handle}.html`
		}).appendTo(document.head)*/


		//if('import' in document.createElement('link')){
			
			//wrap($link).appendTo(wrap(document.head))
		/*}else{
			get($link.href).then(data => {
				document.body.insertAdjacentHTML('beforeend', data)
			})
		}*/
	}
})