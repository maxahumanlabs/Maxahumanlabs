<?php
/**
 * Plugin Name: Maxa Product Bundles
 * Plugin URI: https://maxahuman.com
 * Description: Custom product bundles with automatic inventory management and order tracking
 * Version: 1.0.0
 * Author: Maxa Human
 * Author URI: https://maxahuman.com
 * Text Domain: maxa-bundles
 * Domain Path: /languages
 * Requires at least: 5.8
 * Requires PHP: 7.4
 * WC requires at least: 6.0
 * WC tested up to: 8.5
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

// Define plugin constants
define('MAXA_BUNDLES_VERSION', '1.0.0');
define('MAXA_BUNDLES_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('MAXA_BUNDLES_PLUGIN_URL', plugin_dir_url(__FILE__));
define('MAXA_BUNDLES_PLUGIN_BASENAME', plugin_basename(__FILE__));

/**
 * Check if WooCommerce is active
 */
if (!in_array('woocommerce/woocommerce.php', apply_filters('active_plugins', get_option('active_plugins')))) {
    add_action('admin_notices', function() {
        echo '<div class="error"><p><strong>Maxa Product Bundles</strong> requires WooCommerce to be installed and active.</p></div>';
    });
    return;
}

/**
 * Define Bundle Product Class (extends Simple Product)
 */
add_action('woocommerce_loaded', function() {
    if (!class_exists('WC_Product_Bundle')) {
        class WC_Product_Bundle extends WC_Product_Simple {
            public function __construct($product = 0) {
                $this->supports[] = 'ajax_add_to_cart';
                parent::__construct($product);
            }
            
            public function get_type() {
                return 'bundle';
            }
        }
    }
});

/**
 * Main Plugin Class
 */
class Maxa_Bundles {
    
    private static $instance = null;
    
    public static function instance() {
        if (is_null(self::$instance)) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    private function __construct() {
        $this->init_hooks();
        $this->includes();
    }
    
    private function init_hooks() {
        add_action('plugins_loaded', array($this, 'init'), 0);
        add_filter('woocommerce_product_class', array($this, 'product_class_name'), 10, 2);
        register_activation_hook(__FILE__, array($this, 'activate'));
        register_deactivation_hook(__FILE__, array($this, 'deactivate'));
    }
    
    private function includes() {
        require_once MAXA_BUNDLES_PLUGIN_DIR . 'includes/class-bundle-product-type.php';
        require_once MAXA_BUNDLES_PLUGIN_DIR . 'includes/class-bundle-admin.php';
        require_once MAXA_BUNDLES_PLUGIN_DIR . 'includes/class-bundle-cart.php';
        require_once MAXA_BUNDLES_PLUGIN_DIR . 'includes/class-bundle-order.php';
        require_once MAXA_BUNDLES_PLUGIN_DIR . 'includes/class-bundle-inventory.php';
        require_once MAXA_BUNDLES_PLUGIN_DIR . 'includes/class-bundle-api.php';
        require_once MAXA_BUNDLES_PLUGIN_DIR . 'includes/class-academy-cpt.php';
    }
    
    /**
     * Return bundle product class name
     */
    public function product_class_name($classname, $product_type) {
        if ($product_type === 'bundle') {
            return 'WC_Product_Bundle';
        }
        return $classname;
    }
    
    public function init() {
        // Initialize plugin components
        new Maxa_Bundle_Product_Type();
        new Maxa_Bundle_Admin();
        new Maxa_Bundle_Cart();
        new Maxa_Bundle_Order();
        new Maxa_Bundle_Inventory();
        new Maxa_Bundle_API();
        new Maxa_Academy_CPT();
        
        // Load text domain
        load_plugin_textdomain('maxa-bundles', false, dirname(MAXA_BUNDLES_PLUGIN_BASENAME) . '/languages');
    }
    
    public function activate() {
        // Flush rewrite rules
        flush_rewrite_rules();
        
        // Create custom database table for bundle items if needed
        global $wpdb;
        $table_name = $wpdb->prefix . 'maxa_bundle_items';
        $charset_collate = $wpdb->get_charset_collate();
        
        $sql = "CREATE TABLE IF NOT EXISTS $table_name (
            id bigint(20) NOT NULL AUTO_INCREMENT,
            bundle_id bigint(20) NOT NULL,
            product_id bigint(20) NOT NULL,
            quantity int(11) NOT NULL DEFAULT 1,
            PRIMARY KEY  (id),
            KEY bundle_id (bundle_id),
            KEY product_id (product_id)
        ) $charset_collate;";
        
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }
    
    public function deactivate() {
        flush_rewrite_rules();
    }
}

/**
 * Initialize the plugin
 */
function maxa_bundles() {
    return Maxa_Bundles::instance();
}

maxa_bundles();
