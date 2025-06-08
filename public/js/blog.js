document.addEventListener('DOMContentLoaded', function() {
    const blogGrid = document.querySelector('.blog-grid');
    const paginationContainer = document.querySelector('.pagination');
    const filterBarContainer = document.querySelector('.filter-bar');
    const postsPerPage = 9;
  
  // Helper function to parse Dutch date strings
function parseDutchDate(dateString) {
    const parts = dateString.split(' ');
    const day = parseInt(parts[0]);
    const monthNames = {
        'januari': 0, 'februari': 1, 'maart': 2, 'april': 3, 'mei': 4, 'juni': 5,
        'juli': 6, 'augustus': 7, 'september': 8, 'oktober': 9, 'november': 10, 'december': 11
    };
    const month = monthNames[parts[1].toLowerCase()];
    const year = parseInt(parts[2]);
    return new Date(year, month, day);
}

// Get all blog posts from the DOM
let allBlogPosts = Array.from(blogGrid.querySelectorAll('.blog-card')).map(article => {
    return {
        element: article,
        category: article.dataset.category,
        date: article.querySelector('time').getAttribute('datetime')
    };
});

// Sort blog posts from newest to oldest based on their date attribute
allBlogPosts.sort((a, b) => parseDutchDate(b.date) - parseDutchDate(a.date));


// Get unique categories and count posts per category from the DOM
function getCategoriesWithCounts() {
    const categories = {};
    allBlogPosts.forEach(post => {
        if (!categories[post.category]) {
            categories[post.category] = 0;
        }
        categories[post.category]++;
    });
    return Object.entries(categories).map(([name, count]) => ({ name, count }));
}

// Create filter buttons
function createFilterButtons() {
    filterBarContainer.innerHTML = ''; // Clear existing buttons

    const categories = getCategoriesWithCounts();

    // Add "All" button
    const allButton = document.createElement('button');
    allButton.className = 'filter-button active';
    allButton.dataset.category = 'all';
    allButton.innerHTML = `
        Alle artikelen
        <span class="count">${allBlogPosts.length}</span>
    `;
    allButton.addEventListener('click', () => filterPosts('all'));
    filterBarContainer.appendChild(allButton);

    // Add category buttons
    categories.forEach(category => {
        const button = document.createElement('button');
        button.className = 'filter-button';
        button.dataset.category = category.name;
        button.innerHTML = `
            ${category.name}
            <span class="count">${category.count}</span>
        `;
        button.addEventListener('click', () => filterPosts(category.name));
        filterBarContainer.appendChild(button);
    });
}

// Filter posts by category
let currentCategory = 'all';
let filteredPosts = [...allBlogPosts];

function filterPosts(category) {
    // Update active button
    document.querySelectorAll('.filter-button').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        }
    });

    // Filter posts
    currentCategory = category;
    if (category === 'all') {
        filteredPosts = [...allBlogPosts];
    } else {
        filteredPosts = allBlogPosts.filter(post => post.category === category);
    }

    // Recalculate pagination and show first page
    createPagination();
    showPage(1);

    // Smooth scroll to top of blog section
    document.querySelector('.blog-section').scrollIntoView({ behavior: 'smooth' });
}

// Calculate total pages based on filtered posts
function getTotalPages() {
    return Math.ceil(filteredPosts.length / postsPerPage);
}

// Create pagination buttons
function createPagination() {
    paginationContainer.innerHTML = '';
    const totalPages = getTotalPages();

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.className = `pagination-button ${i === 1 ? 'active' : ''}`;
        button.textContent = i;
        button.dataset.page = i;
        button.addEventListener('click', () => {
            if (!button.classList.contains('active')) {
                showPage(i);
                // Smooth scroll to top
                window.scrollTo({
                    top: document.querySelector('.blog-section').offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
        paginationContainer.appendChild(button);
    }

    // Hide pagination if only one page
    if (totalPages <= 1) {
        paginationContainer.style.display = 'none';
    } else {
        paginationContainer.style.display = 'flex';
    }
}

// Show blog posts for specific page with animation
function showPage(pageNumber) {
    const start = (pageNumber - 1) * postsPerPage;
    const end = start + postsPerPage;

    // Hide all posts first
    allBlogPosts.forEach(post => {
        post.element.style.display = 'none';
        post.element.classList.remove('fade-in'); // Remove animation class for re-use
    });

    // Update active pagination button
    document.querySelectorAll('.pagination-button').forEach(btn => {
        btn.classList.remove('active');
        if (parseInt(btn.dataset.page) === pageNumber) {
            btn.classList.add('active');
        }
    });

    // Show only filtered posts for the current page with animation
    const postsToShow = filteredPosts.slice(start, end);
    if (postsToShow.length === 0) {
        // If no posts found for the current filter/page, display a message
        const noPostsMessage = document.createElement('div');
        noPostsMessage.className = 'no-posts-message';
        noPostsMessage.innerHTML = `
            <h3>Geen artikelen gevonden</h3>
            <p>Er zijn geen artikelen in deze categorie. Probeer een andere categorie.</p>
        `;
        blogGrid.appendChild(noPostsMessage);
    } else {
        // Remove any existing "no posts" message
        const existingNoPostsMessage = blogGrid.querySelector('.no-posts-message');
        if (existingNoPostsMessage) {
            existingNoPostsMessage.remove();
        }

        postsToShow.forEach((post, index) => {
            post.element.style.display = 'block'; // Make it visible
            // Trigger reflow to restart animation
            void post.element.offsetWidth;
            post.element.classList.add('fade-in'); // Add animation class
            post.element.style.animationDelay = `${index * 0.1}s`; // Stagger animation
        });
    }
}

// Initialize filter buttons, pagination and show first page
createFilterButtons();
createPagination();
showPage(1);