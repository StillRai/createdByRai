class TypewriterEffect {
    constructor() {
        this.currentTimeout = null;
        this.queue = [];
        this.isTyping = false;
        this.init();
    }

    init() {
        document.addEventListener('mouseover', this.handleMouseOver.bind(this));
        document.addEventListener('mouseout', this.handleMouseOut.bind(this));

        document.addEventListener("skillsLoaded", () => {
            console.log("Skills section loaded, checking for skill items");
            setTimeout(() => this.logSkillItems(), 0);
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

    formatText(text) {
        return text.replace(/(\{|\})/g, '<span class="js-brace">$1</span>')
                   .replace(/^(\w+)(?=\s*\{)/g, '<span class="js-tech">$1</span>')
                   .replace(/,\s*(\w+)/g, ', <span class="js-text">$1</span>');
    }
 
    typeText(element, text) {
        console.log("typeText function called with text:", text);
        let formattedText = this.formatText(text);
        let index = 0;
        element.innerHTML = ''; // Clear any existing text

        const type = () => {
            if (index < formattedText.length) {
                element.innerHTML = formattedText.substring(0, index + 1);
                index++;
                this.currentTimeout = setTimeout(type, 7);
            } else {
                this.isTyping = false;
                if (this.queue.length > 0) {
                    const nextTask = this.queue.shift();
                    this.typeText(nextTask.element, nextTask.text);
                }
            }
        };

        // Clear any existing timeout before starting a new one
        if (this.currentTimeout) {
            clearTimeout(this.currentTimeout);
        }
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
        if (!text) {
            console.error("No data-text attribute found for id:", id);
            return;
        }

        // Decode HTML entities in the text
        const decodedText = this.decodeHTMLEntities(text);

        console.log("Mouseover detected on:", item.textContent, "Target element:", targetElement, "Text:", decodedText);
        targetElement.style.display = 'block';

        if (this.isTyping) {
            this.queue.push({ element: targetElement, text: decodedText });
        } else {
            this.isTyping = true;
            this.typeText(targetElement, decodedText);
        }
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
        targetElement.style.display = 'none';
        targetElement.innerHTML = '';

        // Clear the timeout to stop any ongoing typewriter effect
        if (this.currentTimeout) {
            clearTimeout(this.currentTimeout);
            this.currentTimeout = null;
        }

        this.isTyping = false;
        this.queue = [];
    }

    decodeHTMLEntities(text) {
        const textArea = document.createElement('textarea');
        textArea.innerHTML = text;
        return textArea.value;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("Document is ready");
    new TypewriterEffect();
    
    // Dispatch the custom event after ensuring DOM is ready
    document.dispatchEvent(new Event("skillsLoaded"));
});
