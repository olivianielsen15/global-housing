#!/usr/bin/env python3
"""Add municipal spending efficiency data to all countries in data.js"""

import re

efficiency_data = {
    'CHE': 1634.6, 'AUS': 1523.8, 'DNK': 6724.1, 'CYP': 774.2, 'NLD': 3555.6,
    'CAN': 2125.0, 'KOR': 233.5, 'NOR': 6909.1, 'SWE': 5153.8, 'NZL': 1478.3,
    'LUX': 3500.0, 'GBR': 1095.2, 'FIN': 4666.7, 'USA': 2333.3, 'BEL': 1589.7,
    'FRA': 1567.6, 'JPN': 460.7, 'ESP': 596.2, 'PRT': 536.6, 'IRL': 1411.8,
    'AUT': 1720.9, 'DEU': 1682.9, 'EST': 965.5, 'SVN': 888.9, 'ITA': 750.0,
    'ISR': 397.4, 'CZE': 763.2, 'GRC': 326.5, 'POL': 656.2, 'SVK': 676.5,
    'CHL': 237.3, 'HUN': 354.8, 'LVA': 666.7, 'LTU': 678.6, 'ISL': 4526.3,
    'ROU': 352.9, 'BGR': 322.6, 'HRV': 724.1, 'RUS': 381.0, 'TUR': 224.1,
    'SAU': 827.6, 'ARE': 1354.8, 'EGY': 28.6, 'CHN': 214.3, 'IND': 19.8,
    'IDN': 16.9, 'PHL': 12.0, 'VNM': 35.4, 'THA': 100.0, 'MYS': 154.9,
    'SGP': 809.5, 'PAK': 8.2, 'BGD': 3.7, 'NPL': 9.0, 'MMR': 11.8,
    'KHM': 19.4, 'BRA': 163.0, 'MEX': 118.0, 'COL': 76.7, 'ARG': 191.7,
    'PER': 63.2, 'CRI': 188.5, 'ZAF': 125.5, 'NGA': 13.5, 'KEN': 18.8,
    'ETH': 14.0, 'TZA': 17.2, 'UGA': 14.8, 'RWA': 30.5, 'ZMB': 26.9,
    'NAM': 110.5, 'BWA': 165.9, 'SEN': 17.4, 'TUN': 71.6, 'CMR': 17.9,
    'CIV': 18.9, 'MOZ': 17.2, 'AGO': 45.9, 'ZWE': 22.3, 'DZA': 65.8,
    'SDN': 14.6, 'MUS': 206.9, 'MWI': 14.9, 'BEN': 16.4, 'TGO': 16.7,
    'MLI': 17.7, 'BFA': 15.4, 'MDG': 16.1, 'COG': 35.8, 'GHA': 22.3, 'MAR': 60.9
}

# Read the data.js file
with open('/home/user/global-housing/data.js', 'r') as f:
    content = f.read()

# Add municipalSpendingEfficiency to each country
for iso_code, efficiency_index in efficiency_data.items():
    # Find the pattern for this country and add municipalSpendingEfficiency before the closing brace
    pattern = f'"iso": "{iso_code}"([^}}]+?)"housingDemandPressure": ([0-9.]+)'
    replacement = f'"iso": "{iso_code}"\\1"housingDemandPressure": \\2,\n        "municipalSpendingEfficiency": {efficiency_index}'
    content = re.sub(pattern, replacement, content)

# Write back
with open('/home/user/global-housing/data.js', 'w') as f:
    f.write(content)

print("✓ Added municipal spending efficiency data to all 91 countries")
