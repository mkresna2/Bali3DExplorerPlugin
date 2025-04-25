<?php
/*
Plugin Name: Bali 3D Explorer
Description: Interactive 3D map explorer for Bali, ported from standalone web project.
Version: 1.0
Author: Your Name
*/

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

// Define plugin URL and path
if ( ! defined( 'BALI3D_PLUGIN_URL' ) ) {
    define( 'BALI3D_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
}
if ( ! defined( 'BALI3D_PLUGIN_PATH' ) ) {
    define( 'BALI3D_PLUGIN_PATH', plugin_dir_path( __FILE__ ) );
}

// Enqueue scripts and styles only when shortcode is used
function bali3d_enqueue_assets() {
    // CSS
    wp_enqueue_style( 'bali3d-styles', BALI3D_PLUGIN_URL . 'css/styles.css' );
    wp_enqueue_style( 'maplibre-gl', 'https://unpkg.com/maplibre-gl@1.15.2/dist/maplibre-gl.css' );
    wp_enqueue_style( 'threebox', 'https://unpkg.com/threebox-plugin/dist/threebox.css' );

    // JS
    wp_enqueue_script( 'three', 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.min.js', array(), null, true );
    wp_enqueue_script( 'threebox', 'https://unpkg.com/threebox-plugin/dist/threebox.min.js', array('three'), null, true );
    wp_enqueue_script( 'maplibre-gl', 'https://unpkg.com/maplibre-gl@1.15.2/dist/maplibre-gl.js', array(), null, true );
    wp_enqueue_script( 'bali3d-threebox-config', BALI3D_PLUGIN_URL . 'js/threebox-config.js', array('three', 'threebox', 'maplibre-gl'), null, true );
    wp_enqueue_script( 'bali3d-three-config', BALI3D_PLUGIN_URL . 'js/three-config.js', array('three'), null, true );
    wp_enqueue_script( 'bali3d-destinations', BALI3D_PLUGIN_URL . 'js/destinations.js', array('three'), null, true );
    wp_enqueue_script( 'bali3d-main', BALI3D_PLUGIN_URL . 'js/main.js', array('three'), null, true );
    wp_enqueue_script( 'bali3d-ui-controls', BALI3D_PLUGIN_URL . 'js/ui-controls.js', array('three'), null, true );
}

// Shortcode handler for explorer UI
function bali3d_explorer_shortcode() {
    // Buffer output
    ob_start();
    // Include HTML template (to be created)
    include( BALI3D_PLUGIN_PATH . 'templates/explorer-ui.php' );
    return ob_get_clean();
}

// Register shortcode and enqueue assets
function bali3d_register_shortcode() {
    add_shortcode( 'bali3d_explorer', 'bali3d_explorer_shortcode' );
    add_action( 'wp_enqueue_scripts', 'bali3d_enqueue_assets' );
}
add_action( 'init', 'bali3d_register_shortcode' );
