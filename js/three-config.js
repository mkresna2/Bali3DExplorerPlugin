/**
 * Bali 3D Explorer - Three.js Configuration
 * Handles 3D rendering and scene setup
 */

class ThreeConfig {
  constructor() {
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.markers = {};
    this.terrain = null;
    this.isInitialized = false;
  }

  /**
   * Initialize Three.js scene
   * @param {HTMLElement} container - DOM element to contain the renderer
   */
  init(container) {
    if (this.isInitialized) return;

    // Create scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xc6e6ff); // Light blue sky

    // Create camera
    this.camera = new THREE.PerspectiveCamera(
      60, // Field of view
      container.clientWidth / container.clientHeight, // Aspect ratio
      0.1, // Near clipping plane
      1000 // Far clipping plane
    );
    this.camera.position.set(0, 30, 30);
    this.camera.lookAt(0, 0, 0);

    // Create renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
    container.appendChild(this.renderer.domElement);

    // Add orbit controls
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.screenSpacePanning = false;
    this.controls.minDistance = 10;
    this.controls.maxDistance = 100;
    this.controls.maxPolarAngle = Math.PI / 2;

    // Add lighting
    this.addLights();
    
    // Create terrain
    this.createTerrain();
    
    // Add water
    this.addWater();
    
    // Add event listeners
    window.addEventListener('resize', () => this.onWindowResize(container));
    
    this.isInitialized = true;
    
    // Start animation loop
    this.animate();
  }

