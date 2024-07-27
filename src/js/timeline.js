document.addEventListener("DOMContentLoaded", function() {
    const timelineItems = document.querySelectorAll(".timeline-item");

    console.log("Timeline items:", timelineItems);

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.5
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const item = entry.target;
                console.log("Item intersecting:", item);
                item.classList.add("active");
                const info = document.createElement("div");
                info.classList.add("timeline-info");

                const index = Array.from(timelineItems).indexOf(item);
                if (window.innerWidth > 768) {
                    info.classList.add(index % 2 === 0 ? "left" : "right");
                } else {
                    info.classList.add(index % 2 === 0 ? "top" : "bottom");
                }

                info.textContent = item.dataset.info;
                item.appendChild(info);
                info.style.display = "block";

                setTimeout(() => {
                    observer.unobserve(item);
                }, 500);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const startYear = 2003;
    const endYear = 2025;

    timelineItems.forEach((item, index) => {
        const year = parseInt(item.dataset.year, 10);
        const positionPercentage = ((year - startYear) / (endYear - startYear)) * 100;

        if (window.innerWidth > 768) {
            item.style.left = `${positionPercentage}%`;
        } else {
            item.style.top = `${positionPercentage}%`;
        }

        console.log(`Observing item: ${item.dataset.year} at ${positionPercentage}%`);

        setTimeout(() => {
            observer.observe(item);
        }, index * 500);
    });
});
