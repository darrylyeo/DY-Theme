<?php

add_action('rest_api_init', function () {
	register_rest_field( ['page', 'post'],
		'terms',
		array(
			/**
			 * Get the value of the custom field
			 *
			 * @param array $object Details of current post.
			 * @param string $field_name Name of field.
			 * @param WP_REST_Request $request Current request
			 *
			 * @return mixed
			 */
			'get_callback'    => function( $object, $field_name, $request ) {
				$taxonomies = get_taxonomies(
					[
						'public' => true,
						//'_builtin' => false
					],
					'names',
					'and'
				);

				$terms = wp_get_object_terms(
					$object[ 'id' ],
					$taxonomies
				);

				return array_map(function($term){
					return $term->term_id;
				}, $terms);

			},
			'update_callback' => null,
			'schema'          => null,
		)
	);
});