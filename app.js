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
        scale: [0, 15],
        unit: ' homes/100k',
        reversed: true  // Higher is better - more green certified homes
    },
    cementAffordability: {
        title: 'Cement Affordability Index',
        description: 'Days of average income needed to buy one 50kg bag of cement. Lower values (green) = affordable construction materials. Higher values (red) = expensive cement blocking affordable housing. Based on Global Petrol Prices, Trading Economics, and national construction material price surveys.',
        detailedDefinition: 'This index measures how many days of average income are required to purchase one standard 50kg bag of Portland cement, the fundamental building material for housing construction. Formula: (Price of 50kg cement bag in USD) / (Daily GDP per capita in USD). Cement costs directly impact housing affordability since cement typically represents 10-15% of total construction costs and is essential for foundations, walls, and structural elements. High values indicate expensive cement due to: import dependencies (landlocked countries, island nations), local monopolies/cartels controlling production, high energy costs for cement kilns, poor infrastructure raising transport costs, or protectionist tariffs. Low values indicate: domestic cement production capacity, competitive markets, economies of scale, or government subsidies for construction materials. Score interpretation: Very Affordable (0-1 days) = Competitive cement markets with local production - enables affordable housing construction. Examples: China (world\'s largest producer), India (2nd largest), USA, Turkey, Brazil (strong domestic production). Affordable (1-2 days) = Good availability with some import or transport costs. Moderate (2-4 days) = Mid-range costs, typical for smaller countries or those with limited production. Expensive (4-7 days) = Import-dependent or monopolistic markets - significantly raises housing costs. Very Expensive (7+ days) = Prohibitively expensive cement blocking affordable construction - often landlocked African countries, small islands, or conflict zones. Cement affordability directly affects: affordable housing construction costs, self-build housing feasibility (informal sector), housing quality (expensive cement leads to substitution with weaker materials), and housing deficit solutions (high material costs block supply response). Countries can improve cement affordability through: supporting domestic production capacity, breaking up cement cartels, reducing energy costs for kilns, improving transport infrastructure, regional trade agreements for cement imports, or targeted subsidies for affordable housing projects.',
        dataKey: 'cementAffordabilityDays',
        scale: [0, 10],
        unit: ' days income',
        reversed: false  // Lower is better - fewer days to afford cement
    },
    resilienceCertified: {
        title: 'Resilience-Certified Projects per Capita',
        description: 'BRI, RELi, Fortified, and other resilience-certified buildings per 100,000 people. Measures climate adaptation and disaster preparedness in construction. Higher values (green) = greater adoption of resilient building practices. Based on IFC Building Resilience Index, USGBC RELi, IBHS Fortified, and national resilience programs.',
        detailedDefinition: 'This metric measures the penetration of resilience certifications in construction, specifically IFC Building Resilience Index (BRI - location-specific hazard assessment tool covering 145 projects in 19 countries across East Asia, Pacific, South Asia, and Latin America), RELi (Resilient Design certification), IBHS Fortified (hurricane/wind resistance), and other national resilience standards per 100,000 population. Resilience certifications ensure buildings can withstand and recover from climate impacts, natural disasters, and extreme weather events including hurricanes, floods, earthquakes, wildfires, and heat waves. These certifications go beyond standard building codes to incorporate climate adaptation, passive survivability, community resilience, and disaster recovery planning. High values indicate strong commitment to climate-resilient housing through: mandatory resilience standards, insurance incentives (lower premiums for certified buildings), post-disaster building code upgrades, climate adaptation policies, and developer adoption. Score interpretation: Very Low (0-1 per 100k) = Minimal resilience certification - most countries without formal programs; Low (1-5 per 100k) = Emerging adoption - pilot projects in disaster-prone regions; Medium (5-15 per 100k) = Moderate adoption - resilience standards in high-risk areas; High (15-30 per 100k) = Strong adoption - widespread resilience requirements; Very High (30+ per 100k) = Leadership - comprehensive resilience mandates and market transformation. Leading countries: USA (IBHS Fortified in hurricane states, RELi certification), Japan (seismic resilience standards), Netherlands (flood resilience), New Zealand (post-Christchurch earthquake resilience), Caribbean nations (hurricane resilience programs), Philippines (typhoon-resilient housing). Benefits of resilience-certified housing: reduced disaster damage and repair costs, lower insurance premiums (up to 50% reduction), improved occupant safety during disasters, faster post-disaster recovery, protection of affordable housing investments, and climate adaptation for vulnerable communities. Resilience certification particularly important for: coastal communities facing sea-level rise and hurricanes, earthquake zones requiring seismic retrofitting, flood-prone areas needing elevated construction, wildfire interfaces requiring defensible space, and low-income communities vulnerable to climate impacts. Countries can improve resilience through: updating building codes for climate risks, insurance incentives for certified construction, targeted resilience programs for affordable housing, post-disaster reconstruction standards, and community resilience planning.',
        dataKey: 'resilienceCertifiedPerCapita',
        scale: [0, 20],
        unit: ' projects/100k',
        reversed: true  // Higher is better - more resilience-certified projects
    },
    vacancyRate: {
        title: 'Housing Vacancy Rate',
        description: 'Percentage of housing units sitting empty (excluding seasonal/holiday homes where data allows). Measures housing market efficiency and potential for reactivation. Lower values (green) = efficient housing use, higher values (red) = wasted housing stock. Based on census data, OECD HM1.1, Eurostat, and national statistics.',
        detailedDefinition: 'This metric measures the percentage of total housing stock that sits vacant or unoccupied. Vacancy rates reveal housing market inefficiencies, demographic shifts, and potential for reactivation without new construction. Causes of high vacancy vary by region: Aging populations (Japan 13.7%, Italy 18.5%, Eastern Europe 15-30%) - Shrinking households and emigration leave homes empty. Post-bubble oversupply (China 22%, Spain 12%, Portugal 12%, Ireland 10%) - 2008 financial crisis and speculative construction created ghost developments. Depopulation (Croatia 30%, Bulgaria 16%, Romania 15%) - Young people emigrating to Western Europe for work. Holiday home concentration (France 18%) - Seasonal properties inflate vacancy statistics. Wealth parking (luxury segments in global cities) - Investment properties held empty for appreciation. Low vacancy signals housing scarcity and strong demand: UK (0.9%), Netherlands (0.8%), Denmark (<1%), Singapore (1%), Luxembourg (1.2%) face severe housing shortages driving high prices and cost burdens. Optimal vacancy rate is 2-5% for healthy market function - allows mobility, renovations, normal turnover without shortage or waste. Policy implications: High vacancy countries (>10%) should consider vacancy taxes, conversion programs, and reactivation incentives before new construction. Low vacancy countries (<2%) need supply increases through construction, densification, and regulatory reform. Housing deficit countries with low vacancy (Bangladesh 1.5%, Ethiopia 1.5%, Kenya 2%) must build new supply - no empty stock to reactivate. Benefits of reducing vacancy: Lower housing costs through increased effective supply, reduced environmental impact (reuse vs new construction), preservation of affordable housing stock, revitalization of declining neighborhoods, and better land use efficiency. Vacancy patterns reveal whether housing crises stem from absolute shortage (build more) or inefficient allocation (activate existing stock). Countries can address vacancy through: Empty homes taxes (Vancouver, Paris), conversion incentives, compulsory purchase for chronic vacancy, property maintenance requirements, and tenant matching programs.',
        dataKey: 'vacancyRate',
        scale: [0, 15],
        unit: '%',
        reversed: false  // Lower is better - less wasted housing stock
    },
    housingDemandPressure: {
        title: 'Housing Demand Pressure Index (2024-2050)',
        description: 'Composite index measuring future housing demand from population growth and household size changes through 2050. Combines UN population projections with household formation trends. Higher values (red) = severe pressure requiring massive construction. Lower values (green) = manageable or declining demand. Based on UN World Population Prospects 2024 and UN Household Database 2022.',
        detailedDefinition: 'This forward-looking metric combines population growth projections (2024-2050) with household size trends to estimate future housing demand pressure. The index captures two simultaneous forces: Population Change - UN WPP 2024 projects which countries will grow (India +14%, Nigeria +54%, Pakistan +46%) versus decline (China -14%, Japan -13%, Eastern Europe -15-21%). Household Size Decline - Globally, household size has fallen 0.5 persons per decade, creating hidden housing demand even in stable populations. When household size drops from 2.5 to 2.0 people, the same population needs 25% more housing units. Calculation: Housing Demand Pressure = Annual Population Growth Rate + Household Formation Adjustment. Declining household size adds 0.4-1.5 points depending on speed of change (rapid in Asia/Europe, slow in Africa). Score interpretation: Very High (3.5-4.0+) = Extreme pressure, Sub-Saharan Africa (Angola 4.0, Uganda 3.9, Tanzania 3.8, Mali 3.9) with 2.0-2.7% population growth + stable large households. High (2.5-3.5) = Severe pressure, Fast-growing MENA/South Asia (Egypt 2.9, Pakistan 2.8, Saudi Arabia 2.5) and Africa (Kenya 3.2, Ethiopia 3.5, Nigeria 3.4). Moderate (1.5-2.5) = Significant pressure, Emerging Asia/Latin America (India 2.1, Philippines 2.4, Israel 2.6) with growth + declining households. Low (0.5-1.5) = Manageable pressure, Most OECD countries (Australia 2.0, Canada 1.6, USA 1.4, UK 1.2) with modest growth offset by household decline. Declining (<0.5) = Falling demand, Eastern Europe (Latvia 0.2, Lithuania 0.2, Bulgaria 0.2, Estonia 0.4) where population loss exceeds household formation needs. Regional patterns: Sub-Saharan Africa (67% population growth by 2050) = Highest pressure; Eastern Europe (depopulation + emigration) = Lowest pressure; Asia diverging (India growing, China/Japan/Korea shrinking); Latin America moderate growth with rapid household decline. Policy implications: High pressure countries (>2.5) need sustained construction at scale, infrastructure investment, and urban planning for rapid growth. Moderate pressure (1.5-2.5) requires steady supply increases and household formation support. Low/declining pressure (<1.0) should focus on renovation, adaptation, vacancy reduction rather than new construction. Declining household size is nearly universal: Sweden 1.8 persons, Germany 2.0, China 2.8 (rapid decline), India 4.4 (declining), Senegal 8.4 (slow decline). Only Sub-Saharan Africa maintains stable large households. Compound pressure examples: Egypt (1.6% population growth + declining households) faces demographic explosion; India (0.7% growth + 4.4 to ~3.5 household size) needs millions of new units annually; Eastern Europe (population loss BUT household decline) still needs housing renovation and urban adaptation despite shrinking populations. The index reveals that housing demand is not just about total population—household formation patterns matter equally. Germany with 0% population growth still needs housing as 2.0-person households become more common through aging, divorce, and solo living.',
        dataKey: 'housingDemandPressure',
        scale: [0, 4.0],
        unit: ' index',
        reversed: false  // Lower is better - less demand pressure
    },
    municipalSpendingEfficiency: {
        title: 'Municipal Spending Efficiency Index',
        description: 'Municipal budget per capita (USD) relative to urban density. Formula: (Municipal Budget Per Capita) / (Urban Density per 1000 people/sq km). Higher values (green) = well-resourced municipal services. Lower values (red) = under-resourced dense cities. Based on OECD MUNIFI/REGOFI, World Bank, UN-Habitat, Africapolis, and national statistics (2023-2024).',
        detailedDefinition: 'This metric measures municipal spending capacity relative to urban density, revealing which cities have adequate resources for housing and infrastructure services. Formula: (Municipal Budget Per Capita in USD) / (Urban Density per 1000 people/sq km). This normalizes spending by density to answer: do denser cities get proportional budgets, or are they under-resourced? High values (6000-7000) indicate well-funded municipal systems like Nordic countries - Denmark 6724.1 (budget $19,500/capita, density 2,900/km²), Norway 6909.1 ($15,200, 2,200/km²), Sweden 5153.8 ($13,400, 2,600/km²). These cities can afford quality infrastructure, social housing, and services. Medium values (500-2000) show moderate capacity - OECD countries like Switzerland 1634.6, Australia 1523.8, Netherlands 3555.6, developed systems with reasonable funding. Low values (100-400) indicate emerging economies with some municipal capacity - Brazil 163.0, Mexico 118.0, China 214.3, Malaysia 154.9, South Africa 125.5. Very low values (<100) reveal severely under-resourced dense cities - Bangladesh 3.7 (Dhaka 36,000/km², budget only $85/capita), Pakistan 8.2 (Karachi 24,000/km²), Philippines 12.0 (Manila 19,000/km²), India 19.8 (Mumbai 31,700/km²), Indonesia 16.9 (Jakarta 15,900/km²). These megacities have extreme density but minimal municipal budgets, making affordable housing provision nearly impossible. The pattern is stark: dense cities in developing countries face a double challenge - very high density that should enable economies of scale, but extremely low budgets that prevent adequate service delivery. Data sources: OECD MUNIFI Database (37 OECD+EU countries, most reliable local government finance data), OECD REGOFI (regional government data), World Bank Government Finance Statistics, UN-Habitat Urban Finance database, Africapolis urban density data (7,617 African agglomerations), national statistical offices, municipal budget reports. Urban density measured as average density in major urban agglomerations (people per sq km), not national density. Municipal budget includes local government spending on infrastructure, services, housing, but excludes national/regional transfers counted as local revenue. Policy implications: Low-efficiency countries (<100) need massive increases in municipal revenue - through local taxation, national transfers, or international development finance - to build affordable housing and infrastructure at scale. Decentralized fiscal systems (Nordic, Switzerland) show highest efficiency by empowering local governments with revenue authority. Centralized systems in developing countries often starve cities of resources despite rapid urbanization. The metric reveals why informal housing persists: cities like Dhaka, Karachi, Manila lack the municipal budget to provide formal affordable alternatives, forcing residents into slums despite high density that should enable efficient service delivery.',
        dataKey: 'municipalSpendingEfficiency',
        scale: [0, 2000],
        unit: ' USD/capita per 1k density',
        reversed: true  // Higher is better - more municipal resources
    },
    mortgagePenetrationPerCapita: {
        title: 'Mortgage Penetration Rate',
        description: 'Percentage of households with a mortgage. Measures housing finance accessibility and mortgage market breadth. Higher values (green) = widespread access to housing finance. Lower values (red) = limited formal mortgage markets, cash/family financing dominates. Based on World Bank, OECD, national housing surveys, central banks (2024).',
        detailedDefinition: 'This metric measures the percentage of all households (owner-occupied and rented) that have a residential mortgage, revealing the reach and accessibility of formal housing finance systems. Very High (50-70%): Nordic leaders with exceptional mortgage penetration - Denmark 65% (European leader), Norway 58%, Netherlands 52%, Sweden 48%, Finland 45%. These countries combine high homeownership rates (60-80%) with widespread mortgage use, long-term fixed mortgages (20-30 years), and deep financial inclusion. Most homeowners use leverage rather than outright ownership. High (35-50%): Anglo-developed markets - USA 41% (37% of owner-occupied homes mortgaged), Australia 35%, Canada 38%, Japan 38%, Belgium 35%, New Zealand 36%. Mature mortgage markets with established lending infrastructure, though USA includes high outright ownership among elderly. Medium-High (25-35%): Western Europe mixed - Switzerland 42%, UK 32%, France 28%, Austria 28%, Ireland 34%, South Korea 32%, Singapore 31%. Significant mortgage usage but also substantial outright ownership or rental cultures (Germany 26% due to high rental preference). Medium (15-25%): Southern/Eastern Europe + emerging Asia - Spain 24%, Estonia 24%, Malaysia 24%, South Africa 22%, Chile 22% (Latin America leader), Portugal 22%, Czech 20%, Latvia 20%. Growing mortgage markets but limited by income, financial development, or cultural preferences for outright ownership. Low (8-15%): Emerging markets with nascent mortgage finance - Mexico 14%, Turkey 15%, Brazil 11%, Uruguay 12%, China 18% (urban much higher, rural minimal), Russia 9%, Argentina 6%, Peru 8%, Iran 8%. Mortgage markets exist but serve small middle-class minority; majority rely on cash/family. Very Low (0-8%): Minimal formal mortgage markets - India 4% (despite 1.4B population), Indonesia 3%, Thailand 7%, Colombia 10%, Nigeria 1%, Kenya 2%, Pakistan 2%, Bangladesh 1%, Ethiopia 0.5%. Underdeveloped financial systems, weak property rights, limited banking reach. Housing financed through informal savings, family networks, employer schemes, or incremental self-construction. The global mortgage divide is stark: Denmark has 130x higher household penetration than Ethiopia. This isn\'t just about wealth - it reflects legal systems (property registration, foreclosure laws), financial infrastructure (credit bureaus, banking reach), regulatory frameworks (capital requirements, mortgage regulations), and cultural norms (comfort with debt, multigenerational housing). Data sources: World Bank Global Findex Database, OECD Affordable Housing Database, national housing surveys (US Census Housing Survey, UK English Housing Survey), central bank household debt reports, housing finance institutions. Methodology: mortgaged households / total households, including both owner-occupied and rental units. Policy implications: Low-penetration countries need: (1) Financial sector development - credit registries, collateral frameworks, foreclosure mechanisms, (2) Targeted housing finance institutions - government mortgage banks like India\'s NHB, Mexico\'s Infonavit, South Africa\'s FLISP, (3) Affordability mechanisms - subsidized rates for low-income, long-term fixed mortgages, (4) Property rights - clear titling, cadastral systems, (5) Macroprudential regulation to prevent overleveraging. Without mortgage finance, homeownership becomes a privilege of the wealthy, perpetuating inequality and forcing families into informal settlements or multigenerational living.',
        dataKey: 'mortgagePenetrationPerCapita',
        scale: [0, 70],
        unit: '%',
        reversed: true  // Higher is better - more households have access to housing finance
    },
    homeInsurancePenetration: {
        title: 'Home Insurance Penetration Rate',
        description: 'Percentage of households with home insurance. Measures insurance market reach and risk protection culture. Higher values (green) = widespread protection against disasters and property loss. Lower values (red) = minimal insurance coverage, high vulnerability to housing shocks. Based on Swiss Re Sigma, national insurance regulators, World Bank (2024).',
        detailedDefinition: 'This metric measures the percentage of households with residential property insurance, revealing insurance market sophistication, risk awareness, and financial resilience. Very High (85-96%): Nordic/Northern Europe near-universal coverage - Denmark 96% (world leader, bundled with mortgages), Norway 95%, Sweden 94%, Switzerland 94% (quasi-mandatory), Netherlands 93%, Finland 92%. Insurance deeply embedded in housing finance and culture; lenders require it, governments incentivize it. Comprehensive coverage protects against fire, water, storms, liability. High (75-89%): Anglo-developed markets with strong coverage - USA 85% of homeowners (mandatory for mortgages, though declining in high-risk areas like Florida due to cost), Australia 88% (cyclone/bushfire awareness drives uptake), Canada 82%, Germany 86% (strong insurance tradition), France 89% (mandatory for renters + homeowners). Medium-High (65-80%): Western Europe + disaster-aware markets - New Zealand 80% (Earthquake Commission public fund + private coverage), UK 78%, Belgium 81%, Austria 79%, Japan 71% (earthquake insurance separate and less common despite risk). Medium (50-65%): Southern Europe + East Asia - Spain 65%, Czech 56%, South Africa 55%, Chile 52% (Latin America leader), Estonia 62%, Latvia 54%, Lithuania 51%. Growing middle class with insurance, but many households unprotected. Medium-Low (35-50%): Emerging insurance markets - Malaysia 48%, Hungary 48%, Poland 52%, UAE 45%, Slovenia 45%, Turkey 38% (shockingly low despite severe earthquake risk - 1999 Izmit and 2023 Kahramanmaras earthquakes killed 62,000). Small elite/middle class insured, majority vulnerable. Low (20-35%): Limited insurance reach - Italy 42% (low despite wealth), Greece 35%, Costa Rica 38%, Mexico 34%, Brazil 28%, Panama 42%, Uruguay 32%, China 32% (urban concentrations). Very Low (1-20%): Minimal insurance penetration - India 6% (despite 1.4B population and monsoon/earthquake risks), Indonesia 8% (shocking given tsunami/earthquake/volcano risks), Thailand 18%, Vietnam 12%, Philippines 11% (despite annual typhoons causing massive destruction), Colombia 24%, Peru 19%, Argentina 18%, Russia 14%, Egypt 8%, Morocco 12%, Nigeria 2%, Kenya 4%, Bangladesh 2%, Ethiopia 1%. These countries face catastrophic natural disaster risks yet populations are almost entirely uninsured. Post-disaster reconstruction falls on families/government, perpetuating poverty cycles. The global insurance gap is staggering: Denmark has 96x higher household coverage than Ethiopia, and 48x higher than Nigeria. This isn\'t just about income - many disaster-prone developing countries have lower insurance rates than their risk profiles demand. Factors: (1) Affordability - premiums unaffordable for poor households, (2) Awareness - lack of understanding of insurance benefits, (3) Trust - skepticism of insurers paying claims, (4) Availability - limited insurance company reach in rural areas, (5) Regulation - weak consumer protections, (6) Informality - unregistered/untitled homes can\'t be insured. Data sources: Swiss Re Sigma World Insurance Reports (industry standard, surveys insurers globally), national insurance regulators (NAIC USA, FCA UK, EIOPA Europe, IRDAI India), World Bank Global Findex financial inclusion surveys, OECD Insurance Statistics. Methodology: households with property/homeowners insurance / total households. Includes owner-occupied and renter\'s insurance. Policy implications: Low-penetration countries face perpetual disaster-reconstruction cycles. Solutions: (1) Mandatory insurance - France requires renters insurance, Turkey post-2023 pushing compulsory earthquake coverage, (2) Microinsurance - affordable products for low-income ($1-5/month parametric policies), (3) Public-private partnerships - New Zealand Earthquake Commission model (government fund + private top-up), Caribbean CCRIF (regional catastrophic fund), (4) Premium subsidies - California FAIR plan for high-risk areas, India Pradhan Mantri Fasal Bima Yojana, (5) Building code enforcement - safer buildings = lower premiums = higher uptake, (6) Index/parametric insurance - pays on trigger (earthquake magnitude, rainfall) rather than loss assessment, faster payouts. Without insurance, disasters destroy housing wealth permanently. Philippines loses billions annually to typhoons, yet 89% uninsured. Bangladesh faces cyclones/floods yet 98% uninsured. This is a critical development gap.',
        dataKey: 'homeInsurancePenetration',
        scale: [0, 100],
        unit: '%',
        reversed: true  // Higher is better - more households protected from disasters
    },
    dataMismatchIndex: {
        title: 'Data Quality & Consistency',
        description: 'Measures data reliability and consistency across housing metrics (0-100 scale). Lower values (green) = reliable, consistent data from multiple sources. Higher values (red) = significant inconsistencies, measurement challenges, informal markets undercounted. Identifies where housing data should be interpreted with caution due to conflicting sources, statistical infrastructure gaps, or informal economy prevalence.',
        detailedDefinition: 'This composite index reveals data quality, measurement reliability, and statistical infrastructure across housing metrics. Very Low (0-15): Excellent data quality - Denmark 5, Norway 6, Sweden 7, Switzerland 8, Finland 8 (Nordic countries with comprehensive national registries, digitized property records, transparent governance, frequent surveys, minimal informal economy <10%, universal registration, ISO-certified statistical agencies). Low (15-30): Good data quality - Iceland 12, Singapore 13, Netherlands 9, Austria 10, Belgium 11, Germany 14 (developed countries with strong infrastructure, minor challenges from tourism/expat populations). Moderate (30-50): Moderate inconsistencies - UK 16, Canada 18, Australia 21, USA 24 (regional variation, homeless undercounting, indigenous housing gaps), France 22 (vacation home counting affects vacancy), Japan 28 (aging creates data lag), South Korea 31 (jeonse deposit system complicates debt classification), Chile 34, Czech 29. Medium-High (50-65): Significant challenges - Spain 35, Italy 38, Greece 42 (informal economy 20-30% GDP, vacation properties, tax evasion affects transactions, vacancy-deficit paradoxes), Poland 36, Romania 51, Bulgaria 53, Croatia 48 (emigration creates population lags, informal construction unreported), Brazil 62, Mexico 58, Colombia 59, India 64 (informal settlements partially unmeasured, regional quality varies, slums undercounted). High (65-75): Major data gaps - Ukraine 67 (war displacement, Crimea/Donbas missing), Kenya 68 (Kibera population disputed 250k-1M, 60% informal), Tanzania 71, Ethiopia 73 (60-80% informal, rural minimal), Nigeria 77 (population disputed, Boko Haram areas, 60-70% informal), Bangladesh 71 (Dhaka slum estimates vary 40-60%, char lands unmeasured), Pakistan 69 (katchi abadis undercounted), Philippines 66 (40-50% informal disputed), Indonesia 67 (kampung undercount), Egypt 59 (ashwaiyyat ~60% urban undercount). Very High (75-90): Severe infrastructure breakdown - Venezuela 78 (hyperinflation destroys price data, 7M emigrants), Libya 82 (civil war, tribal land), DR Congo 81 (conflict zones, 80%+ informal), Haiti 84 (earthquake, 70%+ informal), South Sudan 85 (no proper census), Afghanistan 86 (war, Taliban, rural unmeasured), Somalia 87 (no census since 1975, Al-Shabaab areas), Syria 89 (war 2011-present, 13M displaced, data infrastructure collapsed). Key mismatch patterns: (1) Vacancy-Deficit Paradox - Croatia 30% vacancy + deficit (emigration), Greece/Spain high vacancy + crisis (speculation), China 22% vacancy + construction (overbuilding). (2) Affordability-Deficit Gap - Low official prices + high deficit suggests informal housing not captured (India, Bangladesh, Nigeria, Ethiopia). (3) Finance-Ownership Inconsistency - High debt but low mortgage penetration (South Korea jeonse, Japan deleveraging). (4) Insurance-Risk Mismatch - Low insurance in high disaster areas (Philippines 11% despite typhoons, Bangladesh 2% despite cyclones, Indonesia 8% despite tsunamis/earthquakes, Turkey 38% despite major quakes). (5) Construction-Deficit Gap - High activity but persistent deficit indicates luxury vs affordable mismatch or informal uncounted (India, Nigeria, China). (6) Informal-Formal Inconsistency - Official homeownership contradicts high informal settlements indicating titling issues (Kenya, Nigeria, Philippines, Indonesia, Egypt, Mexico). (7) Demographic Lag - Emigration (Eastern Europe, Venezuela) or immigration (UAE, Qatar) creates population errors. (8) Conflict/Disaster Impact - War zones (Syria, Yemen, Somalia, Afghanistan, Ukraine), post-disaster (Haiti 2010, Philippines typhoons, Nepal 2015), gang areas (El Salvador, Honduras, Mexico) have unmeasured/outdated data. (9) Governance - Authoritarian (Eritrea, Belarus), failed states (Somalia), limited capacity (Chad, CAR, Niger) have unreliable/fabricated data. Data sources: Transparency International Corruption Index, World Bank Statistical Capacity Indicator, PARIS21, OECD data quality assessments, academic research on measurement challenges, discrepancies between UN-Habitat/World Bank/OECD/national statistics. Methodology: Expert assessment combining quantitative discrepancies (coefficient of variation across sources >20%, census revisions >10%) and qualitative factors (informal economy size, conflict, infrastructure, governance). Policy implications: High-mismatch countries need statistical infrastructure investment - national housing surveys (US AHS, UK EHS models), property registries (blockchain like Georgia/Rwanda), informal settlement mapping (satellite imagery, GIS, participatory mapping), census capacity, open data. Researchers/policymakers must interpret high-mismatch data cautiously - use ranges not point estimates, triangulate sources, acknowledge uncertainty. Development organizations should prioritize data infrastructure - cannot solve housing crisis without measuring accurately. This metric helps users identify where data is trustworthy (Nordic, developed) vs requires validation (conflict zones, informal-dominated). Lower = reliable for decisions; higher = uncertainty requiring ground-truth.',
        dataKey: 'dataMismatchIndex',
        scale: [0, 100],
        unit: ' data reliability',
        reversed: false  // Higher is worse - more data inconsistencies
    },
    homeownershipRate: {
        title: 'Homeownership Rate',
        description: 'Percentage of households that own their home rather than rent (18%-96%). High ownership (dark green): Eastern Europe 85-96% (post-communist privatization), Asia 85-90% (cultural preference). Medium (yellow): Anglo countries 60-70%, balanced tenure mix. Low (red): Germany 52%, Switzerland 42% (strong rental cultures). Reveals housing tenure patterns, wealth building opportunities, and rental market development.',
        dataKey: 'homeownershipRate',
        scale: [18, 96],
        unit: '% own',
        reversed: true  // Higher is better - more ownership
    },
    housingStockAtRisk: {
        title: 'Housing Stock at Disaster Risk',
        description: 'Percentage of housing stock vulnerable to collapse or severe damage during natural disasters (5.9%-82.5%). Very High (red): Haiti 82.5%, Nepal 76%, Bangladesh 72%, Syria 81% (poor codes + high exposure + informal housing). Moderate (yellow): Mexico 42%, Italy 34%, USA 23% (codes improving but exposure high). Low (green): Japan 14%, Chile 18%, Switzerland 10% (excellent seismic codes despite high exposure). Critical for disaster risk reduction investment.',
        dataKey: 'housingStockAtRisk',
        scale: [5, 85],
        unit: '% at risk',
        reversed: false  // Higher is worse - more vulnerability
    },
    affordabilityTrend: {
        title: 'Affordability Trend (2019-2025)',
        description: 'Housing affordability change from 2019-2025. Scale: -10 (severe worsening) to +10 (improving). Negative (red) = prices rising faster than incomes. Positive (green) = improving affordability. Most countries worsening: New Zealand -9.6 (worst), Canada -9.2, Australia -8.8, USA -8.4. Rare improvers: Venezuela +2.4 (economic collapse paradox). Based on price-to-income changes, wage growth, interest rates, policy interventions.',
        dataKey: 'affordabilityTrend',
        scale: [-10, 3],
        unit: ' trend',
        reversed: true  // Higher (positive) is better - improving affordability
    },
    housingUnaffordabilityRate: {
        title: 'Housing Unaffordability Rate',
        description: 'Percentage of households unable to afford a basic formal house (using 30% income rule). Very High (red): Haiti 88%, Madagascar 86%, Ethiopia 85%, Bangladesh 82% - most rely on informal housing. High: Nigeria 84%, Kenya 79%, India 68% - formal housing elite market. Moderate: USA 38%, UK 43%, Germany 35%. Low (green): Singapore 24% (HDB model), Qatar 29%, Japan 28%. Shows housing accessibility crisis in developing countries and squeezed middle class in developed nations.',
        dataKey: 'housingUnaffordabilityRate',
        scale: [20, 90],
        unit: '% cannot afford',
        reversed: false  // Higher is worse - more households priced out
    },
    programTargetingEfficiency: {
        title: 'Housing Program Targeting Efficiency',
        description: 'How well housing subsidies reach intended beneficiaries (0-100 scale). Excellent (dark green): Singapore 91.2 (HDB strict income limits), Chile 87.4 (Subsidio Habitacional), Netherlands 84.8, Indonesia 82.6 (BSPS home improvement grants). Good: Brazil 72.4, South Africa 72.8. Mixed: USA 58.2 (Section 8 good, mortgage deduction regressive), China 56.4 (connections matter). Poor (red): Venezuela 32.4 (political allocation), Angola 34.2 (elite capture), Haiti 29.6. Evaluates mortgage subsidies, home improvement grants, rental assistance, construction subsidies, land programs.',
        dataKey: 'programTargetingEfficiency',
        scale: [28, 92],
        unit: ' targeting score',
        reversed: true  // Higher is better - better targeting to poor/middle class
    },
    housingRecommendations: {
        title: 'Policy Recommendations',
        description: 'Evidence-based housing policy recommendations from UN-Habitat, World Bank, IDB, and CAHF reports (2020-2025). Country-specific actionable interventions based on national housing sector assessments, regional reviews, and best practice evaluations. Green indicates countries with available recommendations from authoritative sources.',
        dataKey: 'housingRecommendations',
        scale: [0, 1],  // Binary: has recommendations or not
        unit: '',
        isTextLayer: true  // Special flag for non-numeric data
    },
    uninsurableHomes: {
        title: 'Uninsurable Homes',
        description: 'Percentage of homes that cannot obtain standard private insurance and must rely on government last-resort programs (FAIR plans, Citizens Insurance, NFIP) or go completely uninsured. Very High (red): Haiti 96%, Bangladesh 92%, Ethiopia 95% - virtually no insurance market. High: India 86%, Philippines 79%, Nigeria 92%. Moderate: USA 14.2%, Italy 18.5%. Low (green): Denmark 0.8%, Switzerland 1.2%, Norway 1.1%. Click USA for state-level breakdown. Sources: Swiss Re Sigma, FEMA, III, Lloyd\'s, World Bank (2024).',
        dataKey: 'uninsurableHomesPercent',
        scale: [0, 96],
        unit: '% uninsurable',
        reversed: false  // Higher is worse - more homes cannot get insurance
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

// City view state
let cityViewActive = false;
let currentZoomedCountry = null;

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

// Add city markers to the globe
function addCityMarkers() {
    if (!globe || !cityData) return;

    globe
        .pointsData(cityData)
        .pointLat('lat')
        .pointLng('lng')
        .pointColor(d => {
            const config = layerConfig[currentLayer];
            // Use informal settlements as a proxy for housing crisis intensity
            const value = d.informalSettlementsPercent;
            if (value > 60) return '#cc0000';  // Severe
            if (value > 50) return '#ff4500';
            if (value > 40) return '#ff9933';
            if (value > 30) return '#ffff00';
            if (value > 20) return '#66ff66';
            return '#00cc66';  // Low informality
        })
        .pointAltitude(0.02)
        .pointRadius(d => {
            // Scale radius by population (logarithmic scale)
            return Math.log(d.population) * 0.08;
        })
        .pointLabel(d => {
            return `
                <div style="
                    background: rgba(0, 0, 0, 0.95);
                    padding: 12px 16px;
                    border-radius: 8px;
                    border: 2px solid #4facfe;
                    color: white;
                    font-family: 'Segoe UI', sans-serif;
                    max-width: 320px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.4);
                ">
                    <div style="font-size: 16px; font-weight: bold; margin-bottom: 8px; color: #00f2fe;">
                        ${d.city}, ${d.country}
                    </div>
                    <div style="font-size: 13px; line-height: 1.5; border-top: 1px solid rgba(255,255,255,0.2); padding-top: 8px;">
                        <div style="margin: 4px 0;">
                            <strong style="color: #4facfe;">Population:</strong>
                            <span style="float: right; color: #fff;">${(d.population / 1000).toFixed(1)}M</span>
                        </div>
                        <div style="margin: 4px 0;">
                            <strong style="color: #4facfe;">Housing Deficit:</strong>
                            <span style="float: right; color: #fff;">${(d.housingDeficit / 1000).toFixed(0)}k units</span>
                        </div>
                        <div style="margin: 4px 0;">
                            <strong style="color: #4facfe;">Informal Settlements:</strong>
                            <span style="float: right; color: #fff;">${d.informalSettlementsPercent}%</span>
                        </div>
                        <div style="margin: 4px 0;">
                            <strong style="color: #4facfe;">Slum Population:</strong>
                            <span style="float: right; color: #fff;">${(d.slumPopulation / 1000).toFixed(1)}M</span>
                        </div>
                        <div style="margin: 4px 0;">
                            <strong style="color: #4facfe;">Density:</strong>
                            <span style="float: right; color: #fff;">${d.density.toLocaleString()}/km²</span>
                        </div>
                        <div style="margin: 4px 0;">
                            <strong style="color: #4facfe;">Avg Rent:</strong>
                            <span style="float: right; color: #fff;">$${d.averageRent}/month</span>
                        </div>
                    </div>
                    ${d.notes ? `
                        <div style="font-size: 11px; color: #aaa; margin-top: 6px; padding-top: 6px; border-top: 1px solid rgba(255,255,255,0.1); font-style: italic;">
                            ${d.notes}
                        </div>
                    ` : ''}
                </div>
            `;
        });
}

// Zoom to a country and highlight its cities
function zoomToCountry(iso, feature) {
    currentZoomedCountry = iso;
    cityViewActive = true;

    // Get the country's bounding box center
    // Simple approach: use first city as zoom target, or calculate centroid
    const countryCities = cityData.filter(c => c.iso === iso);

    if (countryCities.length > 0) {
        // Calculate centroid of cities
        const avgLat = countryCities.reduce((sum, c) => sum + c.lat, 0) / countryCities.length;
        const avgLng = countryCities.reduce((sum, c) => sum + c.lng, 0) / countryCities.length;

        // Zoom into the country
        globe.pointOfView({
            lat: avgLat,
            lng: avgLng,
            altitude: 0.8  // Close zoom level to see cities
        }, 1500);  // 1.5 second animation

        // Update stats panel to show city view
        updateCityListPanel(countryCities);
    } else {
        // No city data available, just zoom to polygon center
        alert(`City-level data not yet available for this country. Currently covering ${
            [...new Set(cityData.map(c => c.country))].length
        } countries with detailed city data.`);
    }
}

// Update stats panel to show list of cities
function updateCityListPanel(cities) {
    const statsPanel = document.getElementById('stats-panel');
    const countryName = cities[0].country;

    statsPanel.classList.add('has-data');
    statsPanel.innerHTML = `
        <h4>${countryName} - Cities</h4>
        <p style="font-size: 12px; color: #aaa; margin-bottom: 12px;">
            Click on city markers for detailed information
        </p>
        <div class="country-stats" style="max-height: 500px; overflow-y: auto;">
            ${cities.map(city => `
                <div style="margin-bottom: 10px; padding: 8px; background: rgba(79, 172, 254, 0.1); border-radius: 4px;">
                    <p style="margin: 2px 0;"><strong style="color: #00f2fe;">${city.city}</strong></p>
                    <p style="margin: 2px 0; font-size: 11px;">Pop: ${(city.population / 1000).toFixed(1)}M | Deficit: ${(city.housingDeficit / 1000).toFixed(0)}k units</p>
                    <p style="margin: 2px 0; font-size: 11px;">Informal: ${city.informalSettlementsPercent}% | Density: ${city.density.toLocaleString()}/km²</p>
                </div>
            `).join('')}
        </div>
        <button onclick="resetGlobeView()" style="
            margin-top: 12px;
            padding: 8px 16px;
            background: #4facfe;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 13px;
            width: 100%;
        ">
            ← Back to Global View
        </button>
    `;
}

// Show US state-level insurability data
function showUSStateInsurability() {
    const statsPanel = document.getElementById('stats-panel');
    statsPanel.classList.add('has-data');

    // Sort states by uninsurable percentage (worst first)
    const sortedStates = Object.entries(usStateInsurabilityData)
        .sort((a, b) => b[1].pct - a[1].pct);

    const stateRows = sortedStates.map(([state, data]) => {
        let color = '#00cc66';
        if (data.pct > 20) color = '#cc0000';
        else if (data.pct > 15) color = '#ff4500';
        else if (data.pct > 10) color = '#ff9933';
        else if (data.pct > 7) color = '#ffff00';
        else if (data.pct > 4) color = '#66ff66';

        return `
            <div style="margin-bottom: 10px; padding: 10px; background: rgba(255,255,255,0.05); border-radius: 6px; border-left: 3px solid ${color};">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <strong style="color: #fff;">${state}</strong>
                    <span style="color: ${color}; font-weight: 700; font-size: 15px;">${data.pct}%</span>
                </div>
                <p style="margin: 6px 0 0; font-size: 12px; color: #bbb; line-height: 1.5;">${data.reason}</p>
            </div>
        `;
    }).join('');

    statsPanel.innerHTML = `
        <h4>United States - Uninsurable Homes by State</h4>
        <p style="color: #ff9500; font-weight: 600; margin-bottom: 5px; font-size: 14px;">
            National Average: 14.2% of homes cannot get standard private insurance
        </p>
        <p style="font-size: 12px; color: #aaa; margin-bottom: 15px;">
            Sources: FEMA NFIP, CA FAIR Plan, FL Citizens, III, state insurance commissioners (2024)
        </p>
        <div class="country-stats" style="max-height: 600px; overflow-y: auto;">
            ${stateRows}
        </div>
        <button onclick="resetGlobeView()" style="
            margin-top: 12px; padding: 10px 16px; background: #4facfe; color: white;
            border: none; border-radius: 6px; cursor: pointer; font-size: 13px; width: 100%;
        ">← Back to Global View</button>
    `;

    // Zoom to US
    globe.pointOfView({ lat: 39.8, lng: -98.5, altitude: 1.2 }, 1500);
}

// Reset to global view
function resetGlobeView() {
    cityViewActive = false;
    currentZoomedCountry = null;

    // Zoom out to global view
    globe.pointOfView({
        lat: 0,
        lng: 0,
        altitude: 2.5
    }, 1500);

    // Reset stats panel
    resetStatsPanel();
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

                    // Special handling for text layers (like recommendations)
                    if (config.isTextLayer) {
                        return (value && Array.isArray(value) && value.length > 0) ? '#00cc66' : '#555555';
                    }

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
            })
            .onPolygonClick(feat => {
                // Stop auto-rotation when user clicks on a country
                if (globe.controls().autoRotate) {
                    globe.controls().autoRotate = false;
                }

                // Get country data and show stats panel
                const numericId = String(feat.id).padStart(3, '0');
                const iso = numericToISO[numericId];
                const countryData = iso ? dataByISO[iso] : null;

                if (countryData) {
                    // Show country-level stats (including recommendations)
                    updateStatsPanel(countryData);

                    // Special handling: US states on uninsurable homes layer
                    if (currentLayer === 'uninsurableHomes' && iso === 'USA') {
                        showUSStateInsurability();
                        return;
                    }

                    // Stay at country level for text layers
                    if (currentLayer !== 'housingRecommendations' && currentLayer !== 'uninsurableHomes') {
                        setTimeout(() => {
                            zoomToCountry(iso, feat);
                        }, 500);
                    }
                }
            });

            // Add city markers
            addCityMarkers();

            // Configure globe controls for better navigation
            const controls = globe.controls();

            // Auto-rotate (slower on mobile to reduce GPU load)
            controls.autoRotate = true;
            controls.autoRotateSpeed = isMobile ? 0.15 : 0.25;

            // Enable full vertical and horizontal rotation
            controls.enableRotate = true;
            controls.enableZoom = true;
            controls.enablePan = isMobile ? false : true;  // Disable pan on mobile to avoid conflicts

            // Allow full vertical rotation (no limits)
            controls.minPolarAngle = 0;  // Allow rotation to north pole
            controls.maxPolarAngle = Math.PI;  // Allow rotation to south pole

            // Set zoom limits
            controls.minDistance = 150;  // Minimum zoom distance
            controls.maxDistance = 800;  // Maximum zoom distance

            // Smooth damping for better feel
            controls.enableDamping = true;
            controls.dampingFactor = 0.05;
            controls.rotateSpeed = 0.5;
            controls.zoomSpeed = 0.8;

            // Hide loading screen once globe is ready
            setTimeout(() => {
                hideLoadingScreen();
            }, 300);
        })
        .catch(error => {
            console.error('Error loading country data:', error);
            hideLoadingScreen(); // Hide loading screen even on error
        });

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

    // Track selected country for export functionality - use global persistent storage
    window.selectedCountryISO = countryData.iso;
    window.selectedCountryName = countryData.country;
    window.selectedCountryData = countryData;

    // Also store in sessionStorage for persistence
    try {
        sessionStorage.setItem('selectedCountryISO', countryData.iso);
        sessionStorage.setItem('selectedCountryName', countryData.country);
    } catch (e) {
        console.log('sessionStorage not available');
    }

    // Update export scope selector if modal is open
    updateExportScopeSelector();

    console.log('Country selected:', countryData.country, countryData.iso);

    statsPanel.classList.add('has-data');

    // Special handling for text layers (recommendations)
    if (config.isTextLayer && currentLayer === 'housingRecommendations') {
        if (currentValue && Array.isArray(currentValue) && currentValue.length > 0) {
            const recommendationsList = currentValue.map(rec => `<li style="margin-bottom: 12px; line-height: 1.5;">${rec}</li>`).join('');
            statsPanel.innerHTML = `
                <h4>${countryData.country}</h4>
                <div class="country-stats">
                    <p style="color: #00f2fe; font-weight: 600; margin-bottom: 15px; font-size: 15px;">
                        📋 Evidence-Based Housing Policy Recommendations
                    </p>
                    <p style="font-size: 12px; color: #aaa; margin-bottom: 15px;">
                        Sources: UN-Habitat, World Bank, IDB, CAHF (2020-2025)
                    </p>
                    <ul style="margin: 0; padding-left: 20px; color: #fff; font-size: 13px;">
                        ${recommendationsList}
                    </ul>
                </div>
                <button onclick="showDesignModal('${countryData.iso}')" style="width: 100%; margin-top: 15px; padding: 12px; background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%); color: white; border: none; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">
                    🏠 View Resilient Home Design
                </button>
            `;
        } else {
            statsPanel.innerHTML = `
                <h4>${countryData.country}</h4>
                <div class="country-stats">
                    <p style="color: #ff9500; margin-bottom: 10px;">
                        No policy recommendations available yet for this country.
                    </p>
                    <p style="font-size: 12px; color: #aaa;">
                        Recommendations are being compiled from UN-Habitat, World Bank, IDB, and CAHF reports.
                    </p>
                </div>
            `;
        }
        return;
    }

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
            <p><strong>Cement Affordability:</strong> ${countryData.cementAffordabilityDays.toFixed(2)} days income per 50kg bag</p>
            <p><strong>Resilience Certified:</strong> ${countryData.resilienceCertifiedPerCapita.toFixed(1)} per 100k people</p>
            <p><strong>Vacancy Rate:</strong> ${countryData.vacancyRate.toFixed(1)}% of housing stock empty</p>
            <p><strong>Housing Demand Pressure 2050:</strong> ${countryData.housingDemandPressure.toFixed(1)} index (pop growth + household changes)</p>
            <p><strong>Municipal Spending Efficiency:</strong> ${countryData.municipalSpendingEfficiency.toFixed(1)} USD/capita per 1k density</p>
            <p><strong>Mortgage Penetration:</strong> ${countryData.mortgagePenetrationPerCapita}% of households have mortgages</p>
            <p><strong>Home Insurance:</strong> ${countryData.homeInsurancePenetration}% of households insured</p>
            <p><strong>Data Quality Index:</strong> ${countryData.dataMismatchIndex}/100 (${countryData.dataMismatchIndex < 20 ? 'excellent' : countryData.dataMismatchIndex < 40 ? 'good' : countryData.dataMismatchIndex < 60 ? 'moderate' : countryData.dataMismatchIndex < 75 ? 'challenged' : 'severe gaps'})</p>
            <p><strong>Homeownership Rate:</strong> ${countryData.homeownershipRate ? countryData.homeownershipRate.toFixed(1) + '% of households own' : 'N/A'}</p>
            <p><strong>Housing at Disaster Risk:</strong> ${countryData.housingStockAtRisk ? countryData.housingStockAtRisk.toFixed(1) + '% vulnerable to collapse' : 'N/A'}</p>
            <p><strong>Affordability Trend (2019-2025):</strong> ${countryData.affordabilityTrend ? (countryData.affordabilityTrend > 0 ? '+' : '') + countryData.affordabilityTrend.toFixed(1) + (countryData.affordabilityTrend < -5 ? ' (severe worsening)' : countryData.affordabilityTrend < 0 ? ' (worsening)' : countryData.affordabilityTrend > 0 ? ' (improving)' : ' (stable)') : 'N/A'}</p>
            <p><strong>Cannot Afford Basic Housing:</strong> ${countryData.housingUnaffordabilityRate ? countryData.housingUnaffordabilityRate.toFixed(1) + '% of households' : 'N/A'}</p>
            <p><strong>Program Targeting Efficiency:</strong> ${countryData.programTargetingEfficiency ? countryData.programTargetingEfficiency.toFixed(1) + '/100 (' + (countryData.programTargetingEfficiency >= 75 ? 'excellent' : countryData.programTargetingEfficiency >= 60 ? 'good' : countryData.programTargetingEfficiency >= 45 ? 'moderate' : countryData.programTargetingEfficiency >= 30 ? 'poor' : 'very poor') + ')' : 'N/A'}</p>
            <p><strong>Uninsurable Homes:</strong> ${countryData.uninsurableHomesPercent ? countryData.uninsurableHomesPercent.toFixed(1) + '% cannot get standard insurance' : 'N/A'}</p>
            ${countryData.iso === 'USA' && currentLayer === 'uninsurableHomes' ? '<p style="color: #4facfe; font-size: 12px; margin-top: 6px; padding: 6px; background: rgba(79,172,254,0.1); border-radius: 4px;">Click USA on the globe for state-by-state breakdown</p>' : ''}
            <p style="margin-top: 10px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.2);">
                <strong style="color: #00f2fe;">Current Metric:</strong> ${typeof currentValue === 'number' ? currentValue.toFixed(2) : (currentValue ? 'Available' : 'N/A')}${config.unit}
            </p>
        </div>
        <button onclick="showDesignModal('${countryData.iso}')" style="width: 100%; margin-top: 15px; padding: 12px; background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%); color: white; border: none; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">
            🏠 View Resilient Home Design
        </button>
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
    if (config.detailedDefinition) {
        document.getElementById('detailed-definition').textContent = config.detailedDefinition;
    } else {
        document.getElementById('detailed-definition').textContent = config.description;
    }

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

            // Special handling for text layers (like recommendations)
            if (config.isTextLayer) {
                return (value && Array.isArray(value) && value.length > 0) ? '#00cc66' : '#555555';
            }

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

        ${design.image ? `<img src="${design.image}" alt="${design.name}" class="design-image" />` : ''}

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

