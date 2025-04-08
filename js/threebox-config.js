/**
 * Bali 3D Explorer - ThreeLibre Configuration
 * Handles integration between Three.js and MapLibre GL JS
 */

class ThreeLibreConfig {
  constructor() {
    this.map = null;
    this.tb = null;
    this.markers = {};
    this.isInitialized = false;
  }

  /**
   * Initialize MapLibre and ThreeLibre
   * @param {string} containerId - ID of the container element
   */
  init(containerId) {
    if (this.isInitialized) return;

    // Initialize MapLibre
    this.map = new maplibregl.Map({
      container: containerId,
      style: 'https://demotiles.maplibre.org/style.json', // Free MapLibre style
      center: [115.188919, -8.409518], // Center of Bali
      zoom: 9,
      pitch: 60, // Tilted view
      bearing: 0,
      antialias: true
    });

    // Add navigation controls
    this.map.addControl(new maplibregl.NavigationControl());

    // Initialize ThreeLibre when map loads
    this.map.on('style.load', () => {
      // Initialize ThreeLibre
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
   * Add 3D terrain to the map
   */
  addTerrain() {
    // Add DEM source for terrain if available
    try {
      this.map.addSource('maplibre-dem', {
        'type': 'raster-dem',
        'url': 'https://demotiles.maplibre.org/terrain-tiles/tiles.json',
        'tileSize': 256,
        'maxzoom': 14
      });
      
      // Add DEM source as terrain
      this.map.setTerrain({ 'source': 'maplibre-dem', 'exaggeration': 1.5 });
      
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
    } catch (error) {
      console.warn('Could not add terrain. Using flat map instead:', error);
    }
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
        // Render ThreeLibre scene
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
    
    // Create a simple cylinder as a pin
    const geometry = new THREE.CylinderGeometry(0.5, 0, 2, 8);
    const material = new THREE.MeshBasicMaterial({ color: color });
    const pin = new THREE.Mesh(geometry, material);
    
    // Create 3D object
    const marker = this.tb.Object3D({ 
      obj: pin, 
      tooltip: destination.name,
      units: 'meters',
      anchor: 'bottom'
    }).setCoords([destination.coordinates[0], destination.coordinates[1]]);
    
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
    
    // Check for 3D objects via ThreeLibre
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
const threeboxConfig = new ThreeLibreConfig();
