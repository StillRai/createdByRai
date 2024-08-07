class TypewriterEffect {
    constructor() {
        this.init();
    }

    init() {
        // Use event delegation
        document.addEventListener('mouseover', this.handleMouseOver.bind(this));
        document.addEventListener('mouseout', this.handleMouseOut.bind(this));

        // Listen for skills loaded event
        document.addEventListener("skillsLoaded", () => {
            console.log("Skills section loaded, checking for skill items");
            setTimeout(() => this.logSkillItems(), 0); // Check after a tick
        });

        if (module.hot) {
            module.hot.accept(() => {
                console.log("HMR update detected");
                this.logSkillItems();
            });
        }
    }

    logSkillItems() {
        const skillItems = document.querySelectorAll(".skill-item");
        console.log("Skill items found:", skillItems.length);
        skillItems.forEach(item => console.log("Skill item:", item.textContent));
    }

    typeText(element, text) {
        console.log("typeText function called with text:", text);
        let index = 0;
        element.innerHTML = ''; // Clear any existing text

        const type = () => {
            if (index < text.length) {
                element.innerHTML += text.charAt(index);
                index++;
                setTimeout(type, 50); // Adjust typing speed here
            }
        };
        type();
    }

    handleMouseOver(event) {
        const item = event.target.closest('.skill-item');
        if (!item) return;

        const id = item.getAttribute("data-target");
        const targetElement = document.getElementById(id);

        if (!targetElement) {
            console.error("No target element found for id:", id);
            return;
        }

        const text = targetElement.getAttribute("data-text");
        console.log("Mouseover detected on:", item.textContent, "Target element:", targetElement, "Text:", text);
        targetElement.classList.add('visible');
        this.typeText(targetElement, text);
    }

    handleMouseOut(event) {
        const item = event.target.closest('.skill-item');
        if (!item) return;

        const id = item.getAttribute("data-target");
        const targetElement = document.getElementById(id);

        if (!targetElement) {
            console.error("No target element found for id:", id);
            return;
        }

        console.log("Mouseout detected from:", item.textContent, "Target element:", targetElement);
        targetElement.classList.remove('visible');
    targetElement.innerHTML = '';
    }
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("Document is ready");
    new TypewriterEffect();
});