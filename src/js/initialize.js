import { initializeBurgerMenu } from './burgerMenu';
import { generateStars } from './stars';
import feather from 'feather-icons';

export function initialize() {
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
            loadFlowchart();
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


    // Function to load the flowchart
    function loadFlowchart() {
        fetch('components/flowchart.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('flowchart-placeholder').innerHTML = data;
                initializeFlowchart();
            })
            .catch(error => console.error('Error loading flowchart:', error));
    }

    // Function to initialize the flowchart animation
    function initializeFlowchart() {
        const arrow = document.querySelector('.arrow');
        if (arrow) {
            arrow.style.animation = 'move-arrow 5s infinite linear';
        }
    }
}