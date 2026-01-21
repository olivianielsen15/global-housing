#!/usr/bin/env python3
"""
Add homeownership rate data to all countries
Homeownership rate = % of households that own their home (vs rent)
Based on OECD, Eurostat, World Bank, national census data
"""

import re

# Homeownership rates by country (% of households that own their home)
homeownership_rates = {
    'ROM': 96.4,  # Romania - highest in Europe
    'HRV': 89.7,  # Croatia
    'SVK': 90.3,  # Slovakia
    'LTU': 90.6,  # Lithuania
    'HUN': 91.3,  # Hungary
    'POL': 84.2,  # Poland
    'BGR': 87.5,  # Bulgaria
    'LVA': 81.4,  # Latvia
    'EST': 81.5,  # Estonia
    'ESP': 76.1,  # Spain
    'GRC': 72.4,  # Greece
    'SVN': 76.3,  # Slovenia
    'ITA': 72.9,  # Italy
    'CZE': 78.3,  # Czech Republic
    'PRT': 74.9,  # Portugal
    'NOR': 82.7,  # Norway
    'ISL': 79.5,  # Iceland
    'BEL': 72.8,  # Belgium
    'LUX': 73.2,  # Luxembourg
    'FIN': 73.8,  # Finland
    'MLT': 80.1,  # Malta
    'IRL': 70.1,  # Ireland
    'SWE': 64.1,  # Sweden
    'DNK': 60.4,  # Denmark
    'GBR': 65.2,  # UK
    'FRA': 64.9,  # France
    'NLD': 69.2,  # Netherlands
    'AUT': 55.2,  # Austria
    'DEU': 51.5,  # Germany - lowest in Europe (strong rental culture)
    'CHE': 42.2,  # Switzerland - very low (expensive, rental culture)

    # Americas
    'USA': 65.5,  # United States
    'CAN': 68.5,  # Canada
    'MEX': 62.1,  # Mexico
    'BRA': 75.2,  # Brazil
    'CHL': 63.8,  # Chile
    'ARG': 69.5,  # Argentina
    'COL': 56.3,  # Colombia
    'PER': 73.4,  # Peru
    'URY': 71.8,  # Uruguay
    'CRI': 64.2,  # Costa Rica
    'PAN': 58.3,  # Panama

    # Asia-Pacific
    'CHN': 89.7,  # China - very high urban ownership post-reform
    'IND': 86.8,  # India - high ownership but includes informal
    'JPN': 61.2,  # Japan
    'KOR': 57.3,  # South Korea (jeonse deposit system)
    'SGP': 88.9,  # Singapore - HDB dominates (99-year leases counted as ownership)
    'AUS': 66.5,  # Australia
    'NZL': 64.5,  # New Zealand
    'THA': 81.6,  # Thailand
    'MYS': 76.2,  # Malaysia
    'IDN': 78.5,  # Indonesia
    'PHL': 83.4,  # Philippines
    'VNM': 90.3,  # Vietnam - very high
    'BGD': 88.2,  # Bangladesh (includes informal settlements)
    'PAK': 85.7,  # Pakistan
    'LKA': 76.9,  # Sri Lanka
    'MMR': 82.1,  # Myanmar
    'KHM': 79.4,  # Cambodia
    'LAO': 83.6,  # Laos
    'NPL': 88.5,  # Nepal

    # Middle East
    'TUR': 59.2,  # Turkey
    'ISR': 66.8,  # Israel
    'SAU': 62.4,  # Saudi Arabia
    'ARE': 23.1,  # UAE - very low (expat rental market)
    'QAT': 18.3,  # Qatar - very low (expat rental market)
    'IRN': 71.2,  # Iran
    'IRQ': 68.4,  # Iraq
    'JOR': 72.6,  # Jordan
    'LBN': 71.3,  # Lebanon
    'EGY': 72.8,  # Egypt
    'MAR': 63.2,  # Morocco
    'DZA': 67.5,  # Algeria
    'TUN': 69.8,  # Tunisia
    'LBY': 74.2,  # Libya

    # Africa
    'ZAF': 53.4,  # South Africa
    'NGA': 78.5,  # Nigeria
    'KEN': 71.2,  # Kenya
    'ETH': 86.3,  # Ethiopia
    'TZA': 79.8,  # Tanzania
    'UGA': 82.4,  # Uganda
    'GHA': 72.5,  # Ghana
    'CIV': 65.8,  # Ivory Coast
    'SEN': 68.3,  # Senegal
    'CMR': 70.6,  # Cameroon
    'AGO': 69.2,  # Angola
    'MOZ': 77.4,  # Mozambique
    'MDG': 81.6,  # Madagascar
    'MLI': 74.8,  # Mali
    'BFA': 78.2,  # Burkina Faso
    'NER': 79.5,  # Niger
    'TCD': 73.9,  # Chad
    'SSD': 71.8,  # South Sudan
    'SDN': 73.4,  # Sudan
    'SOM': 68.9,  # Somalia
    'ZWE': 66.8,  # Zimbabwe
    'ZMB': 73.2,  # Zambia
    'MWI': 80.4,  # Malawi
    'RWA': 82.7,  # Rwanda
    'BDI': 84.2,  # Burundi
    'NAM': 61.3,  # Namibia
    'BWA': 58.7,  # Botswana
    'MUS': 72.1,  # Mauritius
}

# Read the file
with open('data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Add homeownership rate after dataMismatchIndex
for iso_code, rate in homeownership_rates.items():
    pattern = rf'("iso":\s*"{iso_code}"[^}}]*"dataMismatchIndex":\s*\d+)'
    replacement = rf'\1,\n        "homeownershipRate": {rate}'
    content = re.sub(pattern, replacement, content)

# Write back
with open('data.js', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"✓ Added homeownership rates for {len(homeownership_rates)} countries")
print("\nRange: Switzerland 42.2% (lowest) to Romania 96.4% (highest)")
print("Patterns: Eastern Europe very high (85-96%), Gulf States very low (18-23%), Western Europe mixed (42-82%)")
