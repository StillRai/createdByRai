import '../css/styles.css';
import feather from 'feather-icons';

document.addEventListener('DOMContentLoaded', () => {
    // Call the function to initialize the burger menu
    initializeBurgerMenu();

    // Initialize Feather Icons
    feather.replace();
});

function initializeBurgerMenu() {
    const burgerMenu = document.getElementById('burger-menu');
    const navLinksMobile = document.getElementById('nav-links-mobile');

    if (burgerMenu && navLinksMobile) {
        console.log('Burger menu and nav links mobile elements found');
        burgerMenu.addEventListener('click', () => {
            console.log('Burger menu clicked');
            navLinksMobile.classList.toggle('hidden');
            navLinksMobile.classList.toggle('active');
        });
    } else {
        console.error('Burger menu or nav links mobile elements not found');
    }
}
