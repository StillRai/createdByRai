export class InteractiveFlowchart {
    constructor() {
        this.flowchartContainer = document.getElementById('flowchart-container');
        this.originalFlowchartHTML = this.flowchartContainer.innerHTML;
        this.flowchart = document.querySelector('.flowchart');
        this.line = document.querySelector('.line.vertical');
        this.animated = false;
        this.currentItemIndex = 0;
        this.resizeTimeout = null;
        this.currentBreakpoint = this.getBreakpoint();
        this.currentOrientation = this.getOrientation();

        if (this.flowchart && this.line) {
            this.init();
        } else {
            console.warn('Flowchart elements not found or incomplete');
        }
    }

    init() {
        window.addEventListener('scroll', () => this.checkScroll());
        window.addEventListener('resize', () => this.handleResize());
        window.addEventListener('orientationchange', () => this.handleOrientationChange());
        this.positionItems();
        this.updateLinePosition();
    }

    getBreakpoint() {
        const width = window.innerWidth;
        if (width <= 767) return 'mobile';
        if (width <= 1023) return 'tablet';
        return 'desktop';
    }

    getOrientation() {
        return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
    }

    handleResize() {
        if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout);
        }

        this.resizeTimeout = setTimeout(() => {
            const newBreakpoint = this.getBreakpoint();
            const newOrientation = this.getOrientation();
            if (newBreakpoint !== this.currentBreakpoint || newOrientation !== this.currentOrientation) {
                this.currentBreakpoint = newBreakpoint;
                this.currentOrientation = newOrientation;
                this.fullResetAndRestart();
            } else {
                this.positionItems();
                this.updateLinePosition();
            }
        }, 250);
    }

    handleOrientationChange() {
        setTimeout(() => {
            const newOrientation = this.getOrientation();
            if (newOrientation !== this.currentOrientation) {
                this.currentOrientation = newOrientation;
                this.fullResetAndRestart();
            }
        }, 100);
    }

    fullResetAndRestart() {
        this.flowchartContainer.innerHTML = '';
        setTimeout(() => {
            this.flowchartContainer.innerHTML = this.originalFlowchartHTML;
            this.flowchart = document.querySelector('.flowchart');
            this.line = document.querySelector('.line.vertical');
            this.currentItemIndex = 0;
            this.animated = false;
            this.resetLayout();
            this.positionItems();
            this.updateLinePosition();
            this.checkScroll();
        }, 100);
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
        const lineHeight = (yearCircleRect.top + yearCircleRect.height / 3) - flowchartRect.top;

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
                    connectingLine.style.height = '2px';
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
                    connectingLine.style.width = '90px';
                    connectingLine.style.height = '2px';
                    if (index % 2 === 0) {
                        infoBox.style.marginLeft = 'calc(50% + 3rem)';
                        infoBox.style.marginRight = '0';
                        infoBox.style.textAlign = 'left';
                        connectingLine.style.left = 'calc(50% + 2rem)';
                        connectingLine.style.right = 'auto';
                    } else {
                        infoBox.style.marginRight = 'calc(50% + 3rem)';
                        infoBox.style.marginLeft = '-0.5rem';
                        infoBox.style.textAlign = 'right';
                        connectingLine.style.right = 'calc(50% - 2rem)';
                        connectingLine.style.left = 'auto';
                    }
                } else if (windowWidth <= 1023) {
                    connectingLine.style.width = '45px';
                    connectingLine.style.height = '2px';
                    connectingLine.style.top = '30px';
                    if (index % 2 === 0) {
                        infoBox.style.left = 'calc(50% + -9rem)';
                        infoBox.style.right = 'auto';
                        connectingLine.style.left = 'calc(50% + 2rem)';
                        connectingLine.style.right = 'auto';
                    } else {
                        infoBox.style.left = 'auto';
                        infoBox.style.right= 'calc(50% + -9rem)';
                        connectingLine.style.left = 'auto';
                        connectingLine.style.right = 'calc(50% + 2rem)';
                    }
                } else {
                    connectingLine.style.width = '50px';
                    connectingLine.style.height = '2px';
                    connectingLine.style.top = '30px';
                    if (index % 2 === 0) {
                        infoBox.style.left = 'calc(60% + 1rem)';
                        infoBox.style.right = 'auto';
                        connectingLine.style.left = 'calc(50% + 4rem)';
                        connectingLine.style.right = 'auto';
                    } else {
                        infoBox.style.left = 'auto';
                        infoBox.style.right = 'calc(50% + 4rem)';
                        connectingLine.style.left = 'auto';
                        connectingLine.style.right = 'calc(50% + 1%)';
                    }
                }
            }
        });

        this.updateLinePosition();
    }

    updateLinePosition() {
        const firstYearCircle = document.querySelector('.flowchart-item:first-child .year-circle');
        const lastYearCircle = document.querySelector('.flowchart-item:last-child .year-circle');

        if (firstYearCircle && lastYearCircle) {
            const firstYearCircleRect = firstYearCircle.getBoundingClientRect();
            const lastYearCircleRect = lastYearCircle.getBoundingClientRect();
            const flowchartRect = this.flowchart.getBoundingClientRect();

            const startPosition = (firstYearCircleRect.top + firstYearCircleRect.height / 2) - flowchartRect.top;
            const endPosition = (lastYearCircleRect.top + lastYearCircleRect.height / 2) - flowchartRect.top;

            this.line.style.top = `${startPosition}px`;
            this.line.style.height = `${endPosition - startPosition}px`;
            this.line.style.left = '50%';
            this.line.style.transform = 'translateX(-50%)';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.flowchart')) {
        new InteractiveFlowchart();
    }
});
