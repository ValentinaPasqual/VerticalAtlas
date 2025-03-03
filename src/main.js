import './style.css';
import itemsjs from 'itemsjs';
import 'leaflet/dist/leaflet.css'; 
import L from 'leaflet';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';

const base = import.meta.env.BASE_URL;

class LEDASearch {
  constructor() {
    this.state = {
      query: '',
      filters: {},
      sort: '', // Default sort until config is loaded
      bounds: null,
    };

    // Get loader element
    this.loaderElement = document.getElementById('loader-container');
    this.initialize();
  }

   // Hide loader
  hideLoader() {
    if (this.loaderElement) {
      this.loaderElement.classList.add('loader-hidden');
    }
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
      this.hideLoader();
    } catch (error) {
      console.error('Initialization error:', error);
      this.hideLoader();
    }
  }

  async loadConfiguration() {
    try {
      const response = await fetch(`${base}/config/map-config.json`);
      this.config = await response.json();
      console.log('Loaded configuration:', this.config);
    } catch (error) {
      console.error('Error loading configuration:', error);
      throw error;
    }
  }

  async initSearchEngine() {
    try {
      // Fetch the TSV file
      const response = await fetch(`${base}/data/data.tsv`);
      const tsvText = await response.text();
         
      // Parse TSV to JSON
      const preprocessJsonData = this.parseTsvToJson(tsvText);

      // Split multivalue fields based on config
      const jsonData = this.processMultivalueFields(preprocessJsonData);

      this.config.searchConfig.per_page = jsonData.lenght;

      // Initialize itemsjs with the parsed JSON data
      this.searchEngine = itemsjs(jsonData, this.config);

      console.log('Search engine initialized with data:', jsonData.length, 'items');

    } catch (error) {
      console.error('Error initializing search engine:', error);
      throw error;
    }
  }

  // Add this method to process multivalue fields
  processMultivalueFields(preprocessJsonData) {
    const multivalueConfig = this.config.datasetConfig?.multivalue_rows || {};
    
    preprocessJsonData.forEach(item => {
      Object.keys(multivalueConfig).forEach(field => {
        if (item[field] && typeof item[field] === 'string') {
          const separator = multivalueConfig[field];
          item[field] = item[field].split(separator).map(val => val.trim());
        }
      });
    });
    
    return preprocessJsonData;
  }

  // Helper method to parse TSV to JSON
  parseTsvToJson(tsvText) {
    // Split the TSV text into rows
  const rows = tsvText.trim().split('\n');
  
  // Extract headers from the first row
  const headers = rows[0].split('\t');
  
  // Convert each data row to a JSON object
  return rows.slice(1).map(row => {
    const values = row.split('\t');
    const item = {};
    
    // Map each value to its corresponding header
    headers.forEach((header, index) => {
      // Handle the case where cell is not empty
      if (index < values.length && values[index] !== '') {
        const value = values[index];
        
        // Try to parse numbers and booleans
        if (value.toLowerCase() === 'true') {
          item[header] = true;
        } else if (value.toLowerCase() === 'false') {
          item[header] = false;
        } else if (!isNaN(value) && value.trim() !== '') {
          item[header] = Number(value);
        } else {
          item[header] = value;
        }
      } 
    });
    
    return item;
  });
  }

