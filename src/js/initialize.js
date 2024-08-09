import { initializeBurgerMenu } from './burgerMenu';
import feather from 'feather-icons';
import { generateStars } from './stars';
import { InteractiveFlowchart } from './flowchart.js';

let isInitialized = false;

export function initialize() {
    if (isInitialized) return; 
    isInitialized = true;

    console.log('Initializing components...');
    const currentPath = window.location.pathname;

    const basePath = currentPath.includes('projects/weatherapp') ? '../../' : 
                     currentPath.includes('pages/') ? '../' : '';

    // Load Navbar
    loadNavbar(basePath);

    // Handle different pages
    if (currentPath === '/' || currentPath === '/index.html') {
        loadHomePage(basePath);
    } else if (currentPath.includes('theJourney')) {
        loadJourneyPage(basePath);
    } else if (currentPath.includes('projects/weatherapp')) {
        loadWeatherApp(basePath);
    }

    // Load Footer
    loadFooter(basePath);
}

function loadNavbar(basePath) {
    fetch(basePath + 'components/navbar.html')
        .then(response => response.text())
        .then(data => {
            const navbarContainer = document.getElementById('navbar-container');
            if (navbarContainer) {
                navbarContainer.innerHTML = data;
                feather.replace();
                initializeBurgerMenu();
                console.log('Navbar loaded.');
            }
        })
        .catch(error => console.error('Error loading navbar:', error));
}

function loadHomePage(basePath) {
    const backgroundContainer = document.getElementById('background-container');
    if (backgroundContainer) {
        backgroundContainer.style.display = 'block';
    }
    const sectionsContainer = document.getElementById('sections-container');
    if (sectionsContainer) {
        sectionsContainer.innerHTML = ''; 
        const sections = ['home', 'skills'];
        
        sections.reduce((promise, section) => {
            return promise.then(() => {
                console.log(`Fetching ${section} section`);
                return fetch(`${basePath}sections/${section}.html`)
                    .then(response => response.text())
                    .then(data => {
                        console.log(`Loaded content for ${section} section:`, data);
                        sectionsContainer.innerHTML += data;
                        feather.replace();
                        console.log(`${section} section loaded.`);
                        if (section === 'skills') {
                            document.dispatchEvent(new Event('skillsLoaded'));
                        }
                    })
                    .catch(error => console.error(`Error loading ${section} section:`, error));
            });
        }, Promise.resolve());
    }
}

function loadJourneyPage(basePath) {
    console.log('The Journey page detected.');
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        fetch(`${basePath}pages/theJourney.html`)
            .then(response => response.text())
            .then(data => {
                mainContent.innerHTML = data;
                feather.replace();
                new InteractiveFlowchart();
            })
            .catch(error => console.error('Error loading The Journey page:', error));
    }
}

function loadWeatherApp(basePath) {
    const backgroundContainer = document.getElementById('background-container');
    if (backgroundContainer) {
        backgroundContainer.style.display = 'none';
    }
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        fetch(basePath + 'projects/weatherapp/index.html')
            .then(response => response.text())
            .then(data => {
                mainContent.innerHTML = data;
                console.log('Weather section loaded.');
                import('../projects/weatherapp/initializeWeatherApp.js').then(module => {
                    module.initializeWeatherApp();
                });
            })
            .catch(error => console.error('Error loading weather app section:', error));
    }
}

function loadFooter(basePath) {
    fetch(basePath + 'components/footer.html')
        .then(response => response.text())
        .then(data => {
            const footerContainer = document.getElementById('footer-container');
            if (footerContainer) {
                footerContainer.innerHTML = data;
                feather.replace();
                console.log('Footer loaded.');
            }
        })
        .catch(error => console.error('Error loading footer:', error));
}

document.addEventListener('DOMContentLoaded', initialize);