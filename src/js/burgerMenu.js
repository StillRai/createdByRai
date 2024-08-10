export function initializeBurgerMenu() {
    const burgerMenu = document.getElementById('burger-menu');
    const navLinksMobile = document.getElementById('nav-links-mobile');
    const closeMenu = document.getElementById('close-menu');

    if (burgerMenu && navLinksMobile && closeMenu) {
        burgerMenu.addEventListener('click', () => {
            navLinksMobile.classList.toggle('hidden');
            navLinksMobile.classList.toggle('flex');
            navLinksMobile.classList.toggle('active');
        });

        closeMenu.addEventListener('click', () => {
            navLinksMobile.classList.add('hidden');
            navLinksMobile.classList.remove('flex');
            navLinksMobile.classList.remove('active');
        });

        window.addEventListener('click', (e) => {
            if (!navLinksMobile.contains(e.target) && !burgerMenu.contains(e.target)) {
                navLinksMobile.classList.add('hidden');
                navLinksMobile.classList.remove('flex');
                navLinksMobile.classList.remove('active');
            }
        });

        // Mobile dropdown behavior
        const magicLinkMobile = document.querySelector('.nav-links-mobile .group > a');
        const magicDropdownMobile = document.querySelector('.nav-links-mobile .group .group-hover\\:block');

        if (magicLinkMobile && magicDropdownMobile) {
            magicLinkMobile.addEventListener('click', (e) => {
                e.preventDefault();
                magicDropdownMobile.classList.toggle('hidden');
                magicDropdownMobile.classList.toggle('block');
            });
        }
    }

    // Desktop dropdown behavior
    const theMagicGroup = document.getElementById('theMagicGroup');
    const theMagicDropdown = document.getElementById('theMagicDropdown');

    if (theMagicGroup && theMagicDropdown) {
        theMagicGroup.addEventListener('mouseenter', () => {
            theMagicDropdown.classList.remove('hidden');
        });

        theMagicGroup.addEventListener('mouseleave', () => {
            theMagicDropdown.classList.add('hidden');
        });

        theMagicDropdown.addEventListener('mouseenter', () => {
            theMagicDropdown.classList.remove('hidden');
        });

        theMagicDropdown.addEventListener('mouseleave', () => {
            theMagicDropdown.classList.add('hidden');
        });
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    initializeBurgerMenu();
    if (window.feather) {
        window.feather.replace();
    }
});