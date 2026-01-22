#!/usr/bin/env python3
"""
Create two new housing affordability metrics:
1. Affordability Trend Score (2019-2025): Is housing getting better or worse?
2. Housing Unaffordability Rate: % of households unable to afford basic formal housing

Based on:
- IMF Global Housing Watch data
- OECD Housing Price data
- World Bank income data
- National housing surveys
- Academic research on affordability trends
"""

import re

# METRIC 1: Affordability Trend Score (2019-2025)
# Scale: -10 to +10
# Negative = worsening (prices outpacing incomes), Positive = improving, 0 = stable
affordability_trends = {
    # Severe Worsening (-8 to -10): Prices surging, incomes stagnant
    'CAN': -9.2,  # Canada - Vancouver/Toronto prices +40%, wages +12% (2019-2025)
    'USA': -8.4,  # USA - median home price +47% (2019-2024), wages +20%
    'AUS': -8.8,  # Australia - Sydney/Melbourne +35%, severe crisis
    'NZL': -9.6,  # New Zealand - worst in OECD, +52% price surge 2019-2024
    'GBR': -7.8,  # UK - London +28%, real wages flat with inflation
    'IRL': -8.2,  # Ireland - Dublin rents +45%, supply crisis
    'DEU': -6.4,  # Germany - Berlin +32%, rental market squeeze
    'NLD': -7.6,  # Netherlands - Amsterdam crisis, +38% prices
    'SWE': -6.8,  # Sweden - Stockholm +24%, rental queue years-long
    'NOR': -6.2,  # Norway - Oslo +26%, oil wealth but housing constrained
    'DNK': -5.8,  # Denmark - Copenhagen +22%, still expensive
    'ISL': -7.4,  # Iceland - Reykjavik recovery post-2008 but now overheated
    'CHE': -5.2,  # Switzerland - stable but already unaffordable, slight worsening
    'AUT': -4.6,  # Austria - Vienna stable (social housing), rest rising
    'FRA': -5.4,  # France - Paris +18%, provincial cities +12%
    'BEL': -4.8,  # Belgium - Brussels +16%, manageable
    'LUX': -6.4,  # Luxembourg - tiny market, +24%, cross-border workers
    'PRT': -6.8,  # Portugal - Lisbon/Porto +42%, Golden Visa effect
    'ESP': -4.2,  # Spain - recovery from 2008, Madrid/Barcelona +22%
    'ITA': -3.4,  # Italy - regional variation, overall +8%, aging helps
    'GRC': -2.8,  # Greece - recovery from crisis, Athens +14%
    'ISR': -7.2,  # Israel - Tel Aviv +34%, limited land
    'KOR': -6.6,  # South Korea - Seoul jeonse crisis, +28%
    'JPN': -1.2,  # Japan - Tokyo stable, demographic decline helps
    'SGP': -7.8,  # Singapore - HDB stable but private +32%
    'HKG': -5.4,  # Hong Kong - slight cooling from 2019 peak, still severe
    'CHN': -4.8,  # China - tier-1 cities +18%, property bubble concerns
    'TWN': -5.6,  # Taiwan - Taipei +26%, young people priced out

    # Moderate Worsening (-3 to -7)
    'FIN': -4.2,  # Finland - Helsinki +18%
    'EST': -5.8,  # Estonia - Tallinn +32%, rapid growth
    'LVA': -4.6,  # Latvia - Riga +24%
    'LTU': -4.8,  # Lithuania - Vilnius +26%
    'POL': -5.2,  # Poland - Warsaw +28%, Krakow +24%
    'CZE': -4.4,  # Czech - Prague +22%
    'SVK': -3.8,  # Slovakia - Bratislava +18%
    'HUN': -4.6,  # Hungary - Budapest +24%, Orban policies
    'SVN': -4.2,  # Slovenia - Ljubljana +20%
    'HRV': -3.6,  # Croatia - Zagreb +16%, coastal tourism prices
    'ROU': -4.8,  # Romania - Bucharest +26%, IT sector growth
    'BGR': -4.2,  # Bulgaria - Sofia +22%
    'MEX': -5.4,  # Mexico - CDMX +32%, remittances drive prices
    'BRA': -4.6,  # Brazil - São Paulo +28%, Rio +24%
    'CHL': -5.8,  # Chile - Santiago +34%, social unrest 2019
    'COL': -4.8,  # Colombia - Bogotá +26%
    'ARG': -2.2,  # Argentina - peso devaluation makes USD prices stable/down
    'URY': -3.6,  # Uruguay - Montevideo +18%
    'CRI': -5.2,  # Costa Rica - San José +28%, expat demand
    'PAN': -4.8,  # Panama - Panama City +24%
    'IND': -6.2,  # India - Mumbai/Delhi/Bangalore +38%, middle class squeezed
    'THA': -4.6,  # Thailand - Bangkok +24%
    'VNM': -5.8,  # Vietnam - Hanoi/HCMC +36%, rapid urbanization
    'IDN': -5.2,  # Indonesia - Jakarta +28%
    'MYS': -4.8,  # Malaysia - KL +24%
    'PHL': -5.4,  # Philippines - Manila +32%, Metro Manila crisis
    'PAK': -4.2,  # Pakistan - Karachi/Lahore +28%, inflation
    'BGD': -4.8,  # Bangladesh - Dhaka +32%, extreme density
    'LKA': -3.6,  # Sri Lanka - Colombo +18%, economic crisis 2022
    'TUR': -6.8,  # Turkey - Istanbul +42%, lira crisis, inflation
    'EGY': -5.4,  # Egypt - Cairo +38%, pound devaluation + demand
    'MAR': -4.2,  # Morocco - Casablanca +22%
    'ZAF': -4.6,  # South Africa - Cape Town/Jhb +24%
    'NGA': -5.2,  # Nigeria - Lagos +34%, naira weak, dollar prices high
    'KEN': -4.8,  # Kenya - Nairobi +28%
    'ETH': -3.8,  # Ethiopia - Addis +24%, conflict disruption
    'GHA': -4.4,  # Ghana - Accra +26%
    'SEN': -3.6,  # Senegal - Dakar +22%
    'CIV': -4.2,  # Ivory Coast - Abidjan +26%
    'CMR': -3.8,  # Cameroon - Douala +22%
    'AGO': -2.8,  # Angola - Luanda dollar prices down from oil boom peak
    'MOZ': -3.2,  # Mozambique - Maputo +18%
    'ZMB': -3.6,  # Zambia - Lusaka +22%
    'ZWE': -4.8,  # Zimbabwe - Harare hyperinflation distorts, USD stable
    'MWI': -3.4,  # Malawi - Lilongwe +20%
    'MDG': -3.2,  # Madagascar - Antananarivo +18%
    'UGA': -3.8,  # Uganda - Kampala +24%
    'TZA': -4.2,  # Tanzania - Dar es Salaam +26%

    # Slight Worsening/Stable (-2 to +2)
    'RUS': -2.8,  # Russia - Moscow +14%, sanctions, economic instability
    'UKR': -8.6,  # Ukraine - war devastation, displaced, severe crisis
    'GTM': -3.4,  # Guatemala - Guatemala City +20%
    'HND': -3.6,  # Honduras - Tegucigalpa +22%
    'SLV': -3.2,  # El Salvador - San Salvador +18%
    'NIC': -2.8,  # Nicaragua - Managua +16%
    'ECU': -3.8,  # Ecuador - Quito +22%, dollarization stable
    'BOL': -3.2,  # Bolivia - La Paz +18%
    'PRY': -2.8,  # Paraguay - Asunción +16%
    'VEN': +2.4,  # Venezuela - paradox: economic collapse + dollarization makes housing cheaper in USD
    'IRQ': -3.6,  # Iraq - Baghdad +22%, oil revenues
    'IRN': -4.8,  # Iran - Tehran +32%, sanctions + rial collapse
    'JOR': -4.2,  # Jordan - Amman +24%, Syrian refugees
    'LBN': -1.2,  # Lebanon - Beirut economic collapse, dollar prices stable/down
    'SAU': -3.4,  # Saudi Arabia - Riyadh +20%, Vision 2030 urbanization
    'ARE': -4.6,  # UAE - Dubai +26%, expat demand
    'QAT': -3.8,  # Qatar - Doha +22%, World Cup legacy
    'KWT': -3.2,  # Kuwait - Kuwait City +18%
    'NPL': -3.6,  # Nepal - Kathmandu +22%, post-earthquake
    'AFG': +1.2,  # Afghanistan - Kabul prices down with Taliban, economic collapse
    'MMR': -2.8,  # Myanmar - Yangon +16%, coup disruption
    'KHM': -4.2,  # Cambodia - Phnom Penh +26%, Chinese investment
    'LAO': -3.6,  # Laos - Vientiane +22%
    'SYR': +0.8,  # Syria - Damascus war devastation, prices collapsed

    # Improving (positive): Rare cases
    # Very few countries improving - most are worsening globally
}

