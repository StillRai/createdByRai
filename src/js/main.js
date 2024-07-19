import '../css/styles.css';
import feather from 'feather-icons';

document.addEventListener('DOMContentLoaded', () => {
    // Function to initialize event listeners
    function initializeBurgerMenu() {
        const burgerMenu = document.getElementById('burger-menu');
        const navLinksMobile = document.getElementById('nav-links-mobile');
        const closeMenu = document.getElementById('close-menu');

        if (burgerMenu && navLinksMobile && closeMenu) {
            console.log('Burger menu and nav links mobile elements found');
            burgerMenu.addEventListener('click', () => {
                console.log('Burger menu clicked');
                navLinksMobile.classList.toggle('hidden');
                navLinksMobile.classList.toggle('flex');
                navLinksMobile.classList.toggle('active');
            });

            closeMenu.addEventListener('click', () => {
                navLinksMobile.classList.add('hidden');
                navLinksMobile.classList.remove('flex');
                navLinksMobile.classList.remove('active');
            });

            window.addEventListener('click', (e) => {
                if (!navLinksMobile.contains(e.target) && !burgerMenu.contains(e.target)) {
                    navLinksMobile.classList.add('hidden');
                    navLinksMobile.classList.remove('flex');
                    navLinksMobile.classList.remove('active');
                }
            });
        } else {
            console.error('Burger menu or nav links mobile elements not found');
        }
    }

    // Function to generate stars
    function generateStars() {
        const homeSection = document.querySelector('#home');
        const numberOfStars = 10; 

        for (let i = 0; i < numberOfStars; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            
            const topPosition = Math.random() * 100;
            const leftPosition = Math.random() * 100;
            star.style.top = `${topPosition}%`;
            star.style.left = `${leftPosition}%`;

            const animationClass = `star-${Math.ceil(Math.random() * 6)}`;
            star.classList.add(animationClass);
            star.style.opacity = (Math.random() * 0.7 + 0.3).toFixed(2); 

            homeSection.appendChild(star);
        }
    }

    // Function to initialize everything
    function initialize() {
        fetch('components/navbar.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('navbar-container').innerHTML = data;

                feather.replace();

                initializeBurgerMenu();
            });

        fetch('sections/home.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('sections-container').innerHTML += data;
                
                feather.replace();

                generateStars();
            });

        fetch('sections/skills.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('sections-container').innerHTML += data;
            });

        fetch('sections/timeline.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('sections-container').innerHTML += data;
            });

        fetch('sections/work.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('sections-container').innerHTML += data;
            });
    }

    // Initialize everything after DOM content is loaded
    initialize();

    feather.replace();
});
