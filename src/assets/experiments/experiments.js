const DYExperiments = {
	init(){
		const _this = this

		$DYPage.$header.$experiments.findAll('a').on('click', function() {
			_this.toggleExperiment(this.dataset.experiment)
		})
		this.updateAllExperiments()

		// Clear experiments with the "e" key
		document.keyup(e => {
			if(e.key === 'e'){
				this.toggleAllExperiments(false)
			}
		})
	},

	experiments: DY.data.experiments,

	experimentFunctions: {
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
		}
	},

	updateExperiment(handle){
		const $this = this.getToggleLink(handle)

		const active = this.experiments[handle]
		$this.addClass(active, 'active')

		const href = `${WP.parentTheme}/assets/experiments/${handle}.css`
		DYStyle.toggle(active, href)

		if(handle in this.experimentFunctions){
			this.experimentFunctions[handle]()
		}
	},
	updateAllExperiments(){
		for(const handle in this.experiments){
			this.updateExperiment(handle)
		}
	},
	toggleExperiment(handle, active){
		const experiments = this.experiments

		const oldActive = experiments[handle]
		if(active === undefined) active = experiments[handle] = !experiments[handle]
		else experiments[handle] = active

		// Do the following only if changed
		if(oldActive !== active){
			notify(`${this.getToggleLink(handle).text} experiment ${active ? 'activated' : 'deactivated'}.`)
			if(active) notify('Press <kbd>e</kbd> at any time to disable all experiments.')
			this.updateExperiment(handle, true)
		}
	},
	toggleAllExperiments(active){
		for(const handle in this.experiments){
			this.toggleExperiment(handle, active)
		}
	},

	getToggleLink: handle => $DYPage.$header.$experiments.find(`[data-experiment="${handle}"]`)
}

window.on('pagerender', () => {
	DYExperiments.init()
})