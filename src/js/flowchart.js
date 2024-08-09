export class InteractiveFlowchart {
    constructor() {
        this.flowchartItems = document.querySelectorAll('.flowchart-item');
        this.movingArrow = document.querySelector('.moving-arrow');
        this.init();
    }

    init() {
        this.addEventListeners();
        this.positionArrow();
        this.animateArrow();
    }

    addEventListeners() {
        this.flowchartItems.forEach(item => {
            item.addEventListener('mouseenter', () => this.showInfo(item));
            item.addEventListener('mouseleave', () => this.hideInfo(item));
        });
    }

    showInfo(item) {
        item.classList.add('active');
        const infoBox = item.querySelector('.info-box');
        if (infoBox) {
            infoBox.style.opacity = '1';
            infoBox.style.transform = 'translateX(0)';
        }
    }

    hideInfo(item) {
        item.classList.remove('active');
        const infoBox = item.querySelector('.info-box');
        if (infoBox) {
            infoBox.style.opacity = '0';
            infoBox.style.transform = 'translateX(20px)';
        }
    }

    positionArrow() {
        const firstItem = this.flowchartItems[0];
        const lastItem = this.flowchartItems[this.flowchartItems.length - 1];
        
        if (this.movingArrow && firstItem && lastItem) {
            const startY = firstItem.offsetTop + firstItem.offsetHeight / 2;
            const endY = lastItem.offsetTop + lastItem.offsetHeight / 2;
            
            this.movingArrow.style.top = `${startY}px`;
            this.movingArrow.style.height = `${endY - startY}px`;
        }
    }

    animateArrow() {
        if (this.movingArrow) {
            this.movingArrow.style.animation = 'moveArrow 10s linear infinite';
        }
    }
}