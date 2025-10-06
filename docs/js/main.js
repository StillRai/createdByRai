// docs/js/main.js

import '../css/styles.css';
import { initialize } from './initialize.js';
import './flowchart.js';
import './star.js';                    // was "./stars" (404)
import '../projects/weatherapp/weatherapp.js'; // keep only if this file exists
import './typeEffect.js';

document.addEventListener('DOMContentLoaded', initialize);
