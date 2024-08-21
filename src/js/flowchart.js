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
        this.line.style.zIndex = '1';
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
                        setTimeout(() => this.showNextItem(), 300);
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
        
        this.line.style.transition = 'height 1s ease-out'; // Slower line animation
        this.line.style.height = `${lineHeight}px`;

        setTimeout(callback, 800); // Wait for line animation to complete
    }

    animateConnectingLine(item) {
        const connectingLine = item.querySelector('.connecting-line');
        if (connectingLine) {
            const windowWidth = window.innerWidth;
            let lineWidth = windowWidth <= 767 ? '35px' : '50px';
            connectingLine.style.width = lineWidth;
        }
    }

    positionInfoBoxes() {
        const windowWidth = window.innerWidth;
        this.flowchartItems.forEach((item, index) => {
            const infoBox = item.querySelector('.info-box');
            const connectingLine = item.querySelector('.connecting-line');
            if (infoBox && connectingLine) {
                if (windowWidth <= 767) {
                    infoBox.style.left = '75px';
                    infoBox.style.right = 'auto';
                    connectingLine.style.left = '40px';
                    connectingLine.style.right = 'auto';
                    connectingLine.style.width = '35px';
                } else {
                    if (index % 2 === 0) {
                        infoBox.style.left = 'calc(50% + 60px)';
                        infoBox.style.right = 'auto';
                        connectingLine.style.left = 'calc(50% + 50px)';
                        connectingLine.style.right = 'auto';
                    } else {
                        infoBox.style.left = 'auto';
                        infoBox.style.right = 'calc(50% + 60px)';
                        connectingLine.style.left = 'auto';
                        connectingLine.style.right = 'calc(50% + 50px)';
                    }
                    connectingLine.style.width = '50px';
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