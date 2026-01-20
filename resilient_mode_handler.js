
// Add to existing globe click handler
let resilientDesignModeActive = false;

function activateResilientDesignMode() {
    resilientDesignModeActive = !resilientDesignModeActive;
    const btn = document.getElementById('resilient-design-btn');

    if (resilientDesignModeActive) {
        btn.style.background = 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)';
        btn.style.transform = 'scale(1.05)';
        alert('🏠 Resilient Design Mode Activated!\n\nClick on any country to see context-specific resilient home designs adapted to local risks, climate, materials, and culture.\n\nClick the button again to deactivate.');
    } else {
        btn.style.background = 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)';
        btn.style.transform = 'scale(1)';
    }
}

// Intercept polygon clicks when in resilient design mode
const originalOnPolygonClick = globe.onPolygonClick;
globe.onPolygonClick = (polygon) => {
    if (resilientDesignModeActive && polygon && polygon.properties) {
        const isoCode = polygon.properties.ISO_A3;
        if (isoCode) {
            showDesignModal(isoCode);
            return; // Don't execute original click handler
        }
    }
    // Otherwise execute original behavior
    if (originalOnPolygonClick) {
        originalOnPolygonClick(polygon);
    }
};