  /**
   * Add lights to the scene
   */
  addLights() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);
    
    // Directional light (sun)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(100, 100, 50);
    directionalLight.castShadow = true;
    
    // Configure shadow properties
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 500;
    directionalLight.shadow.camera.left = -100;
    directionalLight.shadow.camera.right = 100;
    directionalLight.shadow.camera.top = 100;
    directionalLight.shadow.camera.bottom = -100;
    
    this.scene.add(directionalLight);
  }

  /**
   * Create terrain for Bali island
   */
  createTerrain() {
    // Simple terrain for now - will be replaced with actual elevation data
    const geometry = new THREE.PlaneGeometry(100, 100, 100, 100);
    
    // Add some random elevation to simulate terrain
    const vertices = geometry.attributes.position.array;
    for (let i = 0; i < vertices.length; i += 3) {
      // Skip the edges to create a coast
      const x = vertices[i];
      const z = vertices[i + 2];
      const distanceFromCenter = Math.sqrt(x * x + z * z);
      
      if (distanceFromCenter < 45) {
        // Higher elevation in the center (mountains)
        const centerX = 0;
        const centerZ = -10;
        const distanceFromMountain = Math.sqrt(
          Math.pow(x - centerX, 2) + Math.pow(z - centerZ, 2)
        );
        
        // Create mountain peaks
        if (distanceFromMountain < 20) {
          vertices[i + 1] = 15 * (1 - distanceFromMountain / 20);
        } else {
          // Random hills
          vertices[i + 1] = Math.random() * 2;
        }
      } else {
        // Coast is flat
        vertices[i + 1] = 0;
      }
    }
    
    // Update geometry after modifying vertices
    geometry.attributes.position.needsUpdate = true;
    geometry.computeVertexNormals();
    
    // Create material with texture
    const material = new THREE.MeshStandardMaterial({
      color: 0x91A398,
      roughness: 0.8,
      metalness: 0.2,
    });
    
    // Create mesh
    this.terrain = new THREE.Mesh(geometry, material);
    this.terrain.rotation.x = -Math.PI / 2;
    this.terrain.receiveShadow = true;
    this.scene.add(this.terrain);
  }

  /**
   * Add water around the island
   */
  addWater() {
    const waterGeometry = new THREE.PlaneGeometry(200, 200);
    
    // Simple blue material for water
    const waterMaterial = new THREE.MeshStandardMaterial({
      color: 0x0077be,
      transparent: true,
      opacity: 0.8,
      roughness: 0.1,
      metalness: 0.6,
    });
    
    const water = new THREE.Mesh(waterGeometry, waterMaterial);
    water.rotation.x = -Math.PI / 2;
    water.position.y = -0.2; // Slightly below terrain
    this.scene.add(water);
  }

  /**
   * Create a marker for a destination
   * @param {Object} destination - Destination data
   */
  createDestinationMarker(destination) {
    // Skip if marker already exists
    if (this.markers[destination.id]) return;
    
    // Convert geographic coordinates to scene coordinates
    const position = this.geoToScenePosition(destination.coordinates);
    
    // Different colors for different categories
    let color;
    switch(destination.category) {
      case 'beach-clubs':
        color = 0x3498DB; // Blue
        break;
      case 'water-sports':
        color = 0x2ECC71; // Green
        break;
      case 'cultural':
        color = 0xE74C3C; // Red
        break;
      default:
        color = 0xF1C40F; // Yellow
    }
    
    // Create marker geometry
    const geometry = new THREE.CylinderGeometry(0.5, 0, 2, 8);
    const material = new THREE.MeshBasicMaterial({ color });
    const marker = new THREE.Mesh(geometry, material);
    
    // Position the marker
    marker.position.set(position.x, position.y + 2, position.z); // Add height to place on terrain
    
    // Add to scene
    this.scene.add(marker);
    
    // Store reference
    this.markers[destination.id] = marker;
    
    // Add text label
    this.addLabel(destination, marker);
    
    return marker;
  }

  /**
   * Add text label to a marker
   * @param {Object} destination - Destination data
   * @param {THREE.Mesh} marker - The marker mesh
   */
  addLabel(destination, marker) {
    // Create canvas for text
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 256;
    canvas.height = 128;
    
    // Draw background
    context.fillStyle = 'rgba(255, 255, 255, 0.8)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw text
    context.font = 'bold 24px Arial';
    context.fillStyle = '#000000';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(destination.name, canvas.width / 2, canvas.height / 2);
    
    // Create texture from canvas
    const texture = new THREE.CanvasTexture(canvas);
    
    // Create sprite material
    const material = new THREE.SpriteMaterial({ map: texture });
    
    // Create sprite
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(5, 2.5, 1);
    sprite.position.y = 3; // Position above marker
    
    // Add sprite to marker
    marker.add(sprite);
  }

  /**
   * Convert geographic coordinates to scene position
   * @param {Array} coordinates - [longitude, latitude]
   * @returns {Object} - {x, y, z} position in scene
   */
  geoToScenePosition(coordinates) {
    // Center of Bali (approximate)
    const centerLon = 115.188919;
    const centerLat = -8.409518;
    
    // Scale factor (adjust as needed)
    const scale = 200;
    
    // Convert to scene coordinates
    const x = (coordinates[0] - centerLon) * scale;
    const z = (coordinates[1] - centerLat) * scale;
    
    // Get height at this position (raycasting to terrain)
    let y = 0;
    if (this.terrain) {
      const raycaster = new THREE.Raycaster();
      raycaster.set(
        new THREE.Vector3(x, 100, z), // Start position high above
        new THREE.Vector3(0, -1, 0) // Direction down
      );
      const intersects = raycaster.intersectObject(this.terrain);
      if (intersects.length > 0) {
        y = intersects[0].point.y;
      }
    }
    
    return { x, y, z };
  }

  /**
   * Navigate to a destination
   * @param {Object} destination - Destination data
   */
  navigateToDestination(destination) {
    // Create marker if it doesn't exist
    if (!this.markers[destination.id]) {
      this.createDestinationMarker(destination);
    }
    
    const marker = this.markers[destination.id];
    const position = marker.position.clone();
    
    // Animate camera movement
    const startPosition = this.camera.position.clone();
    const startTarget = this.controls.target.clone();
    
    // Calculate target position (looking at marker from a distance)
    const targetPosition = position.clone().add(new THREE.Vector3(15, 15, 15));
    const targetTarget = position.clone();
    
    // Animation duration
    const duration = 1000; // ms
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease function (cubic)
      const ease = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const t = ease(progress);
      
      // Interpolate position and target
      this.camera.position.lerpVectors(startPosition, targetPosition, t);
      this.controls.target.lerpVectors(startTarget, targetTarget, t);
      this.controls.update();
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    animate();
  }

  /**
   * Handle window resize
   * @param {HTMLElement} container - DOM element containing the renderer
   */
  onWindowResize(container) {
    this.camera.aspect = container.clientWidth / container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(container.clientWidth, container.clientHeight);
  }

  /**
   * Animation loop
   */
  animate() {
    requestAnimationFrame(() => this.animate());
    
    // Update controls
    if (this.controls) {
      this.controls.update();
    }
    
    // Render scene
    this.renderer.render(this.scene, this.camera);
  }
}

// Create instance
const threeConfig = new ThreeConfig();
