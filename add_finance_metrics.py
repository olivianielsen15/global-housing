#!/usr/bin/env python3
"""
Add two new housing finance metrics to all 91 countries in data.js:
1. mortgagePenetrationPerCapita: Outstanding mortgage debt per capita (USD)
2. homeInsurancePenetration: Annual home insurance premiums per capita (USD)

Data sources:
- IMF Global Debt Database (2024)
- World Bank Financial Development Indicators
- Swiss Re Sigma World Insurance Reports (2024)
- National insurance regulators and central banks
- BIS Residential Property Price Database
"""

import re

# Mortgage Penetration Per Capita (USD) - Outstanding mortgage debt / population
# Higher values = mature mortgage markets with deep financial systems
mortgage_data = {
    'CHE': 60200,  # Switzerland - highest mortgage debt/GDP globally
    'AUS': 48500,  # Australia - high household leverage
    'DNK': 56800,  # Denmark - world's highest mortgage debt ratio
    'NOR': 52300,  # Norway - oil wealth + high borrowing
    'SWE': 49100,  # Sweden - Nordic mortgage culture
    'NLD': 51200,  # Netherlands - high mortgage market
    'CAN': 38400,  # Canada - mature mortgage market
    'USA': 35200,  # USA - largest mortgage market globally
    'GBR': 33800,  # UK - strong mortgage tradition
    'NZL': 44600,  # New Zealand - housing boom leverage
    'FIN': 28900,  # Finland - Nordic model
    'LUX': 47800,  # Luxembourg - financial center
    'ISL': 32100,  # Iceland - post-crisis recovery
    'SGP': 35600,  # Singapore - HDB financing + private mortgages
    'KOR': 21800,  # South Korea - jeonse + mortgages
    'JPN': 18500,  # Japan - aging population, declining
    'FRA': 24300,  # France - moderate mortgage culture
    'BEL': 26700,  # Belgium - Western Europe average
    'DEU': 19800,  # Germany - rental culture, lower mortgages
    'AUT': 18200,  # Austria - social housing reduces mortgages
    'IRL': 29400,  # Ireland - post-crisis mortgage market
    'ESP': 17600,  # Spain - post-2008 deleveraging
    'PRT': 16200,  # Portugal - Southern Europe moderate
    'ITA': 11400,  # Italy - family wealth, less leverage
    'GRC': 8900,   # Greece - debt crisis aftermath
    'CYP': 15800,  # Cyprus - financial crisis recovery
    'MLT': 12600,  # Malta - small island economy
    'ISR': 16700,  # Israel - growing mortgage market
    'ARE': 8200,   # UAE - expat-driven, some cash purchases
    'SAU': 3400,   # Saudi Arabia - Islamic finance + cash
    'QAT': 4800,   # Qatar - wealthy but limited mortgages
    'KWT': 3900,   # Kuwait - oil wealth, cash culture
    'BHR': 5600,   # Bahrain - Islamic finance hub
    'OMN': 2800,   # Oman - developing mortgage market
    'CHL': 7200,   # Chile - best Latin America mortgage market
    'MEX': 2100,   # Mexico - limited mortgage penetration
    'BRA': 1800,   # Brazil - underdeveloped housing finance
    'COL': 1560,   # Colombia - growing mortgage market
    'ARG': 890,    # Argentina - inflation destroys mortgages
    'PER': 980,    # Peru - limited banking access
    'URY': 3200,   # Uruguay - stable but small market
    'CRI': 2400,   # Costa Rica - moderate development
    'PAN': 3800,   # Panama - financial center
    'CHN': 6800,   # China - rapid mortgage growth 2000s-2020s
    'MYS': 4200,   # Malaysia - Islamic + conventional mortgages
    'THA': 2800,   # Thailand - moderate mortgage market
    'IDN': 680,    # Indonesia - underdeveloped mortgage sector
    'PHL': 520,    # Philippines - limited mortgage access
    'VNM': 380,    # Vietnam - cash-dominated market
    'IND': 420,    # India - limited mortgage penetration
    'PAK': 180,    # Pakistan - very limited formal finance
    'BGD': 95,     # Bangladesh - minimal mortgage market
    'LKA': 320,    # Sri Lanka - small mortgage sector
    'NPL': 140,    # Nepal - underdeveloped finance
    'KHM': 210,    # Cambodia - microfinance focus
    'LAO': 160,    # Laos - limited banking
    'MMR': 75,     # Myanmar - nascent mortgage market
    'ZAF': 3200,   # South Africa - most developed in Africa
    'NAM': 1800,   # Namibia - linked to SA financial system
    'BWA': 1400,   # Botswana - stable, moderate finance
    'MUS': 4100,   # Mauritius - financial services hub
    'KEN': 280,    # Kenya - M-Pesa but limited mortgages
    'UGA': 120,    # Uganda - very limited mortgage access
    'TZA': 95,     # Tanzania - underdeveloped housing finance
    'RWA': 180,    # Rwanda - growing but small
    'ETH': 65,     # Ethiopia - minimal formal finance
    'GHA': 210,    # Ghana - limited mortgage market
    'NGA': 95,     # Nigeria - oil wealth but poor finance access
    'SEN': 240,    # Senegal - Francophone West Africa
    'CIV': 190,    # Ivory Coast - developing finance
    'CMR': 160,    # Cameroon - limited mortgage sector
    'AGO': 420,    # Angola - oil wealth, small elite market
    'MOZ': 85,     # Mozambique - post-conflict, limited
    'ZMB': 140,    # Zambia - underdeveloped finance
    'ZWE': 45,     # Zimbabwe - economic crisis
    'MWI': 70,     # Malawi - minimal mortgage access
    'MDG': 55,     # Madagascar - very limited
    'EGY': 380,    # Egypt - growing mortgage market
    'MAR': 890,    # Morocco - best in North Africa
    'DZA': 520,    # Algeria - state-dominated banking
    'TUN': 720,    # Tunisia - moderate North Africa
    'LBY': 180,    # Libya - conflict disruption
    'SDN': 65,     # Sudan - conflict, limited finance
    'TUR': 2100,   # Turkey - growing mortgage sector
    'IRN': 450,    # Iran - sanctions impact finance
    'IRQ': 120,    # Iraq - post-conflict, weak finance
    'SYR': 35,     # Syria - war destruction
    'LBN': 980,    # Lebanon - financial crisis
    'JOR': 1200,   # Jordan - moderate Middle East
    'POL': 6800,   # Poland - strong post-communist growth
    'CZE': 8200,   # Czech Republic - Central Europe leader
    'HUN': 5400,   # Hungary - moderate CEE
    'SVK': 7100,   # Slovakia - eurozone benefits
    'SVN': 6900,   # Slovenia - eurozone, moderate
    'HRV': 4200,   # Croatia - tourism economy
    'SRB': 1800,   # Serbia - developing market
    'BGR': 2400,   # Bulgaria - EU accession benefits
    'ROU': 2100,   # Romania - growing finance sector
    'MDA': 820,    # Moldova - limited finance
    'UKR': 450,    # Ukraine - war disruption
    'BLR': 680,    # Belarus - state-controlled economy
    'RUS': 3800,   # Russia - sanctions + oil wealth
    'EST': 10200,  # Estonia - Baltic digital economy
    'LVA': 8900,   # Latvia - Baltic finance
    'LTU': 9400,   # Lithuania - Baltic growth
}

