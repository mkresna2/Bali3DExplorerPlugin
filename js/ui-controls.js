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
            this.infoPanelContentAI.innerHTML = `<div class="ai-loading"><div class="ai-spinner"></div><p><em>Generating itinerary with AI...</em></p></div>`;
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
        // Save the destination data for tab switching
        const destId = item.getAttribute('data-id');
        const foundDestination = destinations.find(d => d.id === destId);
        if (foundDestination) {
          this.lastSelectedDestination = foundDestination;
        }
        const destinationId = item.dataset.id;
        const destination = destinations.find(d => d.id === destinationId);
        this.showDestinationInfo(foundDestination);
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
    if (this.isAIItineraryLoading) return; // Loading guard
    const cacheKey = destination.id;
    // Check cache first
    if (this.aiItineraryCache && this.aiItineraryCache[cacheKey] && this.aiItineraryCache[cacheKey].itinerary) {
      this.infoPanelContentAI.innerHTML = `<h3>AI-Generated Tour Itinerary</h3>${this.aiItineraryCache[cacheKey].itinerary}`;
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
        <p><em>Generating itinerary with AI...</em></p>
      </div>`;
    try {
      const itinerary = await this.generateAIItinerary(destination);
      // Convert markdown to HTML for bold, italic, headings, and horizontal rules
      let htmlItinerary = typeof itinerary === 'string' ? itinerary : '';
      // Bold (**text** or __text__)
      htmlItinerary = htmlItinerary.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      htmlItinerary = htmlItinerary.replace(/__(.*?)__/g, '<strong>$1</strong>');
      // Italic (*text* or _text_)
      htmlItinerary = htmlItinerary.replace(/\*(.*?)\*/g, '<em>$1</em>');
      htmlItinerary = htmlItinerary.replace(/_(.*?)_/g, '<em>$1</em>');
      // H3 (### Heading)
      htmlItinerary = htmlItinerary.replace(/^### (.*)$/gm, '<h3>$1</h3>');
      // Horizontal rule (--- or - - -)
      htmlItinerary = htmlItinerary.replace(/^(---|\-\s\-\s\-)$/gm, '<hr>');
      this.aiItineraryCache[cacheKey] = { itinerary: htmlItinerary, timestamp: Date.now() };
      // Persist cache to localStorage
      try {
        localStorage.setItem('aiItineraryCache', JSON.stringify(this.aiItineraryCache));
      } catch (e) {
        // Ignore storage errors
      }
      this.infoPanelContentAI.innerHTML = `<h3>AI-Generated Tour Itinerary</h3>${htmlItinerary}`;
    } catch (err) {
      this.infoPanelContentAI.innerHTML = `
        <div style="color:red;">
          Failed to generate itinerary. Please try again later.
          <button class="ai-retry-btn">Retry</button>
        </div>`;
      // Attach retry handler
      const retryBtn = this.infoPanelContentAI.querySelector('.ai-retry-btn');
      if (retryBtn) {
        retryBtn.onclick = () => {
          this.populateAIItineraryWithDestination(destination);
        };
      }
      console.error(err);
    } finally {
      this.isAIItineraryLoading = false;
      // Re-enable AI tab if it was disabled
      if (this.infoTabBtns && this.infoTabBtns.length === 2) {
        this.infoTabBtns[1].classList.remove('disabled');
      }
    }
  }

  /**
   * Generate AI itinerary using Qwen3 API (via OpenRouter proxy)
   * @param {Object} destination - The selected destination to include in the itinerary
   */
  async generateAIItinerary(destination) {
    // Compose a prompt for the LLM
    const prompt = `Create 2 different tour options, a half-day and a full-day tour, that both depart from Sakala Resort Bali. Each tour must include ${destination ? destination.name : 'a top destination'} as one of the main tour spots. For each tour, think about other attractions or destinations that are on the same route or close by to this destination, and include them as stops. For each tour option, provide a detailed itinerary with recommended stops, timing, and activities throughout the day. Clearly label the two options as "Half-day Tour" and "Full-day Tour".\n\nReturn the result as a JSON array with two objects, each representing a tour. Each object should have:\n- type: 'Half-day' or 'Full-day'\n- title: title of the tour\n- overview: a short summary\n- stops: an array of objects, each with 'time', 'location', and 'description'\n- highlights: an array of strings\n\nIMPORTANT: Do not include any explanation, reasoning, or step-by-step thinking. Respond ONLY with a valid JSON array as described above. Do NOT include any text before or after the JSON array. Do NOT wrap the JSON in code blocks or quotes. Do not include trailing commas in the JSON array or objects. Example:\n[\n  {\n    \"type\": \"Half-day\",\n    \"title\": \"...\",\n    \"overview\": \"...\",\n    \"stops\": [\n      {\"time\": \"...\", \"location\": \"...\", \"description\": \"...\"}\n    ],\n    \"highlights\": [\"...\", \"...\"]\n  },\n  {\n    \"type\": \"Full-day\",\n    \"title\": \"...\",\n    \"overview\": \"...\",\n    \"stops\": [\n      {\"time\": \"...\", \"location\": \"...\", \"description\": \"...\"}\n    ],\n    \"highlights\": [\"...\", \"...\"]\n  }\n]\n`;
    // OpenRouter API endpoint and key (now proxied via PHP)
    const apiUrl = '/wp-content/plugins/Bali3DExplorer/openrouter-proxy.php'; // Use absolute path for WordPress plugin

    // Prepare the request payload for Qwen3
    const payload = {
      model: 'qwen/qwen3-32b:free',
      messages: [
        { role: 'system', content: 'You are a helpful Bali trip planner.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 2048,
      temperature: 0.7,
      enable_thinking: false // Qwen3-specific: disables thinking mode
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
        // Qwen3 API returns content in choices[0].message.content
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
      console.error('Error calling Qwen3 API:', err);
      throw err;
    }
  }

  /**
   * Format the AI-generated itinerary string as user-friendly HTML
   * @param {string} rawText
   * @returns {string} HTML
   */
  formatAIItinerary(rawText) {
    console.log('[AIItinerary Debug] Raw LLM output:', rawText);
    if (!rawText) {
      console.warn('[AIItinerary Debug] No rawText received.');
      return '<div class="ai-itinerary-empty">No itinerary could be generated. The AI did not return any output. Please try again or contact support.</div>';
    }

    // Super-forgiving: Remove all trailing commas before } or ] (nested, multiline)
    let forgivingText = rawText.replace(/,\s*([}\]])/g, '$1');
    // If output ends with an open array/object, try to close it
    if (forgivingText.match(/\[\s*{[\s\S]*$/) && !forgivingText.trim().endsWith(']')) {
      forgivingText += ']';
    }

    // Try to extract a JSON array from the text
    let tours = null;
    let jsonMatch = forgivingText.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      try {
        tours = JSON.parse(jsonMatch[0]);
        console.log('[AIItinerary Debug] Parsed JSON array:', tours);
      } catch (e) {
        console.error('[AIItinerary Debug] JSON.parse error (from regex match):', e);
        tours = null;
      }
    } else {
      // Try to parse as JSON directly
      try {
        tours = JSON.parse(forgivingText);
        console.log('[AIItinerary Debug] Parsed JSON (direct):', tours);
      } catch (e) {
        console.error('[AIItinerary Debug] JSON.parse error (direct):', e);
        tours = null;
      }
    }
    if (Array.isArray(tours) && tours.length > 0) {
      // Render from structured JSON
      return tours.map(tour => {
        // Prettier itinerary format inspired by the screenshot
        const stopsHtml = Array.isArray(tour.stops) ? tour.stops.map(stop => `
          <div class="ai-stop">
            <div class="ai-stop-header">
              <span class="ai-stop-time">${stop.time ? `<span class=\"ai-stop-time-icon\">✅</span> ${stop.time}` : ''}</span>
              <span class="ai-stop-title"><strong>${stop.location || ''}</strong></span>
            </div>
            <ul class="ai-stop-details">
              ${stop.description ? `<li>${stop.description}</li>` : ''}
            </ul>
          </div>
        `).join('') : '';
        const highlightsHtml = Array.isArray(tour.highlights) && tour.highlights.length > 0
          ? `<div class="ai-tour-highlights"><strong>Highlights:</strong><ul>${tour.highlights.map(h => `<li>${h}</li>`).join('')}</ul></div>`
          : '';
        return `
          <div class="ai-itinerary-card">
            <div class="ai-itinerary-title"><span class="ai-itinerary-icon">📖</span> <strong>${tour.type ? tour.type + ' Tour' : ''}${tour.title ? ' – ' + tour.title : ''}</strong></div>
            <div class="ai-tour-overview">${tour.overview || ''}</div>
            <div class="ai-tour-stops">
              ${stopsHtml}
            </div>
            ${highlightsHtml}
          </div>
        `;
      }).join('');
    }
    // Fallback to original text parsing
    // Extract each tour block (Half-day/Full-day) using headings
    const tourBlocks = rawText.split(/(?=\s*[🌴\-\*]*\s*(Half[- ]Day|Full[- ]Day) Tour[:：]?)/i).filter(Boolean);
    const formatted = tourBlocks
      .map(block => {
        // Accept blocks with at least one detail or overview
        if (!/(Tour Duration|Start Time|End Time|Location|Group Size|Departure Time|Return Time|Departure\/Return|Itinerary Overview|Itinerary:)/i.test(block)) return '';
        // Extract tour title (with optional subtitle)
        const titleMatch = block.match(/[🌴\-\*]*\s*(Half[- ]Day|Full[- ]Day) Tour[:：]?([^\n]*)/i);
        let title = titleMatch ? titleMatch[0].trim() : '';
        let content = block.replace(title, '').trim();

        // Extract key-value details
        const detailRegex = /(?:Tour Duration|Start Time|End Time|Location|Group Size|Departure Time|Return Time|Departure\/Return)\s*[:：]\s*([^\n]+)/gi;
        let details = '';
        let match;
        while ((match = detailRegex.exec(block)) !== null) {
          const key = match[0].split(/[:：]/)[0].trim();
          const value = match[1].trim();
          details += `<div class="ai-tour-detail-row"><span class="ai-tour-detail-key">${key}:</span> <span class="ai-tour-detail-value">${value}</span></div>`;
        }

        // Itinerary Overview (look for heading or numbered/bullet list)
        let itineraryHtml = '';
        let overview = '';
        // Prefer explicit Itinerary Overview/Itinerary: heading
        const overviewMatch = content.match(/(Itinerary Overview|Itinerary:)\s*([\s\S]*)/i);
        if (overviewMatch) {
          overview = overviewMatch[2].trim();
        } else {
          // Fallback: look for first numbered or bullet list
          const listMatch = content.match(/(\n?\d+\. .+([\s\S]+))/);
          if (listMatch) overview = listMatch[1].trim();
        }
        if (overview) {
          // Format time blocks (e.g., 9:00 AM) as checklist
          overview = overview.replace(/(\d{1,2}:\d{2}\s*[AP]M?)(\s*[\u2013\-–]\s*[^\n]*)?/g, '<span class="ai-time-check">✅</span> <strong>$1</strong>$2');
          // Numbered list to <li>
          overview = overview.replace(/\n?\d+\.\s*/g, '</li><li>');
          // Bullet list to <li>
          overview = overview.replace(/\n\s*\-\s*/g, '</li><li>');
          overview = '<ul><li>' + overview.replace(/^<\/li><li>/, '') + '</li></ul>';
          itineraryHtml = `<div class="ai-tour-overview-title">🗺️ Itinerary Overview</div>${overview}`;
        }

        // Compose card
        return `<div class="ai-itinerary-card">
          <div class="ai-tour-title-row">${title}</div>
          <div class="ai-tour-details">${details}</div>
          <hr class="ai-tour-divider" />
          ${itineraryHtml}
        </div>`;
      })
      .filter(card => card && card.trim().length > 0); // Remove empty/intro cards
    if (formatted.length === 0) {
      // Debug: Log rawText to console for troubleshooting
      console.warn('[AIItinerary Debug] No valid tour cards found. Raw AI output:', rawText);
      return '<div class="ai-itinerary-empty">No AI-generated itinerary could be produced for this destination. The AI did not return valid structured data. Please try again or contact support.</div>';
    }
    return formatted.join('');
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
      this.infoPanelContentAI.innerHTML = '<p><em>Generating itinerary with AI...</em></p>';
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

// DEV: Manual cache clear button
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  if (!document.getElementById('clear-ai-cache-btn')) {
    const btn = document.createElement('button');
    btn.id = 'clear-ai-cache-btn';
    btn.textContent = 'Clear AI Itinerary Cache';
    btn.style.position = 'fixed';
    btn.style.bottom = '20px';
    btn.style.right = '20px';
    btn.style.zIndex = 9999;
    btn.style.background = '#d32f2f';
    btn.style.color = 'white';
    btn.style.border = 'none';
    btn.style.padding = '10px 18px';
    btn.style.borderRadius = '8px';
    btn.style.cursor = 'pointer';
    btn.onclick = () => {
      localStorage.removeItem('aiItineraryCache');
      uiControls.aiItineraryCache = {};
      alert('AI Itinerary cache cleared!');
    };
    document.body.appendChild(btn);
  }
}
