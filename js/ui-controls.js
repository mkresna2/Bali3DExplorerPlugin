/**
 * Bali 3D Explorer - UI Controls
 * Handles user interface interactions
 */

class UIControls {
  constructor() {
    this.infoPanel = null;
    this.infoPanelContentDestination = null;
    this.infoPanelContentAI = null;
    this.closePanelBtn = null;
    this.infoTabBtns = null;
    this.aiItineraryBtn = null;
    this.destinationItems = null;
    this.categoryLinks = null;
    this.mobileMenuToggle = null;
    this.sidebar = null;
    this.mapControls = null;
    this.searchInput = null;
    this.panDelta = 100;
    this.isInitialized = false;
    this.lastSelectedDestination = null; // New property to store last selected destination
    this.isAIItineraryLoading = false; // New property to track AI itinerary loading state
    this.aiItineraryCache = {}; // key: destination.id, value: { itinerary: HTML, timestamp: Date.now() }

    // Load cache from localStorage if available, and clean expired entries
    try {
      const cached = localStorage.getItem('aiItineraryCache');
      let parsed = cached ? JSON.parse(cached) : {};
      const now = Date.now();
      const threeDays = 3 * 24 * 60 * 60 * 1000;
      // Remove expired entries
      for (const key in parsed) {
        if (!parsed[key].timestamp || now - parsed[key].timestamp > threeDays) {
          delete parsed[key];
        }
      }
      this.aiItineraryCache = parsed;
      // Save cleaned cache
      localStorage.setItem('aiItineraryCache', JSON.stringify(this.aiItineraryCache));
    } catch (e) {
      this.aiItineraryCache = {};
    }
  }

  /**
   * Initialize UI controls
   */
  init() {
    if (this.isInitialized) return;

    // Render destination list dynamically
    this.renderDestinationList();

    // Get DOM elements
    this.infoPanel = document.querySelector('.info-panel');
    this.infoPanelContentDestination = document.querySelector('.info-content-destination');
    this.infoPanelContentAI = document.querySelector('.info-content-ai');
    this.closePanelBtn = document.querySelector('.close-btn');
    this.infoTabBtns = document.querySelectorAll('.info-tab-btn');
    this.categoryLinks = document.querySelectorAll('.categories a');
    this.mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    this.sidebar = document.querySelector('.destination-sidebar');
    this.mapControls = document.querySelectorAll('.control-btn');
    this.searchInput = document.querySelector('.search-container input');

    // Always update destinationItems after rendering
    this.updateDestinationItems();

    // Add event listeners
    this.addEventListeners();
    
    this.isInitialized = true;
  }

  /**
   * Update the destinationItems NodeList
   */
  updateDestinationItems() {
    this.destinationItems = document.querySelectorAll('.destination-item');
  }

