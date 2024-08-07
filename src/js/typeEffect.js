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
                const currentChar = text[index];
                const span = document.createElement('span');
                
                if (currentChar === '{' || currentChar === '}') {
                    span.classList.add('js-brace');
                    span.textContent = currentChar;
                } else if (index === 0 || (text[index - 1] === ' ' && text.substring(index, text.indexOf('{')).trim().length > 0)) {
                    // This is the start of the tech name
                    span.classList.add('js-tech');
                    let techName = '';
                    while (index < text.length && text[index] !== '{') {
                        techName += text[index];
                        index++;
                    }
                    span.textContent = techName.trim();
                    index--; // Adjust for the extra increment
                } else {
                    span.textContent = currentChar;
                }
                
                element.appendChild(span);
                index++;
                setTimeout(type, 25); // Increased typing speed for longer texts
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