import './style.css';
import itemsjs from 'itemsjs';
import 'leaflet/dist/leaflet.css'; 
import L from 'leaflet';


class LEDASearch {
  constructor() {
    this.state = {
      query: '',
      filters: {},
      sort: '', // Default sort until config is loaded
      bounds: null,
    };

    this.initialize();
  }

  async initialize() {
    try {
      await this.loadConfiguration();
      await this.initSearchEngine();
      
      // Update sort after config is loaded
      this.state.sort = this.config.searchConfig.defaultSort;

      // Create the filters from the aggregations in the config
      const filters = {}
      for (const [field, aggregation] of Object.entries(this.config.aggregations)) {
        filters[field] = [];
      }
      this.state.filters = filters
      
      this.initMap();
      this.bindEvents();
      await this.fetchAggregations();
      await this.performSearch();
    } catch (error) {
      console.error('Initialization error:', error);
    }
  }

  async loadConfiguration() {
    try {
      const response = await fetch('./src/config/map-config.json');
      this.config = await response.json();
      console.log('Loaded configuration:', this.config);
    } catch (error) {
      console.error('Error loading configuration:', error);
      throw error;
    }
  }

  async initSearchEngine() {
    try {
      const response = await fetch('./src/data/data.json');
      const data = await response.json();
      this.searchEngine = itemsjs(data, this.config);
      console.log('Search engine initialized with data:', data.length, 'items');
    } catch (error) {
      console.error('Error initializing search engine:', error);
      throw error;
    }
  }

