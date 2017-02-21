const prerenderedURLs = []
$$('a').on('mouseover', function(){
	if(!this.href || prerenderedURLs.includes(this.href)) return
	
	const link = document.createElement('link')
	link.setAttribute('rel', 'prerender')
	link.setAttribute('href', this.href)
	document.head.append(link)
	
	prerenderedURLs.push(this.href)
})


const DYNavigation = new class {
	constructor(){
		this.navigatingTo = ''
	}

	navigateTo(url, host, pushNewState){
		if(!url || host !== location.host/* || url === location.href*/) return false

		this.navigatingTo = url

		history.pushState({
			whee: 9
		}, 'bloink', url)
		this.onPageLoad()

		get(url).then(data => {
			if(this.navigatingTo !== url) return

			if(pushNewState)
				history.pushState({
					whee: 9
				}, 'bloink', url)

			const $$document = document.createRange().createContextualFragment(data)

			for(let selector of ['title']){
				$(selector).replaceWith($$document.find(selector)[0])
			}
			for(let $$meta of $$document.find('meta')){
				const $meta = $(`meta[property="${$$meta.attr('property')}"]`) || $(`meta[name="${$$meta.attr('name')}"]`)
				if($meta) $meta.replaceWith($$meta)
			}

			const $main = $('main')
			let $$main = $$document.find('main')[0]

			this.onPageLoad()

			const initialStyle = $main.attr('style')

			const initialHeight = $main.clientHeight
			const style = {
				opacity: '0',
				transform: 'scale(0.95) translate(0, 2.5vh)'
			}
			$main.css(style)
			$$main.css(style)
			$main.once('transitionend', () => {
				//$main.replaceWith($$main)
				$$main = $main

				const finalHeight = $$main.clientHeight

				$$main.css({
					height: initialHeight + 'px',
				})

				;(() => {
					$$main.css({
						height: finalHeight + 'px',
						opacity: '',
						transform: '',
					})
					$$main.once('transitionend', function(){
						this.attr('style', initialStyle)
					}, true)
				}).delay(1)

				$$main.find('a').on('click', this.openLink)
				this.onPageAnimate()
			}, true)
		})

		return true
	}

	// Called with scope of <a> element
	openLink(e){
		if(!this.href) return
		if(e.metaKey) return
		if(this.host !== location.host){
			window.open(this.href, '_blank')
			e.preventDefault()
		}else if(DYNavigation.navigateTo(this.href, this.host, true))
			e.preventDefault()
	}

	onPageLoad(){
		DY.getData.then(() => {
			/*const id = $('main').dataset.id
			const type = $('main').dataset.type

			switch(type){
				case '404':

			}*/

			WP.current = DY.data.objects[window.location]

			if(window.location.href === WP.siteURL){
				WP.queryType = 'front-page'
			}

			// Temporary
			else if(window.location.href.includes('category')){
				WP.queryType = 'archive'
			}

			else if(WP.current === undefined){
				WP.queryType = '404'
			}else if(WP.current.type === 'page' || WP.current.type === 'post'){
				const pageCategory_project_id = DY.data.termsBySlug['page-category.project'].term_id
				if(WP.current.categories.includes(pageCategory_project_id)){
					WP.queryType = 'single'
					WP.postType = 'project'
				}else{
					WP.queryType = 'single'
					WP.postType = 'project'
				}
			}

			window.dispatchEvent(new CustomEvent('pageload'))
		})
	}
	onPageAnimate(){
		window.dispatchEvent(new CustomEvent('pageanimate'))
	}
}

documentReady.then(() => DYNavigation.onPageLoad())

$$('a').on('click', DYNavigation.openLink)
window.on('popstate', () => {
	DYNavigation.navigateTo(location.href, location.host)
})