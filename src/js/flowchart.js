export class InteractiveFlowchart {
    constructor() {
        this.flowchartItems = document.querySelectorAll('.flowchart-item');
        this.flowchart = document.querySelector('.flowchart');
        this.line = document.querySelector('.line');
        if (this.flowchart && this.line && this.flowchartItems.length > 0) {
            this.init();
        } else {
            console.warn('Flowchart elements not found or incomplete');
        }
    }

    init() {
        this.positionItems();
        window.addEventListener('resize', () => this.positionItems());
        this.animateItems();
    }

    positionItems() {
        if (!this.flowchart || !this.line || this.flowchartItems.length === 0) return;
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            this.positionMobile();
        } else {
            this.positionDesktop();
        }
    }

    positionMobile() {
        if (!this.line) return;
        this.line.style.left = '50%';
        this.line.style.top = '0';
        this.line.style.width = '2px';
        this.line.style.height = '100%';

        this.flowchartItems.forEach((item, index) => {
            if (!item) return;
            item.style.top = `${(index + 1) * (100 / (this.flowchartItems.length + 1))}%`;
            item.style.left = '50%';
            item.style.transform = 'translate(-50%, -50%)';

            const infoBox = item.querySelector('.info-box');
            if (infoBox) {
                infoBox.style.left = '';
                infoBox.style.right = '';
                infoBox.style.top = '';
                infoBox.style.transform = '';
            }
        });
    }

    positionDesktop() {
        if (!this.line || this.flowchartItems.length === 0) return;

        this.line.style.top = '50%';
        this.line.style.left = '0';
        this.line.style.width = '100%';
        this.line.style.height = '2px';

        this.flowchartItems.forEach((item, index) => {
            if (!item) return;
            item.style.left = `${(index + 1) * (100 / (this.flowchartItems.length + 1))}%`;
            item.style.top = '50%';
            item.style.transform = 'translate(-50%, -50%)';

            const infoBox = item.querySelector('.info-box');
            if (infoBox) {
                infoBox.style.top = '';
                infoBox.style.bottom = '';
                infoBox.style.left = '';
                infoBox.style.transform = '';
            }
        });

        const firstItem = this.flowchartItems[0];
        const lastItem = this.flowchartItems[this.flowchartItems.length - 1];
        if (firstItem && lastItem) {
            this.line.style.left = `${firstItem.offsetLeft}px`;
            this.line.style.width = `${lastItem.offsetLeft - firstItem.offsetLeft}px`;
        }
    }

    animateItems() {
        if (this.line) {
            setTimeout(() => {
                this.line.style.opacity = '1';
            }, 2000);
        }

        this.flowchartItems.forEach((item, index) => {
            if (!item) return;
            setTimeout(() => {
                item.classList.add('show');

                const infoBox = item.querySelector('.info-box');
                if (infoBox) {
                    infoBox.style.opacity = '1';
                }
            }, 1000 * (index + 1));
        });
    }
}

// Only initialize if the flowchart exists
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.flowchart')) {
        new InteractiveFlowchart();
    }
});