initMap() {
    const { initialView, initialZoom, tileLayer, attribution } = this.config.map;

    this.map = L.map('map').setView(initialView, initialZoom);
    L.tileLayer(tileLayer, { attribution }).addTo(this.map);

    // Create a custom icon using Lucide MapPin
    this.createCustomIcon = (count) => {
      const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#1e40af" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
          ${count > 1 ? `<text x="12" y="10" text-anchor="middle" dy=".3em" fill="white" font-size="8" font-family="Arial">${count}</text>` : ''}
        </svg>
      `;

      return L.divIcon({
        html: svg,
        className: 'custom-marker',
        iconSize: [24, 24],
        iconAnchor: [12, 24],
        popupAnchor: [0, -24]
      });
    };
    
    // Initialize marker cluster group
    this.markers = L.markerClusterGroup({
      disableClusteringAtZoom: 15,
      showCoverageOnHover: true,
      zoomToBoundsOnClick: true,
      spiderfyOnMaxZoom: true,
      removeOutsideVisibleBounds: true,
      iconCreateFunction: (cluster) => {
        const count = cluster.getChildCount();
        const svg = `
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="18" fill="#1e40af" stroke="#ffffff" stroke-width="2"/>
            <text x="20" y="20" text-anchor="middle" dy=".3em" fill="white" font-size="14" font-family="Arial">${count}</text>
          </svg>
        `;

        return L.divIcon({
          html: svg,
          className: 'custom-cluster',
          iconSize: [40, 40],
          iconAnchor: [20, 20]
        });
      }
    }).addTo(this.map);

    // Add custom CSS
    const style = document.createElement('style');
    style.textContent = `
      .custom-marker {
        background: none;
        border: none;
      }
      .custom-cluster {
        background: none;
        border: none;
      }
    `;
    document.head.appendChild(style);
  }

  renderMarkers(items) {
    // Clear previous markers
    this.markers.clearLayers();

    // Group items by coordinates
    const locationGroups = {};
    items.forEach(item => {
      if (item.latitude && item.longitude) {
        const key = `${parseFloat(item.latitude)},${parseFloat(item.longitude)}`;
        const locName = item.Name
        if (!locationGroups[key]) {
          locationGroups[key] = {
            name : locName, 
            items: [],
            coords: [parseFloat(item.latitude), parseFloat(item.longitude)]
          };
        }
        locationGroups[key].items.push(item);
      }
    });

    // Create markers for each location group
    Object.values(locationGroups).forEach(group => {
      const { name, items, coords } = group;
      const count = items.length;

      // Create popup content
      const popupContent = `
      <div class="max-h-60 overflow-y-auto p-2">
        <h3 class="font-bold mb-2">${items.length} eventi</h3> 
        <ul class="space-y-2">
          ${items.map(item => `
            <li class="border-b pb-2">
              ${item.Name} (${item.Year}) <br>
             Alpinisti: ${item.Alpinist} <br>
              Guide: ${item.Guide}
            </li>
          `).join('')}
        </ul>
      </div>
      `;

      // Create marker with custom icon
      const marker = L.marker(coords, {
        icon: this.createCustomIcon(count)
      }).bindPopup(popupContent);

      this.markers.addLayer(marker);
    });
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
if (facetConfig.type === 'range') {
  const sliderContainer = document.createElement('div');
  sliderContainer.className = 'facet-slider my-4';

  const valueBuckets = aggregations[facetKey] || [];
  // Store the full bucket information for the bar chart
  const buckets = valueBuckets
    .map(bucket => {
      const value = parseInt(bucket.key, 10);
      return isNaN(value) ? null : {
        value: value,
        count: bucket.doc_count || 0
      };
    })
    .filter(bucket => bucket !== null);
  
  // Extract just the values for min/max calculations
  const values = buckets.map(bucket => bucket.value);

  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);

  // Create the chart and slider structure
  sliderContainer.innerHTML = `
    <label class="sr-only">Value range</label>
    <div class="relative">
      <div id="${facetKey}-chart" class="w-full h-24 mb-2"></div>
    </div>
    <div id="${facetKey}-slider" class="mt-2"></div>
    <div class="mt-5">
      <div class="text-sm font-medium mb-2">Custom range:</div>
      <div class="flex space-x-4">
        <div class="flex-1">
          <input id="${facetKey}-min-input" type="number"
                 class="py-2 px-3 block w-full border rounded-md text-sm focus:ring focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:text-gray-300"
                 value="${minValue}">
        </div>
        <div class="flex-1">
          <input id="${facetKey}-max-input" type="number"
                 class="py-2 px-3 block w-full border rounded-md text-sm focus:ring focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:text-gray-300"
                 value="${maxValue}">
        </div>
      </div>
    </div>
  `;

  facetGroup.appendChild(sliderContainer);

  // Access elements using querySelector within sliderContainer
  const chartElement = sliderContainer.querySelector(`#${facetKey}-chart`);
  const slider = sliderContainer.querySelector(`#${facetKey}-slider`);
  const minInput = sliderContainer.querySelector(`#${facetKey}-min-input`);
  const maxInput = sliderContainer.querySelector(`#${facetKey}-max-input`);
  
  // Render the bar chart
  this.renderBarChart(chartElement, buckets, minValue, maxValue);

  // Get current filter values or use min/max values
  const currentFilter = this.state.filters[facetKey];
  let startValue, endValue;

  if (!currentFilter || currentFilter.length === 0) {
      startValue = minValue;
      endValue = maxValue;
  } else {
      startValue = currentFilter[0];
      endValue = currentFilter[1];
  }

  // Initialize noUiSlider
  noUiSlider.create(slider, {
      start: [startValue, endValue],
      connect: true,
      step: 1, // Integer steps
      range: {
          'min': minValue,
          'max': maxValue
      },
      format: {
          to: (value) => Math.round(value),
          from: (value) => parseInt(value, 10)
      }
  });

  // Update inputs when slider changes
  slider.noUiSlider.on('update', (values) => {
      minInput.value = Math.round(Number(values[0]));
      maxInput.value = Math.round(Number(values[1]));
  });

  // Handle slider changes
  slider.noUiSlider.on('change', (values) => {
      const [start, end] = values.map(val => Math.round(Number(val)));

      if (!isNaN(start) && !isNaN(end)) {
          this.state.filters[facetKey] = [start, end];
          this.performSearch();
          this.fetchAggregations();
          
          // Update the highlighted range in the chart
          this.updateChartHighlight(chartElement, buckets, start, end);
      }
  });

  // Handle input changes
  const handleInputChange = this.debounce((evt) => {
      const isMin = evt.target === minInput;
      const inputValue = parseInt(evt.target.value, 10);
      const [currentMin, currentMax] = slider.noUiSlider.get().map(Number);

      if (!isNaN(inputValue)) {
          slider.noUiSlider.set([
              isMin ? inputValue : currentMin,
              isMin ? currentMax : inputValue
          ]);
      }
  }, 200);

  minInput.addEventListener('input', handleInputChange);
  maxInput.addEventListener('input', handleInputChange);

  // Initial chart highlight based on current range
  this.updateChartHighlight(chartElement, buckets, startValue, endValue);
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

  // handles barchart in slider 

  // Add these methods to your class

/**
 * Renders a bar chart showing the distribution of values
 * @param {HTMLElement} element - The container element for the chart
 * @param {Array} buckets - Array of value buckets with counts
 * @param {number} minValue - Minimum value in the range
 * @param {number} maxValue - Maximum value in the range
 */
renderBarChart(element, buckets, minValue, maxValue) {
  // Clear any existing content
  element.innerHTML = '';
  
  // Find the maximum count for scaling
  const maxCount = Math.max(...buckets.map(bucket => bucket.count));
  
  // Create a container for the bars
  const barsContainer = document.createElement('div');
  barsContainer.className = 'flex items-end w-full h-full relative';
  element.appendChild(barsContainer);
  
  // Sort buckets by value to ensure bars are in order
  const sortedBuckets = [...buckets].sort((a, b) => a.value - b.value);
  
  // Create and append bar elements
  sortedBuckets.forEach(bucket => {
    const barHeight = maxCount > 0 ? (bucket.count / maxCount) * 100 : 0;
    
    const bar = document.createElement('div');
    bar.className = 'flex-1 mx-px';
    bar.style.height = `${barHeight}%`;
    bar.style.backgroundColor = '#b0c4de';
    bar.dataset.value = bucket.value;
    bar.dataset.count = bucket.count;
    bar.title = `Value: ${bucket.value}, Count: ${bucket.count}`;
    
    barsContainer.appendChild(bar);
  });
  
  // Add a selection overlay for highlighting the active range
  const highlightOverlay = document.createElement('div');
  highlightOverlay.className = 'absolute top-0 h-full pointer-events-none';
  highlightOverlay.style.backgroundColor = 'rgba(66, 153, 225, 0.3)';
  highlightOverlay.id = `${element.id}-highlight`;
  element.appendChild(highlightOverlay);
}

/**
 * Updates the highlighted section of the chart based on selected range
 * @param {HTMLElement} chartElement - The chart container element
 * @param {Array} buckets - Array of value buckets
 * @param {number} startValue - Start of selected range
 * @param {number} endValue - End of selected range
 */
updateChartHighlight(chartElement, buckets, startValue, endValue) {
  const highlight = chartElement.querySelector(`#${chartElement.id}-highlight`);
  if (!highlight) return;
  
  const range = buckets[buckets.length - 1].value - buckets[0].value;
  if (range <= 0) return;
  
  // Calculate the left position and width as percentages
  const leftPos = ((startValue - buckets[0].value) / range) * 100;
  const width = ((endValue - startValue) / range) * 100;
  
  highlight.style.left = `${leftPos}%`;
  highlight.style.width = `${width}%`;
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
        case 'range':
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
      per_page: 526,
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
      // this.map.fitBounds(bounds);
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
          <h3 class="font-semibold">${item.Name}</h3>
          <p>Data: ${item.Year}</p>
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