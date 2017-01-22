<?php
 
/**
 * Creates a Meta Box for a Custom Field.
 * $handle, $label, $show_if_callback, $default_value = ''
 * $handle - the name of the custom field
 * $label - the title of the meta box
 * $show_if_callback - a function that returns true if the meta box should be shown
 * $default_value - default value of custom field
 */
// https://developer.wordpress.org/reference/functions/add_meta_box/#comment-343
// https://generatewp.com/the-meta-box-generator/
class DY_Custom_Field_Meta_Box {
	public $prefix = 'dy-';
	
	public $handle;
	public $label;
	public $value;
	public $default_value;
	public $show_if_callback;
 
	/**
	 * Hook into the appropriate actions when the class is constructed.
	 */
	public function __construct($handle, $label, $show_if_callback = '', $default_value = '') {
		$this->handle = $this->prefix.$handle;
		$this->label = $label;
		$this->show_if_callback = $show_if_callback;
		$this->default_value = $default_value;
		
		add_action( 'add_meta_boxes', array( $this, 'add_meta_box' ), null, 2 );
		add_action( 'save_post', array( $this, 'save') );
	}
 
	/**
	 * Adds the meta box container.
	 */
	public function add_meta_box( $post_type, $post ) {
		if(empty($this->show_if_callback) || call_user_func($this->show_if_callback, $post_type, $post)){
			add_meta_box(
				$this->handle,
				__( $this->label, 'text_domain' ),
				array( $this, 'render_meta_box' ),
				$post_type,
				'advanced',
				'high'
			);
		}
	}
 
	/**
	 * Save the meta when the post is saved.
	 *
	 * @param int $post_id The ID of the post being saved.
	 */
	public function save( $post_id ) {
		/*
		 * We need to verify this came from the our screen and with proper authorization,
		 * because save_post can be triggered at other times.
		 */
 
		// Check if our nonce is set.
		if ( ! isset( $_POST[$this->handle.'_nonce'] ) ) {
			return $post_id;
		}
 
		// Verify that the nonce is valid.
		if ( ! wp_verify_nonce( $_POST[$this->handle.'_nonce'], $this->handle.'_nonce_action' ) ) {
			return $post_id;
		}
 
		/*
		 * If this is an autosave, our form has not been submitted,
		 * so we don't want to do anything.
		 */
		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
			return $post_id;
		}
 
		// Check the user's permissions.
		if ( 'page' == $_POST['post_type'] ) {
			if ( ! current_user_can( 'edit_page', $post_id ) ) {
				return $post_id;
			}
		} else {
			if ( ! current_user_can( 'edit_post', $post_id ) ) {
				return $post_id;
			}
		}
 
		/* OK, it's safe for us to save the data now. */
		
		// Sanitize user input.
		$this->value = isset( $_POST[ $this->handle ] ) ? sanitize_text_field( $_POST[ $this->handle ] ) : '';

		// Update the meta field in the database.
		update_post_meta( $post_id, $this->handle, $this->value );
	}
 
	/**
	 * Render Meta Box content.
	 *
	 * @param WP_Post $post The post object.
	 */
	public function render_meta_box( $post ) {
		// Migration to prefixed names - Delete after 1st run
		/*$current_value = get_post_meta( $post->ID, $this->handle, true );
		$old_value = get_post_meta( $post->ID, substr($this->handle, strlen($this->prefix)), true );
		if(!empty($old_value) && empty($current_value) ){
			update_post_meta( $post->ID, $this->handle, $old_value );
		}
		if(get_post_meta( $post->ID, $this->handle, true ) === $old_value)
				delete_post_meta($post->ID, substr($this->handle, strlen($this->prefix)));*/
		
		
		// Add an nonce field so we can check for it later.
		wp_nonce_field( $this->handle.'_nonce_action', $this->handle.'_nonce' );
 
		// Use get_post_meta to retrieve an existing value from the database.
		$this->value = get_post_meta( $post->ID, $this->handle, true );
		
		if(empty($this->value) && !empty($this->default_value)){
			$value = is_callable($this->default_value) ? call_user_func(
				$this->default_value, 
				$post->type, $post
			) : $this->default_value;
			if(!empty($value))
				echo 'Suggested default: <a onclick=\'var t=jQuery(this);t.siblings().find("input[type=text]").val(t.text())\' href="javascript:void(0)">'.$value.'</a>';
		}
 
		// Display the form, using the current value.
		?>
		<p>
			<label for="<?php echo $this->handle; ?>"><?php _e( $this->handle, 'textdomain' ); ?>
				<input type="text" id="<?php echo $this->handle; ?>" name="<?php echo $this->handle; ?>" class="<?php echo $this->handle; ?>_field" value="<?php echo $this->value; ?>">
			</label>
		</p>
		<?php
	}
}



