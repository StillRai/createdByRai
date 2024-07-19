document.addEventListener('DOMContentLoaded', () => {
    function loadFlowchart() {
        fetch('components/flowchart.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('flowchart-placeholder').innerHTML = data;
                initializeFlowchart(); 
            })
            .catch(error => console.error('Error loading flowchart:', error));
    }

    function initializeFlowchart() {
        const arrow = document.querySelector('.arrow');
        if (arrow) {
            arrow.style.animation = 'move-arrow 5s infinite linear';
        }
    }

    loadFlowchart();
});
