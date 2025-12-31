# Global Housing Data Visualization

An interactive 3D globe visualization showcasing housing-related metrics for countries around the world.

## Features

### Three Data Layers

1. **Housing Deficit per Capita**
   - Shows the number of housing units needed per 1,000 people
   - Highlights countries with severe housing shortages (red) vs. adequate supply (green)

2. **Mortgage to GDP Ratio**
   - Displays total mortgage debt as a percentage of GDP
   - Indicates household leverage and mortgage market development

3. **Government Housing Expenditure / GDP**
   - Shows government spending on housing as a percentage of GDP
   - Reveals public investment priorities in housing

### Interactive Features

- **Layer Switching**: Click buttons on the left panel to switch between data layers
- **Country Details**: Hover over any country to see all three metrics
- **Globe Navigation**:
  - Click and drag to rotate the globe
  - Scroll to zoom in/out
  - Click on a country to center the view
- **Auto-rotation**: The globe rotates automatically for easy viewing
- **Color-coded Heat Map**:
  - Red: High values
  - Orange: Medium-high values
  - Yellow: Medium values
  - Light Green: Low values
  - Dark Green: Very low values

## How to Use

1. Open `index.html` in a modern web browser (Chrome, Firefox, Safari, Edge)
2. Use the layer buttons to switch between different housing metrics
3. Hover over countries to see detailed statistics
4. Click and drag to explore the globe
5. Click on specific countries for focused view

## Data Coverage

The visualization includes data for 48 countries across:
- North America
- South America
- Europe
- Asia
- Africa
- Oceania

## Technology Stack

- **Globe.gl**: WebGL-based 3D globe visualization
- **Three.js**: 3D graphics library (included with Globe.gl)
- **Vanilla JavaScript**: No framework dependencies
- **CSS3**: Modern styling with gradients and backdrop filters

## Browser Requirements

- Modern browser with WebGL support
- JavaScript enabled
- Recommended: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

## Future Enhancements

- Add more countries
- Include time-series data for trend analysis
- Add comparative analytics
- Export functionality for data
- Mobile optimization

## Data Sources

The data in this visualization is sample data for demonstration purposes. In production, this would be connected to real housing data APIs and databases.

## License

This project is open source and available for educational and non-commercial use.
