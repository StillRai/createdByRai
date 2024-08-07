import '../css/styles.css';
import feather from 'feather-icons';
import { initialize } from './initialize';
import './flowchart';
import './stars';
import './timeline';
import '../projects/weatherapp/weatherapp.js';
import './typeEffect.js';  

document.addEventListener('DOMContentLoaded', () => {
    console.log('Main JS loaded');
    initialize();
    feather.replace();
});
