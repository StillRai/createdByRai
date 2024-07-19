export function generateStars() {
    const homeSection = document.querySelector('#home');
    const numberOfStars = 6; 

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        const topPosition = Math.random() * 100;
        const leftPosition = Math.random() * 100;
        const size = Math.random() * 2 + 1; 

        star.style.top = `${topPosition}%`;
        star.style.left = `${leftPosition}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        const animationDuration = Math.random() * 10 + 2; 
        const easingFunctions = ['ease-in-out', 'linear', 'ease-in', 'ease-out'];
        const easingFunction = easingFunctions[Math.floor(Math.random() * easingFunctions.length)];

        star.style.animation = `glow ${animationDuration}s infinite ${easingFunction}`;
        star.style.opacity = (Math.random() * 0.7 + 0.3).toFixed(2); 

        homeSection.appendChild(star);
    }
}
