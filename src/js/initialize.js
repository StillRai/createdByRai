import { initializeBurgerMenu } from './burgerMenu';
import { generateStars } from './stars';
import { InteractiveFlowchart } from './flowchart.js';
import React from 'react';
import ReactDOM from 'react-dom';
import Loader from './loader.js';
import '../css/loader.css';
import '../css/home.css';
import '../css/skills.css';

let isInitialized = false;

export function initialize() {
    if (isInitialized) return;
    isInitialized = true;

    console.log('Initializing components...');
    const currentPath = window.location.pathname;

    const basePath = currentPath.includes('projects/weatherapp') ? '../../' :
        currentPath.includes('pages/') ? '../' : '';

    // Show loader for all pages
    showLoader(); 

    // Load Navbar and then handle the rest of the initialization
    loadNavbar(basePath).then(() => {
        // Handle different pages
        if (currentPath === '/' || currentPath === '/index.html') {
            loadHomePage(basePath).then(() => {
                hideLoader();
            });
        } else if (currentPath.includes('theJourney')) {
            loadJourneyPage(basePath).then(() => {
                hideLoader();
            });
        } else if (currentPath.includes('meetRai')) {
            loadMeetRaiPage(basePath).then(() => {
                hideLoader(); 
            });
        } else if (currentPath.includes('projects/weatherapp')) {
            loadWeatherApp(basePath).then(() => {
                hideLoader(); 
            });
        } else {
            hideLoader();
        }

        // Load Footer after everything else
        loadFooter(basePath);
    });
}

function showLoader() {
    const loaderContainer = document.createElement('div');
    loaderContainer.id = 'loader-root';
    document.body.appendChild(loaderContainer);

    ReactDOM.render(<Loader />, loaderContainer);
}

function hideLoader() {
    const loaderContainer = document.getElementById('loader-root');
    if (loaderContainer) {
        ReactDOM.unmountComponentAtNode(loaderContainer);
        document.body.removeChild(loaderContainer);
    }
}

function loadNavbar(basePath) {
    return fetch(basePath + 'components/navbar.html')
        .then(response => response.text())
        .then(data => {
            const navbarContainer = document.getElementById('navbar-container');
            if (navbarContainer) {
                navbarContainer.innerHTML = data;
                if (window.feather) {
                    window.feather.replace();
                }
                initializeBurgerMenu();
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
        const sections = ['home', 'skills', 'timeline']; 

        return sections.reduce((promise, section) => {
            return promise.then(() => {
                return fetch(`${basePath}sections/${section}.html`)
                    .then(response => response.text())
                    .then(data => {
                        sectionsContainer.innerHTML += data;
                        if (window.feather) {
                            window.feather.replace();
                        }
                        if (section === 'skills') {
                            document.dispatchEvent(new Event('skillsLoaded'));
                        }
                        if (section === 'timeline') {
                            new InteractiveFlowchart(); 
                        }
                    })
                    .catch(error => console.error(`Error loading ${section} section:`, error));
            });
        }, Promise.resolve());
    }
}

function loadJourneyPage(basePath) {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        return fetch(`${basePath}pages/theJourney.html`)
            .then(response => response.text())
            .then(data => {
                mainContent.innerHTML = data;
                if (window.feather) {
                    window.feather.replace();
                }
                if (document.querySelectorAll('.flowchart-item').length > 0) {
                    new InteractiveFlowchart();
                }
            })
            .catch(error => console.error('Error loading The Journey page:', error));
    }
    return Promise.resolve();
}

function loadMeetRaiPage(basePath) {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        return fetch(`${basePath}pages/meetRai.html`)
            .then(response => response.text())
            .then(data => {
                mainContent.innerHTML = data;
                if (window.feather) {
                    window.feather.replace();
                }
                if (document.querySelectorAll('.flowchart-item').length > 0) {
                    new InteractiveFlowchart();
                }
            })
            .catch(error => console.error('Error loading Meet Rai page:', error));
    }
    return Promise.resolve(); 
}

function loadWeatherApp(basePath) {
    const backgroundContainer = document.getElementById('background-container');
    if (backgroundContainer) {
        backgroundContainer.style.display = 'none';
    }
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        return fetch(basePath + 'projects/weatherapp/index.html')
            .then(response => response.text())
            .then(data => {
                mainContent.innerHTML = data;
                return import('../projects/weatherapp/initializeWeatherApp.js').then(module => {
                    module.initializeWeatherApp();
                });
            })
            .catch(error => console.error('Error loading weather app section:', error));
    }
    return Promise.resolve(); // Resolve to ensure the loader is hidden even if no content is loaded
}

function loadFooter(basePath) {
    fetch(basePath + 'components/footer.html')
        .then(response => response.text())
        .then(data => {
            const footerContainer = document.getElementById('footer-container');
            if (footerContainer) {
                footerContainer.innerHTML = data;
                if (window.feather) {
                    window.feather.replace();
                }
            }
        })
        .catch(error => console.error('Error loading footer:', error));
}

document.addEventListener('DOMContentLoaded', initialize);