// ============================================
// EXPORT & SHARING FUNCTIONALITY
// ============================================

let selectedExportFormat = null;
let selectedExportScope = 'current-layer';
let selectedCitationFormat = 'apa';

// Show export modal
function showExportModal() {
    const modal = document.getElementById('export-modal');
    modal.classList.remove('hidden');

    // Restore country selection from sessionStorage if needed
    if (!window.selectedCountryISO && sessionStorage.getItem('selectedCountryISO')) {
        try {
            window.selectedCountryISO = sessionStorage.getItem('selectedCountryISO');
            window.selectedCountryName = sessionStorage.getItem('selectedCountryName');
            console.log('Restored country from session:', window.selectedCountryName);
        } catch (e) {
            console.log('Could not restore from sessionStorage');
        }
    }

    // Update scope selector with current country
    updateExportScopeSelector();

    // Set up event listeners for format buttons
    setupExportListeners();

    // Log current selection for debugging
    console.log('Export modal opened. Selected country:', window.selectedCountryName || 'None');
}

// Close export modal
function closeExportModal() {
    const modal = document.getElementById('export-modal');
    modal.classList.add('hidden');
    selectedExportFormat = null;
    document.getElementById('export-preview').innerHTML = '<p style="color: #b0c4d4; text-align: center; padding: 40px 20px;">Select an export format to preview</p>';
    document.getElementById('export-download-btn').disabled = true;
}

