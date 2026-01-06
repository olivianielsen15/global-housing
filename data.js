// Global Housing Data - Based on Real Data Sources
// Data compiled from:
// - OECD Affordable Housing Database (2024-2025) - HC1.2, PH4.2
// - World Bank & IMF Global Debt Database (2024)
// - CAHF Housing Finance in Africa Yearbook (2024)
// - UN-Habitat SDG 11.1.1 Slum/Informal Settlements Data (2022-2024)
// - Trading Economics & The Global Economy database
// - ILO (International Labour Organization) employment data
// - Eurostat Housing Statistics (2023)

// Each country includes nine metrics:
// 1. housingDeficitPerCapita: Estimated housing units needed per 1,000 people (based on UN-Habitat, World Bank data)
// 2. householdDebtToGDP: Total household debt as percentage of GDP (primarily mortgage debt) - from IMF/World Bank
// 3. housingExpenditureToGDP: Government housing expenditure/allowances as percentage of GDP - from OECD
// 4. constructionJobsPerCapita: Construction sector employment per 1,000 people - from ILO, national statistics
// 5. housePriceToIncome: Median house price to median annual income ratio - from Numbeo, World Bank, local statistics
// 6. informalHousingShare: Percentage of housing that is informal/substandard - from UN-Habitat SDG 11.1.1 (5 housing deprivations: water, sanitation, living area, durability, tenure)
// 7. housingCostBurden: Percentage of population spending >40% of income on housing - from OECD HC1.2, Eurostat, World Bank
// 8. socialRentalHousing: Percentage of housing stock that is social/affordable housing - from OECD PH4.2
// 9. policyActivityScore: Housing policy reform activity 2020-2024 (0-5 scale): 0=No reforms, 1=Minimal, 2=Low-Moderate, 3=Moderate, 4=High, 5=Exceptional - from UN-Habitat, OECD, IDB, CAHF research
// 10. disasterRiskIndex: WorldRiskIndex 2024 score (0-50 scale): Measures disaster risk from natural hazards (earthquakes, floods, cyclones, droughts, sea-level rise) - from WorldRiskReport 2024 by Bündnis Entwicklung Hilft & IFHV
// 11. housingInvestmentOpportunity: Conservative estimate of affordable housing market size in USD billions - calculated as middle-class households (25th-75th income percentile) × affordable home price (3.5x median income), excluding base of pyramid
// 12. affordableHomePriceRatio: Maximum affordable home price as multiple of annual income - based on 30% income rule at current mortgage rates for 30-year loan (lower rates = higher affordability capacity)

