class InteractiveFlowchart {
    constructor() {
        this.flowchartContainer = document.getElementById('flowchart-container');
        this.flowchartItems = document.querySelectorAll('.flowchart-item');
        this.movingArrow = document.querySelector('.moving-arrow');
        this.currentPosition = 0;
        this.arrowDirection = 1; // 1 for down, -1 for up
        this.init();
    }

    init() {
        this.positionItems();
        this.positionArrow(this.flowchartItems[0]);
        this.animateFlowchart();
    }

    positionItems() {
        const totalHeight = this.flowchartContainer.clientHeight;
        const itemCount = this.flowchartItems.length;
        
        this.flowchartItems.forEach((item, index) => {
            const topPosition = (index / (itemCount - 1)) * (totalHeight - 60);
            item.style.top = `${topPosition}px`;
        });
    }

    moveArrow(item) {
        const itemRect = item.getBoundingClientRect();
        const containerRect = this.flowchartContainer.getBoundingClientRect();
        const newPosition = itemRect.top - containerRect.top + itemRect.height / 2;

        this.movingArrow.style.top = `${newPosition}px`;
        this.currentPosition = newPosition;
    }

    positionArrow(item) {
        const itemRect = item.getBoundingClientRect();
        const containerRect = this.flowchartContainer.getBoundingClientRect();
        this.movingArrow.style.top = `${itemRect.top - containerRect.top + itemRect.height / 2}px`;
        this.movingArrow.style.left = 'calc(50% - 10px)';
    }

    animateFlowchart() {
        this.flowchartItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('active');
                this.moveArrow(item);
                if (index === this.flowchartItems.length - 1) {
                    this.flowchartContainer.classList.add('animation-complete');
                }
            }, index * 1000);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new InteractiveFlowchart();
});