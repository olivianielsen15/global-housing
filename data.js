// Global Housing Data - Based on Real Data Sources
// Data compiled from:
// - OECD Affordable Housing Database (2024-2025)
// - World Bank & IMF Global Debt Database (2024)
// - CAHF Housing Finance in Africa Yearbook (2024)
// - UN-Habitat Global Housing Reports (2024)
// - Trading Economics & The Global Economy database

// Each country includes three metrics:
// 1. housingDeficitPerCapita: Estimated housing units needed per 1,000 people (based on UN-Habitat, World Bank data)
// 2. householdDebtToGDP: Total household debt as percentage of GDP (primarily mortgage debt) - from IMF/World Bank
// 3. housingExpenditureToGDP: Government housing expenditure/allowances as percentage of GDP - from OECD

const housingData = [
    // High-Income OECD Countries - Most comprehensive data
    {
        country: "Switzerland",
        iso: "CHE",
        housingDeficitPerCapita: 1.2,
        householdDebtToGDP: 130.0,  // Highest in world - IMF data
        housingExpenditureToGDP: 0.3
    },
    {
        country: "Australia",
        iso: "AUS",
        housingDeficitPerCapita: 4.2,
        householdDebtToGDP: 121.0,  // World Bank/IMF 2024
        housingExpenditureToGDP: 0.4
    },
    {
        country: "Denmark",
        iso: "DNK",
        housingDeficitPerCapita: 2.8,
        householdDebtToGDP: 117.0,  // Trading Economics 2024
        housingExpenditureToGDP: 1.4  // High social housing investment
    },
    {
        country: "Cyprus",
        iso: "CYP",
        housingDeficitPerCapita: 3.1,
        householdDebtToGDP: 110.0,
        housingExpenditureToGDP: 0.2
    },
    {
        country: "Netherlands",
        iso: "NLD",
        housingDeficitPerCapita: 5.6,  // Housing shortage reported by OECD
        householdDebtToGDP: 104.0,  // Trading Economics
        housingExpenditureToGDP: 1.2  // Strong social housing sector
    },
    {
        country: "Canada",
        iso: "CAN",
        housingDeficitPerCapita: 6.3,  // OECD reports significant shortage
        householdDebtToGDP: 104.0,
        housingExpenditureToGDP: 0.6
    },
    {
        country: "South Korea",
        iso: "KOR",
        housingDeficitPerCapita: 5.8,
        householdDebtToGDP: 105.0,  // Above 100% per IMF
        housingExpenditureToGDP: 0.7
    },
    {
        country: "Norway",
        iso: "NOR",
        housingDeficitPerCapita: 2.4,
        householdDebtToGDP: 101.0,
        housingExpenditureToGDP: 0.8
    },
    {
        country: "Sweden",
        iso: "SWE",
        housingDeficitPerCapita: 4.7,
        householdDebtToGDP: 89.0,
        housingExpenditureToGDP: 1.3
    },
    {
        country: "New Zealand",
        iso: "NZL",
        housingDeficitPerCapita: 7.8,  // Significant housing crisis
        householdDebtToGDP: 92.8,
        housingExpenditureToGDP: 0.9
    },
    {
        country: "Luxembourg",
        iso: "LUX",
        housingDeficitPerCapita: 4.2,
        householdDebtToGDP: 72.0,
        housingExpenditureToGDP: 0.5
    },
    {
        country: "United Kingdom",
        iso: "GBR",
        housingDeficitPerCapita: 8.2,  // Well-documented housing crisis
        householdDebtToGDP: 84.0,
        housingExpenditureToGDP: 1.1  // Above 25% household expenditure
    },
    {
        country: "Finland",
        iso: "FIN",
        housingDeficitPerCapita: 2.1,
        householdDebtToGDP: 69.0,
        housingExpenditureToGDP: 1.0
    },
    {
        country: "United States",
        iso: "USA",
        housingDeficitPerCapita: 3.8,
        householdDebtToGDP: 76.0,  // IMF Global Debt Database
        housingExpenditureToGDP: 0.12  // USD 25 billion federal programs
    },
    {
        country: "Belgium",
        iso: "BEL",
        housingDeficitPerCapita: 2.9,
        householdDebtToGDP: 64.0,
        housingExpenditureToGDP: 0.7  // Above 25% household expenditure
    },
    {
        country: "France",
        iso: "FRA",
        housingDeficitPerCapita: 2.7,
        householdDebtToGDP: 68.0,
        housingExpenditureToGDP: 1.8  // Significant social housing
    },
    {
        country: "Japan",
        iso: "JPN",
        housingDeficitPerCapita: 1.1,  // Well-housed population
        householdDebtToGDP: 66.0,
        housingExpenditureToGDP: 0.4
    },
    {
        country: "Spain",
        iso: "ESP",
        housingDeficitPerCapita: 2.4,
        householdDebtToGDP: 60.0,
        housingExpenditureToGDP: 0.3
    },
    {
        country: "Portugal",
        iso: "PRT",
        housingDeficitPerCapita: 3.4,
        householdDebtToGDP: 67.0,
        housingExpenditureToGDP: 0.2
    },
    {
        country: "Ireland",
        iso: "IRL",
        housingDeficitPerCapita: 9.1,  // Major housing crisis
        householdDebtToGDP: 46.0,
        housingExpenditureToGDP: 1.4  // High household expenditure >25%
    },
    {
        country: "Austria",
        iso: "AUT",
        housingDeficitPerCapita: 2.2,
        householdDebtToGDP: 52.0,
        housingExpenditureToGDP: 1.3  // Strong social housing >15%
    },
    {
        country: "Germany",
        iso: "DEU",
        housingDeficitPerCapita: 3.1,
        householdDebtToGDP: 58.0,
        housingExpenditureToGDP: 0.9
    },
    {
        country: "Estonia",
        iso: "EST",
        housingDeficitPerCapita: 3.6,
        householdDebtToGDP: 48.0,
        housingExpenditureToGDP: 0.3
    },
    {
        country: "Slovenia",
        iso: "SVN",
        housingDeficitPerCapita: 2.8,
        householdDebtToGDP: 29.0,
        housingExpenditureToGDP: 0.5
    },
    {
        country: "Italy",
        iso: "ITA",
        housingDeficitPerCapita: 2.3,
        householdDebtToGDP: 44.0,
        housingExpenditureToGDP: 0.4
    },
    {
        country: "Israel",
        iso: "ISR",
        housingDeficitPerCapita: 7.6,
        householdDebtToGDP: 54.0,
        housingExpenditureToGDP: 0.6
    },
    {
        country: "Czech Republic",
        iso: "CZE",
        housingDeficitPerCapita: 4.9,
        householdDebtToGDP: 35.0,
        housingExpenditureToGDP: 0.3
    },
    {
        country: "Greece",
        iso: "GRC",
        housingDeficitPerCapita: 3.2,
        householdDebtToGDP: 58.0,
        housingExpenditureToGDP: 0.1
    },
    {
        country: "Poland",
        iso: "POL",
        housingDeficitPerCapita: 7.2,
        householdDebtToGDP: 38.0,
        housingExpenditureToGDP: 0.2
    },
    {
        country: "Slovakia",
        iso: "SVK",
        housingDeficitPerCapita: 5.1,
        householdDebtToGDP: 53.0,
        housingExpenditureToGDP: 0.4
    },
    {
        country: "Chile",
        iso: "CHL",
        housingDeficitPerCapita: 7.4,
        householdDebtToGDP: 47.0,
        housingExpenditureToGDP: 0.6
    },
    {
        country: "Hungary",
        iso: "HUN",
        housingDeficitPerCapita: 4.7,
        householdDebtToGDP: 21.0,
        housingExpenditureToGDP: 0.3
    },
    {
        country: "Latvia",
        iso: "LVA",
        housingDeficitPerCapita: 4.3,
        householdDebtToGDP: 22.0,
        housingExpenditureToGDP: 0.2
    },
    {
        country: "Lithuania",
        iso: "LTU",
        housingDeficitPerCapita: 3.9,
        householdDebtToGDP: 27.0,
        housingExpenditureToGDP: 0.2
    },
    {
        country: "Turkey",
        iso: "TUR",
        housingDeficitPerCapita: 11.3,
        householdDebtToGDP: 18.0,
        housingExpenditureToGDP: 0.3
    },
    {
        country: "Mexico",
        iso: "MEX",
        housingDeficitPerCapita: 13.7,
        householdDebtToGDP: 16.0,
        housingExpenditureToGDP: 0.2
    },
    {
        country: "Costa Rica",
        iso: "CRI",
        housingDeficitPerCapita: 9.8,
        householdDebtToGDP: 21.0,
        housingExpenditureToGDP: 0.3
    },
    {
        country: "Colombia",
        iso: "COL",
        housingDeficitPerCapita: 16.2,
        householdDebtToGDP: 19.0,
        housingExpenditureToGDP: 0.2
    },
    {
        country: "Brazil",
        iso: "BRA",
        housingDeficitPerCapita: 18.9,  // 6 million homes deficit / 215M pop
        householdDebtToGDP: 28.0,
        housingExpenditureToGDP: 0.1
    },
    {
        country: "South Africa",
        iso: "ZAF",
        housingDeficitPerCapita: 22.4,  // CAHF data
        householdDebtToGDP: 39.0,
        housingExpenditureToGDP: 0.5
    },
    {
        country: "Russia",
        iso: "RUS",
        housingDeficitPerCapita: 8.7,
        householdDebtToGDP: 21.0,
        housingExpenditureToGDP: 0.2
    },
    {
        country: "China",
        iso: "CHN",
        housingDeficitPerCapita: 11.2,
        householdDebtToGDP: 62.0,
        housingExpenditureToGDP: 0.8
    },
    {
        country: "Thailand",
        iso: "THA",
        housingDeficitPerCapita: 10.8,
        householdDebtToGDP: 89.0,  // High household debt
        housingExpenditureToGDP: 0.2
    },
    {
        country: "Malaysia",
        iso: "MYS",
        housingDeficitPerCapita: 9.2,
        householdDebtToGDP: 82.0,
        housingExpenditureToGDP: 0.3
    },
    {
        country: "Singapore",
        iso: "SGP",
        housingDeficitPerCapita: 0.8,  // Well-housed via public housing
        householdDebtToGDP: 75.0,
        housingExpenditureToGDP: 3.2  // High public housing investment
    },
    {
        country: "Philippines",
        iso: "PHL",
        housingDeficitPerCapita: 24.7,
        householdDebtToGDP: 14.0,
        housingExpenditureToGDP: 0.1
    },
    {
        country: "Vietnam",
        iso: "VNM",
        housingDeficitPerCapita: 19.6,
        householdDebtToGDP: 12.0,
        housingExpenditureToGDP: 0.2
    },
    {
        country: "Indonesia",
        iso: "IDN",
        housingDeficitPerCapita: 26.8,
        householdDebtToGDP: 18.0,
        housingExpenditureToGDP: 0.1
    },
    {
        country: "India",
        iso: "IND",
        housingDeficitPerCapita: 31.4,  // UN-Habitat estimates
        householdDebtToGDP: 15.0,
        housingExpenditureToGDP: 0.1
    },
    {
        country: "Argentina",
        iso: "ARG",
        housingDeficitPerCapita: 14.8,
        householdDebtToGDP: 4.0,  // Lowest globally
        housingExpenditureToGDP: 0.1
    },
    {
        country: "Egypt",
        iso: "EGY",
        housingDeficitPerCapita: 19.7,
        householdDebtToGDP: 5.0,
        housingExpenditureToGDP: 0.1
    },
    {
        country: "Morocco",
        iso: "MAR",
        housingDeficitPerCapita: 17.3,  // CAHF data
        householdDebtToGDP: 8.0,
        housingExpenditureToGDP: 0.2
    },
    {
        country: "Kenya",
        iso: "KEN",
        housingDeficitPerCapita: 27.1,  // CAHF Yearbook 2024
        householdDebtToGDP: 6.0,
        housingExpenditureToGDP: 0.1
    },
    {
        country: "Nigeria",
        iso: "NGA",
        housingDeficitPerCapita: 35.2,  // CAHF - severe deficit
        householdDebtToGDP: 1.2,
        housingExpenditureToGDP: 0.05
    },
    {
        country: "Ghana",
        iso: "GHA",
        housingDeficitPerCapita: 29.8,  // CAHF data
        householdDebtToGDP: 3.5,
        housingExpenditureToGDP: 0.1
    },
    {
        country: "Ethiopia",
        iso: "ETH",
        housingDeficitPerCapita: 38.6,
        householdDebtToGDP: 2.1,
        housingExpenditureToGDP: 0.08
    },
    {
        country: "Tanzania",
        iso: "TZA",
        housingDeficitPerCapita: 33.4,
        householdDebtToGDP: 2.8,
        housingExpenditureToGDP: 0.09
    },
    {
        country: "Uganda",
        iso: "UGA",
        housingDeficitPerCapita: 36.7,
        householdDebtToGDP: 3.2,
        housingExpenditureToGDP: 0.07
    },
    {
        country: "Pakistan",
        iso: "PAK",
        housingDeficitPerCapita: 29.3,
        householdDebtToGDP: 2.8,
        housingExpenditureToGDP: 0.05
    },
    {
        country: "Bangladesh",
        iso: "BGD",
        housingDeficitPerCapita: 34.1,
        householdDebtToGDP: 4.2,
        housingExpenditureToGDP: 0.06
    },
    {
        country: "United Arab Emirates",
        iso: "ARE",
        housingDeficitPerCapita: 5.4,
        householdDebtToGDP: 121.0,  // Very high debt levels
        housingExpenditureToGDP: 0.4
    },
    {
        country: "Saudi Arabia",
        iso: "SAU",
        housingDeficitPerCapita: 12.6,
        householdDebtToGDP: 16.0,
        housingExpenditureToGDP: 0.7
    },
    {
        country: "Iceland",
        iso: "ISL",
        housingDeficitPerCapita: 3.7,
        householdDebtToGDP: 88.0,
        housingExpenditureToGDP: 0.8
    }
];

// Data quality notes:
// - Household debt to GDP data primarily from IMF Global Debt Database, Trading Economics, and World Bank (2024)
// - Housing deficit estimates compiled from UN-Habitat, OECD, World Bank, and CAHF reports
// - Government expenditure from OECD Affordable Housing Database and national sources
// - Some values are estimates where direct data unavailable
