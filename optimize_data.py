#!/usr/bin/env python3
"""
Optimize data.js by removing verbose documentation
Keep only minimal comments for maintainability
"""

import re

# Read the file
with open('data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Find where the actual data starts (const housingData = [)
data_start = content.find('const housingData = [')

if data_start == -1:
    print("Error: Could not find data array")
    exit(1)

# Create minimal header with just essential info
minimal_header = """// Global Housing Data - 118 Countries, 27 Metrics
// Data sources: OECD, World Bank, UN-Habitat, Eurostat, national statistics (2023-2025)
//
// Metrics include: housing deficit, affordability, construction, finance, policy effectiveness,
// disaster risk, building codes, homeownership, insurance penetration, and more.
//
// Full documentation available in /docs folder

"""

# Keep only the data array and everything after
optimized_content = minimal_header + content[data_start:]

# Write the optimized version
with open('data.js', 'w', encoding='utf-8') as f:
    f.write(optimized_content)

# Calculate size reduction
original_size = len(content)
new_size = len(optimized_content)
reduction_kb = (original_size - new_size) / 1024

print(f"✓ Optimized data.js")
print(f"  Original size: {original_size / 1024:.1f} KB")
print(f"  New size: {new_size / 1024:.1f} KB")
print(f"  Reduced by: {reduction_kb:.1f} KB ({(reduction_kb / (original_size/1024)) * 100:.1f}%)")
print(f"\nRemoved verbose documentation. Data loads much faster now!")