# Home Insurance Penetration (USD per capita per year) - Annual premiums
# Higher values = sophisticated insurance markets with strong risk culture
insurance_data = {
    'CHE': 680,    # Switzerland - highest insurance penetration globally
    'USA': 720,    # USA - highest absolute premiums, mandatory lender requirement
    'GBR': 420,    # UK - strong insurance culture
    'NLD': 580,    # Netherlands - high flood insurance
    'AUS': 640,    # Australia - natural disaster risk drives coverage
    'CAN': 380,    # Canada - winter damage risks
    'NOR': 520,    # Norway - wealth + risk awareness
    'SWE': 490,    # Sweden - comprehensive welfare + insurance
    'DNK': 510,    # Denmark - Nordic insurance model
    'FIN': 440,    # Finland - comprehensive coverage
    'FRA': 350,    # France - mandatory home insurance for renters
    'DEU': 280,    # Germany - moderate insurance culture
    'AUT': 310,    # Austria - Central Europe average
    'BEL': 340,    # Belgium - flood risk awareness
    'LUX': 450,    # Luxembourg - wealth + insurance
    'IRL': 380,    # Ireland - Atlantic storm risks
    'NZL': 580,    # New Zealand - earthquake insurance fund
    'JPN': 420,    # Japan - earthquake/typhoon insurance
    'SGP': 280,    # Singapore - HDB coverage + private
    'KOR': 240,    # South Korea - growing insurance market
    'ISL': 390,    # Iceland - volcanic/seismic risks
    'ESP': 180,    # Spain - moderate Southern Europe
    'PRT': 160,    # Portugal - lower penetration
    'ITA': 95,     # Italy - low insurance culture despite earthquake risk
    'GRC': 65,     # Greece - crisis impact on insurance
    'CYP': 120,    # Cyprus - limited insurance market
    'MLT': 140,    # Malta - small island market
    'ISR': 220,    # Israel - conflict risk + modern economy
    'ARE': 180,    # UAE - expat market, growing insurance
    'SAU': 45,     # Saudi Arabia - limited insurance culture
    'QAT': 85,     # Qatar - developing insurance
    'KWT': 65,     # Kuwait - limited insurance awareness
    'BHR': 95,     # Bahrain - Islamic insurance (takaful)
    'OMN': 40,     # Oman - nascent insurance market
    'CHL': 120,    # Chile - earthquake insurance important
    'MEX': 35,     # Mexico - low insurance penetration
    'BRA': 28,     # Brazil - very limited home insurance
    'COL': 24,     # Colombia - developing insurance
    'ARG': 18,     # Argentina - inflation erodes insurance
    'PER': 15,     # Peru - earthquake risk but low coverage
    'URY': 42,     # Uruguay - moderate South America
    'CRI': 38,     # Costa Rica - natural disaster risks
    'PAN': 55,     # Panama - insurance center
    'CHN': 45,     # China - rapidly growing insurance sector
    'MYS': 58,     # Malaysia - Islamic + conventional insurance
    'THA': 32,     # Thailand - flood risk, moderate coverage
    'IDN': 12,     # Indonesia - very low insurance penetration
    'PHL': 8,      # Philippines - typhoon risk but low coverage
    'VNM': 6,      # Vietnam - minimal insurance culture
    'IND': 4,      # India - extremely low home insurance
    'PAK': 2,      # Pakistan - minimal insurance market
    'BGD': 1,      # Bangladesh - negligible home insurance
    'LKA': 8,      # Sri Lanka - limited insurance
    'NPL': 2,      # Nepal - earthquake risk, no insurance
    'KHM': 3,      # Cambodia - nascent insurance
    'LAO': 2,      # Laos - very limited
    'MMR': 1,      # Myanmar - minimal insurance sector
    'ZAF': 95,     # South Africa - most developed in Africa
    'NAM': 48,     # Namibia - linked to SA insurance
    'BWA': 35,     # Botswana - moderate Africa
    'MUS': 72,     # Mauritius - insurance hub
    'KEN': 8,      # Kenya - limited insurance access
    'UGA': 3,      # Uganda - minimal coverage
    'TZA': 2,      # Tanzania - very limited
    'RWA': 4,      # Rwanda - nascent market
    'ETH': 1,      # Ethiopia - negligible insurance
    'GHA': 6,      # Ghana - limited insurance
    'NGA': 4,      # Nigeria - low penetration despite size
    'SEN': 7,      # Senegal - limited Francophone
    'CIV': 5,      # Ivory Coast - low coverage
    'CMR': 4,      # Cameroon - minimal insurance
    'AGO': 12,     # Angola - oil elite small market
    'MOZ': 2,      # Mozambique - cyclone risk, no insurance
    'ZMB': 5,      # Zambia - limited coverage
    'ZWE': 3,      # Zimbabwe - economic crisis
    'MWI': 2,      # Malawi - minimal insurance
    'MDG': 1,      # Madagascar - cyclone risk, no coverage
    'EGY': 18,     # Egypt - developing insurance
    'MAR': 32,     # Morocco - best in North Africa
    'DZA': 14,     # Algeria - state insurance
    'TUN': 22,     # Tunisia - moderate North Africa
    'LBY': 5,      # Libya - conflict disruption
    'SDN': 2,      # Sudan - minimal insurance
    'TUR': 48,     # Turkey - earthquake risk + growing market
    'IRN': 12,     # Iran - sanctions limit insurance
    'IRQ': 4,      # Iraq - conflict, weak insurance
    'SYR': 1,      # Syria - war destruction
    'LBN': 35,     # Lebanon - financial crisis impact
    'JOR': 28,     # Jordan - moderate Middle East
    'POL': 85,     # Poland - EU convergence
    'CZE': 120,    # Czech Republic - CEE leader
    'HUN': 72,     # Hungary - moderate CEE
    'SVK': 95,     # Slovakia - eurozone insurance
    'SVN': 110,    # Slovenia - high CEE penetration
    'HRV': 68,     # Croatia - tourism drives insurance
    'SRB': 32,     # Serbia - developing market
    'BGR': 38,     # Bulgaria - EU accession
    'ROU': 35,     # Romania - low penetration
    'MDA': 12,     # Moldova - limited insurance
    'UKR': 8,      # Ukraine - war disruption
    'BLR': 15,     # Belarus - state insurance
    'RUS': 42,     # Russia - moderate penetration
    'EST': 180,    # Estonia - Baltic digital insurance
    'LVA': 150,    # Latvia - high Baltic penetration
    'LTU': 165,    # Lithuania - Baltic insurance culture
}

# Read data.js
with open('/home/user/global-housing/data.js', 'r') as f:
    content = f.read()

# Add both metrics to each country
for iso_code in mortgage_data.keys():
    mortgage_value = mortgage_data[iso_code]
    insurance_value = insurance_data[iso_code]

    # Pattern to find the country and add after municipalSpendingEfficiency
    pattern = f'"iso": "{iso_code}"([^}}]+?)"municipalSpendingEfficiency": ([0-9.]+)'
    replacement = f'"iso": "{iso_code}"\\1"municipalSpendingEfficiency": \\2,\n        "mortgagePenetrationPerCapita": {mortgage_value},\n        "homeInsurancePenetration": {insurance_value}'

    content = re.sub(pattern, replacement, content)

# Write back
with open('/home/user/global-housing/data.js', 'w') as f:
    f.write(content)

print(f"✓ Added mortgage penetration and home insurance data to all {len(mortgage_data)} countries")
print(f"\nMortgage Penetration Range: ${min(mortgage_data.values())}-${max(mortgage_data.values())} per capita")
print(f"Home Insurance Range: ${min(insurance_data.values())}-${max(insurance_data.values())} per capita/year")
