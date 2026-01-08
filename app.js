// Detect mobile device for performance optimization (user agent only, not window size)
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Initialize the globe
let globe;
let currentLayer = 'deficit';

// Layer configurations
const layerConfig = {
    deficit: {
        title: 'Housing Deficit per Capita',
        description: 'Estimated housing units needed per 1,000 people. Based on UN-Habitat and World Bank data (2024). Higher values indicate severe housing shortages.',
        detailedDefinition: 'This metric measures the gap between housing supply and demand, expressed as the number of housing units needed per 1,000 residents. It accounts for overcrowding, homelessness, and substandard housing. A value of 10 means 10 additional housing units are needed per 1,000 people to meet basic housing needs. Countries with rapid urbanization, population growth, or post-conflict recovery typically show higher deficits. This is a critical indicator for urban planning and housing policy prioritization.',
        dataKey: 'housingDeficitPerCapita',
        scale: [0, 40],
        unit: ' units/1000 people'
    },
    mortgage: {
        title: 'Mortgage to GDP Ratio',
        description: 'Total mortgage debt as percentage of GDP. Data from IMF Global Debt Database & World Bank (2024). Higher values indicate greater household leverage.',
        detailedDefinition: 'This ratio measures the total outstanding residential mortgage debt relative to a country\'s economic output (GDP). It reflects how much households have borrowed to finance housing relative to the size of the economy. High ratios (>80%) can indicate financial vulnerability, as seen before the 2008 financial crisis. Low ratios may suggest underdeveloped housing finance systems or reliance on cash purchases. Developed economies typically show higher ratios due to mature mortgage markets, while emerging economies often have lower ratios.',
        dataKey: 'householdDebtToGDP',
        scale: [0, 135],
        unit: '% of GDP',
        reversed: true  // Higher indicates developed mortgage markets - green for high values
    },
    expenditure: {
        title: 'Government Housing Expenditure / GDP',
        description: 'Government spending on housing and allowances as percentage of GDP. From OECD Affordable Housing Database (2024-2025). Higher values show greater public investment.',
        detailedDefinition: 'This measures public spending on housing programs including social housing construction, rent subsidies, housing allowances, and homelessness prevention as a share of GDP. It reflects government commitment to housing as a public good. Northern European countries often spend 1-2% of GDP, while many countries spend less than 0.5%. Higher expenditure typically correlates with lower homelessness and better housing affordability. This excludes tax expenditures like mortgage interest deductions.',
        dataKey: 'housingExpenditureToGDP',
        scale: [0, 3.5],
        unit: '% of GDP',
        reversed: true  // Higher is better - green for high values
    },
    construction: {
        title: 'Construction Jobs per Capita',
        description: 'Construction sector employment per 1,000 people. Data from ILO and national labor statistics (2024). Higher values indicate more construction activity.',
        detailedDefinition: 'This indicator measures the number of people employed in the construction sector per 1,000 residents. It serves as a proxy for construction activity and housing development momentum. High values (>80 jobs/1000) suggest active building sectors, potentially addressing housing shortages. Low values may indicate stagnant construction, restrictive regulations, or economic constraints. This metric also reflects labor market opportunities and can signal overheating housing markets when values spike rapidly.',
        dataKey: 'constructionJobsPerCapita',
        scale: [0, 160],
        unit: ' jobs/1000 people',
        reversed: true  // Higher is better - green for high values
    },
    priceToIncome: {
        title: 'House Price to Income Ratio',
        description: 'Median house price divided by median annual household income. Data from Numbeo, World Bank, and national statistics (2024). Higher values indicate less affordable housing.',
        detailedDefinition: 'This ratio divides median house prices by median annual household income, showing how many years of income are needed to purchase a median home. A ratio of 3-4 is considered affordable, 5-7 is moderately unaffordable, and above 8 indicates severe unaffordability. For example, a ratio of 12 means it would take 12 years of gross household income to buy a median home. This is a key metric for first-time homebuyers and reflects housing market accessibility. Cities like Hong Kong and Vancouver show ratios above 20.',
        dataKey: 'housePriceToIncome',
        scale: [0, 24],
        unit: 'x income'
    },
    informalHousing: {
        title: 'Informal/Substandard Housing Share',
        description: 'Percentage of housing that is informal or substandard. Data from UN-Habitat and World Bank (2024). Higher values indicate more precarious housing conditions.',
        detailedDefinition: 'This measures the proportion of housing that lacks legal recognition, secure tenure, or basic services (water, sanitation, electricity). It includes slums, squatter settlements, and substandard dwellings. High percentages indicate inadequate housing policies, rapid urbanization, or inequality. Informal housing residents face eviction risks, limited access to credit, and poor living conditions. Many sub-Saharan African and South Asian cities show rates above 50%. Reducing informal housing is a key UN Sustainable Development Goal (SDG 11.1).',
        dataKey: 'informalHousingShare',
        scale: [0, 75],
        unit: '%'
    },
    costBurden: {
        title: 'Housing Cost Burden',
        description: 'Percentage of population spending more than 40% of disposable income on housing. Data from OECD HC1.2 and Eurostat (2022-2024). Higher values indicate severe affordability crisis.',
        detailedDefinition: 'Housing cost burden measures the share of households spending more than 40% of their disposable income on housing costs (rent or mortgage payments plus utilities). This threshold is internationally recognized as "severe housing cost overburden." Households above this threshold often struggle to afford other essentials like food, healthcare, and education. High values indicate affordability crises, often concentrated among low-income renters. This metric is particularly important for understanding housing poverty and the need for rent assistance programs.',
        dataKey: 'housingCostBurden',
        scale: [0, 45],
        unit: '% of population'
    },
    socialRental: {
        title: 'Social Rental Housing Stock',
        description: 'Percentage of total housing stock that is social or affordable housing. Data from OECD PH4.2 (2022-2023). Higher values indicate stronger social housing programs.',
        detailedDefinition: 'This measures the share of housing units that are publicly owned or subsidized social/affordable housing. It includes council housing, housing associations, and non-profit rental housing with below-market rents. Countries like the Netherlands (30%) and Austria (23%) have large social housing sectors that provide affordable alternatives to private markets. Low values suggest greater reliance on market-based housing, which can exacerbate affordability issues. Social housing serves as a buffer against homelessness and provides stable housing for vulnerable populations.',
        dataKey: 'socialRentalHousing',
        scale: [0, 32],
        unit: '% of stock',
        reversed: true  // Higher is better - green for high values
    },
    disasterRisk: {
        title: 'Natural Disaster Risk',
        description: 'WorldRiskIndex 2024 score measuring disaster risk from earthquakes, floods, cyclones, droughts, and sea-level rise. From WorldRiskReport 2024 by Bündnis Entwicklung Hilft & IFHV. Higher values indicate greater disaster exposure and vulnerability.',
        detailedDefinition: 'The WorldRiskIndex combines exposure to natural hazards (earthquakes, floods, cyclones, droughts, sea-level rise) with societal vulnerability and coping capacity. Scores range from 0-50, with higher values indicating greater risk. The index considers both the likelihood of disasters and a country\'s ability to respond and recover. High-risk countries often require disaster-resilient building codes, insurance systems, and climate adaptation strategies. Island nations and countries in seismically active zones typically score highest. This metric is increasingly important for housing policy as climate change intensifies extreme weather events.',
        dataKey: 'disasterRiskIndex',
        scale: [0, 50],
        unit: ' risk score'
    },
    investmentOpportunity: {
        title: 'Housing Investment Opportunity',
        description: 'Conservative estimate of affordable housing market size in USD billions. Calculated as middle-class households (25th-75th percentile) × affordable home price (3.5x median income). Excludes base of pyramid. Higher values indicate larger investment opportunities.',
        detailedDefinition: 'This metric estimates the total addressable market for affordable housing development, focusing conservatively on middle-income households. It multiplies the number of middle-class households (those between 25th-75th income percentile) by the price of an affordable home (3.5 times median household income). This excludes the base of the pyramid (bottom 25%) who require subsidized social housing rather than market-rate affordable housing. Values are expressed in billions USD. Large markets like India and Indonesia show high values due to population size, while smaller wealthy nations show moderate values. This metric helps investors and developers identify market opportunities for affordable housing projects.',
        dataKey: 'housingInvestmentOpportunity',
        scale: [0, 1000],
        unit: ' billion USD',
        reversed: true  // Higher is better - larger market opportunity
    },
    affordablePrice: {
        title: 'Affordable Home Price',
        description: 'Maximum affordable home price as multiple of annual income, based on 30% of gross income for housing at current mortgage rates. Uses 30-year mortgage assumption. Lower values indicate affordability constraints from high interest rates.',
        detailedDefinition: 'This metric calculates what a median household can afford to pay for a home using the standard 30% income rule (no more than 30% of gross income should go to housing costs). It factors in current mortgage interest rates to determine the maximum affordable home price, expressed as a multiple of annual income. For example, 4.0x means a household can afford a home priced at 4 times their annual income. Higher values indicate better affordability capacity - at lower interest rates (3-4%), households can afford 4.5-5x income, while at high rates (10-15%), they can only afford 2-2.5x income. This differs from actual price-to-income ratios, showing what SHOULD be affordable versus market reality. Countries with low values face double challenges: high interest rates limit borrowing capacity even when household incomes exist.',
        dataKey: 'affordableHomePriceRatio',
        scale: [1.5, 5.5],
        unit: 'x income',
        reversed: true  // Higher is better - can afford more expensive homes
    },
    housingMismatch: {
        title: 'Housing Supply-Demand Mismatch',
        description: 'Index measuring gap between housing being built (often luxury) versus what is needed (affordable). Combines price unaffordability, housing deficits, informal housing, and lack of social housing. Higher scores = severe mismatch where luxury construction coexists with affordable housing crisis.',
        detailedDefinition: 'This index measures the misalignment between housing market supply (what developers build) and actual demand (what people need and can afford). High mismatch occurs when countries have BOTH expensive housing markets AND large affordable housing shortages - indicating construction focuses on luxury/high-end units while middle and low-income needs go unmet. Calculated from: (1) Affordability crisis signals - high price-to-income ratios (>8) and cost burden (>20%), (2) Unmet affordable demand - high housing deficits (>20 units/1000) and informal housing (>30%), (3) Lack of affordable alternatives - low social housing (<5%). Score 0-100: Low (0-30) = balanced supply across segments; Medium (30-50) = moderate mismatch; High (50-70) = severe mismatch with luxury focus while affordable shortage persists; Extreme (70-100) = crisis-level mismatch. Examples of extreme mismatch: China with ghost cities of empty luxury apartments while migrant workers lack housing, Kenya/Nigeria with luxury gated estates for elites alongside massive informal settlements, India with Mumbai luxury towers while slums expand. Low mismatch: Austria, Netherlands (strong social housing diversifies supply), Japan (efficient construction serves all price points).',
        dataKey: 'housingMismatchIndex',
        scale: [0, 100],
        unit: ' mismatch'
    },
    policyAchievement: {
        title: 'Affordable Housing Policy Achievement',
        description: 'Composite index (0-100) measuring government effectiveness in tackling affordable housing crisis. Rewards policy action, construction momentum, public investment, social housing supply, and affordability outcomes. Emphasizes what countries are DOING NOW over legacy wealth.',
        detailedDefinition: 'This index rewards countries actively addressing affordable housing challenges, emphasizing EFFORT and ACTION over legacy advantages. Formula designed to recognize both developed-country systems AND developing-country innovation. Calculated from five components weighted to value momentum: (1) Policy Activity 2020-24 (0-30 pts) - recent housing reforms like India\'s PMAY, Colombia\'s Vivienda de Interés Social, Chile\'s subsidies. Highest weight to reward current action. (2) Construction Momentum (0-20 pts) - construction jobs per capita, measuring active building. Rewards countries like India (89.7 jobs/1000), Singapore (121.5), UAE (156.3) actually constructing housing now. (3) Public Investment (0-20 pts) - government housing expenditure as % of GDP. (4) Social Housing Stock (0-15 pts) - affordable housing as % of total stock, rewarding systems like Austria (24%), Netherlands (30%). (5) Affordability Achievement (0-15 pts) - tiered bonus for maintaining reasonable price-to-income ratios: ≤5x gets 15pts, 5-8x gets 10pts, 8-12x gets 5pts, >12x gets 0pts. Score 0-100: Excellent (50-60) = comprehensive action across all dimensions; Very Good (40-50) = strong multi-faceted programs; Good (30-40) = solid efforts with room to grow; Fair (20-30) = emerging programs; Poor (0-20) = minimal intervention. Top performers: Austria 56.2 (social housing tradition + balanced approach), Singapore 55.6 (exceptional construction + HDB system), France 54.5, Denmark 54.4, Netherlands 52.1, UK 51.5, Mexico 50.3 (policy activity 5/5). Strong emerging market performers: Chile 37.9 (policy 3/5 + construction), India 30.2 (PMAY + construction momentum), Brazil 38.2, Colombia 25.1 (Vivienda de Interés Social). This metric recognizes that building affordable housing at scale requires ACTION - passing laws, funding programs, and physically constructing units - not just wealth.',
        dataKey: 'policyAchievementIndex',
        scale: [0, 60],
        unit: ' achievement',
        reversed: true  // Higher is better - green for high achievement
    },
    deficitProjection: {
        title: 'Housing Deficit Projection 2024-2034',
        description: 'Projected change in housing deficit per 1,000 people over next 10 years. Negative values (green) = deficit decreasing, solving crisis. Positive values (red) = deficit increasing, crisis worsening. Based on construction momentum, policy action, urbanization pressure, and affordability trends.',
        detailedDefinition: 'This forward-looking metric projects whether countries will solve or worsen their housing crisis over the next decade (2024-2034). Unlike static metrics showing current state, this shows trajectory and momentum. Calculated by modeling five drivers: (1) Construction Supply Effect - high construction jobs per capita reduces deficit (countries building more solve faster); (2) Policy Acceleration - strong policy activity (4-5/5) accelerates solutions through reforms, funding, streamlined permitting; (3) Urbanization Pressure - rapid urban growth increases demand, worsening deficit in countries unprepared; (4) Affordability Crisis Drag - high price-to-income ratios (>10x) slow solutions as fewer can afford new housing; (5) Baseline Deficit Inertia - large existing deficits take longer to solve. Score interpretation: Large negative (< -5) = rapid improvement, crisis solving (Singapore, UAE with mega-construction; Chile, Mexico with strong policy); Moderate negative (-5 to 0) = gradual improvement (developed countries with steady programs); Near zero (0 to +3) = stagnant, holding steady; Moderate positive (+3 to +8) = worsening crisis (urbanizing countries without adequate response); Large positive (> +8) = rapidly deteriorating (high urbanization + low construction + affordability crisis). Winners: Singapore -12.8 (exceptional HDB construction momentum), UAE -10.2 (construction boom), India -6.4 (PMAY scale + construction), Chile -5.8 (policy + building), Austria -4.2 (systematic programs). Losers: Countries with rapid urbanization but low construction and weak policy - crisis compounding over time. This metric shows who is winning and losing the race to solve affordable housing.',
        dataKey: 'deficitProjection2034',
        scale: [-15, 15],
        unit: ' units/1000',
        reversed: false  // Lower (negative) is better - deficit decreasing = green, deficit increasing = red
    },
    buildingCodeRecency: {
        title: 'Building Code Recency',
        description: 'Years since last major building code update as of 2024. Lower values (green) = recently updated modern codes. Higher values (red) = outdated codes. Value 100 = no national building code. Based on GFDRR World Bank data, national construction ministries, and IFC reports.',
        detailedDefinition: 'This metric measures when countries last comprehensively updated their national building codes, revealing institutional capacity, disaster preparedness, and regulatory modernization. Building codes govern structural safety, fire protection, energy efficiency, accessibility, and construction standards. Recent updates (0-5 years) often incorporate climate resilience, seismic safety improvements, green building standards, and streamlined permitting for affordable housing. Outdated codes (20+ years) may lack disaster risk provisions, block innovative construction methods (modular, mass timber), mandate expensive materials, or fail to address modern housing challenges. Countries without codes (value 100) face safety risks, lack mortgage finance standards, and struggle with disaster reconstruction. Score interpretation: 0-5 years (dark green) = Modern, recently updated - examples include Singapore 2024, India 2023 (National Building Code updated for PMAY), UAE 2021, Japan 2020 (post-disaster improvements), Chile 2019 (seismic updates); 6-10 years (green) = Recent but due for review - UK 2013, Australia 2019; 11-20 years (yellow) = Aging codes needing updates - many Latin American, Eastern European countries; 21-40 years (orange) = Severely outdated - blocking innovation and disaster preparedness; 40+ years or none (red) = No code or colonial-era codes - many sub-Saharan African countries, small island states. Updated codes are crucial for: disaster resilience (earthquake, flood, hurricane standards), affordable housing innovation (allowing alternative materials, reducing costs), climate adaptation (energy efficiency, cooling), and mortgage finance (lenders require code compliance). Countries with recent updates often show correlation with lower informal housing and better disaster recovery.',
        dataKey: 'buildingCodeYearsSinceUpdate',
        scale: [0, 50],
        unit: ' years',
        reversed: false  // Lower is better - recently updated codes
    },
    landAffordability: {
        title: 'Urban Land Affordability Index',
        description: 'Months of average income needed to buy 1m² of urban residential land in primary city. Calculated as land price per m² / monthly GDP per capita. Higher values (red) = land speculation/scarcity driving unaffordability. Lower values (green) = accessible land markets. Based on World Bank, Knight Frank, JLL, Savills, and national property data.',
        detailedDefinition: 'This index measures urban land affordability by calculating how many months of average national income are required to purchase one square meter of residential land in the country\'s primary economic city (usually capital or largest city). Formula: (Urban residential land price per m² in USD) / (Monthly GDP per capita in USD). Land costs are often 50-80% of total housing costs in expensive cities, making this a critical driver of housing unaffordability. High values indicate land speculation, restrictive zoning, geographic constraints, or foreign investment inflating prices beyond local purchasing power. Score interpretation: Low (0-3 months) = Accessible land markets - found in countries with abundant land, moderate regulation, or lower urbanization pressure. Examples: Many US cities outside coastal areas, Canada (outside Toronto/Vancouver), Nordic countries outside capitals, some developing countries. Medium (3-8 months) = Moderate land costs - typical for mid-sized cities in developed countries, emerging market capitals. Examples: Germany (Berlin), France (outside Paris), Spain, Portugal, Eastern Europe, Latin America. High (8-15 months) = Expensive land markets - major global cities with geographic constraints or restrictive zoning. Examples: UK (London), Netherlands (Amsterdam), Australia (Sydney/Melbourne), Japan (Tokyo), Israel. Very High (15-30 months) = Severe land scarcity/speculation - extreme geographic constraints, land banking, or foreign speculation. Examples: Hong Kong, Singapore, Monaco, parts of China (Beijing/Shanghai). Extreme (30+ months) = Crisis-level land unaffordability - makes affordable housing development nearly impossible without massive subsidies. Land affordability directly impacts: housing construction costs (land = 50-80% in expensive cities), informal housing rates (when formal land is unaffordable), urban sprawl patterns (people pushed to periphery), and effectiveness of affordable housing programs (land costs overwhelm subsidies). Countries can improve land affordability through: land value capture taxes, upzoning/density increases, public land banking, breaking up speculative holdings, and transit-oriented development.',
        dataKey: 'landAffordabilityIndex',
        scale: [0, 20],
        unit: ' months income',
        reversed: false  // Lower is better - more affordable land
    },
    greenCertified: {
        title: 'Green Certified Homes per Capita',
        description: 'EDGE and LEED certified homes per 100,000 people. Measures sustainable housing commitment through green building certifications. Higher values (green) = greater adoption of energy-efficient, climate-resilient housing. Based on World Bank EDGE database and USGBC LEED project directory.',
        detailedDefinition: 'This metric measures the penetration of green building certifications in residential construction, specifically EDGE (Excellence in Design for Greater Efficiencies) and LEED (Leadership in Energy and Environmental Design) certified homes per 100,000 population. EDGE is a World Bank/IFC green building certification system designed for emerging markets, requiring 20% reduction in energy, water, and embodied energy. LEED is the US Green Building Council certification focusing on sustainability, energy efficiency, and environmental performance. Both certifications ensure homes are resource-efficient, climate-resilient, and have lower operating costs for residents. High values indicate strong commitment to sustainable housing through: mandatory green building codes, financial incentives (tax credits, expedited permitting), developer adoption, and consumer demand for efficient housing. Score interpretation: Very Low (0-5 per 100k) = Minimal green certification adoption - most countries, especially developing markets without mandatory standards or incentives; Low (5-20 per 100k) = Emerging adoption - some projects certified, usually luxury developments; Medium (20-50 per 100k) = Moderate adoption - green codes in major cities, some incentive programs; High (50-100 per 100k) = Strong adoption - mandatory standards in key markets, widespread developer buy-in; Very High (100+ per 100k) = Leadership - comprehensive green building requirements, market transformation. Leading countries: UAE (high EDGE adoption in Dubai), Singapore (mandatory green building standards), USA (extensive LEED portfolio), India (largest EDGE market by volume), Colombia (strong EDGE uptake), South Africa (Green Star + EDGE), Rwanda (government green building push). Benefits of green certified homes: 20-40% lower energy costs for residents, improved air quality and health outcomes, climate resilience (flood protection, heat management), higher resale values, lower carbon emissions, and affordable housing alignment (lower utility costs = more affordable to operate). Green certification also correlates with: formal construction sector growth, access to green financing (lower interest rates), and institutional investor interest in affordable housing.',
        dataKey: 'greenCertifiedHomesPerCapita',
        scale: [0, 150],
        unit: ' homes/100k',
        reversed: true  // Higher is better - more green certified homes
    }
};

