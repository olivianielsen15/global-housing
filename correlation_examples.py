import json
import re

def parse_data_js(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    match = re.search(r'const housingData = (\[.*?\]);', content, re.DOTALL)
    if match:
        json_str = match.group(1)
        json_str = re.sub(r',\s*}', '}', json_str)
        json_str = re.sub(r',\s*\]', ']', json_str)
        return json.loads(json_str)
    return []

data = parse_data_js('/home/user/global-housing/data.js')

print("SPECIFIC CORRELATION EXAMPLES:\n")

print("1. LAND AFFORDABILITY vs HOUSING OUTCOMES:")
print("   Cheapest Land Countries:")
for c in sorted(data, key=lambda x: x.get('landAffordabilityIndex', 999))[:5]:
    print(f"   • {c['country']}: {c['landAffordabilityIndex']:.1f} months | Deficit: {c['housingDeficitPerCapita']}/1000 | Mismatch: {c['housingMismatchIndex']:.1f}")

print("\n   Most Expensive Land Countries:")
for c in sorted(data, key=lambda x: x.get('landAffordabilityIndex', 0), reverse=True)[:5]:
    print(f"   • {c['country']}: {c['landAffordabilityIndex']:.1f} months | Deficit: {c['housingDeficitPerCapita']}/1000 | Mismatch: {c['housingMismatchIndex']:.1f}")

print("\n2. CEMENT AFFORDABILITY vs CONSTRUCTION MOMENTUM:")
print("   Cheap Cement + High Construction:")
cheap_high = [c for c in data if c.get('cementAffordabilityDays', 999) < 0.1 and c.get('constructionJobsPerCapita', 0) > 80]
for c in sorted(cheap_high, key=lambda x: x['constructionJobsPerCapita'], reverse=True)[:5]:
    print(f"   • {c['country']}: {c['cementAffordabilityDays']:.3f} days cement | {c['constructionJobsPerCapita']}/1000 construction | Deficit: {c['housingDeficitPerCapita']}/1000")

print("\n   Expensive Cement + Low Construction:")
expensive_low = [c for c in data if c.get('cementAffordabilityDays', 0) > 2 and c.get('constructionJobsPerCapita', 999) < 25]
for c in sorted(expensive_low, key=lambda x: x['cementAffordabilityDays'], reverse=True)[:5]:
    print(f"   • {c['country']}: {c['cementAffordabilityDays']:.2f} days cement | {c['constructionJobsPerCapita']}/1000 construction | Deficit: {c['housingDeficitPerCapita']}/1000")

print("\n3. POLICY ACHIEVEMENT vs DEFICIT IMPROVEMENT:")
print("   Strong Policy + Fast Improvement:")
strong_improving = [c for c in data if c.get('policyAchievementIndex', 0) > 45 and c.get('deficitProjection2034', 0) < -7]
for c in sorted(strong_improving, key=lambda x: x['deficitProjection2034'])[:8]:
    print(f"   • {c['country']}: Policy {c['policyAchievementIndex']} | Deficit improving {c['deficitProjection2034']}/1000 (from {c['housingDeficitPerCapita']}/1000)")

print("\n4. BUILDING CODE RECENCY vs INFORMAL HOUSING:")
print("   Modern Codes (≤3 years):")
modern = [c for c in data if c.get('buildingCodeYearsSinceUpdate', 999) <= 3]
modern_avg_informal = sum(c.get('informalHousingShare', 0) for c in modern) / len(modern) if modern else 0
print(f"   Average Informal Housing: {modern_avg_informal:.1f}%")
for c in sorted(modern, key=lambda x: x.get('informalHousingShare', 0))[:5]:
    print(f"   • {c['country']}: Code {c['buildingCodeYearsSinceUpdate']}yr old | Informal: {c['informalHousingShare']}%")

print("\n   Ancient Codes (≥50 years):")
ancient = [c for c in data if c.get('buildingCodeYearsSinceUpdate', 0) >= 50]
ancient_avg_informal = sum(c.get('informalHousingShare', 0) for c in ancient) / len(ancient) if ancient else 0
print(f"   Average Informal Housing: {ancient_avg_informal:.1f}%")
for c in sorted(ancient, key=lambda x: x.get('informalHousingShare', 0), reverse=True)[:5]:
    print(f"   • {c['country']}: Code {c['buildingCodeYearsSinceUpdate']}yr old | Informal: {c['informalHousingShare']}%")

print("\n5. GREEN vs RESILIENCE CERTIFICATION PATTERNS:")
print("   Both High (Green >50, Resilience >20):")
both_high = [c for c in data if c.get('greenCertifiedHomesPerCapita', 0) > 50 and c.get('resilienceCertifiedPerCapita', 0) > 20]
for c in both_high:
    print(f"   • {c['country']}: Green {c['greenCertifiedHomesPerCapita']:.1f} | Resilience {c['resilienceCertifiedPerCapita']:.1f}")

print("\n   High Resilience, Low Green (Resilience >100, Green <20):")
resilience_focused = [c for c in data if c.get('resilienceCertifiedPerCapita', 0) > 100 and c.get('greenCertifiedHomesPerCapita', 0) < 20]
for c in resilience_focused:
    print(f"   • {c['country']}: Resilience {c['resilienceCertifiedPerCapita']:.1f} | Green {c['greenCertifiedHomesPerCapita']:.1f} | Disaster Risk: {c.get('disasterRiskIndex', 0)}")

print("\n6. SOCIAL HOUSING vs HOUSING BURDEN:")
print("   High Social Housing (>15%):")
high_social = sorted([c for c in data if c.get('socialRentalHousing', 0) > 15], key=lambda x: x['socialRentalHousing'], reverse=True)
for c in high_social[:5]:
    print(f"   • {c['country']}: {c['socialRentalHousing']}% social housing | {c['housingCostBurden']}% cost burdened | Mismatch: {c['housingMismatchIndex']:.1f}")

print("\n   Low Social Housing (<3%):")
low_social = sorted([c for c in data if c.get('socialRentalHousing', 999) < 3 and c.get('housingCostBurden', 0) > 0], key=lambda x: x['housingCostBurden'], reverse=True)
for c in low_social[:5]:
    print(f"   • {c['country']}: {c['socialRentalHousing']}% social housing | {c['housingCostBurden']}% cost burdened | Mismatch: {c['housingMismatchIndex']:.1f}")