  /**
   * Add event listeners to UI elements
   */
  addEventListeners() {
    // Close info panel
    if (this.closePanelBtn) {
      this.closePanelBtn.addEventListener('click', () => {
        this.hideInfoPanel();
      });
    } else {
      console.warn('UIControls: .close-btn element not found in DOM. Close panel button will not work.');
    }

    // Info tab switching
    if (this.infoTabBtns && this.infoTabBtns.length === 2) {
      this.infoTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          this.infoTabBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const tab = btn.getAttribute('data-tab');
          if (tab === 'destination') {
            this.infoPanelContentDestination.style.display = '';
            this.infoPanelContentDestination.classList.add('active');
            this.infoPanelContentAI.style.display = 'none';
            this.infoPanelContentAI.classList.remove('active');
          } else {
            // Always show spinner and switch to AI tab immediately
            this.infoPanelContentAI.style.display = '';
            this.infoPanelContentAI.classList.add('active');
            this.infoPanelContentDestination.style.display = 'none';
            this.infoPanelContentDestination.classList.remove('active');
            btn.classList.add('disabled');
            this.infoPanelContentAI.innerHTML = `<div class="ai-loading"><div class="ai-spinner"></div><p><em>Loading itinerary...</em></p></div>`;
            // Only request if not already loading or if destination changed
            if (!this.isAIItineraryLoading && this.lastSelectedDestination) {
              this.populateAIItineraryWithDestination(this.lastSelectedDestination);
            }
          }
        });
      });
    }

    // Update destinationItems before adding listeners
    this.updateDestinationItems();
    this.destinationItems.forEach(item => {
      item.addEventListener('click', () => {
        const destId = item.getAttribute('data-id');
        const destination = destinations.find(d => d.id === destId);
        if (destination) {
          this.lastSelectedDestination = destination;
          this.showDestinationInfo(destination);
          this.navigateToDestination(destination); // Trigger navigation on destination click
          // Debug: log destination
          console.log('[UIControls] Navigating to:', destination);
        } else {
          console.warn('[UIControls] Destination not found for id:', destId);
        }
      });
    });

    // Search input
    this.searchInput.addEventListener('input', (e) => {
      console.log('Search triggered:', e.target.value); // Debug log
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

    // Remove previous category click listeners if needed (not tracked here)
    // Add event listeners for category links
    if (this.categoryLinks) {
      this.categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          // Remove active class from all and add to clicked
          this.categoryLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
          const categoryId = link.getAttribute('data-category');
          // Filter displayed destinations by category
          document.querySelectorAll('.category-section').forEach(section => {
            if (section.id === categoryId) {
              section.style.display = '';
            } else {
              section.style.display = 'none';
            }
          });
        });
      });
    }

    // Add event listeners for map controls
    if (this.mapControls) {
      this.mapControls.forEach(btn => {
        btn.addEventListener('click', (e) => {
          if (btn.classList.contains('zoom-in')) {
            this.zoomMap(1);
          } else if (btn.classList.contains('zoom-out')) {
            this.zoomMap(-1);
          } else if (btn.classList.contains('rotate')) {
            this.rotateMap();
          } else if (btn.classList.contains('reset')) {
            this.resetMapView();
          } else if (btn.classList.contains('pan-up')) {
            this.panMap(0, -this.panDelta);
          } else if (btn.classList.contains('pan-down')) {
            this.panMap(0, this.panDelta);
          } else if (btn.classList.contains('pan-left')) {
            this.panMap(-this.panDelta, 0);
          } else if (btn.classList.contains('pan-right')) {
            this.panMap(this.panDelta, 0);
          }
        });
      });
    }

    // Add event listener for mobile menu toggle button
    if (this.mobileMenuToggle && this.sidebar) {
      this.mobileMenuToggle.addEventListener('click', () => {
        // Toggle sidebar visibility for mobile
        this.sidebar.classList.toggle('expanded');
        // Optionally, toggle a class on body for overlay or scroll lock
        document.body.classList.toggle('menu-open');
      });
    } else {
      if (!this.mobileMenuToggle) {
        console.warn('UIControls: .mobile-menu-toggle element not found in DOM. Mobile menu button will not work.');
      }
      if (!this.sidebar) {
        console.warn('UIControls: .destination-sidebar element not found in DOM. Sidebar will not work.');
      }
    }
  }

  /**
   * Navigate to a destination
   * @param {Object} destination - Destination data
   */
  navigateToDestination(destination) {
    console.log('UIControls: Navigating to destination:', destination.name);
    
    // Use MapLibre to navigate
    if (threeboxConfig && threeboxConfig.isInitialized) {
      //console.log('Using MapLibre for navigation');
      threeboxConfig.navigateToDestination(destination);
    } else {
      //console.log('Map not yet initialized, waiting...');
      // Wait for map to be initialized
      const waitForInitialization = () => {
        if (threeboxConfig && threeboxConfig.isInitialized) {
          //console.log('Map now initialized, navigating...');
          threeboxConfig.navigateToDestination(destination);
        } else {
          //console.log('Still waiting for map initialization...');
          setTimeout(waitForInitialization, 300);
        }
      };
      
      waitForInitialization();
    }
    
    // On mobile, collapse the sidebar after selection
    if (window.innerWidth <= 768 && this.sidebar && this.sidebar.classList.contains('expanded')) {
      this.sidebar.classList.remove('expanded');
      document.body.classList.remove('menu-open'); // Also remove menu-open class
    }
  }

  /**
   * Show destination information in the info panel
   * @param {Object} destination - Destination data
   */
  async showDestinationInfo(destination) {
    // Create HTML content for info panel
    let html = `
      <div class="info-header">
        <h2>${destination.name}</h2>
        <p class="category">${this.formatCategory(destination.category)}</p>
      </div>
      <div class="info-image" style="background-image: url('/wp-content/plugins/Bali3DExplorer/assets/images/${destination.images[0]}');"></div>
      <div class="info-detail">
        <p>${destination.description}</p>
      </div>
      <div class="info-detail">
        <h3>Details</h3>
        <ul>
          <li><strong>Distance:</strong> ${destination.distance}</li>
          <li><strong>Driving Time:</strong> ${destination.drivingTime}</li>
          <li><strong>Operating Hours:</strong> ${destination.operatingHours}</li>
          <li><strong>Entry Price:</strong> ${destination.pricing && destination.pricing.entry ? destination.pricing.entry : 'N/A'}</li>
        </ul>
      </div>
    `;
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
    this.infoPanelContentDestination.innerHTML = html;
    this.infoPanel.classList.add('active');

    // Activate the destination info tab when showing info
    if (this.infoTabBtns && this.infoTabBtns.length === 2) {
      this.infoTabBtns.forEach(b => b.classList.remove('active'));
      this.infoTabBtns[0].classList.add('active');
      this.infoPanelContentDestination.style.display = '';
      this.infoPanelContentDestination.classList.add('active');
      this.infoPanelContentAI.style.display = 'none';
      this.infoPanelContentAI.classList.remove('active');
    }

    // Populate AI Itinerary tab with LLM-generated itinerary for this destination
    this.populateAIItineraryWithDestination(destination);

    // Add close event listener to the close button every time info is shown
    const closeBtn = this.infoPanel.querySelector('.close-btn');
    if (closeBtn) {
      closeBtn.onclick = () => this.hideInfoPanel();
    }
  }

  async populateAIItineraryWithDestination(destination) {
    if (this.isAIItineraryLoading) return; // Loading guard
    const cacheKey = destination.id;
    // Check cache first
    if (this.aiItineraryCache && this.aiItineraryCache[cacheKey] && this.aiItineraryCache[cacheKey].itinerary) {
      this.infoPanelContentAI.innerHTML = `<h3>Tour Itinerary</h3>${this.aiItineraryCache[cacheKey].itinerary}`;
      this.isAIItineraryLoading = false;
      if (this.infoTabBtns && this.infoTabBtns.length === 2) {
        this.infoTabBtns[1].classList.remove('disabled');
      }
      return;
    }
    this.isAIItineraryLoading = true;
    this.infoPanelContentAI.innerHTML = `
      <div class="ai-loading">
        <div class="ai-spinner"></div>
        <p><em>Loading itinerary...</em></p>
      </div>`;
    // Determine file path based on category and destination name
    const category = destination.category || 'uncategorized';
    const fileName = destination.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
    const filePath = `/wp-content/plugins/Bali3DExplorer/itineraries/${category}/${fileName}.json`;
    try {
      const response = await fetch(filePath);
      if (!response.ok) throw new Error('Itinerary file not found');
      const itineraryArray = await response.json();
      let htmlItinerary = '';
      itineraryArray.forEach(tour => {
        htmlItinerary += `<h3>${tour.title}</h3>`;
        htmlItinerary += `<p><strong>Type:</strong> ${tour.type}</p>`;
        htmlItinerary += `<p><strong>Overview:</strong> ${tour.overview}</p>`;
        htmlItinerary += '<ul>';
        tour.stops.forEach(stop => {
          htmlItinerary += `<li><strong>${stop.time}</strong> - <strong>${stop.location}</strong>: ${stop.description}</li>`;
        });
        htmlItinerary += '</ul>';
        if (tour.highlights && tour.highlights.length > 0) {
          htmlItinerary += `<p><strong>Highlights:</strong> ${tour.highlights.join(', ')}</p>`;
        }
        htmlItinerary += '<hr>';
      });
      this.aiItineraryCache[cacheKey] = { itinerary: htmlItinerary, timestamp: Date.now() };
      try {
        localStorage.setItem('aiItineraryCache', JSON.stringify(this.aiItineraryCache));
      } catch (e) {}
      this.infoPanelContentAI.innerHTML = `<h3>Tour Itinerary</h3>${htmlItinerary}`;
    } catch (err) {
      this.infoPanelContentAI.innerHTML = `
        <div style="color:red;">
          Failed to load itinerary. Please try again later.
        </div>`;
      console.error(err);
    } finally {
      this.isAIItineraryLoading = false;
      if (this.infoTabBtns && this.infoTabBtns.length === 2) {
        this.infoTabBtns[1].classList.remove('disabled');
      }
    }
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
   * Pan the map by pixel values
   * @param {number} dx - Pixel offset x (positive right)
   * @param {number} dy - Pixel offset y (positive down)
   */
  panMap(dx, dy) {
    if (threeboxConfig.isInitialized) {
      threeboxConfig.map.panBy([dx, dy], { duration: 500 });
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
      case 'beaches':
        return 'Beach';
      case 'beach-clubs':
        return 'Beach Club';
      case 'water-sports':
        return 'Water Sports';
      case 'cultural':
        return 'Cultural Site';
      case 'cultural-experiences':
        return 'Cultural Experiences';
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

  /**
   * Render destination list dynamically from data
   */
  renderDestinationList() {
    const container = document.querySelector('.destination-list');
    if (!container) {
      console.error('[DEBUG] .destination-list container NOT FOUND!');
      return;
    }
    if (typeof destinations === 'undefined') {
      console.error('[DEBUG] destinations variable is UNDEFINED!');
      return;
    }
    if (!Array.isArray(destinations)) {
      console.error('[DEBUG] destinations is not an array:', destinations);
      return;
    }
    
    // Clear container
    container.innerHTML = '';
    const categories = [
      { id: 'featured', label: 'Featured Attractions' },
      { id: 'beaches', label: 'Top Beaches' },
      { id: 'beach-clubs', label: 'Beach Clubs' },
      { id: 'water-sports', label: 'Water Sports' },
      { id: 'cultural', label: 'Cultural Sites' },
      { id: 'cultural-experiences', label: 'Cultural Experiences' },
      { id: 'traditional-villages', label: 'Balinese Traditional Villages' }
    ];
    // Render category links in sidebar
    const categoriesContainer = document.querySelector('.categories ul');
    if (categoriesContainer) {
      categoriesContainer.innerHTML = '';
      categories.forEach((category, idx) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = 'javascript:void(0)';
        a.setAttribute('data-category', category.id);
        a.textContent = category.label;
        if (idx === 0) a.classList.add('active');
        li.appendChild(a);
        categoriesContainer.appendChild(li);
      });
    }
    categories.forEach(category => {
      // Create section
      const section = document.createElement('div');
      section.className = 'category-section';
      section.id = category.id;
      // Heading
      const h3 = document.createElement('h3');
      h3.textContent = category.label;
      section.appendChild(h3);
      // List
      const ul = document.createElement('ul');
      const dests = destinations.filter(d => d.category === category.id);
      dests.sort((a, b) => a.priority - b.priority);
      dests.forEach(d => {
        const li = document.createElement('li');
        li.classList.add('destination-item');
        li.dataset.id = d.id;
        const thumb = document.createElement('div');
        thumb.classList.add('destination-thumb');
        // Use absolute path for images to ensure they load correctly
        thumb.style.backgroundImage = `url('/wp-content/plugins/Bali3DExplorer/assets/images/${d.images[0]}')`;
        const info = document.createElement('div');
        info.classList.add('destination-info');
        const h4 = document.createElement('h4');
        h4.textContent = d.name;
        const p = document.createElement('p');
        p.classList.add('distance');
        let distanceText = d.drivingTime;
        const match = d.drivingTime.match(/(\d+)\s*(hour)?s?\s*(\d+)?\s*minutes?/);
        if (match && !d.drivingTime.includes('Starting')) {
          if (match[2]) {
            const hours = match[1];
            const mins = match[3] || '0';
            distanceText = `${hours}h ${mins}m drive`;
          } else {
            distanceText = `${match[1]} min drive`;
          }
        }
        p.textContent = distanceText;
        info.appendChild(h4);
        info.appendChild(p);
        li.appendChild(thumb);
        li.appendChild(info);
        ul.appendChild(li);
      });
      section.appendChild(ul);
      container.appendChild(section);
    });
    // Update categoryLinks NodeList after rendering
    this.categoryLinks = document.querySelectorAll('.categories a');
  }

  /**
   * Show AI Itinerary tab handler
   * When user switches to AI tab, if empty, trigger generation
   */
  async showAIItinerary() {
    if (!this.infoPanelContentAI.innerHTML || this.infoPanelContentAI.innerHTML.trim() === '' || this.infoPanelContentAI.innerHTML.includes('Generating')) {
      console.log('[AIItinerary] Setting loading message', { caller: 'showAIItinerary' });
      this.infoPanelContentAI.innerHTML = '<p><em>Loading itinerary...</em></p>';
      try {
        const itinerary = await this.generateAIItinerary();
        console.log('[AIItinerary] Setting final itinerary', { itinerary, caller: 'showAIItinerary' });
        this.infoPanelContentAI.innerHTML = `<h3>AI-Generated Itinerary</h3>${itinerary}`;
        // Ensure AI tab is visible and active after content is set
        this.infoPanelContentAI.style.display = '';
        this.infoPanelContentAI.classList.add('active');
        this.infoPanelContentDestination.style.display = 'none';
        this.infoPanelContentDestination.classList.remove('active');
      } catch (err) {
        this.infoPanelContentAI.innerHTML = '<p style="color:red;">Failed to generate itinerary. Please try again later.</p>';
        console.error(err);
        // Ensure AI tab is visible and active after error
        this.infoPanelContentAI.style.display = '';
        this.infoPanelContentAI.classList.add('active');
        this.infoPanelContentDestination.style.display = 'none';
        this.infoPanelContentDestination.classList.remove('active');
      }
    }
  }
}

// Create instance
const uiControls = new UIControls();

// Ensure UI is initialized after DOM and destinations are loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    if (typeof destinations !== 'undefined') {
      uiControls.init();
    } else {
      // Wait for destinations.js to load
      const checkDestinations = setInterval(function() {
        if (typeof destinations !== 'undefined') {
          clearInterval(checkDestinations);
          uiControls.init();
        }
      }, 50);
    }
  });
} else {
  if (typeof destinations !== 'undefined') {
    uiControls.init();
  } else {
    const checkDestinations = setInterval(function() {
      if (typeof destinations !== 'undefined') {
        clearInterval(checkDestinations);
        uiControls.init();
      }
    }, 50);
  }
}

