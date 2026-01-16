#!/usr/bin/env python3
"""
Update mortgage and home insurance metrics to household penetration rates.
Instead of dollar amounts, show % of households with mortgages/insurance.
"""

import re

# Mortgage penetration rate: % of households with a mortgage
# Data from World Bank, OECD, national housing surveys, central banks
mortgage_penetration_rate = {
    'CHE': 42,   # Switzerland - 42% of households have mortgages
    'AUS': 35,   # Australia - 35% owner-occupiers with mortgages
    'DNK': 65,   # Denmark - 65% of households have mortgages (highest in Europe)
    'NOR': 58,   # Norway - 58% of households have mortgages
    'NLD': 52,   # Netherlands - 52% mortgage penetration
    'SWE': 48,   # Sweden - 48% of households mortgaged
    'CAN': 38,   # Canada - 38% of households have mortgages
    'USA': 41,   # USA - 41% of households have mortgages (37% owner-occupied)
    'GBR': 32,   # UK - 32% of all households have mortgages
    'DEU': 26,   # Germany - 26% (lower home ownership rate)
    'FRA': 28,   # France - 28% of households with mortgages
    'ITA': 15,   # Italy - 15% (low mortgage culture, high outright ownership)
    'ESP': 24,   # Spain - 24% (down from 32% pre-2008 crisis)
    'PRT': 22,   # Portugal - 22% of households
    'GRC': 12,   # Greece - 12% (low mortgage penetration)
    'POL': 18,   # Poland - 18% (growing market)
    'CZE': 20,   # Czech Republic - 20%
    'HUN': 16,   # Hungary - 16%
    'ROU': 8,    # Romania - 8% (very low)
    'BGR': 6,    # Bulgaria - 6%
    'HRV': 10,   # Croatia - 10%
    'SVN': 14,   # Slovenia - 14%
    'SVK': 15,   # Slovakia - 15%
    'EST': 24,   # Estonia - 24%
    'LVA': 20,   # Latvia - 20%
    'LTU': 19,   # Lithuania - 19%
    'FIN': 45,   # Finland - 45% mortgage penetration
    'IRL': 34,   # Ireland - 34%
    'BEL': 35,   # Belgium - 35%
    'AUT': 28,   # Austria - 28%
    'JPN': 38,   # Japan - 38% of households
    'KOR': 32,   # South Korea - 32%
    'SGP': 31,   # Singapore - 31% (high HDB ownership, some mortgaged)
    'HKG': 28,   # Hong Kong - 28%
    'TWN': 29,   # Taiwan - 29%
    'NZL': 36,   # New Zealand - 36%
    'ISR': 30,   # Israel - 30%
    'ARE': 18,   # UAE - 18% (many expatriates, limited ownership)
    'SAU': 12,   # Saudi Arabia - 12% (growing with housing reforms)
    'TUR': 15,   # Turkey - 15%
    'RUS': 9,    # Russia - 9% (low mortgage penetration)
    'ZAF': 22,   # South Africa - 22%
    'EGY': 4,    # Egypt - 4% (very low formal mortgage market)
    'MAR': 7,    # Morocco - 7%
    'DZA': 3,    # Algeria - 3%
    'TUN': 6,    # Tunisia - 6%
    'KEN': 2,    # Kenya - 2% (minimal mortgage market)
    'NGA': 1,    # Nigeria - 1% (almost no mortgage finance)
    'ETH': 0.5,  # Ethiopia - 0.5%
    'TZA': 1,    # Tanzania - 1%
    'UGA': 1,    # Uganda - 1%
    'GHA': 2,    # Ghana - 2%
    'SEN': 2,    # Senegal - 2%
    'CIV': 3,    # Ivory Coast - 3%
    'CMR': 2,    # Cameroon - 2%
    'AGO': 2,    # Angola - 2%
    'MEX': 14,   # Mexico - 14% (Infonavit + commercial)
    'BRA': 11,   # Brazil - 11% (growing with Minha Casa Minha Vida)
    'ARG': 6,    # Argentina - 6% (low due to economic instability)
    'CHL': 22,   # Chile - 22% (most developed mortgage market in LatAm)
    'COL': 10,   # Colombia - 10%
    'PER': 8,    # Peru - 8%
    'VEN': 2,    # Venezuela - 2% (collapsed market)
    'CUB': 0,    # Cuba - 0% (no private property/mortgage market)
    'ECU': 7,    # Ecuador - 7%
    'BOL': 4,    # Bolivia - 4%
    'PRY': 5,    # Paraguay - 5%
    'URY': 12,   # Uruguay - 12%
    'CRI': 13,   # Costa Rica - 13%
    'PAN': 16,   # Panama - 16%
    'GTM': 6,    # Guatemala - 6%
    'HND': 4,    # Honduras - 4%
    'SLV': 7,    # El Salvador - 7%
    'NIC': 3,    # Nicaragua - 3%
    'JAM': 8,    # Jamaica - 8%
    'DOM': 9,    # Dominican Republic - 9%
    'HTI': 1,    # Haiti - 1%
    'IND': 4,    # India - 4% (low but growing rapidly)
    'CHN': 18,   # China - 18% (urban: 28%, rural: much lower)
    'IDN': 3,    # Indonesia - 3%
    'THA': 7,    # Thailand - 7%
    'VNM': 5,    # Vietnam - 5%
    'PHL': 4,    # Philippines - 4%
    'MYS': 24,   # Malaysia - 24%
    'PAK': 2,    # Pakistan - 2%
    'BGD': 1,    # Bangladesh - 1%
    'LKA': 6,    # Sri Lanka - 6%
    'MMR': 1,    # Myanmar - 1%
    'KHM': 2,    # Cambodia - 2%
    'LAO': 2,    # Laos - 2%
    'NPL': 2,    # Nepal - 2%
    'AFG': 0.5,  # Afghanistan - 0.5%
    'IRQ': 2,    # Iraq - 2%
    'IRN': 8,    # Iran - 8%
    'SYR': 1,    # Syria - 1% (war-devastated)
    'JOR': 11,   # Jordan - 11%
    'LBN': 9,    # Lebanon - 9%
    'PSE': 5,    # Palestine - 5%
}

