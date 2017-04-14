DY.mapTaxonomyName = function(taxonomyName){
	if(taxonomyName === 'category') return 'categories'
	if(taxonomyName === 'post_tag') return 'tags'
	return taxonomyName
}

DY.addObject = function(object){
	if(object.link){
		DY.data.objects[URL.pathName(object.link)] = object
	}else{
		//X(object)
	}
}

DY.getData = Promise.race([
	new Promise(function(resolve){
		if(DY.data.objects && DY.data.posts && DY.data.taxonomies && DY.data.terms)
			resolve()

		if(!DY.data.objects) DY.data.objects = {}
		if(!DY.data.posts) DY.data.posts = {}
		if(!DY.data.taxonomies) DY.data.taxonomies = {}
		if(!DY.data.terms) DY.data.terms = {}
	}),
	Promise.all([
		//./wp-json/wp/v2/pages?filter[page-category]=project
		getJSON('./wp-json/wp/v2/pages?per_page=100').then(data => {
			for(const post of data){
				DY.data.posts[post.id] = post
				DY.addObject(post)
			}
		}),
		getJSON('./wp-json/wp/v2/posts?per_page=100&post_status=published').then(data => {
			for(const post of data){
				DY.data.posts[post.id] = post
				DY.addObject(post)
			}
		}),
		getJSON('./wp-json/wp/v2/taxonomies').then(data => {
			DY.data.taxonomies = data
			for(const taxonomy of Object.values(data)){
				DY.addObject(taxonomy)
			}
		}),
		getJSON('./wp-json/wp/v2/terms').then(data => {
			//DY.data.terms = data
			for(const taxonomyName in data){
				const terms = data[taxonomyName]
				for(const term of terms){
					DY.data.terms[term.term_id] = term
					DY.addObject(term)
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

DY.getData.then(() => {
	DY.PROJECT_CATEGORY = Object.values(DY.data.terms)
		.find(term =>
			term.taxonomy === 'page-category' && term.slug === 'project'
		)
	DY.projects = Object.values(DY.data.posts)
		.filter(post =>
			post['page-category'] && post['page-category'].includes(DY.PROJECT_CATEGORY.term_id)
		)
})


DY.getAssetsList = getJSON(WP.parentTheme + '/assets/assets.json')