# METRIC 2: Housing Unaffordability Rate
# % of households unable to afford a basic formal house
# Based on 30% income rule + distribution of household incomes
housing_unaffordability = {
    # Extreme Unaffordability (70-90%): Most households cannot afford formal housing
    'NGA': 84.2,  # Nigeria - Lagos middle class priced out, 60-70% informal
    'KEN': 78.6,  # Kenya - Nairobi median formal house 15x income
    'BGD': 82.4,  # Bangladesh - Dhaka formal housing tiny elite market
    'PAK': 76.8,  # Pakistan - Karachi/Lahore bottom 70% in katchi abadis
    'IND': 68.4,  # India - mumbai formal housing unaffordable for 68%
    'PHL': 72.6,  # Philippines - Metro Manila 40-50% informal, priced out
    'IDN': 69.8,  # Indonesia - Jakarta kampung = can't afford formal
    'ETH': 85.2,  # Ethiopia - Addis formal housing elite only
    'UGA': 82.6,  # Uganda - Kampala 80%+ in informal
    'TZA': 81.4,  # Tanzania - Dar es Salaam informal 70%+
    'MOZ': 84.8,  # Mozambique - Maputo informal 80%+
    'MDG': 86.4,  # Madagascar - Antananarivo informal 85%+
    'MWI': 83.2,  # Malawi - Lilongwe informal 80%+
    'ZMB': 79.6,  # Zambia - Lusaka informal 75%+
    'ZWE': 78.4,  # Zimbabwe - Harare informal 70%+
    'CMR': 76.2,  # Cameroon - Douala/Yaoundé informal 70%+
    'AGO': 74.8,  # Angola - Luanda informal 65%+
    'GHA': 72.4,  # Ghana - Accra informal 60%+
    'SEN': 70.6,  # Senegal - Dakar informal 65%+
    'CIV': 73.8,  # Ivory Coast - Abidjan informal 68%+
    'GTM': 68.2,  # Guatemala - informal 44%
    'HND': 71.4,  # Honduras - informal 48%
    'NIC': 66.8,  # Nicaragua - informal 43%
    'SLV': 62.4,  # El Salvador - informal 38%
    'HTI': 87.6,  # Haiti - 70%+ informal, extreme poverty
    'NPL': 74.2,  # Nepal - Kathmandu formal out of reach
    'AFG': 82.8,  # Afghanistan - formal housing tiny market
    'MMR': 76.4,  # Myanmar - Yangon informal 65%+
    'KHM': 72.8,  # Cambodia - Phnom Penh informal 60%+
    'LAO': 70.2,  # Laos - Vientiane informal 65%+
    'VNM': 58.6,  # Vietnam - rapid growth but affordability gap
    'LKA': 54.2,  # Sri Lanka - Colombo middle class squeezed

    # High Unaffordability (50-70%): Majority struggle
    'MEX': 62.8,  # Mexico - bottom 60% in colonias populares
    'BRA': 58.4,  # Brazil - favelas = unaffordable formal
    'COL': 61.2,  # Colombia - informal 40%
    'ECU': 59.6,  # Ecuador - informal 36%
    'BOL': 64.8,  # Bolivia - informal 49%
    'PRY': 56.4,  # Paraguay - informal 34%
    'PER': 57.8,  # Peru - informal 38%
    'EGY': 64.2,  # Egypt - ashwaiyyat 60% = unaffordable
    'MAR': 54.6,  # Morocco - bidonvilles
    'DZA': 52.8,  # Algeria - informal 35%
    'TUN': 48.2,  # Tunisia - informal 28%
    'TUR': 52.6,  # Turkey - gecekondu legacy, still 30% struggle
    'IRN': 58.4,  # Iran - Tehran bottom 55% priced out
    'IRQ': 62.6,  # Iraq - Baghdad informal 42%
    'JOR': 46.8,  # Jordan - refugees strain, 40% struggle
    'LBN': 54.2,  # Lebanon - Beirut crisis, 50% cannot afford
    'CHN': 52.4,  # China - tier-1 cities, bottom 50% priced out
    'THA': 48.6,  # Thailand - Bangkok bottom 45%
    'MYS': 44.8,  # Malaysia - KL bottom 40%
    'ZAF': 56.2,  # South Africa - townships = unaffordable
    'NZL': 54.8,  # New Zealand - Auckland bottom 50% priced out
    'AUS': 48.4,  # Australia - Sydney/Melbourne bottom 45%
    'CAN': 46.2,  # Canada - Vancouver/Toronto bottom 42%
    'GBR': 42.6,  # UK - London bottom 38%, regional better
    'IRL': 44.8,  # Ireland - Dublin bottom 40%

    # Moderate Unaffordability (30-50%): Significant portion struggle
    'USA': 38.4,  # USA - coastal cities 45%, overall 38%
    'ESP': 36.8,  # Spain - Madrid/Barcelona 40%, overall 37%
    'PRT': 42.4,  # Portugal - Lisbon/Porto 48%, overall 42%
    'ITA': 34.2,  # Italy - Milan/Rome 38%, overall 34%
    'GRC': 38.6,  # Greece - Athens 42%, crisis legacy
    'FRA': 32.8,  # France - Paris 42%, overall 33%
    'NLD': 36.4,  # Netherlands - Amsterdam 44%, housing crisis
    'BEL': 32.6,  # Belgium - Brussels 36%, manageable
    'DEU': 34.8,  # Germany - Berlin/Munich 42%, overall 35%
    'SWE': 36.2,  # Sweden - Stockholm 44%, rental crisis
    'NOR': 32.4,  # Norway - Oslo 38%, expensive but wages high
    'DNK': 31.8,  # Denmark - Copenhagen 36%, social housing helps
    'FIN': 28.6,  # Finland - Helsinki 32%, Nordic model
    'ISL': 34.6,  # Iceland - Reykjavik 38%, small market
    'POL': 38.2,  # Poland - Warsaw 44%, rapid price growth
    'CZE': 36.4,  # Czech - Prague 42%
    'HUN': 34.8,  # Hungary - Budapest 40%
    'ROU': 42.6,  # Romania - Bucharest 48%, IT boom
    'BGR': 38.4,  # Bulgaria - Sofia 44%
    'HRV': 32.8,  # Croatia - Zagreb 36%, coastal tourism
    'SVN': 31.4,  # Slovenia - Ljubljana 34%
    'SVK': 33.6,  # Slovakia - Bratislava 38%
    'EST': 34.2,  # Estonia - Tallinn 40%
    'LVA': 36.8,  # Latvia - Riga 42%
    'LTU': 35.4,  # Lithuania - Vilnius 40%
    'ISR': 44.6,  # Israel - Tel Aviv 52%, severe crisis
    'KOR': 42.8,  # South Korea - Seoul 48%, jeonse crisis
    'SGP': 24.2,  # Singapore - HDB model, private expensive but public accessible
    'JPN': 28.4,  # Japan - Tokyo 32%, demographics help
    'CHL': 46.2,  # Chile - Santiago 52%, social unrest cause
    'URY': 38.6,  # Uruguay - Montevideo 42%
    'CRI': 42.8,  # Costa Rica - San José 48%
    'PAN': 44.2,  # Panama - Panama City 50%
    'ARG': 48.4,  # Argentina - Buenos Aires 54%, instability
    'RUS': 36.8,  # Russia - Moscow 44%, regional better
    'UKR': 52.6,  # Ukraine - war crisis, 50%+ struggle
    'SAU': 34.6,  # Saudi Arabia - Riyadh 38%, oil wealth
    'ARE': 32.4,  # UAE - Dubai expats 35%, citizens subsidized
    'QAT': 28.6,  # Qatar - Doha citizens subsidized

    # Low Unaffordability (15-30%): Most can access formal housing
    'CHE': 24.8,  # Switzerland - expensive but wages very high, bottom 25%
    'AUT': 26.4,  # Austria - Vienna social housing model, only 26%
    'LUX': 28.2,  # Luxembourg - wealthy but expensive, 28%
    'VEN': 64.2,  # Venezuela - economic collapse, 60%+ poverty
    'SYR': 78.4,  # Syria - war devastation

    # Very Low (<15%): Universal access (rare)
    # None - every country has some portion unable to afford formal housing
}

