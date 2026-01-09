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

# Top 3 Green Leaders
print("TOP GREEN CERTIFICATION LEADERS:")
green_leaders = sorted(data, key=lambda x: x.get('greenCertifiedHomesPerCapita', 0), reverse=True)[:5]
for c in green_leaders:
    print(f"{c['country']}: {c['greenCertifiedHomesPerCapita']}/100k | Resilience: {c.get('resilienceCertifiedPerCapita', 0)}/100k")

print("\nTOP RESILIENCE CERTIFICATION LEADERS:")
resilience_leaders = sorted(data, key=lambda x: x.get('resilienceCertifiedPerCapita', 0), reverse=True)[:5]
for c in resilience_leaders:
    print(f"{c['country']}: {c['resilienceCertifiedPerCapita']}/100k | Green: {c.get('greenCertifiedHomesPerCapita', 0)}/100k")

print("\nLOWEST HOUSING DEFICIT:")
deficit_leaders = sorted(data, key=lambda x: x.get('housingDeficitPerCapita', 999))[:5]
for c in deficit_leaders:
    print(f"{c['country']}: {c['housingDeficitPerCapita']}/1000 | Policy: {c.get('policyAchievementIndex', 0)} | Deficit 2034: {c.get('deficitProjection2034', 0)}")

print("\nHIGHEST HOUSING DEFICIT:")
deficit_worst = sorted(data, key=lambda x: x.get('housingDeficitPerCapita', 0), reverse=True)[:5]
for c in deficit_worst:
    print(f"{c['country']}: {c['housingDeficitPerCapita']}/1000 | Informal: {c.get('informalHousingShare', 0)}% | Code Age: {c.get('buildingCodeYearsSinceUpdate', 0)}yr")

print("\nMOST AFFORDABLE CEMENT (Developing Nations):")
cement_cheap = [c for c in data if c.get('cementAffordabilityDays', 0) < 0.15]
cement_cheap_sorted = sorted(cement_cheap, key=lambda x: x.get('cementAffordabilityDays', 999))
for c in cement_cheap_sorted[:10]:
    cement = c.get('cementAffordabilityDays', 0)
    construction = c.get('constructionJobsPerCapita', 0)
    print(f"{c['country']}: {cement:.3f} days | Construction: {construction}/1000")

print("\nMOST EXPENSIVE CEMENT:")
cement_expensive = sorted(data, key=lambda x: x.get('cementAffordabilityDays', 0), reverse=True)[:5]
for c in cement_expensive:
    cement = c.get('cementAffordabilityDays', 0)
    construction = c.get('constructionJobsPerCapita', 0)
    deficit = c.get('housingDeficitPerCapita', 0)
    print(f"{c['country']}: {cement:.2f} days | Construction: {construction}/1000 | Deficit: {deficit}/1000")

print("\nHIGHEST POLICY ACHIEVEMENT WITH ACTUAL RESULTS:")
policy_results = sorted(data, key=lambda x: (x.get('policyAchievementIndex', 0), -x.get('deficitProjection2034', 0)), reverse=True)[:8]
for c in policy_results:
    policy = c.get('policyAchievementIndex', 0)
    deficit_change = c.get('deficitProjection2034', 0)
    current = c.get('housingDeficitPerCapita', 0)
    print(f"{c['country']}: Policy {policy} | Current Deficit: {current}/1000 | Change by 2034: {deficit_change}/1000")

print("\nGREEN-RESILIENCE BALANCED LEADERS (Both >20):")
balanced = [c for c in data if c.get('greenCertifiedHomesPerCapita', 0) > 20 and c.get('resilienceCertifiedPerCapita', 0) > 20]
for c in balanced:
    print(f"{c['country']}: Green {c['greenCertifiedHomesPerCapita']:.1f} | Resilience {c['resilienceCertifiedPerCapita']:.1f} | Disaster Risk: {c.get('disasterRiskIndex', 0)}")
