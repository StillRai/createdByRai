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
