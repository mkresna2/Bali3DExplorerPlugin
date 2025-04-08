/**
 * Bali 3D Explorer - Threebox Configuration
 * Handles integration between Three.js and Mapbox
 */

class ThreeboxConfig {
  constructor() {
    this.map = null;
    this.tb = null;
    this.markers = {};
    this.isInitialized = false;
    this.mapboxToken = ''; // Will be loaded from .env
  }

  /**
   * Initialize Mapbox and Threebox
   * @param {string} containerId - ID of the container element
   */
  init(containerId) {
    if (this.isInitialized) return;

    // Load token from environment variable
    this.loadMapboxToken();

    // Display a message to replace the token
    console.warn('IMPORTANT: Replace the placeholder Mapbox token in threebox-config.js with your actual token');

    // Initialize Mapbox
    mapboxgl.accessToken = this.mapboxToken;
    
    this.map = new mapboxgl.Map({
      container: containerId,
      style: 'mapbox://styles/mapbox/satellite-v9', // Satellite imagery
      center: [115.188919, -8.409518], // Center of Bali
      zoom: 9,
      pitch: 60, // Tilted view
      bearing: 0,
      antialias: true
    });

    // Add navigation controls
    this.map.addControl(new mapboxgl.NavigationControl());

    // Initialize Threebox when map loads
    this.map.on('style.load', () => {
      // Initialize Threebox
      this.tb = new Threebox(
        this.map,
        this.map.getCanvas().getContext('webgl'),
        {
          defaultLights: true,
          enableSelectingObjects: true,
          enableTooltips: true,
          enableDraggingObjects: false,
          enableRotatingObjects: false
        }
      );

      // Add 3D terrain
      this.addTerrain();
      
      // Add destination markers
      this.addDestinationMarkers();
      
      this.isInitialized = true;
    });

    // Add event listeners
    this.map.on('click', (e) => this.handleMapClick(e));
  }

  /**
   * Load Mapbox token from environment variables
   */
  loadMapboxToken() {
    // In a real environment, this would be loaded from process.env
    // For browser-based applications, we need to use a different approach
    
    // Check if token is available in window object (set by index.html)
    if (window.ENV && window.ENV.MAPBOX_TOKEN) {
      this.mapboxToken = window.ENV.MAPBOX_TOKEN;
    } else {
      console.error('Mapbox token not found. Please set it in your .env file and ensure it\'s loaded properly.');
    }
  }

  /**
   * Add 3D terrain to the map
   */
  addTerrain() {
    this.map.addSource('mapbox-dem', {
      'type': 'raster-dem',
      'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
      'tileSize': 512,
      'maxzoom': 14
    });
    
    // Add DEM source as terrain
    this.map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
    
    // Add sky layer
    this.map.addLayer({
      'id': 'sky',
      'type': 'sky',
      'paint': {
        'sky-type': 'atmosphere',
        'sky-atmosphere-sun': [0.0, 0.0],
        'sky-atmosphere-sun-intensity': 15
      }
    });
  }

  /**
   * Add 3D markers for all destinations
   */
  addDestinationMarkers() {
    // Add a custom layer for 3D objects
    this.map.addLayer({
      id: 'custom-threebox-layer',
      type: 'custom',
      renderingMode: '3d',
      onAdd: (map, gl) => {
        // Create markers for all destinations
        destinations.forEach(destination => {
          this.createDestinationMarker(destination);
        });
      },
      render: (gl, matrix) => {
        // Render Threebox scene
        if (this.tb) {
          this.tb.update();
        }
      }
    });
  }

  /**
   * Create a 3D marker for a destination
   * @param {Object} destination - Destination data
   */
  createDestinationMarker(destination) {
    // Skip if marker already exists
    if (this.markers[destination.id]) return;
    
    // Different colors for different categories
    let color;
    switch(destination.category) {
      case 'beach-clubs':
        color = '#3498DB'; // Blue
        break;
      case 'water-sports':
        color = '#2ECC71'; // Green
        break;
      case 'cultural':
        color = '#E74C3C'; // Red
        break;
      default:
        color = '#F1C40F'; // Yellow
    }
    
    // Create a 3D pin
    const options = {
      obj: '/assets/models/pin.obj', // You'll need to add this model file
      type: 'mtl',
      scale: 0.05,
      units: 'meters',
      rotation: { x: 90, y: 0, z: 0 },
      anchor: 'bottom',
      tooltip: destination.name
    };
    
    // If model file is not available, create a simple cylinder
    const geometry = new THREE.CylinderGeometry(0.5, 0, 2, 8);
    const material = new THREE.MeshBasicMaterial({ color: color });
    const pin = new THREE.Mesh(geometry, material);
    
    // Create 3D object
    const marker = this.tb.Object3D({ obj: pin, tooltip: destination.name })
      .setCoords([destination.coordinates[0], destination.coordinates[1]]);
    
    // Add to map
    this.tb.add(marker);
    
    // Store reference
    this.markers[destination.id] = marker;
    
    return marker;
  }

  /**
   * Handle map click event
   * @param {Object} e - Click event
   */
  handleMapClick(e) {
    // Check if a marker was clicked
    const features = this.map.queryRenderedFeatures(e.point);
    
    // If no specific feature was clicked, do nothing
    if (features.length === 0) return;
    
    // Check for 3D objects via Threebox
    const objects = this.tb.queryRenderedFeatures(e.point);
    
    if (objects.length > 0) {
      // Get the first clicked object
      const clickedObject = objects[0];
      
      // Find the destination data for this object
      const destinationId = Object.keys(this.markers).find(
        id => this.markers[id] === clickedObject
      );
      
      if (destinationId) {
        const destination = destinations.find(d => d.id === destinationId);
        if (destination) {
          // Show destination info
          this.showDestinationInfo(destination);
        }
      }
    }
  }

  /**
   * Navigate to a destination
   * @param {Object} destination - Destination data
   */
  navigateToDestination(destination) {
    // Fly to destination
    this.map.flyTo({
      center: destination.coordinates,
      zoom: 15,
      pitch: 60,
      bearing: Math.random() * 360, // Random bearing for variety
      duration: 2000, // Animation duration in ms
      essential: true
    });
    
    // Show destination info
    this.showDestinationInfo(destination);
  }

  /**
   * Show destination information in the info panel
   * @param {Object} destination - Destination data
   */
  showDestinationInfo(destination) {
    // This will be implemented in ui-controls.js
    // Just dispatch an event here
    const event = new CustomEvent('showDestinationInfo', { detail: destination });
    document.dispatchEvent(event);
  }
}

// Create instance
const threeboxConfig = new ThreeboxConfig();
