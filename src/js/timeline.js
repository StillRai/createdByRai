document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
  
    timelineItems.forEach((item) => {
      item.addEventListener('mouseenter', () => showInfo(item));
      item.addEventListener('mouseleave', () => hideInfo(item));
      item.addEventListener('touchstart', () => showInfo(item));
    });
  
    function showInfo(item) {
      const infoBox = document.createElement('div');
      infoBox.className = 'info-box';
      infoBox.textContent = item.getAttribute('data-info');
  
      if (window.innerWidth > 768) {
        infoBox.style.top = item.getAttribute('data-year') % 2 === 0 ? '50px' : '-50px';
      } else {
        infoBox.style.left = item.getAttribute('data-year') % 2 === 0 ? '50px' : '-220px';
      }
  
      item.appendChild(infoBox);
    }
  
    function hideInfo(item) {
      const infoBox = item.querySelector('.info-box');
      if (infoBox) {
        item.removeChild(infoBox);
      }
    }
});
