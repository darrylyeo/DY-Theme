const DYNavigation = {
	navigatingTo: '',
	prerenderedURLs: [],

	navigateTo(url, host, pushNewState = false){
		if(!url || host !== location.host/* || url === location.href*/) return false

		this.navigatingTo = url

		if(pushNewState) {
			history.pushState({
				whee: 9
			}, 'bloink', url)
		}

		get(url).then(data => {
			if(this.navigatingTo !== url) return

			/*if(pushNewState) {
				history.pushState({
					whee: 9
				}, 'bloink', url)
			}*/

			const $$document = document.createRange().createContextualFragment(data)

			for(const selector of ['title']){
				$(selector).replaceWith($$document.find(selector))
			}
			for(const $$meta of $$document.findAll('meta')){
				const $meta = $(`meta[property="${$$meta.attr('property')}"]`) || $(`meta[name="${$$meta.attr('name')}"]`)
				if($meta) $meta.replaceWith($$meta)
			}

			this.onPageLoad()

			$('dy-page').animateMain(() => {
				this.onPageRender()
			})
		})

		return true
	},


	processLinks($$a){
		$$a.on({
			click: this.openLink,
			mouseover: this.onLinkMouseOver
		})
	},
	// Called with scope of <a> element
	openLink(e){
		if(!this.href) return
		if(e.metaKey) return
		if(this.host !== location.host){
			window.open(this.href, '_blank')
			e.preventDefault()
		}else if(this.href === '#'){
			e.preventDefault()
		}else if(DYNavigation.navigateTo(this.href, this.host, true))
			e.preventDefault()
	},
	onLinkMouseOver(){
		const href = this.href
		if(!href || DYNavigation.prerenderedURLs.includes(href)) return

		$$$('link').attr({
			rel: 'prerender',
			href
		}).appendTo(document.head)
		
		DYNavigation.prerenderedURLs.push(href)
	},


	onPageLoad(){
		DY.getData.then(() => {
			const currentURL = window.location.pathname
			const siteURL = URL.pathName(WP.siteURL)

			WP.current = DY.data.objects[currentURL]
			WP.queryType = ''
			WP.postType = ''

			if(WP.current === undefined){
				WP.queryType = '404'
			}
			
			else if(currentURL.replace(/\/$/, '') === siteURL.replace(/\/$/, '')){
				WP.queryType = 'front-page'
				//WP.queryType = 'archive'
				//WP.postType = 'project'
			}

			// Temporary
			else if(currentURL.includes('category')){
				WP.queryType = 'archive'

				if(WP.postType === 'project'){
					data = DY.data.objects[siteURL]
				}
			}

			// Also temporary
			else if(WP.current.slug === 'blog'){
				WP.queryType = 'archive'
				WP.postType = 'post'
			}

			else {
				WP.queryType = 'single'

				if(WP.current.terms.includes(DY.PROJECT_CATEGORY.term_id)){
					WP.postType = 'project'
				}else{
					WP.postType = WP.current.type
				}
			}

			this.processLinks( $$('a') )

			window.dispatchEvent(new CustomEvent('pageload'))
		})
	},
	onPageRender(){
		window.dispatchEvent(new CustomEvent('pagerender'))
	}
}

//documentReady.then(() => {
customElements.whenDefined('dy-page').then(() => {
	DYNavigation.onPageLoad()
	window.once('pageload', () => DYNavigation.onPageRender())
})


window.on('popstate', e => {
	DYNavigation.navigateTo(location.href, location.host)
	X(e)
	e.preventDefault()
})
//onbeforeunload