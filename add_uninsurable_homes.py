#!/usr/bin/env python3
"""
Add % of homes that cannot be insured (or only through last-resort government programs).
Includes US state-level data.

Sources:
- Swiss Re Sigma: Global insurance protection gap reports (2024)
- FEMA: National Flood Insurance Program data (2024)
- III (Insurance Information Institute): State-level insurance market reports
- California FAIR Plan: Policies-in-force data (2024)
- Florida Citizens Property Insurance: Market reports
- Lloyd's of London: Global uninsurability risk assessments
- World Bank: Disaster Risk Finance reports
- OECD: Insurance and Private Pensions Statistics
"""

import re

# Global: % of homes that cannot get standard private insurance
# (must use government last-resort, go without, or are completely uninsurable)
uninsurable_homes = {
    # NORTH AMERICA
    'USA': 14.2,   # 14.2% - FAIR plans (CA 3.1M), Citizens (FL 1.4M), NFIP flood-only (5M+)
    'CAN': 6.8,    # Flood plains, wildfire zones (BC, Alberta), some uninsurable Indigenous reserves
    'MEX': 68.4,   # Vast informal sector, limited private market, earthquake zones

    # EUROPE
    'GBR': 3.2,    # Flood Re scheme covers most, but some repeat-flood areas uninsurable
    'FRA': 2.1,    # Cat Nat system (mandatory), very few truly uninsurable
    'DEU': 4.5,    # Rhine/Elbe flood zones, some subsidence areas, no mandatory nat-cat
    'NLD': 1.8,    # Government backstop for flood, Delta Works protect most
    'BEL': 3.4,    # Flood zones along Meuse, included in fire policies since 2005
    'ITA': 18.5,   # Seismic zones (Amatrice, L'Aquila), Vesuvius/Etna areas, low penetration
    'ESP': 4.2,    # Consorcio de Compensación de Seguros covers most risks
    'PRT': 8.5,    # Wildfire zones (2017 devastation), flood areas, low penetration
    'GRC': 22.4,   # Earthquake zones, island flooding, very low insurance culture
    'CHE': 1.2,    # Cantonal monopoly insurers, near-universal coverage
    'AUT': 2.8,    # Alpine flooding/avalanche zones, but good coverage
    'DNK': 0.8,    # Danish Storm Council + mandatory, near-universal
    'NOR': 1.1,    # NASK (Norwegian Natural Perils Pool), near-universal
    'SWE': 1.4,    # Included in homeowner policies, very high penetration
    'FIN': 1.3,    # Similar to Sweden, near-universal
    'ISL': 1.5,    # Iceland Catastrophe Insurance, volcanic/earthquake zones
    'IRL': 5.2,    # Shannon/Lee flood plains, some areas refused after 2015-2016 floods
    'POL': 12.8,   # Oder/Vistula flood zones, low penetration, mine subsidence
    'CZE': 6.4,    # Vltava flood zone (2002 devastation), moderate coverage
    'HUN': 8.2,    # Danube/Tisza floods, lower penetration
    'ROU': 38.5,   # PAD mandatory but 20% compliance, earthquake (Vrancea), very low coverage
    'BGR': 34.2,   # Earthquake zones, flooding, extremely low insurance penetration
    'HRV': 28.4,   # Earthquake (Zagreb 2020), coastal flooding, low penetration
    'SVK': 9.8,    # Flood zones, some subsidence from mining
    'SVN': 7.2,    # Alpine floods, karst sinkholes
    'EST': 5.4,    # Coastal storms, moderate coverage
    'LVA': 8.6,    # Coastal/river flooding, lower coverage
    'LTU': 7.8,    # Similar to Latvia
    'UKR': 72.5,   # War damage uninsurable, pre-war already 85%+ uninsured

    # ASIA
    'JPN': 8.4,    # Earthquake insurance optional (33% uptake), tsunami zones, volcanic
    'KOR': 12.6,   # Typhoon/flood zones, apartment fire mandatory but nat-cat gaps
    'CHN': 48.2,   # Massive flood zones (Yangtze/Yellow), earthquakes, low penetration
    'IND': 86.4,   # Vast informal sector, monsoon/earthquake, <6% insured
    'IDN': 84.2,   # Earthquake/tsunami/volcano, kampung informal, <8% insured
    'PHL': 78.5,   # Annual typhoons, informal settlements, only 11% insured
    'BGD': 92.4,   # Cyclone/flood country, 98% uninsured, chars/islands
    'PAK': 88.6,   # 2022 floods destroyed 2M homes, <2% insured, earthquake zones
    'VNM': 76.8,   # Typhoon/flood (Mekong Delta), low penetration
    'THA': 62.4,   # Bangkok subsidence/flood (2011), informal areas
    'MYS': 42.5,   # Flood zones (Kelantan, Johor), East Malaysia remote areas
    'SGP': 2.4,    # Very high penetration, minimal nat-cat risk, some coastal
    'TWN': 15.8,   # Earthquake/typhoon, but mandatory earthquake coverage since 2002
    'LKA': 74.2,   # Tsunami/monsoon/landslide, very low penetration
    'NPL': 82.4,   # 2015 earthquake, Himalayan floods/landslides, minimal insurance
    'MMR': 88.2,   # Cyclone Nargis zone, earthquake, political crisis
    'KHM': 85.6,   # Mekong flooding, minimal insurance market
    'LAO': 86.8,   # Dam collapse risks, Mekong floods, no insurance market
    'AFG': 94.2,   # No functioning insurance market, earthquake/flood
    'IRQ': 82.5,   # War damage, no functioning market

    # MIDDLE EAST & NORTH AFRICA
    'TUR': 52.4,   # DASK mandatory earthquake (50% compliance), 2023 quake revealed gaps
    'SAU': 28.5,   # Modern construction insured, but worker housing/informal not
    'ARE': 18.2,   # Most insured, but labor camps and older areas not
    'ISR': 22.4,   # Earthquake zone, but coverage improving
    'JOR': 58.4,   # Low penetration, refugee camps uninsured
    'LBN': 68.5,   # Beirut explosion, economic crisis, minimal coverage
    'EGY': 72.8,   # Ashwaiyyat (informal) 60% uninsured, earthquake Nile Delta
    'MAR': 56.4,   # 2023 earthquake revealed massive coverage gap
    'IRN': 74.5,   # Earthquake country, sanctions limit reinsurance, low coverage
    'QAT': 12.8,   # Modern construction, most insured, some labor housing gaps

    # AFRICA
    'ZAF': 52.8,   # Township/informal 25% uninsured, flood zones
    'NGA': 92.4,   # Lagos flooding, informal 60%+, <2% insured
    'KEN': 88.2,   # Nairobi slums, Rift Valley earthquake, <4% insured
    'ETH': 94.8,   # Minimal insurance market, earthquake/flood
    'GHA': 82.4,   # Accra flooding, informal areas, very low coverage
    'TZA': 90.2,   # Dar es Salaam flooding, minimal insurance
    'UGA': 91.4,   # Landslide zones (Bududa), floods, no coverage
    'SEN': 84.6,   # Dakar flooding, Saint-Louis sea-level rise, minimal
    'CIV': 86.2,   # Abidjan flooding, informal areas
    'CMR': 88.4,   # Lake Nyos gas risk, volcanic, floods
    'AGO': 86.8,   # Luanda flooding, informal areas
    'MOZ': 90.6,   # Cyclone Idai/Kenneth devastated, <2% insured
    'MDG': 92.8,   # Annual cyclones, 98%+ uninsured
    'ZMB': 88.4,   # Flood zones, minimal insurance
    'ZWE': 84.6,   # Economic crisis, cyclone Idai affected east
    'MWI': 91.2,   # Shire River flooding, Cyclone Freddy 2023

    # LATIN AMERICA & CARIBBEAN
    'BRA': 54.2,   # Favelas uninsurable, landslide zones (Petrópolis), floods
    'ARG': 42.8,   # Buenos Aires flooding, Patagonia wildfire, moderate market
    'CHL': 24.6,   # Earthquake coverage mandatory for mortgages, but 30% informal gap
    'COL': 62.4,   # Bogotá earthquake zone, informal settlements, low coverage
    'PER': 68.5,   # Lima earthquake zone, informal 50%+, very low coverage
    'VEN': 82.4,   # Economic collapse, no functioning insurance market
    'ECU': 64.8,   # Earthquake/volcanic (2016 earthquake), low coverage
    'BOL': 72.4,   # Flood zones, landslides, minimal insurance
    'PRY': 58.6,   # Flooding (Asunción), low coverage
    'URY': 32.4,   # Moderate coverage, some flood zones
    'CRI': 38.2,   # Earthquake/volcano, INS monopoly ended 2008, growing market
    'PAN': 34.8,   # Earthquake, flooding, moderate coverage
    'GTM': 72.8,   # Volcanic/earthquake (Fuego 2018), informal settlements
    'HND': 78.4,   # Hurricane Eta/Iota 2020 devastation, minimal insurance
    'NIC': 76.2,   # Earthquake/volcanic/hurricane, very low coverage
    'SLV': 68.4,   # Earthquake (2001), volcanic, gang-affected areas
    'HTI': 96.2,   # 2010 earthquake, annual hurricanes, virtually zero insurance
    'DOM': 48.5,   # Hurricane zone, moderate market, informal gaps
    'JAM': 42.6,   # Hurricane zone, but Caribbean Catastrophe Risk Insurance improving
    'TTO': 28.4,   # Oil wealth helps, but hurricane risk, moderate coverage

    # OCEANIA
    'AUS': 8.4,    # Bushfire BAL-FZ zones, North QLD cyclone, flood (Lismore)
    'NZL': 4.8,    # EQC earthquake cover, but some wellington/christchurch gaps

    # ISLAND NATIONS
    'FJI': 62.4,   # Cyclone Winston devastation, limited market
}

