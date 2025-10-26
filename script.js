// Background Animation
function createParticles() {
    const bgAnimation = document.getElementById('bgAnimation');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Random size
        const size = Math.random() * 100 + 50;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Random position
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;

        // Random animation delay
        particle.style.animationDelay = `${Math.random() * 15}s`;

        bgAnimation.appendChild(particle);
    }
}

// Page Navigation
document.addEventListener('DOMContentLoaded', function() {
    createParticles();

    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Remove active class from all links and pages
            navLinks.forEach(nav => nav.classList.remove('active'));
            pages.forEach(page => page.classList.remove('active'));

            // Add active class to clicked link and corresponding page
            this.classList.add('active');
            const pageId = this.getAttribute('data-page');
            document.getElementById(pageId).classList.add('active');

            // Smooth scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            // Update URL hash
            window.history.pushState(null, null, `#${pageId}`);
        });
    });

    // Handle URL hash on page load
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        navLinks.forEach(nav => nav.classList.remove('active'));
        pages.forEach(page => page.classList.remove('active'));

        document.querySelector(`.nav-link[data-page="${hash}"]`).classList.add('active');
        document.getElementById(hash).classList.add('active');
    }

    // Handle browser back/forward buttons
    window.addEventListener('popstate', function() {
        const hash = window.location.hash.substring(1);
        if (hash && document.getElementById(hash)) {
            navLinks.forEach(nav => nav.classList.remove('active'));
            pages.forEach(page => page.classList.remove('active'));

            document.querySelector(`.nav-link[data-page="${hash}"]`).classList.add('active');
            document.getElementById(hash).classList.add('active');
        }
    });

    // Smooth scroll untuk navigasi card
    document.querySelectorAll('.nav-card').forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetPage = document.getElementById(targetId);

            if (targetPage) {
                // Switch to the target page
                navLinks.forEach(nav => nav.classList.remove('active'));
                pages.forEach(page => page.classList.remove('active'));

                document.querySelector(`.nav-link[data-page="${targetId}"]`).classList.add('active');
                targetPage.classList.add('active');

                // Smooth scroll to top
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });

                // Update URL hash
                window.history.pushState(null, null, `#${targetId}`);
            }
        });
    });
});

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(10, 10, 26, 0.95)';
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.background = 'rgba(10, 10, 26, 0.8)';
        header.style.boxShadow = 'none';
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});