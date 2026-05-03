// tab-switch.js provides a simple way to control tab switching
// This script is flexible, can be eventually used on more places to switch tabs
// Author: David Žižlavský

// Holds button and tab elements
class TabData {
    // Constructor uses ids to get elements
    constructor(idButton, idTab) {
        const elementButton = document.getElementById(idButton);
        const elementTab = document.getElementById(idTab);

        if (elementButton === null) {
            console.error("Element for button not found!");
            return;
        }
        if (elementTab === null) {
            console.error("Element for tab not found!");
            return;
        }

        this.elementButton = elementButton;
        this.elementTab = elementTab;
    }
}

// Tab group objects holds the current tab index and array of tab data objects
class TabGroup {
    constructor(tabDataArray) {
        this.state = null; // Gets a value after registering the group
        this.tabDataArray = tabDataArray;
    }
}

// Stores tab groups in one array
let tabGroups = [];

// Use this function to register TabGroup into the system
function registerTabGroup(tabGroup) {
    if (tabGroup === null) {
        console.error("Cannot register NULL tab!");
        return;
    }
    tabGroups.push(tabGroup);
    
    let activeId = -1;
    tabGroup.tabDataArray.forEach((tabData, index) => {
        // Add event listeners to all buttons
        tabData.elementButton.addEventListener("click", () => {
            activateTab(tabGroup, index);
        });

        if (tabData.elementButton.classList.contains("active")) {
            activeId = index;
        }
    });

    // If active button was not found, we can actually procced (but print warning)
    if (activeId === -1) {
        console.warn("Active button not found, adding first index");
        activeId = 0;
    }

    activateTab(tabGroup, activeId);
}

// Function used to activate specific tab for specific group
function activateTab(tabGroup, tabIndex) {
    tabGroup.tabDataArray.forEach((tabData, id) => {
        if (tabData.elementButton === null) {
            console.error("Element button cannot be null!");
            return;
        } 
        if (tabData.elementTab === null) {
            console.error("Element tab cannot be null!");
            return;
        }

        if (tabIndex === id) {
            // Newly active
            tabData.elementButton.setAttribute("aria-selected", "true");
            tabData.elementButton.classList.add("active");
            tabData.elementTab.classList.remove("display-none");
            tabData.elementTab.hidden = false;
        } else {
            // Now inactive
            tabData.elementButton.setAttribute("aria-selected", "false");
            tabData.elementButton.classList.remove("active");
            tabData.elementTab.classList.add("display-none");
            tabData.elementTab.hidden = true;
        }
    });
    tabGroup.state = tabIndex; // Assign state

    // Dependency: css-effect.js
    // Fix effect not applying when tab is switched 
    document.querySelectorAll('.tab-panel .reveal').forEach((element) => {
        requestAnimationFrame(() => {
            manualEffectActivation(element, 'visible');
        });
    });
}