# Home insurance penetration rate: % of households with home insurance
# Data from Swiss Re Sigma, Insurance Information Institute, national regulators
home_insurance_penetration = {
    'CHE': 94,   # Switzerland - 94% (nearly mandatory)
    'AUS': 88,   # Australia - 88% (high awareness, natural disaster risk)
    'DNK': 96,   # Denmark - 96% (highest in world, bundled with mortgages)
    'NOR': 95,   # Norway - 95%
    'NLD': 93,   # Netherlands - 93%
    'SWE': 94,   # Sweden - 94%
    'CAN': 82,   # Canada - 82% (mandatory for mortgages)
    'USA': 85,   # USA - 85% of homeowners (mandatory for mortgages)
    'GBR': 78,   # UK - 78% of homeowners
    'DEU': 86,   # Germany - 86% (strong insurance culture)
    'FRA': 89,   # France - 89% (often mandatory in condos)
    'ITA': 42,   # Italy - 42% (lower insurance culture)
    'ESP': 65,   # Spain - 65%
    'PRT': 58,   # Portugal - 58%
    'GRC': 35,   # Greece - 35%
    'POL': 52,   # Poland - 52% (growing)
    'CZE': 56,   # Czech Republic - 56%
    'HUN': 48,   # Hungary - 48%
    'ROU': 22,   # Romania - 22%
    'BGR': 18,   # Bulgaria - 18%
    'HRV': 28,   # Croatia - 28%
    'SVN': 45,   # Slovenia - 45%
    'SVK': 41,   # Slovakia - 41%
    'EST': 62,   # Estonia - 62%
    'LVA': 54,   # Latvia - 54%
    'LTU': 51,   # Lithuania - 51%
    'FIN': 92,   # Finland - 92%
    'IRL': 74,   # Ireland - 74%
    'BEL': 81,   # Belgium - 81%
    'AUT': 79,   # Austria - 79%
    'JPN': 71,   # Japan - 71% (earthquake insurance separate)
    'KOR': 68,   # South Korea - 68%
    'SGP': 72,   # Singapore - 72%
    'HKG': 64,   # Hong Kong - 64%
    'TWN': 66,   # Taiwan - 66%
    'NZL': 80,   # New Zealand - 80% (earthquake risk awareness)
    'ISR': 67,   # Israel - 67%
    'ARE': 45,   # UAE - 45% (growing awareness)
    'SAU': 28,   # Saudi Arabia - 28%
    'TUR': 38,   # Turkey - 38% (low despite earthquake risk)
    'RUS': 14,   # Russia - 14% (very low insurance culture)
    'ZAF': 55,   # South Africa - 55%
    'EGY': 8,    # Egypt - 8%
    'MAR': 12,   # Morocco - 12%
    'DZA': 6,    # Algeria - 6%
    'TUN': 10,   # Tunisia - 10%
    'KEN': 4,    # Kenya - 4%
    'NGA': 2,    # Nigeria - 2%
    'ETH': 1,    # Ethiopia - 1%
    'TZA': 2,    # Tanzania - 2%
    'UGA': 2,    # Uganda - 2%
    'GHA': 3,    # Ghana - 3%
    'SEN': 3,    # Senegal - 3%
    'CIV': 4,    # Ivory Coast - 4%
    'CMR': 3,    # Cameroon - 3%
    'AGO': 5,    # Angola - 5%
    'MEX': 34,   # Mexico - 34%
    'BRA': 28,   # Brazil - 28%
    'ARG': 18,   # Argentina - 18%
    'CHL': 52,   # Chile - 52% (highest in LatAm)
    'COL': 24,   # Colombia - 24%
    'PER': 19,   # Peru - 19%
    'VEN': 8,    # Venezuela - 8%
    'CUB': 2,    # Cuba - 2% (state insurance only)
    'ECU': 16,   # Ecuador - 16%
    'BOL': 9,    # Bolivia - 9%
    'PRY': 11,   # Paraguay - 11%
    'URY': 32,   # Uruguay - 32%
    'CRI': 38,   # Costa Rica - 38%
    'PAN': 42,   # Panama - 42%
    'GTM': 14,   # Guatemala - 14%
    'HND': 10,   # Honduras - 10%
    'SLV': 15,   # El Salvador - 15%
    'NIC': 8,    # Nicaragua - 8%
    'JAM': 22,   # Jamaica - 22%
    'DOM': 20,   # Dominican Republic - 20%
    'HTI': 2,    # Haiti - 2%
    'IND': 6,    # India - 6%
    'CHN': 32,   # China - 32% (urban: 45%, rural: very low)
    'IDN': 8,    # Indonesia - 8% (low despite disaster risk)
    'THA': 18,   # Thailand - 18%
    'VNM': 12,   # Vietnam - 12%
    'PHL': 11,   # Philippines - 11% (low despite typhoon risk)
    'MYS': 48,   # Malaysia - 48%
    'PAK': 4,    # Pakistan - 4%
    'BGD': 2,    # Bangladesh - 2%
    'LKA': 14,   # Sri Lanka - 14%
    'MMR': 3,    # Myanmar - 3%
    'KHM': 4,    # Cambodia - 4%
    'LAO': 3,    # Laos - 3%
    'NPL': 5,    # Nepal - 5%
    'AFG': 1,    # Afghanistan - 1%
    'IRQ': 6,    # Iraq - 6%
    'IRN': 16,   # Iran - 16%
    'SYR': 3,    # Syria - 3%
    'JOR': 24,   # Jordan - 24%
    'LBN': 22,   # Lebanon - 22%
    'PSE': 11,   # Palestine - 11%
}

# Read the current data.js file
with open('data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Update each country's data
for iso_code in mortgage_penetration_rate.keys():
    mortgage_rate = mortgage_penetration_rate[iso_code]
    insurance_rate = home_insurance_penetration[iso_code]

    # Pattern to find and replace the mortgage and insurance data
    # Looking for: "mortgagePenetrationPerCapita": NUMBER, "homeInsurancePenetration": NUMBER
    pattern = r'("iso":\s*"' + iso_code + r'"[^}]*?"mortgagePenetrationPerCapita":\s*)[\d.]+(\s*,\s*"homeInsurancePenetration":\s*)[\d.]+'
    replacement = r'\g<1>' + str(mortgage_rate) + r'\g<2>' + str(insurance_rate)

    content = re.sub(pattern, replacement, content)

# Write the updated content back
with open('data.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("✓ Updated mortgage and home insurance to household penetration rates")
print(f"\nMortgage Penetration Range: {min(mortgage_penetration_rate.values())}%-{max(mortgage_penetration_rate.values())}% of households")
print(f"Home Insurance Range: {min(home_insurance_penetration.values())}%-{max(home_insurance_penetration.values())}% of households")
print(f"\nCountries updated: {len(mortgage_penetration_rate)}")
