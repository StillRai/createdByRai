// src/js/main.js

import '../css/styles.css';
import { initialize } from './initialize';
import './flowchart';
import './stars';
import '../projects/weatherapp/weatherapp.js';
import './typeEffect.js';

document.addEventListener('DOMContentLoaded', () => {
    initialize();
    if (window.feather) {
        window.feather.replace();
    }
});
