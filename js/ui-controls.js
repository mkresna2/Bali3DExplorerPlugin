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
            this.infoPanelContentAI.style.display = '';
            this.infoPanelContentAI.classList.add('active');
            this.infoPanelContentDestination.style.display = 'none';
            this.infoPanelContentDestination.classList.remove('active');
            this.showAIItinerary();
          }
        });
      });
    }

    // Update destinationItems before adding listeners
    this.updateDestinationItems();
    this.destinationItems.forEach(item => {
      item.addEventListener('click', () => {
        const destinationId = item.dataset.id;
        const destination = destinations.find(d => d.id === destinationId);
        this.showDestinationInfo(destination);
        this.navigateToDestination(destination); // Trigger navigation on destination click
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
    if (window.innerWidth <= 768 && this.sidebar.classList.contains('expanded')) {
      this.sidebar.classList.remove('expanded');
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

  /**
   * Populate AI Itinerary tab using LLM with this destination as a spot, based at Sakala Resort Bali
   */
  async populateAIItineraryWithDestination(destination) {
    this.infoPanelContentAI.innerHTML = '<p><em>Generating itinerary with AI...</em></p>';
    try {
      const itinerary = await this.generateAIItinerary(destination);
      this.infoPanelContentAI.innerHTML = `<h3>AI-Generated Tour Itinerary</h3>${itinerary}`;
    } catch (err) {
      this.infoPanelContentAI.innerHTML = '<p style="color:red;">Failed to generate itinerary. Please try again later.</p>';
      console.error(err);
    }
  }

  /**
   * Generate AI itinerary using OpenRouter API
   * @param {Object} destination - The selected destination to include in the itinerary
   */
  async generateAIItinerary(destination) {
    // Compose a prompt for the LLM
    const prompt = `Create 2 different full-day Bali tour options that both depart from Sakala Resort Bali. Each tour must include ${destination ? destination.name : 'a top destination'} as one of the main tour spots. For each tour, think about other attractions or destinations that are on the same route or close by to this destination, and include them as stops. For each tour option, provide a detailed itinerary with recommended stops, timing, and activities throughout the day. Clearly label the two options as "Option 1" and "Option 2".`;

    // OpenRouter API endpoint and key (now proxied via PHP)
    const apiUrl = '/wp-content/plugins/Bali3DExplorer/js/openrouter-proxy.php'; // Use absolute path for WordPress plugin

    // Prepare the request payload
    const payload = {
      model: 'meta-llama/llama-4-scout:free',
      messages: [
        { role: 'system', content: 'You are a helpful Bali trip planner.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 2048,
      temperature: 0.7
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      let resultText = '';
      if (!response.ok) {
        // Try to extract error details from response
        let errorMsg = `Error: ${response.status} ${response.statusText}`;
        try {
          const errorData = await response.json();
          errorMsg += errorData.error ? `\nDetails: ${errorData.error}` : `\n${JSON.stringify(errorData)}`;
        } catch (jsonErr) {
          try {
            const textData = await response.text();
            errorMsg += `\n${textData}`;
          } catch (textErr) {
            // Ignore
          }
        }
        throw new Error(errorMsg);
      } else {
        // Try to parse response JSON for the itinerary
        const data = await response.json();
        // OpenRouter API sometimes returns content in reasoning if content is empty
        if (data.choices && data.choices[0] && data.choices[0].message) {
          const msg = data.choices[0].message;
          resultText = msg.content && msg.content.trim() ? msg.content : (msg.reasoning && msg.reasoning.trim() ? msg.reasoning : JSON.stringify(data));
        } else {
          resultText = JSON.stringify(data);
        }
      }
      return this.formatAIItinerary(resultText);
    } catch (err) {
      // Surface the error message in the UI and console
      console.error('Error calling OpenRouter API:', err);
      throw err;
    }
  }

  /**
   * Format the AI-generated itinerary string as user-friendly HTML
   * @param {string} rawText
   * @returns {string} HTML
   */
  formatAIItinerary(rawText) {
    if (!rawText) return '<p>No itinerary could be generated.</p>';
    // Remove leading explanations or greetings
    rawText = rawText.replace(/^[^*\n]+here are two[^*\n]+\n?/i, '');
    // Remove repeated Option headings (keep only the first per section)
    rawText = rawText.replace(/(Option 1[\s\S]*?)(Option 1[\s\S]*)/i, '$1');
    // Split by Option headings (Option 1, Option 2, Option 3, ...)
    const optionRegex = /Option\s*\d+[:\.]?/gi;
    let options = [];
    let match;
    let lastIndex = 0;
    while ((match = optionRegex.exec(rawText)) !== null) {
      if (match.index > lastIndex) {
        options.push(rawText.substring(lastIndex, match.index));
      }
      lastIndex = match.index;
    }
    // Push the last option
    if (lastIndex < rawText.length) {
      options.push(rawText.substring(lastIndex));
    }
    // Clean and format each option
    const formattedOptions = options.map((opt, i) => {
      // Get the option title
      const titleMatch = opt.match(/Option\s*\d+[:\.]?/i);
      let optionTitle = titleMatch ? titleMatch[0].replace(/[:.]/, '').trim() : `Option ${i+1}`;
      // Remove the title from content
      let content = opt.replace(/Option\s*\d+[:\.]?/i, '');
      // Remove duplicate headings like 'Here's a detailed itinerary for Option X'
      content = content.replace(/here's a detailed itinerary for[^\n]*\n?/i, '');
      // Extract and remove tour name (first line before any time or bullet)
      let tourTitleMatch = content.match(/^([A-Za-z0-9 ,\-\(\)\/]+Tour.*?)\*?\*?\s*:?\s*(\n|$)/i);
      let tourTitle = '';
      if (tourTitleMatch) {
        tourTitle = tourTitleMatch[1].replace(/\*+$/, '').trim();
        content = content.replace(tourTitleMatch[0], '');
      }
      // Extract and remove Departure and Return lines
      let departureMatch = content.match(/Departure[:\-]?\s*([\d: ]+[AP]M.*?)\*?\s*(\n|$)/i);
      let departure = '';
      if (departureMatch) {
        departure = departureMatch[0].replace(/\*+$/, '').trim();
        content = content.replace(departureMatch[0], '');
      }
      let returnMatch = content.match(/Return[:\-]?\s*([\d: ]+[AP]M.*?)\*?\s*(\n|$)/i);
      let returnInfo = '';
      if (returnMatch) {
        returnInfo = returnMatch[0].replace(/\*+$/, '').trim();
        content = content.replace(returnMatch[0], '');
      }
      // Remove stray asterisks and extra whitespace
      content = content.replace(/\*+/g, '').replace(/\n{2,}/g, '\n').trim();
      // Split by time headings (e.g., 8:00 AM, 13:00, etc.)
      const timeStepRegex = /((?:[01]?\d|2[0-3]):[0-5]\d ?(?:AM|PM)?)/gi;
      let steps = [];
      let timeMatch, prevIdx = 0;
      while ((timeMatch = timeStepRegex.exec(content)) !== null) {
        if (timeMatch.index > prevIdx) {
          steps.push(content.substring(prevIdx, timeMatch.index).trim());
        }
        steps.push(`<strong>${timeMatch[1]}</strong>`);
        prevIdx = timeMatch.index + timeMatch[1].length;
      }
      if (prevIdx < content.length) {
        steps.push(content.substring(prevIdx).trim());
      }
      // Merge time with following text
      let merged = [];
      for (let j = 0; j < steps.length; j++) {
        if (steps[j].startsWith('<strong>')) {
          if (j+1 < steps.length && steps[j+1]) {
            merged.push(`${steps[j]} ${steps[j+1]}`);
            j++;
          } else {
            merged.push(steps[j]);
          }
        } else if (steps[j].length > 2) {
          merged.push(steps[j]);
        }
      }
      merged = merged.filter(line => line.replace(/[*\-+]/g,'').trim().length > 2);
      // Format as HTML
      let html = `<div class="ai-itinerary-option">`;
      html += `<h4>${optionTitle}</h4>`;
      if (tourTitle) html += `<div class="ai-tour-title">${tourTitle}</div>`;
      if (departure) html += `<div class="ai-tour-meta"><span class="ai-label">${departure}</span></div>`;
      if (returnInfo) html += `<div class="ai-tour-meta"><span class="ai-label">${returnInfo}</span></div>`;
      html += `<ul>` + merged.map(step => `<li>${step.replace(/^([*\-+]\s*)/, '')}</li>`).join('') + `</ul></div>`;
      return html;
    });
    // If no options found, fallback to pre
    if (!formattedOptions.length) {
      return `<pre style="white-space:pre-wrap;">${rawText}</pre>`;
    }
    return formattedOptions.join('');
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
      this.infoPanelContentAI.innerHTML = '<p><em>Generating itinerary with AI...</em></p>';
      try {
        const itinerary = await this.generateAIItinerary();
        this.infoPanelContentAI.innerHTML = `<h3>AI-Generated Itinerary</h3>${itinerary}`;
      } catch (err) {
        this.infoPanelContentAI.innerHTML = '<p style="color:red;">Failed to generate itinerary. Please try again later.</p>';
        console.error(err);
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
