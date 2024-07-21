// Function to load the flowchart
export function loadFlowchart() {
    console.log('Loading flowchart...');
    fetch('components/flowchart.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('flowchart-placeholder').innerHTML = data;
            console.log('Flowchart content loaded.');
            initializeFlowchart(); 
        })
        .catch(error => console.error('Error loading flowchart:', error));
}

// Function to initialize the flowchart animation
function initializeFlowchart() {
    const arrow = document.querySelector('.arrow');
    if (arrow) {
        arrow.style.animation = 'move-arrow 50s linear infinite';
        console.log('Flowchart animation initialized.');
    } else {
        console.log('Arrow not found.');
    }
}

// Initialize flowchart on DOMContentLoaded
document.addEventListener('DOMContentLoaded', loadFlowchart);
