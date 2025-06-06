import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: '/public/index.html',
        contact: '/public/contact.html',
        projecten: '/public/projecten-tarieven.html',
        '404': '/public/404.html',
        blog: '/public/blog/index.html',
        'blog-betaalbaar-webdesign-venlo-gratis-demo': '/public/blog/betaalbaar-webdesign-venlo-gratis-demo.html',
        'blog-bloggen-marketing-ondernemers': '/public/blog/bloggen-marketing-ondernemers.html',
        'blog-call-to-action-website': '/public/blog/call-to-action-website.html',
        'blog-copywriting-websites-converteren': '/public/blog/copywriting-websites-converteren.html',
        'blog-goede-homepage-kenmerken': '/public/blog/goede-homepage-kenmerken.html',
        'blog-hoe-khcustomweb-webdesign-verandert': '/public/blog/hoe-khcustomweb-webdesign-verandert.html',
        'blog-hosting-onderhoudsdienst-khcustomweb': '/public/blog/hosting-onderhoudsdienst-khcustomweb.html',
        'blog-lokale-seo-venlo-klanten': '/public/blog/lokale-seo-venlo-klanten.html',
        'blog-persoonlijke-aanpak-webdesign': '/public/blog/persoonlijke-aanpak-webdesign.html',
        'blog-professionele-website-venlo': '/public/blog/professionele-website-venlo.html',
        'blog-seo-fouten-venlo-klanten-missen': '/public/blog/seo-fouten-venlo-klanten-missen.html',
        'blog-seo-tips-2025': '/public/blog/seo-tips-2025.html',
        'blog-snelle-website-meer-opbrengst-dan-reclame': '/public/blog/snelle-website-meer-opbrengst-dan-reclame.html',
        'blog-waarom-geen-templates-gebruiken': '/public/blog/waarom-geen-templates-gebruiken.html',
        'blog-waarom-website-laten-maken-khcustomweb-venlo': '/public/blog/waarom-website-laten-maken-khcustomweb-venlo.html',
        'blog-wat-kost-een-website-echt': '/public/blog/wat-kost-een-website-echt.html',
        'blog-webdesign-fouten-ondernemers': '/public/blog/webdesign-fouten-ondernemers.html',
        'blog-website-bouwen-2025': '/public/blog/website-bouwen-2025.html',
        'blog-website-past-bij-jouw-branche': '/public/blog/website-past-bij-jouw-branche.html',
        'blog-website-snelheid-2-seconden': '/public/blog/website-snelheid-2-seconden.html',
        'blog-website-venlo-google-scoren-oplossen': '/public/blog/website-venlo-google-scoren-oplossen.html',
        'blog-voor-wie-khcustomweb': '/public/blog/voor-wie-khcustomweb.html'
      }
    }
  },
  publicDir: 'public',
  base: '/'
});
