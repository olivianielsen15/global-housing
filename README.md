# Global Housing Data Visualization

An interactive 3D globe heat map visualization showcasing real housing data from authoritative international sources for 91 countries worldwide.

## Data Sources

All data compiled from authoritative 2024-2025 sources:

- **OECD** Affordable Housing Database (2024-2025)
- **World Bank & IMF** Global Debt Database (2024)
- **CAHF** Housing Finance in Africa Yearbook (2024)
- **UN-Habitat** Global Housing Reports (2024)
- **Trading Economics** & The Global Economy database
- **WorldRiskReport 2024** by Bündnis Entwicklung Hilft & IFHV - Natural disaster risk assessment

## Features

### Nine Data Layers (Choropleth Heat Map)

1. **Housing Deficit per Capita**
   - Estimated housing units needed per 1,000 people
   - Based on UN-Habitat and World Bank data
   - Highlights severe housing crises (dark red) vs. well-housed populations (dark green)
   - Range: 0.8 (Singapore) to 38.6 (Ethiopia) units per 1,000 people

2. **Household Debt to GDP Ratio**
   - Total household debt (primarily mortgages) as percentage of GDP
   - Data from IMF Global Debt Database & World Bank
   - Shows countries with high household leverage vs. low debt
   - Range: 1.2% (Nigeria) to 130% (Switzerland)

3. **Government Housing Expenditure / GDP**
   - Government spending on housing and allowances as % of GDP
   - From OECD Affordable Housing Database
   - Reveals public investment priorities in housing
   - Range: 0.05% to 3.2% (Singapore)

4. **Construction Jobs per Capita**
   - Construction sector employment per 1,000 people
   - From ILO and national labor statistics
   - Higher values indicate more construction activity
   - Range: 16.7 to 156.3 jobs per 1,000 people

5. **House Price to Income Ratio**
   - Median house price divided by median annual income
   - From Numbeo, World Bank, and national statistics
   - Higher values indicate less affordable housing
   - Range: 5.1x to 19.7x income

6. **Informal/Substandard Housing Share**
   - Percentage of housing that is informal or substandard
   - From UN-Habitat SDG 11.1.1 indicators
   - Higher values indicate more precarious housing
   - Range: 0.3% to 73.8%

7. **Housing Cost Burden**
   - Percentage of population spending >40% of income on housing
   - From OECD HC1.2 and Eurostat
   - Higher values indicate severe affordability crisis
   - Range: 2.6% to 43.6%

8. **Social Rental Housing Stock**
   - Percentage of housing stock that is social/affordable
   - From OECD PH4.2
   - Higher values indicate stronger social housing programs
   - Range: 0.1% to 30%

9. **Natural Disaster Risk**
   - WorldRiskIndex 2024 score (0-50 scale)
   - Measures risk from earthquakes, floods, cyclones, droughts, sea-level rise
   - From WorldRiskReport 2024 by Bündnis Entwicklung Hilft & IFHV
   - Range: 0.98 (Denmark) to 46.91 (Philippines)

### Interactive Features

- **Choropleth Heat Map**: Countries are colored as polygons based on data values
- **Layer Switching**: Click buttons to switch between nine data layers with real-time updates
- **Country Details**: Hover over any country to see all nine metrics simultaneously
- **Globe Navigation**:
  - Click and drag to rotate the globe
  - Scroll to zoom in/out
  - Auto-rotation for continuous viewing
- **Color-coded Heat Map**:
  - Dark Red: Very high values (worst outcomes)
  - Red-Orange: High values
  - Orange: Medium-high values
  - Yellow: Medium values
  - Green: Low values
  - Dark Green: Very low values (best outcomes)
  - Gray: Countries without data

## How to Use

1. Open `index.html` in a modern web browser (Chrome, Firefox, Safari, Edge)
2. Use the layer buttons to switch between different housing metrics
3. Hover over countries to see detailed statistics
4. Click and drag to explore the globe
5. Click on specific countries for focused view

## Data Coverage

The visualization includes real data for **91 countries** across all continents:

### Geographic Coverage
- **Europe**: 28 countries (comprehensive OECD and Eurostat data)
- **Asia**: 18 countries (East, Southeast, South, and West Asia)
- **Africa**: 26 countries (data from CAHF Yearbook 2024)
- **North America**: 3 countries
- **South America**: 7 countries
- **Oceania**: 2 countries
- **Middle East**: 4 countries
- Plus additional countries from Eastern Europe and Latin America

### Data Quality Notes
- Household debt data primarily from IMF Global Debt Database and World Bank (2024)
- Housing deficit estimates from UN-Habitat, OECD, World Bank, and CAHF reports
- Government expenditure from OECD Affordable Housing Database and national sources
- Natural disaster risk from WorldRiskIndex 2024 (193 countries assessed globally)
- OECD countries have the most comprehensive data coverage
- African data enhanced by CAHF's specialized research
- Eastern European data from Eurostat 2024-2025
- Some values are estimates where direct data is unavailable

## Technology Stack

- **Globe.gl**: WebGL-based 3D globe visualization
- **Three.js**: 3D graphics library (included with Globe.gl)
- **Vanilla JavaScript**: No framework dependencies
- **CSS3**: Modern styling with gradients and backdrop filters

## Browser Requirements

- Modern browser with WebGL support
- JavaScript enabled
- Recommended: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

## Key Insights from the Data

- **Housing Crisis Hotspots**: Ireland (9.1), UK (8.2), and New Zealand (7.8) face severe housing deficits among developed nations
- **Developing World Challenges**: Ethiopia (38.6), Nigeria (35.2), and Bangladesh (34.1) have the highest housing deficits
- **Debt Leaders**: Switzerland (130%), UAE (121%), and Australia (121%) have the highest household debt to GDP ratios
- **Low Debt Countries**: Nigeria (1.2%), Argentina (4.0%), and Egypt (5.0%) have minimal household debt
- **Public Housing Investment**: Singapore (3.2%), France (1.8%), and Denmark (1.4%) lead in government housing expenditure
- **Well-Housed Populations**: Singapore (0.8), Japan (1.1), and Switzerland (1.2) have minimal housing deficits

## Future Enhancements

- Expand to 100+ countries with additional data sources
- Add time-series data for trend analysis (2010-2025)
- Include comparative analytics and country rankings
- Add data export functionality (CSV, JSON)
- Mobile optimization and touch controls
- Additional metrics: homeownership rates, housing affordability indices
- Integration with live data APIs for automatic updates

## License

This project is open source and available for educational and non-commercial use.
