import { initializeBurgerMenu } from './burgerMenu';
import { generateStars } from './stars';
import feather from 'feather-icons';
import { loadFlowchart } from './flowchart';

let isInitialized = false;

export function initialize() {
    if (isInitialized) return; // Prevent double initialization
    isInitialized = true;

    console.log('Initializing components...');
    fetch('components/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-container').innerHTML = data;
            feather.replace();
            initializeBurgerMenu();
            console.log('Navbar loaded.');
        });

    fetch('sections/home.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('sections-container').innerHTML = ''; // Clear container
            document.getElementById('sections-container').innerHTML += data;
            feather.replace();
            console.log('Home section loaded.');
            return loadFlowchart(); // Ensure flowchart loads after home section
        })
        .then(() => fetch('sections/skills.html'))
        .then(response => response.text())
        .then(data => {
            document.getElementById('sections-container').innerHTML += data;
            console.log('Skills section loaded.');
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
            generateStars(); // Ensure stars are generated after all sections are loaded
        });
}

// Initialize everything on DOMContentLoaded
document.addEventListener('DOMContentLoaded', initialize);
