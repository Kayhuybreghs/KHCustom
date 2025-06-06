document.addEventListener('DOMContentLoaded', function() {
    const blogGrid = document.querySelector('.blog-grid');
    const paginationContainer = document.querySelector('.pagination');
    const filterBarContainer = document.querySelector('.filter-bar');
    const postsPerPage = 9;

    // All blog posts data
    const blogPosts = [
        {
            category: "Algemeen / Over KHCustomWeb",
            title: "Een Website in Venlo Laten Maken? Daarom Kiezen Klanten Voor KHCustomWeb",
            date: "29 mei 2025",
            description: "Ontdek waarom lokale ondernemers kiezen voor KHCustomWeb als hun webdesigner in Venlo. Van persoonlijk contact tot maatwerk zonder templates.",
            link: "waarom-website-laten-maken-khcustomweb-venlo.html"
        },
        {
            category: "Webdesign & Websites",
            title: "Betaalbaar Webdesign in Venlo? Ontvang eerst een Gratis Demo",
            date: "30 mei 2025",
            description: "Ontdek hoe je eerst een gratis demo krijgt voordat je besluit. Geen verplichtingen, geen verborgen kosten.",
            link: "betaalbaar-webdesign-venlo-gratis-demo.html"
        },
        {
            category: "Webdesign & Websites",
            title: "Professionele Website in Venlo Zonder Hoge Prijskaart",
            date: "30 mei 2025",
            description: "Leer hoe je een professionele website kunt krijgen zonder duizenden euro's uit te geven.",
            link: "professionele-website-venlo.html"
        },
        {
            category: "Webdesign & Websites",
            title: "Waarom mijn Websites Geen Templates Gebruiken",
            date: "30 mei 2025",
            description: "Ontdek waarom maatwerk beter is dan templates en wat dat voor jou betekent.",
            link: "waarom-geen-templates-gebruiken.html"
        },
        {
            category: "Prijzen & Werkwijze",
            title: "Wat Kost Een Website Echt?",
            date: "30 mei 2025",
            description: "Transparante uitleg over de kosten van een website, zonder verkooptrucs of verstopte kosten.",
            link: "wat-kost-een-website-echt.html"
        },
        {
            category: "Algemeen / Over KHCustomWeb",
            title: "Waarom Onze Persoonlijke Aanpak Jouw Website Beter Maakt",
            date: "30 mei 2025",
            description: "Lees waarom persoonlijk contact en maatwerk zorgen voor betere resultaten.",
            link: "persoonlijke-aanpak-webdesign.html"
        },
        {
            category: "Techniek & Performance",
            title: "Waarom jouw website binnen 2 seconden moet laden",
            date: "30 mei 2025",
            description: "De impact van laadsnelheid op je bezoekers en conversies.",
            link: "website-snelheid-2-seconden.html"
        },
        {
            category: "SEO & Marketing",
            title: "Waarom Een Snel Lade Website Je Meer Oplevert dan Reclame",
            date: "30 mei 2025",
            description: "Vergelijk de ROI van een snelle website met traditionele reclame.",
            link: "snelle-website-meer-opbrengst-dan-reclame.html"
        },
        {
            category: "SEO & Marketing",
            title: "Waarom je Website in Venlo niet Scoort in Google",
            date: "30 mei 2025",
            description: "Ontdek de meestvoorkomende redenen waarom je niet goed vindbaar bent.",
            link: "website-venlo-google-scoren-oplossen.html"
        },
        {
            category: "SEO & Marketing",
            title: "Deze 3 SEO-fouten kosten Venlose ondernemers dagelijks klanten",
            date: "30 mei 2025",
            description: "Leer welke SEO-fouten je moet vermijden om meer klanten te krijgen.",
            link: "seo-fouten-venlo-klanten-missen.html"
        },
        {
            category: "SEO & Marketing",
            title: "3 Essentiële SEO-Tips voor 2025",
            date: "30 mei 2025",
            description: "Praktische SEO-tips die je nu al moet toepassen voor 2025.",
            link: "seo-tips-2025.html"
        },
        {
            category: "SEO & Marketing",
            title: "Wat is Lokale SEO?",
            date: "30 mei 2025",
            description: "Alles over lokale vindbaarheid voor jouw Venlose bedrijf.",
            link: "lokale-seo-venlo-klanten.html"
        },
        {
            category: "Webdesign & Websites",
            title: "Wat Maakt Een Goede Homepage?",
            date: "30 mei 2025",
            description: "Ontdek de essentiële elementen van een effectieve homepage.",
            link: "goede-homepage-kenmerken.html"
        },
        {
            category: "SEO & Marketing",
            title: "Copywriting: De Onzichtbare Kracht Achter Websites Die Converteren",
            date: "30 mei 2025",
            description: "Leer hoe goede teksten je website effectiever maken.",
            link: "copywriting-websites-converteren.html"
        },
        {
            category: "Techniek & Performance",
            title: "Wat is een Call-To-Action?",
            date: "30 mei 2025",
            description: "Waarom je website minstens 3 CTA's nodig heeft.",
            link: "call-to-action-website.html"
        },
        {
            category: "Webdesign & Websites",
            title: "De 3 Meest Gemaakte Webdesign-Fouten Door Ondernemers",
            date: "30 mei 2025",
            description: "Voorkom deze veelvoorkomende fouten bij je website.",
            link: "webdesign-fouten-ondernemers.html"
        },
        {
            category: "SEO & Marketing",
            title: "Waarom Bloggen? De Slimste Marketing Voor Kleine Ondernemers",
            date: "30 mei 2025",
            description: "Ontdek waarom bloggen zo krachtig is voor kleine ondernemers.",
            link: "bloggen-marketing-ondernemers.html"
        },
        {
            category: "Webdesign & Websites",
            title: "Wat Werkt in 2025? De Slimste Manier om een Website te Bouwen",
            date: "30 mei 2025",
            description: "De nieuwste trends en beste praktijken voor websites in 2025.",
            link: "website-bouwen-2025.html"
        },
        {
            category: "Algemeen / Over KHCustomWeb",
            title: "Hoe KHCustomWeb Webdesign in Venlo Verandert",
            date: "30 mei 2025",
            description: "Maak kennis met onze unieke aanpak van webdesign.",
            link: "hoe-khcustomweb-webdesign-verandert.html"
        },
        {
            category: "Webdesign & Websites",
            title: "Welke Website Past Bij Jouw Branche?",
            date: "30 mei 2025",
            description: "Specifieke tips voor verschillende branches.",
            link: "website-past-bij-jouw-branche.html"
        },
        {
            category: "Webdesign & Websites",
            title: "Voor wie is mijn hosting & onderhoudsdienst ideaal?",
            date: "30 mei 2025",
            description: "Ontdek of onze hosting en onderhoudsdienst bij jou past.",
            link: "hosting-onderhoudsdienst-khcustomweb.html"
        },
          {
            category: "Techniek & Performance",
            title: "Waarom een Top Pagespeed en SEO Score Cruciaal Zijn — KHCustomWeb",
            date: "5 juni 2025",
            description: "Ontdek waarom een hoge pagespeed en SEO-score essentieel zijn voor jouw website. KHCustomWeb in Venlo legt uit hoe je met slimme optimalisaties sneller, toegankelijker en beter vindbaar wordt.",
            link: "pagespeed-seo-optimalisatie.html"
        }
    ];

    // Get unique categories and count posts per category
    function getCategoriesWithCounts() {
        const categories = {};
        
        // Count posts per category
        blogPosts.forEach(post => {
            if (!categories[post.category]) {
                categories[post.category] = 0;
            }
            categories[post.category]++;
        });
        
        // Convert to array of objects for easier handling
        return Object.entries(categories).map(([name, count]) => ({ name, count }));
    }

    // Create filter buttons
    function createFilterButtons() {
        // Clear existing buttons
        filterBarContainer.innerHTML = '';
        
        // Get categories with counts
        const categories = getCategoriesWithCounts();
        
        // Add "All" button
        const allButton = document.createElement('button');
        allButton.className = 'filter-button active';
        allButton.dataset.category = 'all';
        allButton.innerHTML = `
            Alle artikelen
            <span class="count">${blogPosts.length}</span>
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
    let filteredPosts = [...blogPosts];

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
            filteredPosts = [...blogPosts];
        } else {
            filteredPosts = blogPosts.filter(post => post.category === category);
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
        const pageItems = filteredPosts.slice(start, end);

        // Update active button
        document.querySelectorAll('.pagination-button').forEach(btn => {
            btn.classList.remove('active');
            if (parseInt(btn.dataset.page) === pageNumber) {
                btn.classList.add('active');
            }
        });

        // Fade out current posts
        blogGrid.style.opacity = '0';
        
        setTimeout(() => {
            // Clear and populate blog grid
            blogGrid.innerHTML = '';
            
            if (pageItems.length === 0) {
                // Show "no posts found" message
                const noPostsMessage = document.createElement('div');
                noPostsMessage.className = 'no-posts-message';
                noPostsMessage.innerHTML = `
                    <h3>Geen artikelen gevonden</h3>
                    <p>Er zijn geen artikelen in deze categorie. Probeer een andere categorie.</p>
                `;
                blogGrid.appendChild(noPostsMessage);
            } else {
                // Show posts
                pageItems.forEach((post, index) => {
                    const article = document.createElement('article');
                    article.className = 'blog-card';
                    article.dataset.category = post.category;
                    article.style.opacity = '0';
                    article.style.transform = 'translateY(20px)';
                    article.style.transition = `all 0.3s ease ${index * 0.1}s`;
                    article.innerHTML = `
                        <div class="blog-content">
                            <span class="category">${post.category}</span>
                            <h2>${post.title}</h2>
                            <time datetime="${post.date.replace(' ', '-')}">${post.date}</time>
                            <p>${post.description}</p>
                            <a href="${post.link}" class="read-more">
                                Lees meer
                                <span class="arrow">→</span>
                            </a>
                        </div>
                    `;
                    blogGrid.appendChild(article);
                    
                    // Trigger reflow
                    article.offsetHeight;
                    
                    // Fade in new posts
                    article.style.opacity = '1';
                    article.style.transform = 'translateY(0)';
                });
            }
            
            blogGrid.style.opacity = '1';
        }, 300);
    }

    // Initialize filter buttons, pagination and show first page
    createFilterButtons();
    createPagination();
    showPage(1);
});