// Color scale function - vibrant heat map colors with full opacity
// For negative indicators: green = low (good), red = high (bad)
// For positive indicators (reversed): green = high (good), red = low (bad)
function getColor(value, minVal, maxVal, reversed = false) {
    if (value === null || value === undefined) return '#555555'; // Dark gray for no data

    let normalized = Math.min(Math.max((value - minVal) / (maxVal - minVal), 0), 1);

    // Reverse the scale for positive indicators (higher = better)
    if (reversed) {
        normalized = 1 - normalized;
    }

    // Solid opaque colors for visibility
    // Low values (green) = good for negative indicators OR high values for positive indicators
    // High values (red) = bad for negative indicators OR low values for positive indicators
    if (normalized < 0.15) return '#00cc66';  // Dark Green - Very Good
    if (normalized < 0.3) return '#66ff66';   // Green - Good
    if (normalized < 0.5) return '#ffff00';   // Yellow - Medium
    if (normalized < 0.7) return '#ff9933';   // Orange - Medium-Bad
    if (normalized < 0.85) return '#ff4500';  // Red-Orange - Bad
    return '#cc0000';                          // Dark Red - Very Bad
}

// Create a lookup map for fast data access by ISO code
const dataByISO = {};
housingData.forEach(d => {
    dataByISO[d.iso] = d;
});

