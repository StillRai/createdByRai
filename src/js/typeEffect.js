class TypewriterEffect {
    constructor() {
        this.currentTimeout = null;
        this.queue = [];
        this.isTyping = false;
        this.currentOpenItem = null;
        this.audio = new Audio('/media/audio/Typing.mp3');
        this.audio.loop = true;
        this.audioLoaded = false;
        this.audioPromise = null;

        this.audio.addEventListener('canplaythrough', () => {
            this.audioLoaded = true;
        });
        this.audio.addEventListener('error', (e) => {
            console.error("Audio error:", e);
        });

        this.init();
    }

    init() {
        document.addEventListener('mouseover', this.handleMouseOver.bind(this));
        document.addEventListener('mouseout', this.handleMouseOut.bind(this));
        document.addEventListener('click', this.handleClick.bind(this));

        document.addEventListener("skillsLoaded", () => {
            setTimeout(() => this.logSkillItems(), 0);
        });

        if (module.hot) {
            module.hot.accept(() => {
                this.logSkillItems();
            });
        }
    }

    logSkillItems() {
        const skillItems = document.querySelectorAll(".skill-item");
    }

    formatText(text) {
        return text.replace(/(\{|\})/g, '<span class="js-brace">$1</span>')
                   .replace(/^(\w+)(?=\s*\{)/g, '<span class="js-tech">$1</span>')
                   .replace(/,\s*(\w+)/g, ', <span class="js-text">$1</span>');
    }

    async playAudio() {
        if (!this.audioLoaded) {
            console.log("Audio not loaded yet, waiting...");
            await new Promise(resolve => {
                this.audio.addEventListener('canplaythrough', resolve, { once: true });
            });
        }

        try {
            if (this.audioPromise && this.audioPromise.status === 'pending') {
                await this.audioPromise;
            }
            this.audioPromise = this.audio.play();
            await this.audioPromise;
        } catch (error) {
            console.error("Error playing audio:", error);
        }
    }

    pauseAudio() {
        if (this.audio.paused) return;
        this.audio.pause();
    }

    async typeText(element, text) {
        let formattedText = this.formatText(text);
        let index = 0;
        element.innerHTML = ''; 

        this.audio.currentTime = 0;
        await this.playAudio();

        const type = () => {
            if (index < formattedText.length) {
                element.innerHTML = formattedText.substring(0, index + 1);
                index++;
                this.currentTimeout = setTimeout(type, 7);
            } else {
                this.isTyping = false;
                this.pauseAudio();
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
        if (window.innerWidth <= 768) return; // Skip for mobile devices
        this.toggleSkillItem(event.target.closest('.skill-item'), true);
    }

    handleMouseOut(event) {
        if (window.innerWidth <= 768) return; // Skip for mobile devices
        this.toggleSkillItem(event.target.closest('.skill-item'), false);
    }

    handleClick(event) {
        const item = event.target.closest('.skill-item');
        if (!item) return;

        if (this.currentOpenItem && this.currentOpenItem !== item) {
            this.toggleSkillItem(this.currentOpenItem, false);
        }

        this.toggleSkillItem(item, this.currentOpenItem !== item);
    }

    async toggleSkillItem(item, show) {
        if (!item) return;

        const id = item.getAttribute("data-target");
        const targetElement = document.getElementById(id);

        if (!targetElement) {
            console.error("No target element found for id:", id);
            return;
        }

        if (show) {
            const text = targetElement.getAttribute("data-text");
            if (!text) {
                console.error("No data-text attribute found for id:", id);
                return;
            }

            const decodedText = this.decodeHTMLEntities(text);
            
            targetElement.style.display = 'block';
            item.classList.add('active');

            if (this.isTyping) {
                this.queue.push({ element: targetElement, text: decodedText });
            } else {
                this.isTyping = true;
                await this.typeText(targetElement, decodedText);
            }

            this.currentOpenItem = item;
        } else {
            targetElement.style.display = 'none';
            targetElement.innerHTML = '';
            item.classList.remove('active');

            if (this.currentOpenItem === item) {
                this.currentOpenItem = null;
            }

            // Clear the timeout to stop any ongoing typewriter effect
            if (this.currentTimeout) {
                clearTimeout(this.currentTimeout);
                this.currentTimeout = null;
            }

            this.isTyping = false;
            this.queue = [];
            this.pauseAudio();
        }
    }

    decodeHTMLEntities(text) {
        const textArea = document.createElement('textarea');
        textArea.innerHTML = text;
        return textArea.value;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new TypewriterEffect();
    
    // Dispatch the custom event after ensuring DOM is ready
    document.dispatchEvent(new Event("skillsLoaded"));
});