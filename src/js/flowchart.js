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


document.addEventListener('DOMContentLoaded', loadFlowchart);
