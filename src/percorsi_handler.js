document.addEventListener("DOMContentLoaded", function() {
    // Create container for the alpinist index
    const container = document.createElement('div');
    container.id = 'alpinistIndex';
    container.className = 'alpinist-container';
    document.body.appendChild(container);

    // Add heading
    const heading = document.createElement('h1');
    heading.textContent = 'Alpinist Index';
    container.appendChild(heading);

    // Create search input
    const searchDiv = document.createElement('div');
    searchDiv.className = 'search-container';
    container.appendChild(searchDiv);
    
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.id = 'searchAlpinist';
    searchInput.placeholder = 'Search alpinists...';
    searchDiv.appendChild(searchInput);

    // Create alpinist list container
    const listContainer = document.createElement('div');
    listContainer.id = 'alpinistList';
    container.appendChild(listContainer);

    // Create guide filter
    const filterDiv = document.createElement('div');
    filterDiv.className = 'filter-container';
    container.appendChild(filterDiv);
    
    const guideFilter = document.createElement('div');
    guideFilter.innerHTML = `
        <label><input type="checkbox" id="guideFilter"> Show only guides</label>
    `;
    filterDiv.appendChild(guideFilter);

    // Fetch and process the TSV file
    fetch("/leda/data/data.tsv")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            // Parse TSV data
            const rows = data.trim().split('\n');
            const headers = rows[0].split('\t');

            console.log(headers);
            
            // Find indexes for Alpinist and Guide columns
            const guideIndex = headers.findIndex(h => h === 'Guide');
            const alpinistIndex = headers.findIndex(h => h === 'Alpinist');
            
            if (alpinistIndex === -1 && guideIndex === -1) {
                throw new Error("Neither Alpinist nor Guide column found in TSV file");
            }

            // Process the data
            const alpinists = [];
            for (let i = 1; i < rows.length; i++) {
                const columns = rows[i].split('\t');
                
                // Process Alpinist column if it exists
                if (alpinistIndex !== -1 && columns.length > alpinistIndex && columns[alpinistIndex].trim()) {
                    // Split by comma and process each alpinist
                    const alpinistNames = columns[alpinistIndex].split(',').map(name => name.trim());
                    
                    alpinistNames.forEach(name => {
                        if (name && !alpinists.some(a => a.name === name && a.role === 'Alpinist')) {
                            alpinists.push({
                                name: name,
                                role: 'Alpinist',
                                isGuide: false
                            });
                        }
                    });
                }
                
                // Process Guide column if it exists
                if (guideIndex !== -1 && columns.length > guideIndex && columns[guideIndex].trim()) {
                    // Split by comma and process each guide
                    const guideNames = columns[guideIndex].split(',').map(name => name.trim());
                    
                    guideNames.forEach(name => {
                        // Check if this person already exists as an alpinist
                        const existingPerson = alpinists.find(a => a.name === name);
                        
                        if (existingPerson) {
                            // Update the existing entry
                            existingPerson.isGuide = true;
                            existingPerson.role = existingPerson.role === 'Alpinist' ? 'Alpinist, Guide' : 'Guide';
                        } else if (name) {
                            // Add a new entry
                            alpinists.push({
                                name: name,
                                role: 'Guide',
                                isGuide: true
                            });
                        }
                    });
                }
            }

            // Sort alpinists alphabetically
            alpinists.sort((a, b) => a.name.localeCompare(b.name));
            
            // Display the alpinists
            displayAlpinists(alpinists);

            // Setup search functionality
            const searchInput = document.getElementById('searchAlpinist');
            searchInput.addEventListener('input', function() {
                filterAlpinists(alpinists);
            });

            // Setup guide filter functionality
            const guideFilter = document.getElementById('guideFilter');
            guideFilter.addEventListener('change', function() {
                filterAlpinists(alpinists);
            });
        })
        .catch(error => {
            console.error("Error loading TSV data:", error);
            document.getElementById('alpinistList').innerHTML = `
                <div class="error">Error loading alpinist data: ${error.message}</div>
            `;
        });

    // Function to display alpinists
    function displayAlpinists(alpinists) {
        const alpinistList = document.getElementById('alpinistList');
        alpinistList.innerHTML = '';

        // Create alphabetical sections
        const alphabetSections = {};
        
        alpinists.forEach(alpinist => {
            const firstLetter = alpinist.name.charAt(0).toUpperCase();
            if (!alphabetSections[firstLetter]) {
                alphabetSections[firstLetter] = [];
            }
            alphabetSections[firstLetter].push(alpinist);
        });

        // Create quick navigation
        const navDiv = document.createElement('div');
        navDiv.className = 'alpha-nav';
        Object.keys(alphabetSections).sort().forEach(letter => {
            const letterLink = document.createElement('a');
            letterLink.href = `#section-${letter}`;
            letterLink.textContent = letter;
            navDiv.appendChild(letterLink);
        });
        alpinistList.appendChild(navDiv);

        // Display alpinists by section
        Object.keys(alphabetSections).sort().forEach(letter => {
            const section = document.createElement('div');
            section.className = 'alpha-section';
            section.id = `section-${letter}`;
            
            const letterHeading = document.createElement('h2');
            letterHeading.textContent = letter;
            section.appendChild(letterHeading);
            
            const list = document.createElement('ul');
            alphabetSections[letter].forEach(alpinist => {
                const item = document.createElement('li');
                item.className = alpinist.isGuide ? 'guide' : '';
                
                // Create main name span
                const nameSpan = document.createElement('span');
                nameSpan.className = 'name';
                nameSpan.textContent = alpinist.name;
                item.appendChild(nameSpan);
                
                // Create role badge
                const roleBadge = document.createElement('span');
                roleBadge.className = 'role-badge';
                roleBadge.textContent = alpinist.role;
                item.appendChild(roleBadge);
                
                list.appendChild(item);
            });
            
            section.appendChild(list);
            alpinistList.appendChild(section);
        });
    }

    // Function to filter alpinists based on search and guide filter
    function filterAlpinists(allAlpinists) {
        const searchText = document.getElementById('searchAlpinist').value.toLowerCase();
        const showOnlyGuides = document.getElementById('guideFilter').checked;
        
        const filteredAlpinists = allAlpinists.filter(alpinist => {
            const matchesSearch = alpinist.name.toLowerCase().includes(searchText);
            const matchesGuideFilter = !showOnlyGuides || alpinist.isGuide;
            return matchesSearch && matchesGuideFilter;
        });
        
        displayAlpinists(filteredAlpinists);
    }

    // Add some basic styles
    const style = document.createElement('style');
    style.textContent = `
        .alpinist-container {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .search-container, .filter-container {
            margin-bottom: 20px;
        }
        
        input[type="text"] {
            width: 100%;
            padding: 8px;
            font-size: 16px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        
        .alpha-nav {
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 20px;
            border-bottom: 1px solid #eee;
            padding-bottom: 10px;
        }
        
        .alpha-nav a {
            display: block;
            padding: 5px 10px;
            margin: 2px;
            text-decoration: none;
            background: #f5f5f5;
            border-radius: 3px;
            color: #333;
        }
        
        .alpha-section {
            margin-bottom: 20px;
        }
        
        .alpha-section h2 {
            border-bottom: 1px solid #eee;
            padding-bottom: 5px;
        }
        
        ul {
            list-style: none;
            padding: 0;
        }
        
        li {
            padding: 5px 0;
            border-bottom: 1px solid #f5f5f5;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .guide {
            font-weight: bold;
        }
        
        .name {
            flex-grow: 1;
        }
        
        .role-badge {
            background: #3498db;
            color: white;
            padding: 2px 8px;
            border-radius: 3px;
            font-size: 12px;
            margin-left: 10px;
        }
        
        .guide .role-badge {
            background: #4CAF50;
        }
        
        .error {
            color: red;
            padding: 20px;
            background: #fff0f0;
            border-radius: 4px;
        }
    `;
    document.head.appendChild(style);
});