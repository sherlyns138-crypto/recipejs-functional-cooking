// Wrap everything in IIFE
const RecipeApp = (() => {

    // ============================================
    // DATA: Recipes (foundation for all parts)
    // ============================================
    const recipes = [
        {
            id: 1,
            title: "Classic Spaghetti Carbonara",
            time: 25,
            difficulty: "easy",
            description: "A creamy Italian pasta dish made with eggs, cheese, pancetta, and black pepper.",
            category: "pasta",
            ingredients: ["spaghetti", "eggs", "cheese", "pancetta", "pepper"],
            steps: [
            "Bring a large pot of salted water to boil",
            "Cook spaghetti according to package directions",
            {
                text: "Prepare the sauce",
                substeps: [
                    "Beat eggs in a bowl",
                    "Grate cheese and add to eggs",
                    "Add generous black pepper",
                    "Mix well"
                ]
            },
            "Cook pancetta until crispy",
            "Drain pasta, reserve 1 cup pasta water",
            "Add hot pasta to pancetta pan (off heat)",
            "Quickly mix in egg mixture, adding pasta water to create creamy sauce",
            "Serve immediately with extra cheese"
        ]

        },
        {
            id: 2,
            title: "Chicken Tikka Masala",
            time: 45,
            difficulty: "medium",
            description: "Tender chicken pieces in a creamy, spiced tomato sauce.",
            category: "curry",
            ingredients: ["chicken", "yogurt", "spices", "tomato sauce"],
            steps: [
            {
                text: "Marinate chicken",
                substeps: [
                    "Mix yogurt with spices",
                    "Add chicken pieces",
                    "Leave for 1 hour"
                ]
            },
            "Cook marinated chicken until browned",
            "Prepare sauce with onions, garlic, ginger, and tomato puree",
            "Add cream and simmer",
            "Combine chicken with sauce",
            "Serve with rice or naan"
        ]

        },
        {
            id: 3,
            title: "Homemade Croissants",
            time: 180,
            difficulty: "hard",
            description: "Buttery, flaky French pastries that require patience but deliver amazing results.",
            category: "baking",
            ingredients: ["flour", "butter", "yeast", "milk"],
            steps: [
            "Prepare dough with flour, yeast, milk, sugar, and salt",
            "Chill dough",
            {
                text: "Laminate dough",
                substeps: [
                    "Layer butter",
                    "Fold and roll",
                    {
                        text: "Repeat folding",
                        substeps: ["Fold 3 times", "Chill between folds"]
                    }
                ]
            },
            "Shape croissants",
            "Proof until doubled",
            "Bake until golden brown"
        ]

        },
        {
            id: 4,
            title: "Greek Salad",
            time: 15,
            difficulty: "easy",
            description: "Fresh vegetables, feta cheese, and olives tossed in olive oil and herbs.",
            category: "salad",
            ingredients: ["tomatoes", "cucumber", "feta", "olives"],
            steps: ["Chop vegetables", "Mix with feta and olives", "Dress with olive oil"]
        },
        {
            id: 5,
            title: "Beef Wellington",
            time: 120,
            difficulty: "hard",
            description: "Tender beef fillet coated with mushroom duxelles and wrapped in puff pastry.",
            category: "meat",
            ingredients: ["beef fillet", "mushrooms", "puff pastry"],
            steps: ["Prepare beef", "Cook mushrooms", "Wrap in pastry", "Bake"]
        },
        {
            id: 6,
            title: "Vegetable Stir Fry",
            time: 20,
            difficulty: "easy",
            description: "Colorful mixed vegetables cooked quickly in a savory sauce.",
            category: "vegetarian",
            ingredients: ["mixed vegetables", "soy sauce", "garlic"],
            steps: ["Chop vegetables", "Stir fry quickly", "Add sauce"]
        },
        {
            id: 7,
            title: "Pad Thai",
            time: 30,
            difficulty: "medium",
            description: "Thai stir-fried rice noodles with shrimp, peanuts, and tangy tamarind sauce.",
            category: "noodles",
            ingredients: ["rice noodles", "shrimp", "peanuts", "tamarind"],
            steps: ["Soak noodles", "Cook shrimp", "Prepare sauce", "Mix together"]
        },
        {
            id: 8,
            title: "Margherita Pizza",
            time: 60,
            difficulty: "medium",
            description: "Classic Italian pizza with fresh mozzarella, tomatoes, and basil.",
            category: "pizza",
            ingredients: ["pizza dough", "tomatoes", "mozzarella", "basil"],
            steps: ["Prepare dough", "Add toppings", "Bake"]
        }
    ];

    // ============================================
    // STATE
    // ============================================
    let currentFilter = 'all';
    let currentSort = 'none';

    // ============================================
    // DOM REFERENCES
    // ============================================
    const recipeContainer = document.querySelector('#recipe-container');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const sortButtons = document.querySelectorAll('.sort-btn');
    // ============================================
    // HELPER FUNCTIONS
    // ============================================
    const renderSteps = (steps) => {
        return steps.map(step => {
            if (typeof step === "string") {
                return `<li>${step}</li>`;
            } else if (step.text && step.substeps) {
                return `<li>${step.text}<ul>${renderSteps(step.substeps)}</ul></li>`;
            }
        }).join('');
    };

// Recursive function to render steps (handles nesting)
const renderSSteps = (steps, level = 0) => {
    // Determine the CSS class based on nesting level
    const listClass = level === 0 ? 'steps-list' : 'substeps-list';
    
    let html = `<ol class="${listClass}">`;
    
    steps.forEach(step => {
        // TODO: Check if step is a string or object
        if (typeof step === 'string') {
            // Simple step - just add as list item
            html += `<li>${step}</li>`;
        } else {
            // Nested step - has text and substeps
            html += `<li>`;
            html += step.text;  // Main step text
            
            // TODO: Recursively call renderSteps for substeps
            if (step.substeps && step.substeps.length > 0) {
                // RECURSIVE CALL - this is the key!
                html += renderSteps(step.substeps, level + 1);
            }
            
            html += `</li>`;
        }
    });
    
    html += `</ol>`;
    return html;
};
    // Updated Recipe Card Template (Step 2)
    const createRecipeCard = (recipe) => {
        return `
            <div class="recipe-card" data-id="${recipe.id}">
                <h3>${recipe.title}</h3>
                <div class="recipe-meta">
                    <span>⏱️ ${recipe.time} min</span>
                    <span class="difficulty ${recipe.difficulty}">${recipe.difficulty}</span>
                </div>
                <p>${recipe.description}</p>
                
                <!-- NEW: Toggle Buttons -->
                <div class="card-actions">
                    <button class="toggle-btn" data-recipe-id="${recipe.id}" data-toggle="steps">
                        📋 Show Steps
                    </button>
                    <button class="toggle-btn" data-recipe-id="${recipe.id}" data-toggle="ingredients">
                        🥗 Show Ingredients
                    </button>
                </div>
<!-- NEW: Ingredients Section (hidden by default) -->
                <div class="ingredients-container hidden" data-recipe-id="${recipe.id}">
                    <h4>Ingredients:</h4>
                    <ul>
                        ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                    </ul>
                </div>
                
                <!-- NEW: Steps Section (hidden by default) -->
                <div class="steps-container hidden" data-recipe-id="${recipe.id}">
                    <h4>Cooking Steps:</h4>
                    ${createStepsHTML(recipe.steps)}
                </div>
            </div>
        `;
    };
// ============================================
    // FILTER & SORT FUNCTIONS
    // ============================================
    const filterByDifficulty = (recipes, difficulty) => recipes.filter(r => r.difficulty === difficulty);
    const filterByTime = (recipes, maxTime) => recipes.filter(r => r.time <= maxTime);

    const applyFilter = (recipes, filterType) => {
        switch (filterType) {
            case 'easy': return filterByDifficulty(recipes, 'easy');
            case 'medium': return filterByDifficulty(recipes, 'medium');
            case 'hard': return filterByDifficulty(recipes, 'hard');
            case 'quick': return filterByTime(recipes, 30);
            default: return recipes;
        }
    };

    const sortByName = (recipes) => [...recipes].sort((a, b) => a.title.localeCompare(b.title));
    const sortByTime = (recipes) => [...recipes].sort((a, b) => a.time - b.time);

    const applySort = (recipes, sortType) => {
        switch (sortType) {
            case 'name': return sortByName(recipes);
            case 'time': return sortByTime(recipes);
            default: return recipes;
        }
    };
// ============================================
    // RENDERING
    // ============================================
    const renderRecipes = (recipesToRender) => {
        recipeContainer.innerHTML = recipesToRender.map(createRecipeCard).join('');
    };

    const updateDisplay = () => {
        let recipesToDisplay = applyFilter(recipes, currentFilter);
        recipesToDisplay = applySort(recipesToDisplay, currentSort);
        renderRecipes(recipesToDisplay);
    };

    // Create complete steps HTML for a recipe
const createStepsHTML = (steps) => {
    // TODO: Check if steps exist
    if (!steps || steps.length === 0) {
        return '<p>No steps available</p>';
    }
    
    // Call the recursive function to generate the nested list
    return renderSteps(steps);
};
// ============================================
    // EVENT HANDLERS
    // ============================================
    const handleFilterClick = (event) => {
        currentFilter = event.target.dataset.filter;
        updateDisplay();
    };

    const handleSortClick = (event) => {
        currentSort = event.target.dataset.sort;
        updateDisplay();
    };

    // Handle toggle button clicks using event delegation
const handleToggleClick = (event) => {
    // Check if clicked element is a toggle button
    if (!event.target.classList.contains('toggle-btn')) {
        return;  // Not a toggle button, ignore
    }
    
    const button = event.target;
    const recipeId = button.dataset.recipeId;
    const toggleType = button.dataset.toggle;  // "steps" or "ingredients"
    
    // TODO: Find the corresponding container
    const containerClass = toggleType === 'steps' ? 'steps-container' : 'ingredients-container';
    const container = document.querySelector(`.${containerClass}[data-recipe-id="${recipeId}"]`);
    
    // TODO: Toggle visibility
    if (container) {
        container.classList.toggle('visible');
        
        // Update button text
        const isVisible = container.classList.contains('visible');
        if (toggleType === 'steps') {
            button.textContent = isVisible ? '📋 Hide Steps' : '📋 Show Steps';
        } else {
            button.textContent = isVisible ? '🥗 Hide Ingredients' : '🥗 Show Ingredients';
        }
    }
};

// Helper to mark currently active filter/sort buttons
const updateActiveButtons = () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    const activeFilterBtn = document.querySelector(`.filter-btn[data-filter="${currentFilter}"]`);
    if (activeFilterBtn) activeFilterBtn.classList.add('active');

    sortButtons.forEach(btn => btn.classList.remove('active'));
    const activeSortBtn = document.querySelector(`.sort-btn[data-sort="${currentSort}"]`);
    if (activeSortBtn) activeSortBtn.classList.add('active');
};
// ============================================
    // INITIALIZATION
    // ============================================
    const setupEventListeners = () => {
        // From Part 2 - filter buttons
        filterButtons.forEach(btn => {
            btn.addEventListener('click', handleFilterClick);
        });
        
        // From Part 2 - sort buttons
        sortButtons.forEach(btn => {
            btn.addEventListener('click', handleSortClick);
        });
        
        // NEW: Event delegation for toggle buttons
        // One listener on parent handles all toggle buttons
        recipeContainer.addEventListener('click', handleToggleClick);
        
        console.log('Event listeners attached!');
    };

    const init = () => {
        console.log('RecipeApp initializing...');
        setupEventListeners();
        updateDisplay();
        console.log('RecipeApp ready!');
    };

    // ============================================
    // PUBLIC API
    // ============================================
    return {
        init,
        updateDisplay
    };

})();

// Start the app
RecipeApp.init();