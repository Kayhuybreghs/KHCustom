document.addEventListener('DOMContentLoaded', function() {
    // Price calculator functionality
    const basePrice = 200;
    let copywritingPages = 0;
    const checkboxes = document.querySelectorAll('.checkbox-container input[type="checkbox"]');
    const oneTimeTotalElement = document.getElementById('oneTimeTotal');
    const monthlyTotalElement = document.getElementById('monthlyTotal');
    const yearTotalElement = document.getElementById('yearTotal');
    const basePriceElement = document.querySelector('.package-price .price');
    const copywritingCheckbox = document.querySelector('input[data-price="15"][data-type="copywriting"]');
    const copywritingContainer = document.getElementById('copywritingContainer');
    const pageCountInput = document.getElementById('pageCount');

    function formatPrice(price) {
        return `€${price}`;
    }

    function updateCopywritingPrice() {
        if (copywritingCheckbox && copywritingCheckbox.checked && pageCountInput) {
            const pages = parseInt(pageCountInput.value) || 0;
            copywritingCheckbox.dataset.price = (15 * pages).toString();
            document.getElementById('copywritingPrice').textContent = `€${15 * pages}`;
        }
    }

    function animateValue(element, start, end, duration) {
        const range = end - start;
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const value = Math.floor(start + (range * progress));
            element.textContent = formatPrice(value);
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        requestAnimationFrame(update);
    }

    function updateTotals() {
        let oneTimeTotal = basePrice;
        let monthlyTotal = 0;

        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                if (checkbox.dataset.monthly) {
                    monthlyTotal += parseFloat(checkbox.dataset.monthly);
                }
                if (checkbox.dataset.price) {
                    oneTimeTotal += parseFloat(checkbox.dataset.price);
                }
            }
        });

        const yearTotal = oneTimeTotal + (monthlyTotal * 12);

        const currentOneTime = parseInt(oneTimeTotalElement.textContent.replace('€', ''));
        const currentMonthly = parseInt(monthlyTotalElement.textContent.replace('€', ''));
        const currentYear = parseInt(yearTotalElement.textContent.replace('€', ''));
        const currentBasePrice = parseInt(basePriceElement.textContent.replace('€', ''));

        animateValue(oneTimeTotalElement, currentOneTime, oneTimeTotal, 500);
        animateValue(monthlyTotalElement, currentMonthly, monthlyTotal, 500);
        animateValue(yearTotalElement, currentYear, yearTotal, 500);
        animateValue(basePriceElement, currentBasePrice, oneTimeTotal, 500);

        [oneTimeTotalElement, monthlyTotalElement, yearTotalElement, basePriceElement].forEach(el => {
            el.classList.remove('price-updated');
            void el.offsetWidth;
            el.classList.add('price-updated');
        });
    }

    // Handle copywriting checkbox
    if (copywritingCheckbox) {
        copywritingCheckbox.addEventListener('change', function() {
            if (this.checked) {
                copywritingContainer.style.display = 'block';
                updateCopywritingPrice();
            } else {
                copywritingContainer.style.display = 'none';
                this.dataset.price = '15';
            }
            updateTotals();
        });
    }

    // Handle page count changes
    if (pageCountInput) {
        pageCountInput.addEventListener('input', function() {
            updateCopywritingPrice();
            updateTotals();
        });
    }

    document.querySelectorAll('.addon-item, .service-item').forEach(item => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        
        item.addEventListener('click', function(e) {
            if (e.target !== checkbox) {
                e.preventDefault();
                checkbox.checked = !checkbox.checked;
                updateTotals();
            }
        });

        checkbox.addEventListener('change', function() {
            updateTotals();
        });

        checkbox.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });

    updateTotals();

    // Tips slider functionality
    const tips = document.querySelectorAll('.tip');
    const dots = document.querySelectorAll('.dot');
    const prevButton = document.querySelector('.slider-arrow.prev');
    const nextButton = document.querySelector('.slider-arrow.next');
    let currentTip = 0;

    function showTip(index) {
        tips.forEach(tip => tip.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        tips[index].classList.remove('active');
        void tips[index].offsetWidth;
        tips[index].classList.add('active');
        dots[index].classList.add('active');
    }

    function nextTip() {
        currentTip = (currentTip + 1) % tips.length;
        showTip(currentTip);
    }

    function prevTip() {
        currentTip = (currentTip - 1 + tips.length) % tips.length;
        showTip(currentTip);
    }

    if (prevButton) prevButton.addEventListener('click', prevTip);
    if (nextButton) nextButton.addEventListener('click', nextTip);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentTip = index;
            showTip(currentTip);
        });
    });
});