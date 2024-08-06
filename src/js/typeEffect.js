console.log("JavaScript file is loaded");

document.addEventListener("DOMContentLoaded", function () {
    console.log("Document is ready");

    function typeText(element, text) {
        console.log("typeText function called"); // Debugging line
        let index = 0;
        element.innerHTML = ''; // Clear any existing text
        function type() {
            if (index < text.length) {
                element.innerHTML += text.charAt(index);
                index++;
                setTimeout(type, 50); // Adjust typing speed here
            }
        }
        type();
    }

    var skillItems = document.querySelectorAll(".skill-item");
    console.log("Skill items found:", skillItems.length); // Log number of skill items found

    skillItems.forEach(function (item) {
        console.log("Adding event listeners to:", item); // Log each item
        item.addEventListener("mouseover", function () {
            var id = this.getAttribute("data-target");
            var targetElement = document.getElementById(id);
            var text = targetElement.getAttribute("data-text");
            console.log("Mouseover on:", id, "Target element:", targetElement, "Text:", text);
            if (targetElement) {
                targetElement.style.display = 'block';
                typeText(targetElement, text);
            }
        });
        item.addEventListener("mouseout", function () {
            var id = this.getAttribute("data-target");
            var targetElement = document.getElementById(id);
            console.log("Mouseout from:", id, "Target element:", targetElement);
            if (targetElement) {
                targetElement.style.display = 'none';
                targetElement.innerHTML = '';
            }
        });
    });
});
