const experimentFunctions = {
	['night-mode'](active){
		const nightModeReplace = {
			'#ffffff': '#272727',
			'#fff': '#272727',
			'white': '#272727',
			'255, 255, 255': '39,39,39',
			'255,255,255': '39,39,39',
			'250,250,250': '39,39,39',
			'245,245,245': '39,39,39',
			//'#fefefe': '#282828',
			'#fafafa': '#323232',
			//'#f9f9f9': '#333333',
			'#f6f6f6': '#363636',
			'246, 246, 246': '#363636',
			///'#f1f2f2': '#3a3a3a',
			//'#f2efef': '#3d3d3',
			//'#ebeaea': '#434343',
			'#e5e5e5': '#575757',
			//'#e0dede': '#5e5e5e',
			//'#dcdadb': '#616362',
			//'#d2d3d4': '#2D2C2B',
			//'210, 211, 212': '#2D2C2B',
			//'#d2d2d2': '#6a6a6a',
			'#747474': '#8C8989',
			//'background-color:#333': 'background-color:#E4E4E4',
			//'border-color:#333': 'border-color:#E4E4E4',
			'#333333': '#BFBFBF',
			'#333': '#BFBFBF',
			'50,50,50': '255, 255, 255',
			'21,21,21': '255, 255, 255',
			'#000000': '#ffffff',
			'#000': '#fff',
			'0, 0, 0': '255, 255, 255',
			'0,0,0': '255, 255, 255',
			'black;': 'white;',
		}
		Object.keys(nightModeReplace).forEach((key, i) => {
			nightModeReplace[key] += ` /** ${i} **/`
		})
		const reverseNightModeReplace = nightModeReplace.invert()

		const replace = active ? nightModeReplace : reverseNightModeReplace

		for(const $this of $$('header, main, style')){
			$this.html($this.html().replaceAll(replace))
		}
		
		document.body
			.attr('style', (document.body.attr('style') || '').replaceAll(replace))
			.toggleClass(active, 'night-mode')
	},

	['pin-window'](active){
		let {screenX, screenY} = window
		!function(){
			if(screenX !== window.screenX || screenY !== window.screenY){
				$('body').css({
					'min-width': screen.width + 'px',
					'min-height': screen.height + 'px',
					transform: `translate(${-screenX}px, ${-screenY}px)`,
					transition: 'none'
				})

				screenX = window.screenX
				screenY = window.screenY
			}
		}.interval()
	}
}


class DYExperiment {
	constructor(handle, callback){
		this.handle = handle
		if(callback){
			this.callback = callback
		}

		this.$toggle.on('click', () => this.toggle())
		this.update()

		// Clear experiments with the "e" key
		document.keyup(e => {
			if(e.key === 'e'){
				this.toggle(false)
			}
		})
	}

	toggle(active = !this.isActive){
		const wasActive = this.isActive

		DY.data.experiments[this.handle] = active

		if(wasActive !== active){
			notify(`${this.name} experiment ${this.isActive ? 'activated' : 'deactivated'}.`)
			if(this.isActive){
				notify('Press <kbd>e</kbd> at any time to disable all experiments.')
			}
			this.update()
		}
	}

	update(){
		const isActive = this.isActive

		// $toggle's .active class
		this.$toggle.toggleClass(isActive, 'active')

		// Global stylesheet
		DYStyle.toggle(isActive, this.stylesheet)

		// Callback
		if(this.callback){
			this.callback(isActive)
		}
	}

	static get $toggles(){
		return $DYPage.$header.$experiments.findAll('a')
	}
	get $toggle(){
		return this.constructor.$toggles.filter(`[data-experiment="${this.handle}"]`)[0]
	}

	get name(){
		return this.$toggle.text
	}
	get stylesheet(){
		return `${WP.parentTheme}/assets/experiments/${this.handle}.css`
	}
	get isActive(){
		return DY.data.experiments[this.handle]
	}
}


window.on('pagerender', () => {
	for(let $toggle of DYExperiment.$toggles){
		const handle = $toggle.dataset.experiment
		new DYExperiment(handle, experimentFunctions[handle])
	}
})