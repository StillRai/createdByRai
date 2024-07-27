import '../css/styles.css';
import feather from 'feather-icons';
import { initialize } from './initialize';
import './flowchart';
import './stars';
import './timeline';
import '../projects/weatherapp/weatherapp.js'; 

document.addEventListener('DOMContentLoaded', () => {
    initialize();
    feather.replace();
});
