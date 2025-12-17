// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Mobile hamburger menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Newsletter form handling
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        
        if (email) {
            alert(`Thank you for subscribing! Check ${email} for confirmation.`);
            this.reset();
        } else {
            alert('Please enter a valid email address.');
        }
    });
}

// Read more article functionality
/*const readMoreLinks = document.querySelectorAll('.read-more');
readMoreLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        alert('This article is not yet available. More coming soon!');
    });
});*/

// Featured article button
// 
/*
const featuredBtn = document.querySelector('.featured-content .btn');
if (featuredBtn) {
    featuredBtn.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Article page would load here!');
    });
}

 Search functionality
const searchBtn = document.querySelector('.search-box button');
const searchInput = document.querySelector('.search-box input');

if (searchBtn) {
    searchBtn.addEventListener('click', function() {
        const query = searchInput.value.trim();
        if (query) {
            alert(`Searching for: "${query}"\n\nSearch results would appear here!`);
            searchInput.value = '';
        } else {
            alert('Please enter a search term.');
        }
    });

    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });
}*/

// Category cards click functionality
const categoryCards = document.querySelectorAll('.category-card');
categoryCards.forEach(card => {
    card.addEventListener('click', function() {
        const categoryName = this.querySelector('h3').textContent;
        alert(`Viewing articles in: ${categoryName}`);
    });
});

// Pagination functionality
const pageButtons = document.querySelectorAll('.page-btn');
pageButtons.forEach((btn, index) => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        pageButtons.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        if (!this.textContent.includes('Next')) {
            this.classList.add('active');
        }
        
        alert(`Loading page ${this.textContent}...`);
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all blog cards, category cards, and sections
document.querySelectorAll('.blog-card, .category-card, .featured-article').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
});

// Add active state to navigation links based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Mobile menu active state styling
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color);
    }
    
    @media (max-width: 768px) {
        .nav-menu.active {
            display: flex !important;
            flex-direction: column;
            position: absolute;
            top: 70px;
            left: 0;
            right: 0;
            background: white;
            padding: 1rem;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            gap: 0;
        }
        
        .nav-menu {
            display: none !important;
        }

        .nav-link {
            padding: 0.75rem 0;
            border-bottom: 1px solid #e2e8f0;
        }

        .nav-link:last-child {
            border-bottom: none;
        }
    }
`;
document.head.appendChild(style);

// Lazy load images (if you add actual images)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

console.log('SunnySource blog loaded successfully!');
