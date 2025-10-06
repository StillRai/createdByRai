// docs/js/initialize.js

import { initializeBurgerMenu } from './burgerMenu.js';
import { generateStars } from './stars.js';        // was './stars'
import { InteractiveFlowchart } from './flowchart.js';
import '../css/loader.css';
import '../css/home.css';
import '../css/skills.css';
import '../css/projects.css';

let isInitialized = false;

export function initialize() {
  if (isInitialized) return;
  isInitialized = true;

  const currentPath = window.location.pathname;

  // basePath: since you're serving out of /createdByRai/docs/, treat docs/ as web root
  // For nested HTML under docs/, step back appropriately.
  const basePath =
    currentPath.includes('/projects/weatherapp/') ? './' :
    currentPath.includes('/pages/')                ? './' :
    './';

  showLoader();

  loadNavbar(basePath).then(() => {
    if (currentPath.endsWith('/') || currentPath.endsWith('/createdByRai/') || currentPath.endsWith('/index.html')) {
      loadHomePage(basePath).finally(hideLoader);
    } else if (currentPath.includes('theJourney')) {
      loadJourneyPage(basePath).finally(hideLoader);
    } else if (currentPath.includes('meetRai')) {
      loadMeetRaiPage(basePath).finally(hideLoader);
    } else if (currentPath.includes('projects/weatherapp')) {
      loadWeatherApp(basePath).finally(hideLoader);
    } else {
      hideLoader();
    }

    loadFooter(basePath);
  });
}

/* ---------- Loader (no React/JSX) ---------- */
function showLoader() {
  if (document.getElementById('loader-root')) return;
  const el = document.createElement('div');
  el.id = 'loader-root';
  el.innerHTML = `
    <div class="loader-overlay">
      <div class="loader-spinner" aria-label="Loading"></div>
    </div>`;
  document.body.appendChild(el);
}

function hideLoader() {
  const el = document.getElementById('loader-root');
  if (el) el.remove();
}

/* ---------- Partials ---------- */
function loadNavbar(basePath) {
  return fetch(basePath + 'components/navbar.html')
    .then(r => r.text())
    .then(html => {
      const container = document.getElementById('navbar-container');
      if (container) {
        container.innerHTML = html;
        if (window.feather) window.feather.replace();
        initializeBurgerMenu();
      }
    })
    .catch(err => console.error('Error loading navbar:', err));
}

function loadHomePage(basePath) {
  const bg = document.getElementById('background-container');
  if (bg) bg.style.display = 'block';

  const sectionsContainer = document.getElementById('sections-container');
  if (!sectionsContainer) return Promise.resolve();

  sectionsContainer.innerHTML = '';
  const sections = ['home', 'skills', 'timeline', 'projects'];

  // add a subtle background effect if you want it on the home section
  try { generateStars(); } catch {}

  return sections.reduce((p, section) => p.then(() =>
    fetch(`${basePath}sections/${section}.html`)
      .then(r => r.text())
      .then(html => {
        sectionsContainer.innerHTML += html;
        if (window.feather) window.feather.replace();
        if (section === 'skills') document.dispatchEvent(new Event('skillsLoaded'));
        if (section === 'timeline') new InteractiveFlowchart();
        if (section === 'projects') document.dispatchEvent(new Event('projectsLoaded'));
      })
  ), Promise.resolve());
}

function loadJourneyPage(basePath) {
  const main = document.getElementById('main-content');
  if (!main) return Promise.resolve();
  return fetch(`${basePath}pages/theJourney.html`)
    .then(r => r.text())
    .then(html => {
      main.innerHTML = html;
      if (window.feather) window.feather.replace();
      if (document.querySelectorAll('.flowchart-item').length) new InteractiveFlowchart();
    })
    .catch(err => console.error('Error loading The Journey page:', err));
}

function loadMeetRaiPage(basePath) {
  const main = document.getElementById('main-content');
  if (!main) return Promise.resolve();
  return fetch(`${basePath}pages/meetRai.html`)
    .then(r => r.text())
    .then(html => {
      main.innerHTML = html;
      if (window.feather) window.feather.replace();
      if (document.querySelectorAll('.flowchart-item').length) new InteractiveFlowchart();
    })
    .catch(err => console.error('Error loading Meet Rai page:', err));
}

function loadWeatherApp(basePath) {
  const bg = document.getElementById('background-container');
  if (bg) bg.style.display = 'none';

  const main = document.getElementById('main-content');
  if (!main) return Promise.resolve();

  return fetch(basePath + 'projects/weatherapp/index.html')
    .then(r => r.text())
    .then(html => {
      main.innerHTML = html;
      return import('../projects/weatherapp/initializeWeatherApp.js')
        .then(m => m.initializeWeatherApp());
    })
    .catch(err => console.error('Error loading weather app section:', err));
}

function loadFooter(basePath) {
  fetch(basePath + 'components/footer.html')
    .then(r => r.text())
    .then(html => {
      const el = document.getElementById('footer-container');
      if (!el) return;
      el.innerHTML = html;
      if (window.feather) window.feather.replace();
    })
    .catch(err => console.error('Error loading footer:', err));
}
