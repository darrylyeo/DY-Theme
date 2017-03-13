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

	/* Need a way to get this.tagName but from Constructor
	static get $template(){
		return $('#' + this.tagName.toLowerCase())
	}

	static get $style(){
		return this.$template.find('style')[0]
	}*/
	
	get $template(){
		const id = '#' + this.tagName.toLowerCase()
		if(document.currentScript){
			// Called from within HTML Import, when the <template> may not yet have been added to the main document
			return document.currentScript.ownerDocument.find(`template${id}`)[0]
		}else{
			return $(id)
		}
	}

	get $style(){
		//console.log('$style', this.tagName, this.root, this.root.find('style')[0], this.root.querySelector('style'))
		//console.trace()
		return this.root.querySelector('style')
	}

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
		//X('this.shadowRoot', this.tagName, this.shadowRoot)
		let root = this.shadowRoot
		if(!root){
			root = this.attachShadow({mode: 'open'})
			this.init()
		}
		if('ShadyDOM' in window){
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
		this._init = true

		const root = this.root
		//this.$template.content.import().appendTo(root)
		root.appendChild(document.importNode(this.$template.content, true))
		//root.append(unwrap(document.importNode(this.$template.content, true)))
		//X('template content', this.tagName, this.$template.content, document.importNode(this.$template.content, true), root)

		this.addStyle(DYElement.$style)
		DYNavigation.processLinks( this.find('a') )
	}

	addStyle($style){
		const root = this.root

		if(this.$style)
			$style.import().insertBefore(this.$style)
		else
			$style.import().appendTo(root)
		//document.importNode(DYElement.$style, true).insertBefore(root.find('style')[0])
	}
}
DYElement.$style = $$$('style', {
	html: Array.from(document.styleSheets, s => s.href ? `@import "${s.href}";` : '').join('\n')

	// Doesn't work in Safari (TypeError: ...document.styleSheets is not a function?!)
		//html: [...document.styleSheets].map(s => s.href ? `@import "${s.href}";` : '').join('\n')
})

//window.addEventListener('WebComponentsReady', e => {
const webComponents = [
	'dy-header',
	'dy-project',
	'dy-projects',
	'dy-project-header',
	'dy-blog',
	'dy-notification',
	'dy-date',
	'dy-comments',
	'khan',
]
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
//})