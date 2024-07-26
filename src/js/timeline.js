document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineContainer = document.getElementById('timeline-container');

    // Calculate total time span and position items
    const years = Array.from(timelineItems).map(item => parseInt(item.getAttribute('data-year')));
    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);
    const totalYears = maxYear - minYear;

    timelineItems.forEach((item, index) => {
        const year = parseInt(item.getAttribute('data-year'));
        const position = ((year - minYear) / totalYears) * 100;

        if (window.innerWidth > 768) {
            item.style.left = `${position}%`;
            item.style.top = '50%';
            item.style.transform = 'translate(-50%, -50%)';
        } else {
            item.style.left = '50%';
            item.style.top = `${position}%`;
            item.style.transform = 'translate(-50%, -50%)';
        }

        item.addEventListener('click', () => {
            item.classList.toggle('active');
            const infoBox = item.querySelector('.info-box');
            if (item.classList.contains('active')) {
                if (!infoBox) {
                    showInfo(item);
                }
            } else {
                if (infoBox) {
                    hideInfo(item);
                }
            }
        });
    });

    function showInfo(item) {
        const infoBox = document.createElement('div');
        infoBox.className = 'info-box';
        infoBox.textContent = item.getAttribute('data-info');
        item.appendChild(infoBox);
    }

    function hideInfo(item) {
        const infoBox = item.querySelector('.info-box');
        if (infoBox) {
            item.removeChild(infoBox);
        }
    }
});
