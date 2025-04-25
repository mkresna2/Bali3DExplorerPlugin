# Bali 3D Explorer WordPress Plugin

## Installation
1. Copy the entire `Bali3DExplorer` folder into your WordPress `wp-content/plugins/` directory.
2. Ensure the following structure:
   - `bali3d-explorer.php` (main plugin file)
   - `css/`, `js/`, `assets/`, `templates/` (copied from your original project)
3. Activate the plugin from the WordPress admin.
4. Use the shortcode `[bali3d_explorer]` in any page or post to display the explorer UI.

## Notes
- All required CSS and JS are enqueued automatically.
- Assets (images, models, textures) are referenced via plugin URLs.
- You may further customize the UI or add admin settings as needed.

## To Do
- Test on a WordPress site and verify asset loading.
- Optionally, add plugin settings or Gutenberg block support.
