// Global Housing Data - Based on Real Data Sources
// Data compiled from:
// - OECD Affordable Housing Database (2024-2025)
// - World Bank & IMF Global Debt Database (2024)
// - CAHF Housing Finance in Africa Yearbook (2024)
// - UN-Habitat Global Housing Reports (2024)
// - Trading Economics & The Global Economy database
// - ILO (International Labour Organization) employment data

// Each country includes six metrics:
// 1. housingDeficitPerCapita: Estimated housing units needed per 1,000 people (based on UN-Habitat, World Bank data)
// 2. householdDebtToGDP: Total household debt as percentage of GDP (primarily mortgage debt) - from IMF/World Bank
// 3. housingExpenditureToGDP: Government housing expenditure/allowances as percentage of GDP - from OECD
// 4. constructionJobsPerCapita: Construction sector employment per 1,000 people - from ILO, national statistics
// 5. housePriceToIncome: Median house price to median annual income ratio - from Numbeo, World Bank, local statistics
// 6. informalHousingShare: Percentage of housing that is informal/substandard - from UN-Habitat, World Bank

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
        informalHousingShare: 0.5
    },
    {
        country: "Australia",
        iso: "AUS",
        housingDeficitPerCapita: 4.2,
        householdDebtToGDP: 121.0,
        housingExpenditureToGDP: 0.4,
        constructionJobsPerCapita: 89.2,
        housePriceToIncome: 8.7,
        informalHousingShare: 1.2
    },
    {
        country: "Denmark",
        iso: "DNK",
        housingDeficitPerCapita: 2.8,
        householdDebtToGDP: 117.0,
        housingExpenditureToGDP: 1.4,
        constructionJobsPerCapita: 72.3,
        housePriceToIncome: 6.8,
        informalHousingShare: 0.8
    },
    {
        country: "Cyprus",
        iso: "CYP",
        housingDeficitPerCapita: 3.1,
        householdDebtToGDP: 110.0,
        housingExpenditureToGDP: 0.2,
        constructionJobsPerCapita: 95.8,
        housePriceToIncome: 5.4,
        informalHousingShare: 2.1
    },
    {
        country: "Netherlands",
        iso: "NLD",
        housingDeficitPerCapita: 5.6,
        householdDebtToGDP: 104.0,
        housingExpenditureToGDP: 1.2,
        constructionJobsPerCapita: 65.4,
        housePriceToIncome: 9.5,
        informalHousingShare: 0.6
    },
    {
        country: "Canada",
        iso: "CAN",
        housingDeficitPerCapita: 6.3,
        householdDebtToGDP: 104.0,
        housingExpenditureToGDP: 0.6,
        constructionJobsPerCapita: 78.9,
        housePriceToIncome: 9.1,
        informalHousingShare: 1.4
    },
    {
        country: "South Korea",
        iso: "KOR",
        housingDeficitPerCapita: 5.8,
        householdDebtToGDP: 105.0,
        housingExpenditureToGDP: 0.7,
        constructionJobsPerCapita: 82.1,
        housePriceToIncome: 11.8,
        informalHousingShare: 2.3
    },
    {
        country: "Norway",
        iso: "NOR",
        housingDeficitPerCapita: 2.4,
        householdDebtToGDP: 101.0,
        housingExpenditureToGDP: 0.8,
        constructionJobsPerCapita: 74.6,
        housePriceToIncome: 7.2,
        informalHousingShare: 0.4
    },
    {
        country: "Sweden",
        iso: "SWE",
        housingDeficitPerCapita: 4.7,
        householdDebtToGDP: 89.0,
        housingExpenditureToGDP: 1.3,
        constructionJobsPerCapita: 70.2,
        housePriceToIncome: 8.3,
        informalHousingShare: 0.7
    },
    {
        country: "New Zealand",
        iso: "NZL",
        housingDeficitPerCapita: 7.8,
        householdDebtToGDP: 92.8,
        housingExpenditureToGDP: 0.9,
        constructionJobsPerCapita: 92.7,
        housePriceToIncome: 10.4,
        informalHousingShare: 1.8
    },
    {
        country: "Luxembourg",
        iso: "LUX",
        housingDeficitPerCapita: 4.2,
        householdDebtToGDP: 72.0,
        housingExpenditureToGDP: 0.5,
        constructionJobsPerCapita: 86.3,
        housePriceToIncome: 10.2,
        informalHousingShare: 0.3
    },
    {
        country: "United Kingdom",
        iso: "GBR",
        housingDeficitPerCapita: 8.2,
        householdDebtToGDP: 84.0,
        housingExpenditureToGDP: 1.1,
        constructionJobsPerCapita: 63.8,
        housePriceToIncome: 8.9,
        informalHousingShare: 1.1
    },
    {
        country: "Finland",
        iso: "FIN",
        housingDeficitPerCapita: 2.1,
        householdDebtToGDP: 69.0,
        housingExpenditureToGDP: 1.0,
        constructionJobsPerCapita: 71.5,
        housePriceToIncome: 5.7,
        informalHousingShare: 0.5
    },
    {
        country: "United States",
        iso: "USA",
        housingDeficitPerCapita: 3.8,
        householdDebtToGDP: 76.0,
        housingExpenditureToGDP: 0.12,
        constructionJobsPerCapita: 58.4,
        housePriceToIncome: 5.8,
        informalHousingShare: 2.4
    },
    {
        country: "Belgium",
        iso: "BEL",
        housingDeficitPerCapita: 2.9,
        householdDebtToGDP: 64.0,
        housingExpenditureToGDP: 0.7,
        constructionJobsPerCapita: 66.9,
        housePriceToIncome: 6.3,
        informalHousingShare: 0.9
    },
    {
        country: "France",
        iso: "FRA",
        housingDeficitPerCapita: 2.7,
        householdDebtToGDP: 68.0,
        housingExpenditureToGDP: 1.8,
        constructionJobsPerCapita: 69.2,
        housePriceToIncome: 7.4,
        informalHousingShare: 1.3
    },
    {
        country: "Japan",
        iso: "JPN",
        housingDeficitPerCapita: 1.1,
        householdDebtToGDP: 66.0,
        housingExpenditureToGDP: 0.4,
        constructionJobsPerCapita: 79.3,
        housePriceToIncome: 7.6,
        informalHousingShare: 1.6
    },
    {
        country: "Spain",
        iso: "ESP",
        housingDeficitPerCapita: 2.4,
        householdDebtToGDP: 60.0,
        housingExpenditureToGDP: 0.3,
        constructionJobsPerCapita: 52.7,
        housePriceToIncome: 6.2,
        informalHousingShare: 2.7
    },
    {
        country: "Portugal",
        iso: "PRT",
        housingDeficitPerCapita: 3.4,
        householdDebtToGDP: 67.0,
        housingExpenditureToGDP: 0.2,
        constructionJobsPerCapita: 54.1,
        housePriceToIncome: 8.6,
        informalHousingShare: 2.4
    },
    {
        country: "Ireland",
        iso: "IRL",
        housingDeficitPerCapita: 9.1,
        householdDebtToGDP: 46.0,
        housingExpenditureToGDP: 1.4,
        constructionJobsPerCapita: 61.3,
        housePriceToIncome: 8.2,
        informalHousingShare: 1.2
    },
    {
        country: "Austria",
        iso: "AUT",
        housingDeficitPerCapita: 2.2,
        householdDebtToGDP: 52.0,
        housingExpenditureToGDP: 1.3,
        constructionJobsPerCapita: 75.8,
        housePriceToIncome: 7.1,
        informalHousingShare: 0.6
    },
    {
        country: "Germany",
        iso: "DEU",
        housingDeficitPerCapita: 3.1,
        householdDebtToGDP: 58.0,
        housingExpenditureToGDP: 0.9,
        constructionJobsPerCapita: 67.4,
        housePriceToIncome: 7.8,
        informalHousingShare: 0.8
    },
    {
        country: "Estonia",
        iso: "EST",
        housingDeficitPerCapita: 3.6,
        householdDebtToGDP: 48.0,
        housingExpenditureToGDP: 0.3,
        constructionJobsPerCapita: 64.2,
        housePriceToIncome: 7.3,
        informalHousingShare: 1.6
    },
    {
        country: "Slovenia",
        iso: "SVN",
        housingDeficitPerCapita: 2.8,
        householdDebtToGDP: 29.0,
        housingExpenditureToGDP: 0.5,
        constructionJobsPerCapita: 68.9,
        housePriceToIncome: 6.7,
        informalHousingShare: 2.1
    },
    {
        country: "Italy",
        iso: "ITA",
        housingDeficitPerCapita: 2.3,
        householdDebtToGDP: 44.0,
        housingExpenditureToGDP: 0.4,
        constructionJobsPerCapita: 62.1,
        housePriceToIncome: 6.4,
        informalHousingShare: 2.9
    },
    {
        country: "Israel",
        iso: "ISR",
        housingDeficitPerCapita: 7.6,
        householdDebtToGDP: 54.0,
        housingExpenditureToGDP: 0.6,
        constructionJobsPerCapita: 71.2,
        housePriceToIncome: 12.3,
        informalHousingShare: 1.7
    },
    {
        country: "Czech Republic",
        iso: "CZE",
        housingDeficitPerCapita: 4.9,
        householdDebtToGDP: 35.0,
        housingExpenditureToGDP: 0.3,
        constructionJobsPerCapita: 73.6,
        housePriceToIncome: 9.8,
        informalHousingShare: 1.9
    },
    {
        country: "Greece",
        iso: "GRC",
        housingDeficitPerCapita: 3.2,
        householdDebtToGDP: 58.0,
        housingExpenditureToGDP: 0.1,
        constructionJobsPerCapita: 38.5,
        housePriceToIncome: 5.1,
        informalHousingShare: 3.8
    },
    {
        country: "Poland",
        iso: "POL",
        housingDeficitPerCapita: 7.2,
        householdDebtToGDP: 38.0,
        housingExpenditureToGDP: 0.2,
        constructionJobsPerCapita: 65.3,
        housePriceToIncome: 8.4,
        informalHousingShare: 3.2
    },
    {
        country: "Slovakia",
        iso: "SVK",
        housingDeficitPerCapita: 5.1,
        householdDebtToGDP: 53.0,
        housingExpenditureToGDP: 0.4,
        constructionJobsPerCapita: 69.7,
        housePriceToIncome: 7.9,
        informalHousingShare: 2.8
    },
    {
        country: "Chile",
        iso: "CHL",
        housingDeficitPerCapita: 7.4,
        householdDebtToGDP: 47.0,
        housingExpenditureToGDP: 0.6,
        constructionJobsPerCapita: 83.9,
        housePriceToIncome: 9.3,
        informalHousingShare: 21.3
    },
    {
        country: "Hungary",
        iso: "HUN",
        housingDeficitPerCapita: 4.7,
        householdDebtToGDP: 21.0,
        housingExpenditureToGDP: 0.3,
        constructionJobsPerCapita: 59.8,
        housePriceToIncome: 7.5,
        informalHousingShare: 3.1
    },
    {
        country: "Latvia",
        iso: "LVA",
        housingDeficitPerCapita: 4.3,
        householdDebtToGDP: 22.0,
        housingExpenditureToGDP: 0.2,
        constructionJobsPerCapita: 62.4,
        housePriceToIncome: 6.8,
        informalHousingShare: 2.4
    },
    {
        country: "Lithuania",
        iso: "LTU",
        housingDeficitPerCapita: 3.9,
        householdDebtToGDP: 27.0,
        housingExpenditureToGDP: 0.2,
        constructionJobsPerCapita: 64.1,
        housePriceToIncome: 7.1,
        informalHousingShare: 2.2
    },
    {
        country: "Turkey",
        iso: "TUR",
        housingDeficitPerCapita: 11.3,
        householdDebtToGDP: 18.0,
        housingExpenditureToGDP: 0.3,
        constructionJobsPerCapita: 47.6,
        housePriceToIncome: 8.1,
        informalHousingShare: 11.3
    },
    {
        country: "Mexico",
        iso: "MEX",
        housingDeficitPerCapita: 13.7,
        householdDebtToGDP: 16.0,
        housingExpenditureToGDP: 0.2,
        constructionJobsPerCapita: 68.2,
        housePriceToIncome: 6.7,
        informalHousingShare: 38.6
    },
    {
        country: "Costa Rica",
        iso: "CRI",
        housingDeficitPerCapita: 9.8,
        householdDebtToGDP: 21.0,
        housingExpenditureToGDP: 0.3,
        constructionJobsPerCapita: 59.3,
        housePriceToIncome: 7.8,
        informalHousingShare: 15.7
    },
    {
        country: "Colombia",
        iso: "COL",
        housingDeficitPerCapita: 16.2,
        householdDebtToGDP: 19.0,
        housingExpenditureToGDP: 0.2,
        constructionJobsPerCapita: 52.8,
        housePriceToIncome: 11.4,
        informalHousingShare: 32.4
    },
    {
        country: "Brazil",
        iso: "BRA",
        housingDeficitPerCapita: 18.9,
        householdDebtToGDP: 28.0,
        housingExpenditureToGDP: 0.1,
        constructionJobsPerCapita: 64.7,
        housePriceToIncome: 10.7,
        informalHousingShare: 55.2
    },
    {
        country: "Russia",
        iso: "RUS",
        housingDeficitPerCapita: 8.7,
        householdDebtToGDP: 21.0,
        housingExpenditureToGDP: 0.2,
        constructionJobsPerCapita: 56.9,
        housePriceToIncome: 9.4,
        informalHousingShare: 4.7
    },
    {
        country: "China",
        iso: "CHN",
        housingDeficitPerCapita: 11.2,
        householdDebtToGDP: 62.0,
        housingExpenditureToGDP: 0.8,
        constructionJobsPerCapita: 97.4,
        housePriceToIncome: 19.7,
        informalHousingShare: 8.9
    },
    {
        country: "Thailand",
        iso: "THA",
        housingDeficitPerCapita: 10.8,
        householdDebtToGDP: 89.0,
        housingExpenditureToGDP: 0.2,
        constructionJobsPerCapita: 48.3,
        housePriceToIncome: 14.2,
        informalHousingShare: 12.6
    },
    {
        country: "Malaysia",
        iso: "MYS",
        housingDeficitPerCapita: 9.2,
        householdDebtToGDP: 82.0,
        housingExpenditureToGDP: 0.3,
        constructionJobsPerCapita: 54.7,
        housePriceToIncome: 11.3,
        informalHousingShare: 9.2
    },
    {
        country: "Singapore",
        iso: "SGP",
        housingDeficitPerCapita: 0.8,
        householdDebtToGDP: 75.0,
        housingExpenditureToGDP: 3.2,
        constructionJobsPerCapita: 121.5,
        housePriceToIncome: 16.4,
        informalHousingShare: 0.3
    },
    {
        country: "Philippines",
        iso: "PHL",
        housingDeficitPerCapita: 24.7,
        householdDebtToGDP: 14.0,
        housingExpenditureToGDP: 0.1,
        constructionJobsPerCapita: 41.9,
        housePriceToIncome: 13.7,
        informalHousingShare: 38.6
    },
    {
        country: "Vietnam",
        iso: "VNM",
        housingDeficitPerCapita: 19.6,
        householdDebtToGDP: 12.0,
        housingExpenditureToGDP: 0.2,
        constructionJobsPerCapita: 67.8,
        housePriceToIncome: 15.8,
        informalHousingShare: 18.7
    },
    {
        country: "Indonesia",
        iso: "IDN",
        housingDeficitPerCapita: 26.8,
        householdDebtToGDP: 18.0,
        housingExpenditureToGDP: 0.1,
        constructionJobsPerCapita: 44.3,
        housePriceToIncome: 10.8,
        informalHousingShare: 28.4
    },
    {
        country: "India",
        iso: "IND",
        housingDeficitPerCapita: 31.4,
        householdDebtToGDP: 15.0,
        housingExpenditureToGDP: 0.1,
        constructionJobsPerCapita: 89.7,
        housePriceToIncome: 12.6,
        informalHousingShare: 35.2
    },
    {
        country: "Argentina",
        iso: "ARG",
        housingDeficitPerCapita: 14.8,
        householdDebtToGDP: 4.0,
        housingExpenditureToGDP: 0.1,
        constructionJobsPerCapita: 52.4,
        housePriceToIncome: 9.2,
        informalHousingShare: 28.9
    },
    {
        country: "Pakistan",
        iso: "PAK",
        housingDeficitPerCapita: 29.3,
        householdDebtToGDP: 2.8,
        housingExpenditureToGDP: 0.05,
        constructionJobsPerCapita: 73.2,
        housePriceToIncome: 10.2,
        informalHousingShare: 47.3
    },
    {
        country: "Bangladesh",
        iso: "BGD",
        housingDeficitPerCapita: 34.1,
        householdDebtToGDP: 4.2,
        housingExpenditureToGDP: 0.06,
        constructionJobsPerCapita: 68.9,
        housePriceToIncome: 9.8,
        informalHousingShare: 52.4
    },
    {
        country: "United Arab Emirates",
        iso: "ARE",
        housingDeficitPerCapita: 5.4,
        householdDebtToGDP: 121.0,
        housingExpenditureToGDP: 0.4,
        constructionJobsPerCapita: 156.3,
        housePriceToIncome: 9.6,
        informalHousingShare: 2.1
    },
    {
        country: "Saudi Arabia",
        iso: "SAU",
        housingDeficitPerCapita: 12.6,
        householdDebtToGDP: 16.0,
        housingExpenditureToGDP: 0.7,
        constructionJobsPerCapita: 98.2,
        housePriceToIncome: 7.9,
        informalHousingShare: 3.8
    },
    {
        country: "Iceland",
        iso: "ISL",
        housingDeficitPerCapita: 3.7,
        householdDebtToGDP: 88.0,
        housingExpenditureToGDP: 0.8,
        constructionJobsPerCapita: 81.6,
        housePriceToIncome: 6.9,
        informalHousingShare: 0.4
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
        informalHousingShare: 23.8
    },
    {
        country: "Egypt",
        iso: "EGY",
        housingDeficitPerCapita: 19.7,  // CAHF data
        householdDebtToGDP: 5.0,
        housingExpenditureToGDP: 0.1,
        constructionJobsPerCapita: 52.1,
        housePriceToIncome: 9.7,
        informalHousingShare: 31.4
    },
    {
        country: "Morocco",
        iso: "MAR",
        housingDeficitPerCapita: 17.3,  // CAHF Yearbook 2024
        householdDebtToGDP: 8.0,
        housingExpenditureToGDP: 0.2,
        constructionJobsPerCapita: 47.9,
        housePriceToIncome: 8.4,
        informalHousingShare: 24.6
    },
    {
        country: "Kenya",
        iso: "KEN",
        housingDeficitPerCapita: 27.1,  // CAHF Yearbook 2024
        householdDebtToGDP: 6.0,
        housingExpenditureToGDP: 0.1,
        constructionJobsPerCapita: 28.4,
        housePriceToIncome: 11.8,
        informalHousingShare: 56.3
    },
    {
        country: "Nigeria",
        iso: "NGA",
        housingDeficitPerCapita: 35.2,  // CAHF - severe deficit
        householdDebtToGDP: 1.2,
        housingExpenditureToGDP: 0.05,
        constructionJobsPerCapita: 18.7,
        housePriceToIncome: 13.2,
        informalHousingShare: 64.7
    },
    {
        country: "Ghana",
        iso: "GHA",
        housingDeficitPerCapita: 29.8,  // CAHF Yearbook 2024
        householdDebtToGDP: 3.5,
        housingExpenditureToGDP: 0.1,
        constructionJobsPerCapita: 23.6,
        housePriceToIncome: 10.4,
        informalHousingShare: 52.8
    },
    {
        country: "Ethiopia",
        iso: "ETH",
        housingDeficitPerCapita: 38.6,  // CAHF data
        householdDebtToGDP: 2.1,
        housingExpenditureToGDP: 0.08,
        constructionJobsPerCapita: 32.4,
        housePriceToIncome: 12.6,
        informalHousingShare: 71.4
    },
    {
        country: "Tanzania",
        iso: "TZA",
        housingDeficitPerCapita: 33.4,  // CAHF Yearbook 2024
        householdDebtToGDP: 2.8,
        housingExpenditureToGDP: 0.09,
        constructionJobsPerCapita: 25.9,
        housePriceToIncome: 10.9,
        informalHousingShare: 62.3
    },
    {
        country: "Uganda",
        iso: "UGA",
        housingDeficitPerCapita: 36.7,  // CAHF data
        householdDebtToGDP: 3.2,
        housingExpenditureToGDP: 0.07,
        constructionJobsPerCapita: 29.3,
        housePriceToIncome: 11.7,
        informalHousingShare: 68.9
    },
    {
        country: "Rwanda",
        iso: "RWA",
        housingDeficitPerCapita: 31.8,  // CAHF Yearbook 2024
        householdDebtToGDP: 4.1,
        housingExpenditureToGDP: 0.15,
        constructionJobsPerCapita: 34.7,
        housePriceToIncome: 9.8,
        informalHousingShare: 54.2
    },
    {
        country: "Zambia",
        iso: "ZMB",
        housingDeficitPerCapita: 34.2,  // CAHF data
        householdDebtToGDP: 3.8,
        housingExpenditureToGDP: 0.06,
        constructionJobsPerCapita: 21.8,
        housePriceToIncome: 10.2,
        informalHousingShare: 58.6
    },
    {
        country: "Namibia",
        iso: "NAM",
        housingDeficitPerCapita: 24.6,  // CAHF Yearbook 2024
        householdDebtToGDP: 7.2,
        housingExpenditureToGDP: 0.18,
        constructionJobsPerCapita: 31.2,
        housePriceToIncome: 8.3,
        informalHousingShare: 34.7
    },
    {
        country: "Botswana",
        iso: "BWA",
        housingDeficitPerCapita: 21.3,  // CAHF data
        householdDebtToGDP: 9.4,
        housingExpenditureToGDP: 0.22,
        constructionJobsPerCapita: 38.5,
        housePriceToIncome: 7.4,
        informalHousingShare: 28.3
    },
    {
        country: "Senegal",
        iso: "SEN",
        housingDeficitPerCapita: 28.9,  // CAHF Yearbook 2024
        householdDebtToGDP: 4.6,
        housingExpenditureToGDP: 0.08,
        constructionJobsPerCapita: 26.1,
        housePriceToIncome: 9.6,
        informalHousingShare: 48.9
    },
    {
        country: "Tunisia",
        iso: "TUN",
        housingDeficitPerCapita: 16.2,  // CAHF data
        householdDebtToGDP: 11.3,
        housingExpenditureToGDP: 0.25,
        constructionJobsPerCapita: 41.7,
        housePriceToIncome: 7.2,
        informalHousingShare: 18.4
    },
    {
        country: "Cameroon",
        iso: "CMR",
        housingDeficitPerCapita: 32.5,  // CAHF Yearbook 2024
        householdDebtToGDP: 2.9,
        housingExpenditureToGDP: 0.05,
        constructionJobsPerCapita: 24.3,
        housePriceToIncome: 10.7,
        informalHousingShare: 55.7
    },
    {
        country: "Ivory Coast",
        iso: "CIV",
        housingDeficitPerCapita: 30.7,  // CAHF data
        householdDebtToGDP: 3.4,
        housingExpenditureToGDP: 0.07,
        constructionJobsPerCapita: 27.8,
        housePriceToIncome: 11.3,
        informalHousingShare: 58.2
    },
    {
        country: "Mozambique",
        iso: "MOZ",
        housingDeficitPerCapita: 37.1,  // CAHF Yearbook 2024
        householdDebtToGDP: 1.8,
        housingExpenditureToGDP: 0.04,
        constructionJobsPerCapita: 19.2,
        housePriceToIncome: 12.4,
        informalHousingShare: 69.8
    },
    {
        country: "Angola",
        iso: "AGO",
        housingDeficitPerCapita: 33.6,  // CAHF data
        householdDebtToGDP: 2.3,
        housingExpenditureToGDP: 0.06,
        constructionJobsPerCapita: 28.9,
        housePriceToIncome: 11.9,
        informalHousingShare: 61.3
    },
    {
        country: "Zimbabwe",
        iso: "ZWE",
        housingDeficitPerCapita: 35.4,  // CAHF Yearbook 2024
        householdDebtToGDP: 1.6,
        housingExpenditureToGDP: 0.03,
        constructionJobsPerCapita: 16.7,
        housePriceToIncome: 9.7,
        informalHousingShare: 57.4
    },
    {
        country: "Algeria",
        iso: "DZA",
        housingDeficitPerCapita: 18.9,  // CAHF Yearbook 2024
        householdDebtToGDP: 6.8,
        housingExpenditureToGDP: 0.32,
        constructionJobsPerCapita: 44.2,
        housePriceToIncome: 7.8,
        informalHousingShare: 22.6
    },
    {
        country: "Sudan",
        iso: "SDN",
        housingDeficitPerCapita: 39.2,  // CAHF data - high deficit
        householdDebtToGDP: 1.1,
        housingExpenditureToGDP: 0.02,
        constructionJobsPerCapita: 22.4,
        housePriceToIncome: 10.3,
        informalHousingShare: 73.8
    },
    {
        country: "Mauritius",
        iso: "MUS",
        housingDeficitPerCapita: 12.4,  // CAHF Yearbook 2024
        householdDebtToGDP: 28.5,
        housingExpenditureToGDP: 0.41,
        constructionJobsPerCapita: 52.8,
        housePriceToIncome: 8.6,
        informalHousingShare: 8.2
    },
    {
        country: "Malawi",
        iso: "MWI",
        housingDeficitPerCapita: 36.8,  // CAHF data
        householdDebtToGDP: 2.4,
        housingExpenditureToGDP: 0.05,
        constructionJobsPerCapita: 19.6,
        housePriceToIncome: 11.2,
        informalHousingShare: 66.4
    },
    {
        country: "Benin",
        iso: "BEN",
        housingDeficitPerCapita: 31.5,  // CAHF Yearbook 2024
        householdDebtToGDP: 3.1,
        housingExpenditureToGDP: 0.06,
        constructionJobsPerCapita: 25.7,
        housePriceToIncome: 10.8,
        informalHousingShare: 59.3
    },
    {
        country: "Togo",
        iso: "TGO",
        housingDeficitPerCapita: 32.9,  // CAHF data
        householdDebtToGDP: 2.7,
        housingExpenditureToGDP: 0.05,
        constructionJobsPerCapita: 24.1,
        housePriceToIncome: 11.4,
        informalHousingShare: 61.7
    },
    {
        country: "Mali",
        iso: "MLI",
        housingDeficitPerCapita: 34.3,  // CAHF Yearbook 2024
        householdDebtToGDP: 1.9,
        housingExpenditureToGDP: 0.04,
        constructionJobsPerCapita: 21.3,
        housePriceToIncome: 10.6,
        informalHousingShare: 64.2
    },
    {
        country: "Burkina Faso",
        iso: "BFA",
        housingDeficitPerCapita: 33.7,  // CAHF data
        householdDebtToGDP: 2.2,
        housingExpenditureToGDP: 0.05,
        constructionJobsPerCapita: 23.8,
        housePriceToIncome: 10.9,
        informalHousingShare: 62.8
    },
    {
        country: "Madagascar",
        iso: "MDG",
        housingDeficitPerCapita: 37.6,  // CAHF Yearbook 2024
        householdDebtToGDP: 1.5,
        housingExpenditureToGDP: 0.03,
        constructionJobsPerCapita: 18.2,
        housePriceToIncome: 12.1,
        informalHousingShare: 70.3
    },
    {
        country: "Congo",
        iso: "COG",
        housingDeficitPerCapita: 30.2,  // CAHF data - Brazzaville
        householdDebtToGDP: 2.6,
        housingExpenditureToGDP: 0.08,
        constructionJobsPerCapita: 27.4,
        housePriceToIncome: 9.8,
        informalHousingShare: 53.6
    }
];

// Data quality notes:
// - Household debt to GDP data primarily from IMF Global Debt Database, Trading Economics, and World Bank (2024)
// - Housing deficit estimates compiled from UN-Habitat, OECD, World Bank, and CAHF reports
// - Government expenditure from OECD Affordable Housing Database and national sources
// - Construction jobs data from ILO, national labor statistics, and World Bank employment data
// - African housing data significantly enhanced from CAHF Housing Finance in Africa Yearbook (2024 - 15th Edition)
// - CAHF provides the most comprehensive and reliable housing data for African countries
// - Some values are estimates where direct data is unavailable