// Mapping from numeric UN M49 codes to ISO 3-letter codes
// This maps the IDs used in world-atlas TopoJSON to our data
const numericToISO = {
    '004': 'AFG', '008': 'ALB', '012': 'DZA', '016': 'ASM', '020': 'AND',
    '024': 'AGO', '028': 'ATG', '031': 'AZE', '032': 'ARG', '036': 'AUS',
    '040': 'AUT', '044': 'BHS', '048': 'BHR', '050': 'BGD', '051': 'ARM',
    '052': 'BRB', '056': 'BEL', '060': 'BMU', '064': 'BTN', '068': 'BOL',
    '070': 'BIH', '072': 'BWA', '076': 'BRA', '084': 'BLZ', '090': 'SLB',
    '096': 'BRN', '100': 'BGR', '104': 'MMR', '108': 'BDI', '112': 'BLR',
    '116': 'KHM', '120': 'CMR', '124': 'CAN', '132': 'CPV', '136': 'CYM',
    '140': 'CAF', '144': 'LKA', '148': 'TCD', '152': 'CHL', '156': 'CHN',
    '170': 'COL', '174': 'COM', '178': 'COG', '180': 'COD', '188': 'CRI',
    '191': 'HRV', '192': 'CUB', '196': 'CYP', '203': 'CZE', '204': 'BEN',
    '208': 'DNK', '212': 'DMA', '214': 'DOM', '218': 'ECU', '222': 'SLV',
    '226': 'GNQ', '231': 'ETH', '232': 'ERI', '233': 'EST', '242': 'FJI',
    '246': 'FIN', '250': 'FRA', '258': 'PYF', '262': 'DJI', '266': 'GAB',
    '268': 'GEO', '270': 'GMB', '275': 'PSE', '276': 'DEU', '288': 'GHA',
    '300': 'GRC', '304': 'GRL', '308': 'GRD', '316': 'GUM', '320': 'GTM',
    '324': 'GIN', '328': 'GUY', '332': 'HTI', '340': 'HND', '348': 'HUN',
    '352': 'ISL', '356': 'IND', '360': 'IDN', '364': 'IRN', '368': 'IRQ',
    '372': 'IRL', '376': 'ISR', '380': 'ITA', '384': 'CIV', '388': 'JAM',
    '392': 'JPN', '398': 'KAZ', '400': 'JOR', '404': 'KEN', '408': 'PRK',
    '410': 'KOR', '414': 'KWT', '417': 'KGZ', '418': 'LAO', '422': 'LBN',
    '426': 'LSO', '428': 'LVA', '430': 'LBR', '434': 'LBY', '440': 'LTU',
    '442': 'LUX', '450': 'MDG', '454': 'MWI', '458': 'MYS', '462': 'MDV',
    '466': 'MLI', '470': 'MLT', '478': 'MRT', '480': 'MUS', '484': 'MEX',
    '492': 'MCO', '496': 'MNG', '498': 'MDA', '499': 'MNE', '504': 'MAR',
    '508': 'MOZ', '512': 'OMN', '516': 'NAM', '520': 'NRU', '524': 'NPL',
    '528': 'NLD', '540': 'NCL', '548': 'VUT', '554': 'NZL', '558': 'NIC',
    '562': 'NER', '566': 'NGA', '578': 'NOR', '583': 'FSM', '584': 'MHL',
    '585': 'PLW', '586': 'PAK', '591': 'PAN', '598': 'PNG', '600': 'PRY',
    '604': 'PER', '608': 'PHL', '616': 'POL', '620': 'PRT', '624': 'GNB',
    '626': 'TLS', '630': 'PRI', '634': 'QAT', '642': 'ROU', '643': 'RUS',
    '646': 'RWA', '678': 'STP', '682': 'SAU', '686': 'SEN', '688': 'SRB',
    '690': 'SYC', '694': 'SLE', '702': 'SGP', '703': 'SVK', '704': 'VNM',
    '705': 'SVN', '706': 'SOM', '710': 'ZAF', '716': 'ZWE', '724': 'ESP',
    '728': 'SSD', '729': 'SDN', '732': 'ESH', '740': 'SUR', '748': 'SWZ',
    '752': 'SWE', '756': 'CHE', '760': 'SYR', '762': 'TJK', '764': 'THA',
    '768': 'TGO', '776': 'TON', '780': 'TTO', '784': 'ARE', '788': 'TUN',
    '792': 'TUR', '795': 'TKM', '798': 'TUV', '800': 'UGA', '804': 'UKR',
    '807': 'MKD', '818': 'EGY', '826': 'GBR', '834': 'TZA', '840': 'USA',
    '850': 'VIR', '854': 'BFA', '858': 'URY', '860': 'UZB', '862': 'VEN',
    '876': 'WLF', '882': 'WSM', '887': 'YEM', '894': 'ZMB'
};

