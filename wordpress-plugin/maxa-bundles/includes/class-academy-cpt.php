<?php
if (!defined('ABSPATH')) {
    exit;
}

class Maxa_Academy_CPT {
    public function __construct() {
        add_action('init', array($this, 'register_cpt_and_fields'));
    }

    public function register_cpt_and_fields() {
        // Register CPT
        register_post_type('academy', [
            'labels' => [
                'name' => 'Academy (Peptides)',
                'singular_name' => 'Peptide',
                'add_new' => 'Add New Peptide',
                'add_new_item' => 'Add New Peptide',
                'edit_item' => 'Edit Peptide',
                'new_item' => 'New Peptide',
                'view_item' => 'View Peptide',
                'search_items' => 'Search Peptides',
                'not_found' => 'No peptides found',
                'not_found_in_trash' => 'No peptides found in Trash',
            ],
            'public' => true,
            'has_archive' => true,
            'show_in_rest' => true, // EXTREMELY IMPORTANT for Next.js to fetch it via REST API
            'rest_base' => 'academy',
            'supports' => ['title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'],
            'menu_icon' => 'dashicons-welcome-learn-more',
        ]);

        // Register custom fields to be exposed in REST API
        $meta_fields = ['cas_number', 'purity', 'sequence', 'molecular_weight', 'molecular_formula', 'appearance'];
        foreach ($meta_fields as $field) {
            register_rest_field('academy', $field, [
                'get_callback' => function($object) use ($field) {
                    return get_post_meta($object['id'], $field, true);
                },
                'update_callback' => function($value, $object, $field_name) {
                    return update_post_meta($object->ID, $field_name, $value);
                },
                'schema' => null,
            ]);
        }
    }
}
