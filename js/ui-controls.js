/**
 * Bali 3D Explorer - UI Controls
 * Handles user interface interactions
 */

class UIControls {
  constructor() {
    this.infoPanel = null;
    this.infoPanelContent = null;
    this.closePanelBtn = null;
    this.destinationItems = null;
    this.categoryLinks = null;
    this.mobileMenuToggle = null;
    this.sidebar = null;
    this.mapControls = null;
    this.searchInput = null;
    this.isInitialized = false;
  }

  /**
   * Initialize UI controls
   */
  init() {
    if (this.isInitialized) return;

    // Get DOM elements
    this.infoPanel = document.querySelector('.info-panel');
    this.infoPanelContent = document.querySelector('.info-content');
    this.closePanelBtn = document.querySelector('.close-btn');
    this.destinationItems = document.querySelectorAll('.destination-item');
    this.categoryLinks = document.querySelectorAll('.categories a');
    this.mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    this.sidebar = document.querySelector('.destination-sidebar');
    this.mapControls = document.querySelectorAll('.control-btn');
    this.searchInput = document.querySelector('.search-container input');

    // Add event listeners
    this.addEventListeners();
    
    this.isInitialized = true;
  }

  /**
   * Add event listeners to UI elements
   */
  addEventListeners() {
    // Close info panel
    this.closePanelBtn.addEventListener('click', () => {
      this.hideInfoPanel();
    });

    // Destination item clicks
    this.destinationItems.forEach(item => {
      item.addEventListener('click', () => {
        const destinationId = item.dataset.id;
        const destination = destinations.find(d => d.id === destinationId);
        
        if (destination) {
          this.navigateToDestination(destination);
        }
      });
    });

    // Category filter clicks
    this.categoryLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all links
        this.categoryLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');
        
        // Get category ID from href
        const categoryId = link.getAttribute('href').substring(1);
        
        // Show/hide destination sections
        this.filterDestinations(categoryId);
      });
    });

    // Mobile menu toggle
    if (this.mobileMenuToggle) {
      this.mobileMenuToggle.addEventListener('click', () => {
        document.body.classList.toggle('menu-open');
        
        // Toggle sidebar height on mobile
        if (window.innerWidth <= 768) {
          this.sidebar.classList.toggle('expanded');
        }
      });
    }

    // Map controls
    this.mapControls.forEach(control => {
      control.addEventListener('click', () => {
        const action = control.classList[1]; // Get the second class (zoom-in, zoom-out, etc.)
        
        switch (action) {
          case 'zoom-in':
            this.zoomMap(1);
            break;
          case 'zoom-out':
            this.zoomMap(-1);
            break;
          case 'rotate':
            this.rotateMap();
            break;
          case 'reset':
            this.resetMapView();
            break;
        }
      });
    });

    // Search input
    this.searchInput.addEventListener('input', (e) => {
      this.searchDestinations(e.target.value);
    });

    // Listen for custom events
    document.addEventListener('showDestinationInfo', (e) => {
      this.showDestinationInfo(e.detail);
    });

    // Window resize event
    window.addEventListener('resize', () => {
      this.handleResize();
    });
  }

  /**
   * Navigate to a destination
   * @param {Object} destination - Destination data
   */
  navigateToDestination(destination) {
    console.log('UIControls: Navigating to destination:', destination.name);
    
    // Use MapLibre to navigate
    if (threeboxConfig && threeboxConfig.isInitialized) {
      console.log('Using MapLibre for navigation');
      threeboxConfig.navigateToDestination(destination);
    } else {
      console.log('Map not yet initialized, waiting...');
      // Wait for map to be initialized
      const waitForInitialization = () => {
        if (threeboxConfig && threeboxConfig.isInitialized) {
          console.log('Map now initialized, navigating...');
          threeboxConfig.navigateToDestination(destination);
        } else {
          console.log('Still waiting for map initialization...');
          setTimeout(waitForInitialization, 300);
        }
      };
      
      waitForInitialization();
    }
    
    // On mobile, collapse the sidebar after selection
    if (window.innerWidth <= 768 && this.sidebar.classList.contains('expanded')) {
      this.sidebar.classList.remove('expanded');
    }
  }

  /**
   * Show destination information in the info panel
   * @param {Object} destination - Destination data
   */
  showDestinationInfo(destination) {
    // Create HTML content for info panel
    let html = `
      <div class="info-header">
        <h2>${destination.name}</h2>
        <p class="category">${this.formatCategory(destination.category)}</p>
      </div>
      
      <div class="info-image" style="background-image: url('assets/images/${destination.images[0]}');"></div>
      
      <div class="info-detail">
        <p>${destination.description}</p>
      </div>
      
      <div class="info-detail">
        <h3>Location Details</h3>
        <p><strong>Distance:</strong> ${destination.distance}</p>
        <p><strong>Driving Time:</strong> ${destination.drivingTime}</p>
      </div>
    `;
    
    // Add operating hours
    if (destination.operatingHours) {
      html += `
        <div class="info-detail">
          <h3>Operating Hours</h3>
          <p>${destination.operatingHours}</p>
        </div>
      `;
    }
    
    // Add pricing information
    if (destination.pricing) {
      html += `
        <div class="info-detail">
          <h3>Pricing</h3>
          <ul>
      `;
      
      for (const [key, value] of Object.entries(destination.pricing)) {
        html += `<li><strong>${this.formatPricingKey(key)}:</strong> ${value}</li>`;
      }
      
      html += `
          </ul>
        </div>
      `;
    }
    
    // Add special events
    if (destination.specialEvents && destination.specialEvents.length > 0) {
      html += `
        <div class="info-detail">
          <h3>Special Events</h3>
          <ul>
      `;
      
      destination.specialEvents.forEach(event => {
        html += `
          <li>
            <strong>${event.name}</strong><br>
            ${event.schedule}
            ${event.price ? `<br>${event.price}` : ''}
          </li>
        `;
      });
      
      html += `
          </ul>
        </div>
      `;
    }
    
    // Add features
    if (destination.features && destination.features.length > 0) {
      html += `
        <div class="info-detail">
          <h3>Features</h3>
          <ul>
      `;
      
      destination.features.forEach(feature => {
        html += `<li>${feature}</li>`;
      });
      
      html += `
          </ul>
        </div>
      `;
    }
    
    // Set content and show panel
    this.infoPanelContent.innerHTML = html;
    this.infoPanel.classList.add('active');
  }

  /**
   * Hide the info panel
   */
  hideInfoPanel() {
    this.infoPanel.classList.remove('active');
  }

  /**
   * Filter destinations by category
   * @param {string} categoryId - Category ID to filter by
   */
  filterDestinations(categoryId) {
    const sections = document.querySelectorAll('.category-section');
    
    if (categoryId === 'all') {
      // Show all sections
      sections.forEach(section => {
        section.style.display = 'block';
      });
    } else {
      // Show only the selected category
      sections.forEach(section => {
        if (section.id === categoryId) {
          section.style.display = 'block';
        } else {
          section.style.display = 'none';
        }
      });
    }
  }

  /**
   * Search destinations by name
   * @param {string} query - Search query
   */
  searchDestinations(query) {
    query = query.toLowerCase().trim();
    
    // Show all sections when search is cleared
    if (query === '') {
      this.filterDestinations('all');
      this.destinationItems.forEach(item => {
        item.style.display = 'flex';
      });
      return;
    }
    
    // Show all category sections for search
    const sections = document.querySelectorAll('.category-section');
    sections.forEach(section => {
      section.style.display = 'block';
    });
    
    // Filter destination items
    this.destinationItems.forEach(item => {
      const name = item.querySelector('h4').textContent.toLowerCase();
      
      if (name.includes(query)) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
    
    // Hide empty sections
    sections.forEach(section => {
      const visibleItems = section.querySelectorAll('.destination-item[style="display: flex;"]');
      
      if (visibleItems.length === 0) {
        section.style.display = 'none';
      }
    });
  }

  /**
   * Zoom the map in or out
   * @param {number} delta - Zoom delta (1 for zoom in, -1 for zoom out)
   */
  zoomMap(delta) {
    if (threeboxConfig.isInitialized) {
      const currentZoom = threeboxConfig.map.getZoom();
      threeboxConfig.map.zoomTo(currentZoom + delta);
    } else if (threeConfig.isInitialized) {
      if (delta > 0) {
        threeConfig.controls.dollyIn(1.2);
      } else {
        threeConfig.controls.dollyOut(1.2);
      }
    }
  }

  /**
   * Rotate the map
   */
  rotateMap() {
    if (threeboxConfig.isInitialized) {
      const currentBearing = threeboxConfig.map.getBearing();
      threeboxConfig.map.rotateTo(currentBearing + 45);
    } else if (threeConfig.isInitialized) {
      // Rotate camera around target
      const currentPosition = threeConfig.camera.position.clone();
      const target = threeConfig.controls.target;
      
      // Rotate 45 degrees around the y-axis
      const angle = Math.PI / 4;
      const x = currentPosition.x - target.x;
      const z = currentPosition.z - target.z;
      
      const newX = x * Math.cos(angle) - z * Math.sin(angle);
      const newZ = x * Math.sin(angle) + z * Math.cos(angle);
      
      threeConfig.camera.position.x = newX + target.x;
      threeConfig.camera.position.z = newZ + target.z;
      threeConfig.camera.lookAt(target);
    }
  }

  /**
   * Reset the map view
   */
  resetMapView() {
    if (threeboxConfig.isInitialized) {
      threeboxConfig.map.flyTo({
        center: [115.188919, -8.409518], // Center of Bali
        zoom: 9,
        pitch: 60,
        bearing: 0,
        duration: 1500
      });
    } else if (threeConfig.isInitialized) {
      threeConfig.camera.position.set(0, 30, 30);
      threeConfig.controls.target.set(0, 0, 0);
      threeConfig.camera.lookAt(0, 0, 0);
    }
  }

  /**
   * Handle window resize
   */
  handleResize() {
    // Adjust UI based on window size
    if (window.innerWidth > 768) {
      // Reset sidebar on desktop
      this.sidebar.classList.remove('expanded');
    }
  }

  /**
   * Format category name for display
   * @param {string} category - Category ID
   * @returns {string} - Formatted category name
   */
  formatCategory(category) {
    switch (category) {
      case 'featured':
        return 'Featured Attraction';
      case 'beach-clubs':
        return 'Beach Club';
      case 'water-sports':
        return 'Water Sports';
      case 'cultural':
        return 'Cultural Site';
      default:
        return category.charAt(0).toUpperCase() + category.slice(1);
    }
  }

  /**
   * Format pricing key for display
   * @param {string} key - Pricing key
   * @returns {string} - Formatted pricing key
   */
  formatPricingKey(key) {
    // Convert camelCase to Title Case with spaces
    return key
      .replace(/([A-Z])/g, ' $1') // Add space before capital letters
      .replace(/^./, str => str.toUpperCase()); // Capitalize first letter
  }
}

// Create instance
const uiControls = new UIControls();
