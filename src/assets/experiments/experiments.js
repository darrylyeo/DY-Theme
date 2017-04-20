;{

const experiments = DY.data.experiments

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



const experimentFunctions = {
	'night-mode': active => {
		const replace = active ? nightModeReplace : reverseNightModeReplace

		for(const $this of $$('header, main, style')){
			$this.html($this.html().replaceAll(replace))
		}
		
		document.body
			.attr('style', (document.body.attr('style') || '').replaceAll(replace))
			.toggleClass(active, 'night-mode')
	},
	/*'ajax-navigation': active => {
		if(active){
			$.getScript(WP.childTheme + "/js/libraries/history.js")
			$.getScript(WP.childTheme + "/js/ajaxify.js")
		}else{
			$.ajaxifyKill && $.ajaxifyKill()
		}
	}*/
}

const getToggleLink = function(handle){
	return $DYPage.$header.$experiments.find(`[data-experiment="${handle}"]`)
}

const updateExperiment = function(handle){
	const $this = getToggleLink(handle)

	const active = experiments[handle]
	$this.addClass(active, 'active')

	const href = `${WP.parentTheme}/assets/experiments/${handle}.css`
	DYStyle.toggle(active, href)

	if(handle in experimentFunctions){
		experimentFunctions[handle]()
	}
}
const updateAllExperiments = function(){
	for(const handle in experiments){
		updateExperiment(handle)
	}
}
const toggleExperiment = function(handle, active){
	const oldActive = experiments[handle]
	if(active === undefined) active = experiments[handle] = !experiments[handle]
	else experiments[handle] = active

	// Do the following only if changed
	if(oldActive !== active){
		notify(`${getToggleLink(handle).text} experiment ${active ? 'activated' : 'deactivated'}.`)
		if(active) notify('Press <kbd>e</kbd> at any time to disable all experiments.')
		updateExperiment(handle, true)
	}
}
const toggleAllExperiments = function(active){
	for(const handle in experiments){
		toggleExperiment(handle, active)
	}
}

window.on('pagerender', () => {
	$DYPage.$header.$experiments.findAll('a').on('click', function() {
		toggleExperiment(this.dataset.experiment)
	})
	updateAllExperiments()
})





// Clear experiments with the "e" key
document.keyup(e => {
	if(e.key === 'e'){
		toggleAllExperiments(false)
	}
})

}