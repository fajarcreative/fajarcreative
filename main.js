// FajarCreative Multi-Website Global Interactivity Script

document.addEventListener('DOMContentLoaded', function() {
    // 1. Mobile Menu Drawer Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuDrawer = document.getElementById('mobile-menu-drawer');
    const mobileMenuCloseBtn = document.getElementById('mobile-menu-close');
    const mobileOverlay = document.getElementById('mobile-menu-overlay');

    if (mobileMenuBtn && mobileMenuDrawer) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenuDrawer.classList.remove('translate-x-full');
            if (mobileOverlay) mobileOverlay.classList.remove('hidden');
        });
    }

    if (mobileMenuCloseBtn && mobileMenuDrawer) {
        mobileMenuCloseBtn.addEventListener('click', function() {
            mobileMenuDrawer.classList.add('translate-x-full');
            if (mobileOverlay) mobileOverlay.classList.add('hidden');
        });
    }

    if (mobileOverlay && mobileMenuDrawer) {
        mobileOverlay.addEventListener('click', function() {
            mobileMenuDrawer.classList.add('translate-x-full');
            mobileOverlay.classList.add('hidden');
        });
    }

    // 2. FAQ Accordion Handler (for paket-harga.html and index.html)
    const faqButtons = document.querySelectorAll('.faq-toggle');
    faqButtons.forEach(button => {
        button.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('.faq-icon');
            
            if (answer) {
                const isHidden = answer.classList.contains('hidden');
                
                // Close other faqs
                document.querySelectorAll('.faq-answer').forEach(el => el.classList.add('hidden'));
                document.querySelectorAll('.faq-icon').forEach(ic => ic.style.transform = 'rotate(0deg)');
                
                if (isHidden) {
                    answer.classList.remove('hidden');
                    if (icon) icon.style.transform = 'rotate(180deg)';
                }
            }
        });
    });

    // 3. Calculator Handler (for paket-harga.html)
    const calcCatBtns = document.querySelectorAll('.calc-cat-btn');
    const calcAddonChks = document.querySelectorAll('.calc-addon-chk');
    const calcSelectedCatName = document.getElementById('calc-selected-cat-name');
    const calcCatPriceLabel = document.getElementById('calc-cat-price-label');
    const calcTotalDisplay = document.getElementById('calc-total-display');
    const calcSendWaBtn = document.getElementById('calc-send-wa');
    const calcSummaryList = document.getElementById('calc-summary-list');

    let selectedCategoryPrice = 99000;
    let selectedCategoryName = "Undangan Digital";

    function updateCalculator() {
        if (!calcTotalDisplay) return;
        
        let total = selectedCategoryPrice;
        let addonsSelectedText = [];

        calcAddonChks.forEach(chk => {
            if (chk.checked) {
                const cost = parseInt(chk.getAttribute('data-cost') || '0', 10);
                total += cost;
                const label = chk.closest('label').querySelector('span.text-on-surface').innerText;
                if (cost > 0) {
                    addonsSelectedText.push(`${label} (+Rp ${cost.toLocaleString('id-ID')})`);
                }
            }
        });

        if (calcTotalDisplay) {
            calcTotalDisplay.innerText = `Rp ${total.toLocaleString('id-ID')}`;
        }

        if (calcSendWaBtn) {
            let msg = `Halo Mas Fajar, saya sudah menghitung estimasi website di FajarCreative:\n- Kategori: ${selectedCategoryName} (Rp ${selectedCategoryPrice.toLocaleString('id-ID')})`;
            if (addonsSelectedText.length > 0) {
                msg += `\n- Add-on: ${addonsSelectedText.join(', ')}`;
            }
            msg += `\n\nTotal Estimasi: Rp ${total.toLocaleString('id-ID')}. Mohon info langkah selanjutnya.`;
            
            calcSendWaBtn.href = `https://wa.me/6282338903403?text=${encodeURIComponent(msg)}`;
        }
    }

    calcCatBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            calcCatBtns.forEach(b => {
                b.classList.remove('active', 'bg-surface-container-high', 'text-primary');
                b.classList.add('bg-surface-container', 'text-on-surface');
            });
            this.classList.add('active', 'bg-surface-container-high', 'text-primary');
            this.classList.remove('bg-surface-container', 'text-on-surface');

            selectedCategoryPrice = parseInt(this.getAttribute('data-price') || '99000', 10);
            selectedCategoryName = this.innerText.split('\n')[0].trim();

            if (calcSelectedCatName) calcSelectedCatName.innerText = selectedCategoryName;
            if (calcCatPriceLabel) calcCatPriceLabel.innerText = `Rp ${selectedCategoryPrice.toLocaleString('id-ID')}`;

            updateCalculator();
        });
    });

    calcAddonChks.forEach(chk => {
        chk.addEventListener('change', updateCalculator);
    });

    // Run initial calc update if calc elements exist
    if (calcTotalDisplay) updateCalculator();

    // 4. Category Filter for Articles & Catalog
    const categoryPills = document.querySelectorAll('.category-btn');
    categoryPills.forEach(btn => {
        btn.addEventListener('click', function() {
            const cat = this.getAttribute('data-cat');
            categoryPills.forEach(b => {
                b.classList.remove('active', 'bg-primary', 'text-on-primary');
                b.classList.add('bg-surface-container-high', 'text-on-surface-variant');
            });
            this.classList.add('active', 'bg-primary', 'text-on-primary');
            this.classList.remove('bg-surface-container-high', 'text-on-surface-variant');

            // Filter items (articles or catalog cards)
            const cards = document.querySelectorAll('.article-card, .catalog-card');
            cards.forEach(card => {
                const cardCat = card.getAttribute('data-category');
                if (cat === 'all' || cardCat === cat) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // 5. Live Search Filter
    const searchInput = document.getElementById('article-search') || document.getElementById('catalog-search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const term = this.value.toLowerCase().trim();
            const cards = document.querySelectorAll('.article-card, .catalog-card');
            cards.forEach(card => {
                const text = card.innerText.toLowerCase();
                if (text.includes(term)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    }

    // 6. Generic Modal Handler
    const modalCloseBtns = document.querySelectorAll('.modal-close');
    modalCloseBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal-container');
            if (modal) modal.classList.add('hidden');
        });
    });
});
