// Resilient Home Design Prototypes
// Context-specific designs for each country addressing local risks, climate, materials, and culture

const resilientHomeDesigns = {
    'DNK': {
        name: 'Nordic Passive House+',
        risks: ['Flooding', 'Storm surge', 'Winter storms'],
        features: ['Triple-glazed windows', 'Heat recovery ventilation', 'Elevated foundation (flood)', 'Super-insulation (R-60 walls)', 'Solar panels + battery storage', 'Storm-resistant roofing', 'Amphibious foundation option'],
        materials: ['Cross-laminated timber (CLT)', 'Recycled insulation', 'Low-carbon concrete', 'Local stone'],
        climate: ['Passive solar gain', 'Airtight envelope', 'Thermal mass for heat retention', 'Snow load roof design'],
        cultural: ['Hygge interior spaces', 'Large windows for light', 'Minimalist aesthetic', 'Integrated bike storage'],
        cost: 'high',
        description: 'Ultra-efficient passive house adapted for coastal flooding risk with amphibious foundation option and storm resilience.'
    },
    'NOR': {
        name: 'Fjord Climate Cabin',
        risks: ['Avalanche', 'Landslide', 'Heavy snow', 'Flooding'],
        features: ['Reinforced steep-pitch roof (60°)', 'Avalanche deflection walls', 'Seismic foundation anchors', 'Triple insulation', 'Geothermal heating', 'Timber frame flex design', 'Emergency shelter room'],
        materials: ['Norwegian pine timber', 'Stone facade (avalanche protection)', 'Slate roofing', 'Sheep wool insulation'],
        climate: ['Passive House standard', 'Minimal thermal bridging', 'South-facing glazing', 'Wind-resistant form'],
        cultural: ['Hytte (cabin) aesthetic', 'Connection to nature', 'Wood-burning stove', 'Mountain architecture tradition'],
        cost: 'high',
        description: 'Mountain-adapted design with avalanche protection, extreme insulation, and Norwegian timber tradition.'
    },
    'SWE': {
        name: 'Swedish Eco-Villa',
        risks: ['Winter storms', 'Flooding', 'Forest fires'],
        features: ['Modular CLT construction', 'Green roof (insulation + fire buffer)', 'Rainwater harvesting', 'Solar thermal + PV', 'Smart home energy management', 'Wildfire-resistant perimeter', 'Ventilated facade'],
        materials: ['Swedish pine CLT', 'Recycled glass insulation', 'Sedum green roof', 'Natural stone'],
        climate: ['Net-zero energy', 'Passive House certified', 'Thermal mass', 'Natural ventilation'],
        cultural: ['Lagom (balance) philosophy', 'Indoor-outdoor connection', 'Minimalist Scandinavian design', 'Sauna integration'],
        cost: 'high',
        description: 'Net-zero Swedish design combining CLT modularity, green roof, and wildfire resistance with Lagom aesthetic.'
    },
    'FIN': {
        name: 'Finnish Forest House',
        risks: ['Extreme cold (-40°C)', 'Forest fires', 'Heavy snow'],
        features: ['Log construction with thermal upgrade', 'Fire-resistant perimeter clearing', 'Underground thermal storage', 'Arctic-grade windows', 'Snow-shedding roof', 'Emergency diesel generator', 'Root cellar/shelter'],
        materials: ['Finnish log timber', 'Granite foundation', 'Metal roofing', 'Cellulose insulation'],
        climate: ['Extreme insulation (R-80)', 'Heat recovery 95%', 'Thermal mass', 'Wind protection landscaping'],
        cultural: ['Sauna (essential)', 'Mökki (summer cottage) influence', 'Connection to forest', 'Sisu (resilience) philosophy'],
        cost: 'high',
        description: 'Arctic-adapted log home with extreme insulation, fire resistance, and essential sauna for Finnish lifestyle.'
    },
    'JPN': {
        name: 'Resilient Machiya',
        risks: ['Earthquakes (9.0)', 'Tsunamis', 'Typhoons', 'Flooding'],
        features: ['Base isolation system', 'Flexible timber frame', 'Tsunami evacuation tower', 'Typhoon shutters', 'Seismic dampers', 'Elevated critical systems', 'Emergency water/food storage'],
        materials: ['Japanese cedar/cypress', 'Bamboo reinforcement', 'Lightweight tile roofing', 'Rammed earth walls'],
        climate: ['Natural ventilation', 'Deep eaves for sun/rain', 'Tatami thermal regulation', 'Cross-ventilation'],
        cultural: ['Machiya traditional layout', 'Engawa (veranda)', 'Sliding shoji screens', 'Zen garden integration', 'Multi-generational spaces'],
        cost: 'high',
        description: 'Modern interpretation of machiya with base isolation, tsunami tower, and traditional Japanese spatial concepts.'
    },
    'PHL': {
        name: 'Typhoon-Proof Bahay',
        risks: ['Typhoons (8/year)', 'Storm surge', 'Flooding', 'Earthquakes'],
        features: ['Aerodynamic curved roof', 'Hurricane ties (roof-to-foundation)', 'Elevated on stilts (3m)', 'Impact-resistant windows', 'Flood vents', 'Bamboo reinforced concrete', 'Emergency evacuation platform'],
        materials: ['Bamboo (Kawayan)', 'Coconut lumber', 'Nipa palm sustainable harvest', 'Recycled plastic lumber'],
        climate: ['Natural ventilation', 'Wide overhangs', 'Cross-breeze design', 'Reflective cool roof'],
        cultural: ['Bahay Kubo influence', 'Open-air living spaces', 'Community gathering areas', 'Indoor-outdoor flow'],
        cost: 'low',
        description: 'Filipino vernacular updated with typhoon engineering: elevated, aerodynamic, bamboo-reinforced, with traditional bahay openness.'
    },
    // Add more countries as needed - this file can be extended
};

// Make available globally
window.resilientHomeDesigns = resilientHomeDesigns;
