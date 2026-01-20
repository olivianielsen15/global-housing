#!/usr/bin/env python3
"""
Remove duplicate mortgagePenetrationPerCapita and homeInsurancePenetration entries
These duplicates are left over from the conversion to percentages
"""

import re

# Read the file
with open('data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern to find objects with duplicate mortgage/insurance entries
# We want to keep the first occurrence (the percentage) and remove the second (the old dollar value)
pattern = r'("dataMismatchIndex":\s*\d+),\s*\n\s*"mortgagePenetrationPerCapita":\s*\d+,\s*\n\s*"homeInsurancePenetration":\s*\d+'

# Replace with just the dataMismatchIndex (the mortgage and insurance are already present earlier)
replacement = r'\1'

content_fixed = re.sub(pattern, replacement, content)

# Write back
with open('data.js', 'w', encoding='utf-8') as f:
    f.write(content_fixed)

# Count how many were fixed
count = len(re.findall(pattern, content))
print(f"✓ Fixed {count} countries with duplicate mortgage/insurance entries")
