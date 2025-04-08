/**
 * Bali 3D Explorer - Main JavaScript
 * Entry point for the application
 */

// Global variables
let useThreebox = true; // Set to false to use Three.js directly instead of Threebox

/**
 * Initialize the application
 */
function initApp() {
  console.log('Initializing Bali 3D Explorer...');
  
  // Initialize UI controls
  uiControls.init();
  
  // Check if Mapbox token is available
  if (!window.ENV || !window.ENV.MAPBOX_TOKEN) {
    console.error('Mapbox token not found in environment variables');
    document.getElementById('map').innerHTML = `
      <div class="error-message">
        <h2>Mapbox Token Required</h2>
        <p>Please add your Mapbox token to the <code>.env</code> file:</p>
        <pre>MAPBOX_TOKEN=your_mapbox_token_here</pre>
        <p>You can get a token by signing up at <a href="https://www.mapbox.com/" target="_blank">mapbox.com</a>.</p>
      </div>
    `;
    
    // Fall back to Three.js
    useThreebox = false;
  }
  
  // Initialize 3D visualization
  if (useThreebox) {
    // Initialize Threebox (Mapbox + Three.js)
    threeboxConfig.init('map');
  } else {
    // Initialize Three.js directly
    const mapContainer = document.getElementById('map');
    threeConfig.init(mapContainer);
    
    // Create markers for all destinations
    destinations.forEach(destination => {
      threeConfig.createDestinationMarker(destination);
    });
  }
  
  // Add destination click handlers
  addDestinationHandlers();
  
  // Add placeholder images warning
  checkPlaceholderImages();
}

/**
 * Add click handlers to destination items
 */
function addDestinationHandlers() {
  const destinationItems = document.querySelectorAll('.destination-item');
  
  destinationItems.forEach(item => {
    item.addEventListener('click', () => {
      const destinationId = item.dataset.id;
      const destination = destinations.find(d => d.id === destinationId);
      
      if (destination) {
        navigateToDestination(destination);
      }
    });
  });
}

/**
 * Navigate to a destination
 * @param {Object} destination - Destination data
 */
function navigateToDestination(destination) {
  console.log(`Navigating to: ${destination.name}`);
  
  if (useThreebox && threeboxConfig.isInitialized) {
    threeboxConfig.navigateToDestination(destination);
  } else if (threeConfig.isInitialized) {
    threeConfig.navigateToDestination(destination);
  }
}

/**
 * Check for placeholder images and show warning if needed
 */
function checkPlaceholderImages() {
  // This is just a helper function to remind users to add actual images
  const images = document.querySelectorAll('.destination-thumb');
  let missingImages = 0;
  
  images.forEach(img => {
    // Create an image element to test if the background image loads
    const testImg = new Image();
    const bgUrl = img.style.backgroundImage.replace(/url\(['"]?([^'"]*)['"]?\)/i, '$1');
    
    testImg.onerror = () => {
      missingImages++;
      img.style.backgroundColor = '#cccccc';
      img.style.backgroundImage = 'none';
      
      // Add placeholder icon
      img.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M4.828 21l-.02.02-.021-.02H2.992A.993.993 0 0 1 2 20.007V3.993A1 1 0 0 1 2.992 3h18.016c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993H4.828zM20 15V5H4v14L14 9l6 6zm0 2.828l-6-6L6.828 19H20v-1.172zM8 11a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" fill="rgba(0,0,0,0.5)"/></svg>';
    };
    
    testImg.src = bgUrl;
  });
  
  // Show warning if images are missing
  if (missingImages > 0) {
    console.warn(`${missingImages} destination images are missing. Please add actual images to the assets/images directory.`);
  }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);
