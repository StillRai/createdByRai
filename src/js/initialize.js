import { initializeBurgerMenu } from './burgerMenu';
import feather from 'feather-icons';
import { loadFlowchart } from './flowchart';
import { generateStars } from './stars';
import './timeline';
import '../projects/weatherapp/weatherapp.js';

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
      document.getElementById('navbar-container').innerHTML = data;
      feather.replace();
      initializeBurgerMenu();
      console.log('Navbar loaded.');
    });

  if (currentPath === '/' || currentPath === '/index.html') {
    fetch('sections/home.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('sections-container').innerHTML = '';
        document.getElementById('sections-container').innerHTML += data;
        feather.replace();
        console.log('Home section loaded.');
        generateStars(); // Ensure stars are generated after home section is loaded
      })
      .then(() => fetch('sections/skills.html'))
      .then(response => response.text())
      .then(data => {
        document.getElementById('sections-container').innerHTML += data;
        console.log('Skills section loaded.');
        return loadFlowchart(); // Load the flowchart after the Skills section is loaded
      })
      .then(() => fetch('sections/timeline.html'))
      .then(response => response.text())
      .then(data => {
        document.getElementById('sections-container').innerHTML += data;
        console.log('Timeline section loaded.');
      })
      .then(() => fetch('sections/work.html'))
      .then(response => response.text())
      .then(data => {
        document.getElementById('sections-container').innerHTML += data;
        console.log('Work section loaded.');
      })
      .then(() => {
        // Append footer last
        document.getElementById('sections-container').innerHTML += `
          <footer class="footer p-4 bg-custom-gray text-custom-dark">
            <p>Footer content goes here.</p>
          </footer>
        `;
        console.log('Footer loaded.');
      });
  } else if (currentPath.includes('projects/weatherapp')) {
    fetch(basePath + 'projects/weatherapp/weatherapp.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('main-content').innerHTML = data;
        console.log('Weather section loaded.');
      });
  }
}

// Initialize everything on DOMContentLoaded
document.addEventListener('DOMContentLoaded', initialize);
