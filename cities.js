// City-Level Housing Data
// Compiled from UN-Habitat City-Level SDG 11.1.1 Data, World Bank Urban Development,
// Africapolis, national census data, and municipal statistics (2023-2024)
//
// Each city includes:
// - lat, lng: Geographic coordinates
// - population: Metropolitan area population (thousands)
// - housingDeficit: Estimated housing units shortage (absolute numbers)
// - informalSettlementsPercent: % of population in slums/informal settlements
// - averageRent: Monthly rent in local currency (converted to USD for comparison)
// - density: People per sq km in urban core
// - slumPopulation: Absolute population in informal settlements (thousands)

const cityData = [
    // KENYA
    {
        city: "Nairobi",
        country: "Kenya",
        iso: "KEN",
        lat: -1.286389,
        lng: 36.817223,
        population: 4397,
        housingDeficit: 250000,
        informalSettlementsPercent: 60,
        averageRent: 120,
        density: 4850,
        slumPopulation: 2638,
        notes: "Major slums: Kibera, Mathare, Mukuru. UN-Habitat key focus city."
    },
    {
        city: "Mombasa",
        country: "Kenya",
        iso: "KEN",
        lat: -4.043477,
        lng: 39.668206,
        population: 1208,
        housingDeficit: 68000,
        informalSettlementsPercent: 55,
        averageRent: 90,
        density: 3800,
        slumPopulation: 664,
        notes: "Coastal city, port economy, high informal housing."
    },
    {
        city: "Kisumu",
        country: "Kenya",
        iso: "KEN",
        lat: -0.091702,
        lng: 34.767956,
        population: 610,
        housingDeficit: 35000,
        informalSettlementsPercent: 52,
        averageRent: 75,
        density: 3200,
        slumPopulation: 317,
        notes: "Lake Victoria port city, third largest in Kenya."
    },

    // NIGERIA
    {
        city: "Lagos",
        country: "Nigeria",
        iso: "NGA",
        lat: 6.5244,
        lng: 3.3792,
        population: 15388,
        housingDeficit: 2500000,
        informalSettlementsPercent: 65,
        averageRent: 180,
        density: 7940,
        slumPopulation: 10002,
        notes: "Africa's largest city, massive housing deficit. Makoko floating slum."
    },
    {
        city: "Kano",
        country: "Nigeria",
        iso: "NGA",
        lat: 12.0022,
        lng: 8.5920,
        population: 4103,
        housingDeficit: 680000,
        informalSettlementsPercent: 58,
        averageRent: 95,
        density: 5200,
        slumPopulation: 2380,
        notes: "Northern Nigeria's largest city, rapid urbanization."
    },
    {
        city: "Abuja",
        country: "Nigeria",
        iso: "NGA",
        lat: 9.0765,
        lng: 7.3986,
        population: 3278,
        housingDeficit: 420000,
        informalSettlementsPercent: 42,
        averageRent: 250,
        density: 3100,
        slumPopulation: 1377,
        notes: "Capital city, planned development but informal growth persists."
    },

    // INDIA
    {
        city: "Mumbai",
        country: "India",
        iso: "IND",
        lat: 19.0760,
        lng: 72.8777,
        population: 20411,
        housingDeficit: 1800000,
        informalSettlementsPercent: 55,
        averageRent: 420,
        density: 31700,
        slumPopulation: 11226,
        notes: "Dharavi - Asia's largest slum. Extreme density and housing costs."
    },
    {
        city: "Delhi",
        country: "India",
        iso: "IND",
        lat: 28.7041,
        lng: 77.1025,
        population: 31870,
        housingDeficit: 2200000,
        informalSettlementsPercent: 49,
        averageRent: 380,
        density: 11320,
        slumPopulation: 15617,
        notes: "National capital region, massive population, severe air quality issues."
    },
    {
        city: "Kolkata",
        country: "India",
        iso: "IND",
        lat: 22.5726,
        lng: 88.3639,
        population: 14850,
        housingDeficit: 950000,
        informalSettlementsPercent: 58,
        averageRent: 280,
        density: 24760,
        slumPopulation: 8613,
        notes: "High-density city with extensive informal settlements."
    },
    {
        city: "Bangalore",
        country: "India",
        iso: "IND",
        lat: 12.9716,
        lng: 77.5946,
        population: 12765,
        housingDeficit: 720000,
        informalSettlementsPercent: 35,
        averageRent: 450,
        density: 13392,
        slumPopulation: 4468,
        notes: "Tech hub, rapidly growing with gentrification pressures."
    },

    // BANGLADESH
    {
        city: "Dhaka",
        country: "Bangladesh",
        iso: "BGD",
        lat: 23.8103,
        lng: 90.4125,
        population: 22478,
        housingDeficit: 3100000,
        informalSettlementsPercent: 62,
        averageRent: 95,
        density: 36000,
        slumPopulation: 13936,
        notes: "World's most densely populated megacity. Severe overcrowding."
    },
    {
        city: "Chittagong",
        country: "Bangladesh",
        iso: "BGD",
        lat: 22.3569,
        lng: 91.7832,
        population: 5214,
        housingDeficit: 680000,
        informalSettlementsPercent: 58,
        averageRent: 75,
        density: 28500,
        slumPopulation: 3024,
        notes: "Major port city, high informal settlement rate."
    },

    // PAKISTAN
    {
        city: "Karachi",
        country: "Pakistan",
        iso: "PAK",
        lat: 24.8607,
        lng: 67.0011,
        population: 16840,
        housingDeficit: 2400000,
        informalSettlementsPercent: 54,
        averageRent: 110,
        density: 24000,
        slumPopulation: 9094,
        notes: "Pakistan's largest city, rapid growth, inadequate infrastructure."
    },
    {
        city: "Lahore",
        country: "Pakistan",
        iso: "PAK",
        lat: 31.5497,
        lng: 74.3436,
        population: 12642,
        housingDeficit: 1500000,
        informalSettlementsPercent: 46,
        averageRent: 95,
        density: 19500,
        slumPopulation: 5815,
        notes: "Cultural capital, significant housing deficit."
    },
    {
        city: "Islamabad",
        country: "Pakistan",
        iso: "PAK",
        lat: 33.6844,
        lng: 73.0479,
        population: 1095,
        housingDeficit: 85000,
        informalSettlementsPercent: 28,
        averageRent: 180,
        density: 1200,
        slumPopulation: 307,
        notes: "Capital city, planned development, lower informality."
    },

    // PHILIPPINES
    {
        city: "Manila",
        country: "Philippines",
        iso: "PHL",
        lat: 14.5995,
        lng: 120.9842,
        population: 13923,
        housingDeficit: 1800000,
        informalSettlementsPercent: 53,
        averageRent: 240,
        density: 19000,
        slumPopulation: 7379,
        notes: "Metro Manila housing crisis, informal settlements in danger zones."
    },
    {
        city: "Cebu City",
        country: "Philippines",
        iso: "PHL",
        lat: 10.3157,
        lng: 123.8854,
        population: 980,
        housingDeficit: 120000,
        informalSettlementsPercent: 48,
        averageRent: 180,
        density: 14200,
        slumPopulation: 470,
        notes: "Second major economic hub, tourism and port city."
    },
    {
        city: "Davao City",
        country: "Philippines",
        iso: "PHL",
        lat: 7.1907,
        lng: 125.4553,
        population: 1776,
        housingDeficit: 185000,
        informalSettlementsPercent: 42,
        averageRent: 150,
        density: 680,
        slumPopulation: 746,
        notes: "Mindanao's largest city, rapid growth."
    },

    // INDONESIA
    {
        city: "Jakarta",
        country: "Indonesia",
        iso: "IDN",
        lat: -6.2088,
        lng: 106.8456,
        population: 10915,
        housingDeficit: 1400000,
        informalSettlementsPercent: 51,
        averageRent: 320,
        density: 15900,
        slumPopulation: 5567,
        notes: "Sinking city, severe flooding, informal riverside settlements."
    },
    {
        city: "Surabaya",
        country: "Indonesia",
        iso: "IDN",
        lat: -7.2575,
        lng: 112.7521,
        population: 2874,
        housingDeficit: 340000,
        informalSettlementsPercent: 46,
        averageRent: 210,
        density: 8500,
        slumPopulation: 1322,
        notes: "Second largest city, port and industrial center."
    },
    {
        city: "Bandung",
        country: "Indonesia",
        iso: "IDN",
        lat: -6.9175,
        lng: 107.6191,
        population: 2575,
        housingDeficit: 295000,
        informalSettlementsPercent: 42,
        averageRent: 190,
        density: 14200,
        slumPopulation: 1082,
        notes: "Highland city, creative economy hub."
    },

    // CHINA
    {
        city: "Beijing",
        country: "China",
        iso: "CHN",
        lat: 39.9042,
        lng: 116.4074,
        population: 21540,
        housingDeficit: 420000,
        informalSettlementsPercent: 15,
        averageRent: 950,
        density: 1300,
        slumPopulation: 3231,
        notes: "Capital, massive construction but affordability crisis."
    },
    {
        city: "Shanghai",
        country: "China",
        iso: "CHN",
        lat: 31.2304,
        lng: 121.4737,
        population: 27058,
        housingDeficit: 520000,
        informalSettlementsPercent: 12,
        averageRent: 1050,
        density: 3800,
        slumPopulation: 3247,
        notes: "Financial hub, high prices, migrant worker housing issues."
    },
    {
        city: "Shenzhen",
        country: "China",
        iso: "CHN",
        lat: 22.5431,
        lng: 114.0579,
        population: 17560,
        housingDeficit: 680000,
        informalSettlementsPercent: 18,
        averageRent: 880,
        density: 8800,
        slumPopulation: 3161,
        notes: "Tech manufacturing hub, 'urban villages' informal housing."
    },

    // BRAZIL
    {
        city: "São Paulo",
        country: "Brazil",
        iso: "BRA",
        lat: -23.5505,
        lng: -46.6333,
        population: 22043,
        housingDeficit: 1800000,
        informalSettlementsPercent: 32,
        averageRent: 380,
        density: 7900,
        slumPopulation: 7054,
        notes: "Favelas and cortiços, largest city in South America."
    },
    {
        city: "Rio de Janeiro",
        country: "Brazil",
        iso: "BRA",
        lat: -22.9068,
        lng: -43.1729,
        population: 6748,
        housingDeficit: 620000,
        informalSettlementsPercent: 38,
        averageRent: 420,
        density: 5598,
        slumPopulation: 2564,
        notes: "Iconic favelas on hillsides, housing inequality."
    },
    {
        city: "Brasília",
        country: "Brazil",
        iso: "BRA",
        lat: -15.8267,
        lng: -47.9218,
        population: 3055,
        housingDeficit: 185000,
        informalSettlementsPercent: 22,
        averageRent: 450,
        density: 560,
        slumPopulation: 672,
        notes: "Planned capital, satellite city informal growth."
    },

    // MEXICO
    {
        city: "Mexico City",
        country: "Mexico",
        iso: "MEX",
        lat: 19.4326,
        lng: -99.1332,
        population: 21918,
        housingDeficit: 980000,
        informalSettlementsPercent: 28,
        averageRent: 420,
        density: 6000,
        slumPopulation: 6137,
        notes: "Massive metropolitan area, peripheral informal settlements."
    },
    {
        city: "Guadalajara",
        country: "Mexico",
        iso: "MEX",
        lat: 20.6597,
        lng: -103.3496,
        population: 5268,
        housingDeficit: 285000,
        informalSettlementsPercent: 24,
        averageRent: 320,
        density: 2700,
        slumPopulation: 1264,
        notes: "Second largest metropolitan area, tech industry."
    },
    {
        city: "Monterrey",
        country: "Mexico",
        iso: "MEX",
        lat: 25.6866,
        lng: -100.3161,
        population: 5341,
        housingDeficit: 240000,
        informalSettlementsPercent: 19,
        averageRent: 380,
        density: 2400,
        slumPopulation: 1015,
        notes: "Industrial powerhouse, lower informality than other major cities."
    },

    // SOUTH AFRICA
    {
        city: "Johannesburg",
        country: "South Africa",
        iso: "ZAF",
        lat: -26.2041,
        lng: 28.0473,
        population: 5783,
        housingDeficit: 650000,
        informalSettlementsPercent: 34,
        averageRent: 380,
        density: 2900,
        slumPopulation: 1966,
        notes: "Economic hub, apartheid legacy informal townships."
    },
    {
        city: "Cape Town",
        country: "South Africa",
        iso: "ZAF",
        lat: -33.9249,
        lng: 18.4241,
        population: 4618,
        housingDeficit: 420000,
        informalSettlementsPercent: 29,
        averageRent: 450,
        density: 1900,
        slumPopulation: 1339,
        notes: "Legislative capital, housing backlog, spatial inequality."
    },
    {
        city: "Durban",
        country: "South Africa",
        iso: "ZAF",
        lat: -29.8587,
        lng: 31.0218,
        population: 3930,
        housingDeficit: 380000,
        informalSettlementsPercent: 32,
        averageRent: 320,
        density: 2500,
        slumPopulation: 1258,
        notes: "Port city, informal settlements in peri-urban areas."
    },

    // EGYPT
    {
        city: "Cairo",
        country: "Egypt",
        iso: "EGY",
        lat: 30.0444,
        lng: 31.2357,
        population: 21323,
        housingDeficit: 1850000,
        informalSettlementsPercent: 62,
        averageRent: 180,
        density: 19800,
        slumPopulation: 13220,
        notes: "Massive informal areas (ashwa'iyat), new capital being built."
    },
    {
        city: "Alexandria",
        country: "Egypt",
        iso: "EGY",
        lat: 31.2001,
        lng: 29.9187,
        population: 5280,
        housingDeficit: 420000,
        informalSettlementsPercent: 48,
        averageRent: 150,
        density: 9800,
        slumPopulation: 2534,
        notes: "Mediterranean port, informal growth in periphery."
    },

    // ETHIOPIA
    {
        city: "Addis Ababa",
        country: "Ethiopia",
        iso: "ETH",
        lat: 9.0320,
        lng: 38.7469,
        population: 5005,
        housingDeficit: 980000,
        informalSettlementsPercent: 79,
        averageRent: 95,
        density: 5600,
        slumPopulation: 3954,
        notes: "African Union HQ, massive condominium program, still huge deficit."
    },
    {
        city: "Dire Dawa",
        country: "Ethiopia",
        iso: "ETH",
        lat: 9.5930,
        lng: 41.8661,
        population: 493,
        housingDeficit: 85000,
        informalSettlementsPercent: 72,
        averageRent: 65,
        density: 3800,
        slumPopulation: 355,
        notes: "Second largest city, high informal housing rate."
    },

    // UNITED STATES (for comparison)
    {
        city: "Los Angeles",
        country: "United States",
        iso: "USA",
        lat: 34.0522,
        lng: -118.2437,
        population: 13200,
        housingDeficit: 520000,
        informalSettlementsPercent: 1.2,
        averageRent: 2450,
        density: 3200,
        slumPopulation: 158,
        notes: "Massive homelessness crisis (69k), NIMBY zoning restrictions."
    },
    {
        city: "New York City",
        country: "United States",
        iso: "USA",
        lat: 40.7128,
        lng: -74.0060,
        population: 8336,
        housingDeficit: 380000,
        informalSettlementsPercent: 0.8,
        averageRent: 3200,
        density: 10900,
        slumPopulation: 67,
        notes: "Affordability crisis, rent control debates, high cost burden."
    },
    {
        city: "San Francisco",
        country: "United States",
        iso: "USA",
        lat: 37.7749,
        lng: -122.4194,
        population: 881,
        housingDeficit: 45000,
        informalSettlementsPercent: 0.9,
        averageRent: 3100,
        density: 7200,
        slumPopulation: 8,
        notes: "Tech-driven housing crisis, extreme unaffordability, homelessness."
    },

    // UK
    {
        city: "London",
        country: "United Kingdom",
        iso: "GBR",
        lat: 51.5074,
        lng: -0.1278,
        population: 9648,
        housingDeficit: 320000,
        informalSettlementsPercent: 0.3,
        averageRent: 2100,
        density: 5700,
        slumPopulation: 29,
        notes: "Severe affordability crisis, Help to Buy scheme, social housing waiting lists."
    },
    {
        city: "Manchester",
        country: "United Kingdom",
        iso: "GBR",
        lat: 53.4808,
        lng: -2.2426,
        population: 2770,
        housingDeficit: 62000,
        informalSettlementsPercent: 0.2,
        averageRent: 1250,
        density: 4700,
        slumPopulation: 6,
        notes: "Northern Powerhouse investment, regeneration projects."
    },

    // Add more cities as needed for other countries...
];
