document.addEventListener("DOMContentLoaded", function () {
    console.log("Document is ready");

    function typeText(element, text) {
        let index = 0;
        element.innerHTML = '';
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
    skillItems.forEach(function (item) {
        item.addEventListener("mouseover", function () {
            var id = this.getAttribute("data-target");
            var targetElement = document.getElementById(id);
            var text = targetElement.getAttribute("data-text");
            if (targetElement) {
                targetElement.style.display = 'block'; // Ensure the element is visible
                typeText(targetElement, text);
            }
        });
        item.addEventListener("mouseout", function () {
            var id = this.getAttribute("data-target");
            var targetElement = document.getElementById(id);
            if (targetElement) {
                targetElement.style.display = 'none'; // Hide the element on mouse out
                targetElement.innerHTML = ''; // Clear text on mouse out
            }
        });
    });

    // For touch devices
    skillItems.forEach(function (item) {
        item.addEventListener("touchstart", function () {
            var id = this.getAttribute("data-target");
            var targetElement = document.getElementById(id);
            var text = targetElement.getAttribute("data-text");
            if (targetElement) {
                targetElement.style.display = 'block'; // Ensure the element is visible
                typeText(targetElement, text);
            }
        });
        item.addEventListener("touchend", function () {
            var id = this.getAttribute("data-target");
            var targetElement = document.getElementById(id);
            if (targetElement) {
                targetElement.style.display = 'none'; // Hide the element on touch end
                targetElement.innerHTML = ''; // Clear text on touch end
            }
        });
    });
});
