DY.mapTaxonomyName = function(taxonomyName){
	if(taxonomyName === 'category') return 'categories'
	if(taxonomyName === 'post_tag') return 'tags'
	return taxonomyName
}

DY.getData = new Promise((resolve, reject) => {
	if(DY.data.objects){
		resolve(DY.data.objects)
		return
	}

	function assignType(objects, objectType){
		for(const object of objects){
			object.objectType = objectType
		}
		return objects
	}

	Promise.all([
		//./wp-json/wp/v2/pages?filter[page-category]=project
		getJSON('./wp-json/wp/v2/pages?per_page=100').then(
			pages => assignType(pages, 'post')
		),
		getJSON('./wp-json/wp/v2/posts?per_page=100&post_status=published').then(
			posts => assignType(posts, 'post')
		),
		getJSON('./wp-json/wp/v2/taxonomies').then(
			taxonomies => assignType(Object.values(taxonomies), 'taxonomy')
		),
		getJSON('./wp-json/wp/v2/terms').then(
			termsByTaxonomy => assignType(
				[].concat(...Object.values(termsByTaxonomy)),
				'term'
			)
		)
	])
	.then(objects => resolve([].concat(...objects)))
	.catch(reject)
}).then(objects => {
	const objectsByType = {
		'post': [],
		'taxonomy': [],
		'term': []
	}
	const objectsByURL = {}
	
	for(const object of objects){
		objectsByType[object.objectType].push(object)
		if(object.link){
			objectsByURL[URL.pathName(object.link)] = object
		}
	}


	const termsByID = {}
	let PROJECT_CATEGORY_ID

	for(const term of objectsByType['term']){
		termsByID[term.term_id] = term
		if(term.taxonomy === 'page-category' && term.slug === 'project'){
			PROJECT_CATEGORY_ID = term.term_id
		}
	}


	const postsByPostType = {
		'page': [],
		'post': [],
		'project': []
	}

	for(const post of objectsByType['post']){
		const type = post.terms.includes(PROJECT_CATEGORY_ID) ? 'project' : post.type
		postsByPostType[type].push(post)
	}


	DY.data.objects = objects

	WP.data = {
		objects,
		objectsByType,
		objectsByURL,
		termsByID,
		postsByPostType,
		PROJECT_CATEGORY_ID
	}

	return WP.data
})


WP.getUser = getJSON('./wp-json/wp/v2/users/me', {
	headers: {
		'X-WP-Nonce': WP.nonce
	}
}).then(data => {
	X(data)
	WP.user = data
	return data
}).catch(e => {
	X('User is not logged in.', e)
	return new Promise(() => {}) // never resolve
})

/*fetch('./wp-json/wp/v2/users/me', {
	headers: new Headers({
		'X-WP-Nonce': WP.nonce
	})
}).then(data => {
	data = JSON.parse(response)
	X(data)
	DY.user = data
})*/


DY.getAssetsList = getJSON(WP.parentTheme + '/assets/assets.json')