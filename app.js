// Initialize the globe
let globe;
let currentLayer = 'deficit';

// Layer configurations (updated with real data field names)
const layerConfig = {
    deficit: {
        title: 'Housing Deficit per Capita',
        description: 'Estimated housing units needed per 1,000 people. Based on UN-Habitat and World Bank data (2024). Higher values indicate severe housing shortages.',
        dataKey: 'housingDeficitPerCapita',
        scale: [0, 40],
        unit: ' units/1000 people'
    },
    debt: {
        title: 'Household Debt to GDP Ratio',
        description: 'Total household debt (primarily mortgages) as percentage of GDP. Data from IMF Global Debt Database & World Bank (2024). Higher values indicate greater household leverage.',
        dataKey: 'householdDebtToGDP',
        scale: [0, 135],
        unit: '% of GDP'
    },
    expenditure: {
        title: 'Government Housing Expenditure / GDP',
        description: 'Government spending on housing and allowances as percentage of GDP. From OECD Affordable Housing Database (2024-2025). Higher values show greater public investment.',
        dataKey: 'housingExpenditureToGDP',
        scale: [0, 3.5],
        unit: '% of GDP'
    }
};

// Color scale function - improved for heat map visibility
function getColor(value, minVal, maxVal) {
    if (value === null || value === undefined) return 'rgba(150, 150, 150, 0.3)'; // Gray for no data

    const normalized = Math.min(Math.max((value - minVal) / (maxVal - minVal), 0), 1);

    // More vibrant heat map colors
    if (normalized < 0.15) return 'rgba(0, 204, 102, 0.9)';      // Dark Green - Very Low
    if (normalized < 0.3) return 'rgba(102, 255, 102, 0.85)';    // Green - Low
    if (normalized < 0.5) return 'rgba(255, 255, 0, 0.85)';      // Yellow - Medium
    if (normalized < 0.7) return 'rgba(255, 153, 51, 0.85)';     // Orange - Medium-High
    if (normalized < 0.85) return 'rgba(255, 69, 0, 0.9)';       // Red-Orange - High
    return 'rgba(204, 0, 0, 0.95)';                               // Dark Red - Very High
}

// Create a lookup map for fast data access by ISO code
const dataByISO = {};
housingData.forEach(d => {
    dataByISO[d.iso] = d;
});

// Initialize globe visualization with choropleth (heat map)
function initGlobe() {
    const container = document.getElementById('globe-container');

    globe = Globe()
        (container)
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
        .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
        .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
        .width(container.offsetWidth)
        .height(container.offsetHeight)

        // Choropleth configuration - color countries based on data
        .hexPolygonsData(fetch('//unpkg.com/world-atlas/countries-110m.json')
            .then(res => res.json())
            .then(countries => {
                return countries.features;
            })
        )
        .hexPolygonResolution(3)
        .hexPolygonMargin(0.3)
        .hexPolygonUseDots(false)
        .hexPolygonColor(feat => {
            const iso = feat.properties.ISO_A3;
            const countryData = dataByISO[iso];

            if (!countryData) {
                return 'rgba(100, 100, 100, 0.15)'; // Gray for countries without data
            }

            const config = layerConfig[currentLayer];
            const value = countryData[config.dataKey];
            return getColor(value, config.scale[0], config.scale[1]);
        })
        .hexPolygonLabel(feat => {
            const iso = feat.properties.ISO_A3;
            const countryData = dataByISO[iso];

            if (!countryData) {
                return `
                    <div style="
                        background: rgba(0, 0, 0, 0.85);
                        padding: 10px 14px;
                        border-radius: 6px;
                        border: 1px solid #666;
                        color: white;
                        font-family: 'Segoe UI', sans-serif;
                    ">
                        <div style="font-size: 14px; font-weight: bold; color: #ccc;">
                            ${feat.properties.NAME || 'Unknown'}
                        </div>
                        <div style="font-size: 12px; color: #999; margin-top: 4px;">
                            No data available
                        </div>
                    </div>
                `;
            }

            const config = layerConfig[currentLayer];
            const value = countryData[config.dataKey];

            return `
                <div style="
                    background: rgba(0, 0, 0, 0.95);
                    padding: 14px 18px;
                    border-radius: 10px;
                    border: 2px solid #4facfe;
                    color: white;
                    font-family: 'Segoe UI', sans-serif;
                    max-width: 300px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.4);
                ">
                    <div style="font-size: 17px; font-weight: bold; margin-bottom: 10px; color: #00f2fe;">
                        ${countryData.country}
                    </div>
                    <div style="font-size: 14px; line-height: 1.6; border-top: 1px solid rgba(255,255,255,0.2); padding-top: 8px;">
                        <div style="margin: 6px 0;">
                            <strong style="color: #4facfe;">Housing Deficit:</strong>
                            <span style="float: right; color: #fff;">${countryData.housingDeficitPerCapita.toFixed(1)} units/1000</span>
                        </div>
                        <div style="margin: 6px 0;">
                            <strong style="color: #4facfe;">Household Debt/GDP:</strong>
                            <span style="float: right; color: #fff;">${countryData.householdDebtToGDP.toFixed(1)}%</span>
                        </div>
                        <div style="margin: 6px 0;">
                            <strong style="color: #4facfe;">Govt Expenditure/GDP:</strong>
                            <span style="float: right; color: #fff;">${countryData.housingExpenditureToGDP.toFixed(2)}%</span>
                        </div>
                    </div>
                    <div style="font-size: 11px; color: #888; margin-top: 8px; padding-top: 6px; border-top: 1px solid rgba(255,255,255,0.1);">
                        <strong style="color: #00f2fe;">Current layer:</strong> ${config.title}
                    </div>
                </div>
            `;
        })
        .onHexPolygonHover(feat => {
            container.style.cursor = feat ? 'pointer' : 'default';
            if (feat) {
                const iso = feat.properties.ISO_A3;
                const countryData = dataByISO[iso];
                if (countryData) {
                    updateStatsPanel(countryData);
                } else {
                    resetStatsPanel();
                }
            } else {
                resetStatsPanel();
            }
        })
        .onHexPolygonClick(feat => {
            if (feat) {
                // Get country centroid for camera positioning
                const iso = feat.properties.ISO_A3;
                const countryData = dataByISO[iso];
                if (countryData) {
                    // Simplified center calculation - you could improve this
                    const bounds = feat.geometry.coordinates[0];
                    let latSum = 0, lngSum = 0, count = 0;

                    // This is a simplified approach
                    globe.pointOfView({ altitude: 1.5 }, 1000);
                }
            }
        });

    // Auto-rotate
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.35;

    // Handle window resize
    window.addEventListener('resize', () => {
        globe.width(container.offsetWidth);
        globe.height(container.offsetHeight);
    });
}

