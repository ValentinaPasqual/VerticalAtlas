import './style.css';
import itemsjs from 'itemsjs';

class LEDASearch {
  constructor() {
    this.state = {
      query: '',
      filters: {
        year: [],
        mainSpace: [],
      },
      sort: 'title_asc', // Default sort until config is loaded
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
      const response = await fetch('/config/map-config.json');
      this.config = await response.json();
      console.log('Loaded configuration:', this.config);
    } catch (error) {
      console.error('Error loading configuration:', error);
      throw error;
    }
  }

  async initSearchEngine() {
    try {
      const response = await fetch('/data/data.json');
      const data = await response.json();
      this.searchEngine = itemsjs(data, this.config);
      console.log('Search engine initialized with data:', data.length, 'items');
    } catch (error) {
      console.error('Error initializing search engine:', error);
      throw error;
    }
  }

  initMap() {
    const { initialView, initialZoom, tileLayer, attribution } = this.config.map;

    this.map = L.map('map').setView(initialView, initialZoom);
    L.tileLayer(tileLayer, { attribution }).addTo(this.map);

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

    const results = this.searchEngine.search({
      query: '',
      filters: {}
    });

    const aggregations = {
      mainSpace: results.data.aggregations.mainSpace.buckets,
      year: results.data.aggregations.year.buckets
    };

    this.renderFacets(aggregations);
  }

  renderFacets(aggregations) {
    if (!aggregations || !this.config.aggregations) {
        console.error('No aggregations data or configuration available.');
        return;
    }

    const facetsContainer = document.getElementById('facets-container');
    const template = document.getElementById('facet-template');
    
    // Clear existing facets
    facetsContainer.innerHTML = '';

    // Create facets for each configured aggregation
    Object.entries(this.config.aggregations).forEach(([facetKey, facetConfig]) => {
        const facetElement = template.content.cloneNode(true);
        const facetGroup = facetElement.querySelector('.facet-group');
        
        // Set unique ID and title
        facetGroup.id = `${facetKey}-facet`;
        facetGroup.querySelector('h3').textContent = facetConfig.title || facetKey;

        // Get aggregation data for this facet
        const facetData = aggregations[facetKey] || [];
        const optionsContainer = facetGroup.querySelector('.facet-options');

        // Create checkbox options
        facetData.forEach(bucket => {
            const label = document.createElement('label');
            label.className = 'flex items-center space-x-2 cursor-pointer';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = bucket.key;
            checkbox.className = 'form-checkbox';
            checkbox.dataset.facetType = facetKey;

            const text = document.createElement('span');
            text.textContent = `${bucket.key} (${bucket.doc_count})`;
            text.className = 'text-sm';

            label.appendChild(checkbox);
            label.appendChild(text);
            optionsContainer.appendChild(label);
        });

        facetsContainer.appendChild(facetElement);
    });

    this.addFacetEventListeners();
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

  onFacetChange(event) {
    const { value, checked } = event.target;
    const facetType = event.target.closest('div[id$="-facet"]').id.split('-')[0];
    console.log(event.target.closest('div'))

    if (checked) {
      this.state.filters[facetType].push(value);
    } else {
      this.state.filters[facetType] = this.state.filters[facetType].filter(v => v !== value);
    }

    this.performSearch();
  }

  filterByBounds(items, bounds) {
    if (!bounds) return items;
    return items.filter(item => {
      const { latitude: lat, longitude: lng } = item;
      return (
        lat >= bounds.south &&
        lat <= bounds.north &&
        lng >= bounds.west &&
        lng <= bounds.east
      );
    });
  }

  performSearch() {
    if (!this.searchEngine) {
      console.error('Search engine not initialized');
      return;
    }

    const bounds = this.map?.getBounds();
    if (bounds) {
      this.state.bounds = {
        north: bounds.getNorth(),
        south: bounds.getSouth(),
        east: bounds.getEast(),
        west: bounds.getWest(),
      };
    }

    let results = this.searchEngine.search({
      query: this.state.query || '',
      filters: { ...this.state.filters, mainSpace: this.state.filters?.mainSpace || [] },
      sort: this.state.sort || 'title_asc',
    });

    if (this.state.bounds) {
      results.data.items = this.filterByBounds(results.data.items, this.state.bounds);
    }

    this.updateMarkers(results.data.items);
    this.updateResultsList(results.data.items);
  }

  updateMarkers(items) {
    this.markers.clearLayers();
    items.forEach((item) => {
      const marker = L.marker([item.latitude, item.longitude]).bindPopup(`
        <h3>${item.title}</h3>
        <p>${item.author}</p>
      `);
      this.markers.addLayer(marker);
    });
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