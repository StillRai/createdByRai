export class InteractiveFlowchart {
    constructor() {
        this.flowchart = document.querySelector('.flowchart');
        this.flowchartItems = document.querySelectorAll('.flowchart-item');
        this.line = document.querySelector('.line.vertical');
        this.animated = false;
        this.currentItemIndex = 0;
        this.resizeTimeout = null;
        
        if (this.flowchart && this.line && this.flowchartItems.length > 0) {
            this.init();
        } else {
            console.warn('Flowchart elements not found or incomplete');
        }
    }

    init() {
        window.addEventListener('scroll', () => this.checkScroll());
        window.addEventListener('resize', () => this.handleResize());
        this.positionInfoBoxes();
        this.line.style.zIndex = '1';
    }

    handleResize() {
        if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout);
        }

        this.resizeTimeout = setTimeout(() => {
            this.resetLayout();
            this.positionInfoBoxes();
            this.checkScroll();
        }, 250);
    }

    resetLayout() {
        this.animated = false;
        this.currentItemIndex = 0;
        this.line.style.height = '0';
        this.line.style.opacity = '0';
        this.flowchartItems.forEach(item => {
            item.classList.remove('show');
            const infoBox = item.querySelector('.info-box');
            const connectingLine = item.querySelector('.connecting-line');
            if (infoBox) {
                infoBox.style.opacity = '0';
                infoBox.style.marginLeft = '';
                infoBox.style.marginRight = '';
                infoBox.style.left = '';
                infoBox.style.right = '';
                infoBox.style.textAlign = '';
            }
            if (connectingLine) {
                connectingLine.style.width = '0';
                connectingLine.style.height = '2px';
                connectingLine.style.left = '';
                connectingLine.style.right = '';
            }
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
    
        this.flowchartItems.forEach(item => {
            const yearCircle = item.querySelector('.year-circle');
            if (yearCircle) {
                yearCircle.style.zIndex = '2';
            }
        });
    
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

  positionInfoBoxes() {
    const windowWidth = window.innerWidth;
    this.flowchartItems.forEach((item, index) => {
        const infoBox = item.querySelector('.info-box');
        const connectingLine = item.querySelector('.connecting-line');
        if (infoBox && connectingLine) {
            if (windowWidth <= 767) {
                // Mobile layout
                connectingLine.style.width = '2px';
                connectingLine.style.height = '15px';
                connectingLine.style.top = '75px';
                infoBox.style.top = '90px';
                if (index % 2 === 0) {
                    infoBox.style.alignSelf = 'flex-start';
                } else {
                    infoBox.style.alignSelf = 'flex-end';
                }
            } else {
                // Desktop layout
                connectingLine.style.width = ''; // Reset to CSS value
                connectingLine.style.height = '2px';
                connectingLine.style.top = '40px';
                infoBox.style.top = '0';
                infoBox.style.alignSelf = '';
                if (index % 2 === 0) {
                    infoBox.style.left = '0';
                    infoBox.style.right = 'auto';
                    connectingLine.style.right = '50%';
                    connectingLine.style.left = 'auto';
                } else {
                    infoBox.style.left = 'auto';
                    infoBox.style.right = '0';
                    connectingLine.style.left = '50%';
                    connectingLine.style.right = 'auto';
                }
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