// Hide loading screen
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
}

// Initialize globe visualization with choropleth (heat map)
function initGlobe() {
    const container = document.getElementById('globe-container');

    // Calculate dimensions with fallback for mobile
    const containerWidth = container.offsetWidth || window.innerWidth;
    const containerHeight = container.offsetHeight || Math.max(400, window.innerHeight * 0.6);

    globe = Globe()
        (container)
        .globeImageUrl('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cmFkaWFsR3JhZGllbnQgaWQ9Im9jZWFuIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMWY1NTkwO3N0b3Atb3BhY2l0eToxIi8+PHN0b3Agb2Zmc2V0PSI1MCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMxNjNkNzA7c3RvcC1vcGFjaXR5OjEiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMwZDJhNGY7c3RvcC1vcGFjaXR5OjEiLz48L3JhZGlhbEdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI29jZWFuKSIvPjwvc3ZnPgo=') // Brighter blue ocean gradient
        .backgroundImageUrl('https://unpkg.com/three-globe/example/img/night-sky.png') // Stars background
        .showAtmosphere(true) // Show atmosphere
        .atmosphereColor('#4facfe')
        .atmosphereAltitude(0.18)
        .width(containerWidth)
        .height(containerHeight);

    // Load world-atlas TopoJSON - use lower resolution on mobile
    const topoJsonUrl = isMobile
        ? 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'  // Lower res for mobile
        : 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json';  // Higher res for desktop

    fetch(topoJsonUrl)
        .then(res => res.json())
        .then(topology => {
            console.log('Loaded TopoJSON data');

            // Convert TopoJSON to GeoJSON
            const countries = topojson.feature(topology, topology.objects.countries);
            console.log('Feature count:', countries.features.length);
            console.log('Our data coverage:', Object.keys(dataByISO).length, 'countries');

            // Set all polygon properties together (reduce altitude on mobile for performance)
            globe
                .polygonsData(countries.features)
                .polygonAltitude(isMobile ? 0.005 : 0.01)
                .polygonCapColor(feat => {
                    // Convert numeric ID to ISO code
                    const numericId = String(feat.id).padStart(3, '0');
                    const iso = numericToISO[numericId];
                    const countryData = iso ? dataByISO[iso] : null;

                    if (!countryData) {
                        return '#555555'; // Gray for no data
                    }

                    const config = layerConfig[currentLayer];
                    const value = countryData[config.dataKey];
                    return getColor(value, config.scale[0], config.scale[1], config.reversed);
                })
                .polygonSideColor(() => 'rgba(0, 0, 0, 0.2)')
                .polygonStrokeColor(() => '#111')
                .polygonLabel(feat => {
                    const numericId = String(feat.id).padStart(3, '0');
                    const iso = numericToISO[numericId];
                    const countryData = iso ? dataByISO[iso] : null;

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
                                    Unknown (ID: ${feat.id})
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
                                    <strong style="color: #4facfe;">Mortgage/GDP:</strong>
                                    <span style="float: right; color: #fff;">${countryData.householdDebtToGDP.toFixed(1)}%</span>
                                </div>
                                <div style="margin: 6px 0;">
                                    <strong style="color: #4facfe;">Govt Expenditure/GDP:</strong>
                                    <span style="float: right; color: #fff;">${countryData.housingExpenditureToGDP.toFixed(2)}%</span>
                                </div>
                                <div style="margin: 6px 0;">
                                    <strong style="color: #4facfe;">Construction Jobs:</strong>
                                    <span style="float: right; color: #fff;">${countryData.constructionJobsPerCapita.toFixed(1)} jobs/1000</span>
                                </div>
                                <div style="margin: 6px 0;">
                                    <strong style="color: #4facfe;">Price to Income:</strong>
                                    <span style="float: right; color: #fff;">${countryData.housePriceToIncome.toFixed(1)}x</span>
                                </div>
                                <div style="margin: 6px 0;">
                                    <strong style="color: #4facfe;">Informal Housing:</strong>
                                    <span style="float: right; color: #fff;">${countryData.informalHousingShare.toFixed(1)}%</span>
                                </div>
                                <div style="margin: 6px 0;">
                                    <strong style="color: #4facfe;">Cost Burden:</strong>
                                    <span style="float: right; color: #fff;">${countryData.housingCostBurden.toFixed(1)}%</span>
                                </div>
                                <div style="margin: 6px 0;">
                                    <strong style="color: #4facfe;">Social Housing:</strong>
                                    <span style="float: right; color: #fff;">${countryData.socialRentalHousing.toFixed(1)}%</span>
                                </div>
                            </div>
                            <div style="font-size: 11px; color: #888; margin-top: 8px; padding-top: 6px; border-top: 1px solid rgba(255,255,255,0.1);">
                                <strong style="color: #00f2fe;">Current layer:</strong> ${config.title}
                            </div>
                        </div>
                    `;
                })
                .onPolygonHover(feat => {
                container.style.cursor = feat ? 'pointer' : 'default';
                if (feat) {
                    const numericId = String(feat.id).padStart(3, '0');
                    const iso = numericToISO[numericId];
                    const countryData = iso ? dataByISO[iso] : null;
                    if (countryData) {
                        updateStatsPanel(countryData);
                    } else {
                        resetStatsPanel();
                    }
                } else {
                    resetStatsPanel();
                }
            });

            // Hide loading screen once globe is ready
            setTimeout(() => {
                hideLoadingScreen();
            }, 300);
        })
        .catch(error => {
            console.error('Error loading country data:', error);
            hideLoadingScreen(); // Hide loading screen even on error
        });

    // Auto-rotate (slower on mobile to reduce GPU load)
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = isMobile ? 0.15 : 0.25;  // Reduced from 0.2/0.35 for smoother initial rotation

    // Handle window resize
    window.addEventListener('resize', () => {
        globe.width(container.offsetWidth);
        globe.height(container.offsetHeight);
    });
}

// Helper function to get policy activity description
function getPolicyActivityLabel(score) {
    const labels = {
        0: 'No Reforms',
        1: 'Minimal Activity',
        2: 'Low-Moderate Activity',
        3: 'Moderate Activity',
        4: 'High Activity',
        5: 'Exceptional Activity'
    };
    return labels[score] || 'Unknown';
}

// Update stats panel with country information
function updateStatsPanel(countryData) {
    const statsPanel = document.getElementById('stats-panel');
    const config = layerConfig[currentLayer];
    const currentValue = countryData[config.dataKey];
    const policyLabel = getPolicyActivityLabel(countryData.policyActivityScore);

    statsPanel.classList.add('has-data');
    statsPanel.innerHTML = `
        <h4>${countryData.country}</h4>
        <div class="country-stats">
            <p><strong>Housing Deficit per Capita:</strong> ${countryData.housingDeficitPerCapita.toFixed(2)} units/1000 people</p>
            <p><strong>Mortgage to GDP:</strong> ${countryData.householdDebtToGDP.toFixed(1)}% of GDP</p>
            <p><strong>Govt Housing Expenditure:</strong> ${countryData.housingExpenditureToGDP.toFixed(2)}% of GDP</p>
            <p><strong>Construction Jobs per Capita:</strong> ${countryData.constructionJobsPerCapita.toFixed(1)} jobs/1000 people</p>
            <p><strong>House Price to Income Ratio:</strong> ${countryData.housePriceToIncome.toFixed(1)}x income</p>
            <p><strong>Informal Housing Share:</strong> ${countryData.informalHousingShare.toFixed(1)}%</p>
            <p><strong>Housing Cost Burden:</strong> ${countryData.housingCostBurden.toFixed(1)}% of population</p>
            <p><strong>Social Rental Housing:</strong> ${countryData.socialRentalHousing.toFixed(1)}% of stock</p>
            <p><strong>Policy Activity 2020-24:</strong> ${countryData.policyActivityScore}/5 (${policyLabel})</p>
            <p><strong>Natural Disaster Risk:</strong> ${countryData.disasterRiskIndex.toFixed(1)}/50 (WorldRiskIndex 2024)</p>
            <p><strong>Investment Opportunity:</strong> $${countryData.housingInvestmentOpportunity.toFixed(1)}B (affordable housing market)</p>
            <p><strong>Affordable Home Price:</strong> ${countryData.affordableHomePriceRatio.toFixed(1)}x income (at current mortgage rates)</p>
            <p><strong>Housing Mismatch:</strong> ${countryData.housingMismatchIndex.toFixed(1)}/100 mismatch index</p>
            <p><strong>Policy Achievement:</strong> ${countryData.policyAchievementIndex.toFixed(1)}/100 achievement score</p>
            <p><strong>Deficit Projection 2034:</strong> ${countryData.deficitProjection2034.toFixed(1)} units/1000 ${countryData.deficitProjection2034 < 0 ? '(improving ✓)' : '(worsening ✗)'}</p>
            <p><strong>Building Code:</strong> ${countryData.buildingCodeYearsSinceUpdate === 100 ? 'No national code' : countryData.buildingCodeYearsSinceUpdate === 0 ? 'Updated 2024' : `${countryData.buildingCodeYearsSinceUpdate} years since update`}</p>
            <p><strong>Land Affordability:</strong> ${countryData.landAffordabilityIndex.toFixed(1)} months income per m²</p>
            <p><strong>Green Certified Homes:</strong> ${countryData.greenCertifiedHomesPerCapita.toFixed(1)} per 100k people</p>
            <p style="margin-top: 10px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.2);">
                <strong style="color: #00f2fe;">Current Metric:</strong> ${currentValue.toFixed(2)}${config.unit}
            </p>
        </div>
    `;
}

// Reset stats panel
function resetStatsPanel() {
    const statsPanel = document.getElementById('stats-panel');
    statsPanel.classList.remove('has-data');
    statsPanel.innerHTML = `
        <svg class="empty-illustration" width="120" height="120" viewBox="0 0 120 120">
            <!-- Isometric house in blueprint style -->
            <g transform="translate(60, 40)">
                <!-- Base -->
                <path d="M 0,-20 L 25,0 L 25,30 L 0,50 L -25,30 L -25,0 Z"
                      fill="none" stroke="#4facfe" stroke-width="1" opacity="0.4"/>
                <!-- Left wall -->
                <path d="M -25,0 L -25,30 L 0,50 L 0,20 Z"
                      fill="none" stroke="#4facfe" stroke-width="1.5"/>
                <!-- Right wall -->
                <path d="M 25,0 L 25,30 L 0,50 L 0,20 Z"
                      fill="none" stroke="#00f2fe" stroke-width="1.5"/>
                <!-- Roof left -->
                <path d="M -25,0 L 0,-20 L 0,20 Z"
                      fill="none" stroke="#4facfe" stroke-width="1.5" stroke-dasharray="3,2"/>
                <!-- Roof right -->
                <path d="M 25,0 L 0,-20 L 0,20 Z"
                      fill="none" stroke="#00f2fe" stroke-width="1.5" stroke-dasharray="3,2"/>
                <!-- Door -->
                <rect x="-5" y="35" width="10" height="15"
                      fill="none" stroke="#00f2fe" stroke-width="1"/>
                <!-- Windows -->
                <rect x="-18" y="8" width="6" height="6"
                      fill="none" stroke="#4facfe" stroke-width="1"/>
                <rect x="12" y="8" width="6" height="6"
                      fill="none" stroke="#00f2fe" stroke-width="1"/>
            </g>
        </svg>
        <h4 class="empty-text">Hover over a country for details</h4>
    `;
}

// Update legend labels based on metric type
function updateLegend(reversed = false) {
    const legend = document.getElementById('legend');
    if (!legend) return;

    // Get all legend item labels
    const labels = legend.querySelectorAll('.legend-item span:last-child');

    if (reversed) {
        // For positive indicators (higher = better): reverse the labels
        labels[0].textContent = 'Very Low';   // Dark red = very low (worst)
        labels[1].textContent = 'Low';
        labels[2].textContent = 'Medium-Low';
        labels[3].textContent = 'Medium';
        labels[4].textContent = 'High';
        labels[5].textContent = 'Very High';  // Dark green = very high (best)
    } else {
        // For negative indicators (higher = worse): normal labels
        labels[0].textContent = 'Very High';  // Dark red = very high (worst)
        labels[1].textContent = 'High';
        labels[2].textContent = 'Medium-High';
        labels[3].textContent = 'Medium';
        labels[4].textContent = 'Low';
        labels[5].textContent = 'Very Low';   // Dark green = very low (best)
    }
}

// Update layer display
function updateLayer(layer) {
    currentLayer = layer;
    const config = layerConfig[layer];

    // Update UI
    document.getElementById('current-layer-title').textContent = config.title;
    document.getElementById('current-layer-description').textContent = config.description;
    document.getElementById('detailed-definition').textContent = config.detailedDefinition;

    // Update legend based on metric type
    updateLegend(config.reversed);

    // Update button states
    document.querySelectorAll('.layer-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.layer === layer) {
            btn.classList.add('active');
        }
    });

    // Update globe colors
    if (globe) {
        globe.polygonCapColor(feat => {
            const numericId = String(feat.id).padStart(3, '0');
            const iso = numericToISO[numericId];
            const countryData = iso ? dataByISO[iso] : null;

            if (!countryData) {
                return '#555555';
            }

            const value = countryData[config.dataKey];
            const color = getColor(value, config.scale[0], config.scale[1], config.reversed);
            return color;
        });
    }

    // Reset stats panel
    resetStatsPanel();
}

// Event listeners for layer buttons
document.addEventListener('DOMContentLoaded', () => {
    // Always initialize globe (removed lazy loading for reliability)
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
        mortgage: { min: Infinity, max: -Infinity, avg: 0, count: 0 },
        expenditure: { min: Infinity, max: -Infinity, avg: 0, count: 0 },
        construction: { min: Infinity, max: -Infinity, avg: 0, count: 0 },
        priceToIncome: { min: Infinity, max: -Infinity, avg: 0, count: 0 },
        informalHousing: { min: Infinity, max: -Infinity, avg: 0, count: 0 },
        costBurden: { min: Infinity, max: -Infinity, avg: 0, count: 0 },
        socialRental: { min: Infinity, max: -Infinity, avg: 0, count: 0 }
    };

    housingData.forEach(d => {
        if (d.housingDeficitPerCapita !== null && d.housingDeficitPerCapita !== undefined) {
            stats.deficit.min = Math.min(stats.deficit.min, d.housingDeficitPerCapita);
            stats.deficit.max = Math.max(stats.deficit.max, d.housingDeficitPerCapita);
            stats.deficit.avg += d.housingDeficitPerCapita;
            stats.deficit.count++;
        }

        if (d.householdDebtToGDP !== null && d.householdDebtToGDP !== undefined) {
            stats.mortgage.min = Math.min(stats.mortgage.min, d.householdDebtToGDP);
            stats.mortgage.max = Math.max(stats.mortgage.max, d.householdDebtToGDP);
            stats.mortgage.avg += d.householdDebtToGDP;
            stats.mortgage.count++;
        }

        if (d.housingExpenditureToGDP !== null && d.housingExpenditureToGDP !== undefined) {
            stats.expenditure.min = Math.min(stats.expenditure.min, d.housingExpenditureToGDP);
            stats.expenditure.max = Math.max(stats.expenditure.max, d.housingExpenditureToGDP);
            stats.expenditure.avg += d.housingExpenditureToGDP;
            stats.expenditure.count++;
        }

        if (d.constructionJobsPerCapita !== null && d.constructionJobsPerCapita !== undefined) {
            stats.construction.min = Math.min(stats.construction.min, d.constructionJobsPerCapita);
            stats.construction.max = Math.max(stats.construction.max, d.constructionJobsPerCapita);
            stats.construction.avg += d.constructionJobsPerCapita;
            stats.construction.count++;
        }

        if (d.housePriceToIncome !== null && d.housePriceToIncome !== undefined) {
            stats.priceToIncome.min = Math.min(stats.priceToIncome.min, d.housePriceToIncome);
            stats.priceToIncome.max = Math.max(stats.priceToIncome.max, d.housePriceToIncome);
            stats.priceToIncome.avg += d.housePriceToIncome;
            stats.priceToIncome.count++;
        }

        if (d.informalHousingShare !== null && d.informalHousingShare !== undefined) {
            stats.informalHousing.min = Math.min(stats.informalHousing.min, d.informalHousingShare);
            stats.informalHousing.max = Math.max(stats.informalHousing.max, d.informalHousingShare);
            stats.informalHousing.avg += d.informalHousingShare;
            stats.informalHousing.count++;
        }

        if (d.housingCostBurden !== null && d.housingCostBurden !== undefined) {
            stats.costBurden.min = Math.min(stats.costBurden.min, d.housingCostBurden);
            stats.costBurden.max = Math.max(stats.costBurden.max, d.housingCostBurden);
            stats.costBurden.avg += d.housingCostBurden;
            stats.costBurden.count++;
        }

        if (d.socialRentalHousing !== null && d.socialRentalHousing !== undefined) {
            stats.socialRental.min = Math.min(stats.socialRental.min, d.socialRentalHousing);
            stats.socialRental.max = Math.max(stats.socialRental.max, d.socialRentalHousing);
            stats.socialRental.avg += d.socialRentalHousing;
            stats.socialRental.count++;
        }
    });

    if (stats.deficit.count > 0) stats.deficit.avg /= stats.deficit.count;
    if (stats.mortgage.count > 0) stats.mortgage.avg /= stats.mortgage.count;
    if (stats.expenditure.count > 0) stats.expenditure.avg /= stats.expenditure.count;
    if (stats.construction.count > 0) stats.construction.avg /= stats.construction.count;
    if (stats.priceToIncome.count > 0) stats.priceToIncome.avg /= stats.priceToIncome.count;
    if (stats.informalHousing.count > 0) stats.informalHousing.avg /= stats.informalHousing.count;
    if (stats.costBurden.count > 0) stats.costBurden.avg /= stats.costBurden.count;
    if (stats.socialRental.count > 0) stats.socialRental.avg /= stats.socialRental.count;

    console.log('Global Housing Statistics:', stats);
    console.log(`Data coverage: ${housingData.length} countries`);
}

// Calculate stats on load
calculateStats();
