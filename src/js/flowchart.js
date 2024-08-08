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
        this.flowchartItems.forEach((item, index) => {
            item.addEventListener('mouseenter', () => this.moveArrow(item, index));
        });
        this.positionArrow(this.flowchartItems[0]);
    }

    moveArrow(item, index) {
        const itemRect = item.getBoundingClientRect();
        const containerRect = this.flowchartContainer.getBoundingClientRect();
        const newPosition = itemRect.top - containerRect.top + itemRect.height / 2;

        if (newPosition < this.currentPosition) {
            this.arrowDirection = -1;
            this.movingArrow.style.transform = 'rotate(180deg)';
        } else {
            this.arrowDirection = 1;
            this.movingArrow.style.transform = 'rotate(0deg)';
        }

        this.movingArrow.style.top = `${newPosition}px`;
        this.currentPosition = newPosition;
    }

    positionArrow(item) {
        const itemRect = item.getBoundingClientRect();
        const containerRect = this.flowchartContainer.getBoundingClientRect();
        this.movingArrow.style.top = `${itemRect.top - containerRect.top + itemRect.height / 2}px`;
        this.movingArrow.style.left = 'calc(50% - 10px)';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new InteractiveFlowchart();
});