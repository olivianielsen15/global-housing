// Initialize the globe
let globe;
let currentLayer = 'deficit';

// Layer configurations
const layerConfig = {
    deficit: {
        title: 'Housing Deficit per Capita',
        description: 'Number of housing units needed per 1,000 people to meet demand. Higher values indicate more severe housing shortages.',
        dataKey: 'housingDeficitPerCapita',
        scale: [0, 35],
        unit: ' units/1000 people'
    },
    mortgage: {
        title: 'Mortgage to GDP Ratio',
        description: 'Total mortgage debt as a percentage of GDP. Higher values indicate greater household leverage and mortgage market development.',
        dataKey: 'mortgageToGDP',
        scale: [0, 130],
        unit: '% of GDP'
    },
    expenditure: {
        title: 'Government Housing Expenditure / GDP',
        description: 'Government spending on housing and community amenities as a percentage of GDP. Higher values indicate greater public investment.',
        dataKey: 'housingExpenditureToGDP',
        scale: [0, 2.5],
        unit: '% of GDP'
    }
};

// Color scale function
function getColor(value, minVal, maxVal) {
    const normalized = (value - minVal) / (maxVal - minVal);

    if (normalized < 0.2) return '#00cc00';      // Very Low - Green
    if (normalized < 0.4) return '#66ff66';      // Low - Light Green
    if (normalized < 0.6) return '#ffcc00';      // Medium - Yellow
    if (normalized < 0.8) return '#ff6600';      // Medium-High - Orange
    return '#ff0000';                             // High - Red
}

// Initialize globe visualization
function initGlobe() {
    const container = document.getElementById('globe-container');

    globe = Globe()
        (container)
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
        .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
        .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
        .width(container.offsetWidth)
        .height(container.offsetHeight)
        .pointsData(housingData)
        .pointLat('lat')
        .pointLng('lng')
        .pointColor(d => {
            const config = layerConfig[currentLayer];
            const value = d[config.dataKey];
            return getColor(value, config.scale[0], config.scale[1]);
        })
        .pointAltitude(0.01)
        .pointRadius(0.6)
        .pointLabel(d => {
            const config = layerConfig[currentLayer];
            const value = d[config.dataKey];
            return `
                <div style="
                    background: rgba(0, 0, 0, 0.9);
                    padding: 12px 16px;
                    border-radius: 8px;
                    border: 2px solid #4facfe;
                    color: white;
                    font-family: 'Segoe UI', sans-serif;
                    max-width: 250px;
                ">
                    <div style="font-size: 16px; font-weight: bold; margin-bottom: 8px; color: #00f2fe;">
                        ${d.country}
                    </div>
                    <div style="font-size: 14px; line-height: 1.5;">
                        <strong>${config.title}:</strong><br>
                        ${value.toFixed(2)}${config.unit}
                    </div>
                </div>
            `;
        })
        .onPointHover(point => {
            container.style.cursor = point ? 'pointer' : 'default';
            if (point) {
                updateStatsPanel(point);
            } else {
                resetStatsPanel();
            }
        })
        .onPointClick(point => {
            if (point) {
                // Rotate globe to center on clicked country
                globe.pointOfView({
                    lat: point.lat,
                    lng: point.lng,
                    altitude: 1.5
                }, 1000);
            }
        });

    // Auto-rotate
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.5;

    // Handle window resize
    window.addEventListener('resize', () => {
        globe.width(container.offsetWidth);
        globe.height(container.offsetHeight);
    });
}

// Update stats panel with country information
function updateStatsPanel(point) {
    const statsPanel = document.getElementById('stats-panel');
    const config = layerConfig[currentLayer];

    statsPanel.innerHTML = `
        <h4>${point.country}</h4>
        <div class="country-stats">
            <p><strong>Housing Deficit per Capita:</strong> ${point.housingDeficitPerCapita.toFixed(2)} units/1000 people</p>
            <p><strong>Mortgage to GDP:</strong> ${point.mortgageToGDP.toFixed(2)}% of GDP</p>
            <p><strong>Govt Housing Expenditure:</strong> ${point.housingExpenditureToGDP.toFixed(2)}% of GDP</p>
        </div>
    `;
}

// Reset stats panel
function resetStatsPanel() {
    const statsPanel = document.getElementById('stats-panel');
    statsPanel.innerHTML = '<h4>Hover over a country for details</h4>';
}

// Update layer display
function updateLayer(layer) {
    currentLayer = layer;
    const config = layerConfig[layer];

    // Update UI
    document.getElementById('current-layer-title').textContent = config.title;
    document.getElementById('current-layer-description').textContent = config.description;

    // Update button states
    document.querySelectorAll('.layer-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.layer === layer) {
            btn.classList.add('active');
        }
    });

    // Update globe points
    if (globe) {
        globe.pointColor(d => {
            const value = d[config.dataKey];
            return getColor(value, config.scale[0], config.scale[1]);
        });
    }

    // Reset stats panel
    resetStatsPanel();
}

// Event listeners for layer buttons
document.addEventListener('DOMContentLoaded', () => {
    // Initialize globe
    initGlobe();

    // Add click handlers to layer buttons
    document.querySelectorAll('.layer-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            updateLayer(btn.dataset.layer);
        });
    });
});

// Statistics calculation
function calculateStats() {
    const stats = {
        deficit: { min: Infinity, max: -Infinity, avg: 0 },
        mortgage: { min: Infinity, max: -Infinity, avg: 0 },
        expenditure: { min: Infinity, max: -Infinity, avg: 0 }
    };

    housingData.forEach(d => {
        // Deficit stats
        stats.deficit.min = Math.min(stats.deficit.min, d.housingDeficitPerCapita);
        stats.deficit.max = Math.max(stats.deficit.max, d.housingDeficitPerCapita);
        stats.deficit.avg += d.housingDeficitPerCapita;

        // Mortgage stats
        stats.mortgage.min = Math.min(stats.mortgage.min, d.mortgageToGDP);
        stats.mortgage.max = Math.max(stats.mortgage.max, d.mortgageToGDP);
        stats.mortgage.avg += d.mortgageToGDP;

        // Expenditure stats
        stats.expenditure.min = Math.min(stats.expenditure.min, d.housingExpenditureToGDP);
        stats.expenditure.max = Math.max(stats.expenditure.max, d.housingExpenditureToGDP);
        stats.expenditure.avg += d.housingExpenditureToGDP;
    });

    const count = housingData.length;
    stats.deficit.avg /= count;
    stats.mortgage.avg /= count;
    stats.expenditure.avg /= count;

    console.log('Global Housing Statistics:', stats);
}

// Calculate stats on load
calculateStats();