// Update export scope selector with current country
function updateExportScopeSelector() {
    const scopeSelect = document.getElementById('export-scope');
    if (!scopeSelect) return;

    const currentLayerOption = scopeSelect.querySelector('option[value="current-layer"]');
    const currentCountryOption = scopeSelect.querySelector('option[value="current-country"]');

    if (currentLayerOption) {
        const layerTitle = layerConfig[currentLayer]?.title || 'Current Layer';
        currentLayerOption.textContent = `Current Layer: ${layerTitle}`;
    }

    if (currentCountryOption) {
        if (window.selectedCountryName) {
            currentCountryOption.textContent = `Selected Country: ${window.selectedCountryName}`;
            currentCountryOption.disabled = false;
        } else {
            currentCountryOption.textContent = 'Current Country (Click a country first)';
            currentCountryOption.disabled = true;
            // If this option was selected, switch to current-layer
            if (selectedExportScope === 'current-country') {
                selectedExportScope = 'current-layer';
                scopeSelect.value = 'current-layer';
            }
        }
    }
}

// Set up export modal event listeners
function setupExportListeners() {
    // Format button listeners
    const formatBtns = document.querySelectorAll('.format-btn');
    formatBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            formatBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            selectedExportFormat = this.dataset.format;
            updateExportPreview();
            document.getElementById('export-download-btn').disabled = false;

            // Show/hide citation section based on format
            const citationSection = document.getElementById('citation-section');
            if (selectedExportFormat === 'pdf' || selectedExportFormat === 'csv') {
                citationSection.style.display = 'block';
            } else {
                citationSection.style.display = 'none';
            }
        });
    });

    // Scope selector listener
    document.getElementById('export-scope').addEventListener('change', function() {
        selectedExportScope = this.value;
        if (selectedExportFormat) {
            updateExportPreview();
        }
    });

    // Citation format listener
    document.getElementById('citation-format').addEventListener('change', function() {
        selectedCitationFormat = this.value;
        if (selectedExportFormat && (selectedExportFormat === 'pdf' || selectedExportFormat === 'csv')) {
            updateExportPreview();
        }
    });

    // Modal background click to close
    const modal = document.getElementById('export-modal');
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeExportModal();
        }
    });
}

