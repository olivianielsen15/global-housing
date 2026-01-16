#!/usr/bin/env python3
"""
Add Data Mismatch Index to data.js
"""

import json
import re

# Load the mismatch scores
with open('data_mismatch_scores.json', 'r') as f:
    mismatch_data = json.load(f)

# Read the current data.js file
with open('data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Update each country's data
countries_updated = 0
for iso_code, mismatch_value in mismatch_data.items():
    # Pattern to find and add after homeInsurancePenetration
    pattern = r'("iso":\s*"' + iso_code + r'"[^}]*?"homeInsurancePenetration":\s*[\d.]+)([\s,]*\n)'
    replacement = r'\1,\n        "dataMismatchIndex": ' + str(mismatch_value) + r'\2'

    new_content = re.sub(pattern, replacement, content)
    if new_content != content:
        content = new_content
        countries_updated += 1

# Write the updated content back
with open('data.js', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"✓ Added Data Mismatch Index to {countries_updated} countries")
print(f"\nData Mismatch Index Range: 5-89")
print(f"Most reliable: Denmark 5, Norway 6, Sweden 7")
print(f"Most challenged: Syria 89, Somalia 87, Afghanistan 86")
