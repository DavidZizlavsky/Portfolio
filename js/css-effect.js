// css-effect.js
// Author: David Žižlavský

// Register on load event - to fix scroll issues on refresh
function registerEffects(effectSelector, classOnObserve) {
    let lastScrollY = window.scrollY;
    
    // Create observer
    const effectObserver = new IntersectionObserver(entries => {
        // Calculate vars based on scroll
        const currentScrollY = window.scrollY;
        const isScrollingDown = currentScrollY > lastScrollY;
        const isScrollingUp = currentScrollY < lastScrollY;

        entries.forEach(element => {
            if (element.isIntersecting && isScrollingDown) {
                element.target.classList.add(classOnObserve);
            }

            if (!element.isIntersecting && isScrollingUp) {
                element.target.classList.remove(classOnObserve);
            }
        });

        lastScrollY = currentScrollY;
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px 0px 0px'
    });
    
    document.querySelectorAll(effectSelector).forEach(element => {
        // If the element is above or inside the viewport- it must be active from the beginning
        if (isElementAboveOrInsideViewport(element)) {
            element.classList.add(classOnObserve);
        }

        effectObserver.observe(element);
    });
}

// Manually check the effect
function manualEffectActivation(element, classOnObserve) {
    if (isElementAboveOrInsideViewport(element)) {
        element.classList.add(classOnObserve);
    } else {
        element.classList.remove(classOnObserve);
    }
}

// Return true if condition is met, otherwise false
function isElementAboveOrInsideViewport(element) {
    const rect = element.getBoundingClientRect();

    return rect.top < window.innerHeight;
}