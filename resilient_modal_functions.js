
// Resilient Home Design Modal Functions
function showDesignModal(isoCode) {
    const designs = window.resilientHomeDesigns || {};
    const design = designs[isoCode];

    if (!design) {
        alert('Resilient home design not yet available for this country. Check back soon!');
        return;
    }

    const modal = document.getElementById('design-modal');
    const detailsDiv = document.getElementById('design-details');

    const costLabels = {
        'low': 'Affordable / Low-Income',
        'medium': 'Middle-Income',
        'high': 'High-Income / Advanced Standards'
    };

    detailsDiv.innerHTML = `
        <h1 class="design-title">${design.name}</h1>
        <p class="design-description">${design.description}</p>

        <div class="design-section">
            <h2 class="design-section-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"/>
                    <path d="M12 16V12"/>
                    <path d="M12 8H12.01"/>
                </svg>
                Primary Risks Addressed
            </h2>
            <div class="design-risks">
                ${design.risks.map(risk => `<span class="risk-badge">${risk}</span>`).join('')}
            </div>
        </div>

        <div class="design-section">
            <h2 class="design-section-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 11L12 14L22 4"/>
                    <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16"/>
                </svg>
                Key Resilient Features
            </h2>
            <ul class="design-list">
                ${design.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        </div>

        <div class="design-section">
            <h2 class="design-section-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <path d="M9 3V21"/>
                    <path d="M15 3V21"/>
                    <path d="M3 9H21"/>
                    <path d="M3 15H21"/>
                </svg>
                Recommended Materials
            </h2>
            <div class="design-materials-grid">
                ${design.materials.map(material => `<div class="material-card">${material}</div>`).join('')}
            </div>
        </div>

        <div class="design-section">
            <h2 class="design-section-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6V12L16 14"/>
                </svg>
                Climate Adaptation Strategies
            </h2>
            <ul class="design-list">
                ${design.climate.map(strategy => `<li>${strategy}</li>`).join('')}
            </ul>
        </div>

        <div class="design-section">
            <h2 class="design-section-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"/>
                    <path d="M9 22V12H15V22"/>
                </svg>
                Cultural & Contextual Considerations
            </h2>
            <ul class="design-list">
                ${design.cultural.map(aspect => `<li>${aspect}</li>`).join('')}
            </ul>
        </div>

        <div class="design-section">
            <h2 class="design-section-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2V22"/>
                    <path d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6"/>
                </svg>
                Affordability Tier
            </h2>
            <span class="cost-indicator cost-${design.cost}">${costLabels[design.cost]}</span>
        </div>
    `;

    modal.classList.remove('hidden');
}

function closeDesignModal() {
    const modal = document.getElementById('design-modal');
    modal.classList.add('hidden');
}

// Close modal on background click
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('design-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeDesignModal();
            }
        });
    }
});