# US State-level data: % of homes uninsurable by standard private market
# (relying on FAIR plans, Citizens, NFIP, or completely uninsured)
us_state_data = {
    'California': {'pct': 22.8, 'reason': 'Wildfire - FAIR Plan grew to 400k+ policies (2024). State Farm/Allstate stopped writing new policies. WUI (Wildland-Urban Interface) 4.5M homes at risk. Paradise fire destroyed 19k structures. Insurance crisis worst in nation.'},
    'Florida': {'pct': 24.6, 'reason': 'Hurricane - Citizens Property Insurance 1.4M policies (insurer of last resort). 12 private insurers left since 2020. Roof age restrictions. 40% homeowners face non-renewal. Reinsurance costs doubled.'},
    'Louisiana': {'pct': 19.8, 'reason': 'Hurricane/flood - Post-Hurricane Ida (2021) insurer exodus. Citizens LA has 170k+ policies. Coastal erosion losing 25-35 sq mi/yr. 500k+ in NFIP flood zones.'},
    'Texas': {'pct': 12.4, 'reason': 'Hurricane coast + hail/tornado interior. TWIA (Texas Windstorm Insurance) 200k+ coastal policies. Dallas/Fort Worth severe hail drives non-renewals. Winter Storm Uri exposed gaps.'},
    'Colorado': {'pct': 10.2, 'reason': 'Wildfire (Marshall Fire 2021 - $2B, 1,000+ homes) + severe hail (costliest state). Boulder/Fort Collins WUI zones. Some areas losing coverage.'},
    'Oregon': {'pct': 9.8, 'reason': 'Wildfire - 2020 Labor Day fires burned 1M+ acres. WUI expansion in Bend, Medford, Eugene areas. Some rural areas losing private options.'},
    'Mississippi': {'pct': 14.6, 'reason': 'Hurricane coast + tornado alley. MWUA (Mississippi Windstorm Underwriting Association) for coast. Flood zones along Mississippi River.'},
    'South Carolina': {'pct': 11.8, 'reason': 'Hurricane coast (Charleston/Myrtle Beach). SC Wind and Hail Underwriting Association. Sea-level rise threatens Lowcountry.'},
    'North Carolina': {'pct': 10.4, 'reason': 'Hurricane coast (Outer Banks extremely vulnerable). NC Beach Plan (NCIUA). Flood zones expanding inland (Hurricane Florence 2018).'},
    'New York': {'pct': 7.2, 'reason': 'Coastal flood (Long Island/NYC post-Sandy). NFIP dependency. Some brownfield/Superfund sites near uninsurable. NYC co-op gaps.'},
    'New Jersey': {'pct': 8.4, 'reason': 'Coastal flood (Sandy devastation). Shore towns face rising premiums. NFIP reform hitting hard. Some barrier island homes uninsurable.'},
    'Hawaii': {'pct': 16.8, 'reason': 'Wildfire (Lahaina 2023 - deadliest US fire in century, 2,200+ structures). Volcanic/lava zones (Big Island Leilani Estates). Hurricane exposure. Lahaina rebuilding faces coverage crisis.'},
    'Alaska': {'pct': 18.2, 'reason': 'Permafrost thaw/subsidence (Shishmaref, Newtok relocating). Coastal erosion. Earthquake zone. Remote communities with no insurers willing to write.'},
    'Washington': {'pct': 7.8, 'reason': 'Wildfire east of Cascades. Earthquake (Seattle fault/Cascadia subduction). Lahar zones (Mt. Rainier threatens 80k homes).'},
    'Arizona': {'pct': 6.2, 'reason': 'Wildfire (Yarnell Hill, Telegraph Fire). Flash flooding. Some desert areas with limited options.'},
    'Nevada': {'pct': 5.8, 'reason': 'Lake Mead area wildfire. Flash flooding Las Vegas. Limited exposure compared to coastal states.'},
    'Montana': {'pct': 8.6, 'reason': 'Wildfire (2023 season severe). Yellowstone flooding 2022. Rural areas with limited market options.'},
    'Oklahoma': {'pct': 9.4, 'reason': 'Tornado Alley (Moore tornados). Earthquake from fracking (wastewater injection). Hail damage increasing.'},
    'Nebraska': {'pct': 6.8, 'reason': 'Tornado/hail. 2019 bomb cyclone flooding. Agricultural areas with limited options.'},
    'Kansas': {'pct': 7.4, 'reason': 'Tornado Alley core. Severe hail. Greensburg tornado (2007) showed rebuilding challenges.'},
    'Iowa': {'pct': 5.6, 'reason': 'Derecho 2020 ($11B damage). River flooding. Agricultural structures.'},
    'Alabama': {'pct': 11.2, 'reason': 'Tornado (Tuscaloosa 2011) + hurricane coast (Mobile/Gulf Shores). Limited beach coverage options.'},
    'Georgia': {'pct': 8.8, 'reason': 'Hurricane coast (Savannah). Tornado exposure. Some inland flooding.'},
    'Virginia': {'pct': 6.4, 'reason': 'Hampton Roads sea-level rise (fastest on East Coast). Hurricane exposure. Norfolk naval area flooding.'},
    'Maryland': {'pct': 6.2, 'reason': 'Chesapeake Bay flooding. Ellicott City flash floods. Eastern Shore hurricane/sea-level risk.'},
    'Connecticut': {'pct': 5.8, 'reason': 'Coastal flooding (Long Island Sound). Some Hurricane Sandy-affected areas.'},
    'Massachusetts': {'pct': 5.4, 'reason': 'Coastal flood (Cape Cod, Nantucket erosion). Nor\'easters. MPIUA fair plan.'},
    'Rhode Island': {'pct': 5.2, 'reason': 'Coastal flooding. Hurricane vulnerability (1938 hurricane devastated). Small market.'},
    'Vermont': {'pct': 4.8, 'reason': 'Flooding (2023 historic floods). Tropical Storm Irene 2011. Mountain runoff increasing.'},
    'Maine': {'pct': 4.2, 'reason': 'Coastal erosion. Nor\'easter exposure. Rural areas with limited options.'},
    'New Hampshire': {'pct': 3.8, 'reason': 'Some flood zones. Winter storm damage. Relatively low risk.'},
    'Pennsylvania': {'pct': 5.6, 'reason': 'Flood zones (Hurricane Ida remnants 2021). Mine subsidence in coal country.'},
    'Ohio': {'pct': 4.8, 'reason': 'Tornado exposure. River flooding. Mine subsidence in SE Ohio.'},
    'Michigan': {'pct': 4.2, 'reason': 'Detroit urban blight (some blocks uninsurable). Great Lakes flooding increasing.'},
    'Wisconsin': {'pct': 3.6, 'reason': 'Flooding. Tornado exposure. Relatively low overall risk.'},
    'Minnesota': {'pct': 3.4, 'reason': 'Flooding (Red River). Tornado exposure. Generally good insurability.'},
    'Illinois': {'pct': 5.2, 'reason': 'Tornado/hail. Chicago flood zones. Some South/West side neighborhoods with limited options.'},
    'Indiana': {'pct': 4.6, 'reason': 'Tornado exposure. Flooding. Moderate overall risk.'},
    'Missouri': {'pct': 7.6, 'reason': 'New Madrid seismic zone (no mandatory EQ coverage). Tornado (Joplin 2011). Flooding.'},
    'Tennessee': {'pct': 7.2, 'reason': 'Tornado (Nashville 2020). Flash flooding (Waverly 2021 - 20 deaths). New Madrid seismic zone.'},
    'Kentucky': {'pct': 6.8, 'reason': 'Flash flooding (2022 Eastern KY - 44 deaths). Tornado (Dec 2021). Mine subsidence.'},
    'West Virginia': {'pct': 7.4, 'reason': 'Flash flooding (2016 devastating). Mine subsidence. Remote hollows with limited options.'},
    'Arkansas': {'pct': 7.2, 'reason': 'Tornado. New Madrid seismic. River flooding. Limited market in rural areas.'},
    'Idaho': {'pct': 6.4, 'reason': 'Wildfire (growing rapidly). Boise WUI expansion. Limited rural options.'},
    'Wyoming': {'pct': 4.8, 'reason': 'Wildfire. Some flood zones. Sparse population limits market options.'},
    'New Mexico': {'pct': 6.8, 'reason': 'Wildfire (Hermits Peak/Calf Canyon 2022 - largest in state history). Flash flooding post-fire.'},
    'Utah': {'pct': 4.4, 'reason': 'Wildfire risk growing. Great Salt Lake dust/subsidence. Wasatch fault earthquake.'},
    'North Dakota': {'pct': 3.8, 'reason': 'Red River flooding. Severe winter. Limited exposure overall.'},
    'South Dakota': {'pct': 4.2, 'reason': 'Tornado/hail. Rapid City flood risk. Moderate overall.'},
    'Delaware': {'pct': 5.8, 'reason': 'Coastal flooding/sea-level rise. Small state with concentrated risk.'},
    'District of Columbia': {'pct': 4.8, 'reason': 'Potomac/Anacostia flooding. Urban density challenges.'},
}


