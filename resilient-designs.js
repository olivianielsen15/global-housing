// Resilient Home Design Prototypes
// Context-specific designs for each country addressing local risks, climate, materials, and culture

const resilientHomeDesigns = {
    "DNK": {
        "name": "Nordic Passive House+",
        "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
        "risks": [
            "Flooding",
            "Storm surge",
            "Winter storms"
        ],
        "features": [
            "Triple-glazed windows",
            "Heat recovery ventilation",
            "Elevated foundation (flood)",
            "Super-insulation (R-60 walls)",
            "Solar panels + battery storage",
            "Storm-resistant roofing",
            "Amphibious foundation option"
        ],
        "materials": [
            "Cross-laminated timber (CLT)",
            "Recycled insulation",
            "Low-carbon concrete",
            "Local stone"
        ],
        "climate": [
            "Passive solar gain",
            "Airtight envelope",
            "Thermal mass for heat retention",
            "Snow load roof design"
        ],
        "cultural": [
            "Hygge interior spaces",
            "Large windows for light",
            "Minimalist aesthetic",
            "Integrated bike storage"
        ],
        "cost": "high",
        "description": "Ultra-efficient passive house adapted for coastal flooding risk with amphibious foundation option and storm resilience."
    },
    "NOR": {
        "name": "Fjord Climate Cabin",
        "image": "https://images.unsplash.com/photo-1520106212299-d99c443e4568?w=800&q=80",
        "risks": [
            "Avalanche",
            "Landslide",
            "Heavy snow",
            "Flooding"
        ],
        "features": [
            "Reinforced steep-pitch roof (60\u00b0)",
            "Avalanche deflection walls",
            "Seismic foundation anchors",
            "Triple insulation",
            "Geothermal heating",
            "Timber frame flex design",
            "Emergency shelter room"
        ],
        "materials": [
            "Norwegian pine timber",
            "Stone facade (avalanche protection)",
            "Slate roofing",
            "Sheep wool insulation"
        ],
        "climate": [
            "Passive House standard",
            "Minimal thermal bridging",
            "South-facing glazing",
            "Wind-resistant form"
        ],
        "cultural": [
            "Hytte (cabin) aesthetic",
            "Connection to nature",
            "Wood-burning stove",
            "Mountain architecture tradition"
        ],
        "cost": "high",
        "description": "Mountain-adapted design with avalanche protection, extreme insulation, and Norwegian timber tradition."
    },
    "SWE": {
        "name": "Swedish Eco-Villa",
        "image": "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&q=80",
        "risks": [
            "Winter storms",
            "Flooding",
            "Forest fires"
        ],
        "features": [
            "Modular CLT construction",
            "Green roof (insulation + fire buffer)",
            "Rainwater harvesting",
            "Solar thermal + PV",
            "Smart home energy management",
            "Wildfire-resistant perimeter",
            "Ventilated facade"
        ],
        "materials": [
            "Swedish pine CLT",
            "Recycled glass insulation",
            "Sedum green roof",
            "Natural stone"
        ],
        "climate": [
            "Net-zero energy",
            "Passive House certified",
            "Thermal mass",
            "Natural ventilation"
        ],
        "cultural": [
            "Lagom (balance) philosophy",
            "Indoor-outdoor connection",
            "Minimalist Scandinavian design",
            "Sauna integration"
        ],
        "cost": "high",
        "description": "Net-zero Swedish design combining CLT modularity, green roof, and wildfire resistance with Lagom aesthetic."
    },
    "FIN": {
        "name": "Finnish Forest House",
        "image": "https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800&q=80",
        "risks": [
            "Extreme cold (-40\u00b0C)",
            "Forest fires",
            "Heavy snow"
        ],
        "features": [
            "Log construction with thermal upgrade",
            "Fire-resistant perimeter clearing",
            "Underground thermal storage",
            "Arctic-grade windows",
            "Snow-shedding roof",
            "Emergency diesel generator",
            "Root cellar/shelter"
        ],
        "materials": [
            "Finnish log timber",
            "Granite foundation",
            "Metal roofing",
            "Cellulose insulation"
        ],
        "climate": [
            "Extreme insulation (R-80)",
            "Heat recovery 95%",
            "Thermal mass",
            "Wind protection landscaping"
        ],
        "cultural": [
            "Sauna (essential)",
            "M\u00f6kki (summer cottage) influence",
            "Connection to forest",
            "Sisu (resilience) philosophy"
        ],
        "cost": "high",
        "description": "Arctic-adapted log home with extreme insulation, fire resistance, and essential sauna for Finnish lifestyle."
    },
    "JPN": {
        "name": "Resilient Machiya",
        "image": "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&q=80",
        "risks": [
            "Earthquakes (9.0)",
            "Tsunamis",
            "Typhoons",
            "Flooding"
        ],
        "features": [
            "Base isolation system",
            "Flexible timber frame",
            "Tsunami evacuation tower",
            "Typhoon shutters",
            "Seismic dampers",
            "Elevated critical systems",
            "Emergency water/food storage"
        ],
        "materials": [
            "Japanese cedar/cypress",
            "Bamboo reinforcement",
            "Lightweight tile roofing",
            "Rammed earth walls"
        ],
        "climate": [
            "Natural ventilation",
            "Deep eaves for sun/rain",
            "Tatami thermal regulation",
            "Cross-ventilation"
        ],
        "cultural": [
            "Machiya traditional layout",
            "Engawa (veranda)",
            "Sliding shoji screens",
            "Zen garden integration",
            "Multi-generational spaces"
        ],
        "cost": "high",
        "description": "Modern interpretation of machiya with base isolation, tsunami tower, and traditional Japanese spatial concepts."
    },
    "PHL": {
        "name": "Typhoon-Proof Bahay",
        "image": "https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=800&q=80",
        "risks": [
            "Typhoons (8/year)",
            "Storm surge",
            "Flooding",
            "Earthquakes"
        ],
        "features": [
            "Aerodynamic curved roof",
            "Hurricane ties (roof-to-foundation)",
            "Elevated on stilts (3m)",
            "Impact-resistant windows",
            "Flood vents",
            "Bamboo reinforced concrete",
            "Emergency evacuation platform"
        ],
        "materials": [
            "Bamboo (Kawayan)",
            "Coconut lumber",
            "Nipa palm sustainable harvest",
            "Recycled plastic lumber"
        ],
        "climate": [
            "Natural ventilation",
            "Wide overhangs",
            "Cross-breeze design",
            "Reflective cool roof"
        ],
        "cultural": [
            "Bahay Kubo influence",
            "Open-air living spaces",
            "Community gathering areas",
            "Indoor-outdoor flow"
        ],
        "cost": "low",
        "description": "Filipino vernacular updated with typhoon engineering: elevated, aerodynamic, bamboo-reinforced, with traditional bahay openness."
    },
    "IDN": {
        "name": "Java Earthquake House",
        "image": "https://images.unsplash.com/photo-1600047509782-20d39509f26d?w=800&q=80",
        "risks": [
            "Earthquakes",
            "Tsunamis",
            "Volcanic eruptions",
            "Flooding"
        ],
        "features": [
            "Flexible bamboo frame",
            "Ductile moment connections",
            "Tsunami vertical evacuation",
            "Volcanic ash-shedding roof",
            "Seismic foundation",
            "Lightweight construction",
            "Emergency shelter room"
        ],
        "materials": [
            "Bamboo (Petung)",
            "Volcanic stone",
            "Recycled timber",
            "Natural fiber insulation"
        ],
        "climate": [
            "Tropical ventilation",
            "High ceilings",
            "Shaded verandas",
            "Rain screen walls"
        ],
        "cultural": [
            "Rumah Joglo influence",
            "Pendopo (open pavilion)",
            "Javanese cosmology alignment",
            "Multi-family compound"
        ],
        "cost": "low",
        "description": "Javanese joglo adapted with seismic bamboo engineering, tsunami escape, and volcanic ash management."
    },
    "CHL": {
        "name": "Chilean Seismic Home",
        "risks": [
            "Mega-earthquakes (8.8-9.5)",
            "Tsunamis",
            "Landslides"
        ],
        "features": [
            "Seismic base isolation",
            "Reinforced concrete shear walls",
            "Tsunami evacuation route",
            "Landslide anchoring",
            "Flexible utilities",
            "Emergency water cistern",
            "Structural redundancy"
        ],
        "materials": [
            "Local pine timber",
            "Engineered wood products",
            "Seismic rebar",
            "Copper roofing"
        ],
        "climate": [
            "Passive solar",
            "Thermal mass",
            "Wind-resistant form",
            "Rain harvesting"
        ],
        "cultural": [
            "Quincho (outdoor BBQ area)",
            "Central courtyard",
            "Multi-generational layout",
            "Mountain/sea views priority"
        ],
        "cost": "medium",
        "description": "World-leading seismic design (Chile has best earthquake codes) with base isolation and tsunami preparedness."
    },
    "USA": {
        "name": "Gulf Coast Resilient Home",
        "image": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
        "risks": [
            "Hurricanes (Cat 5)",
            "Flooding",
            "Tornadoes",
            "Wildfires (West)"
        ],
        "features": [
            "FORTIFIED Gold standard",
            "Impact windows",
            "Continuous load path",
            "Elevated foundation",
            "Safe room (EF5 tornado)",
            "Wildfire ember-resistant (West)",
            "Backup power + water"
        ],
        "materials": [
            "Engineered lumber",
            "Fiber cement siding",
            "Metal roofing",
            "ICF foundation"
        ],
        "climate": [
            "ENERGY STAR",
            "Cool roof",
            "High-SEER HVAC",
            "Spray foam insulation"
        ],
        "cultural": [
            "Front porch tradition",
            "Open floor plan",
            "Garage integration",
            "Regional aesthetics (Craftsman/Ranch/Colonial)"
        ],
        "cost": "high",
        "description": "FORTIFIED standard home with hurricane protection, tornado safe room, and regional style adaptation (Gulf/Midwest/West)."
    },
    "BGD": {
        "name": "Cyclone-Resistant Char House",
        "image": "https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=800&q=80",
        "risks": [
            "Cyclones",
            "Flooding (annual)",
            "River erosion",
            "Sea level rise"
        ],
        "features": [
            "Amphibious floating foundation",
            "Cyclone anchors (ground screws)",
            "Curved aerodynamic form",
            "Flood vents",
            "Rainwater collection",
            "Solar power",
            "Bamboo reinforcement"
        ],
        "materials": [
            "Bamboo",
            "Corrugated metal",
            "Recycled plastic",
            "Jute fiber composite"
        ],
        "climate": [
            "Natural ventilation",
            "Elevated sleeping platform",
            "Monsoon drainage",
            "Shade structures"
        ],
        "cultural": [
            "Char (river island) adaptation",
            "Community cluster design",
            "Courtyard for livestock",
            "Multi-use spaces"
        ],
        "cost": "low",
        "description": "Amphibious design for flood-prone chars with cyclone anchoring, bamboo construction, and climate-vulnerable affordability."
    },
    "NLD": {
        "name": "Dutch Amphibious House",
        "risks": [
            "Sea level rise",
            "River flooding",
            "Storm surge"
        ],
        "features": [
            "Floating foundation",
            "Buoyancy tanks",
            "Flexible utilities",
            "Mooring posts",
            "Flood-resistant materials",
            "Solar panels",
            "Green roof"
        ],
        "materials": [
            "Lightweight concrete",
            "Aluminum frame",
            "Composite panels",
            "Recycled plastics"
        ],
        "climate": [
            "Passive House standard",
            "Heat pump",
            "Triple glazing",
            "Thermal mass"
        ],
        "cultural": [
            "Water-integrated living",
            "Modernist aesthetic",
            "Indoor-outdoor connection",
            "Bicycle storage"
        ],
        "cost": "high",
        "description": "World-leading amphibious design that rises with floodwaters, combining Dutch water engineering with sustainability."
    },
    "THA": {
        "name": "Bangkok Flood House",
        "image": "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
        "risks": [
            "Monsoon flooding",
            "Subsidence",
            "Heat waves"
        ],
        "features": [
            "Elevated on concrete pillars",
            "Flood vents",
            "Water storage tanks",
            "Heat-reflective roof",
            "Natural ventilation",
            "Flexible ground floor (parking/flood)",
            "Rooftop garden"
        ],
        "materials": [
            "Teak timber",
            "Concrete pillars",
            "Thai ceramic tiles",
            "Bamboo screens"
        ],
        "climate": [
            "High ceilings (4m)",
            "Cross-ventilation",
            "Shaded verandas",
            "Evaporative cooling"
        ],
        "cultural": [
            "Traditional Thai elevated house",
            "Spirit house integration",
            "Open sala (pavilion)",
            "Indoor-outdoor living"
        ],
        "cost": "low",
        "description": "Traditional Thai stilt house modernized with flood engineering, heat management, and Bangkok urban density adaptation."
    },
    "AUS": {
        "name": "Bushfire-Proof Homestead",
        "image": "https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?w=800&q=80",
        "risks": [
            "Bushfires",
            "Cyclones (North)",
            "Flooding",
            "Extreme heat"
        ],
        "features": [
            "BAL-FZ (Bushfire Attack Level - Flame Zone)",
            "Metal cladding",
            "Ember-proof vents",
            "Fire-resistant landscaping",
            "Water tanks (firefighting)",
            "Cyclone tie-downs (North)",
            "Passive cooling"
        ],
        "materials": [
            "Steel frame",
            "Fiber cement",
            "Metal roofing",
            "Tempered glass"
        ],
        "climate": [
            "Passive solar design",
            "Thermal mass",
            "Cross-ventilation",
            "Eaves for sun control"
        ],
        "cultural": [
            "Verandah essential",
            "Indoor-outdoor living",
            "BBQ area",
            "Open plan"
        ],
        "cost": "high",
        "description": "Australian bushfire standard (AS 3959) with ember protection, metal construction, and essential verandah lifestyle."
    },
    "ZAF": {
        "name": "Cape Fynbos Fire Home",
        "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
        "risks": [
            "Wildfires",
            "Drought",
            "Water scarcity",
            "Flooding"
        ],
        "features": [
            "Fire-resistant construction",
            "Indigenous plant buffer",
            "Greywater recycling",
            "Rainwater harvesting (200kL)",
            "Solar + battery",
            "Drought-tolerant landscaping",
            "Secure perimeter"
        ],
        "materials": [
            "Rammed earth",
            "Stone",
            "Metal roofing",
            "Fire-rated timber"
        ],
        "climate": [
            "Passive cooling",
            "Thermal mass",
            "Natural ventilation",
            "Shading"
        ],
        "cultural": [
            "Indoor-outdoor flow",
            "Braai (BBQ) area",
            "Security considerations",
            "Cape Dutch influence"
        ],
        "cost": "medium",
        "description": "Wildfire-resistant design for water-scarce Cape with indigenous fynbos landscaping, water independence, and security."
    },
    "ARE": {
        "name": "Gulf Passive Cooling Tower",
        "image": "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=800&q=80",
        "risks": [
            "Extreme heat (50\u00b0C)",
            "Sandstorms",
            "Water scarcity"
        ],
        "features": [
            "Wind tower (badgir)",
            "Thermal mass walls",
            "Courtyard cooling",
            "Triple-glazed UV windows",
            "Greywater recycling",
            "Solar panels",
            "Sandstorm-proof seals"
        ],
        "materials": [
            "Rammed earth",
            "Stone",
            "Adobe",
            "Recycled materials"
        ],
        "climate": [
            "Passive cooling",
            "Night ventilation",
            "Evaporative cooling",
            "Shading systems"
        ],
        "cultural": [
            "Central courtyard",
            "Privacy walls",
            "Majlis (guest area)",
            "Rooftop terrace"
        ],
        "cost": "high",
        "description": "Traditional badgir wind tower updated with modern passive cooling for extreme Gulf heat and sandstorms."
    },
    "MAR": {
        "name": "Moroccan Riad Resilient",
        "risks": [
            "Earthquakes",
            "Drought",
            "Heat waves",
            "Flash floods"
        ],
        "features": [
            "Seismic-reinforced adobe",
            "Central courtyard fountain",
            "Thick thermal walls (60cm)",
            "Rooftop rainwater collection",
            "Greywater system",
            "Flexible timber roof",
            "Evaporative cooling"
        ],
        "materials": [
            "Adobe (pis\u00e9)",
            "Cedar timber",
            "Zellige tiles",
            "Stone"
        ],
        "climate": [
            "Thermal mass",
            "Courtyard microclimate",
            "Natural ventilation",
            "Shading"
        ],
        "cultural": [
            "Riad courtyard",
            "Moroccan tilework",
            "Privacy orientation",
            "Rooftop terraces"
        ],
        "cost": "low",
        "description": "Earthquake-resistant riad with traditional Moroccan courtyard cooling, water harvesting, and vernacular materials."
    },
    "RUS": {
        "name": "Siberian Survivalist Home",
        "risks": [
            "Extreme cold (-60\u00b0C)",
            "Permafrost thaw",
            "Wildfires",
            "Isolation"
        ],
        "features": [
            "Permafrost pile foundation",
            "Extreme insulation (R-100)",
            "Triple-entry airlock",
            "Backup heating (wood/diesel)",
            "Root cellar storage",
            "Solar panels (summer)",
            "Self-sufficient systems"
        ],
        "materials": [
            "Log construction",
            "Stone",
            "Triple-pane windows",
            "Mineral wool insulation"
        ],
        "climate": [
            "Super-insulated",
            "Heat recovery ventilation",
            "Thermal mass",
            "Passive solar"
        ],
        "cultural": [
            "Dacha (country house) tradition",
            "Banya (sauna)",
            "Food storage",
            "Multi-family"
        ],
        "cost": "medium",
        "description": "Siberian extreme cold adaptation with permafrost engineering, survivalist self-sufficiency, and essential banya."
    },
    "CAN": {
        "name": "Arctic Net-Zero Cabin",
        "image": "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
        "risks": [
            "Extreme cold (-50\u00b0C)",
            "Permafrost thaw",
            "Wildfires",
            "Isolation"
        ],
        "features": [
            "Permafrost-adapted foundation",
            "Super-insulation (R-90)",
            "Heat recovery (95%)",
            "Solar + wind hybrid",
            "Battery storage",
            "Backup generator",
            "Water treatment"
        ],
        "materials": [
            "Canadian lumber",
            "SIPs (structural insulated panels)",
            "Local stone",
            "Recycled insulation"
        ],
        "climate": [
            "Passive House Arctic",
            "Triple-glazed windows",
            "Thermal mass",
            "Airtight construction"
        ],
        "cultural": [
            "Connection to nature",
            "Indigenous design principles",
            "Multi-use spaces",
            "Community orientation"
        ],
        "cost": "high",
        "description": "Arctic-certified Passive House with permafrost foundation, indigenous design integration, and net-zero energy."
    },
    "BRA": {
        "name": "Favela Resilience Upgrade",
        "image": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
        "risks": [
            "Landslides",
            "Flooding",
            "Extreme heat",
            "Crime"
        ],
        "features": [
            "Slope stabilization",
            "Reinforced concrete frame",
            "Flood-resistant ground floor",
            "Natural ventilation",
            "Rainwater collection",
            "Solar panels",
            "Secure windows/doors"
        ],
        "materials": [
            "Concrete blocks",
            "Bamboo",
            "Recycled materials",
            "Local timber"
        ],
        "climate": [
            "Cross-ventilation",
            "High ceilings",
            "Shading",
            "Cool roof"
        ],
        "cultural": [
            "Community self-build",
            "Incremental construction",
            "Multi-generational",
            "Outdoor living"
        ],
        "cost": "low",
        "description": "Favela upgrading design with landslide stabilization, incremental affordability, and community-led construction."
    },
    "IND": {
        "name": "Monsoon-Adaptive Courtyard",
        "image": "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=800&q=80",
        "risks": [
            "Monsoon flooding",
            "Earthquakes",
            "Extreme heat",
            "Water scarcity"
        ],
        "features": [
            "Earthquake-resistant confined masonry",
            "Raised plinth (flood)",
            "Central courtyard ventilation",
            "Rainwater harvesting (10kL)",
            "Solar panels",
            "Cool roof",
            "Flexible ground floor"
        ],
        "materials": [
            "Fired brick",
            "Bamboo reinforcement",
            "Rat-trap bond masonry",
            "Lime plaster"
        ],
        "climate": [
            "Courtyard cooling",
            "High ceilings",
            "Jaali (lattice) screens",
            "Thick walls"
        ],
        "cultural": [
            "Vastu shastra principles",
            "Multi-generational layout",
            "Pooja room",
            "Courtyard life"
        ],
        "cost": "low",
        "description": "Indian courtyard house with monsoon resilience, earthquake-resistant masonry, traditional cooling, and Vastu alignment."
    },
    "KEN": {
        "name": "Nairobi Eco-Compound",
        "image": "https://images.unsplash.com/photo-1632126344982-71441f2c1e0f?w=800&q=80",
        "risks": [
            "Flooding",
            "Drought",
            "Landslides",
            "Water scarcity"
        ],
        "features": [
            "Slope stabilization",
            "Rainwater harvesting (50kL)",
            "Greywater recycling",
            "Solar power",
            "Biogas digester",
            "Drought-resistant landscaping",
            "Community water access"
        ],
        "materials": [
            "Interlocking stabilized earth blocks",
            "Bamboo",
            "Corrugated iron",
            "Recycled materials"
        ],
        "climate": [
            "Natural ventilation",
            "Solar heat gain management",
            "Shading",
            "Water-efficient"
        ],
        "cultural": [
            "Compound living",
            "Community sharing",
            "Multi-family",
            "Outdoor kitchen"
        ],
        "cost": "low",
        "description": "Kenyan compound design with comprehensive water management, slope stability, and community-oriented affordable construction."
    },
    "ETH": {
        "name": "Ethiopian Tukul Resilient",
        "image": "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&q=80",
        "risks": [
            "Earthquakes",
            "Drought",
            "Landslides",
            "Flooding"
        ],
        "features": [
            "Earthquake-resistant timber frame",
            "Thatched roof upgrade (fire-resistant)",
            "Rainwater collection",
            "Slope stabilization",
            "Cistern storage",
            "Solar lighting",
            "Dung floor waterproofing"
        ],
        "materials": [
            "Eucalyptus timber",
            "Mud/wattle",
            "Thatched grass (treated)",
            "Stone foundation"
        ],
        "climate": [
            "Natural ventilation",
            "Thermal mass",
            "Cool interior",
            "Shading"
        ],
        "cultural": [
            "Tukul traditional form",
            "Round construction",
            "Community building",
            "Livestock integration"
        ],
        "cost": "low",
        "description": "Traditional Ethiopian tukul upgraded with seismic resistance, fire treatment, and water scarcity adaptation."
    },
    "NGA": {
        "name": "Lagos Flood-Adaptive House",
        "risks": [
            "Flooding",
            "Coastal erosion",
            "Extreme heat",
            "Sea level rise"
        ],
        "features": [
            "Elevated on stilts",
            "Flood vents",
            "Amphibious option",
            "Heat-reflective roof",
            "Rainwater harvesting",
            "Solar panels",
            "Flexible ground floor"
        ],
        "materials": [
            "Tropical hardwood",
            "Concrete pillars",
            "Corrugated iron",
            "Bamboo"
        ],
        "climate": [
            "Cross-ventilation",
            "High ceilings",
            "Shaded verandas",
            "Coastal breeze capture"
        ],
        "cultural": [
            "West African courtyard",
            "Extended family spaces",
            "Outdoor living",
            "Community orientation"
        ],
        "cost": "low",
        "description": "Lagos waterfront house on stilts with flood adaptation, heat management, and Nigerian extended family layout."
    },
    "FJI": {
        "name": "Pacific Island Cyclone House",
        "risks": [
            "Cyclones (Cat 5)",
            "Storm surge",
            "Sea level rise",
            "Coastal erosion"
        ],
        "features": [
            "Aerodynamic dome shape",
            "Concrete foundation anchors",
            "Impact shutters",
            "Elevated platform",
            "Rainwater cistern",
            "Solar panels",
            "Emergency evacuation plan"
        ],
        "materials": [
            "Bamboo",
            "Coconut timber",
            "Pandanus thatch (reinforced)",
            "Coral stone"
        ],
        "climate": [
            "Natural ventilation",
            "Coastal breeze",
            "Shading",
            "Cool roof"
        ],
        "cultural": [
            "Vale (traditional house) influence",
            "Community design",
            "Open living",
            "Ocean views"
        ],
        "cost": "low",
        "description": "Pacific cyclone-resistant design combining traditional vale with modern aerodynamic engineering and climate adaptation."
    },
    "HTI": {
        "name": "Haiti Build Back Better",
        "risks": [
            "Earthquakes (7.0)",
            "Hurricanes",
            "Landslides",
            "Flooding"
        ],
        "features": [
            "Earthquake-resistant confined masonry",
            "Hurricane straps",
            "Slope stabilization",
            "Elevated foundation",
            "Rainwater collection",
            "Solar panels",
            "Community workshop-built"
        ],
        "materials": [
            "Concrete blocks (reinforced)",
            "Local timber",
            "Corrugated metal",
            "Bamboo"
        ],
        "climate": [
            "Natural ventilation",
            "Hurricane-resistant form",
            "Shading",
            "Cross-breeze"
        ],
        "cultural": [
            "Haitian vernacular",
            "Bright colors",
            "Courtyard living",
            "Community construction"
        ],
        "cost": "low",
        "description": "Post-earthquake reconstruction design: confined masonry, community-built, incorporating lessons from 2010 disaster."
    },
    "CHN": {
        "name": "Sichuan Earthquake Courtyard",
        "image": "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?w=800&q=80",
        "risks": [
            "Earthquanes (8.0)",
            "Landslides",
            "Flooding",
            "Extreme heat/cold"
        ],
        "features": [
            "Base isolation",
            "Timber frame with ductile connections",
            "Courtyard (siheyuan)",
            "Slope anchoring",
            "Solar panels",
            "Rainwater collection",
            "Emergency shelter"
        ],
        "materials": [
            "Bamboo",
            "Rammed earth",
            "Timber frame",
            "Fired brick"
        ],
        "climate": [
            "Courtyard microclimate",
            "Thermal mass",
            "Natural ventilation",
            "Passive solar"
        ],
        "cultural": [
            "Siheyuan courtyard",
            "Feng shui principles",
            "Multi-generational",
            "Hierarchy of spaces"
        ],
        "cost": "low",
        "description": "Sichuan earthquake-resistant siheyuan with base isolation, traditional courtyard cooling, and feng shui integration."
    },
    "MEX": {
        "name": "Mexican Seismic Adobe",
        "image": "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
        "risks": [
            "Earthquakes",
            "Hurricanes (coasts)",
            "Flooding",
            "Heat"
        ],
        "features": [
            "Reinforced adobe (chicken wire)",
            "Ring beam",
            "Flexible roof connection",
            "Hurricane shutters (coast)",
            "Rainwater harvesting",
            "Solar panels",
            "Courtyard cooling"
        ],
        "materials": [
            "Adobe with mesh reinforcement",
            "Timber",
            "Tile roofing",
            "Stone"
        ],
        "climate": [
            "Thick walls (thermal mass)",
            "Courtyard",
            "Cross-ventilation",
            "Shading"
        ],
        "cultural": [
            "Mexican courtyard",
            "Bright colors",
            "Indoor-outdoor living",
            "Family gathering spaces"
        ],
        "cost": "low",
        "description": "Mexican earthquake-resistant adobe with modern reinforcement, courtyard cooling, and traditional vibrant aesthetic."
    },
    "TUR": {
        "name": "Anatolian Quake-Safe House",
        "image": "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80",
        "risks": [
            "Earthquakes (7.8)",
            "Landslides",
            "Extreme temperature swings"
        ],
        "features": [
            "Reinforced concrete frame",
            "Ductile shear walls",
            "Seismic joints",
            "Slope stabilization",
            "Thermal insulation",
            "Solar heating",
            "Emergency preparedness"
        ],
        "materials": [
            "Reinforced concrete",
            "Stone facade",
            "Timber",
            "Insulation"
        ],
        "climate": [
            "Thermal mass",
            "Passive solar",
            "Insulation",
            "Shading"
        ],
        "cultural": [
            "Ottoman architectural elements",
            "Central sofa (living hall)",
            "Multi-generational",
            "Garden courtyard"
        ],
        "cost": "medium",
        "description": "Post-2023 earthquake design with advanced seismic resistance, incorporating lessons from Kahramanmaras disaster."
    },
    "EGY": {
        "name": "Nile Valley Passive House",
        "image": "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=800&q=80",
        "risks": [
            "Extreme heat",
            "Flooding",
            "Water scarcity",
            "Sandstorms"
        ],
        "features": [
            "Mashrabiya screens",
            "Wind catcher (malqaf)",
            "Thick mud walls (60cm)",
            "Courtyard fountain",
            "Rainwater collection",
            "Greywater recycling",
            "Solar power"
        ],
        "materials": [
            "Mud brick",
            "Stone",
            "Wood screens",
            "Lime plaster"
        ],
        "climate": [
            "Passive cooling",
            "Thermal mass",
            "Natural ventilation",
            "Shading"
        ],
        "cultural": [
            "Islamic courtyard",
            "Privacy walls",
            "Rooftop terraces",
            "Traditional mashrabiya"
        ],
        "cost": "low",
        "description": "Ancient Egyptian passive cooling techniques (mashrabiya, malqaf) adapted for modern Nile Valley resilience."
    },
    "PAK": {
        "name": "Indus Basin Flood House",
        "risks": [
            "Flooding (catastrophic)",
            "Earthquakes",
            "Extreme heat",
            "Water scarcity"
        ],
        "features": [
            "Elevated platform (3m)",
            "Earthquake-resistant frame",
            "Flood vents",
            "Rainwater harvesting",
            "Solar panels",
            "Cool roof",
            "Emergency boat access"
        ],
        "materials": [
            "Fired brick",
            "Bamboo",
            "Timber",
            "Corrugated metal"
        ],
        "climate": [
            "High ceilings",
            "Cross-ventilation",
            "Thick walls",
            "Shading"
        ],
        "cultural": [
            "Courtyard (angan)",
            "Privacy walls",
            "Multi-generational",
            "Gender-separated spaces"
        ],
        "cost": "low",
        "description": "Pakistan flood-adapted design (2022 floods affected 33M people) with elevation, seismic resistance, and cultural privacy."
    },
    "VNM": {
        "name": "Mekong Delta Floating Home",
        "image": "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80",
        "risks": [
            "Flooding",
            "Typhoons",
            "Subsidence",
            "Sea level rise"
        ],
        "features": [
            "Amphibious floating foundation",
            "Typhoon anchors",
            "Flexible utilities",
            "Fish farming integration",
            "Solar panels",
            "Rainwater collection",
            "Elevated sleeping"
        ],
        "materials": [
            "Bamboo",
            "Tropical hardwood",
            "Corrugated metal",
            "Recycled plastic pontoons"
        ],
        "climate": [
            "Natural ventilation",
            "Shading",
            "Elevated for breeze",
            "Monsoon-resistant"
        ],
        "cultural": [
            "Vietnamese floating house tradition",
            "Water-based livelihood",
            "Community cluster",
            "Ancestral altar"
        ],
        "cost": "low",
        "description": "Mekong Delta amphibious house combining traditional floating villages with typhoon engineering and aquaculture."
    },
    "ARG": {
        "name": "Pampas Sustainable Estancia",
        "image": "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=800&q=80",
        "risks": [
            "Flooding",
            "Drought",
            "Wind storms",
            "Heat waves"
        ],
        "features": [
            "Elevated foundation",
            "Rainwater harvesting",
            "Wind turbine",
            "Solar panels",
            "Thermal mass",
            "Storm shelter",
            "Water storage (100kL)"
        ],
        "materials": [
            "Adobe",
            "Timber",
            "Stone",
            "Tile roofing"
        ],
        "climate": [
            "Passive solar",
            "Thermal mass",
            "Natural ventilation",
            "Windbreak landscaping"
        ],
        "cultural": [
            "Estancia architecture",
            "Asado (BBQ) area",
            "Gallery porch",
            "Rural gaucho tradition"
        ],
        "cost": "medium",
        "description": "Argentine pampas house with flood elevation, wind power, traditional estancia gallery, and asado culture."
    },
    "COL": {
        "name": "Andean Landslide House",
        "risks": [
            "Landslides",
            "Earthquakes",
            "Flooding",
            "Extreme rainfall"
        ],
        "features": [
            "Slope anchoring",
            "Earthquake-resistant frame",
            "Drainage systems",
            "Retaining walls",
            "Rainwater management",
            "Solar panels",
            "Flexible foundation"
        ],
        "materials": [
            "Bamboo (guadua)",
            "Adobe",
            "Timber",
            "Stone"
        ],
        "climate": [
            "Natural ventilation",
            "Mountain climate adaptation",
            "Thermal comfort",
            "Rain protection"
        ],
        "cultural": [
            "Colombian vernacular",
            "Multi-family compound",
            "Coffee growing integration",
            "Outdoor terraces"
        ],
        "cost": "low",
        "description": "Colombian mountain house with landslide protection, guadua bamboo construction, and coffee farm integration."
    }
};

// Make available globally
window.resilientHomeDesigns = resilientHomeDesigns;