const housingData = [
    // High-Income OECD Countries
    {
        country: "Switzerland",
        iso: "CHE",
        housingDeficitPerCapita: 1.2,
        householdDebtToGDP: 130.0,
        housingExpenditureToGDP: 0.3,
        constructionJobsPerCapita: 68.5,
        housePriceToIncome: 9.2,
        informalHousingShare: 0.5,
        housingCostBurden: 7.2,
        socialRentalHousing: 4.8,
        policyActivityScore: 2,
        disasterRiskIndex: 1.05,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 85.2,  // Pop: 8.8M, GDP/cap: $87k PPP, middle-class market
        affordableHomePriceRatio: 4.8  // 2.5-3% mortgage rate
    },
    {
        country: "Australia",
        iso: "AUS",
        housingDeficitPerCapita: 4.2,
        householdDebtToGDP: 121.0,
        housingExpenditureToGDP: 0.4,
        constructionJobsPerCapita: 89.2,
        housePriceToIncome: 8.7,
        informalHousingShare: 1.2,
        housingCostBurden: 9.4,
        socialRentalHousing: 4.6,
        policyActivityScore: 2,
        disasterRiskIndex: 21.05,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 182.6,  // Pop: 26.6M, GDP/cap: $62k PPP, middle-class market
        affordableHomePriceRatio: 4.0  // 4-5% mortgage rate
    },
    {
        country: "Denmark",
        iso: "DNK",
        housingDeficitPerCapita: 2.8,
        householdDebtToGDP: 117.0,
        housingExpenditureToGDP: 1.4,
        constructionJobsPerCapita: 72.3,
        housePriceToIncome: 6.8,
        informalHousingShare: 0.8,
        housingCostBurden: 15.4,
        socialRentalHousing: 20,
        policyActivityScore: 3,
        disasterRiskIndex: 0.98,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 47.3,  // Pop: 5.9M, GDP/cap: $72k PPP, middle-class market
        affordableHomePriceRatio: 4.8  // 2.5-3% mortgage rate
    },
    {
        country: "Cyprus",
        iso: "CYP",
        housingDeficitPerCapita: 3.1,
        householdDebtToGDP: 110.0,
        housingExpenditureToGDP: 0.2,
        constructionJobsPerCapita: 95.8,
        housePriceToIncome: 5.4,
        informalHousingShare: 2.1,
        housingCostBurden: 2.6,
        socialRentalHousing: 1.3,
        policyActivityScore: 2,
        disasterRiskIndex: 7.2,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 7.6,  // Pop: 1.25M, GDP/cap: $55k PPP, middle-class market
        affordableHomePriceRatio: 4.3  // 3-4.5% mortgage rate
    },
    {
        country: "Netherlands",
        iso: "NLD",
        housingDeficitPerCapita: 5.6,
        householdDebtToGDP: 104.0,
        housingExpenditureToGDP: 1.2,
        constructionJobsPerCapita: 65.4,
        housePriceToIncome: 9.5,
        informalHousingShare: 0.6,
        housingCostBurden: 7.8,
        socialRentalHousing: 30,
        policyActivityScore: 3,
        disasterRiskIndex: 3.8,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 137.9,  // Pop: 17.6M, GDP/cap: $70k PPP, middle-class market
        affordableHomePriceRatio: 4.5  // 3-4% mortgage rate
    },
    {
        country: "Canada",
        iso: "CAN",
        housingDeficitPerCapita: 6.3,
        householdDebtToGDP: 104.0,
        housingExpenditureToGDP: 0.6,
        constructionJobsPerCapita: 78.9,
        housePriceToIncome: 9.1,
        informalHousingShare: 1.4,
        housingCostBurden: 11.2,
        socialRentalHousing: 3.4,
        policyActivityScore: 2,
        disasterRiskIndex: 18.89,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 256.5,  // Pop: 39.5M, GDP/cap: $58k PPP, middle-class market
        affordableHomePriceRatio: 4.0  // 4-5.5% mortgage rate
    },
    {
        country: "South Korea",
        iso: "KOR",
        housingDeficitPerCapita: 5.8,
        householdDebtToGDP: 105.0,
        housingExpenditureToGDP: 0.7,
        constructionJobsPerCapita: 82.1,
        housePriceToIncome: 11.8,
        informalHousingShare: 2.3,
        housingCostBurden: 8.6,
        socialRentalHousing: 6.8,
        policyActivityScore: 3,
        disasterRiskIndex: 16.5,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 312.6,  // Pop: 51.7M, GDP/cap: $54k PPP, middle-class market
        affordableHomePriceRatio: 3.8  // 4-6% mortgage rate
    },
    {
        country: "Norway",
        iso: "NOR",
        housingDeficitPerCapita: 2.4,
        householdDebtToGDP: 101.0,
        housingExpenditureToGDP: 0.8,
        constructionJobsPerCapita: 74.6,
        housePriceToIncome: 7.2,
        informalHousingShare: 0.4,
        housingCostBurden: 7.3,
        socialRentalHousing: 4.7,
        policyActivityScore: 3,
        disasterRiskIndex: 2.61,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 51.4,  // Pop: 5.6M, GDP/cap: $82k PPP, middle-class market
        affordableHomePriceRatio: 4.5  // 3-4% mortgage rate
    },
    {
        country: "Sweden",
        iso: "SWE",
        housingDeficitPerCapita: 4.7,
        householdDebtToGDP: 89.0,
        housingExpenditureToGDP: 1.3,
        constructionJobsPerCapita: 70.2,
        housePriceToIncome: 8.3,
        informalHousingShare: 0.7,
        housingCostBurden: 10.9,
        socialRentalHousing: 0,
        policyActivityScore: 3,
        disasterRiskIndex: 3.23,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 78.6,  // Pop: 10.5M, GDP/cap: $67k PPP, middle-class market
        affordableHomePriceRatio: 4.5  // 3-4% mortgage rate
    },
    {
        country: "New Zealand",
        iso: "NZL",
        housingDeficitPerCapita: 7.8,
        householdDebtToGDP: 92.8,
        housingExpenditureToGDP: 0.9,
        constructionJobsPerCapita: 92.7,
        housePriceToIncome: 10.4,
        informalHousingShare: 1.8,
        housingCostBurden: 12.3,
        socialRentalHousing: 4.2,
        policyActivityScore: 4,
        disasterRiskIndex: 19.8,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 32.6,  // Pop: 5.2M, GDP/cap: $56k PPP, middle-class market
        affordableHomePriceRatio: 4.0  // 4-5.5% mortgage rate
    },
    {
        country: "Luxembourg",
        iso: "LUX",
        housingDeficitPerCapita: 4.2,
        householdDebtToGDP: 72.0,
        housingExpenditureToGDP: 0.5,
        constructionJobsPerCapita: 86.3,
        housePriceToIncome: 10.2,
        informalHousingShare: 0.3,
        housingCostBurden: 11.5,
        socialRentalHousing: 2.4,
        policyActivityScore: 2,
        disasterRiskIndex: 10.0,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 9.9,  // Pop: 0.66M, GDP/cap: $135k PPP, middle-class market
        affordableHomePriceRatio: 4.5  // 3-4% mortgage rate
    },
    {
        country: "United Kingdom",
        iso: "GBR",
        housingDeficitPerCapita: 8.2,
        householdDebtToGDP: 84.0,
        housingExpenditureToGDP: 1.1,
        constructionJobsPerCapita: 63.8,
        housePriceToIncome: 8.9,
        informalHousingShare: 1.1,
        housingCostBurden: 9.7,
        socialRentalHousing: 17.5,
        policyActivityScore: 4,
        disasterRiskIndex: 5.7,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 429.2,  // Pop: 68.5M, GDP/cap: $56k PPP, middle-class market
        affordableHomePriceRatio: 4.0  // 4-5.5% mortgage rate
    },
    {
        country: "Finland",
        iso: "FIN",
        housingDeficitPerCapita: 2.1,
        householdDebtToGDP: 69.0,
        housingExpenditureToGDP: 1.0,
        constructionJobsPerCapita: 71.5,
        housePriceToIncome: 5.7,
        informalHousingShare: 0.5,
        housingCostBurden: 8.4,
        socialRentalHousing: 14.8,
        policyActivityScore: 3,
        disasterRiskIndex: 2.8,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 38.2,  // Pop: 5.6M, GDP/cap: $61k PPP, middle-class market
        affordableHomePriceRatio: 4.5  // 3-4% mortgage rate
    },
    {
        country: "United States",
        iso: "USA",
        housingDeficitPerCapita: 3.8,
        householdDebtToGDP: 76.0,
        housingExpenditureToGDP: 0.12,
        constructionJobsPerCapita: 58.4,
        housePriceToIncome: 5.8,
        informalHousingShare: 2.4,
        housingCostBurden: 17.2,
        socialRentalHousing: 1.8,
        policyActivityScore: 5,
        disasterRiskIndex: 22.56,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 2550.4,  // Pop: 340M, GDP/cap: $67k PPP, middle-class market
        affordableHomePriceRatio: 4.0  // 4-5.5% mortgage rate
    },
    {
        country: "Belgium",
        iso: "BEL",
        housingDeficitPerCapita: 2.9,
        householdDebtToGDP: 64.0,
        housingExpenditureToGDP: 0.7,
        constructionJobsPerCapita: 66.9,
        housePriceToIncome: 6.3,
        informalHousingShare: 0.9,
        housingCostBurden: 7.9,
        socialRentalHousing: 6.8,
        policyActivityScore: 3,
        disasterRiskIndex: 3.5,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 86.2,  // Pop: 11.7M, GDP/cap: $66k PPP, middle-class market
        affordableHomePriceRatio: 4.5  // 3-4% mortgage rate
    },
    {
        country: "France",
        iso: "FRA",
        housingDeficitPerCapita: 2.7,
        householdDebtToGDP: 68.0,
        housingExpenditureToGDP: 1.8,
        constructionJobsPerCapita: 69.2,
        housePriceToIncome: 7.4,
        informalHousingShare: 1.3,
        housingCostBurden: 6.3,
        socialRentalHousing: 16.2,
        policyActivityScore: 3,
        disasterRiskIndex: 7.54,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 441.7,  // Pop: 65.8M, GDP/cap: $60k PPP, middle-class market
        affordableHomePriceRatio: 4.0  // 4-5.5% mortgage rate
    },
    {
        country: "Japan",
        iso: "JPN",
        housingDeficitPerCapita: 1.1,
        householdDebtToGDP: 66.0,
        housingExpenditureToGDP: 0.4,
        constructionJobsPerCapita: 79.3,
        housePriceToIncome: 7.6,
        informalHousingShare: 1.6,
        housingCostBurden: 8.1,
        socialRentalHousing: 5.6,
        policyActivityScore: 3,
        disasterRiskIndex: 20.94,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 746.6,  // Pop: 123.7M, GDP/cap: $54k PPP, middle-class market
        affordableHomePriceRatio: 4.8  // 2.5-3% mortgage rate
    },
    {
        country: "Spain",
        iso: "ESP",
        housingDeficitPerCapita: 2.4,
        householdDebtToGDP: 60.0,
        housingExpenditureToGDP: 0.3,
        constructionJobsPerCapita: 52.7,
        housePriceToIncome: 6.2,
        informalHousingShare: 2.7,
        housingCostBurden: 12.8,
        socialRentalHousing: 1.6,
        policyActivityScore: 3,
        disasterRiskIndex: 9.74,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 280.8,  // Pop: 48.3M, GDP/cap: $52k PPP, middle-class market
        affordableHomePriceRatio: 4.3  // 3-4.5% mortgage rate
    },
    {
        country: "Portugal",
        iso: "PRT",
        housingDeficitPerCapita: 3.4,
        householdDebtToGDP: 67.0,
        housingExpenditureToGDP: 0.2,
        constructionJobsPerCapita: 54.1,
        housePriceToIncome: 8.6,
        informalHousingShare: 2.4,
        housingCostBurden: 9.2,
        socialRentalHousing: 1.7,
        policyActivityScore: 3,
        disasterRiskIndex: 10.2,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 55.8,  // Pop: 10.4M, GDP/cap: $48k PPP, middle-class market
        affordableHomePriceRatio: 4.3  // 3-4.5% mortgage rate
    },
    {
        country: "Ireland",
        iso: "IRL",
        housingDeficitPerCapita: 9.1,
        householdDebtToGDP: 46.0,
        housingExpenditureToGDP: 1.4,
        constructionJobsPerCapita: 61.3,
        housePriceToIncome: 8.2,
        informalHousingShare: 1.2,
        housingCostBurden: 8.7,
        socialRentalHousing: 12.4,
        policyActivityScore: 2,
        disasterRiskIndex: 4.7,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 65.1,  // Pop: 5.2M, GDP/cap: $112k PPP, middle-class market
        affordableHomePriceRatio: 4.3  // 3-4.5% mortgage rate
    },
    {
        country: "Austria",
        iso: "AUT",
        housingDeficitPerCapita: 2.2,
        householdDebtToGDP: 52.0,
        housingExpenditureToGDP: 1.3,
        constructionJobsPerCapita: 75.8,
        housePriceToIncome: 7.1,
        informalHousingShare: 0.6,
        housingCostBurden: 7.1,
        socialRentalHousing: 24,
        policyActivityScore: 3,
        disasterRiskIndex: 5.2,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 73.3,  // Pop: 9.1M, GDP/cap: $72k PPP, middle-class market
        affordableHomePriceRatio: 4.5  // 3-4% mortgage rate
    },
    {
        country: "Germany",
        iso: "DEU",
        housingDeficitPerCapita: 3.1,
        householdDebtToGDP: 58.0,
        housingExpenditureToGDP: 0.9,
        constructionJobsPerCapita: 67.4,
        housePriceToIncome: 7.8,
        informalHousingShare: 0.8,
        housingCostBurden: 13,
        socialRentalHousing: 2.7,
        policyActivityScore: 3,
        disasterRiskIndex: 4.1,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 642.9,  // Pop: 84.5M, GDP/cap: $68k PPP, middle-class market
        affordableHomePriceRatio: 4.5  // 3-4% mortgage rate
    },
    {
        country: "Estonia",
        iso: "EST",
        housingDeficitPerCapita: 3.6,
        householdDebtToGDP: 48.0,
        housingExpenditureToGDP: 0.3,
        constructionJobsPerCapita: 64.2,
        housePriceToIncome: 7.3,
        informalHousingShare: 1.6,
        housingCostBurden: 7.6,
        socialRentalHousing: 1.1,
        policyActivityScore: 2,
        disasterRiskIndex: 2.9,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 7.6,  // Pop: 1.36M, GDP/cap: $50k PPP, middle-class market
        affordableHomePriceRatio: 3.4  // 6-7.5% mortgage rate
    },
    {
        country: "Slovenia",
        iso: "SVN",
        housingDeficitPerCapita: 2.8,
        householdDebtToGDP: 29.0,
        housingExpenditureToGDP: 0.5,
        constructionJobsPerCapita: 68.9,
        housePriceToIncome: 6.7,
        informalHousingShare: 2.1,
        housingCostBurden: 3.7,
        socialRentalHousing: 3.2,
        policyActivityScore: 2,
        disasterRiskIndex: 8.4,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 12.9,  // Pop: 2.1M, GDP/cap: $55k PPP, middle-class market
        affordableHomePriceRatio: 4.3  // 3-4.5% mortgage rate
    },
    {
        country: "Italy",
        iso: "ITA",
        housingDeficitPerCapita: 2.3,
        householdDebtToGDP: 44.0,
        housingExpenditureToGDP: 0.4,
        constructionJobsPerCapita: 62.1,
        housePriceToIncome: 6.4,
        informalHousingShare: 2.9,
        housingCostBurden: 8.3,
        socialRentalHousing: 3.9,
        policyActivityScore: 3,
        disasterRiskIndex: 11.11,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 382.1,  // Pop: 58.9M, GDP/cap: $58k PPP, middle-class market
        affordableHomePriceRatio: 4.3  // 3-4.5% mortgage rate
    },
    {
        country: "Israel",
        iso: "ISR",
        housingDeficitPerCapita: 7.6,
        householdDebtToGDP: 54.0,
        housingExpenditureToGDP: 0.6,
        constructionJobsPerCapita: 71.2,
        housePriceToIncome: 12.3,
        informalHousingShare: 1.7,
        housingCostBurden: 14.6,
        socialRentalHousing: 0.9,
        policyActivityScore: 2,
        disasterRiskIndex: 9.8,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 60.3,  // Pop: 9.8M, GDP/cap: $55k PPP, middle-class market
        affordableHomePriceRatio: 3.8  // 4.5-5.5% mortgage rate
    },
    {
        country: "Czech Republic",
        iso: "CZE",
        housingDeficitPerCapita: 4.9,
        householdDebtToGDP: 35.0,
        housingExpenditureToGDP: 0.3,
        constructionJobsPerCapita: 73.6,
        housePriceToIncome: 9.8,
        informalHousingShare: 1.9,
        housingCostBurden: 9.4,
        socialRentalHousing: 5.2,
        policyActivityScore: 2,
        disasterRiskIndex: 5.8,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 64.6,  // Pop: 10.5M, GDP/cap: $55k PPP, middle-class market
        affordableHomePriceRatio: 3.4  // 6-7.5% mortgage rate
    },
    {
        country: "Greece",
        iso: "GRC",
        housingDeficitPerCapita: 3.2,
        householdDebtToGDP: 58.0,
        housingExpenditureToGDP: 0.1,
        constructionJobsPerCapita: 38.5,
        housePriceToIncome: 5.1,
        informalHousingShare: 3.8,
        housingCostBurden: 28.5,
        socialRentalHousing: 0.7,
        policyActivityScore: 2,
        disasterRiskIndex: 11.6,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 49.5,  // Pop: 10.3M, GDP/cap: $43k PPP, middle-class market
        affordableHomePriceRatio: 4.3  // 3-4.5% mortgage rate
    },
    {
        country: "Poland",
        iso: "POL",
        housingDeficitPerCapita: 7.2,
        householdDebtToGDP: 38.0,
        housingExpenditureToGDP: 0.2,
        constructionJobsPerCapita: 65.3,
        housePriceToIncome: 8.4,
        informalHousingShare: 3.2,
        housingCostBurden: 7.8,
        socialRentalHousing: 4.3,
        policyActivityScore: 2,
        disasterRiskIndex: 4.74,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 204.0,  // Pop: 38.0M, GDP/cap: $48k PPP, middle-class market
        affordableHomePriceRatio: 3.4  // 6-7.5% mortgage rate
    },
    {
        country: "Slovakia",
        iso: "SVK",
        housingDeficitPerCapita: 5.1,
        householdDebtToGDP: 53.0,
        housingExpenditureToGDP: 0.4,
        constructionJobsPerCapita: 69.7,
        housePriceToIncome: 7.9,
        informalHousingShare: 2.8,
        housingCostBurden: 8.2,
        socialRentalHousing: 3.8,
        policyActivityScore: 2,
        disasterRiskIndex: 6.2,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 25.8,  // Pop: 5.5M, GDP/cap: $42k PPP, middle-class market
        affordableHomePriceRatio: 4.3  // 3-4.5% mortgage rate (Eurozone)
    },
    {
        country: "Chile",
        iso: "CHL",
        housingDeficitPerCapita: 7.4,
        householdDebtToGDP: 47.0,
        housingExpenditureToGDP: 0.6,
        constructionJobsPerCapita: 83.9,
        housePriceToIncome: 9.3,
        informalHousingShare: 21.3,
        housingCostBurden: 18.9,
        socialRentalHousing: 2.1,
        policyActivityScore: 3,
        disasterRiskIndex: 32.5,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 70.1,  // Pop: 19.6M, GDP/cap: $32k PPP, middle-class market
        affordableHomePriceRatio: 3.6  // 5-6.5% mortgage rate
    },
    {
        country: "Hungary",
        iso: "HUN",
        housingDeficitPerCapita: 4.7,
        householdDebtToGDP: 21.0,
        housingExpenditureToGDP: 0.3,
        constructionJobsPerCapita: 59.8,
        housePriceToIncome: 7.5,
        informalHousingShare: 3.1,
        housingCostBurden: 6.9,
        socialRentalHousing: 4.1,
        policyActivityScore: 1,
        disasterRiskIndex: 5.5,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 49.4,  // Pop: 9.6M, GDP/cap: $46k PPP, middle-class market
        affordableHomePriceRatio: 3.4  // 6-7.5% mortgage rate
    },
    {
        country: "Latvia",
        iso: "LVA",
        housingDeficitPerCapita: 4.3,
        householdDebtToGDP: 22.0,
        housingExpenditureToGDP: 0.2,
        constructionJobsPerCapita: 62.4,
        housePriceToIncome: 6.8,
        informalHousingShare: 2.4,
        housingCostBurden: 5.8,
        socialRentalHousing: 1.2,
        policyActivityScore: 2,
        disasterRiskIndex: 3.0,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 9.2,  // Pop: 1.87M, GDP/cap: $44k PPP, middle-class market
        affordableHomePriceRatio: 3.4  // 6-7.5% mortgage rate
    },
    {
        country: "Lithuania",
        iso: "LTU",
        housingDeficitPerCapita: 3.9,
        householdDebtToGDP: 27.0,
        housingExpenditureToGDP: 0.2,
        constructionJobsPerCapita: 64.1,
        housePriceToIncome: 7.1,
        informalHousingShare: 2.2,
        housingCostBurden: 5.4,
        socialRentalHousing: 1.4,
        policyActivityScore: 2,
        disasterRiskIndex: 3.1,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 16.3,  // Pop: 2.85M, GDP/cap: $51k PPP, middle-class market
        affordableHomePriceRatio: 3.4  // 6-7.5% mortgage rate
    },
    {
        country: "Turkey",
        iso: "TUR",
        housingDeficitPerCapita: 11.3,
        householdDebtToGDP: 18.0,
        housingExpenditureToGDP: 0.3,
        constructionJobsPerCapita: 47.6,
        housePriceToIncome: 8.1,
        informalHousingShare: 11.3,
        housingCostBurden: 22.4,
        socialRentalHousing: 3.2,
        policyActivityScore: 2,
        disasterRiskIndex: 23.8,  // WorldRiskIndex 2024 - major earthquake risk
        housingInvestmentOpportunity: 520,  // Pop: 86M, construction sector strength, refugee integration (10-yr outlook)
        affordableHomePriceRatio: 1.3  // 35-45% mortgage rate
    },
    {
        country: "Mexico",
        iso: "MEX",
        housingDeficitPerCapita: 13.7,
        householdDebtToGDP: 16.0,
        housingExpenditureToGDP: 0.2,
        constructionJobsPerCapita: 68.2,
        housePriceToIncome: 6.7,
        informalHousingShare: 38.6,
        housingCostBurden: 19.7,
        socialRentalHousing: 1.4,
        policyActivityScore: 5,
        disasterRiskIndex: 35.93,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 480,  // Pop: 130M, nearshoring boom, US proximity (10-yr outlook)
        affordableHomePriceRatio: 2.6  // 9-11% mortgage rate
    },
    {
        country: "Costa Rica",
        iso: "CRI",
        housingDeficitPerCapita: 9.8,
        householdDebtToGDP: 21.0,
        housingExpenditureToGDP: 0.3,
        constructionJobsPerCapita: 59.3,
        housePriceToIncome: 7.8,
        informalHousingShare: 15.7,
        housingCostBurden: 21.3,
        socialRentalHousing: 1.8,
        policyActivityScore: 2,
        disasterRiskIndex: 28.7,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 16.3,  // Pop: 5.2M, GDP/cap: $28k PPP, middle-class market
        affordableHomePriceRatio: 2.6  // 9-11% mortgage rate
    },
    {
        country: "Colombia",
        iso: "COL",
        housingDeficitPerCapita: 16.2,
        householdDebtToGDP: 19.0,
        housingExpenditureToGDP: 0.2,
        constructionJobsPerCapita: 52.8,
        housePriceToIncome: 11.4,
        informalHousingShare: 32.4,
        housingCostBurden: 31.2,
        socialRentalHousing: 0.8,
        policyActivityScore: 2,
        disasterRiskIndex: 37.81,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 210,  // Pop: 52M, peace dividend, urban growth (10-yr outlook)
        affordableHomePriceRatio: 2.6  // 9-11% mortgage rate
    },
    {
        country: "Brazil",
        iso: "BRA",
        housingDeficitPerCapita: 18.9,
        householdDebtToGDP: 28.0,
        housingExpenditureToGDP: 0.1,
        constructionJobsPerCapita: 64.7,
        housePriceToIncome: 10.7,
        informalHousingShare: 55.2,
        housingCostBurden: 23.3,
        socialRentalHousing: 1.2,
        policyActivityScore: 4,
        disasterRiskIndex: 18.4,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 580,  // Pop: 216M, urban consolidation, middle-class recovery (10-yr outlook)
        affordableHomePriceRatio: 2.5  // 10-12% mortgage rate
    },
    {
        country: "Russia",
        iso: "RUS",
        housingDeficitPerCapita: 8.7,
        householdDebtToGDP: 21.0,
        housingExpenditureToGDP: 0.2,
        constructionJobsPerCapita: 56.9,
        housePriceToIncome: 9.4,
        informalHousingShare: 4.7,
        housingCostBurden: 12.7,
        socialRentalHousing: 2.8,
        policyActivityScore: 1,
        disasterRiskIndex: 28.12,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 564.5,  // Pop: 144M, GDP/cap: $35k PPP, middle-class market
        affordableHomePriceRatio: 2.1  // 13-16% mortgage rate
    },
    {
        country: "China",
        iso: "CHN",
        housingDeficitPerCapita: 11.2,
        householdDebtToGDP: 62.0,
        housingExpenditureToGDP: 0.8,
        constructionJobsPerCapita: 97.4,
        housePriceToIncome: 19.7,
        informalHousingShare: 8.9,
        housingCostBurden: 26.7,
        socialRentalHousing: 7.3,
        policyActivityScore: 2,
        disasterRiskIndex: 26.3,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 3192.0,  // Pop: 1425M, GDP/cap: $20k PPP, middle-class market
        affordableHomePriceRatio: 3.8  // 4-6% mortgage rate
    },
    {
        country: "Thailand",
        iso: "THA",
        housingDeficitPerCapita: 10.8,
        householdDebtToGDP: 89.0,
        housingExpenditureToGDP: 0.2,
        constructionJobsPerCapita: 48.3,
        housePriceToIncome: 14.2,
        informalHousingShare: 12.6,
        housingCostBurden: 18.6,
        socialRentalHousing: 0.9,
        policyActivityScore: 2,
        disasterRiskIndex: 17.2,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 176.8,  // Pop: 71.8M, GDP/cap: $22k PPP, middle-class market
        affordableHomePriceRatio: 3.6  // 5-7% mortgage rate
    },
    {
        country: "Malaysia",
        iso: "MYS",
        housingDeficitPerCapita: 9.2,
        householdDebtToGDP: 82.0,
        housingExpenditureToGDP: 0.3,
        constructionJobsPerCapita: 54.7,
        housePriceToIncome: 11.3,
        informalHousingShare: 9.2,
        housingCostBurden: 16.4,
        socialRentalHousing: 1.6,
        policyActivityScore: 2,
        disasterRiskIndex: 15.6,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 134.3,  // Pop: 34.3M, GDP/cap: $35k PPP, middle-class market
        affordableHomePriceRatio: 3.6  // 5-7% mortgage rate
    },
    {
        country: "Singapore",
        iso: "SGP",
        housingDeficitPerCapita: 0.8,
        householdDebtToGDP: 75.0,
        housingExpenditureToGDP: 3.2,
        constructionJobsPerCapita: 121.5,
        housePriceToIncome: 16.4,
        informalHousingShare: 0.3,
        housingCostBurden: 8.9,
        socialRentalHousing: 8.7,
        policyActivityScore: 3,
        disasterRiskIndex: 4.8,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 76.6,  // Pop: 5.9M, GDP/cap: $116k PPP, middle-class market
        affordableHomePriceRatio: 3.8  // 4-6% mortgage rate
    },
    {
        country: "Philippines",
        iso: "PHL",
        housingDeficitPerCapita: 24.7,
        householdDebtToGDP: 14.0,
        housingExpenditureToGDP: 0.1,
        constructionJobsPerCapita: 41.9,
        housePriceToIncome: 13.7,
        informalHousingShare: 38.6,
        housingCostBurden: 32.7,
        socialRentalHousing: 0.6,
        policyActivityScore: 2,
        disasterRiskIndex: 46.91,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 290,  // Pop: 117M, young population, remittance economy (10-yr outlook)
        affordableHomePriceRatio: 2.8  // 8-10% mortgage rate
    },
    {
        country: "Vietnam",
        iso: "VNM",
        housingDeficitPerCapita: 19.6,
        householdDebtToGDP: 12.0,
        housingExpenditureToGDP: 0.2,
        constructionJobsPerCapita: 67.8,
        housePriceToIncome: 15.8,
        informalHousingShare: 18.7,
        housingCostBurden: 24.6,
        socialRentalHousing: 0.8,
        policyActivityScore: 1,
        disasterRiskIndex: 22.3,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 280,  // Pop: 100M, rapid economic growth, manufacturing hub (10-yr outlook)
        affordableHomePriceRatio: 3.6  // 5-7% mortgage rate
    },
    {
        country: "Indonesia",
        iso: "IDN",
        housingDeficitPerCapita: 26.8,
        householdDebtToGDP: 18.0,
        housingExpenditureToGDP: 0.1,
        constructionJobsPerCapita: 44.3,
        housePriceToIncome: 10.8,
        informalHousingShare: 28.4,
        housingCostBurden: 28.4,
        socialRentalHousing: 0.7,
        policyActivityScore: 2,
        disasterRiskIndex: 41.13,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 720,  // Pop: 280M, 4th largest population, urban transition (10-yr outlook)
        affordableHomePriceRatio: 2.8  // 8-10% mortgage rate
    },
    {
        country: "India",
        iso: "IND",
        housingDeficitPerCapita: 31.4,
        householdDebtToGDP: 15.0,
        housingExpenditureToGDP: 0.1,
        constructionJobsPerCapita: 89.7,
        housePriceToIncome: 12.6,
        informalHousingShare: 35.2,
        housingCostBurden: 29.8,
        socialRentalHousing: 0.9,
        policyActivityScore: 3,
        disasterRiskIndex: 40.96,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 2400,  // Pop: 1.4B, massive urbanization, housing-for-all programs (10-yr outlook)
        affordableHomePriceRatio: 2.8  // 8-10% mortgage rate
    },
    {
        country: "Argentina",
        iso: "ARG",
        housingDeficitPerCapita: 14.8,
        householdDebtToGDP: 4.0,
        housingExpenditureToGDP: 0.1,
        constructionJobsPerCapita: 52.4,
        housePriceToIncome: 9.2,
        informalHousingShare: 28.9,
        housingCostBurden: 21.4,
        socialRentalHousing: 1.1,
        policyActivityScore: 3,
        disasterRiskIndex: 14.8,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 124.1,  // Pop: 46.2M, GDP/cap: $24k PPP, middle-class market
        affordableHomePriceRatio: 1.2  // 70%+ mortgage rate
    },
    {
        country: "Pakistan",
        iso: "PAK",
        housingDeficitPerCapita: 29.3,
        householdDebtToGDP: 2.8,
        housingExpenditureToGDP: 0.05,
        constructionJobsPerCapita: 73.2,
        housePriceToIncome: 10.2,
        informalHousingShare: 47.3,
        housingCostBurden: 34.2,
        socialRentalHousing: 0.3,
        policyActivityScore: 1,
        disasterRiskIndex: 24.8,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 188.4,  // Pop: 240.5M, GDP/cap: $7k PPP, middle-class market
        affordableHomePriceRatio: 2.8  // 8-10% mortgage rate
    },
    {
        country: "Bangladesh",
        iso: "BGD",
        housingDeficitPerCapita: 34.1,
        householdDebtToGDP: 4.2,
        housingExpenditureToGDP: 0.06,
        constructionJobsPerCapita: 68.9,
        housePriceToIncome: 9.8,
        informalHousingShare: 52.4,
        housingCostBurden: 36.8,
        socialRentalHousing: 0.2,
        policyActivityScore: 1,
        disasterRiskIndex: 27.73,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 245,  // Pop: 173M, garment industry growth, Dhaka expansion (10-yr outlook)
        affordableHomePriceRatio: 2.8  // 8-10% mortgage rate
    },
    {
        country: "United Arab Emirates",
        iso: "ARE",
        housingDeficitPerCapita: 5.4,
        householdDebtToGDP: 121.0,
        housingExpenditureToGDP: 0.4,
        constructionJobsPerCapita: 156.3,
        housePriceToIncome: 9.6,
        informalHousingShare: 2.1,
        housingCostBurden: 9.8,
        socialRentalHousing: 2.1,
        policyActivityScore: 3,
        disasterRiskIndex: 8.3,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 99.5,  // Pop: 10.1M, GDP/cap: $88k PPP, middle-class market
        affordableHomePriceRatio: 3.6  // 5-7% mortgage rate
    },
    {
        country: "Saudi Arabia",
        iso: "SAU",
        housingDeficitPerCapita: 12.6,
        householdDebtToGDP: 16.0,
        housingExpenditureToGDP: 0.7,
        constructionJobsPerCapita: 98.2,
        housePriceToIncome: 7.9,
        informalHousingShare: 3.8,
        housingCostBurden: 11.4,
        socialRentalHousing: 1.9,
        policyActivityScore: 2,
        disasterRiskIndex: 6.7,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 280.9,  // Pop: 36.9M, GDP/cap: $68k PPP, middle-class market
        affordableHomePriceRatio: 3.6  // 5-7% mortgage rate
    },
    {
        country: "Iceland",
        iso: "ISL",
        housingDeficitPerCapita: 3.7,
        householdDebtToGDP: 88.0,
        housingExpenditureToGDP: 0.8,
        constructionJobsPerCapita: 81.6,
        housePriceToIncome: 6.9,
        informalHousingShare: 0.4,
        housingCostBurden: 7.9,
        socialRentalHousing: 11.6,
        policyActivityScore: 2,
        disasterRiskIndex: 12.4,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 3.0,  // Pop: 0.39M, GDP/cap: $68k PPP, middle-class market
        affordableHomePriceRatio: 4.5  // 3-4% mortgage rate
    },

    // African Countries - Enhanced CAHF Data
    {
        country: "South Africa",
        iso: "ZAF",
        housingDeficitPerCapita: 22.4,  // CAHF Yearbook 2024
        householdDebtToGDP: 39.0,
        housingExpenditureToGDP: 0.5,
        constructionJobsPerCapita: 36.8,
        housePriceToIncome: 8.9,
        informalHousingShare: 23.8,
        housingCostBurden: 27.3,
        socialRentalHousing: 2.3,
        policyActivityScore: 4,
        disasterRiskIndex: 9.6,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 260,  // CAHF 2024: Pop 60M, most developed African market, formal mortgage sector (10-yr outlook)
        affordableHomePriceRatio: 2.4  // 11-12% mortgage rate
    },
    {
        country: "Egypt",
        iso: "EGY",
        housingDeficitPerCapita: 19.7,  // CAHF data
        householdDebtToGDP: 5.0,
        housingExpenditureToGDP: 0.1,
        constructionJobsPerCapita: 52.1,
        housePriceToIncome: 9.7,
        informalHousingShare: 31.4,
        housingCostBurden: 31.2,
        socialRentalHousing: 1.4,
        policyActivityScore: 2,
        disasterRiskIndex: 8.9,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 450,  // CAHF 2024: Pop 110M, massive urbanization, government mega-projects (10-yr outlook)
        affordableHomePriceRatio: 1.7  // 18-22% mortgage rate
    },
    {
        country: "Morocco",
        iso: "MAR",
        housingDeficitPerCapita: 17.3,  // CAHF Yearbook 2024
        householdDebtToGDP: 8.0,
        housingExpenditureToGDP: 0.2,
        constructionJobsPerCapita: 47.9,
        housePriceToIncome: 8.4,
        informalHousingShare: 24.6,
        housingCostBurden: 26.4,
        socialRentalHousing: 1.7,
        policyActivityScore: 3,  // CAHF 2024: Cities Without Slums program reforms
        disasterRiskIndex: 11.3,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 87.5,  // CAHF 2024: Pop 38M, stable investment climate, urban slum upgrading (10-yr outlook)
        affordableHomePriceRatio: 3.3  // 6-8% mortgage rate
    },
    {
        country: "Kenya",
        iso: "KEN",
        housingDeficitPerCapita: 27.1,  // CAHF Yearbook 2024
        householdDebtToGDP: 6.0,
        housingExpenditureToGDP: 0.1,
        constructionJobsPerCapita: 28.4,
        housePriceToIncome: 11.8,
        informalHousingShare: 56.3,
        housingCostBurden: 38.6,
        socialRentalHousing: 0.4,
        policyActivityScore: 4,  // CAHF 2024: Affordable housing program, strong reforms
        disasterRiskIndex: 15.2,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 107.5,  // CAHF 2024: Pop 55M, East Africa hub, M-Pesa fintech economy (10-yr outlook)
        affordableHomePriceRatio: 2.2  // 12-15% mortgage rate
    },
    {
        country: "Nigeria",
        iso: "NGA",
        housingDeficitPerCapita: 35.2,  // CAHF 2024: severe deficit
        householdDebtToGDP: 1.2,
        housingExpenditureToGDP: 0.05,
        constructionJobsPerCapita: 18.7,
        housePriceToIncome: 13.2,
        informalHousingShare: 64.7,
        housingCostBurden: 42.7,
        socialRentalHousing: 0.2,
        policyActivityScore: 2,  // CAHF 2024: recent mortgage market reforms
        disasterRiskIndex: 9.33,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 400,  // CAHF 2024: Pop 229M, Africa's largest market, rapid urbanization (10-yr outlook)
        affordableHomePriceRatio: 1.9  // 15-20% mortgage rate
    },
    {
        country: "Ghana",
        iso: "GHA",
        housingDeficitPerCapita: 29.8,  // CAHF Yearbook 2024
        householdDebtToGDP: 3.5,
        housingExpenditureToGDP: 0.1,
        constructionJobsPerCapita: 23.6,
        housePriceToIncome: 10.4,
        informalHousingShare: 52.8,
        housingCostBurden: 35.8,
        socialRentalHousing: 0.3,
        policyActivityScore: 1,
        disasterRiskIndex: 12.8,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 52.5,  // CAHF 2024: Pop 34M, stable democracy, Accra expansion (10-yr outlook)
        affordableHomePriceRatio: 2.2  // 12-15% mortgage rate
    },
    {
        country: "Ethiopia",
        iso: "ETH",
        housingDeficitPerCapita: 38.6,  // CAHF 2024 data
        householdDebtToGDP: 2.1,
        housingExpenditureToGDP: 0.08,
        constructionJobsPerCapita: 32.4,
        housePriceToIncome: 12.6,
        informalHousingShare: 71.4,
        housingCostBurden: 39.4,
        socialRentalHousing: 0.2,
        policyActivityScore: 1,
        disasterRiskIndex: 4.86,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 97.5,  // CAHF 2024: Pop 126M, 2nd largest African population, rapid urbanization (10-yr outlook)
        affordableHomePriceRatio: 1.8  // 18-25% mortgage rate
    },
    {
        country: "Tanzania",
        iso: "TZA",
        housingDeficitPerCapita: 33.4,  // CAHF Yearbook 2024
        householdDebtToGDP: 2.8,
        housingExpenditureToGDP: 0.09,
        constructionJobsPerCapita: 25.9,
        housePriceToIncome: 10.9,
        informalHousingShare: 62.3,
        housingCostBurden: 37.2,
        socialRentalHousing: 0.3,
        policyActivityScore: 1,
        disasterRiskIndex: 16.4,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 92.5,  // CAHF 2024: Pop 65M, Dar es Salaam boom, rapid urbanization (10-yr outlook)
        affordableHomePriceRatio: 1.9  // 15-20% mortgage rate
    },
    {
        country: "Uganda",
        iso: "UGA",
        housingDeficitPerCapita: 36.7,  // CAHF 2024 data
        householdDebtToGDP: 3.2,
        housingExpenditureToGDP: 0.07,
        constructionJobsPerCapita: 29.3,
        housePriceToIncome: 11.7,
        informalHousingShare: 68.9,
        housingCostBurden: 40.3,
        socialRentalHousing: 0.2,
        policyActivityScore: 1,
        disasterRiskIndex: 14.7,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 60,  // CAHF 2024: Pop 48M, young demographics, Kampala growth (10-yr outlook)
        affordableHomePriceRatio: 1.9  // 15-20% mortgage rate
    },
    {
        country: "Rwanda",
        iso: "RWA",
        housingDeficitPerCapita: 31.8,  // CAHF Yearbook 2024
        householdDebtToGDP: 4.1,
        housingExpenditureToGDP: 0.15,
        constructionJobsPerCapita: 34.7,
        housePriceToIncome: 9.8,
        informalHousingShare: 54.2,
        housingCostBurden: 34.6,
        socialRentalHousing: 0.6,
        policyActivityScore: 4,  // CAHF 2024: exceptional housing reforms, Kigali master plan, fastest progress in Africa
        disasterRiskIndex: 15.8,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 23,  // CAHF 2024: Pop 14M, Kigali boom, best business climate in Africa (10-yr outlook)
        affordableHomePriceRatio: 2.2  // 12-15% mortgage rate
    },
    {
        country: "Zambia",
        iso: "ZMB",
        housingDeficitPerCapita: 34.2,  // CAHF 2024 data
        householdDebtToGDP: 3.8,
        housingExpenditureToGDP: 0.06,
        constructionJobsPerCapita: 21.8,
        housePriceToIncome: 10.2,
        informalHousingShare: 58.6,
        housingCostBurden: 36.9,
        socialRentalHousing: 0.3,
        policyActivityScore: 1,
        disasterRiskIndex: 13.6,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 28.5,  // CAHF 2024: Pop 20M, copper economy recovery, Lusaka expansion (10-yr outlook)
        affordableHomePriceRatio: 1.6  // 20-25% mortgage rate
    },
    {
        country: "Namibia",
        iso: "NAM",
        housingDeficitPerCapita: 24.6,  // CAHF Yearbook 2024
        householdDebtToGDP: 7.2,
        housingExpenditureToGDP: 0.18,
        constructionJobsPerCapita: 31.2,
        housePriceToIncome: 8.3,
        informalHousingShare: 34.7,
        housingCostBurden: 29.7,
        socialRentalHousing: 0.8,
        policyActivityScore: 2,
        disasterRiskIndex: 10.0,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 14,  // CAHF 2024: Pop 2.6M, mining wealth, stable governance (10-yr outlook)
        affordableHomePriceRatio: 2.9  // 8-10% mortgage rate
    },
    {
        country: "Botswana",
        iso: "BWA",
        housingDeficitPerCapita: 21.3,  // CAHF 2024 data
        householdDebtToGDP: 9.4,
        housingExpenditureToGDP: 0.22,
        constructionJobsPerCapita: 38.5,
        housePriceToIncome: 7.4,
        informalHousingShare: 28.3,
        housingCostBurden: 24.8,
        socialRentalHousing: 1.2,
        policyActivityScore: 2,
        disasterRiskIndex: 10.0,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 16,  // CAHF 2024: Pop 2.6M, diamond economy, highest credit rating in Africa (10-yr outlook)
        affordableHomePriceRatio: 2.9  // 8-10% mortgage rate
    },
    {
        country: "Senegal",
        iso: "SEN",
        housingDeficitPerCapita: 28.9,  // CAHF Yearbook 2024
        householdDebtToGDP: 4.6,
        housingExpenditureToGDP: 0.08,
        constructionJobsPerCapita: 26.1,
        housePriceToIncome: 9.6,
        informalHousingShare: 48.9,
        housingCostBurden: 33.4,
        socialRentalHousing: 0.4,
        policyActivityScore: 1,
        disasterRiskIndex: 11.9,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 35,  // CAHF 2024: Pop 18M, Dakar expansion, West Africa gateway (10-yr outlook)
        affordableHomePriceRatio: 3.0  // 7-10% mortgage rate
    },
    {
        country: "Tunisia",
        iso: "TUN",
        housingDeficitPerCapita: 16.2,  // CAHF 2024 data
        householdDebtToGDP: 11.3,
        housingExpenditureToGDP: 0.25,
        constructionJobsPerCapita: 41.7,
        housePriceToIncome: 7.2,
        informalHousingShare: 18.4,
        housingCostBurden: 22.6,
        socialRentalHousing: 1.6,
        policyActivityScore: 3,  // CAHF 2024: post-revolution housing reforms, tourism recovery
        disasterRiskIndex: 9.7,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 42.5,  // CAHF 2024: Pop 12M, tourism recovery, North Africa stability (10-yr outlook)
        affordableHomePriceRatio: 3.3  // 6-8% mortgage rate
    },
    {
        country: "Cameroon",
        iso: "CMR",
        housingDeficitPerCapita: 32.5,  // CAHF Yearbook 2024
        householdDebtToGDP: 2.9,
        housingExpenditureToGDP: 0.05,
        constructionJobsPerCapita: 24.3,
        housePriceToIncome: 10.7,
        informalHousingShare: 55.7,
        housingCostBurden: 35.7,
        socialRentalHousing: 0.3,
        policyActivityScore: 1,
        disasterRiskIndex: 14.3,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 47.5,  // CAHF 2024: Pop 28M, Central Africa hub, Douala-Yaoundé corridor (10-yr outlook)
        affordableHomePriceRatio: 3.0  // 7-10% mortgage rate
    },
    {
        country: "Ivory Coast",
        iso: "CIV",
        housingDeficitPerCapita: 30.7,  // CAHF 2024 data
        householdDebtToGDP: 3.4,
        housingExpenditureToGDP: 0.07,
        constructionJobsPerCapita: 27.8,
        housePriceToIncome: 11.3,
        informalHousingShare: 58.2,
        housingCostBurden: 37.4,
        socialRentalHousing: 0.3,
        policyActivityScore: 1,
        disasterRiskIndex: 13.2,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 55,  // CAHF 2024: Pop 28M, cocoa economy, Abidjan mega-growth (10-yr outlook)
        affordableHomePriceRatio: 3.0  // 7-10% mortgage rate
    },
    {
        country: "Mozambique",
        iso: "MOZ",
        housingDeficitPerCapita: 37.1,  // CAHF Yearbook 2024
        householdDebtToGDP: 1.8,
        housingExpenditureToGDP: 0.04,
        constructionJobsPerCapita: 19.2,
        housePriceToIncome: 12.4,
        informalHousingShare: 69.8,
        housingCostBurden: 41.2,
        socialRentalHousing: 0.2,
        policyActivityScore: 1,
        disasterRiskIndex: 34.44,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 31.5,  // CAHF 2024: Pop 33M, natural gas boom, Maputo corridor development (10-yr outlook)
        affordableHomePriceRatio: 1.8  // 18-25% mortgage rate
    },
    {
        country: "Angola",
        iso: "AGO",
        housingDeficitPerCapita: 33.6,  // CAHF 2024 data
        householdDebtToGDP: 2.3,
        housingExpenditureToGDP: 0.06,
        constructionJobsPerCapita: 28.9,
        housePriceToIncome: 11.9,
        informalHousingShare: 61.3,
        housingCostBurden: 38.3,
        socialRentalHousing: 0.3,
        policyActivityScore: 1,
        disasterRiskIndex: 12.4,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 65,  // CAHF 2024: Pop 35M, post-conflict recovery, oil wealth, Luanda rebuild (10-yr outlook)
        affordableHomePriceRatio: 1.8  // 18-25% mortgage rate
    },
    {
        country: "Zimbabwe",
        iso: "ZWE",
        housingDeficitPerCapita: 35.4,  // CAHF Yearbook 2024
        householdDebtToGDP: 1.6,
        housingExpenditureToGDP: 0.03,
        constructionJobsPerCapita: 16.7,
        housePriceToIncome: 9.7,
        informalHousingShare: 57.4,
        housingCostBurden: 39.8,
        socialRentalHousing: 0.2,
        policyActivityScore: 1,
        disasterRiskIndex: 14.9,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 24,  // CAHF 2024: Pop 16M, economic stabilization potential, dollarization (10-yr outlook)
        affordableHomePriceRatio: 1.6  // 20-25% mortgage rate
    },
    {
        country: "Algeria",
        iso: "DZA",
        housingDeficitPerCapita: 18.9,  // CAHF Yearbook 2024
        householdDebtToGDP: 6.8,
        housingExpenditureToGDP: 0.32,
        constructionJobsPerCapita: 44.2,
        housePriceToIncome: 7.8,
        informalHousingShare: 22.6,
        housingCostBurden: 25.7,
        socialRentalHousing: 2.4,
        policyActivityScore: 1,
        disasterRiskIndex: 10.4,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 200,  // CAHF 2024: Pop 45M, oil wealth, government housing programs (10-yr outlook)
        affordableHomePriceRatio: 3.0  // 7-10% mortgage rate
    },
    {
        country: "Sudan",
        iso: "SDN",
        housingDeficitPerCapita: 39.2,  // CAHF data - high deficit
        householdDebtToGDP: 1.1,
        housingExpenditureToGDP: 0.02,
        constructionJobsPerCapita: 22.4,
        housePriceToIncome: 10.3,
        informalHousingShare: 73.8,
        housingCostBurden: 43.6,
        socialRentalHousing: 0.1,
        policyActivityScore: 1,
        disasterRiskIndex: 10.0,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 27.5,  // Pop: 49.1M, GDP/cap: $5k PPP, middle-class market
        affordableHomePriceRatio: 1.9  // 15-20% mortgage rate
    },
    {
        country: "Mauritius",
        iso: "MUS",
        housingDeficitPerCapita: 12.4,  // CAHF Yearbook 2024
        householdDebtToGDP: 28.5,
        housingExpenditureToGDP: 0.41,
        constructionJobsPerCapita: 52.8,
        housePriceToIncome: 8.6,
        informalHousingShare: 8.2,
        housingCostBurden: 18.9,
        socialRentalHousing: 1.8,
        policyActivityScore: 2,
        disasterRiskIndex: 10.0,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 15,  // CAHF 2024: Pop 1.3M, high GDP/cap, financial hub, tourism (10-yr outlook)
        affordableHomePriceRatio: 3.4  // 6-7% mortgage rate
    },
    {
        country: "Malawi",
        iso: "MWI",
        housingDeficitPerCapita: 36.8,  // CAHF 2024 data
        householdDebtToGDP: 2.4,
        housingExpenditureToGDP: 0.05,
        constructionJobsPerCapita: 19.6,
        housePriceToIncome: 11.2,
        informalHousingShare: 66.4,
        housingCostBurden: 40.7,
        socialRentalHousing: 0.2,
        policyActivityScore: 1,
        disasterRiskIndex: 16.7,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 16,  // CAHF 2024: Pop 20M, large population base, Lilongwe-Blantyre growth (10-yr outlook)
        affordableHomePriceRatio: 1.8  // 18-25% mortgage rate
    },
    {
        country: "Benin",
        iso: "BEN",
        housingDeficitPerCapita: 31.5,  // CAHF Yearbook 2024
        householdDebtToGDP: 3.1,
        housingExpenditureToGDP: 0.06,
        constructionJobsPerCapita: 25.7,
        housePriceToIncome: 10.8,
        informalHousingShare: 59.3,
        housingCostBurden: 36.2,
        socialRentalHousing: 0.3,
        policyActivityScore: 1,
        disasterRiskIndex: 10.0,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 28.5,  // CAHF 2024: Pop 13M, Cotonou port economy, West Africa trade hub (10-yr outlook)
        affordableHomePriceRatio: 2.4  // 10-15% mortgage rate
    },
    {
        country: "Togo",
        iso: "TGO",
        housingDeficitPerCapita: 32.9,  // CAHF data
        householdDebtToGDP: 2.7,
        housingExpenditureToGDP: 0.05,
        constructionJobsPerCapita: 24.1,
        housePriceToIncome: 11.4,
        informalHousingShare: 61.7,
        housingCostBurden: 37.8,
        socialRentalHousing: 0.2,
        policyActivityScore: 1,
        disasterRiskIndex: 10.0,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 3.1,  // Pop: 9.1M, GDP/cap: $3k PPP, middle-class market
        affordableHomePriceRatio: 2.4  // 10-15% mortgage rate
    },
    {
        country: "Mali",
        iso: "MLI",
        housingDeficitPerCapita: 34.3,  // CAHF Yearbook 2024
        householdDebtToGDP: 1.9,
        housingExpenditureToGDP: 0.04,
        constructionJobsPerCapita: 21.3,
        housePriceToIncome: 10.6,
        informalHousingShare: 64.2,
        housingCostBurden: 38.9,
        socialRentalHousing: 0.2,
        policyActivityScore: 1,
        disasterRiskIndex: 10.0,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 26,  // CAHF 2024: Pop 22M, Bamako expansion, Sahel urbanization (10-yr outlook)
        affordableHomePriceRatio: 2.4  // 10-15% mortgage rate
    },
    {
        country: "Burkina Faso",
        iso: "BFA",
        housingDeficitPerCapita: 33.7,  // CAHF 2024 data
        householdDebtToGDP: 2.2,
        housingExpenditureToGDP: 0.05,
        constructionJobsPerCapita: 23.8,
        housePriceToIncome: 10.9,
        informalHousingShare: 62.8,
        housingCostBurden: 37.3,
        socialRentalHousing: 0.2,
        policyActivityScore: 1,
        disasterRiskIndex: 13.4,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 23,  // CAHF 2024: Pop 23M, Ouagadougou growth, young demographics (10-yr outlook)
        affordableHomePriceRatio: 2.4  // 10-15% mortgage rate
    },
    {
        country: "Madagascar",
        iso: "MDG",
        housingDeficitPerCapita: 37.6,  // CAHF Yearbook 2024
        householdDebtToGDP: 1.5,
        housingExpenditureToGDP: 0.03,
        constructionJobsPerCapita: 18.2,
        housePriceToIncome: 12.1,
        informalHousingShare: 70.3,
        housingCostBurden: 41.7,
        socialRentalHousing: 0.1,
        policyActivityScore: 1,
        disasterRiskIndex: 29.8,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 23,  // CAHF 2024: Pop 30M, large population base, Antananarivo expansion (10-yr outlook)
        affordableHomePriceRatio: 2.4  // 10-15% mortgage rate
    },
    {
        country: "Congo",
        iso: "COG",
        housingDeficitPerCapita: 30.2,  // CAHF data - Brazzaville
        householdDebtToGDP: 2.6,
        housingExpenditureToGDP: 0.08,
        constructionJobsPerCapita: 27.4,
        housePriceToIncome: 9.8,
        informalHousingShare: 53.6,
        housingCostBurden: 35.1,
        socialRentalHousing: 0.3,
        policyActivityScore: 1,
        disasterRiskIndex: 11.6,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 4.2,  // Pop: 6.2M, GDP/cap: $6k PPP, middle-class market
        affordableHomePriceRatio: 3.0  // 7-10% mortgage rate
    },
    {
        country: "Romania",
        iso: "ROU",
        housingDeficitPerCapita: 3.5,  // Estimate based on Eurostat 2024-2025 overcrowding data (41%)
        householdDebtToGDP: 12.5,  // Eurostat 2024-2025
        housingExpenditureToGDP: 0.8,  // Estimate (EU member state)
        constructionJobsPerCapita: 65.0,  // Estimate based on 8.3% of GVA (Eurostat)
        housePriceToIncome: 6.2,  // Eurostat data 2024
        informalHousingShare: 15.0,  // Estimate
        housingCostBurden: 25.0,  // Estimate
        socialRentalHousing: 0.8,  // Estimate - minimal social housing after privatization
        policyActivityScore: 2,
        disasterRiskIndex: 8.6,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 96.2,  // Pop: 19.1M, GDP/cap: $45k PPP, middle-class market
        affordableHomePriceRatio: 3.4  // 6-8% mortgage rate
    },
    {
        country: "Bulgaria",
        iso: "BGR",
        housingDeficitPerCapita: 4.2,  // Estimate based on Eurostat overcrowding 34%
        householdDebtToGDP: 20.0,  // Eurostat estimate 2024-2025
        housingExpenditureToGDP: 0.6,  // Estimate
        constructionJobsPerCapita: 55.0,  // Estimate
        housePriceToIncome: 5.8,  // Eurostat - housing costs 44% below EU average
        informalHousingShare: 18.0,  // Estimate
        housingCostBurden: 22.0,  // Estimate
        socialRentalHousing: 0.6,  // Estimate - very low after post-communist privatization
        policyActivityScore: 2,
        disasterRiskIndex: 9.2,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 24.3,  // Pop: 6.4M, GDP/cap: $34k PPP, middle-class market
        affordableHomePriceRatio: 3.4  // 6-8% mortgage rate
    },
    {
        country: "Croatia",
        iso: "HRV",
        housingDeficitPerCapita: 3.8,  // Estimate based on Eurostat overcrowding 31.7%
        householdDebtToGDP: 32.6,  // Eurostat 2024-2025
        housingExpenditureToGDP: 0.7,  // Estimate
        constructionJobsPerCapita: 58.0,  // Estimate
        housePriceToIncome: 7.1,  // Estimate
        informalHousingShare: 12.0,  // Estimate
        housingCostBurden: 3.0,  // Eurostat - very low cost burden
        socialRentalHousing: 1.2,  // Estimate - low social housing stock
        policyActivityScore: 2,
        disasterRiskIndex: 10.8,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 18.3,  // Pop: 3.9M, GDP/cap: $42k PPP, middle-class market
        affordableHomePriceRatio: 3.4  // 6-8% mortgage rate
    },
    {
        country: "Peru",
        iso: "PER",
        housingDeficitPerCapita: 18.5,  // IDB/World Bank 2024 - qualitative housing deficit 23-68%
        householdDebtToGDP: 12.0,  // Estimate
        housingExpenditureToGDP: 0.4,  // Estimate
        constructionJobsPerCapita: 45.0,  // Estimate
        housePriceToIncome: 8.2,  // Estimate
        informalHousingShare: 45.0,  // Estimate based on IDB data
        housingCostBurden: 32.0,  // Estimate
        socialRentalHousing: 1.5,  // Estimate
        policyActivityScore: 3,
        disasterRiskIndex: 33.2,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 105,  // Pop: 34M, mining wealth, Lima expansion (10-yr outlook)
        affordableHomePriceRatio: 2.6  // 9-11% mortgage rate
    },
    {
        country: "Cambodia",
        iso: "KHM",
        housingDeficitPerCapita: 25.3,  // Estimate based on 39.7% informal housing (World Bank 2020)
        householdDebtToGDP: 18.0,  // Estimate
        housingExpenditureToGDP: 0.2,  // Estimate
        constructionJobsPerCapita: 38.0,  // Estimate
        housePriceToIncome: 9.7,  // Estimate
        informalHousingShare: 39.7,  // World Bank 2020
        housingCostBurden: 28.0,  // Estimate
        socialRentalHousing: 0.5,  // Estimate
        policyActivityScore: 2,
        disasterRiskIndex: 19.4,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 11.4,  // Pop: 17.0M, GDP/cap: $6k PPP, middle-class market
        affordableHomePriceRatio: 2.8  // 8-10% mortgage rate
    },
    {
        country: "Nepal",
        iso: "NPL",
        housingDeficitPerCapita: 27.8,  // Estimate based on 49% informal housing (UNESCAP 2018)
        householdDebtToGDP: 8.0,  // Estimate
        housingExpenditureToGDP: 0.15,  // Estimate
        constructionJobsPerCapita: 35.0,  // Estimate
        housePriceToIncome: 10.3,  // Estimate
        informalHousingShare: 49.0,  // UNESCAP 2018
        housingCostBurden: 31.0,  // Estimate
        socialRentalHousing: 0.3,  // Estimate
        policyActivityScore: 2,
        disasterRiskIndex: 26.8,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 17.3,  // Pop: 30.9M, GDP/cap: $5k PPP, middle-class market
        affordableHomePriceRatio: 2.8  // 8-10% mortgage rate
    },
    {
        country: "Myanmar",
        iso: "MMR",
        housingDeficitPerCapita: 29.6,  // Estimate based on 56.1% informal housing (UNESCAP 2018)
        householdDebtToGDP: 6.0,  // Estimate
        housingExpenditureToGDP: 0.1,  // Estimate
        constructionJobsPerCapita: 32.0,  // Estimate
        housePriceToIncome: 11.2,  // Estimate
        informalHousingShare: 56.1,  // UNESCAP 2018
        housingCostBurden: 33.0,  // Estimate
        socialRentalHousing: 0.2,  // Estimate
        policyActivityScore: 1,
        disasterRiskIndex: 35.85,  // WorldRiskIndex 2024
        housingInvestmentOpportunity: 36.7,  // Pop: 54.6M, GDP/cap: $6k PPP, middle-class market
        affordableHomePriceRatio: 2.8  // 8-10% mortgage rate
    },

];

// Data quality notes:
// - Household debt to GDP data primarily from IMF Global Debt Database, Trading Economics, and World Bank (2024)
// - Housing deficit estimates compiled from UN-Habitat, OECD, World Bank, and CAHF reports
// - Government expenditure from OECD Affordable Housing Database and national sources
// - Construction jobs data from ILO, national labor statistics, and World Bank employment data
// - Natural disaster risk from WorldRiskIndex 2024 by Bündnis Entwicklung Hilft & IFHV (covers 193 countries globally)
// - African housing data significantly enhanced from CAHF Housing Finance in Africa Yearbook (2024 - 15th Edition)
// - Eastern European data from Eurostat 2024-2025 (Romania, Bulgaria, Croatia)
// - CAHF provides the most comprehensive and reliable housing data for African countries
// - Some values are estimates where direct data is unavailable
