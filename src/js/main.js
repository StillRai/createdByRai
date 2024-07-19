import '../css/styles.css';
import feather from 'feather-icons';
import { initialize } from './initialize';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize everything after DOM content is loaded
    initialize();
    feather.replace();
});