  initMap() {
    const { initialView, initialZoom } = this.config.map;
  
    this.map = L.map('map').setView(initialView, initialZoom);
    
    // Create base layers object
    this.baseLayers = {
      alidade: L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="https://www.stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }),
      outdoors: L.tileLayer('https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="https://www.stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }),
      osm: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }),
      terrain: L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      })
    };
  
    // Add the default layer (Alidade Smooth)
    this.baseLayers.alidade.addTo(this.map);
    this.currentBaseLayer = this.baseLayers.alidade;
  
    // Create layer control dropdown
    const layerControl = document.createElement('select');
    layerControl.className = 'absolute top-4 right-4 z-[1000] px-4 py-2 bg-white rounded-md shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500';
    
    const layerOptions = {
      alidade: 'Stadia Alidade Smooth',
      outdoors: 'Stadia Outdoors',
      osm: 'OpenStreetMap',
      terrain: 'Stadia Terrain'
    };
  
    Object.entries(layerOptions).forEach(([value, label]) => {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = label;
      layerControl.appendChild(option);
    });
  
    // Add event listener for layer changes
    layerControl.addEventListener('change', (e) => {
      const newLayerKey = e.target.value;
      if (this.currentBaseLayer) {
        this.map.removeLayer(this.currentBaseLayer);
      }
      this.currentBaseLayer = this.baseLayers[newLayerKey];
      this.currentBaseLayer.addTo(this.map);
    });
  
    // Add the control to the map
    const mapContainer = document.getElementById('map');
    mapContainer.style.position = 'relative';
    mapContainer.appendChild(layerControl);
  
    this.markers = L.layerGroup().addTo(this.map);
  }

  bindEvents() {
    this.setupSearchInput();
    this.setupSortSelect();
    this.map.on('moveend', () => this.performSearch());
  }

  setupSearchInput() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) {
      console.error('Search input element not found');
      return;
    }

    const debouncedSearch = this.debounce(() => {
      this.state.query = searchInput.value;
      this.performSearch();
    }, this.config.searchConfig.debounceTime || 300);

    searchInput.addEventListener('input', debouncedSearch);
  }

  setupSortSelect() {
    const sortSelect = document.getElementById('sort-select');
    if (!sortSelect || !this.config.searchConfig.sortOptions) {
      console.error('Sort select element not found or sort options not configured');
      return;
    }

    sortSelect.innerHTML = this.config.searchConfig.sortOptions
      .map(option => `<option value="${option.value}">${option.label}</option>`)
      .join('');

    sortSelect.addEventListener('change', (e) => {
      this.state.sort = e.target.value;
      this.performSearch();
    });
  }

  async fetchAggregations() {
    if (!this.searchEngine) {
      console.error('Search engine not initialized');
      return;
    }

    // Now we pass the current filters and query to get updated aggregations
    const results = this.searchEngine.search({
      query: this.state.query || '',
      filters: this.state.filters
    });

    const aggregations = {};
    for (const key in results.data.aggregations) {
      if (results.data.aggregations.hasOwnProperty(key)) {
        aggregations[key] = results.data.aggregations[key].buckets;
      }
    }

    this.renderFacets(aggregations);
  }

  renderFacets(aggregations) {
    if (!aggregations || !this.config.aggregations) {
        console.error('No aggregations data or configuration available.');
        return;
    }
    
    const facetsContainer = document.getElementById('facets-container');
    
    // Store current checked state before clearing
    const checkedState = {};
    Object.keys(this.config.aggregations).forEach(facetKey => {
      const facetElement = document.getElementById(`${facetKey}-facet`);
      if (facetElement) {
        checkedState[facetKey] = Array.from(facetElement.querySelectorAll('input:checked')).map(input => input.value);
      }
    });

    // Clear existing facets
    facetsContainer.innerHTML = '';

    // Create facets for each configured aggregation
    Object.entries(this.config.aggregations).forEach(([facetKey, facetConfig]) => {
        // Create facet group container
        const facetGroup = document.createElement('div');
        facetGroup.className = 'facet-group mb-4';
        facetGroup.id = `${facetKey}-facet`;

        // Create title
        const title = document.createElement('h3');
        title.className = 'text-lg font-semibold mb-2';
        title.textContent = facetConfig.title || facetKey;
        facetGroup.appendChild(title);

    // In the renderFacets method, replace the slider creation code with this:
    if (facetConfig.type === 'chronology') {
      const sliderContainer = document.createElement('div');
      sliderContainer.className = 'facet-slider my-4';
    
      const dateBuckets = aggregations[facetKey] || [];
      const dates = dateBuckets
        .map(bucket => {
          const date = new Date(bucket.key);
          return isNaN(date.getTime()) ? null : date;
        })
        .filter(date => date !== null);
    
      const minDate = new Date(Math.min(...dates.map(d => d.getTime())));
      const maxDate = new Date(Math.max(...dates.map(d => d.getTime())));
    
      if (facetConfig.type === 'chronology') {
        const sliderContainer = document.createElement('div');
        sliderContainer.className = 'chronology-slider my-4';
    
        // Create the chart and slider structure
        sliderContainer.innerHTML = `
          <label class="sr-only">Date range</label>
          <div class="relative">
            <div id="${facetKey}-chart-background"></div>
            <div class="absolute top-0 left-0 w-full h-full overflow-hidden">
              <div id="${facetKey}-chart-foreground"></div>
            </div>
          </div>
          <div id="${facetKey}-slider" class="mt-4"></div>
          <div class="mt-5">
            <div class="text-sm font-medium mb-2">Custom range:</div>
            <div class="flex space-x-4">
              <div class="flex-1">
                <input id="${facetKey}-min-input" type="text"
                       class="py-2 px-3 block w-full border rounded-md text-sm focus:ring focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:text-gray-300"
                       value="${minDate}">
              </div>
              <div class="flex-1">
                <input id="${facetKey}-max-input" type="text"
                       class="py-2 px-3 block w-full border rounded-md text-sm focus:ring focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:text-gray-300"
                       value="${maxDate}">
              </div>
            </div>
          </div>
        `;
    
        facetGroup.appendChild(sliderContainer);
    
        // Access elements using querySelector within sliderContainer
        const slider = sliderContainer.querySelector(`#${facetKey}-slider`);
        const minInput = sliderContainer.querySelector(`#${facetKey}-min-input`);
        const maxInput = sliderContainer.querySelector(`#${facetKey}-max-input`);
    
        // Get current filter values or use min/max dates
        const currentFilter = this.state.filters[facetKey];
        let startValue, endValue;
    
        if (!currentFilter || currentFilter.length === 0) {
            startValue = minDate.getTime();
            endValue = maxDate.getTime();
        } else {
            startValue = currentFilter[0];
            endValue = currentFilter[1];
        }
    
        // Initialize noUiSlider
        noUiSlider.create(slider, {
            start: [startValue, endValue],
            connect: true,
            range: {
                'min': minDate.getTime(),
                'max': maxDate.getTime()
            },
            format: {
                to: (value) => Math.round(value),
                from: (value) => parseInt(value, 10)
            }
        });
    
        // Update inputs when slider changes
        slider.noUiSlider.on('update', (values) => {
            minInput.value = new Date(Number(values[0])).toISOString().split('T')[0];
            maxInput.value = new Date(Number(values[1])).toISOString().split('T')[0];
        });
    
        // Handle slider changes
        slider.noUiSlider.on('change', (values) => {
            const [start, end] = values.map(val => Number(val));
    
            if (!isNaN(start) && !isNaN(end)) {
                this.state.filters[facetKey] = [start, end];
                this.performSearch();
                this.fetchAggregations();
            }
        });
    
        // Handle input changes
        const handleInputChange = this.debounce((evt) => {
            const isMin = evt.target === minInput;
            const inputValue = new Date(evt.target.value).getTime();
            const [currentMin, currentMax] = slider.noUiSlider.get().map(Number);
    
            slider.noUiSlider.set([
                isMin ? inputValue : currentMin,
                isMin ? currentMax : inputValue
            ]);
        }, 200);
    
        minInput.addEventListener('input', handleInputChange);
        maxInput.addEventListener('input', handleInputChange);
    }
    
      }  

      else if (facetConfig.type === 'taxonomy') {
        const taxonomyContainer = document.createElement('div');
        taxonomyContainer.className = 'taxonomy-container';
      
        // Build hierarchical structure
        const hierarchy = {};
        const facetData = aggregations[facetKey] || [];
        
        // First pass: create the hierarchy
        facetData.forEach(bucket => {
          const parts = bucket.key.split(' > ');
          let currentLevel = hierarchy;
          
          parts.forEach((part, index) => {
            if (!currentLevel[part]) {
              currentLevel[part] = {
                children: {},
                docCount: 0,
                selfCount: 0
              };
            }
            if (index === parts.length - 1) {
              currentLevel[part].selfCount = bucket.doc_count;
            }
            currentLevel = currentLevel[part].children;
          });
        });
      
        // Second pass: calculate parent counts by summing children
        function calculateTotalCounts(node) {
          let totalCount = node.selfCount || 0;
          
          Object.values(node.children).forEach(child => {
            totalCount += calculateTotalCounts(child);
          });
          
          node.docCount = totalCount;
          return totalCount;
        }
      
        // Calculate counts for all root nodes
        Object.values(hierarchy).forEach(node => {
          calculateTotalCounts(node);
        });
      
        // Rest of the rendering code remains the same
        function createTaxonomyHTML(node, path = [], level = 0) {
          let html = '<ul class="taxonomy-list" style="margin-left: ' + (level * 20) + 'px;">';
          
          Object.entries(node).forEach(([key, value]) => {
            if (key === 'children' || key === 'docCount' || key === 'selfCount') return;
            
            const currentPath = [...path, key];
            const fullPath = currentPath.join(' > ');
            const hasChildren = Object.keys(value.children).length > 0;
            
            html += `
              <li class="taxonomy-item">
                <div class="taxonomy-row">
                  ${hasChildren ? 
                    `<span class="toggle-btn" data-path="${fullPath}">▶</span>` : 
                    '<span class="toggle-placeholder"></span>'}
                  <label>
                    <input type="checkbox" 
                           value="${fullPath}" 
                           data-facet-type="${facetKey}"
                           ${checkedState[facetKey]?.includes(fullPath) ? 'checked' : ''}>
                    <span>${key} (${value.docCount})</span>
                  </label>
                </div>
                ${hasChildren ? 
                  `<div class="children" data-parent="${fullPath}" style="display: none;">
                    ${createTaxonomyHTML(value.children, currentPath, level + 1)}
                  </div>` : 
                  ''}
              </li>
            `;
          });
          
          return html + '</ul>';
        }

        // Add CSS styles
        const styleElement = document.createElement('style');
        styleElement.textContent = `
          .taxonomy-list {
            list-style: none;
            padding: 0;
          }
          .taxonomy-item {
            margin: 5px 0;
          }
          .taxonomy-row {
            display: flex;
            align-items: center;
            gap: 5px;
          }
          .toggle-btn {
            cursor: pointer;
            width: 20px;
            user-select: none;
          }
          .toggle-placeholder {
            width: 20px;
          }
          .children {
            margin-left: 20px;
          }
        `;
        document.head.appendChild(styleElement);

        // Set HTML content
        taxonomyContainer.innerHTML = createTaxonomyHTML(hierarchy);

        // Add event listeners for toggle buttons
        taxonomyContainer.addEventListener('click', (e) => {
          if (e.target.classList.contains('toggle-btn')) {
            const path = e.target.dataset.path;
            const childrenContainer = taxonomyContainer.querySelector(`[data-parent="${path}"]`);
            if (childrenContainer) {
              const isHidden = childrenContainer.style.display === 'none';
              childrenContainer.style.display = isHidden ? 'block' : 'none';
              e.target.textContent = isHidden ? '▼' : '▶';
            }
          }
        });

        facetGroup.appendChild(taxonomyContainer);
      }
      
      
      else {
          const optionsContainer = document.createElement('div');
          optionsContainer.className = 'facet-options space-y-2';

          const facetData = aggregations[facetKey] || [];
          facetData.forEach(bucket => {
              const label = document.createElement('label');
              label.className = 'cursor-pointer block';
              label.style.display = 'block';

              const checkbox = document.createElement('input');
              checkbox.type = 'checkbox';
              checkbox.value = bucket.key;
              checkbox.className = 'form-checkbox mr-2';
              checkbox.dataset.facetType = facetKey;

              if (checkedState[facetKey]?.includes(bucket.key)) {
                  checkbox.checked = true;
              }

              const text = document.createElement('span');
              text.textContent = `${bucket.key} (${bucket.doc_count})`;
              text.className = 'text-sm';

              label.appendChild(checkbox);
              label.appendChild(text);
              optionsContainer.appendChild(label);
          });

          facetGroup.appendChild(optionsContainer);
      }

      facetsContainer.appendChild(facetGroup);
  });

    this.addFacetEventListeners();
  }

  onFacetChange(event) {
    const { value, checked } = event.target;
    const facetType = event.target.dataset.facetType;

    if (checked) {
      if (!this.state.filters[facetType]) {
        this.state.filters[facetType] = [];
      }
      this.state.filters[facetType].push(value);
    } else {
      this.state.filters[facetType] = this.state.filters[facetType].filter(v => v !== value);
    }
    
    this.performSearch();
    this.fetchAggregations();
  }

  handleSliderChange(event, facetKey) {
    const value = event.target.value;
    // Depending on your aggregation, the value can be a number or a date range
    const dateFilter = { [facetKey]: value };

    // Update filters
    this.state.filters[facetKey] = [value]; // Simple example, you can adjust for actual date ranges
    this.performSearch();
    this.fetchAggregations();
}

  addFacetEventListeners() {
    if (!this.config.aggregations) {
      console.error('Aggregations configuration not found');
      return;
    }

    Object.keys(this.config.aggregations).forEach(facetKey => {
      const facetContainer = document.getElementById(`${facetKey}-facet`);
  
      if (facetContainer) {
        facetContainer.querySelectorAll('input').forEach(input => {
          input.addEventListener('change', this.onFacetChange.bind(this));
        });
      }
    });
  }

  // filterByBounds(items, bounds) {
  //   if (!bounds) return items;
  //   return items.filter(item => {
  //     const { latitude: lat, longitude: lng } = item;
  //     return (
  //       lat >= bounds.south &&
  //       lat <= bounds.north &&
  //       lng >= bounds.west &&
  //       lng <= bounds.east
  //     );
  //   });
  // }

  // updateBounds() {
  //   const bounds = this.map?.getBounds();
  //   if (bounds) {
  //     this.state.bounds = {
  //       north: bounds.getNorth(),
  //       south: bounds.getSouth(),
  //       east: bounds.getEast(),
  //       west: bounds.getWest(),
  //     };
  //   }
  // }

  renderMarkers(items) {
    // Clear previous markers
    this.markers.clearLayers();
  
    // Loop through items and create markers
    items.forEach(item => {
      const { latitude, longitude, title } = item;
      if (latitude && longitude) {
        const marker = L.marker([latitude, longitude])
          .bindPopup(`
            <h3>${item.mainSpace}</h3>
            <p>${item.landscapeType}</p>
          `)
          .addTo(this.markers);
      }
    });
  }

  performSearch() {
    if (!this.searchEngine) {
      console.error('Search engine not initialized');
      return;
    }

    const { filters } = this.state;
    
    // Separate filters by type to handle them differently
    const regularFilters = {};
    const dateFilters = {};
    const taxonomyFilters = {};

    Object.entries(filters).forEach(([key, values]) => {
      if (!values || values.length === 0) return;
      
      const config = this.config.aggregations[key];
      if (!config) return;

      switch (config.type) {
        case 'chronology':
          dateFilters[key] = values;
          break;
        case 'taxonomy':
          taxonomyFilters[key] = values;
          break;
        default:
          regularFilters[key] = values;
      }
    });

    const results = this.searchEngine.search({
      query: this.state.query || '',
      filters: regularFilters,
      sort: this.state.sort || 'title_asc',
      filter: (item) => {
        // Check date filters
        for (const [field, range] of Object.entries(dateFilters)) {
          if (range.length === 2) {
            const [startDate, endDate] = range;
            const itemDate = new Date(item[field]).getTime();
            if (!(itemDate >= startDate && itemDate <= endDate)) {
              return false;
            }
          }
        }

        // Check taxonomy filters
        for (const [field, paths] of Object.entries(taxonomyFilters)) {
          if (!item[field]) return false;
          
          // Check if any of the selected paths match the item's taxonomy
          const itemValue = item[field];
          const matches = paths.some(path => {
            return itemValue === path || itemValue.startsWith(path + ' > ');
          });
          
          if (!matches) return false;
        }

        return true;
      }
    });

    // Update the map
    const coordinates = results.data.items
      .filter(item => item.latitude && item.longitude)
      .map(item => [item.latitude, item.longitude]);

    if (coordinates.length > 0) {
      const bounds = L.latLngBounds(coordinates);
      this.map.fitBounds(bounds);
    }

    // Update markers and results
    this.renderMarkers(results.data.items);
    this.updateResultsList(results.data.items);

    // Update aggregations
    const aggregations = {};
    for (const key in results.data.aggregations) {
      if (results.data.aggregations.hasOwnProperty(key)) {
        aggregations[key] = results.data.aggregations[key].buckets;
      }
    }
    this.renderFacets(aggregations);
}

  updateResultsList(items) {
    const resultsContainer = document.getElementById('results');
    if (!resultsContainer) {
      console.error('Results container not found');
      return;
    }

    resultsContainer.innerHTML = items
      .map((item) => `
        <div class="p-4 bg-white rounded-lg shadow">
          <h3 class="font-semibold">${item.title}</h3>
          <p>by ${item.author}</p>
          <p>Date: ${item.year}</p>
        </div>
      `)
      .join('');
  }

  debounce(func, delay) {
    let timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, arguments), delay);
    };
  }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  new LEDASearch();
});