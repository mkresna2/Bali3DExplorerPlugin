/**
 * Bali 3D Explorer - MapLibre Configuration
 * Handles map initialization and markers
 */

class ThreeLibreConfig {
  constructor() {
    this.map = null;
    this.markers = {};
    this.isInitialized = false;
    this.threebox = null;
    this.mapboxToken = null; // Will use MapLibre's free tiles instead
  }

  /**
   * Initialize MapLibre
   * @param {string} containerId - ID of the container element
   */
  init(containerId) {
    if (this.isInitialized) return;

    console.log('Initializing MapLibre...');
    
    try {
      // Check if maplibregl is available
      if (typeof maplibregl === 'undefined') {
        console.error('MapLibre GL JS is not loaded. Please check your script imports.');
        return;
      }

      // Get container element
      const container = document.getElementById(containerId);
      if (!container) {
        console.error(`Container element with ID '${containerId}' not found.`);
        return;
      }

      // Make sure container has dimensions
      if (container.clientWidth === 0 || container.clientHeight === 0) {
        console.error('Map container has zero width or height. Check CSS.');
        container.style.width = '100%';
        container.style.height = '100%';
      }

      // Create a custom style with OpenStreetMap tiles
      const customStyle = {
        version: 8,
        glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
        sources: {
          'osm': {
            type: 'raster',
            tiles: ['https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: 'OpenStreetMap contributors'
          }
        },
        layers: [
          {
            id: 'osm-layer',
            type: 'raster',
            source: 'osm',
            minzoom: 0,
            maxzoom: 19
          }
        ]
      };

      // Initialize MapLibre with a custom style
      this.map = new maplibregl.Map({
        container: containerId,
        style: customStyle,
        center: [115.188919, -8.409518], // Center of Bali
        zoom: 9,
        pitch: 60, // More tilted view for better 3D effect
        bearing: 30, // Slight rotation for better perspective
        attributionControl: false // We'll add our own attribution
      });

      // Initialize Threebox when map is loaded
      this.map.on('load', () => {
        if (typeof Threebox !== 'undefined') {
          this.threebox = new Threebox(
            this.map,
            this.map.getCanvas().getContext('webgl'),
            { defaultLights: true }
          );
          console.log('Threebox initialized:', this.threebox);
        } else {
          console.error('Threebox library is not loaded. Please check your script imports.');
        }
        console.log('Map loaded successfully');
        // Add clustered markers for all destinations
        this.addClusteredMarkers();
        this.isInitialized = true;
        console.log('Map initialization complete');
        console.log('Event listeners attached:', this.map._listeners);
      });

      // Add custom controls
      this.map.addControl(new maplibregl.NavigationControl(), 'bottom-right');
      this.map.addControl(new maplibregl.AttributionControl({
        compact: true,
        customAttribution: 'Map data OpenStreetMap contributors | Bali 3D Explorer'
      }), 'bottom-left');
      
      // Add fullscreen control
      this.map.addControl(new maplibregl.FullscreenControl(), 'top-right');

      // Improve pointer event handling for smoother dragging
      container.style.pointerEvents = 'auto';
      container.style.touchAction = 'none'; // Prevent browser default gestures
      container.style.userSelect = 'none';

      // Disable scroll zoom so user can only zoom with + and - controls
      this.map.scrollZoom.disable();
      // Disable double-click zoom
      this.map.doubleClickZoom.disable();
      // Disable drag rotation (bearing)
      this.map.dragRotate.disable();
      // Disable drag panning (left mouse button drag)
      this.map.dragPan.disable();

      // Add event listeners
      this.map.on('click', (e) => this.handleMapClick(e));
      this.map.on('dragstart', () => {
        console.log('Map drag started');
      });
      this.map.on('dragend', () => {
        console.log('Map drag ended');
      });
      this.map.on('move', () => {
        // Could add throttled performance logging here if needed
      });
      
      // Add error handler
      this.map.on('error', (e) => {
        console.error('MapLibre error:', e.error);
        
        // If the style fails to load, fall back to a simpler style
        if (e.error && e.error.message && e.error.message.includes('style')) {
          console.warn('Falling back to default style');
          this.map.setStyle('https://demotiles.maplibre.org/style.json');
        }
      });
    } catch (error) {
      console.error('Error initializing MapLibre:', error);
    }
  }

  /**
   * Add a debug overlay to show map loading status
   * @param {HTMLElement} container - Map container element
   */
  addDebugOverlay(container) {
    // This debug overlay is no longer needed. Function intentionally left blank.
  }

  /**
   * Remove the debug overlay
   */
  removeDebugOverlay() {
    // This debug overlay is no longer needed. Function intentionally left blank.
  }

  /**
   * Add clustered markers for all destinations using GeoJSON source
   */
  addClusteredMarkers() {
    console.log('Adding clustered destination markers');
    // Convert destinations array to GeoJSON
    const geojson = {
      type: 'FeatureCollection',
      features: destinations.map(dest => ({
        type: 'Feature',
        properties: {
          id: dest.id,
          name: dest.name,
          category: dest.category,
          drivingTime: dest.drivingTime,
          description: dest.description,
          images: dest.images,
        },
        geometry: {
          type: 'Point',
          coordinates: dest.coordinates
        }
      }))
    };
    // Remove existing layers and source safely
    const layersToRemove = ['destination-labels', 'unclustered-point', 'cluster-count', 'clusters'];
    layersToRemove.forEach(layerId => {
      if (this.map.getLayer(layerId)) {
        this.map.removeLayer(layerId);
      }
    });
    if (this.map.getSource('destinations')) {
      this.map.removeSource('destinations');
    }
    // Add source
    this.map.addSource('destinations', {
      type: 'geojson',
      data: geojson,
      cluster: true,
      clusterMaxZoom: 14,
      clusterRadius: 50
    });
    // Add cluster circles
    this.map.addLayer({
      id: 'clusters',
      type: 'circle',
      source: 'destinations',
      filter: ['has', 'point_count'],
      paint: {
        'circle-color': [
          'step',
          ['get', 'point_count'],
          '#51bbd6', 10,
          '#f1f075', 30,
          '#f28cb1'
        ],
        'circle-radius': [
          'step',
          ['get', 'point_count'],
          20, 10, 30, 30, 40
        ]
      }
    });
    // Add cluster count labels
    this.map.addLayer({
      id: 'cluster-count',
      type: 'symbol',
      source: 'destinations',
      filter: ['has', 'point_count'],
      layout: {
        'text-field': '{point_count_abbreviated}',
        'text-size': 14
      }
    });
    // Add unclustered point layer
    this.map.addLayer({
      id: 'unclustered-point',
      type: 'circle',
      source: 'destinations',
      filter: ['!', ['has', 'point_count']],
      paint: {
        'circle-color': '#F1C40F',
        'circle-radius': 12,
        'circle-stroke-width': 2,
        'circle-stroke-color': '#fff'
      }
    });
    // Add a symbol layer for destination name labels
    this.map.addLayer({
      id: 'destination-labels',
      type: 'symbol',
      source: 'destinations',
      layout: {
        'text-field': ['get', 'name'],
        'text-size': 14,
        'text-offset': [0, 1.5],
        'text-anchor': 'top',
        'text-allow-overlap': true
      },
      paint: {
        'text-color': '#222',
        'text-halo-color': '#fff',
        'text-halo-width': 2
      },
      filter: ['!', ['has', 'point_count']]
    });
    // Click event for clusters
    this.map.on('click', 'clusters', (e) => {
      const features = this.map.queryRenderedFeatures(e.point, { layers: ['clusters'] });
      const clusterId = features[0].properties.cluster_id;
      this.map.getSource('destinations').getClusterExpansionZoom(clusterId, (err, zoom) => {
        if (err) return;
        this.map.easeTo({ center: features[0].geometry.coordinates, zoom });
      });
    });
    // Click event for unclustered points
    this.map.on('click', 'unclustered-point', (e) => {
      const feature = e.features[0];
      // Show info panel or popup for destination
      const destination = destinations.find(d => d.id === feature.properties.id);
      if (destination) {
        this.navigateToDestination(destination);
      }
    });
    // Change cursor on hover
    this.map.on('mouseenter', 'clusters', () => {
      this.map.getCanvas().style.cursor = 'pointer';
    });
    this.map.on('mouseleave', 'clusters', () => {
      this.map.getCanvas().style.cursor = '';
    });
    this.map.on('mouseenter', 'unclustered-point', () => {
      this.map.getCanvas().style.cursor = 'pointer';
    });
    this.map.on('mouseleave', 'unclustered-point', () => {
      this.map.getCanvas().style.cursor = '';
    });
  }

  /**
   * Handle map click event
   * @param {Object} e - Click event
   */
  handleMapClick(e) {
    // This is handled by the marker click events
    console.log('Map clicked at:', e.lngLat);
  }

  /**
   * Add a 3D marker at a geographic location using Threebox
   * @param {Object} destination - Destination data with coordinates [lng, lat]
   */
  addThreeboxMarker(destination) {
    if (!this.threebox || !this.map) {
      console.warn('Threebox or MapLibre not initialized.');
      return;
    }
    if (this.markers[destination.id]) {
      // Marker already exists
      return;
    }
    // Only add marker if coordinates are within Bali bounds
    const minLng = 114.4, maxLng = 115.7, minLat = -9.2, maxLat = -8.0;
    const [lng, lat] = destination.coordinates;
    if (lng < minLng || lng > maxLng || lat < minLat || lat > maxLat) {
      console.warn(`Skipping marker for out-of-bounds destination: ${destination.name} (${lng}, ${lat})`);
      return;
    }
    // Create a simple 3D marker (e.g., a cone or cylinder)
    const geometry = new THREE.CylinderGeometry(0.5, 0, 2, 8);
    let color;
    switch(destination.category) {
      case 'beach-clubs': color = 0x3498DB; break;
      case 'water-sports': color = 0x2ECC71; break;
      case 'cultural': color = 0xE74C3C; break;
      default: color = 0xF1C40F;
    }
    const material = new THREE.MeshStandardMaterial({ color });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 1, 0); // Place above ground

    // Add label as a sprite above the marker
    const canvas = document.createElement('canvas');
    canvas.width = 256; canvas.height = 128;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.fillRect(0,0,256,128);
    ctx.font = 'bold 24px Arial';
    ctx.fillStyle = '#000';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(destination.name, 128, 64);
    const texture = new THREE.CanvasTexture(canvas);
    const labelMaterial = new THREE.SpriteMaterial({ map: texture });
    const label = new THREE.Sprite(labelMaterial);
    label.scale.set(5, 2.5, 1);
    label.position.set(0, 3, 0);
    mesh.add(label);

    // Add the mesh as a Threebox object at the correct geo position
    const tbObj = this.threebox.Object3D({ obj: mesh });
    this.threebox.add(tbObj, {
      lon: destination.coordinates[0],
      lat: destination.coordinates[1],
      altitude: 0 // Set altitude if needed
    });
    this.markers[destination.id] = tbObj;
  }

