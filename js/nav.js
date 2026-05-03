// nav.js automates nav button actions + dynamic active links
// It includes aria-expanded dynamic changes
// Author: David Žižlavský

// Call this function to initialize the nav logic
function registerNavButton(buttonId, targetId, toggleClass) {
    if (toggleClass === null) {
        console.error("Cannot register NULL class!");
        return;
    }

    const buttonElement = document.getElementById(buttonId);
    const targetElement = document.getElementById(targetId);
    
    if (buttonElement === null) {
        console.error("Cannot register NULL button!");
        return;
    }
    if (targetElement === null) {
        console.error("Cannot register NULL target!");
        return;
    }

    buttonElement.addEventListener("click", () => toggleNavbar(buttonElement, targetElement, toggleClass));
}

// Simply just calls other functions
function toggleNavbar(buttonElement, targetElement, toggleClass) {
    toggleAriaExpanded(buttonElement);
    toggleClassOnTarget(targetElement, toggleClass);
}

// Toggles aria-expanded attribute of the element
function toggleAriaExpanded(element) {
    if (element === null) {
        console.error("Element cannot be NULL!");
        return;
    }
    
    const ariaExpandedValue = element.ariaExpanded;

    if (ariaExpandedValue === "true") {
        element.ariaExpanded = "false";
    } else {
        element.ariaExpanded = "true";
    }
}

// Toggles selected class on the element
function toggleClassOnTarget(targetElement, toggleClass) {
    if (targetElement === null) {
        console.error("Cannot toggle NULL target!");
        return;
    }
    if (toggleClass === null) {
        console.error("Cannot toggle NULL class!");
        return;
    }

    targetElement.classList.toggle(toggleClass);
}

// Initalize dynamic active nav links
function registerNavLinks(sectionsSelector, navLinksSelector, classForActive) {
    const sections = document.querySelectorAll(sectionsSelector);
    const navLinks = document.querySelectorAll(navLinksSelector);
    
    let visibleSections = new Map();
    
    // Create observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.id;
    
            if (entry.isIntersecting) {
                // Currently intersecting
                visibleSections.set(id, entry.intersectionRatio);
            } else {
                // Not intersecting anymore
                visibleSections.delete(id);
            }
        });
    
        // Find the most visible section
        let mostVisible = null;
        let maxRatio = 0;
    
        visibleSections.forEach((ratio, id) => {
            if (ratio > maxRatio) {
                maxRatio = ratio;
                mostVisible = id;
            }
        });

        // Set the class for the active element and remove from inactive elements
        navLinks.forEach(link => link.classList.remove(classForActive));
        if (mostVisible) {
            const activeLink = document.querySelector('nav a[href="#' + mostVisible + '"]');
    
            if (activeLink) {
                activeLink.classList.add(classForActive);
            }
        }
    }, {
        // Hack to only get the sections in the middle:
        threshold: 0,
        rootMargin: "-49.99999% 0px -50% 0px"
    });
    
    // Add intersection observer to all selected sections
    sections.forEach(section => observer.observe(section));
}