// Update stats panel with country information
function updateStatsPanel(countryData) {
    const statsPanel = document.getElementById('stats-panel');
    const config = layerConfig[currentLayer];
    const currentValue = countryData[config.dataKey];
    const normalizedValue = (currentValue - config.scale[0]) / (config.scale[1] - config.scale[0]);
    const percentile = Math.round(normalizedValue * 100);

    statsPanel.innerHTML = `
        <h4>${countryData.country}</h4>
        <div class="country-stats">
            <p><strong>Housing Deficit per Capita:</strong> ${countryData.housingDeficitPerCapita.toFixed(2)} units/1000 people</p>
            <p><strong>Household Debt to GDP:</strong> ${countryData.householdDebtToGDP.toFixed(1)}% of GDP</p>
            <p><strong>Govt Housing Expenditure:</strong> ${countryData.housingExpenditureToGDP.toFixed(2)}% of GDP</p>
            <p style="margin-top: 10px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.2);">
                <strong style="color: #00f2fe;">Current Metric:</strong> ${currentValue.toFixed(2)}${config.unit}
            </p>
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

    // Update globe colors
    if (globe) {
        globe.hexPolygonColor(feat => {
            const iso = feat.properties.ISO_A3;
            const countryData = dataByISO[iso];

            if (!countryData) {
                return 'rgba(100, 100, 100, 0.15)';
            }

            const value = countryData[config.dataKey];
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
        deficit: { min: Infinity, max: -Infinity, avg: 0, count: 0 },
        debt: { min: Infinity, max: -Infinity, avg: 0, count: 0 },
        expenditure: { min: Infinity, max: -Infinity, avg: 0, count: 0 }
    };

    housingData.forEach(d => {
        // Deficit stats
        if (d.housingDeficitPerCapita !== null && d.housingDeficitPerCapita !== undefined) {
            stats.deficit.min = Math.min(stats.deficit.min, d.housingDeficitPerCapita);
            stats.deficit.max = Math.max(stats.deficit.max, d.housingDeficitPerCapita);
            stats.deficit.avg += d.housingDeficitPerCapita;
            stats.deficit.count++;
        }

        // Debt stats
        if (d.householdDebtToGDP !== null && d.householdDebtToGDP !== undefined) {
            stats.debt.min = Math.min(stats.debt.min, d.householdDebtToGDP);
            stats.debt.max = Math.max(stats.debt.max, d.householdDebtToGDP);
            stats.debt.avg += d.householdDebtToGDP;
            stats.debt.count++;
        }

        // Expenditure stats
        if (d.housingExpenditureToGDP !== null && d.housingExpenditureToGDP !== undefined) {
            stats.expenditure.min = Math.min(stats.expenditure.min, d.housingExpenditureToGDP);
            stats.expenditure.max = Math.max(stats.expenditure.max, d.housingExpenditureToGDP);
            stats.expenditure.avg += d.housingExpenditureToGDP;
            stats.expenditure.count++;
        }
    });

    if (stats.deficit.count > 0) stats.deficit.avg /= stats.deficit.count;
    if (stats.debt.count > 0) stats.debt.avg /= stats.debt.count;
    if (stats.expenditure.count > 0) stats.expenditure.avg /= stats.expenditure.count;

    console.log('Global Housing Statistics:', stats);
    console.log(`Data coverage: ${housingData.length} countries`);
}

// Calculate stats on load
calculateStats();
