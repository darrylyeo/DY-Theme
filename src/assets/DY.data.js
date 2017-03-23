DY.mapTaxonomyName = function(taxonomyName){
	if(taxonomyName === 'category') return 'categories'
	if(taxonomyName === 'post_tag') return 'tags'
	return taxonomyName
}

DY.getData = Promise.race([
	new Promise(function(resolve){
		if(DY.data.objects && DY.data.posts && DY.data.taxonomies && DY.data.terms && DY.data.termsBySlug)
			resolve()

		if(!DY.data.objects) DY.data.objects = {}
		if(!DY.data.posts) DY.data.posts = {}
		if(!DY.data.taxonomies) DY.data.taxonomies = {}
		if(!DY.data.terms) DY.data.terms = {}
		if(!DY.data.termsBySlug) DY.data.termsBySlug = {}
	}),
	Promise.all([
		//./wp-json/wp/v2/pages?filter[page-category]=project
		getJSON('./wp-json/wp/v2/pages?per_page=100').then(data => {
			for(let post of data){
				DY.data.posts[post.id] = post
				DY.data.objects[post.link] = post
			}
		}),
		getJSON('./wp-json/wp/v2/posts?per_page=100&post_status=published').then(data => {
			for(let post of data){
				DY.data.posts[post.id] = post
				DY.data.objects[post.link] = post
			}
		}),
		getJSON('./wp-json/wp/v2/taxonomies').then(data => {
			DY.data.taxonomies = data
			for(let taxonomy of Object.values(data)){
				DY.data.objects[taxonomy.link] = taxonomy
			}
		}),
		getJSON('./wp-json/wp/v2/terms').then(data => {
			//DY.data.terms = data
			for(let taxonomyName in data){
				const terms = data[taxonomyName]
				for(let term of terms){
					DY.data.terms[term.term_id] = term
					DY.data.termsBySlug[taxonomyName + '.' + term.slug] = term
					DY.data.objects[term.link] = term
				}
			}
		}),
		/*getJSON('./wp-json/wp/v2/users/me', {
			headers: {
				'X-WP-Nonce': WP.nonce
			}
		}).then(data => {
			X(data)
			DY.user = data
		})*/
		/*fetch('./wp-json/wp/v2/users/me', {
			headers: new Headers({
				'X-WP-Nonce': WP.nonce
			})
		}).then(data => {
			data = JSON.parse(response)
			X(data)
			DY.user = data
		})*/
	])
])


DY.getAssetsList = getJSON(WP.parentTheme + '/assets/assets.json')