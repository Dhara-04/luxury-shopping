// DOM Elements

const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');
const header = document.querySelector('header');
const darkModeToggle = document.createElement('button');
darkModeToggle.className = 'dark-mode-toggle';
darkModeToggle.innerHTML = '🌙';
darkModeToggle.title = 'Toggle Dark Mode';
document.body.appendChild(darkModeToggle);

// Data for dynamic content

const collectionsData = [
    {
        title: "Spring Handbags",
        description: "The season's most coveted designs",
        image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
        title: "Timepiece Collection",
        description: "Masterpieces of precision engineering",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
        title: "Fine Jewelry",
        description: "Exquisite craftsmanship in every piece",
        image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    }
];

const designersData = [
    {
        name: "Gucci",
        description: "Italian luxury brand of fashion and leather goods",
        logo: "https://i.ibb.co/0jQ4ZJX/gucci-logo.png"
    },
    {
        name: "Chanel",
        description: "French luxury fashion house specializing in haute couture",
        logo: "https://i.ibb.co/7YtW0bP/chanel-logo.png"
    },
    {
        name: "Prada",
        description: "Milan-based luxury fashion house",
        logo: "https://i.ibb.co/4W2xKQN/prada-logo.png"
    },
    {
        name: "Hermès",
        description: "French high fashion luxury goods manufacturer",
        logo: "https://i.ibb.co/6n0hLML/hermes-logo.png"
    }
];

const journalData = [
    {
        title: "Summer 2023 Fashion Trends",
        date: "June 15, 2023",
        excerpt: "Discover the must-have styles and colors for this season's hottest looks.",
        image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
        title: "The Art of Watchmaking",
        date: "May 28, 2023",
        excerpt: "Explore the intricate craftsmanship behind the world's finest timepieces.",
        image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
        title: "Sustainable Luxury: The Future",
        date: "April 10, 2023",
        excerpt: "How leading brands are embracing sustainability without compromising on luxury.",
        image: "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    }
];

// Initialize the page

document.addEventListener('DOMContentLoaded', function() {
    renderCollections();
    renderDesigners();
    renderJournal();
    setupEventListeners();
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '☀️';
    }
});

// Render collections

// function renderCollections() {
//     const collectionsGrid = document.querySelector('.collections-grid');
//     collectionsGrid.innerHTML = collectionsData.map(collection => `
//         <div class="collection-card">
//             <img src="${collection.image}" alt="${collection.title}" class="collection-img">
//             <div class="collection-info">
//                 <h3 class="collection-title">${collection.title}</h3>
//                 <p class="collection-desc">${collection.description}</p>
//             </div>
//         </div>
//     `).join('');
// }

// Render designers

function renderDesigners() {
    const designersGrid = document.querySelector('.designers-grid');
    designersGrid.innerHTML = designersData.map(designer => `
        <div class="designer-card">
            <img src="${designer.logo}" alt="${designer.name}" class="designer-logo">
            <h3 class="designer-name">${designer.name}</h3>
            <p class="designer-desc">${designer.description}</p>
        </div>
    `).join('');
}

// Render journal

function renderJournal() {
    const journalGrid = document.querySelector('.journal-grid');
    journalGrid.innerHTML = journalData.map(article => `
        <div class="journal-card">
            <img src="${article.image}" alt="${article.title}" class="journal-img">
            <div class="journal-content">
                <p class="journal-date">${article.date}</p>
                <h3 class="journal-title">${article.title}</h3>
                <p class="journal-excerpt">${article.excerpt}</p>
                <a href="#" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
            </div>
        </div>
    `).join('');
}

// Setup event listeners

function setupEventListeners() {
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Close menu when clicking outside on mobile
    document.addEventListener('click', closeMobileMenuOnClickOutside);
    
    // Header scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        const scrollDiff = currentScroll - lastScroll;
        lastScroll = currentScroll;
        
        if (currentScroll <= 0) {
            header.style.transform = 'translateY(0)';
            header.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.12)';
            header.style.backdropFilter = 'blur(15px)';
        } else if (scrollDiff > 5) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
            header.style.boxShadow = 'none';
            header.style.backdropFilter = 'blur(5px)';
        } else if (scrollDiff < -5) {
            // Scrolling up
            header.style.transform = 'translateY(0)';
            header.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.12)';
            header.style.backdropFilter = 'blur(15px)';
        }
    });
    
    // Dark mode toggle
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        this.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
        
        // Save preference to localStorage
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', 'disabled');
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (mainNav.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = e.target.querySelector('input[type="email"]').value;
            
            // Here you would typically send the email to your server
            console.log('Subscribed with email:', email);
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'newsletter-success';
            successMessage.textContent = 'Thank you for subscribing to our newsletter!';
            successMessage.style.cssText = `
                background: var(--success);
                color: white;
                padding: 1rem;
                border-radius: 4px;
                margin-top: 1rem;
                text-align: center;
                animation: fadeIn 0.5s ease;
            `;
            
            this.parentNode.insertBefore(successMessage, this.nextSibling);
            this.reset();
            
            setTimeout(() => {
                successMessage.style.animation = 'fadeOut 0.5s ease';
                setTimeout(() => successMessage.remove(), 500);
            }, 3000);
        });
    }
}

