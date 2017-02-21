<?php
// Unused

register_rest_field(
	['page', 'post', 'taxonomies', 'terms'],
	'queryType',
	[
		'get_callback' => function( $object, $field_name, $request ) {
			return [
				'object' => $object,
				'field_name' => $field_name,
				'request' => $request
			];

			if(is_archive())
				return 'archive';

			if(is_single())
				return 'single';

			if(is_search())
				return 'search';

			if(is_author())
				return 'author';
		},
		'update_callback' => null,
		'schema' => null,
	]
);