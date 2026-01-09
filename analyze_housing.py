#!/usr/bin/env python3
"""
Comprehensive Housing Data Analysis Script
Analyzes correlations, outliers, regional patterns, and policy effectiveness
"""

import json
import re
from collections import defaultdict
from typing import Dict, List, Tuple
import statistics

# Read and parse the data.js file
def parse_data_js(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Extract the array content
    match = re.search(r'const housingData = (\[.*?\]);', content, re.DOTALL)
    if match:
        json_str = match.group(1)
        # Fix trailing commas which are valid in JS but not JSON
        json_str = re.sub(r',\s*}', '}', json_str)
        json_str = re.sub(r',\s*\]', ']', json_str)
        return json.loads(json_str)
    return []

def calculate_correlation(x_values, y_values):
    """Calculate Pearson correlation coefficient"""
    n = len(x_values)
    if n < 2:
        return 0

    mean_x = statistics.mean(x_values)
    mean_y = statistics.mean(y_values)

    numerator = sum((x - mean_x) * (y - mean_y) for x, y in zip(x_values, y_values))
    denominator_x = sum((x - mean_x) ** 2 for x in x_values)
    denominator_y = sum((y - mean_y) ** 2 for y in y_values)

    if denominator_x == 0 or denominator_y == 0:
        return 0

    return numerator / (denominator_x ** 0.5 * denominator_y ** 0.5)

def analyze_correlations(data, metrics):
    """Find strong correlations between all metrics"""
    correlations = []

    for i, metric1 in enumerate(metrics):
        for metric2 in metrics[i+1:]:
            # Get valid data points (both metrics present)
            pairs = [(d[metric1], d[metric2]) for d in data
                     if metric1 in d and metric2 in d
                     and d[metric1] is not None and d[metric2] is not None]

            if len(pairs) < 10:  # Need enough data points
                continue

            x_vals, y_vals = zip(*pairs)
            corr = calculate_correlation(list(x_vals), list(y_vals))

            if abs(corr) > 0.4:  # Strong correlation threshold
                correlations.append({
                    'metric1': metric1,
                    'metric2': metric2,
                    'correlation': corr,
                    'strength': 'Strong' if abs(corr) > 0.7 else 'Moderate'
                })

    return sorted(correlations, key=lambda x: abs(x['correlation']), reverse=True)

def find_regional_winners(data):
    """Identify countries excelling across multiple dimensions"""
    # Define success criteria (lower is better for some metrics)
    success_scores = []

    for country in data:
        score = 0
        details = {}

        # Low deficit (good)
        if country.get('housingDeficitPerCapita', 999) < 3:
            score += 2
            details['low_deficit'] = True

        # Low housing cost burden (good)
        if country.get('housingCostBurden', 999) < 8:
            score += 2
            details['affordable'] = True

        # High policy achievement (good)
        if country.get('policyAchievementIndex', 0) > 45:
            score += 2
            details['strong_policy'] = True

        # High green certification (good)
        if country.get('greenCertifiedHomesPerCapita', 0) > 30:
            score += 2
            details['green_leader'] = True

        # Low housing mismatch (good)
        if country.get('housingMismatchIndex', 999) < 25:
            score += 2
            details['market_aligned'] = True

        # High social housing (good)
        if country.get('socialRentalHousing', 0) > 10:
            score += 1
            details['social_housing'] = True

        # High resilience certification (good)
        if country.get('resilienceCertifiedPerCapita', 0) > 20:
            score += 2
            details['resilience_leader'] = True

        # Improving deficit projection (negative = good)
        if country.get('deficitProjection2034', 999) < -7:
            score += 1
            details['improving_fast'] = True

        success_scores.append({
            'country': country['country'],
            'score': score,
            'details': details,
            'data': country
        })

    return sorted(success_scores, key=lambda x: x['score'], reverse=True)[:15]

def find_outliers(data):
    """Find surprising outliers - countries defying expectations"""
    outliers = []

    for country in data:
        # High green cert in developing (inferred from low GDP indicators)
        if (country.get('greenCertifiedHomesPerCapita', 0) > 10 and
            country.get('cementAffordabilityDays', 0) > 0.2):
            outliers.append({
                'country': country['country'],
                'type': 'Green Leader in Developing Market',
                'metric1': f"Green Cert: {country.get('greenCertifiedHomesPerCapita')}",
                'metric2': f"Cement Affordability: {country.get('cementAffordabilityDays')} days"
            })

        # High resilience cert but low green cert
        if (country.get('resilienceCertifiedPerCapita', 0) > 50 and
            country.get('greenCertifiedHomesPerCapita', 0) < 30):
            outliers.append({
                'country': country['country'],
                'type': 'Resilience Focus without Green',
                'metric1': f"Resilience: {country.get('resilienceCertifiedPerCapita')}",
                'metric2': f"Green: {country.get('greenCertifiedHomesPerCapita')}"
            })

        # Old building codes but high performance
        if (country.get('buildingCodeYearsSinceUpdate', 0) > 10 and
            country.get('policyAchievementIndex', 0) > 35):
            outliers.append({
                'country': country['country'],
                'type': 'Old Building Codes, High Performance',
                'metric1': f"Code Age: {country.get('buildingCodeYearsSinceUpdate')} years",
                'metric2': f"Policy Achievement: {country.get('policyAchievementIndex')}"
            })

        # High investment despite affordability crisis
        if (country.get('housePriceToIncome', 0) > 9 and
            country.get('constructionJobsPerCapita', 0) > 80):
            outliers.append({
                'country': country['country'],
                'type': 'Building Despite Unaffordability',
                'metric1': f"Price/Income: {country.get('housePriceToIncome')}",
                'metric2': f"Construction Jobs: {country.get('constructionJobsPerCapita')}"
            })

        # Low cement cost but low construction
        if (country.get('cementAffordabilityDays', 999) < 0.1 and
            country.get('constructionJobsPerCapita', 999) < 50):
            outliers.append({
                'country': country['country'],
                'type': 'Affordable Materials, Low Construction',
                'metric1': f"Cement: {country.get('cementAffordabilityDays')} days",
                'metric2': f"Construction Jobs: {country.get('constructionJobsPerCapita')}"
            })

    return outliers

def analyze_tradeoffs(data):
    """Analyze trade-off questions"""
    results = {}

    # Green vs Resilience trade-off
    green_and_resilience = []
    green_only = []
    resilience_only = []
    neither = []

    for country in data:
        green = country.get('greenCertifiedHomesPerCapita', 0)
        resilience = country.get('resilienceCertifiedPerCapita', 0)

        if green > 20 and resilience > 15:
            green_and_resilience.append(country['country'])
        elif green > 20:
            green_only.append(country['country'])
        elif resilience > 15:
            resilience_only.append(country['country'])
        else:
            neither.append(country['country'])

    results['sustainability_tradeoff'] = {
        'both': green_and_resilience,
        'green_only': green_only,
        'resilience_only': resilience_only,
        'neither_count': len(neither)
    }

    # Affordable materials → More building?
    affordable_materials_high_construction = []
    affordable_materials_low_construction = []

    for country in data:
        cement = country.get('cementAffordabilityDays', 999)
        construction = country.get('constructionJobsPerCapita', 0)

        if cement < 0.1:  # Affordable
            if construction > 70:
                affordable_materials_high_construction.append(country['country'])
            elif construction < 60:
                affordable_materials_low_construction.append(country['country'])

    results['materials_to_construction'] = {
        'affordable_high_build': affordable_materials_high_construction,
        'affordable_low_build': affordable_materials_low_construction
    }

    # Government spending → Results?
    spending_pairs = []
    for country in data:
        spending = country.get('housingExpenditureToGDP', 0)
        achievement = country.get('policyAchievementIndex', 0)
        if spending > 0 and achievement > 0:
            spending_pairs.append((country['country'], spending, achievement))

    results['spending_effectiveness'] = sorted(spending_pairs,
                                               key=lambda x: x[2]/x[1] if x[1] > 0 else 0,
                                               reverse=True)[:10]

    return results

def analyze_policy_effectiveness(data):
    """Analyze if policy actually works"""

    # Policy achievement vs deficit improvement
    policy_vs_deficit = []
    for country in data:
        policy = country.get('policyAchievementIndex', 0)
        deficit_change = country.get('deficitProjection2034', 0)
        deficit_current = country.get('housingDeficitPerCapita', 0)

        if policy > 0 and deficit_change != 0:
            policy_vs_deficit.append({
                'country': country['country'],
                'policy': policy,
                'deficit_change': deficit_change,
                'current_deficit': deficit_current
            })

    # High policy, improving deficit
    high_policy_improving = [c for c in policy_vs_deficit
                             if c['policy'] > 45 and c['deficit_change'] < -7]

    # High policy, not improving
    high_policy_not_improving = [c for c in policy_vs_deficit
                                 if c['policy'] > 40 and c['deficit_change'] > -6]

    # Policy activity vs achievement
    activity_vs_achievement = []
    for country in data:
        activity = country.get('policyActivityScore', 0)
        achievement = country.get('policyAchievementIndex', 0)

        if activity > 0:
            activity_vs_achievement.append({
                'country': country['country'],
                'activity': activity,
                'achievement': achievement,
                'efficiency': achievement / activity if activity > 0 else 0
            })

    return {
        'high_policy_working': high_policy_improving,
        'high_policy_not_working': high_policy_not_improving,
        'most_efficient': sorted(activity_vs_achievement,
                                key=lambda x: x['efficiency'],
                                reverse=True)[:10]
    }

def analyze_material_costs(data):
    """Analyze material costs impact"""

    # Cement affordability vs construction rate
    cement_construction = []
    for country in data:
        cement = country.get('cementAffordabilityDays', 0)
        construction = country.get('constructionJobsPerCapita', 0)
        deficit = country.get('housingDeficitPerCapita', 0)

        if cement > 0 and construction > 0:
            cement_construction.append({
                'country': country['country'],
                'cement_days': cement,
                'construction_rate': construction,
                'deficit': deficit
            })

    # Land affordability vs housing outcomes
    land_outcomes = []
    for country in data:
        land = country.get('landAffordabilityIndex', 0)
        deficit = country.get('housingDeficitPerCapita', 0)
        mismatch = country.get('housingMismatchIndex', 0)
        price_income = country.get('housePriceToIncome', 0)

        if land > 0:
            land_outcomes.append({
                'country': country['country'],
                'land_months': land,
                'deficit': deficit,
                'mismatch': mismatch,
                'price_income': price_income
            })

    # Most expensive land
    expensive_land = sorted(land_outcomes, key=lambda x: x['land_months'], reverse=True)[:10]

    # Cheapest land
    cheap_land = sorted(land_outcomes, key=lambda x: x['land_months'])[:10]

    return {
        'cement_vs_construction': cement_construction,
        'expensive_land': expensive_land,
        'cheap_land': cheap_land
    }

def analyze_building_standards(data):
    """Analyze building code patterns"""

    code_patterns = []
    for country in data:
        code_age = country.get('buildingCodeYearsSinceUpdate', 999)
        green = country.get('greenCertifiedHomesPerCapita', 0)
        resilience = country.get('resilienceCertifiedPerCapita', 0)
        informal = country.get('informalHousingShare', 0)

        code_patterns.append({
            'country': country['country'],
            'code_age': code_age,
            'green': green,
            'resilience': resilience,
            'informal': informal
        })

    # Modern codes (0-3 years)
    modern = [c for c in code_patterns if c['code_age'] <= 3]

    # Old codes (10+ years)
    old = [c for c in code_patterns if c['code_age'] >= 10]

    return {
        'modern_codes': sorted(modern, key=lambda x: x['green'] + x['resilience'], reverse=True)[:10],
        'old_codes': sorted(old, key=lambda x: x['code_age'], reverse=True)[:10]
    }

def main():
    data = parse_data_js('/home/user/global-housing/data.js')

    print(f"=== GLOBAL HOUSING DATA ANALYSIS ===")
    print(f"Total countries: {len(data)}\n")

    # All available metrics
    metrics = [
        'housingDeficitPerCapita', 'householdDebtToGDP', 'housingExpenditureToGDP',
        'constructionJobsPerCapita', 'housePriceToIncome', 'informalHousingShare',
        'housingCostBurden', 'socialRentalHousing', 'policyActivityScore',
        'disasterRiskIndex', 'housingInvestmentOpportunity', 'affordableHomePriceRatio',
        'policyAchievementIndex', 'housingMismatchIndex', 'deficitProjection2034',
        'buildingCodeYearsSinceUpdate', 'landAffordabilityIndex',
        'greenCertifiedHomesPerCapita', 'cementAffordabilityDays', 'resilienceCertifiedPerCapita'
    ]

    # 1. STRONG CORRELATIONS
    print("\n" + "="*80)
    print("1. STRONG CORRELATIONS - Which metrics move together?")
    print("="*80)

    correlations = analyze_correlations(data, metrics)
    for i, corr in enumerate(correlations[:20], 1):
        direction = "positive" if corr['correlation'] > 0 else "negative"
        print(f"{i}. {corr['metric1']} ↔ {corr['metric2']}")
        print(f"   Correlation: {corr['correlation']:.3f} ({corr['strength']} {direction})")
        print()

    # 2. REGIONAL SUCCESS STORIES
    print("\n" + "="*80)
    print("2. REGIONAL SUCCESS STORIES - Multi-dimensional winners")
    print("="*80)

    winners = find_regional_winners(data)
    for i, winner in enumerate(winners[:10], 1):
        print(f"{i}. {winner['country']} (Score: {winner['score']}/14)")
        strengths = []
        if winner['details'].get('low_deficit'):
            strengths.append(f"Low Deficit ({winner['data'].get('housingDeficitPerCapita')}/1000)")
        if winner['details'].get('affordable'):
            strengths.append(f"Affordable ({winner['data'].get('housingCostBurden')}% burdened)")
        if winner['details'].get('strong_policy'):
            strengths.append(f"Strong Policy ({winner['data'].get('policyAchievementIndex')})")
        if winner['details'].get('green_leader'):
            strengths.append(f"Green Leader ({winner['data'].get('greenCertifiedHomesPerCapita')}/100k)")
        if winner['details'].get('resilience_leader'):
            strengths.append(f"Resilience ({winner['data'].get('resilienceCertifiedPerCapita')}/100k)")
        if winner['details'].get('market_aligned'):
            strengths.append(f"Market Aligned (Mismatch: {winner['data'].get('housingMismatchIndex')})")
        if winner['details'].get('improving_fast'):
            strengths.append(f"Improving Fast ({winner['data'].get('deficitProjection2034')}/1000 by 2034)")

        print(f"   Strengths: {', '.join(strengths)}")
        print()

    # 3. SURPRISING OUTLIERS
    print("\n" + "="*80)
    print("3. SURPRISING OUTLIERS - Countries defying expectations")
    print("="*80)

    outliers = find_outliers(data)
    for outlier in outliers[:15]:
        print(f"• {outlier['country']} - {outlier['type']}")
        print(f"  {outlier['metric1']} | {outlier['metric2']}")
        print()

    # 4. TRADE-OFF ANALYSIS
    print("\n" + "="*80)
    print("4. TRADE-OFF QUESTIONS")
    print("="*80)

    tradeoffs = analyze_tradeoffs(data)

    print("\nA. GREEN vs RESILIENCE - Are countries investing in both?")
    print(f"   Both Green & Resilience Leaders: {len(tradeoffs['sustainability_tradeoff']['both'])}")
    print(f"   → {', '.join(tradeoffs['sustainability_tradeoff']['both'][:10])}")
    print(f"\n   Green Only: {len(tradeoffs['sustainability_tradeoff']['green_only'])}")
    print(f"   → {', '.join(tradeoffs['sustainability_tradeoff']['green_only'][:10])}")
    print(f"\n   Resilience Only: {len(tradeoffs['sustainability_tradeoff']['resilience_only'])}")
    print(f"   → {', '.join(tradeoffs['sustainability_tradeoff']['resilience_only'][:10])}")

    print("\n\nB. AFFORDABLE MATERIALS → MORE BUILDING?")
    print(f"   Affordable Cement + High Construction: {len(tradeoffs['materials_to_construction']['affordable_high_build'])}")
    print(f"   → {', '.join(tradeoffs['materials_to_construction']['affordable_high_build'][:10])}")
    print(f"\n   Affordable Cement + Low Construction: {len(tradeoffs['materials_to_construction']['affordable_low_build'])}")
    print(f"   → {', '.join(tradeoffs['materials_to_construction']['affordable_low_build'][:10])}")

    print("\n\nC. GOVERNMENT SPENDING → RESULTS? (Spending Efficiency)")
    print("   Top 10 Most Efficient (Achievement per % GDP spent):")
    for i, (country, spending, achievement) in enumerate(tradeoffs['spending_effectiveness'][:10], 1):
        efficiency = achievement / spending if spending > 0 else 0
        print(f"   {i}. {country}: {efficiency:.1f} points per GDP% (Spending: {spending}%, Achievement: {achievement})")

    # 5. POLICY EFFECTIVENESS
    print("\n" + "="*80)
    print("5. POLICY EFFECTIVENESS EVIDENCE")
    print("="*80)

    policy = analyze_policy_effectiveness(data)

    print("\nA. HIGH POLICY ACHIEVEMENT + IMPROVING DEFICIT (Policy Working):")
    for c in policy['high_policy_working'][:10]:
        print(f"   • {c['country']}: Policy {c['policy']}, Deficit improving {c['deficit_change']}/1000")

    print("\n\nB. HIGH POLICY ACHIEVEMENT + NOT IMPROVING (Policy Not Working):")
    for c in policy['high_policy_not_working'][:10]:
        print(f"   • {c['country']}: Policy {c['policy']}, Deficit change {c['deficit_change']}/1000")

    print("\n\nC. MOST EFFICIENT POLICY EXECUTION (Achievement per Activity Point):")
    for i, c in enumerate(policy['most_efficient'][:10], 1):
        print(f"   {i}. {c['country']}: {c['efficiency']:.1f} points/activity (Activity: {c['activity']}, Achievement: {c['achievement']})")

    # 6. MATERIAL COSTS IMPACT
    print("\n" + "="*80)
    print("6. MATERIAL COSTS IMPACT")
    print("="*80)

    materials = analyze_material_costs(data)

    print("\nA. MOST EXPENSIVE LAND (months of income per m²):")
    for i, c in enumerate(materials['expensive_land'][:10], 1):
        print(f"   {i}. {c['country']}: {c['land_months']:.1f} months | Deficit: {c['deficit']}, Mismatch: {c['mismatch']:.1f}")

    print("\n\nB. CHEAPEST LAND:")
    for i, c in enumerate(materials['cheap_land'][:10], 1):
        print(f"   {i}. {c['country']}: {c['land_months']:.1f} months | Deficit: {c['deficit']}, Mismatch: {c['mismatch']:.1f}")

    # 7. BUILDING STANDARDS
    print("\n" + "="*80)
    print("7. BUILDING STANDARDS PATTERNS")
    print("="*80)

    standards = analyze_building_standards(data)

    print("\nA. MODERN BUILDING CODES (0-3 years old) - Top Green/Resilience:")
    for i, c in enumerate(standards['modern_codes'][:10], 1):
        total_cert = c['green'] + c['resilience']
        print(f"   {i}. {c['country']}: Code {c['code_age']}yr | Green: {c['green']:.1f}, Resilience: {c['resilience']:.1f}, Informal: {c['informal']:.1f}%")

    print("\n\nB. OLDEST BUILDING CODES (10+ years):")
    for i, c in enumerate(standards['old_codes'][:10], 1):
        print(f"   {i}. {c['country']}: Code {c['code_age']}yr | Green: {c['green']:.1f}, Resilience: {c['resilience']:.1f}, Informal: {c['informal']:.1f}%")

    print("\n" + "="*80)
    print("ANALYSIS COMPLETE")
    print("="*80)

if __name__ == "__main__":
    main()
