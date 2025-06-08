document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed.');

    const blogGrid = document.querySelector('.blog-grid');
    const paginationContainer = document.querySelector('.pagination');
    const filterBarContainer = document.querySelector('.filter-bar');
    const postsPerPage = 9;

    if (!blogGrid || !paginationContainer || !filterBarContainer) {
        console.error('One or more required elements (blog-grid, pagination, filter-bar) not found.');
        return;
    }

    // Get all blog posts from the DOM
    let allBlogPosts = Array.from(blogGrid.querySelectorAll('.blog-card')).map(article => {
        const categoryElement = article.querySelector('.category');
        const timeElement = article.querySelector('time');
        
        return {
            element: article,
            category: categoryElement ? categoryElement.textContent.trim() : 'Onbekend',
            date: timeElement ? timeElement.getAttribute('datetime') : '2000-01-01' // Default date if not found
        };
    });

    console.log('Initial blog posts found:', allBlogPosts.length);

    // Sort blog posts from newest to oldest based on their date attribute
    // Using new Date() directly on the 'datetime' attribute which is in 'YYYY-MM-DD' format
    allBlogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
    console.log('Blog posts sorted by date.');

    // Get unique categories and count posts per category from the DOM
    function getCategoriesWithCounts() {
        const categories = {};
        allBlogPosts.forEach(post => {
            if (!categories[post.category]) {
                categories[post.category] = 0;
            }
            categories[post.category]++;
        });
        console.log('Categories with counts:', categories);
        return Object.entries(categories).map(([name, count]) => ({ name, count }));
    }

    // Create filter buttons
    function createFilterButtons() {
        filterBarContainer.innerHTML = ''; // Clear existing buttons
        console.log('Filter buttons cleared.');

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
        console.log('Added "Alle artikelen" button.');

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
            console.log(`Added category button for: ${category.name}`);
        });
    }

    // Filter posts by category
    let currentCategory = 'all';
    let filteredPosts = [...allBlogPosts];

    function filterPosts(category) {
        console.log(`Filtering posts by category: ${category}`);
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
        console.log('Filtered posts count:', filteredPosts.length);

        // Recalculate pagination and show first page
        createPagination();
        showPage(1);

        // Smooth scroll to top of blog section
        const blogSection = document.querySelector('.blog-section');
        if (blogSection) {
            blogSection.scrollIntoView({ behavior: 'smooth' });
            console.log('Scrolled to blog section.');
        }
    }

    // Calculate total pages based on filtered posts
    function getTotalPages() {
        const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
        console.log('Total pages:', totalPages);
        return totalPages;
    }

    // Create pagination buttons
    function createPagination() {
        paginationContainer.innerHTML = '';
        console.log('Pagination buttons cleared.');
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
                    console.log(`Clicked pagination button for page: ${i}`);
                }
            });
            paginationContainer.appendChild(button);
        }

        // Hide pagination if only one page
        if (totalPages <= 1) {
            paginationContainer.style.display = 'none';
            console.log('Pagination hidden (1 or less pages).');
        } else {
            paginationContainer.style.display = 'flex';
            console.log('Pagination displayed.');
        }
    }

    // Show blog posts for specific page with animation
    function showPage(pageNumber) {
        console.log(`Showing page: ${pageNumber}`);
        const start = (pageNumber - 1) * postsPerPage;
        const end = start + postsPerPage;

        // Hide all posts first
        allBlogPosts.forEach(post => {
            post.element.style.display = 'none';
            post.element.classList.remove('fade-in'); // Remove animation class for re-use
        });
        console.log('All posts hidden.');

        // Update active pagination button
        document.querySelectorAll('.pagination-button').forEach(btn => {
            btn.classList.remove('active');
            if (parseInt(btn.dataset.page) === pageNumber) {
                btn.classList.add('active');
            }
        });

        // Show only filtered posts for the current page with animation
        const postsToShow = filteredPosts.slice(start, end);
        console.log('Posts to show on current page:', postsToShow.length);

        // Remove any existing "no posts" message
        const existingNoPostsMessage = blogGrid.querySelector('.no-posts-message');
        if (existingNoPostsMessage) {
            existingNoPostsMessage.remove();
            console.log('Removed existing "no posts" message.');
        }

        if (postsToShow.length === 0) {
            // If no posts found for the current filter/page, display a message
            const noPostsMessage = document.createElement('div');
            noPostsMessage.className = 'no-posts-message';
            noPostsMessage.innerHTML = `
                <h3>Geen artikelen gevonden</h3>
                <p>Er zijn geen artikelen in deze categorie. Probeer een andere categorie.</p>
            `;
            blogGrid.appendChild(noPostsMessage);
            console.log('Displayed "no posts" message.');
        } else {
            postsToShow.forEach((post, index) => {
                post.element.style.display = 'block'; // Make it visible
                // Trigger reflow to restart animation
                void post.element.offsetWidth;
                post.element.classList.add('fade-in'); // Add animation class
                post.element.style.animationDelay = `${index * 0.1}s`; // Stagger animation
            });
            console.log('Displayed current page posts with fade-in animation.');
        }
    }

    // Initialize filter buttons, pagination and show first page
    createFilterButtons();
    createPagination();
    showPage(1);
    console.log('Blog functionality initialized.');
});
