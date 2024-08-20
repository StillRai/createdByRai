export class InteractiveFlowchart {
    constructor() {
        this.flowchart = document.querySelector('.flowchart');
        this.flowchartItems = document.querySelectorAll('.flowchart-item');
        this.line = document.querySelector('.line.vertical');
        this.animated = false;
        this.currentItemIndex = 0;
        
        if (this.flowchart && this.line && this.flowchartItems.length > 0) {
            this.init();
        } else {
            console.warn('Flowchart elements not found or incomplete');
        }
    }

    init() {
        window.addEventListener('scroll', () => this.checkScroll());
        this.positionInfoBoxes();
    }

    checkScroll() {
        if (this.animated) return;

        const flowchartTop = this.flowchart.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (flowchartTop < windowHeight * 0.75) {
            this.animateItems();
            this.animated = true;
        }
    }

    animateItems() {
        if (this.line) {
            this.line.style.opacity = '1';
            this.line.style.height = '0';
        }

        this.showNextItem();
    }

    showNextItem() {
        if (this.currentItemIndex >= this.flowchartItems.length) return;

        const item = this.flowchartItems[this.currentItemIndex];
        item.classList.add('show');

        const infoBox = item.querySelector('.info-box');
        if (infoBox) {
            infoBox.style.opacity = '1';
        }

        const yearCircle = item.querySelector('.year-circle');
        if (yearCircle) {
            yearCircle.style.transform = 'scale(1.1) translateX(-50%)';
            setTimeout(() => {
                yearCircle.style.transform = 'scale(1) translateX(-50%)';
            }, 300);
        }

        this.updateLineHeight(item, () => {
            this.currentItemIndex++;
            setTimeout(() => this.showNextItem(), 500);
        });
    }

    updateLineHeight(item, callback) {
        const yearCircle = item.querySelector('.year-circle');
        const flowchartRect = this.flowchart.getBoundingClientRect();
        const yearCircleRect = yearCircle.getBoundingClientRect();
        const lineHeight = (yearCircleRect.top + yearCircleRect.height / 2) - flowchartRect.top;
        
        this.line.style.transition = 'height 0.5s ease-out';
        this.line.style.height = `${lineHeight}px`;

        setTimeout(callback, 500);
    }

    positionInfoBoxes() {
        this.flowchartItems.forEach((item, index) => {
            const infoBox = item.querySelector('.info-box');
            if (infoBox) {
                if (index % 2 === 0) {
                    infoBox.style.left = '0';
                    infoBox.style.right = '55%';
                } else {
                    infoBox.style.left = '55%';
                    infoBox.style.right = '0';
                }
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.flowchart')) {
        new InteractiveFlowchart();
    }
});