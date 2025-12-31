// Global Housing Data - Based on Real Data Sources
// Data compiled from:
// - OECD Affordable Housing Database (2024-2025)
// - World Bank & IMF Global Debt Database (2024)
// - CAHF Housing Finance in Africa Yearbook (2024)
// - UN-Habitat Global Housing Reports (2024)
// - Trading Economics & The Global Economy database
// - ILO (International Labour Organization) employment data

// Each country includes four metrics:
// 1. housingDeficitPerCapita: Estimated housing units needed per 1,000 people (based on UN-Habitat, World Bank data)
// 2. householdDebtToGDP: Total household debt as percentage of GDP (primarily mortgage debt) - from IMF/World Bank
// 3. housingExpenditureToGDP: Government housing expenditure/allowances as percentage of GDP - from OECD
// 4. constructionJobsPerCapita: Construction sector employment per 1,000 people - from ILO, national statistics

const housingData = [
    // High-Income OECD Countries
    {
        country: "Switzerland",
        iso: "CHE",
        housingDeficitPerCapita: 1.2,
        householdDebtToGDP: 130.0,
        housingExpenditureToGDP: 0.3,
        constructionJobsPerCapita: 68.5
    },
    {
        country: "Australia",
        iso: "AUS",
        housingDeficitPerCapita: 4.2,
        householdDebtToGDP: 121.0,
        housingExpenditureToGDP: 0.4,
        constructionJobsPerCapita: 89.2
    },
    {
        country: "Denmark",
        iso: "DNK",
        housingDeficitPerCapita: 2.8,
        householdDebtToGDP: 117.0,
        housingExpenditureToGDP: 1.4,
        constructionJobsPerCapita: 72.3
    },
    {
        country: "Cyprus",
        iso: "CYP",
        housingDeficitPerCapita: 3.1,
        householdDebtToGDP: 110.0,
        housingExpenditureToGDP: 0.2,
        constructionJobsPerCapita: 95.8
    },
    {
        country: "Netherlands",
        iso: "NLD",
        housingDeficitPerCapita: 5.6,
        householdDebtToGDP: 104.0,
        housingExpenditureToGDP: 1.2,
        constructionJobsPerCapita: 65.4
    },
    {
        country: "Canada",
        iso: "CAN",
        housingDeficitPerCapita: 6.3,
        householdDebtToGDP: 104.0,
        housingExpenditureToGDP: 0.6,
        constructionJobsPerCapita: 78.9
    },
    {
        country: "South Korea",
        iso: "KOR",
        housingDeficitPerCapita: 5.8,
        householdDebtToGDP: 105.0,
        housingExpenditureToGDP: 0.7,
        constructionJobsPerCapita: 82.1
    },
    {
        country: "Norway",
        iso: "NOR",
        housingDeficitPerCapita: 2.4,
        householdDebtToGDP: 101.0,
        housingExpenditureToGDP: 0.8,
        constructionJobsPerCapita: 74.6
    },
    {
        country: "Sweden",
        iso: "SWE",
        housingDeficitPerCapita: 4.7,
        householdDebtToGDP: 89.0,
        housingExpenditureToGDP: 1.3,
        constructionJobsPerCapita: 70.2
    },
    {
        country: "New Zealand",
        iso: "NZL",
        housingDeficitPerCapita: 7.8,
        householdDebtToGDP: 92.8,
        housingExpenditureToGDP: 0.9,
        constructionJobsPerCapita: 92.7
    },
    {
        country: "Luxembourg",
        iso: "LUX",
        housingDeficitPerCapita: 4.2,
        householdDebtToGDP: 72.0,
        housingExpenditureToGDP: 0.5,
        constructionJobsPerCapita: 86.3
    },
    {
        country: "United Kingdom",
        iso: "GBR",
        housingDeficitPerCapita: 8.2,
        householdDebtToGDP: 84.0,
        housingExpenditureToGDP: 1.1,
        constructionJobsPerCapita: 63.8
    },
    {
        country: "Finland",
        iso: "FIN",
        housingDeficitPerCapita: 2.1,
        householdDebtToGDP: 69.0,
        housingExpenditureToGDP: 1.0,
        constructionJobsPerCapita: 71.5
    },
    {
        country: "United States",
        iso: "USA",
        housingDeficitPerCapita: 3.8,
        householdDebtToGDP: 76.0,
        housingExpenditureToGDP: 0.12,
        constructionJobsPerCapita: 58.4
    },
    {
        country: "Belgium",
        iso: "BEL",
        housingDeficitPerCapita: 2.9,
        householdDebtToGDP: 64.0,
        housingExpenditureToGDP: 0.7,
        constructionJobsPerCapita: 66.9
    },
    {
        country: "France",
        iso: "FRA",
        housingDeficitPerCapita: 2.7,
        householdDebtToGDP: 68.0,
        housingExpenditureToGDP: 1.8,
        constructionJobsPerCapita: 69.2
    },
    {
        country: "Japan",
        iso: "JPN",
        housingDeficitPerCapita: 1.1,
        householdDebtToGDP: 66.0,
        housingExpenditureToGDP: 0.4,
        constructionJobsPerCapita: 79.3
    },
    {
        country: "Spain",
        iso: "ESP",
        housingDeficitPerCapita: 2.4,
        householdDebtToGDP: 60.0,
        housingExpenditureToGDP: 0.3,
        constructionJobsPerCapita: 52.7
    },
    {
        country: "Portugal",
        iso: "PRT",
        housingDeficitPerCapita: 3.4,
        householdDebtToGDP: 67.0,
        housingExpenditureToGDP: 0.2,
        constructionJobsPerCapita: 54.1
    },
    {
        country: "Ireland",
        iso: "IRL",
        housingDeficitPerCapita: 9.1,
        householdDebtToGDP: 46.0,
        housingExpenditureToGDP: 1.4,
        constructionJobsPerCapita: 61.3
    },
    {
        country: "Austria",
        iso: "AUT",
        housingDeficitPerCapita: 2.2,
        householdDebtToGDP: 52.0,
        housingExpenditureToGDP: 1.3,
        constructionJobsPerCapita: 75.8
    },
    {
        country: "Germany",
        iso: "DEU",
        housingDeficitPerCapita: 3.1,
        householdDebtToGDP: 58.0,
        housingExpenditureToGDP: 0.9,
        constructionJobsPerCapita: 67.4
    },
    {
        country: "Estonia",
        iso: "EST",
        housingDeficitPerCapita: 3.6,
        householdDebtToGDP: 48.0,
        housingExpenditureToGDP: 0.3,
        constructionJobsPerCapita: 64.2
    },
    {
        country: "Slovenia",
        iso: "SVN",
        housingDeficitPerCapita: 2.8,
        householdDebtToGDP: 29.0,
        housingExpenditureToGDP: 0.5,
        constructionJobsPerCapita: 68.9
    },
    {
        country: "Italy",
        iso: "ITA",
        housingDeficitPerCapita: 2.3,
        householdDebtToGDP: 44.0,
        housingExpenditureToGDP: 0.4,
        constructionJobsPerCapita: 62.1
    },
    {
        country: "Israel",
        iso: "ISR",
        housingDeficitPerCapita: 7.6,
        householdDebtToGDP: 54.0,
        housingExpenditureToGDP: 0.6,
        constructionJobsPerCapita: 71.2
    },
    {
        country: "Czech Republic",
        iso: "CZE",
        housingDeficitPerCapita: 4.9,
        householdDebtToGDP: 35.0,
        housingExpenditureToGDP: 0.3,
        constructionJobsPerCapita: 73.6
    },
    {
        country: "Greece",
        iso: "GRC",
        housingDeficitPerCapita: 3.2,
        householdDebtToGDP: 58.0,
        housingExpenditureToGDP: 0.1,
        constructionJobsPerCapita: 38.5
    },
    {
        country: "Poland",
        iso: "POL",
        housingDeficitPerCapita: 7.2,
        householdDebtToGDP: 38.0,
        housingExpenditureToGDP: 0.2,
        constructionJobsPerCapita: 65.3
    },
    {
        country: "Slovakia",
        iso: "SVK",
        housingDeficitPerCapita: 5.1,
        householdDebtToGDP: 53.0,
        housingExpenditureToGDP: 0.4,
        constructionJobsPerCapita: 69.7
    },
    {
        country: "Chile",
        iso: "CHL",
        housingDeficitPerCapita: 7.4,
        householdDebtToGDP: 47.0,
        housingExpenditureToGDP: 0.6,
        constructionJobsPerCapita: 83.9
    },
    {
        country: "Hungary",
        iso: "HUN",
        housingDeficitPerCapita: 4.7,
        householdDebtToGDP: 21.0,
        housingExpenditureToGDP: 0.3,
        constructionJobsPerCapita: 59.8
    },
    {
        country: "Latvia",
        iso: "LVA",
        housingDeficitPerCapita: 4.3,
        householdDebtToGDP: 22.0,
        housingExpenditureToGDP: 0.2,
        constructionJobsPerCapita: 62.4
    },
    {
        country: "Lithuania",
        iso: "LTU",
        housingDeficitPerCapita: 3.9,
        householdDebtToGDP: 27.0,
        housingExpenditureToGDP: 0.2,
        constructionJobsPerCapita: 64.1
    },
    {
        country: "Turkey",
        iso: "TUR",
        housingDeficitPerCapita: 11.3,
        householdDebtToGDP: 18.0,
        housingExpenditureToGDP: 0.3,
        constructionJobsPerCapita: 47.6
    },
    {
        country: "Mexico",
        iso: "MEX",
        housingDeficitPerCapita: 13.7,
        householdDebtToGDP: 16.0,
        housingExpenditureToGDP: 0.2,
        constructionJobsPerCapita: 68.2
    },
    {
        country: "Costa Rica",
        iso: "CRI",
        housingDeficitPerCapita: 9.8,
        householdDebtToGDP: 21.0,
        housingExpenditureToGDP: 0.3,
        constructionJobsPerCapita: 59.3
    },
    {
        country: "Colombia",
        iso: "COL",
        housingDeficitPerCapita: 16.2,
        householdDebtToGDP: 19.0,
        housingExpenditureToGDP: 0.2,
        constructionJobsPerCapita: 52.8
    },
    {
        country: "Brazil",
        iso: "BRA",
        housingDeficitPerCapita: 18.9,
        householdDebtToGDP: 28.0,
        housingExpenditureToGDP: 0.1,
        constructionJobsPerCapita: 64.7
    },
    {
        country: "Russia",
        iso: "RUS",
        housingDeficitPerCapita: 8.7,
        householdDebtToGDP: 21.0,
        housingExpenditureToGDP: 0.2,
        constructionJobsPerCapita: 56.9
    },
    {
        country: "China",
        iso: "CHN",
        housingDeficitPerCapita: 11.2,
        householdDebtToGDP: 62.0,
        housingExpenditureToGDP: 0.8,
        constructionJobsPerCapita: 97.4
    },
    {
        country: "Thailand",
        iso: "THA",
        housingDeficitPerCapita: 10.8,
        householdDebtToGDP: 89.0,
        housingExpenditureToGDP: 0.2,
        constructionJobsPerCapita: 48.3
    },
    {
        country: "Malaysia",
        iso: "MYS",
        housingDeficitPerCapita: 9.2,
        householdDebtToGDP: 82.0,
        housingExpenditureToGDP: 0.3,
        constructionJobsPerCapita: 54.7
    },
    {
        country: "Singapore",
        iso: "SGP",
        housingDeficitPerCapita: 0.8,
        householdDebtToGDP: 75.0,
        housingExpenditureToGDP: 3.2,
        constructionJobsPerCapita: 121.5
    },
    {
        country: "Philippines",
        iso: "PHL",
        housingDeficitPerCapita: 24.7,
        householdDebtToGDP: 14.0,
        housingExpenditureToGDP: 0.1,
        constructionJobsPerCapita: 41.9
    },
    {
        country: "Vietnam",
        iso: "VNM",
        housingDeficitPerCapita: 19.6,
        householdDebtToGDP: 12.0,
        housingExpenditureToGDP: 0.2,
        constructionJobsPerCapita: 67.8
    },
    {
        country: "Indonesia",
        iso: "IDN",
        housingDeficitPerCapita: 26.8,
        householdDebtToGDP: 18.0,
        housingExpenditureToGDP: 0.1,
        constructionJobsPerCapita: 44.3
    },
    {
        country: "India",
        iso: "IND",
        housingDeficitPerCapita: 31.4,
        householdDebtToGDP: 15.0,
        housingExpenditureToGDP: 0.1,
        constructionJobsPerCapita: 89.7
    },
    {
        country: "Argentina",
        iso: "ARG",
        housingDeficitPerCapita: 14.8,
        householdDebtToGDP: 4.0,
        housingExpenditureToGDP: 0.1,
        constructionJobsPerCapita: 52.4
    },
    {
        country: "Pakistan",
        iso: "PAK",
        housingDeficitPerCapita: 29.3,
        householdDebtToGDP: 2.8,
        housingExpenditureToGDP: 0.05,
        constructionJobsPerCapita: 73.2
    },
    {
        country: "Bangladesh",
        iso: "BGD",
        housingDeficitPerCapita: 34.1,
        householdDebtToGDP: 4.2,
        housingExpenditureToGDP: 0.06,
        constructionJobsPerCapita: 68.9
    },
    {
        country: "United Arab Emirates",
        iso: "ARE",
        housingDeficitPerCapita: 5.4,
        householdDebtToGDP: 121.0,
        housingExpenditureToGDP: 0.4,
        constructionJobsPerCapita: 156.3
    },
    {
        country: "Saudi Arabia",
        iso: "SAU",
        housingDeficitPerCapita: 12.6,
        householdDebtToGDP: 16.0,
        housingExpenditureToGDP: 0.7,
        constructionJobsPerCapita: 98.2
    },
    {
        country: "Iceland",
        iso: "ISL",
        housingDeficitPerCapita: 3.7,
        householdDebtToGDP: 88.0,
        housingExpenditureToGDP: 0.8,
        constructionJobsPerCapita: 81.6
    },

    // African Countries - Enhanced CAHF Data
    {
        country: "South Africa",
        iso: "ZAF",
        housingDeficitPerCapita: 22.4,  // CAHF Yearbook 2024
        householdDebtToGDP: 39.0,
        housingExpenditureToGDP: 0.5,
        constructionJobsPerCapita: 36.8
    },
    {
        country: "Egypt",
        iso: "EGY",
        housingDeficitPerCapita: 19.7,  // CAHF data
        householdDebtToGDP: 5.0,
        housingExpenditureToGDP: 0.1,
        constructionJobsPerCapita: 52.1
    },
    {
        country: "Morocco",
        iso: "MAR",
        housingDeficitPerCapita: 17.3,  // CAHF Yearbook 2024
        householdDebtToGDP: 8.0,
        housingExpenditureToGDP: 0.2,
        constructionJobsPerCapita: 47.9
    },
    {
        country: "Kenya",
        iso: "KEN",
        housingDeficitPerCapita: 27.1,  // CAHF Yearbook 2024
        householdDebtToGDP: 6.0,
        housingExpenditureToGDP: 0.1,
        constructionJobsPerCapita: 28.4
    },
    {
        country: "Nigeria",
        iso: "NGA",
        housingDeficitPerCapita: 35.2,  // CAHF - severe deficit
        householdDebtToGDP: 1.2,
        housingExpenditureToGDP: 0.05,
        constructionJobsPerCapita: 18.7
    },
    {
        country: "Ghana",
        iso: "GHA",
        housingDeficitPerCapita: 29.8,  // CAHF Yearbook 2024
        householdDebtToGDP: 3.5,
        housingExpenditureToGDP: 0.1,
        constructionJobsPerCapita: 23.6
    },
    {
        country: "Ethiopia",
        iso: "ETH",
        housingDeficitPerCapita: 38.6,  // CAHF data
        householdDebtToGDP: 2.1,
        housingExpenditureToGDP: 0.08,
        constructionJobsPerCapita: 32.4
    },
    {
        country: "Tanzania",
        iso: "TZA",
        housingDeficitPerCapita: 33.4,  // CAHF Yearbook 2024
        householdDebtToGDP: 2.8,
        housingExpenditureToGDP: 0.09,
        constructionJobsPerCapita: 25.9
    },
    {
        country: "Uganda",
        iso: "UGA",
        housingDeficitPerCapita: 36.7,  // CAHF data
        householdDebtToGDP: 3.2,
        housingExpenditureToGDP: 0.07,
        constructionJobsPerCapita: 29.3
    },
    {
        country: "Rwanda",
        iso: "RWA",
        housingDeficitPerCapita: 31.8,  // CAHF Yearbook 2024
        householdDebtToGDP: 4.1,
        housingExpenditureToGDP: 0.15,
        constructionJobsPerCapita: 34.7
    },
    {
        country: "Zambia",
        iso: "ZMB",
        housingDeficitPerCapita: 34.2,  // CAHF data
        householdDebtToGDP: 3.8,
        housingExpenditureToGDP: 0.06,
        constructionJobsPerCapita: 21.8
    },
    {
        country: "Namibia",
        iso: "NAM",
        housingDeficitPerCapita: 24.6,  // CAHF Yearbook 2024
        householdDebtToGDP: 7.2,
        housingExpenditureToGDP: 0.18,
        constructionJobsPerCapita: 31.2
    },
    {
        country: "Botswana",
        iso: "BWA",
        housingDeficitPerCapita: 21.3,  // CAHF data
        householdDebtToGDP: 9.4,
        housingExpenditureToGDP: 0.22,
        constructionJobsPerCapita: 38.5
    },
    {
        country: "Senegal",
        iso: "SEN",
        housingDeficitPerCapita: 28.9,  // CAHF Yearbook 2024
        householdDebtToGDP: 4.6,
        housingExpenditureToGDP: 0.08,
        constructionJobsPerCapita: 26.1
    },
    {
        country: "Tunisia",
        iso: "TUN",
        housingDeficitPerCapita: 16.2,  // CAHF data
        householdDebtToGDP: 11.3,
        housingExpenditureToGDP: 0.25,
        constructionJobsPerCapita: 41.7
    },
    {
        country: "Cameroon",
        iso: "CMR",
        housingDeficitPerCapita: 32.5,  // CAHF Yearbook 2024
        householdDebtToGDP: 2.9,
        housingExpenditureToGDP: 0.05,
        constructionJobsPerCapita: 24.3
    },
    {
        country: "Ivory Coast",
        iso: "CIV",
        housingDeficitPerCapita: 30.7,  // CAHF data
        householdDebtToGDP: 3.4,
        housingExpenditureToGDP: 0.07,
        constructionJobsPerCapita: 27.8
    },
    {
        country: "Mozambique",
        iso: "MOZ",
        housingDeficitPerCapita: 37.1,  // CAHF Yearbook 2024
        householdDebtToGDP: 1.8,
        housingExpenditureToGDP: 0.04,
        constructionJobsPerCapita: 19.2
    },
    {
        country: "Angola",
        iso: "AGO",
        housingDeficitPerCapita: 33.6,  // CAHF data
        householdDebtToGDP: 2.3,
        housingExpenditureToGDP: 0.06,
        constructionJobsPerCapita: 28.9
    },
    {
        country: "Zimbabwe",
        iso: "ZWE",
        housingDeficitPerCapita: 35.4,  // CAHF Yearbook 2024
        householdDebtToGDP: 1.6,
        housingExpenditureToGDP: 0.03,
        constructionJobsPerCapita: 16.7
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
