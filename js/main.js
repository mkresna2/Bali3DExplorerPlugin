/**
 * Bali 3D Explorer - Main JavaScript
 * Entry point for the application
 */

/**
 * Initialize the application
 */
function initApp() {
  console.log('Initializing Bali 3D Explorer...');
  
  // Check if the map container exists and has proper dimensions
  const mapContainer = document.getElementById('map');
  if (!mapContainer) {
    console.error("Map container element not found!");
    return; // Exit if map container is not found
  } else {
    console.log("Map container found:", mapContainer);
    console.log("Map container dimensions:", mapContainer.clientWidth, "x", mapContainer.clientHeight);
    
    // Ensure the map container has dimensions
    if (mapContainer.clientWidth === 0 || mapContainer.clientHeight === 0) {
      console.warn("Map container has zero dimensions - fixing...");
      mapContainer.style.width = '100%';
      mapContainer.style.height = '100%';
      mapContainer.style.display = 'block';
    }
  }
  
  // Initialize UI controls
  uiControls.init();
  
  // Initialize MapLibre
  console.log("Initializing MapLibre...");
  
  // Force map to be visible
  mapContainer.style.visibility = 'visible';
  mapContainer.style.display = 'block';
  
  // Initialize map with a delay to ensure DOM is ready
  setTimeout(() => {
    threeboxConfig.init('map');
  }, 100);
  
  // Add placeholder images warning
  checkPlaceholderImages();
  
  // Log initialization complete
  console.log("Application initialization complete");
}

/**
 * Navigate to a destination
 * @param {Object} destination - Destination data
 */
function navigateToDestination(destination) {
  console.log(`Navigating to: ${destination.name}`);
  
  if (threeboxConfig.isInitialized) {
    threeboxConfig.navigateToDestination(destination);
  } else {
    console.warn("Cannot navigate - map not initialized yet");
  }
}

/**
 * Check for placeholder images and show warning if needed
 */
function checkPlaceholderImages() {
  // This is just a helper function to remind users to add actual images
  const images = document.querySelectorAll('.destination-thumb');
  let missingImages = 0;
  
  // Create a set of existing image files
  const existingImages = [
    'sakala-resort.jpg',
    'bali-cliff.jpg',
    'uluwatu-temple.jpg',
    'reef-beach-club.jpg',
    'omnia-dayclub.jpg',
    'ulu-cliff-house.jpg',
    'sundays-beach-club.jpg',
    'tanjung-benoa-watersports.jpg',
    'nusa-dua-watersports.jpg',
    'museum-pasifika.jpg',
    'caow-eng-bio-temple.jpg',
    'logo.png'
  ];
  
  images.forEach(img => {
    // Get the destination ID from the parent element
    const destinationId = img.parentElement.dataset.id;
    
    // Set a default image path based on the destination ID
    const defaultImagePath = `assets/images/${destinationId}.jpg`;
    
    // Set the background image if it's not already set
    if (!img.style.backgroundImage || img.style.backgroundImage === 'none' || img.style.backgroundImage === '') {
      img.style.backgroundImage = `url('${defaultImagePath}')`;
      
      // Add placeholder icon for visual indication
      img.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M4.828 21l-.02.02-.021-.02H2.992A.993.993 0 0 1 2 20.007V3.993A1 1 0 0 1 2.992 3h18.016c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993H4.828zM20 15V5H4v14L14 9l6 6zm0 2.828l-6-6L6.828 19H20v-1.172zM8 11a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" fill="rgba(0,0,0,0.5)"/></svg>';
    }
  });
  
  // No need to show warning anymore since we're handling missing images gracefully
  console.log("Destination images checked and placeholders applied where needed");
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM content loaded - initializing application");
  setTimeout(initApp, 100); // Short delay to ensure all resources are loaded
});

// Add window load event for additional initialization
window.addEventListener('load', () => {
  console.log("Window fully loaded - checking map initialization");
  
  // Add a short delay to give the map time to initialize
  setTimeout(() => {
    // Check if map was initialized
    if (!threeboxConfig || !threeboxConfig.isInitialized) {
      // Check if the map element exists and has the maplibregl-map class
      // which indicates MapLibre is in the process of initializing
      const mapElement = document.getElementById('map');
      const isMapInitializing = mapElement && 
                               mapElement.querySelector('.maplibregl-canvas-container');
      
      if (!isMapInitializing) {
        console.warn("Map not initialized after window load - attempting to initialize again");
        
        // Force map container to be visible
        if (mapElement) {
          mapElement.style.visibility = 'visible';
          mapElement.style.display = 'block';
        }
        
        setTimeout(() => {
          threeboxConfig.init('map');
        }, 500); // Longer delay after window load
      } else {
        console.log("Map appears to be in the process of initializing - no action needed");
      }
    }
  }, 1000); // Wait 1 second after window load to check
});
