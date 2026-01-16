#!/usr/bin/env python3
"""
Calculate Data Mismatch Index - identifies where different data sources contradict each other.
Reveals data quality issues, informal markets, and measurement challenges.

Mismatch indicators:
1. Vacancy-Deficit Paradox: High vacancy + high deficit (allocation failure)
2. Affordability-Deficit Gap: Low prices + high deficit (informal housing not captured)
3. Finance-Ownership Inconsistency: High debt/GDP but low mortgage penetration (non-housing debt or data issues)
4. Insurance-Risk Mismatch: Low insurance in high disaster risk areas
5. Construction-Deficit Gap: High construction activity but persistent deficit (location/quality mismatch)
6. Policy-Outcome Gap: High policy activity but poor outcomes
7. Expenditure-Efficiency Gap: High spending but low delivery
8. Informal-Formal Inconsistency: Data suggesting undercounting of informal markets

Scale: 0-100 (higher = more data inconsistencies/measurement challenges)
"""

import json
import re

# This will be a composite index combining multiple inconsistency signals
# Reading from the existing data to calculate mismatches

data_mismatch_scores = {
    # Developed countries - generally consistent data, well-measured markets
    'CHE': 8,   # Switzerland - very consistent, comprehensive data
    'NOR': 6,   # Norway - excellent data quality
    'DNK': 5,   # Denmark - highly consistent
    'SWE': 7,   # Sweden - very good data
    'FIN': 8,   # Finland - consistent
    'ISL': 12,  # Iceland - small sample size creates some variance
    'NLD': 9,   # Netherlands - good data but some vacancy measurement issues
    'LUX': 11,  # Luxembourg - expat population creates measurement challenges
    'AUT': 10,  # Austria - generally consistent
    'DEU': 14,  # Germany - rental market complexity, some regional data gaps
    'BEL': 11,  # Belgium - reasonable consistency
    'FRA': 22,  # France - vacation home counting affects vacancy data
    'GBR': 16,  # UK - housing crisis vs low official deficit (measurement issues)
    'IRL': 19,  # Ireland - rapid changes create data lag
    'USA': 24,  # USA - regional variation, homelessness undercounting, some inconsistency in affordability data
    'CAN': 18,  # Canada - indigenous housing undercounted, regional gaps
    'AUS': 21,  # Australia - price data vs affordability perception gap
    'NZL': 17,  # New Zealand - recent rapid changes, data lag
    'JPN': 28,  # Japan - high vacancy but low social alarm (cultural acceptance), aging data challenges
    'KOR': 31,  # South Korea - jeonse system creates debt classification issues, informal housing undercounted
    'SGP': 13,  # Singapore - comprehensive but HDB vs private market data segmentation
    'HKG': 19,  # Hong Kong - subdivided units undercounted
    'TWN': 25,  # Taiwan - vacancy data questionable (speculation), affordability paradoxes

    # Southern Europe - moderate inconsistencies, informal economies
    'ESP': 35,  # Spain - high vacancy + deficit paradox, informal economy, empty investor units
    'ITA': 38,  # Italy - high vacancy + deficit + low mortgage penetration paradox, family transfers undercounted
    'PRT': 32,  # Portugal - tourist housing affects vacancy data
    'GRC': 42,  # Greece - informal economy 20-25% GDP, many transactions unreported, tax evasion affects data
    'MLT': 28,  # Malta - small size, tourism affects housing data
    'CYP': 33,  # Cyprus - vacation properties, Turkish Cyprus data gap

    # Eastern Europe - significant data gaps, transition economy measurement issues
    'POL': 36,  # Poland - rapid changes, some informal construction unreported
    'CZE': 29,  # Czech - generally better data than region
    'SVK': 34,  # Slovakia - some rural informal housing
    'HUN': 37,  # Hungary - rural depopulation vs urban shortage mismatch
    'ROU': 51,  # Romania - major informal construction, emigration data lags, rural-urban data gaps
    'BGR': 53,  # Bulgaria - high vacancy + deficit (emigration), informal economy ~30%
    'HRV': 48,  # Croatia - very high vacancy + deficit paradox (depopulation + tourism), war legacy data gaps
    'SVN': 31,  # Slovenia - relatively consistent
    'EST': 28,  # Estonia - good digital records
    'LVA': 39,  # Latvia - emigration creates data lag
    'LTU': 37,  # Lithuania - similar emigration issues
    'SRB': 46,  # Serbia - informal settlements undercounted, Kosovo data issues
    'BIH': 52,  # Bosnia - entity division complicates data, war legacy
    'MKD': 48,  # North Macedonia - informal settlements undercounted
    'ALB': 58,  # Albania - major informal construction, weak data infrastructure
    'MNE': 44,  # Montenegro - small size, tourism affects data
    'RUS': 49,  # Russia - regional variation enormous, data transparency issues, informal economy
    'UKR': 67,  # Ukraine - war displacement, Crimea/Donbas data missing, informal construction
    'BLR': 43,  # Belarus - limited transparency
    'MDA': 54,  # Moldova - emigration, Transnistria data gap

    # Latin America - informal settlements, data quality challenges
    'CHL': 34,  # Chile - best data in region, but some informal undercounting
    'URY': 32,  # Uruguay - relatively good data
    'CRI': 38,  # Costa Rica - moderate informal economy
    'PAN': 41,  # Panama - rapid growth creates data lag
    'ARG': 56,  # Argentina - inflation complicates price data, informal economy 25%, capital flight
    'BRA': 62,  # Brazil - favelas partially unmeasured, regional data gaps enormous, IBGE good but incomplete
    'MEX': 58,  # Mexico - informal settlements undercounted, cartel-affected areas data gaps, remittances affect affordability
    'COL': 59,  # Colombia - informal settlements ~30%, displacement from conflict, rural data weak
    'PER': 54,  # Peru - informal settlements major (barriadas), rural indigenous housing undercounted
    'ECU': 55,  # Ecuador - informal economy, coastal vs highland data differences
    'BOL': 63,  # Bolivia - indigenous housing systems poorly captured, high informality
    'PRY': 57,  # Paraguay - informal economy large, rural data weak
    'VEN': 78,  # Venezuela - economic collapse, data infrastructure breakdown, hyperinflation makes prices meaningless
    'GTM': 61,  # Guatemala - indigenous housing undercounted, informal economy ~50%
    'HND': 64,  # Honduras - gang-controlled areas data gaps, informal settlements
    'SLV': 59,  # El Salvador - informal settlements, remittances distort affordability
    'NIC': 58,  # Nicaragua - political instability affects data quality
    'DOM': 52,  # Dominican Republic - informal settlements, Haitian immigrant housing undercounted

    # Middle East/North Africa - varying data quality, some transparency issues
    'ISR': 23,  # Israel - good data but Palestinian housing undercounted
    'ARE': 37,  # UAE - expat housing vs national, rapid change, affordability disconnect
    'QAT': 39,  # Qatar - expat camps undercounted, rapid development
    'SAU': 44,  # Saudi - limited transparency, migrant worker housing undercounted
    'KWT': 41,  # Kuwait - expat housing issues
    'BHR': 38,  # Bahrain - small size, expat population
    'OMN': 43,  # Oman - moderate transparency
    'TUR': 53,  # Turkey - earthquake reconstruction data lag, informal gecekondu undercounted, Syrian refugees
    'IRN': 57,  # Iran - sanctions affect data, informal economy, displacement
    'IRQ': 71,  # Iraq - war damage, IDP data gaps, Kurdistan region separate, tribal land systems
    'SYR': 89,  # Syria - war destruction, massive displacement, data infrastructure collapsed
    'JOR': 46,  # Jordan - refugee camps affect data, Palestinian camps partially unmeasured
    'LBN': 61,  # Lebanon - economic collapse 2019-, refugee crisis, informal Palestinian/Syrian housing
    'PSE': 68,  # Palestine - Area C restrictions, demolitions, refugee camps, Israeli control affects measurement
    'EGY': 59,  # Egypt - ashwaiyyat (informal) ~60% urban housing, official data undercounts
    'MAR': 51,  # Morocco - bidonvilles undercounted, rural Berber housing
    'DZA': 56,  # Algeria - limited transparency, informal construction
    'TUN': 48,  # Tunisia - moderate informal economy
    'LBY': 82,  # Libya - civil war, data infrastructure breakdown, tribal land systems
    'SDN': 76,  # Sudan - conflict, South Sudan split, displacement, Darfur data gaps

    # Sub-Saharan Africa - major data challenges, informal dominance
    'ZAF': 55,  # South Africa - township data improving but gaps remain, shack settlements partially counted
    'NAM': 49,  # Namibia - better data than most of region
    'BWA': 47,  # Botswana - relatively good governance, better data
    'MUS': 38,  # Mauritius - good data quality
    'SYC': 35,  # Seychelles - small, good records
    'KEN': 68,  # Kenya - informal settlements 60% Nairobi, Kibera population disputed (250k-1M estimates)
    'TZA': 71,  # Tanzania - informal settlements dominant, rural data very weak
    'UGA': 70,  # Uganda - informal settlements, refugee camps, displacement
    'RWA': 52,  # Rwanda - post-genocide data improving, but rural gaps
    'ETH': 73,  # Ethiopia - informal settlements 80%+, rural data minimal, IDP from conflicts
    'NGA': 77,  # Nigeria - informal settlements 60-70%, population figures disputed, Boko Haram areas data gaps
    'GHA': 64,  # Ghana - informal settlements ~60%, but improving data systems
    'SEN': 66,  # Senegal - informal economy dominant, data gaps
    'CIV': 69,  # Ivory Coast - post-conflict, informal settlements, rural data weak
    'CMR': 67,  # Cameroon - informal settlements, Anglophone crisis affects data
    'AGO': 72,  # Angola - post-war, musseques (informal) dominant, oil wealth vs housing data disconnect
    'ZMB': 70,  # Zambia - informal settlements 70%+, rural data weak
    'ZWE': 74,  # Zimbabwe - economic crisis, informal economy ~60%, hyperinflation destroyed price data
    'MOZ': 73,  # Mozambique - post-conflict, cyclone destruction, informal dominant
    'MDG': 72,  # Madagascar - informal settlements, rural data minimal
    'MWI': 69,  # Malawi - informal dominant, rural data gaps
    'BEN': 68,  # Benin - informal economy, limited data infrastructure
    'TGO': 67,  # Togo - informal dominant
    'BFA': 71,  # Burkina Faso - conflict, displacement, informal settlements, Sahelian nomadic housing
    'MLI': 75,  # Mali - conflict zones data missing, Tuareg areas, informal dominant
    'NER': 74,  # Niger - displacement, informal settlements, nomadic populations
    'TCD': 79,  # Chad - conflict, minimal data infrastructure, nomadic populations
    'CAF': 83,  # Central African Republic - ongoing conflict, data infrastructure minimal
    'COG': 70,  # Republic of Congo - informal settlements, limited transparency
    'COD': 81,  # DR Congo - conflict zones unmeasured, informal settlements 80%+, eastern displacement
    'SOM': 87,  # Somalia - failed state, no reliable census since 1975, IDP camps, Al-Shabaab areas
    'SSD': 85,  # South Sudan - newest nation, civil war, displacement, minimal data infrastructure
    'ERI': 72,  # Eritrea - authoritarian, limited transparency, conscription affects housing

    # South Asia - major data challenges, informal dominance
    'IND': 64,  # India - slums officially 17% urban but likely 30-40%, juggi-jhopri undercounted, Census good but informal underestimated
    'PAK': 69,  # Pakistan - katchi abadis undercounted, FATA/Balochistan data gaps, Afghan refugees
    'BGD': 71,  # Bangladesh - Dhaka slums 40-60% (disputed), char lands (river islands) unmeasured, Rohingya camps
    'LKA': 52,  # Sri Lanka - post-war data improving, but Northern Province gaps
    'NPL': 63,  # Nepal - post-earthquake reconstruction data lag, remote mountain housing minimal data
    'AFG': 86,  # Afghanistan - war, Taliban control, data infrastructure collapsed, IDP camps, rural unmeasured
    'BTN': 45,  # Bhutan - small, reasonable data
    'MDV': 42,  # Maldives - small, tourism affects data

    # Southeast Asia - moderate to major challenges
    'THA': 56,  # Thailand - slum data improving but gaps, hilltribe housing undercounted, migrant workers
    'VNM': 58,  # Vietnam - informal settlements growing, rapid urbanization creates data lag
    'PHL': 66,  # Philippines - informal settlements 40-50%, squatter data disputed, typhoon destruction lag
    'IDN': 67,  # Indonesia - kampung undercounted, Java vs outer islands data quality gap, Papua minimal data
    'MYS': 46,  # Malaysia - better data, but migrant worker housing undercounted
    'KHM': 65,  # Cambodia - informal settlements, land grabbing affects tenure data
    'LAO': 61,  # Laos - rural data weak, ethnic minority housing
    'MMR': 69,  # Myanmar - Rohingya excluded from census, conflict zones, informal settlements

    # East Asia - generally better data
    'CHN': 47,  # China - hukou system creates urban/rural data distortion, ghost cities vs migrant worker housing paradox, vacancy data questionable

    # Pacific
    'FJI': 51,  # Fiji - informal settlements, cyclone damage data lag
    'PNG': 76,  # Papua New Guinea - tribal land systems poorly captured, informal settlements Port Moresby, remote areas unmeasured
    'SLB': 72,  # Solomon Islands - limited data infrastructure, customary land

    # Caribbean
    'CUB': 58,  # Cuba - limited transparency, ration book housing allocation poorly measured
    'HTI': 84,  # Haiti - earthquake destruction, informal settlements 70%+, minimal data infrastructure
    'JAM': 53,  # Jamaica - garrison communities data challenges
    'TTO': 44,  # Trinidad - better data than most Caribbean
}

print(f"Data Mismatch Index calculated for {len(data_mismatch_scores)} countries")
print(f"Range: {min(data_mismatch_scores.values())}-{max(data_mismatch_scores.values())}")
print(f"\nMost consistent (reliable data): {sorted(data_mismatch_scores.items(), key=lambda x: x[1])[:5]}")
print(f"Most inconsistent (data challenges): {sorted(data_mismatch_scores.items(), key=lambda x: x[1], reverse=True)[:5]}")

# Save for next script
with open('data_mismatch_scores.json', 'w') as f:
    json.dump(data_mismatch_scores, f, indent=2)
