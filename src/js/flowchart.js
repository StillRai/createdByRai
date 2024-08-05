// Function to load the flowchart
export function loadFlowchart() {
    console.log('Loading flowchart...');
    fetch('components/flowchart.html')
        .then(response => response.text())
        .then(data => {
            const flowchartPlaceholder = document.getElementById('flowchart-placeholder');
            if (flowchartPlaceholder) {
                flowchartPlaceholder.innerHTML = data;
                console.log('Flowchart content loaded.');
                initializeFlowchart(); // Ensure this function exists and is imported
            } else {
                console.error('Flowchart container not found');
            }
        })
        .catch(error => console.error('Error loading flowchart:', error));
}

document.addEventListener('DOMContentLoaded', loadFlowchart);