// Mobile menu functions

function toggleMobileMenu() {
    mainNav.classList.toggle('active');
    document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
    
    const icon = this.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
    
    if (mainNav.classList.contains('active')) {
        this.style.transform = 'rotate(180deg)';
        header.style.backdropFilter = 'blur(25px)';
    } else {
        this.style.transform = 'rotate(0deg)';
        header.style.backdropFilter = 'blur(15px)';
    }
}

function closeMobileMenuOnClickOutside(e) {
    if (window.innerWidth <= 992 && 
        !e.target.closest('.header-container') && 
        mainNav.classList.contains('active')) {
        mainNav.classList.remove('active');
        mobileMenuBtn.querySelector('i').classList.remove('fa-times');
        mobileMenuBtn.querySelector('i').classList.add('fa-bars');
        mobileMenuBtn.style.transform = 'rotate(0deg)';
        document.body.style.overflow = '';
        header.style.backdropFilter = 'blur(15px)';
    }
}

// Countdown timer

function updateCountdown() {
    const now = new Date();
    const endDate = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000); // 3 days from now
    
    const diff = endDate - now;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Add animation for elements when they come into view

const animateOnScroll = function() {
    const elements = document.querySelectorAll('.collection-card, .designer-card, .journal-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial state for animation

document.querySelectorAll('.collection-card, .designer-card, .journal-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

window.addEventListener('scroll', animateOnScroll);
animateOnScroll(); // Run once on page load 

// Dark Mode Toggle

document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Check for saved user preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        updateDarkModeIcon(true);
    }

    // Toggle dark mode
    if(darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDarkMode = body.classList.contains('dark-mode');
            updateDarkModeIcon(isDarkMode);
            
            // Save user preference
            localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
        });
    }

    function updateDarkModeIcon(isDarkMode) {
        if(!darkModeToggle) return;
        
        const icon = darkModeToggle.querySelector('i');
        if (isDarkMode) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            darkModeToggle.querySelector('span').textContent = 'Light Mode';
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            darkModeToggle.querySelector('span').textContent = 'Dark Mode';
        }
    }
});

// about

// main.js - Updated Dark Mode Implementation

// Initialize dark mode toggle
function initDarkMode() {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.id = 'darkModeToggle';
    darkModeToggle.setAttribute('aria-label', 'Toggle dark mode');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    document.body.appendChild(darkModeToggle);

    const body = document.body;
    const icon = darkModeToggle.querySelector('i');

    // Check for saved preference or system preference
    const currentTheme = localStorage.getItem('darkMode') || 
                       (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'enabled' : 'disabled');

    if (currentTheme === 'enabled') {
        body.classList.add('dark-mode');
        icon.classList.replace('fa-moon', 'fa-sun');
        darkModeToggle.setAttribute('aria-label', 'Toggle light mode');
    }

    // Toggle functionality
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDarkMode = body.classList.contains('dark-mode');
        
        // Update icon and aria-label
        if (isDarkMode) {
            icon.classList.replace('fa-moon', 'fa-sun');
            darkModeToggle.setAttribute('aria-label', 'Toggle light mode');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
            darkModeToggle.setAttribute('aria-label', 'Toggle dark mode');
        }
        
        // Save preference
        localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
    });

    // Watch for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('darkMode')) {
            if (e.matches) {
                body.classList.add('dark-mode');
                icon.classList.replace('fa-moon', 'fa-sun');
                darkModeToggle.setAttribute('aria-label', 'Toggle light mode');
            } else {
                body.classList.remove('dark-mode');
                icon.classList.replace('fa-sun', 'fa-moon');
                darkModeToggle.setAttribute('aria-label', 'Toggle dark mode');
            }
        }
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initDarkMode();
    
    // Rest of your existing initialization code...
    renderCollections();
    renderDesigners();
    renderJournal();
    setupEventListeners();
    updateCountdown();
    setInterval(updateCountdown, 1000);
});
