import { initializeBurgerMenu } from './burgerMenu';
import feather from 'feather-icons';
import { loadFlowchart } from './flowchart';
import { generateStars } from './stars';
import './timeline';

let isInitialized = false;

export function initialize() {
  if (isInitialized) return; // Prevent double initialization
  isInitialized = true;

  console.log('Initializing components...');
  const currentPath = window.location.pathname;

  // Adjust the base path depending on the current location
  const basePath = currentPath.includes('projects/weatherapp') ? '../../' : '';

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
    });

  if (currentPath === '/' || currentPath === '/index.html') {
    const backgroundContainer = document.getElementById('background-container');
    if (backgroundContainer) {
      backgroundContainer.style.display = 'block';
    }
    fetch('sections/home.html')
      .then(response => response.text())
      .then(data => {
        const sectionsContainer = document.getElementById('sections-container');
        if (sectionsContainer) {
          sectionsContainer.innerHTML = '';
          sectionsContainer.innerHTML += data;
          feather.replace();
          console.log('Home section loaded.');
          generateStars(); // Ensure stars are generated after home section is loaded
        }
      })
      .then(() => fetch('sections/skills.html'))
      .then(response => response.text())
      .then(data => {
        const sectionsContainer = document.getElementById('sections-container');
        if (sectionsContainer) {
          sectionsContainer.innerHTML += data;
          console.log('Skills section loaded.');
          return loadFlowchart(); // Load the flowchart after the Skills section is loaded
        }
      })
      .then(() => fetch('sections/timeline.html'))
      .then(response => response.text())
      .then(data => {
        const sectionsContainer = document.getElementById('sections-container');
        if (sectionsContainer) {
          sectionsContainer.innerHTML += data;
          console.log('Timeline section loaded.');
        }
      })
      .then(() => fetch('sections/work.html'))
      .then(response => response.text())
      .then(data => {
        const sectionsContainer = document.getElementById('sections-container');
        if (sectionsContainer) {
          sectionsContainer.innerHTML += data;
          console.log('Work section loaded.');
        }
      })
      .then(() => {
        // Append footer last
        const sectionsContainer = document.getElementById('sections-container');
        if (sectionsContainer) {
          sectionsContainer.innerHTML += `
          <footer class="footer p-4 bg-custom-gray text-custom-dark">
            <p>Footer content goes here.</p>
          </footer>
        `;
          console.log('Footer loaded.');
        }
      });
  } else {
    const backgroundContainer = document.getElementById('background-container');
    if (backgroundContainer) {
      backgroundContainer.style.display = 'none';
    }
    if (currentPath.includes('projects/weatherapp')) {
      fetch(basePath + 'projects/weatherapp/index.html')
        .then(response => response.text())
        .then(data => {
          const mainContent = document.getElementById('main-content');
          if (mainContent) {
            mainContent.innerHTML = data;
            console.log('Weather section loaded.');
            import('../projects/weatherapp/weatherapp.js').then(module => {
              module.initializeWeatherApp(); // Ensure weatherapp.js exports an initialize function
            });
          }
        });
    }
  }
}

// Initialize everything on DOMContentLoaded
document.addEventListener('DOMContentLoaded', initialize);
