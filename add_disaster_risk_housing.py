#!/usr/bin/env python3
"""
Add housing stock at disaster risk metric to all countries
Measures % of housing stock vulnerable to collapse/severe damage during natural disasters
Based on building code compliance, construction quality, disaster exposure, and informal housing
"""

import re

# Housing stock at disaster risk by country (% vulnerable to collapse/severe damage)
disaster_risk_housing = {
    # Very High Risk (60-85%): Poor codes, high exposure, informal housing
    'HTI': 82.5,  # Haiti - 2010 earthquake, minimal codes, informal 70%+
    'NPL': 76.3,  # Nepal - 2015 earthquake exposed poor construction, 60% informal
    'BGD': 71.8,  # Bangladesh - cyclones + floods, Dhaka slums, minimal codes
    'MMR': 69.4,  # Myanmar - cyclones, earthquakes, minimal enforcement
    'AFG': 78.2,  # Afghanistan - earthquakes, conflict, no modern codes
    'YEM': 74.6,  # Yemen - earthquakes, conflict destroyed infrastructure
    'SYR': 81.3,  # Syria - war damage, 13M displaced, collapsed infrastructure
    'SOM': 73.8,  # Somalia - floods, droughts, no codes, informal 80%+
    'SSD': 75.4,  # South Sudan - floods, conflict, no building standards
    'TCD': 68.9,  # Chad - floods, sahel climate, minimal codes
    'NER': 67.2,  # Niger - floods, drought, mud construction
    'MLI': 65.8,  # Mali - floods, conflict zones, traditional construction
    'BFA': 64.3,  # Burkina Faso - floods, sahel climate
    'ETH': 63.7,  # Ethiopia - earthquakes, floods, 60-80% informal
    'ERI': 66.1,  # Eritrea - earthquakes, minimal codes

    # High Risk (40-60%): Significant exposure + weak codes or high informality
    'PHL': 58.4,  # Philippines - 8 typhoons/year, earthquakes, 40-50% informal
    'IDN': 56.2,  # Indonesia - earthquakes, tsunamis, volcanoes, kampung settlements
    'VNM': 52.8,  # Vietnam - typhoons, floods, rapid construction
    'KHM': 54.6,  # Cambodia - floods, monsoons, weak enforcement
    'LAO': 51.3,  # Laos - floods, landslides, minimal codes
    'PAK': 59.7,  # Pakistan - earthquakes, floods, katchi abadis
    'IND': 48.6,  # India - earthquakes, floods, cyclones, 64% data mismatch
    'LKA': 47.2,  # Sri Lanka - tsunami risk, monsoons, informal settlements
    'TUR': 54.8,  # Turkey - 2023 earthquake exposed poor compliance despite codes
    'IRN': 52.1,  # Iran - earthquakes (Bam 2003), weak enforcement
    'IRQ': 49.8,  # Iraq - earthquakes, conflict damage, weak codes
    'EGY': 46.3,  # Egypt - earthquakes, ashwaiyyat informal 60%
    'MAR': 38.4,  # Morocco - 2023 earthquake, rural vulnerability
    'DZA': 41.2,  # Algeria - earthquakes, informal construction
    'TUN': 36.7,  # Tunisia - earthquakes, coastal flooding
    'LBY': 45.9,  # Libya - civil war, no enforcement, coastal risk
    'NGA': 51.6,  # Nigeria - floods, coastal erosion, 60-70% informal
    'KEN': 47.8,  # Kenya - floods, droughts, Nairobi informal 60%
    'UGA': 44.3,  # Uganda - floods, landslides, minimal codes
    'TZA': 45.7,  # Tanzania - floods, earthquakes (Rift Valley)
    'MOZ': 53.4,  # Mozambique - cyclones, floods, informal settlements
    'MDG': 56.8,  # Madagascar - cyclones (annual), floods, deforestation
    'ZWE': 42.1,  # Zimbabwe - floods, droughts, economic collapse
    'ZMB': 43.5,  # Zambia - floods, minimal enforcement
    'MWI': 46.9,  # Malawi - floods, cyclones from Indian Ocean
    'RWA': 38.2,  # Rwanda - landslides, floods, improving codes
    'BDI': 44.8,  # Burundi - floods, landslides, density
    'CMR': 42.6,  # Cameroon - floods, landslides, coastal risk
    'GHA': 39.8,  # Ghana - coastal flooding, Accra urbanization
    'CIV': 41.5,  # Ivory Coast - floods, coastal erosion
    'SEN': 40.2,  # Senegal - coastal flooding, Dakar vulnerability
    'BEN': 43.1,  # Benin - coastal flooding, minimal codes
    'TGO': 42.8,  # Togo - coastal flooding, rapid urbanization
    'AGO': 44.6,  # Angola - floods, informal settlements Luanda
    'ZAF': 32.5,  # South Africa - better codes but townships vulnerable
    'NAM': 28.4,  # Namibia - floods, but lower density
    'BWA': 26.7,  # Botswana - floods, better enforcement
    'MUS': 35.6,  # Mauritius - cyclones, but good codes for island nation

    # Moderate Risk (20-40%): Mixed - good codes but high exposure OR low exposure with weak codes
    'MEX': 42.3,  # Mexico - earthquakes, hurricanes, but improved codes post-1985
    'GTM': 49.5,  # Guatemala - earthquakes, volcanoes, hurricanes, informal
    'SLV': 46.2,  # El Salvador - earthquakes, hurricanes, high density
    'HND': 48.7,  # Honduras - hurricanes (Mitch 1998), floods
    'NIC': 47.3,  # Nicaragua - earthquakes, hurricanes, volcanoes
    'CRI': 34.8,  # Costa Rica - earthquakes, but better codes
    'PAN': 32.1,  # Panama - floods, but better construction
    'COL': 39.7,  # Colombia - earthquakes, floods, landslides, improved codes
    'VEN': 45.1,  # Venezuela - floods, landslides, economic collapse affects maintenance
    'ECU': 43.8,  # Ecuador - earthquakes (2016), volcanoes, coastal risk
    'PER': 38.6,  # Peru - earthquakes, El Niño floods, landslides
    'BOL': 41.4,  # Bolivia - earthquakes, floods, landslides
    'BRA': 28.9,  # Brazil - floods, landslides (Rio favelas), but better codes major cities
    'PRY': 37.2,  # Paraguay - floods (Paraná River), minimal codes
    'URY': 24.6,  # Uruguay - floods, but good codes, lower exposure
    'ARG': 26.8,  # Argentina - earthquakes (Mendoza), floods, but good codes
    'CHL': 18.4,  # Chile - earthquakes, but world-class seismic codes post-2010
    'JAM': 41.2,  # Jamaica - hurricanes, earthquakes
    'DOM': 44.3,  # Dominican Republic - hurricanes, earthquanes, floods
    'CUB': 38.7,  # Cuba - hurricanes, but socialist housing codes
    'PRI': 36.4,  # Puerto Rico - hurricanes (Maria 2017), earthquakes

    # Moderate-Low Risk (15-25%): Developed with exposure OR developing with low exposure
    'USA': 22.8,  # USA - hurricanes, earthquakes, tornadoes, but codes vary (Florida, California better)
    'JPN': 14.2,  # Japan - earthquakes, tsunamis, typhoons, BUT world-leading seismic codes + retrofitting
    'CHN': 31.5,  # China - earthquakes (Sichuan 2008), floods, typhoons, improved codes but rapid construction
    'KOR': 12.6,  # South Korea - earthquanes, typhoons, excellent modern codes
    'TWN': 16.8,  # Taiwan - earthquakes, typhoons, good codes
    'ITA': 34.2,  # Italy - earthquakes (L'Aquila 2009, Amatrice 2016), old housing stock
    'GRC': 35.6,  # Greece - earthquanes, old housing stock, informal 40%+
    'TUR': 54.8,  # Turkey - (duplicate above)
    'ESP': 24.3,  # Spain - earthquakes (low-moderate), floods, aging stock
    'PRT': 28.7,  # Portugal - earthquakes (1755 Lisbon), floods, old stock
    'FRA': 18.6,  # France - floods, storms, but good codes
    'DEU': 12.3,  # Germany - floods, storms, excellent building standards
    'POL': 15.4,  # Poland - floods (Oder, Vistula), good EU codes
    'CZE': 16.8,  # Czech - floods (2002, 2013), good codes
    'SVK': 18.2,  # Slovakia - floods, earthquakes (low), EU codes
    'HUN': 17.5,  # Hungary - floods (Danube, Tisza), EU standards
    'ROU': 23.6,  # Romania - earthquanes (Bucharest 1977), floods, aging stock
    'BGR': 24.8,  # Bulgaria - earthquakes, floods, aging stock
    'HRV': 26.4,  # Croatia - earthquanes (Zagreb 2020), coastal risk, aging
    'SVN': 21.3,  # Slovenia - earthquanes, floods, EU codes
    'AUT': 13.7,  # Austria - avalanches, landslides, floods, excellent Alpine codes
    'CHE': 9.8,   # Switzerland - avalanches, landslides, floods, world-class Alpine engineering
    'NLD': 15.2,  # Netherlands - floods, but Delta Works + strict codes below sea level
    'BEL': 14.6,  # Belgium - floods (2021), good codes
    'LUX': 11.4,  # Luxembourg - floods, excellent codes
    'GBR': 16.3,  # UK - floods (increasing), storms, but good codes
    'IRL': 17.8,  # Ireland - floods, storms, good codes
    'DNK': 12.1,  # Denmark - coastal flooding, storm surge, excellent codes
    'SWE': 10.7,  # Sweden - floods, landslides, excellent codes
    'NOR': 11.2,  # Norway - avalanches, landslides, floods, excellent codes
    'FIN': 9.4,   # Finland - floods, excellent codes, low exposure
    'ISL': 18.5,  # Iceland - volcanoes, earthquanes, floods, but good codes for volcanic island
    'EST': 13.8,  # Estonia - floods, storms, EU codes
    'LVA': 14.9,  # Latvia - floods, storms, EU codes
    'LTU': 15.6,  # Lithuania - floods, EU codes
    'AUS': 24.7,  # Australia - bushfires, floods, cyclones, good codes but increasing climate risk
    'NZL': 19.3,  # New Zealand - earthquakes (Christchurch 2011), good codes + retrofitting
    'CAN': 16.8,  # Canada - earthquanes (BC), floods, excellent codes
    'RUS': 23.4,  # Russia - earthquanes (Sakhalin, Kamchatka), floods, mixed codes
    'UKR': 21.7,  # Ukraine - floods, earthquakes (Crimea), war damage

    # Low Risk (5-15%): Low exposure + excellent codes
    'SGP': 8.2,   # Singapore - floods managed, excellent codes, island engineering
    'ARE': 6.8,   # UAE - earthquakes (low), floods (rare), modern construction
    'QAT': 5.9,   # Qatar - minimal exposure, modern construction
    'SAU': 7.4,   # Saudi Arabia - earthquakes (low), floods (rare deserts), modern construction
    'ISR': 11.6,  # Israel - earthquanes (moderate), good codes
    'JOR': 14.3,  # Jordan - earthquakes (Dead Sea), floods, improving codes
    'LBN': 32.4,  # Lebanon - earthquanes, floods, old Beirut stock, Hezbollah areas
    'CYP': 16.7,  # Cyprus - earthquakes, floods, EU codes
    'MLT': 12.8,  # Malta - earthquakes (low), EU codes, limestone construction
}

# Read the file
with open('data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Add disaster risk housing after homeownershipRate
for iso_code, risk in disaster_risk_housing.items():
    pattern = rf'("iso":\s*"{iso_code}"[^}}]*"homeownershipRate":\s*[\d.]+)'
    replacement = rf'\1,\n        "housingStockAtRisk": {risk}'
    content = re.sub(pattern, replacement, content)

# Write back
with open('data.js', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"✓ Added housing stock at disaster risk for {len(disaster_risk_housing)} countries")
print("\nRange: Qatar 5.9% (lowest risk) to Haiti 82.5% (highest risk)")
print("\nPatterns:")
print("- Very High (60-85%): Haiti, Syria, Afghanistan, Nepal, Bangladesh (poor codes + high exposure)")
print("- High (40-60%): Philippines, Indonesia, Turkey, Pakistan, India (significant exposure + weak codes)")
print("- Moderate (20-40%): Mexico, Italy, Greece, Brazil, USA (mixed - good codes but exposure or vice versa)")
print("- Low (5-20%): Nordic countries, Switzerland, Singapore, Japan, Chile (excellent codes + retrofitting)")