$isProjectFunc = function($post_type, $post){
	return $post_type == 'page' && has_term('project', 'page-category');
};
$custom_fields = [
	'project-date' => [
		'meta_box_label' => 'Project Date',
		'show_if_callback' => $isProjectFunc,
		'default' => function($post_type, $post){
			$kaID = get_post_meta( $post->ID, 'dy-ka-id', true );
			if(!empty($kaID)){
				return str_replace(
					array('T', 'Z'),
					array(' ', ''),
					DY::getJSON(DY::khanAcademyURLFromID($kaID))->scratchpad->created
				);
			}
		}
	],
	'project-header-dark-mode' => [
		'meta_box_label' => 'Project Header Dark Mode',
		'show_if_callback' => $isProjectFunc,
	],
	'project-header-color-scheme' => [
		'meta_box_label' => 'Project Header Color Scheme',
		'show_if_callback' => $isProjectFunc,
	],
	
	'ka-id' => [
		'meta_box_label' => 'Khan Academy Project ID',
		'show_if_callback' => function($post_type, $post){
			return $post_type == 'page' && has_term('khan-academy-computer-programming', 'tools');
		}
	],
	'scratch-id' => [
		'meta_box_label' => 'Scratch Project ID',
		'show_if_callback' => function($post_type, $post){
			return $post_type == 'page' && has_term('scratch', 'tools');
		}
	],
];


/**
 * Calls the class on the post edit screen.
 */
function create_DY_Custom_Field_Meta_Box() {
	global $custom_fields;
	foreach($custom_fields as $handle => $options){
		new DY_Custom_Field_Meta_Box($handle, $options['meta_box_label'], $options['show_if_callback'], $options['default']);
	}
}
if ( is_admin() ) {
	add_action( 'load-post.php', 'create_DY_Custom_Field_Meta_Box' );
	add_action( 'load-post-new.php', 'create_DY_Custom_Field_Meta_Box' );
}

	
add_action( 'rest_api_init', function () {
	global $custom_fields;
	
	register_rest_field( 'page',
		'meta',
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
				global $custom_fields;
				
				$data = [];
				// Temporary until PHP is upgraded
				$ucwords = function($str){
					return $str = lcfirst(str_replace(" ", "", ucwords(str_replace("-", " ", $str))));
				};
				foreach($custom_fields as $handle => $options){
					$handleCamelCase = str_replace('-', '', lcfirst($ucwords($handle, '-')));
					$data[$handleCamelCase] = get_post_meta( $object[ 'id' ], 'dy-'.$handle, true );
				}
				return $data;
				
				/*return array_map(function($handle, $options = '') {
					return get_post_meta( $object[ 'id' ], $handle, true );
				}, $custom_fields);*/
			},
			'update_callback' => null,
			'schema'          => null,
		)
	);
	
	return;
	
	foreach($custom_fields as $handle => $options){
		register_rest_field( 'page',
			$handle,
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
					return get_post_meta( $object[ 'id' ], $field_name, true );
				},
				'update_callback' => null,
				'schema'          => null,
			)
		);
	}
});