// Update export preview
function updateExportPreview() {
    const preview = document.getElementById('export-preview');

    switch (selectedExportFormat) {
        case 'csv':
            preview.innerHTML = getCSVPreview();
            break;
        case 'json':
            preview.innerHTML = getJSONPreview();
            break;
        case 'pdf':
            preview.innerHTML = getPDFPreview();
            break;
        case 'link':
            preview.innerHTML = getLinkPreview();
            break;
        case 'screenshot':
            preview.innerHTML = getScreenshotPreview();
            break;
    }
}

// Get CSV preview
function getCSVPreview() {
    let preview = '<div style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px; font-family: monospace; font-size: 12px; max-height: 300px; overflow: auto;">';
    preview += '<strong style="color: #4facfe;">CSV Export Preview:</strong><br/><br/>';

    if (selectedExportScope === 'current-layer') {
        const config = layerConfig[currentLayer];
        preview += `<em style="color: #00f2fe;">Layer: ${config.title}</em><br/><br/>`;
        preview += `Country,ISO Code,${config.title}<br/>`;
        preview += 'Switzerland,CHE,1.2<br/>';
        preview += 'Australia,AUS,4.2<br/>';
        preview += '...<br/><br/>';
    } else if (selectedExportScope === 'current-country') {
        if (!window.selectedCountryName) {
            preview += '<span style="color: #ff9500;">⚠️ Please click on a country on the globe first</span><br/><br/>';
            preview += '<em style="color: #b0c4d4;">Click any country on the 3D globe to select it, then return here to export its data.</em>';
        } else {
            preview += `<em style="color: #00f2fe;">Country: ${window.selectedCountryName}</em><br/><br/>`;
            preview += 'Metric,Value,Unit<br/>';
            preview += 'Housing Deficit per Capita,4.2,units/1000<br/>';
            preview += 'Household Debt to GDP,121,%<br/>';
            preview += '...<br/><br/>';
        }
    } else {
        preview += '<em style="color: #00f2fe;">All countries, all metrics</em><br/><br/>';
        preview += 'Country,ISO,Deficit,Debt,Expenditure,...<br/>';
        preview += 'Switzerland,CHE,1.2,130,0.3,...<br/>';
        preview += '...<br/><br/>';
    }

    if (selectedExportScope !== 'current-country' || window.selectedCountryName) {
        preview += '<br/><em style="color: #00f2fe;">Includes source citations footer</em>';
    }
    preview += '</div>';
    return preview;
}

