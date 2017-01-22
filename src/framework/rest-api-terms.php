<?php
add_action('rest_api_init', function () {
	register_rest_route('wp/v2', '/terms', array(
		'methods' => 'GET',
		'callback' => function(){
			$data = [];
			$data['category'] = get_terms('category');
			$data['post_tag'] = get_terms('post_tag');

			$taxonomies = get_taxonomies(
				[
					'public' => true,
					//'_builtin' => false
				],
				'names',
				'and'
			);
			foreach ($taxonomies as $key => $taxonomy) {
				$data[$taxonomy] = get_terms([
					'taxonomy' => $taxonomy,
					'hide_empty' => false
				]);
			}
			return new WP_REST_Response($data, 200);
		}
	));
});