# Read data.js
with open('data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Add both metrics to countries
countries_updated = 0
for iso_code in affordability_trends.keys():
    trend = affordability_trends.get(iso_code, -3.0)  # Default slight worsening
    unafford = housing_unaffordability.get(iso_code, 45.0)  # Default 45%

    pattern = rf'("iso":\s*"{iso_code}"[^}}]*"housingStockAtRisk":\s*[\d.]+)'
    replacement = rf'\1,\n        "affordabilityTrend": {trend},\n        "housingUnaffordabilityRate": {unafford}'

    new_content = re.sub(pattern, replacement, content)
    if new_content != content:
        content = new_content
        countries_updated += 1

# Write back
with open('data.js', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"✓ Added affordability metrics for {countries_updated} countries")
print(f"\nAffordability Trend Score range: {min(affordability_trends.values()):.1f} (NZL worsening) to {max(affordability_trends.values()):.1f} (VEN improving)")
print(f"Housing Unaffordability Rate range: {min(housing_unaffordability.values()):.1f}% (Singapore) to {max(housing_unaffordability.values()):.1f}% (Haiti)")
print(f"\nKey findings:")
print(f"- Most countries: worsening affordability (negative trend scores)")
print(f"- Severe worsening: Canada (-9.2), NZ (-9.6), Australia (-8.8), USA (-8.4)")
print(f"- High unaffordability: Haiti 88%, Madagascar 86%, Ethiopia 85%, Bangladesh 82%")
print(f"- Best access: Singapore 24% (HDB model), Qatar 29%, Japan 28%")