  /**
   * Navigate to a destination (fly to location and add marker)
   * @param {Object} destination - Destination data
   * @param {number} [retryCount=0] - Internal: number of retries
   */
  navigateToDestination(destination, retryCount = 0) {
    if (!this.isInitialized || !this.map || !this.threebox) {
      if (retryCount < 10) {
        // Wait and retry after 200ms, up to 10 times
        setTimeout(() => this.navigateToDestination(destination, retryCount + 1), 200);
        if (retryCount === 0) {
          console.log('Waiting for MapLibre and Threebox to initialize before navigating...');
        }
      } else {
        console.error('MapLibre/Threebox still not initialized after multiple retries.');
      }
      return;
    }
    // Fly to the destination
    this.map.flyTo({
      center: destination.coordinates,
      zoom: 15,
      pitch: 60,
      bearing: 0,
      duration: 1500
    });
    // Add marker at destination
    this.addThreeboxMarker(destination);
  }

  /**
   * Show destination information in the info panel
   * @param {Object} destination - Destination data
   */
  showDestinationInfo(destination) {
    // Dispatch an event for the UI to handle
    const event = new CustomEvent('showDestinationInfo', { detail: destination });
    document.dispatchEvent(event);
  }
}

// Create instance
const threeboxConfig = new ThreeLibreConfig();
