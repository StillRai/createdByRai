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

    const basePath = currentPath.includes('projects/weatherapp') ? '../../' : '';

    // Load Navbar
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

    if (currentPath === '/' || currentPath === '/index.html') {
        const backgroundContainer = document.getElementById('background-container');
        if (backgroundContainer) {
            backgroundContainer.style.display = 'block';
        }
        const sectionsContainer = document.getElementById('sections-container');
        if (sectionsContainer) {
            sectionsContainer.innerHTML = ''; 
        }

        const sections = [
            'sections/home.html',
            'sections/skills.html',
        ];

        sections.reduce((promise, section) => {
            return promise.then(() => {
                console.log(`Fetching ${section}`);
                return fetch(basePath + section)
                    .then(response => response.text())
                    .then(data => {
                        console.log(`Loaded content for ${section}:`, data);
                        if (sectionsContainer) {
                            sectionsContainer.innerHTML += data;
                            feather.replace();
                            console.log(`${section} section loaded.`);
                            if (section.includes('skills')) {
                                document.dispatchEvent(new Event('skillsLoaded'));
                            }
                            if (section.includes('theJourney')) {
                                new InteractiveFlowchart();
                            }
                        }
                    });
            });
        }, Promise.resolve())
        .then(() => {
            if (sectionsContainer) {
                fetch(basePath + 'components/footer.html')
                    .then(response => response.text())
                    .then(data => {
                        sectionsContainer.innerHTML += data;
                        feather.replace();
                        console.log('Footer loaded.');
                    })
                    .catch(error => console.error('Error loading footer:', error));
            }
        })
        .catch(error => console.error('Error loading section:', error));
    } else if (currentPath.includes('projects/weatherapp')) {
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
}

document.addEventListener('DOMContentLoaded', initialize);