def add_uninsurable_data():
    """Add uninsurable homes percentage to each country in data.js"""

    with open('data.js', 'r', encoding='utf-8') as f:
        content = f.read()

    countries_updated = 0

    for iso_code, pct in uninsurable_homes.items():
        pattern = rf'("iso":\s*"{iso_code}"[^}}]*?)(,?\s*\n\s*}})'

        def replacement(match):
            existing_content = match.group(1)
            closing = match.group(2)

            if 'uninsurableHomesPercent' in existing_content:
                return match.group(0)

            if not existing_content.rstrip().endswith(','):
                existing_content += ','

            return f'{existing_content}\n        "uninsurableHomesPercent": {pct}{closing}'

        new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)

        if new_content != content:
            content = new_content
            countries_updated += 1

    # Write back
    with open('data.js', 'w', encoding='utf-8') as f:
        f.write(content)

    # Now write US state data to a separate variable in data.js
    # Add it before the closing of the file
    state_entries = []
    for state, info in us_state_data.items():
        reason_escaped = info['reason'].replace("'", "\\'").replace('"', '\\"')
        state_entries.append(f'    "{state}": {{"pct": {info["pct"]}, "reason": "{reason_escaped}"}}')

    state_data_js = '\n\nconst usStateInsurabilityData = {\n' + ',\n'.join(state_entries) + '\n};\n'

    with open('data.js', 'r', encoding='utf-8') as f:
        content = f.read()

    # Add state data at the end of data.js
    if 'usStateInsurabilityData' not in content:
        content += state_data_js

    with open('data.js', 'w', encoding='utf-8') as f:
        f.write(content)

    print(f'✓ Added uninsurable homes data for {countries_updated} countries')
    print(f'✓ Added US state-level insurability data for {len(us_state_data)} states/territories')
    print(f'\nGlobal range: {min(uninsurable_homes.values())}% (Denmark) to {max(uninsurable_homes.values())}% (Haiti)')
    print(f'US state range: {min(d["pct"] for d in us_state_data.values())}% (Minnesota) to {max(d["pct"] for d in us_state_data.values())}% (Florida)')
    print(f'\nSources: Swiss Re Sigma, FEMA NFIP, III, CA FAIR Plan, FL Citizens, Lloyd\'s, World Bank')


if __name__ == '__main__':
    add_uninsurable_data()
