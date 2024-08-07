import { initializeBurgerMenu } from './burgerMenu';
import feather from 'feather-icons';
import { loadFlowchart } from './flowchart';
import { generateStars } from './stars';
import './timeline';

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
            'sections/timeline.html',
            'sections/work.html'
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
                                return loadFlowchart();
                            }
                        }
                    });
            });
        }, Promise.resolve())
        .then(() => {
            if (sectionsContainer) {
                sectionsContainer.innerHTML += `
                    <footer class="footer p-4 bg-custom-gray text-custom-dark">
                        <p>Footer content goes here.</p>
                    </footer>
                `;
                console.log('Footer loaded.');
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
