import '../css/styles.css';
import feather from 'feather-icons';
import { initialize } from './initialize';

document.addEventListener('DOMContentLoaded', () => {
    initialize();
    feather.replace();
});
