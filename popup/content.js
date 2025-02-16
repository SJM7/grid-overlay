let gridOverlay = null;
let currentSettings = null;

function updateGridOverlay(settings) {
    console.log('Updating grid with settings:', settings);
    currentSettings = settings;
    
    if (!gridOverlay && settings.enabled) {
        createGridOverlay();
    }
    
    if (gridOverlay) {
        if (!settings.enabled) {
            gridOverlay.remove();
            gridOverlay = null;
            return;
        }

        
        gridOverlay.innerHTML = '';
        
        
        for (let i = 1; i < settings.columns; i++) {
            const verticalLine = document.createElement('div');
            const leftPosition = (i * (100 / (settings.columns - 1))) - (settings.gap / 2);
            
            verticalLine.style.cssText = `
                position: absolute;
                top: 0;
                left: calc(${leftPosition}% - 0.5px + ${settings.xOffset}px);
                width: 1px;
                height: 100%;
                background-color: ${settings.color};
                opacity: ${settings.opacity};
            `;
            gridOverlay.appendChild(verticalLine);
        }

        
        for (let i = 1; i < settings.rows; i++) {
            const horizontalLine = document.createElement('div');
            const topPosition = (i * (100 / (settings.rows - 1))) - (settings.gap / 2);
            
            horizontalLine.style.cssText = `
                position: absolute;
                left: 0;
                top: calc(${topPosition}% - 0.5px + ${settings.yOffset}px);
                width: 100%;
                height: 1px;
                background-color: ${settings.color};
                opacity: ${settings.opacity};
            `;
            gridOverlay.appendChild(horizontalLine);
        }
    }
}

function createGridOverlay() {
    gridOverlay = document.createElement('div');
    gridOverlay.id = 'alignment-grid-overlay';
    gridOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 9999;
        pointer-events: none;
    `;
    document.body.appendChild(gridOverlay);
    console.log('Grid overlay created and added to page');
}


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('Message received in content script:', request);
    if (request.action === 'updateGrid') {
        updateGridOverlay(request.settings);
    }
});


chrome.storage.local.get(['gridSettings'], (result) => {
    console.log('Initial settings loaded:', result);
    if (result.gridSettings) {
        updateGridOverlay(result.gridSettings);
    }
});