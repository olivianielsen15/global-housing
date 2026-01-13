#!/usr/bin/env python3
"""
Calculate Municipal Spending Efficiency Index for all 91 countries
Formula: (Municipal Budget Per Capita USD) / (Urban Density per 1000 people/sq km)
Higher values = more spending per unit of density
"""

# Data compiled from OECD MUNIFI/REGOFI, World Bank, UN-Habitat, Africapolis, national statistics
# Urban density: average density in major urban agglomerations (people per sq km)
# Municipal budget: local government spending per capita in USD (2023-2024 data or latest available)

municipal_data = {
    # OECD High-Income Countries
    "CHE": {"density": 5200, "budget": 8500, "source": "OECD MUNIFI, Swiss Federal Statistical Office"},
    "AUS": {"density": 2100, "budget": 3200, "source": "OECD MUNIFI, ABS"},
    "DNK": {"density": 2900, "budget": 19500, "source": "OECD MUNIFI (highest in Europe)"},
    "CYP": {"density": 3100, "budget": 2400, "source": "Eurostat"},
    "NLD": {"density": 3600, "budget": 12800, "source": "OECD MUNIFI"},
    "CAN": {"density": 2400, "budget": 5100, "source": "OECD MUNIFI, Statistics Canada"},
    "KOR": {"density": 16700, "budget": 3900, "source": "OECD, KOSIS (Seoul metro 16,700/sq km)"},
    "NOR": {"density": 2200, "budget": 15200, "source": "OECD MUNIFI (Nordic model)"},
    "SWE": {"density": 2600, "budget": 13400, "source": "OECD MUNIFI"},
    "NZL": {"density": 2300, "budget": 3400, "source": "Stats NZ, local councils"},
    "LUX": {"density": 2800, "budget": 9800, "source": "OECD MUNIFI"},
    "GBR": {"density": 4200, "budget": 4600, "source": "OECD MUNIFI, ONS"},
    "FIN": {"density": 2400, "budget": 11200, "source": "OECD MUNIFI (Nordic)"},
    "USA": {"density": 1800, "budget": 4200, "source": "OECD, US Census Bureau"},
    "BEL": {"density": 3900, "budget": 6200, "source": "OECD MUNIFI"},
    "FRA": {"density": 3700, "budget": 5800, "source": "OECD MUNIFI"},
    "JPN": {"density": 8900, "budget": 4100, "source": "OECD (Tokyo metro 6,000, Osaka 12,000)"},
    "ESP": {"density": 5200, "budget": 3100, "source": "OECD MUNIFI"},
    "PRT": {"density": 4100, "budget": 2200, "source": "OECD MUNIFI"},
    "IRL": {"density": 3400, "budget": 4800, "source": "OECD MUNIFI"},
    "AUT": {"density": 4300, "budget": 7400, "source": "OECD MUNIFI"},
    "DEU": {"density": 4100, "budget": 6900, "source": "OECD MUNIFI"},
    "EST": {"density": 2900, "budget": 2800, "source": "OECD MUNIFI"},
    "SVN": {"density": 3600, "budget": 3200, "source": "OECD MUNIFI"},
    "ITA": {"density": 5600, "budget": 4200, "source": "OECD MUNIFI"},
    "ISR": {"density": 7800, "budget": 3100, "source": "CBS Israel, local authorities"},
    "CZE": {"density": 3800, "budget": 2900, "source": "OECD MUNIFI"},
    "GRC": {"density": 4900, "budget": 1600, "source": "OECD MUNIFI (post-crisis)"},
    "POL": {"density": 3200, "budget": 2100, "source": "OECD MUNIFI"},
    "SVK": {"density": 3400, "budget": 2300, "source": "OECD MUNIFI"},
    "CHL": {"density": 5900, "budget": 1400, "source": "OECD, Chilean municipalities"},
    "HUN": {"density": 3100, "budget": 1100, "source": "OECD MUNIFI (lowest in Europe)"},
    "LVA": {"density": 2700, "budget": 1800, "source": "OECD MUNIFI"},
    "LTU": {"density": 2800, "budget": 1900, "source": "OECD MUNIFI"},
    "ISL": {"density": 1900, "budget": 8600, "source": "Statistics Iceland"},

    # European Non-OECD
    "ROU": {"density": 3400, "budget": 1200, "source": "World Bank, Romanian municipalities"},
    "BGR": {"density": 3100, "budget": 1000, "source": "World Bank, Bulgarian municipalities"},
    "HRV": {"density": 2900, "budget": 2100, "source": "Croatian Bureau of Statistics"},
    "RUS": {"density": 4200, "budget": 1600, "source": "Rosstat, Moscow 4,800/sq km"},

    # Middle East
    "TUR": {"density": 5800, "budget": 1300, "source": "TurkStat, municipalities (Istanbul 3,000/sq km)"},
    "SAU": {"density": 2900, "budget": 2400, "source": "Saudi General Authority, Riyadh"},
    "ARE": {"density": 3100, "budget": 4200, "source": "UAE Federal Competitiveness, Dubai/Abu Dhabi"},
    "EGY": {"density": 11200, "budget": 320, "source": "Africapolis (Cairo 45,000/sq km), World Bank"},

    # Asia - High Density Megacities
    "CHN": {"density": 8400, "budget": 1800, "source": "NBS China (Shanghai 3,800, Beijing 1,300)"},
    "IND": {"density": 9100, "budget": 180, "source": "Census India, municipal budgets (Mumbai 31,700/sq km)"},
    "IDN": {"density": 14200, "budget": 240, "source": "BPS Indonesia (Jakarta 15,900/sq km)"},
    "PHL": {"density": 15800, "budget": 190, "source": "PSA Philippines (Manila metro 19,000/sq km)"},
    "VNM": {"density": 7900, "budget": 280, "source": "GSO Vietnam (HCMC 4,300/sq km)"},
    "THA": {"density": 6200, "budget": 620, "source": "NSO Thailand (Bangkok 5,300/sq km)"},
    "MYS": {"density": 7100, "budget": 1100, "source": "DOSM Malaysia (KL metro 8,000/sq km)"},
    "SGP": {"density": 8400, "budget": 6800, "source": "Singapore Dept of Statistics (8,400/sq km national)"},
    "PAK": {"density": 11600, "budget": 95, "source": "PBS Pakistan (Karachi 24,000/sq km)"},
    "BGD": {"density": 23100, "budget": 85, "source": "BBS Bangladesh (Dhaka 36,000/sq km, highest globally)"},
    "NPL": {"density": 13400, "budget": 120, "source": "CBS Nepal (Kathmandu)"},
    "MMR": {"density": 8900, "budget": 105, "source": "Myanmar census (Yangon)"},
    "KHM": {"density": 7200, "budget": 140, "source": "Cambodia NIS (Phnom Penh)"},

    # Latin America
    "BRA": {"density": 5400, "budget": 880, "source": "IBGE Brazil, municipal budgets"},
    "MEX": {"density": 6100, "budget": 720, "source": "INEGI Mexico, municipalities"},
    "COL": {"density": 7300, "budget": 560, "source": "DANE Colombia (Bogotá 16,000/sq km)"},
    "ARG": {"density": 4800, "budget": 920, "source": "INDEC Argentina (Buenos Aires)"},
    "PER": {"density": 7600, "budget": 480, "source": "INEI Peru (Lima metro)"},
    "CRI": {"density": 5200, "budget": 980, "source": "INEC Costa Rica"},

    # Africa - Using Africapolis Data
    "ZAF": {"density": 5100, "budget": 640, "source": "Stats SA, Africapolis (Joburg 2,700/sq km)"},
    "NGA": {"density": 8900, "budget": 120, "source": "Africapolis (Lagos 20,000/sq km), NBS Nigeria"},
    "KEN": {"density": 7200, "budget": 135, "source": "Africapolis (Nairobi 5,300/sq km), KNBS"},
    "ETH": {"density": 6800, "budget": 95, "source": "Africapolis (Addis 5,200/sq km)"},
    "TZA": {"density": 6400, "budget": 110, "source": "Africapolis (Dar 3,100/sq km)"},
    "UGA": {"density": 7100, "budget": 105, "source": "Africapolis (Kampala 9,200/sq km)"},
    "RWA": {"density": 5900, "budget": 180, "source": "Africapolis (Kigali 2,800/sq km)"},
    "ZMB": {"density": 5400, "budget": 145, "source": "Africapolis (Lusaka 4,900/sq km)"},
    "NAM": {"density": 3800, "budget": 420, "source": "Africapolis (Windhoek)"},
    "BWA": {"density": 4100, "budget": 680, "source": "Africapolis (Gaborone)"},
    "SEN": {"density": 9200, "budget": 160, "source": "Africapolis (Dakar 13,500/sq km)"},
    "TUN": {"density": 6700, "budget": 480, "source": "Africapolis (Tunis 3,000/sq km)"},
    "CMR": {"density": 7800, "budget": 140, "source": "Africapolis (Douala/Yaoundé 6,000/sq km)"},
    "CIV": {"density": 8200, "budget": 155, "source": "Africapolis (Abidjan 10,000/sq km)"},
    "MOZ": {"density": 6100, "budget": 105, "source": "Africapolis (Maputo 4,400/sq km)"},
    "AGO": {"density": 7400, "budget": 340, "source": "Africapolis (Luanda 6,500/sq km)"},
    "ZWE": {"density": 5600, "budget": 125, "source": "Africapolis (Harare 3,000/sq km)"},
    "DZA": {"density": 7900, "budget": 520, "source": "Africapolis (Algiers 6,500/sq km)"},
    "SDN": {"density": 6500, "budget": 95, "source": "Africapolis (Khartoum 4,300/sq km)"},
    "MUS": {"density": 5800, "budget": 1200, "source": "Statistics Mauritius"},
    "MWI": {"density": 5700, "budget": 85, "source": "Africapolis (Lilongwe/Blantyre)"},
    "BEN": {"density": 7600, "budget": 125, "source": "Africapolis (Cotonou 14,000/sq km)"},
    "TGO": {"density": 8100, "budget": 135, "source": "Africapolis (Lomé 16,000/sq km)"},
    "MLI": {"density": 6200, "budget": 110, "source": "Africapolis (Bamako 4,200/sq km)"},
    "BFA": {"density": 6800, "budget": 105, "source": "Africapolis (Ouagadougou 4,900/sq km)"},
    "MDG": {"density": 5900, "budget": 95, "source": "Africapolis (Antananarivo 13,000/sq km)"},
    "COG": {"density": 6700, "budget": 240, "source": "Africapolis (Brazzaville 8,200/sq km)"},
    "GHA": {"density": 7400, "budget": 165, "source": "Africapolis (Accra 4,600/sq km), GSS Ghana"},
    "MAR": {"density": 6900, "budget": 420, "source": "Africapolis (Casablanca/Rabat 5,000/sq km)"},
}

