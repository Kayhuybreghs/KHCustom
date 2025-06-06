(function () {
  const bannerHTML = `
    <style>
      #cookie-banner {
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
      }
      #cookie-banner.show {
        opacity: 1;
      }
    </style>
    <div id="cookie-banner" style="display: none; position: fixed; bottom: 0; left: 0; width: 100%; background-color: #fff3e0; color: #000; padding: 1rem; box-shadow: 0 -2px 8px rgba(0,0,0,0.1); font-family: sans-serif; z-index: 9999; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;">
      <div style="max-width: 70%; font-size: 1rem;">
        We gebruiken <strong>analytische cookies</strong> om het gedrag op onze website te begrijpen en zo jouw ervaring te verbeteren. Door op <strong>"Accepteren"</strong> te klikken geef je toestemming voor het gebruik van <strong>Google Analytics</strong>. Wil je dit liever niet? Klik dan op <strong>"Weigeren"</strong>. <a href="/privacy.html" style="text-decoration: underline; color: #ff6a00;">Lees meer</a>.
      </div>
      <div style="display: flex; gap: 10px; margin-top: 0.5rem;">
        <button id="accept-cookies" style="background-color: #ff6a00; color: white; border: none; padding: 0.5rem 1rem; cursor: pointer; border-radius: 6px;">Accepteren</button>
        <button id="decline-cookies" style="background-color: #eee; border: none; padding: 0.5rem 1rem; cursor: pointer; border-radius: 6px;">Weigeren</button>
      </div>
    </div>
  `;

  document.addEventListener('DOMContentLoaded', () => {
    const consent = localStorage.getItem('cookieConsent');

    if (!consent) {
      document.body.insertAdjacentHTML('beforeend', bannerHTML);
      const banner = document.getElementById('cookie-banner');

      // Wacht 2 seconden en toon dan de banner met fade-in
      setTimeout(() => {
        banner.style.display = 'flex';
        // trigger CSS transition
        requestAnimationFrame(() => {
          banner.classList.add('show');
        });
      }, 1500);

      document.getElementById('accept-cookies').addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        loadAnalytics();
        // fade out animatie voor verwijderen
        banner.classList.remove('show');
        setTimeout(() => banner.remove(), 500);
      });

      document.getElementById('decline-cookies').addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'declined');
        banner.classList.remove('show');
        setTimeout(() => banner.remove(), 500);
      });
    } else if (consent === 'accepted') {
      loadAnalytics();
    }
  });

  window.resetCookieConsent = function () {
    localStorage.removeItem('cookieConsent');
    location.reload();
  };

  function loadAnalytics() {
    const script = document.createElement('script');
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-ELZDN804Q3";
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', 'G-ELZDN804Q3', {
      anonymize_ip: true,
      allow_ad_personalization_signals: false
    });
  }
})();
