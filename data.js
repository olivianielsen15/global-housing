// Global Housing Data
// Each country includes three metrics:
// 1. housingDeficitPerCapita: Housing units needed per 1,000 people
// 2. mortgageToGDP: Mortgage debt as percentage of GDP
// 3. housingExpenditureToGDP: Government housing expenditure as percentage of GDP

const housingData = [
    {
        country: "United States",
        lat: 37.0902,
        lng: -95.7129,
        housingDeficitPerCapita: 3.8,
        mortgageToGDP: 52.4,
        housingExpenditureToGDP: 0.4
    },
    {
        country: "Canada",
        lat: 56.1304,
        lng: -106.3468,
        housingDeficitPerCapita: 5.2,
        mortgageToGDP: 68.3,
        housingExpenditureToGDP: 0.6
    },
    {
        country: "United Kingdom",
        lat: 55.3781,
        lng: -3.4360,
        housingDeficitPerCapita: 7.1,
        mortgageToGDP: 63.7,
        housingExpenditureToGDP: 0.8
    },
    {
        country: "Germany",
        lat: 51.1657,
        lng: 10.4515,
        housingDeficitPerCapita: 2.3,
        mortgageToGDP: 45.2,
        housingExpenditureToGDP: 1.2
    },
    {
        country: "France",
        lat: 46.2276,
        lng: 2.2137,
        housingDeficitPerCapita: 3.1,
        mortgageToGDP: 48.9,
        housingExpenditureToGDP: 1.5
    },
    {
        country: "Spain",
        lat: 40.4637,
        lng: -3.7492,
        housingDeficitPerCapita: 2.8,
        mortgageToGDP: 54.1,
        housingExpenditureToGDP: 0.7
    },
    {
        country: "Italy",
        lat: 41.8719,
        lng: 12.5674,
        housingDeficitPerCapita: 2.1,
        mortgageToGDP: 26.8,
        housingExpenditureToGDP: 0.5
    },
    {
        country: "Netherlands",
        lat: 52.1326,
        lng: 5.2913,
        housingDeficitPerCapita: 6.8,
        mortgageToGDP: 96.4,
        housingExpenditureToGDP: 1.0
    },
    {
        country: "Sweden",
        lat: 60.1282,
        lng: 18.6435,
        housingDeficitPerCapita: 4.5,
        mortgageToGDP: 72.1,
        housingExpenditureToGDP: 1.8
    },
    {
        country: "Norway",
        lat: 60.4720,
        lng: 8.4689,
        housingDeficitPerCapita: 3.2,
        mortgageToGDP: 78.5,
        housingExpenditureToGDP: 0.9
    },
    {
        country: "Denmark",
        lat: 56.2639,
        lng: 9.5018,
        housingDeficitPerCapita: 3.9,
        mortgageToGDP: 101.3,
        housingExpenditureToGDP: 1.3
    },
    {
        country: "Finland",
        lat: 61.9241,
        lng: 25.7482,
        housingDeficitPerCapita: 2.7,
        mortgageToGDP: 58.6,
        housingExpenditureToGDP: 1.1
    },
    {
        country: "Poland",
        lat: 51.9194,
        lng: 19.1451,
        housingDeficitPerCapita: 8.3,
        mortgageToGDP: 23.4,
        housingExpenditureToGDP: 0.3
    },
    {
        country: "Czech Republic",
        lat: 49.8175,
        lng: 15.4730,
        housingDeficitPerCapita: 5.6,
        mortgageToGDP: 28.7,
        housingExpenditureToGDP: 0.4
    },
    {
        country: "Austria",
        lat: 47.5162,
        lng: 14.5501,
        housingDeficitPerCapita: 2.4,
        mortgageToGDP: 38.9,
        housingExpenditureToGDP: 1.0
    },
    {
        country: "Switzerland",
        lat: 46.8182,
        lng: 8.2275,
        housingDeficitPerCapita: 1.9,
        mortgageToGDP: 124.7,
        housingExpenditureToGDP: 0.5
    },
    {
        country: "Belgium",
        lat: 50.5039,
        lng: 4.4699,
        housingDeficitPerCapita: 3.3,
        mortgageToGDP: 56.2,
        housingExpenditureToGDP: 0.6
    },
    {
        country: "Portugal",
        lat: 39.3999,
        lng: -8.2245,
        housingDeficitPerCapita: 4.1,
        mortgageToGDP: 51.3,
        housingExpenditureToGDP: 0.4
    },
    {
        country: "Greece",
        lat: 39.0742,
        lng: 21.8243,
        housingDeficitPerCapita: 3.7,
        mortgageToGDP: 38.4,
        housingExpenditureToGDP: 0.2
    },
    {
        country: "Ireland",
        lat: 53.4129,
        lng: -8.2439,
        housingDeficitPerCapita: 9.4,
        mortgageToGDP: 44.6,
        housingExpenditureToGDP: 1.6
    },
    {
        country: "Australia",
        lat: -25.2744,
        lng: 133.7751,
        housingDeficitPerCapita: 4.7,
        mortgageToGDP: 89.3,
        housingExpenditureToGDP: 0.7
    },
    {
        country: "New Zealand",
        lat: -40.9006,
        lng: 174.8860,
        housingDeficitPerCapita: 8.1,
        mortgageToGDP: 92.8,
        housingExpenditureToGDP: 0.9
    },
    {
        country: "Japan",
        lat: 36.2048,
        lng: 138.2529,
        housingDeficitPerCapita: 1.2,
        mortgageToGDP: 37.2,
        housingExpenditureToGDP: 0.3
    },
    {
        country: "South Korea",
        lat: 35.9078,
        lng: 127.7669,
        housingDeficitPerCapita: 6.2,
        mortgageToGDP: 42.8,
        housingExpenditureToGDP: 0.5
    },
    {
        country: "China",
        lat: 35.8617,
        lng: 104.1954,
        housingDeficitPerCapita: 12.3,
        mortgageToGDP: 31.5,
        housingExpenditureToGDP: 1.4
    },
    {
        country: "India",
        lat: 20.5937,
        lng: 78.9629,
        housingDeficitPerCapita: 28.5,
        mortgageToGDP: 10.2,
        housingExpenditureToGDP: 0.2
    },
    {
        country: "Brazil",
        lat: -14.2350,
        lng: -51.9253,
        housingDeficitPerCapita: 15.7,
        mortgageToGDP: 8.9,
        housingExpenditureToGDP: 0.1
    },
    {
        country: "Mexico",
        lat: 23.6345,
        lng: -102.5528,
        housingDeficitPerCapita: 11.2,
        mortgageToGDP: 11.4,
        housingExpenditureToGDP: 0.3
    },
    {
        country: "Argentina",
        lat: -38.4161,
        lng: -63.6167,
        housingDeficitPerCapita: 13.8,
        mortgageToGDP: 2.1,
        housingExpenditureToGDP: 0.1
    },
    {
        country: "Chile",
        lat: -35.6751,
        lng: -71.5430,
        housingDeficitPerCapita: 7.9,
        mortgageToGDP: 28.3,
        housingExpenditureToGDP: 0.8
    },
    {
        country: "Colombia",
        lat: 4.5709,
        lng: -74.2973,
        housingDeficitPerCapita: 16.4,
        mortgageToGDP: 7.6,
        housingExpenditureToGDP: 0.2
    },
    {
        country: "South Africa",
        lat: -30.5595,
        lng: 22.9375,
        housingDeficitPerCapita: 21.3,
        mortgageToGDP: 29.7,
        housingExpenditureToGDP: 0.4
    },
    {
        country: "Egypt",
        lat: 26.8206,
        lng: 30.8025,
        housingDeficitPerCapita: 18.2,
        mortgageToGDP: 2.8,
        housingExpenditureToGDP: 0.1
    },
    {
        country: "Nigeria",
        lat: 9.0820,
        lng: 8.6753,
        housingDeficitPerCapita: 32.7,
        mortgageToGDP: 0.6,
        housingExpenditureToGDP: 0.05
    },
    {
        country: "Kenya",
        lat: -0.0236,
        lng: 37.9062,
        housingDeficitPerCapita: 24.8,
        mortgageToGDP: 3.2,
        housingExpenditureToGDP: 0.1
    },
    {
        country: "Turkey",
        lat: 38.9637,
        lng: 35.2433,
        housingDeficitPerCapita: 9.6,
        mortgageToGDP: 14.7,
        housingExpenditureToGDP: 0.3
    },
    {
        country: "Russia",
        lat: 61.5240,
        lng: 105.3188,
        housingDeficitPerCapita: 10.4,
        mortgageToGDP: 7.8,
        housingExpenditureToGDP: 0.2
    },
    {
        country: "Saudi Arabia",
        lat: 23.8859,
        lng: 45.0792,
        housingDeficitPerCapita: 14.1,
        mortgageToGDP: 5.4,
        housingExpenditureToGDP: 0.6
    },
    {
        country: "UAE",
        lat: 23.4241,
        lng: 53.8478,
        housingDeficitPerCapita: 6.3,
        mortgageToGDP: 15.2,
        housingExpenditureToGDP: 0.4
    },
    {
        country: "Singapore",
        lat: 1.3521,
        lng: 103.8198,
        housingDeficitPerCapita: 1.1,
        mortgageToGDP: 45.6,
        housingExpenditureToGDP: 2.3
    },
    {
        country: "Malaysia",
        lat: 4.2105,
        lng: 101.9758,
        housingDeficitPerCapita: 8.7,
        mortgageToGDP: 33.4,
        housingExpenditureToGDP: 0.3
    },
    {
        country: "Thailand",
        lat: 15.8700,
        lng: 100.9925,
        housingDeficitPerCapita: 11.5,
        mortgageToGDP: 19.8,
        housingExpenditureToGDP: 0.2
    },
    {
        country: "Vietnam",
        lat: 14.0583,
        lng: 108.2772,
        housingDeficitPerCapita: 19.3,
        mortgageToGDP: 8.4,
        housingExpenditureToGDP: 0.3
    },
    {
        country: "Philippines",
        lat: 12.8797,
        lng: 121.7740,
        housingDeficitPerCapita: 22.6,
        mortgageToGDP: 9.1,
        housingExpenditureToGDP: 0.2
    },
    {
        country: "Indonesia",
        lat: -0.7893,
        lng: 113.9213,
        housingDeficitPerCapita: 25.4,
        mortgageToGDP: 3.2,
        housingExpenditureToGDP: 0.1
    },
    {
        country: "Pakistan",
        lat: 30.3753,
        lng: 69.3451,
        housingDeficitPerCapita: 26.9,
        mortgageToGDP: 0.3,
        housingExpenditureToGDP: 0.05
    },
    {
        country: "Bangladesh",
        lat: 23.6850,
        lng: 90.3563,
        housingDeficitPerCapita: 31.2,
        mortgageToGDP: 1.8,
        housingExpenditureToGDP: 0.08
    },
    {
        country: "Israel",
        lat: 31.0461,
        lng: 34.8516,
        housingDeficitPerCapita: 8.9,
        mortgageToGDP: 37.6,
        housingExpenditureToGDP: 0.5
    }
];
