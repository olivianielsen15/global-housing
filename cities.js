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

    // THAILAND
    {
        city: "Bangkok",
        country: "Thailand",
        iso: "THA",
        lat: 13.7563,
        lng: 100.5018,
        population: 10900,
        housingDeficit: 820000,
        informalSettlementsPercent: 38,
        averageRent: 420,
        density: 5300,
        slumPopulation: 4142,
        notes: "Informal settlements along canals (khlongs), rapid urbanization."
    },
    {
        city: "Chiang Mai",
        country: "Thailand",
        iso: "THA",
        lat: 18.7883,
        lng: 98.9853,
        population: 1200,
        housingDeficit: 65000,
        informalSettlementsPercent: 28,
        averageRent: 280,
        density: 2800,
        slumPopulation: 336,
        notes: "Northern cultural hub, lower housing pressure than Bangkok."
    },

    // VIETNAM
    {
        city: "Ho Chi Minh City",
        country: "Vietnam",
        iso: "VNM",
        lat: 10.8231,
        lng: 106.6297,
        population: 9077,
        housingDeficit: 720000,
        informalSettlementsPercent: 42,
        averageRent: 350,
        density: 4200,
        slumPopulation: 3812,
        notes: "Rapid economic growth, informal settlements in peri-urban areas."
    },
    {
        city: "Hanoi",
        country: "Vietnam",
        iso: "VNM",
        lat: 21.0285,
        lng: 105.8542,
        population: 8246,
        housingDeficit: 580000,
        informalSettlementsPercent: 36,
        averageRent: 320,
        density: 2400,
        slumPopulation: 2968,
        notes: "Capital city, traditional tube houses, modernization pressures."
    },

    // COLOMBIA
    {
        city: "Bogotá",
        country: "Colombia",
        iso: "COL",
        lat: 4.7110,
        lng: -74.0721,
        population: 11000,
        housingDeficit: 650000,
        informalSettlementsPercent: 32,
        averageRent: 380,
        density: 4300,
        slumPopulation: 3520,
        notes: "Vivienda de Interés Social programs, hillside informal settlements."
    },
    {
        city: "Medellín",
        country: "Colombia",
        iso: "COL",
        lat: 6.2476,
        lng: -75.5658,
        population: 4055,
        housingDeficit: 240000,
        informalSettlementsPercent: 28,
        averageRent: 320,
        density: 6800,
        slumPopulation: 1135,
        notes: "Metrocable system connecting hillside neighborhoods, urban innovation."
    },
    {
        city: "Cali",
        country: "Colombia",
        iso: "COL",
        lat: 3.4516,
        lng: -76.5320,
        population: 2258,
        housingDeficit: 145000,
        informalSettlementsPercent: 30,
        averageRent: 280,
        density: 5100,
        slumPopulation: 677,
        notes: "Third largest city, informal growth in eastern areas."
    },

    // ARGENTINA
    {
        city: "Buenos Aires",
        country: "Argentina",
        iso: "ARG",
        lat: -34.6037,
        lng: -58.3816,
        population: 15370,
        housingDeficit: 720000,
        informalSettlementsPercent: 24,
        averageRent: 420,
        density: 14500,
        slumPopulation: 3689,
        notes: "Villas miseria (slums), housing crisis despite middle-income status."
    },
    {
        city: "Córdoba",
        country: "Argentina",
        iso: "ARG",
        lat: -31.4201,
        lng: -64.1888,
        population: 1700,
        housingDeficit: 95000,
        informalSettlementsPercent: 22,
        averageRent: 320,
        density: 2800,
        slumPopulation: 374,
        notes: "Second largest city, industrial and educational center."
    },

    // PERU
    {
        city: "Lima",
        country: "Peru",
        iso: "PER",
        lat: -12.0464,
        lng: -77.0428,
        population: 10900,
        housingDeficit: 880000,
        informalSettlementsPercent: 48,
        averageRent: 350,
        density: 3400,
        slumPopulation: 5232,
        notes: "Pueblos jóvenes (young towns), earthquake-vulnerable adobe construction."
    },
    {
        city: "Arequipa",
        country: "Peru",
        iso: "PER",
        lat: -16.4090,
        lng: -71.5375,
        population: 1080,
        housingDeficit: 78000,
        informalSettlementsPercent: 42,
        averageRent: 280,
        density: 2100,
        slumPopulation: 454,
        notes: "Second largest city, volcanic stone colonial architecture."
    },

    // CHILE
    {
        city: "Santiago",
        country: "Chile",
        iso: "CHL",
        lat: -33.4489,
        lng: -70.6693,
        population: 7040,
        housingDeficit: 320000,
        informalSettlementsPercent: 18,
        averageRent: 520,
        density: 8500,
        slumPopulation: 1267,
        notes: "Campamentos (informal settlements), strong housing subsidy programs."
    },
    {
        city: "Valparaíso",
        country: "Chile",
        iso: "CHL",
        lat: -33.0472,
        lng: -71.6127,
        population: 935,
        housingDeficit: 52000,
        informalSettlementsPercent: 22,
        averageRent: 380,
        density: 2800,
        slumPopulation: 206,
        notes: "Port city, UNESCO heritage site, hillside housing challenges."
    },

    // TANZANIA
    {
        city: "Dar es Salaam",
        country: "Tanzania",
        iso: "TZA",
        lat: -6.7924,
        lng: 39.2083,
        population: 7047,
        housingDeficit: 920000,
        informalSettlementsPercent: 70,
        averageRent: 95,
        density: 3100,
        slumPopulation: 4933,
        notes: "Rapid urbanization, 70% informal settlements, former capital."
    },
    {
        city: "Mwanza",
        country: "Tanzania",
        iso: "TZA",
        lat: -2.5164,
        lng: 32.9175,
        population: 1120,
        housingDeficit: 145000,
        informalSettlementsPercent: 68,
        averageRent: 75,
        density: 2500,
        slumPopulation: 762,
        notes: "Lake Victoria port city, high informal housing rate."
    },

    // UGANDA
    {
        city: "Kampala",
        country: "Uganda",
        iso: "UGA",
        lat: 0.3476,
        lng: 32.5825,
        population: 3652,
        housingDeficit: 485000,
        informalSettlementsPercent: 62,
        averageRent: 85,
        density: 8000,
        slumPopulation: 2264,
        notes: "Rapid growth, wetland encroachment, Kisenyi informal settlement."
    },
    {
        city: "Gulu",
        country: "Uganda",
        iso: "UGA",
        lat: 2.7742,
        lng: 32.2992,
        population: 152,
        housingDeficit: 28000,
        informalSettlementsPercent: 58,
        averageRent: 65,
        density: 1800,
        slumPopulation: 88,
        notes: "Northern city recovering from conflict, housing reconstruction needs."
    },

    // GHANA
    {
        city: "Accra",
        country: "Ghana",
        iso: "GHA",
        lat: 5.6037,
        lng: -0.1870,
        population: 4657,
        housingDeficit: 520000,
        informalSettlementsPercent: 56,
        averageRent: 180,
        density: 4700,
        slumPopulation: 2608,
        notes: "Coastal flooding in informal areas, Old Fadama slum."
    },
    {
        city: "Kumasi",
        country: "Ghana",
        iso: "GHA",
        lat: 6.6885,
        lng: -1.6244,
        population: 3630,
        housingDeficit: 380000,
        informalSettlementsPercent: 52,
        averageRent: 140,
        density: 5500,
        slumPopulation: 1888,
        notes: "Second largest city, cultural capital of Ashanti region."
    },

    // SENEGAL
    {
        city: "Dakar",
        country: "Senegal",
        iso: "SEN",
        lat: 14.7167,
        lng: -17.4677,
        population: 3938,
        housingDeficit: 410000,
        informalSettlementsPercent: 54,
        averageRent: 220,
        density: 16300,
        slumPopulation: 2127,
        notes: "Peninsula constraints, Medina informal area, French colonial legacy."
    },
    {
        city: "Touba",
        country: "Senegal",
        iso: "SEN",
        lat: 14.8500,
        lng: -15.8833,
        population: 1053,
        housingDeficit: 115000,
        informalSettlementsPercent: 62,
        averageRent: 95,
        density: 2800,
        slumPopulation: 653,
        notes: "Holy city, rapid religious pilgrimage-driven growth."
    },

    // CAMEROON
    {
        city: "Douala",
        country: "Cameroon",
        iso: "CMR",
        lat: 4.0511,
        lng: 9.7679,
        population: 3663,
        housingDeficit: 480000,
        informalSettlementsPercent: 64,
        averageRent: 150,
        density: 7200,
        slumPopulation: 2344,
        notes: "Economic capital, port city, wetland informal settlements."
    },
    {
        city: "Yaoundé",
        country: "Cameroon",
        iso: "CMR",
        lat: 3.8480,
        lng: 11.5021,
        population: 4164,
        housingDeficit: 520000,
        informalSettlementsPercent: 60,
        averageRent: 165,
        density: 6100,
        slumPopulation: 2498,
        notes: "Political capital, hillside topography, informal hillside construction."
    },

    // IVORY COAST
    {
        city: "Abidjan",
        country: "Ivory Coast",
        iso: "CIV",
        lat: 5.3600,
        lng: -4.0083,
        population: 5515,
        housingDeficit: 720000,
        informalSettlementsPercent: 58,
        averageRent: 180,
        density: 3700,
        slumPopulation: 3199,
        notes: "Economic hub, lagoon city, Abobo informal area."
    },
    {
        city: "Bouaké",
        country: "Ivory Coast",
        iso: "CIV",
        lat: 7.6900,
        lng: -5.0300,
        population: 740,
        housingDeficit: 92000,
        informalSettlementsPercent: 55,
        averageRent: 120,
        density: 2400,
        slumPopulation: 407,
        notes: "Second largest city, post-conflict reconstruction."
    },

    // MOROCCO
    {
        city: "Casablanca",
        country: "Morocco",
        iso: "MAR",
        lat: 33.5731,
        lng: -7.5898,
        population: 3752,
        housingDeficit: 280000,
        informalSettlementsPercent: 32,
        averageRent: 320,
        density: 10100,
        slumPopulation: 1201,
        notes: "Economic capital, bidonvilles (tin cities) clearance program."
    },
    {
        city: "Rabat",
        country: "Morocco",
        iso: "MAR",
        lat: 34.0209,
        lng: -6.8416,
        population: 1932,
        housingDeficit: 120000,
        informalSettlementsPercent: 28,
        averageRent: 380,
        density: 3500,
        slumPopulation: 541,
        notes: "Capital city, planned development with less informality."
    },

    // ALGERIA
    {
        city: "Algiers",
        country: "Algeria",
        iso: "DZA",
        lat: 36.7538,
        lng: 3.0588,
        population: 3415,
        housingDeficit: 380000,
        informalSettlementsPercent: 38,
        averageRent: 280,
        density: 2900,
        slumPopulation: 1298,
        notes: "Capital, housing shortage despite oil wealth, Kasbah overcrowding."
    },

    // ANGOLA
    {
        city: "Luanda",
        country: "Angola",
        iso: "AGO",
        lat: -8.8383,
        lng: 13.2344,
        population: 8952,
        housingDeficit: 1450000,
        informalSettlementsPercent: 68,
        averageRent: 1800,
        density: 2500,
        slumPopulation: 6087,
        notes: "Musseques (slums), world's most expensive city paradox, oil boom inequality."
    },

    // TURKEY
    {
        city: "Istanbul",
        country: "Turkey",
        iso: "TUR",
        lat: 41.0082,
        lng: 28.9784,
        population: 15840,
        housingDeficit: 620000,
        informalSettlementsPercent: 28,
        averageRent: 520,
        density: 2900,
        slumPopulation: 4435,
        notes: "Gecekondu (built overnight) informal housing, earthquake vulnerability."
    },
    {
        city: "Ankara",
        country: "Turkey",
        iso: "TUR",
        lat: 39.9334,
        lng: 32.8597,
        population: 5700,
        housingDeficit: 280000,
        informalSettlementsPercent: 24,
        averageRent: 420,
        density: 2600,
        slumPopulation: 1368,
        notes: "Capital city, post-earthquake reconstruction focus."
    },

    // IRAN
    {
        city: "Tehran",
        country: "Iran",
        iso: "IRN",
        lat: 35.6892,
        lng: 51.3890,
        population: 9135,
        housingDeficit: 580000,
        informalSettlementsPercent: 32,
        averageRent: 420,
        density: 11800,
        slumPopulation: 2923,
        notes: "Pollution and housing crisis, southern informal settlements."
    },

    // IRAQ
    {
        city: "Baghdad",
        country: "Iraq",
        iso: "IRQ",
        lat: 33.3152,
        lng: 44.3661,
        population: 7665,
        housingDeficit: 1200000,
        informalSettlementsPercent: 52,
        averageRent: 380,
        density: 7700,
        slumPopulation: 3986,
        notes: "Post-conflict housing destruction, massive reconstruction needs."
    },

    // SAUDI ARABIA
    {
        city: "Riyadh",
        country: "Saudi Arabia",
        iso: "SAU",
        lat: 24.7136,
        lng: 46.6753,
        population: 7676,
        housingDeficit: 280000,
        informalSettlementsPercent: 8,
        averageRent: 1200,
        density: 1900,
        slumPopulation: 614,
        notes: "Rapid expansion, migrant worker housing issues, Vision 2030 development."
    },
    {
        city: "Jeddah",
        country: "Saudi Arabia",
        iso: "SAU",
        lat: 21.4858,
        lng: 39.1925,
        population: 4697,
        housingDeficit: 180000,
        informalSettlementsPercent: 12,
        averageRent: 980,
        density: 2100,
        slumPopulation: 564,
        notes: "Red Sea port, pilgrim gateway, informal migrant settlements."
    },

    // UAE
    {
        city: "Dubai",
        country: "United Arab Emirates",
        iso: "ARE",
        lat: 25.2048,
        lng: 55.2708,
        population: 3569,
        housingDeficit: 85000,
        informalSettlementsPercent: 2,
        averageRent: 1850,
        density: 880,
        slumPopulation: 71,
        notes: "Skyscrapers and labor camps contrast, migrant worker housing."
    },
    {
        city: "Abu Dhabi",
        country: "United Arab Emirates",
        iso: "ARE",
        lat: 24.4539,
        lng: 54.3773,
        population: 1483,
        housingDeficit: 42000,
        informalSettlementsPercent: 1.5,
        averageRent: 1650,
        density: 410,
        slumPopulation: 22,
        notes: "Capital city, planned development, strict building codes."
    },

    // ISRAEL
    {
        city: "Tel Aviv",
        country: "Israel",
        iso: "ISR",
        lat: 32.0853,
        lng: 34.7818,
        population: 4373,
        housingDeficit: 180000,
        informalSettlementsPercent: 2,
        averageRent: 1620,
        density: 8200,
        slumPopulation: 87,
        notes: "Severe affordability crisis, high-tech driven prices."
    },
    {
        city: "Jerusalem",
        country: "Israel",
        iso: "ISR",
        lat: 31.7683,
        lng: 35.2137,
        population: 975,
        housingDeficit: 58000,
        informalSettlementsPercent: 3,
        averageRent: 1420,
        density: 8600,
        slumPopulation: 29,
        notes: "Political tensions, East Jerusalem housing challenges."
    },

    // SOUTH KOREA
    {
        city: "Seoul",
        country: "South Korea",
        iso: "KOR",
        lat: 37.5665,
        lng: 126.9780,
        population: 9776,
        housingDeficit: 280000,
        informalSettlementsPercent: 1.2,
        averageRent: 820,
        density: 16400,
        slumPopulation: 117,
        notes: "Jeonse deposit system, extreme unaffordability, redevelopment projects."
    },
    {
        city: "Busan",
        country: "South Korea",
        iso: "KOR",
        lat: 35.1796,
        lng: 129.0756,
        population: 3391,
        housingDeficit: 95000,
        informalSettlementsPercent: 0.8,
        averageRent: 580,
        density: 4400,
        slumPopulation: 27,
        notes: "Port city, lower prices than Seoul, hillside housing."
    },

    // JAPAN
    {
        city: "Tokyo",
        country: "Japan",
        iso: "JPN",
        lat: 35.6762,
        lng: 139.6503,
        population: 37435,
        housingDeficit: 320000,
        informalSettlementsPercent: 0.3,
        averageRent: 1250,
        density: 6400,
        slumPopulation: 112,
        notes: "Dense compact living, capsule hotels, shrinking household size."
    },
    {
        city: "Osaka",
        country: "Japan",
        iso: "JPN",
        lat: 34.6937,
        lng: 135.5023,
        population: 19165,
        housingDeficit: 180000,
        informalSettlementsPercent: 0.2,
        averageRent: 820,
        density: 12000,
        slumPopulation: 38,
        notes: "Affordable than Tokyo, Kamagasaki day-laborer district."
    },

    // SINGAPORE
    {
        city: "Singapore",
        country: "Singapore",
        iso: "SGP",
        lat: 1.3521,
        lng: 103.8198,
        population: 5686,
        housingDeficit: 28000,
        informalSettlementsPercent: 0,
        averageRent: 2400,
        density: 8000,
        slumPopulation: 0,
        notes: "HDB public housing model, 80% home ownership, no informal settlements."
    },

    // MALAYSIA
    {
        city: "Kuala Lumpur",
        country: "Malaysia",
        iso: "MYS",
        lat: 3.1390,
        lng: 101.6869,
        population: 8285,
        housingDeficit: 320000,
        informalSettlementsPercent: 18,
        averageRent: 620,
        density: 7900,
        slumPopulation: 1491,
        notes: "Kampung (village) settlements within city, migrant worker housing."
    },
    {
        city: "Penang",
        country: "Malaysia",
        iso: "MYS",
        lat: 5.4164,
        lng: 100.3327,
        population: 708,
        housingDeficit: 48000,
        informalSettlementsPercent: 14,
        averageRent: 480,
        density: 2400,
        slumPopulation: 99,
        notes: "Island state, heritage zone gentrification pressures."
    },

    // FRANCE
    {
        city: "Paris",
        country: "France",
        iso: "FRA",
        lat: 48.8566,
        lng: 2.3522,
        population: 11027,
        housingDeficit: 420000,
        informalSettlementsPercent: 0.8,
        averageRent: 1850,
        density: 21000,
        slumPopulation: 88,
        notes: "Banlieues (suburbs) social housing estates, HLM public housing."
    },
    {
        city: "Marseille",
        country: "France",
        iso: "FRA",
        lat: 43.2965,
        lng: 5.3698,
        population: 1888,
        housingDeficit: 82000,
        informalSettlementsPercent: 1.2,
        averageRent: 980,
        density: 3600,
        slumPopulation: 23,
        notes: "Port city, immigrant communities, building collapse issues."
    },

    // GERMANY
    {
        city: "Berlin",
        country: "Germany",
        iso: "DEU",
        lat: 52.5200,
        lng: 13.4050,
        population: 3769,
        housingDeficit: 195000,
        informalSettlementsPercent: 0.2,
        averageRent: 1320,
        density: 4200,
        slumPopulation: 8,
        notes: "Rent cap (Mietendeckel) debates, gentrification, social housing shortage."
    },
    {
        city: "Munich",
        country: "Germany",
        iso: "DEU",
        lat: 48.1351,
        lng: 11.5820,
        population: 1565,
        housingDeficit: 95000,
        informalSettlementsPercent: 0.1,
        averageRent: 1680,
        density: 4700,
        slumPopulation: 2,
        notes: "Most expensive German city, tech hub, limited supply."
    },

    // ITALY
    {
        city: "Rome",
        country: "Italy",
        iso: "ITA",
        lat: 41.9028,
        lng: 12.4964,
        population: 4342,
        housingDeficit: 180000,
        informalSettlementsPercent: 1.5,
        averageRent: 1120,
        density: 2200,
        slumPopulation: 65,
        notes: "Historic center constraints, Roma camps, aging infrastructure."
    },
    {
        city: "Milan",
        country: "Italy",
        iso: "ITA",
        lat: 45.4642,
        lng: 9.1900,
        population: 3234,
        housingDeficit: 140000,
        informalSettlementsPercent: 0.8,
        averageRent: 1380,
        density: 7600,
        slumPopulation: 26,
        notes: "Fashion capital, high rents, limited affordable housing."
    },

    // SPAIN
    {
        city: "Madrid",
        country: "Spain",
        iso: "ESP",
        lat: 40.4168,
        lng: -3.7038,
        population: 6751,
        housingDeficit: 220000,
        informalSettlementsPercent: 1.2,
        averageRent: 1180,
        density: 5400,
        slumPopulation: 81,
        notes: "Post-2008 crisis recovery, Cañada Real informal settlement."
    },
    {
        city: "Barcelona",
        country: "Spain",
        iso: "ESP",
        lat: 41.3851,
        lng: 2.1734,
        population: 5575,
        housingDeficit: 185000,
        informalSettlementsPercent: 0.9,
        averageRent: 1320,
        density: 16000,
        slumPopulation: 50,
        notes: "Tourist pressure, rent controls, squatter movements (okupas)."
    },

    // POLAND
    {
        city: "Warsaw",
        country: "Poland",
        iso: "POL",
        lat: 52.2297,
        lng: 21.0122,
        population: 1863,
        housingDeficit: 95000,
        informalSettlementsPercent: 0.5,
        averageRent: 820,
        density: 3400,
        slumPopulation: 9,
        notes: "Rapid post-communist development, new construction boom."
    },
    {
        city: "Kraków",
        country: "Poland",
        iso: "POL",
        lat: 50.0647,
        lng: 19.9450,
        population: 780,
        housingDeficit: 42000,
        informalSettlementsPercent: 0.3,
        averageRent: 720,
        density: 2300,
        slumPopulation: 2,
        notes: "Historic city, UNESCO site, tourism-driven prices."
    },

    // RUSSIA
    {
        city: "Moscow",
        country: "Russia",
        iso: "RUS",
        lat: 55.7558,
        lng: 37.6173,
        population: 12640,
        housingDeficit: 380000,
        informalSettlementsPercent: 2,
        averageRent: 820,
        density: 5100,
        slumPopulation: 253,
        notes: "Renovation program for Soviet-era housing, high-rise dominance."
    },
    {
        city: "Saint Petersburg",
        country: "Russia",
        iso: "RUS",
        lat: 59.9311,
        lng: 30.3609,
        population: 5384,
        housingDeficit: 180000,
        informalSettlementsPercent: 1.5,
        averageRent: 620,
        density: 3800,
        slumPopulation: 81,
        notes: "Imperial architecture preservation, kommunalka shared apartments."
    },

    // AUSTRALIA
    {
        city: "Sydney",
        country: "Australia",
        iso: "AUS",
        lat: -33.8688,
        lng: 151.2093,
        population: 5367,
        housingDeficit: 185000,
        informalSettlementsPercent: 0.3,
        averageRent: 2420,
        density: 430,
        slumPopulation: 16,
        notes: "Extreme unaffordability, negative gearing policies, sprawl."
    },
    {
        city: "Melbourne",
        country: "Australia",
        iso: "AUS",
        lat: -37.8136,
        lng: 144.9631,
        population: 5078,
        housingDeficit: 168000,
        informalSettlementsPercent: 0.2,
        averageRent: 2180,
        density: 510,
        slumPopulation: 10,
        notes: "Livable city rankings, urban sprawl, apartment oversupply issues."
    },

    // CANADA
    {
        city: "Toronto",
        country: "Canada",
        iso: "CAN",
        lat: 43.6532,
        lng: -79.3832,
        population: 6313,
        housingDeficit: 240000,
        informalSettlementsPercent: 0.2,
        averageRent: 2150,
        density: 4300,
        slumPopulation: 13,
        notes: "Foreign investment speculation, condo boom, rental shortage."
    },
    {
        city: "Vancouver",
        country: "Canada",
        iso: "CAN",
        lat: 49.2827,
        lng: -123.1207,
        population: 2632,
        housingDeficit: 120000,
        informalSettlementsPercent: 0.3,
        averageRent: 2380,
        density: 5500,
        slumPopulation: 8,
        notes: "Empty homes tax, foreign buyer tax, extreme unaffordability."
    },
    {
        city: "Montreal",
        country: "Canada",
        iso: "CAN",
        lat: 45.5017,
        lng: -73.5673,
        population: 4291,
        housingDeficit: 145000,
        informalSettlementsPercent: 0.2,
        averageRent: 1420,
        density: 4700,
        slumPopulation: 9,
        notes: "More affordable than Toronto/Vancouver, French language protection."
    }
];