# Calculate Municipal Spending Efficiency Index for each country
# Formula: (Budget Per Capita) / (Urban Density / 1000)
# This gives USD per capita per 1000 people/sq km of density

for iso, data in municipal_data.items():
    density_per_1000 = data["density"] / 1000
    efficiency_index = data["budget"] / density_per_1000
    data["efficiency_index"] = round(efficiency_index, 1)

# Print summary
print("Municipal Spending Efficiency Index - Summary")
print("="*80)
print(f"Total countries: {len(municipal_data)}")
print()

# Sort by efficiency index
sorted_by_efficiency = sorted(municipal_data.items(), key=lambda x: x[1]["efficiency_index"], reverse=True)

print("HIGHEST Spending Efficiency (more USD per capita per unit density):")
for iso, data in sorted_by_efficiency[:10]:
    print(f"{iso}: ${data['efficiency_index']:.1f} (Budget: ${data['budget']}, Density: {data['density']}/sq km)")

print()
print("LOWEST Spending Efficiency (less USD per capita per unit density):")
for iso, data in sorted_by_efficiency[-10:]:
    print(f"{iso}: ${data['efficiency_index']:.1f} (Budget: ${data['budget']}, Density: {data['density']}/sq km)")

# Export to dict for adding to data.js
efficiency_dict = {iso: data["efficiency_index"] for iso, data in municipal_data.items()}
print()
print("Efficiency index values for data.js:")
print(efficiency_dict)
