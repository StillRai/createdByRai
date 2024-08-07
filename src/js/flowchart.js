// Function to load the flowchart
export function loadFlowchart() {
    console.log("Loading flowchart...");
    return fetch('components/flowchart.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('flowchart-placeholder').innerHTML = data;
        console.log("Flowchart content loaded.");
        initializeFlowchart(); // Call the function here
      })
      .catch(error => console.error('Error loading flowchart:', error));
  }