// Get JSON preview
function getJSONPreview() {
    let preview = '<div style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px; font-family: monospace; font-size: 12px; max-height: 300px; overflow: auto;">';
    preview += '<strong style="color: #4facfe;">JSON Export Preview:</strong><br/><br/>';

    if (selectedExportScope === 'current-country' && !window.selectedCountryName) {
        preview += '<span style="color: #ff9500;">⚠️ Please click on a country on the globe first</span><br/><br/>';
        preview += '<em style="color: #b0c4d4;">Click any country on the 3D globe to select it, then return here to export its data.</em>';
    } else {
        const scopeDesc = selectedExportScope === 'current-country'
            ? `Selected Country: ${window.selectedCountryName}`
            : selectedExportScope === 'current-layer'
            ? `Current Layer: ${layerConfig[currentLayer]?.title}`
            : 'Complete Dataset';

        preview += `<em style="color: #00f2fe;">${scopeDesc}</em><br/><br/>`;
        preview += '<pre style="margin: 0; color: #b0c4d4;">{<br/>';
        preview += '  "metadata": {<br/>';
        preview += '    "tool": "Global Housing Data Visualization",<br/>';
        preview += '    "exportDate": "' + new Date().toISOString() + '",<br/>';
        preview += '    "scope": "' + selectedExportScope + '"<br/>';
        preview += '  },<br/>';
        preview += '  "data": [ ... ],<br/>';
        preview += '  "sources": [ ... ]<br/>';
        preview += '}</pre>';
    }

    preview += '</div>';
    return preview;
}

