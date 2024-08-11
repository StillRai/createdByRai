export class InteractiveFlowchart {
    constructor() {
        this.flowchartItems = document.querySelectorAll('.flowchart-item');
        this.flowchart = document.querySelector('.flowchart');
        this.line = document.querySelector('.line');
        this.init();
    }

    init() {
        this.positionItems();
        window.addEventListener('resize', () => this.positionItems());
        this.animateItems();
    }

    positionItems() {
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            this.positionMobile();
        } else {
            this.positionDesktop();
        }
    }

    positionMobile() {
        this.line.style.left = '50%';
        this.line.style.top = '0';
        this.line.style.width = '2px';
        this.line.style.height = '100%';

        this.flowchartItems.forEach((item, index) => {
            const isEven = index % 2 === 0;
            item.style.top = `${(index + 1) * (100 / (this.flowchartItems.length + 1))}%`;
            item.style.left = '50%';
            item.style.transform = 'translate(-50%, -50%)';

            const infoBox = item.querySelector('.info-box');
            if (infoBox) {
                // Remove dynamic positioning of info boxes
                infoBox.style.left = '';
                infoBox.style.right = '';
                infoBox.style.top = '';
                infoBox.style.transform = '';
            }
        });
    }

    positionDesktop() {
        this.line.style.top = '50%';
        this.line.style.left = '0';
        this.line.style.width = '100%';
        this.line.style.height = '2px';

        this.flowchartItems.forEach((item, index) => {
            const isEven = index % 2 === 0;
            item.style.left = `${(index + 1) * (100 / (this.flowchartItems.length + 1))}%`;
            item.style.top = '50%';
            item.style.transform = 'translate(-50%, -50%)';

            const infoBox = item.querySelector('.info-box');
            if (infoBox) {
                // Remove dynamic positioning of info boxes
                infoBox.style.top = '';
                infoBox.style.bottom = '';
                infoBox.style.left = '';
                infoBox.style.transform = '';
            }
        });

        // Adjust line width
        const firstItem = this.flowchartItems[0];
        const lastItem = this.flowchartItems[this.flowchartItems.length - 1];
        this.line.style.left = `${firstItem.offsetLeft}px`;
        this.line.style.width = `${lastItem.offsetLeft - firstItem.offsetLeft}px`;
    }

    animateItems() {
        // Show the main line
        setTimeout(() => {
            this.line.style.opacity = '1';
        }, 2000);

        // Animate items
        this.flowchartItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('show');
                
                // Animate the connecting line
                const connectingLine = item.querySelector('::after');
                if (connectingLine) {
                    connectingLine.style.opacity = '1';
                }

                // Animate the info box
                const infoBox = item.querySelector('.info-box');
                if (infoBox) {
                    infoBox.style.opacity = '1';
                    // Remove transform to prevent shifting
                    // infoBox.style.transform = 'translate(0, 0)';
                }
            }, 1000 * (index + 1));
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new InteractiveFlowchart();
});