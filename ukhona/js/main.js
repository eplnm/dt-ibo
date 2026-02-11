// Theme toggle
function initThemeToggle() {
    const toggle = document.getElementById('toggle-theme');
    const html = document.documentElement;
    
    // Get saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    toggle.textContent = savedTheme === 'dark' ? '🌙' : '☀️';
    
    toggle.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        const newTheme = current === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        toggle.textContent = newTheme === 'dark' ? '🌙' : '☀️';
    });
}

// App grid menu toggle
function initMenuToggle() {
    const menuIcon = document.getElementById('menuIcon');
    const gridMenu = document.getElementById('gridMenu');
    
    if (!menuIcon || !gridMenu) return;
    
    menuIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Toggle the 'active' class which controls visibility in CSS
        gridMenu.classList.toggle('active');
        
        // Update aria attributes for accessibility
        const isActive = gridMenu.classList.contains('active');
        gridMenu.setAttribute('aria-hidden', !isActive);
        menuIcon.setAttribute('aria-expanded', isActive);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!gridMenu.contains(e.target) && !menuIcon.contains(e.target)) {
            gridMenu.classList.remove('active');
            gridMenu.setAttribute('aria-hidden', 'true');
            menuIcon.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && gridMenu.classList.contains('active')) {
            gridMenu.classList.remove('active');
            gridMenu.setAttribute('aria-hidden', 'true');
            menuIcon.setAttribute('aria-expanded', 'false');
        }
    });
}

// Scroll progress indicator
function initScrollProgress() {
    const progress = document.querySelector('.scroll-progress');
    if (!progress) return;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progress.style.width = scrollPercent + '%';
    });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initMenuToggle();
    initScrollProgress();
    loadFooter(); // ← ADDED THIS LINE
});