// Get PDF preview
function getPDFPreview() {
    let preview = '<div style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px; font-size: 13px; max-height: 300px; overflow: auto;">';
    preview += '<strong style="color: #4facfe;">PDF Report Preview:</strong><br/><br/>';

    if (selectedExportScope === 'current-country' && !window.selectedCountryName) {
        preview += '<span style="color: #ff9500;">⚠️ Please click on a country on the globe first</span><br/><br/>';
        preview += '<em style="color: #b0c4d4;">Click any country on the 3D globe to select it, then return here to export its data.</em>';
    } else {
        const scopeDesc = selectedExportScope === 'current-country'
            ? window.selectedCountryName
            : selectedExportScope === 'current-layer'
            ? layerConfig[currentLayer]?.title
            : 'Complete Dataset';

        preview += '📄 <strong>Global Housing Data Report</strong><br/>';
        preview += '📅 Export Date: ' + new Date().toLocaleDateString() + '<br/>';
        preview += '🌍 Scope: ' + scopeDesc + '<br/>';
        preview += '📚 Citation Format: ' + selectedCitationFormat.toUpperCase() + '<br/><br/>';

        preview += '<em style="color: #00f2fe;">Report includes:</em><br/>';
        preview += '• Data tables with all metrics<br/>';
        preview += '• Metric definitions<br/>';
        preview += '• Source citations<br/>';
        preview += '• Methodology notes<br/>';
    }

    preview += '</div>';
    return preview;
}

