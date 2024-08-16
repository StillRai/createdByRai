export class InteractiveFlowchart {
    constructor() {
        this.flowchart = document.querySelector('.flowchart');
        this.flowchartItems = document.querySelectorAll('.flowchart-item');
        this.line = document.querySelector('.line');
        this.animated = false;
        
        if (this.flowchart && this.line && this.flowchartItems.length > 0) {
            this.init();
        } else {
            console.warn('Flowchart elements not found or incomplete');
        }
    }

    init() {
        window.addEventListener('scroll', () => this.checkScroll());
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
            setTimeout(() => {
                this.line.style.opacity = '1';
            }, 500);
        }

        this.flowchartItems.forEach((item, index) => {
            if (!item) return;
            setTimeout(() => {
                item.classList.add('show');

                const infoBox = item.querySelector('.info-box');
                if (infoBox) {
                    infoBox.style.opacity = '1';
                }

                const yearCircle = item.querySelector('.year-circle');
                if (yearCircle) {
                    yearCircle.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        yearCircle.style.transform = 'scale(1)';
                    }, 300);
                }
            }, 500 * (index + 1));
        });
    }
}

// Initialize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.flowchart')) {
        new InteractiveFlowchart();
    }
});