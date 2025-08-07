document.addEventListener('DOMContentLoaded', () => {
    const timeDisplay = document.getElementById('time-display');
    const dateDisplay = document.getElementById('date-display');
    const clockContainer = document.querySelector('header');
    const toggleClockCheckbox = document.getElementById('toggle-clock');
    const searchForm = document.getElementById('search-form');
    const searchEngineSelect = document.getElementById('search-engine-select');
    const pages = document.querySelectorAll('.page');

    function updateTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;

        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const dayOfWeek = ['日', '一', '二', '三', '四', '五', '六'][now.getDay()];
        dateDisplay.textContent = `${year}年${month}月${day}日 星期${dayOfWeek}`;
    }

    function showPage(targetId) {
        pages.forEach(page => {
            if (page.id === targetId) {
                page.classList.remove('hidden');
            } else {
                page.classList.add('hidden');
            }
        });
    }

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            showPage(targetId);
        });
    });

    function applySettings() {
        // Clock setting
        const showClock = localStorage.getItem('showClock') !== 'false';
        toggleClockCheckbox.checked = showClock;
        if (showClock) {
            clockContainer.classList.remove('hidden');
        } else {
            clockContainer.classList.add('hidden');
        }

        // Search engine setting
        const savedEngine = localStorage.getItem('searchEngine') || "https://www.bing.com/search";
        searchEngineSelect.value = savedEngine;
        searchForm.action = savedEngine;

        // Also, update the name of the search parameter for Baidu
        const searchInput = searchForm.querySelector('input');
        if (searchEngineSelect.value.includes('baidu')) {
            searchInput.name = 'wd';
        } else {
            searchInput.name = 'q';
        }
    }

    toggleClockCheckbox.addEventListener('change', () => {
        localStorage.setItem('showClock', toggleClockCheckbox.checked);
        applySettings();
    });

    searchEngineSelect.addEventListener('change', () => {
        const selectedEngine = searchEngineSelect.value;
        localStorage.setItem('searchEngine', selectedEngine);
        applySettings();
    });

    // Initial setup
    applySettings();
    updateTime();
    setInterval(updateTime, 1000);
    showPage('search-section'); // Show search section by default
});