// Get shareable link preview
function getLinkPreview() {
    const link = generateShareableLink();
    let preview = '<div style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px; font-size: 13px;">';
    preview += '<strong style="color: #4facfe;">Shareable Link:</strong><br/><br/>';
    preview += '<input type="text" value="' + link + '" readonly style="width: 100%; padding: 10px; background: rgba(0,0,0,0.5); border: 1px solid #4facfe; border-radius: 4px; color: #fff; font-family: monospace; font-size: 12px;" onclick="this.select()"/>';
    preview += '<br/><br/><em style="color: #00f2fe;">Link preserves current view: layer, country, globe position</em>';
    preview += '</div>';
    return preview;
}

// Get screenshot preview
function getScreenshotPreview() {
    let preview = '<div style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px; font-size: 13px;">';
    preview += '<strong style="color: #4facfe;">Screenshot Capture:</strong><br/><br/>';
    preview += '📸 Captures current globe view<br/>';
    preview += '🏷️ Includes layer title and date<br/>';
    preview += '🔗 Adds source attribution<br/>';
    preview += '💾 Downloads as PNG image<br/><br/>';
    preview += '<em style="color: #00f2fe;">Click download to capture</em>';
    preview += '</div>';
    return preview;
}

// Generate shareable link
function generateShareableLink() {
    const params = new URLSearchParams();
    params.set('layer', currentLayer);

    // Get current globe position if available
    if (globe) {
        const controls = globe.controls();
        if (controls) {
            // Get approximate lat/lon from camera position
            params.set('view', 'saved');
        }
    }

    // Add selected country if any
    if (window.selectedCountryISO) {
        params.set('country', window.selectedCountryISO);
    }

    return window.location.origin + window.location.pathname + '?' + params.toString();
}

// Download export
function downloadExport() {
    if (!selectedExportFormat) return;

    const scope = selectedExportScope;

    // Validate that a country is selected when needed
    if (scope === 'current-country' && !window.selectedCountryName) {
        alert('Please click on a country on the globe first to export its data.\n\nTip: Click any country on the 3D globe, then return to the export modal.');
        return;
    }

    switch (selectedExportFormat) {
        case 'csv':
            exportToCSV(scope);
            break;
        case 'json':
            exportToJSON(scope);
            break;
        case 'pdf':
            generatePDFReport(scope);
            break;
        case 'link':
            copyShareableLink();
            break;
        case 'screenshot':
            captureGlobeScreenshot();
            break;
    }
}

