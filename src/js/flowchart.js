export class InteractiveFlowchart {
    constructor() {
        this.flowchartContainer = document.getElementById('flowchart-container');
        this.originalFlowchartHTML = this.flowchartContainer.innerHTML; // Store the original HTML for reinitialization
        this.flowchart = document.querySelector('.flowchart');
        this.line = document.querySelector('.line.vertical');
        this.animated = false;
        this.currentItemIndex = 0;
        this.resizeTimeout = null;

        if (this.flowchart && this.line) {
            this.init();
        } else {
            console.warn('Flowchart elements not found or incomplete');
        }
    }

    init() {
        window.addEventListener('scroll', () => this.checkScroll());
        window.addEventListener('resize', () => this.handleResize());
        this.positionItems();
        this.line.style.zIndex = '1';
    }

    handleResize() {
        if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout);
        }

        this.resizeTimeout = setTimeout(() => {
            this.fullResetAndRestart();
        }, 250);
    }

    fullResetAndRestart() {
        // Remove the flowchart from the DOM
        this.flowchartContainer.innerHTML = '';

        // Add a delay to ensure the removal is complete before re-adding
        setTimeout(() => {
            // Re-add the original flowchart HTML
            this.flowchartContainer.innerHTML = this.originalFlowchartHTML;

            // Reinitialize everything
            this.flowchart = document.querySelector('.flowchart');
            this.line = document.querySelector('.line.vertical');
            this.currentItemIndex = 0;
            this.animated = false;

            this.resetLayout();
            this.positionItems();
            this.checkScroll(); // Check scroll to restart the animation
        }, 1000); // 1 second delay to ensure the DOM has updated
    }

    resetLayout() {
        this.line.style.height = '0';
        this.line.style.opacity = '0';
        const flowchartItems = document.querySelectorAll('.flowchart-item');
        flowchartItems.forEach(item => {
            item.classList.remove('show');
            const infoBox = item.querySelector('.info-box');
            const connectingLine = item.querySelector('.connecting-line');
            if (infoBox) infoBox.style.opacity = '0';
            if (connectingLine) connectingLine.style.width = '0';
        });
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
            this.line.style.zIndex = '0';
            this.line.style.opacity = '1';
            this.line.style.height = '0';
        }

        this.showNextItem();
    }

    showNextItem() {
        const flowchartItems = document.querySelectorAll('.flowchart-item');
        if (this.currentItemIndex >= flowchartItems.length) return;

        const item = flowchartItems[this.currentItemIndex];
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

                setTimeout(() => {
                    this.updateLineHeight(item, () => {
                        this.animateConnectingLine(item);
                        this.currentItemIndex++;
                        setTimeout(() => this.showNextItem(), 500);
                    });
                }, 200);
            }, 100);
        }
    }

    updateLineHeight(item, callback) {
        const yearCircle = item.querySelector('.year-circle');
        const flowchartRect = this.flowchart.getBoundingClientRect();
        const yearCircleRect = yearCircle.getBoundingClientRect();
        const lineHeight = (yearCircleRect.top + yearCircleRect.height / 2) - flowchartRect.top;

        this.line.style.transition = 'height 1s ease-out';
        this.line.style.height = `${lineHeight}px`;

        setTimeout(callback, 800);
    }

    animateConnectingLine(item) {
        const connectingLine = item.querySelector('.connecting-line');
        if (connectingLine) {
            const windowWidth = window.innerWidth;
            if (windowWidth <= 767) {
                connectingLine.style.height = '0';
                setTimeout(() => {
                    connectingLine.style.height = '30px';
                }, 50);
            } else {
                let lineWidth = '50px';
                connectingLine.style.width = '0';
                setTimeout(() => {
                    connectingLine.style.width = lineWidth;
                }, 50);
            }
        }
    }

    positionItems() {
        const windowWidth = window.innerWidth;
        const flowchartItems = document.querySelectorAll('.flowchart-item');
        flowchartItems.forEach((item, index) => {
            const infoBox = item.querySelector('.info-box');
            const connectingLine = item.querySelector('.connecting-line');
            if (infoBox && connectingLine) {
                if (windowWidth <= 767) {
                    connectingLine.style.top = '30%';
                    connectingLine.style.width = '30px';
                    connectingLine.style.height = '2px';
                    if (index % 2 === 0) {
                        infoBox.style.marginLeft = '195px';
                        infoBox.style.marginRight = '0';
                        infoBox.style.textAlign = 'left';
                        connectingLine.style.left = 'calc(50% + 30px)';
                        connectingLine.style.right = 'auto';
                    } else {
                        infoBox.style.marginRight = '60px';
                        infoBox.style.marginLeft = '-5%';
                        infoBox.style.textAlign = 'right';
                        connectingLine.style.right = 'calc(50% + 30px)';
                        connectingLine.style.left = 'auto';
                    }
                } else {
                    connectingLine.style.width = '50px';
                    connectingLine.style.height = '2px';
                    connectingLine.style.top = '50px';
                    if (index % 2 === 0) {
                        infoBox.style.left = 'calc(50% + 60px)';
                        infoBox.style.right = 'auto';
                        connectingLine.style.left = 'calc(50% + 50px)';
                        connectingLine.style.right = 'auto';
                    } else {
                        infoBox.style.left = 'auto';
                        infoBox.style.right = 'calc(50% + 60px)';
                        connectingLine.style.left = 'auto';
                        connectingLine.style.right = 'calc(50% + 1%)';
                    }
                }
            }
        });

        if (windowWidth <= 767) {
            this.line.style.left = '50%';
            this.line.style.marginLeft = '-1px';
            this.line.style.top = '51%';
        } else if (windowWidth <= 1023) {
            this.line.style.marginLeft = '0%';
            this.line.style.top = '40%';
        } else {
            this.line.style.marginLeft = '21.3%';
            this.line.style.top = '6.5%';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.flowchart')) {
        new InteractiveFlowchart();
    }
});
