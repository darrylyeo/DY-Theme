const DYNavigation = {
	navigatingTo: '',
	prerenderedURLs: [],

	navigateTo(url, host, pushNewState){
		if(!url || host !== location.host/* || url === location.href*/) return false

		this.navigatingTo = url

		history.pushState({
			whee: 9
		}, 'bloink', url)

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
			const currentURL = window.location.origin + window.location.pathname

			WP.current = DY.data.objects[currentURL]
			WP.queryType = ''
			WP.postType = ''

			if(currentURL.replace(/\/$/, '') === WP.siteURL.replace(/\/$/, '')){
				WP.queryType = 'front-page'
			}

			// Temporary
			else if(currentURL.includes('category')){
				WP.queryType = 'archive'
			}

			// Also temporary
			else if(WP.current.slug === 'blog'){
				WP.queryType = 'archive'
				WP.postType = 'post'
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

			this.processLinks( $$('a') )

			window.dispatchEvent(new CustomEvent('pageload'))
		})
	},
	onPageRender(){
		window.dispatchEvent(new CustomEvent('pagerender'))
	}
}

documentReady.then(() => {
	DYNavigation.onPageLoad()
	window.once('pageload', () => DYNavigation.onPageRender())
})


window.on('popstate', e => {
	DYNavigation.navigateTo(location.href, location.host)
	X(e)
	e.preventDefault()
})
//onbeforeunload