// Export to CSV
function exportToCSV(scope) {
    let csv = '';
    let filename = 'housing-data';

    if (scope === 'current-layer') {
        const config = layerConfig[currentLayer];
        filename = `housing-${currentLayer}-${new Date().toISOString().split('T')[0]}.csv`;

        // Header
        csv += `Country,ISO Code,${config.title}\n`;

        // Data rows
        housingData.forEach(country => {
            const value = country[config.dataKey];
            if (value !== undefined && value !== null) {
                csv += `"${country.country}",${country.iso},${value}\n`;
            }
        });

    } else if (scope === 'current-country' && window.selectedCountryISO) {
        const country = housingData.find(c => c.iso === window.selectedCountryISO);
        if (country) {
            filename = `housing-${country.iso}-${new Date().toISOString().split('T')[0]}.csv`;

            // Header
            csv += 'Metric,Value,Unit\n';

            // Data rows for each metric
            Object.keys(layerConfig).forEach(layerKey => {
                const config = layerConfig[layerKey];
                const value = country[config.dataKey];
                if (value !== undefined && value !== null && !config.isTextLayer) {
                    csv += `"${config.title}",${value},"${config.unit || ''}"\n`;
                }
            });
        }

    } else {
        // All data
        filename = `housing-complete-dataset-${new Date().toISOString().split('T')[0]}.csv`;

        // Header with all metrics
        csv += 'Country,ISO Code';
        Object.keys(layerConfig).forEach(layerKey => {
            const config = layerConfig[layerKey];
            if (!config.isTextLayer) {
                csv += `,${config.title}`;
            }
        });
        csv += '\n';

        // Data rows
        housingData.forEach(country => {
            csv += `"${country.country}",${country.iso}`;
            Object.keys(layerConfig).forEach(layerKey => {
                const config = layerConfig[layerKey];
                if (!config.isTextLayer) {
                    const value = country[config.dataKey];
                    csv += `,${value !== undefined && value !== null ? value : ''}`;
                }
            });
            csv += '\n';
        });
    }

    // Add source citations
    csv += '\n\n';
    csv += dataSources.getExportCitationBlock(dataSources.getAllMetrics(), selectedCitationFormat);

    // Download CSV
    downloadFile(csv, filename, 'text/csv');
}

// Export to JSON
function exportToJSON(scope) {
    let data = {
        metadata: {
            tool: 'Global Housing Data Visualization',
            url: window.location.href,
            exportDate: new Date().toISOString(),
            scope: scope
        },
        data: null,
        metricDefinitions: {},
        sources: dataSources.getSourcesForMetrics(dataSources.getAllMetrics())
    };

    if (scope === 'current-layer') {
        const config = layerConfig[currentLayer];
        data.metadata.layer = currentLayer;
        data.metadata.layerTitle = config.title;
        data.data = housingData.map(country => ({
            country: country.country,
            iso: country.iso,
            value: country[config.dataKey]
        })).filter(c => c.value !== undefined && c.value !== null);
        data.metricDefinitions[currentLayer] = config;

    } else if (scope === 'current-country' && window.selectedCountryISO) {
        const country = housingData.find(c => c.iso === window.selectedCountryISO);
        if (country) {
            data.metadata.country = country.country;
            data.metadata.iso = country.iso;
            data.data = country;
            data.metricDefinitions = layerConfig;
        }

    } else {
        // All data
        data.data = housingData;
        data.metricDefinitions = layerConfig;
    }

    const filename = `housing-data-${scope}-${new Date().toISOString().split('T')[0]}.json`;
    const json = JSON.stringify(data, null, 2);
    downloadFile(json, filename, 'application/json');
}

// Generate PDF Report
function generatePDFReport(scope) {
    // Check if jsPDF is loaded - handle both possible global variable names
    let jsPDF;
    if (window.jspdf && window.jspdf.jsPDF) {
        jsPDF = window.jspdf.jsPDF;
    } else if (window.jsPDF) {
        jsPDF = window.jsPDF;
    } else {
        alert('PDF library failed to load. Please refresh the page and try again.\n\nIf the issue persists, check your browser console for errors or try disabling browser extensions that might block CDN scripts.');
        console.error('jsPDF library not loaded. Checked window.jspdf and window.jsPDF');
        return;
    }

    const doc = new jsPDF();
    const doc = new jsPDF();

    let yPos = 20;
    const margin = 20;
    const pageWidth = doc.internal.pageSize.getWidth();

    // Title
    doc.setFontSize(20);
    doc.setTextColor(79, 172, 254);
    doc.text('Global Housing Data Report', margin, yPos);

    yPos += 15;
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Export Date: ${new Date().toLocaleString()}`, margin, yPos);

    yPos += 10;

    if (scope === 'current-layer') {
        const config = layerConfig[currentLayer];

        yPos += 10;
        doc.setFontSize(16);
        doc.setTextColor(0, 0, 0);
        doc.text(config.title, margin, yPos);

        yPos += 10;
        doc.setFontSize(10);
        doc.setTextColor(60, 60, 60);
        const descLines = doc.splitTextToSize(config.description, pageWidth - 2 * margin);
        doc.text(descLines, margin, yPos);
        yPos += descLines.length * 5 + 10;

        // Data table
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text('Data by Country:', margin, yPos);
        yPos += 10;

        doc.setFontSize(9);
        housingData.forEach(country => {
            const value = country[config.dataKey];
            if (value !== undefined && value !== null) {
                if (yPos > 270) {
                    doc.addPage();
                    yPos = 20;
                }
                doc.text(`${country.country}: ${value}${config.unit || ''}`, margin + 5, yPos);
                yPos += 6;
            }
        });

    } else if (scope === 'current-country' && window.selectedCountryISO) {
        const country = housingData.find(c => c.iso === window.selectedCountryISO);
        if (country) {
            yPos += 10;
            doc.setFontSize(16);
            doc.setTextColor(0, 0, 0);
            doc.text(`${country.country} Housing Profile`, margin, yPos);

            yPos += 15;
            doc.setFontSize(10);

            Object.keys(layerConfig).forEach(layerKey => {
                const config = layerConfig[layerKey];
                const value = country[config.dataKey];
                if (value !== undefined && value !== null && !config.isTextLayer) {
                    if (yPos > 270) {
                        doc.addPage();
                        yPos = 20;
                    }
                    doc.setTextColor(79, 172, 254);
                    doc.text(`${config.title}:`, margin, yPos);
                    doc.setTextColor(0, 0, 0);
                    doc.text(`${value}${config.unit || ''}`, margin + 80, yPos);
                    yPos += 8;
                }
            });
        }
    }

    // Add new page for sources
    doc.addPage();
    yPos = 20;

    doc.setFontSize(16);
    doc.setTextColor(79, 172, 254);
    doc.text('Data Sources', margin, yPos);

    yPos += 15;
    doc.setFontSize(9);
    doc.setTextColor(0, 0, 0);

    const citations = dataSources.generateCitations(dataSources.getAllMetrics(), selectedCitationFormat);
    const citationLines = citations.split('\n');

    citationLines.forEach(line => {
        if (yPos > 270) {
            doc.addPage();
            yPos = 20;
        }
        if (line.trim()) {
            const wrappedLines = doc.splitTextToSize(line, pageWidth - 2 * margin);
            doc.text(wrappedLines, margin, yPos);
            yPos += wrappedLines.length * 5 + 3;
        } else {
            yPos += 3;
        }
    });

    // Save PDF
    const filename = `housing-report-${scope}-${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(filename);
}

// Copy shareable link to clipboard
function copyShareableLink() {
    const link = generateShareableLink();

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(link).then(() => {
            alert('Link copied to clipboard!\n\n' + link);
        }).catch(err => {
            promptCopyLink(link);
        });
    } else {
        promptCopyLink(link);
    }
}

// Fallback for clipboard copy
function promptCopyLink(link) {
    const textarea = document.createElement('textarea');
    textarea.value = link;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
        alert('Link copied to clipboard!\n\n' + link);
    } catch (err) {
        alert('Please copy this link manually:\n\n' + link);
    }
    document.body.removeChild(textarea);
}

// Capture globe screenshot
function captureGlobeScreenshot() {
    if (typeof html2canvas === 'undefined') {
        alert('Screenshot library is loading. Please try again in a moment.');
        return;
    }

    const globeContainer = document.getElementById('globeViz');
    if (!globeContainer) return;

    html2canvas(globeContainer, {
        backgroundColor: '#0f2027',
        scale: 2
    }).then(canvas => {
        // Add attribution footer
        const ctx = canvas.getContext('2d');
        const footerHeight = 60;
        const newCanvas = document.createElement('canvas');
        newCanvas.width = canvas.width;
        newCanvas.height = canvas.height + footerHeight;

        const newCtx = newCanvas.getContext('2d');
        newCtx.fillStyle = '#0a0e27';
        newCtx.fillRect(0, 0, newCanvas.width, newCanvas.height);

        // Draw original canvas
        newCtx.drawImage(canvas, 0, 0);

        // Draw footer
        newCtx.fillStyle = 'rgba(79, 172, 254, 0.2)';
        newCtx.fillRect(0, canvas.height, newCanvas.width, footerHeight);

        newCtx.fillStyle = '#4facfe';
        newCtx.font = 'bold 24px Arial';
        newCtx.fillText(layerConfig[currentLayer].title, 20, canvas.height + 30);

        newCtx.fillStyle = '#b0c4d4';
        newCtx.font = '18px Arial';
        newCtx.fillText(`${new Date().toLocaleDateString()} • Global Housing Data Visualization`, 20, canvas.height + 50);

        // Download
        newCanvas.toBlob(blob => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `housing-globe-${currentLayer}-${new Date().toISOString().split('T')[0]}.png`;
            link.click();
            URL.revokeObjectURL(url);
        });
    });
}

// Helper function to download files
function downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
}

// Parse URL parameters on page load to restore state
window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);

    const layer = params.get('layer');
    if (layer && layerConfig[layer]) {
        updateLayer(layer);
    }

    const country = params.get('country');
    if (country) {
        // Store for potential use
        window.selectedCountryISO = country;
    }
});

