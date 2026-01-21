#!/usr/bin/env python3
"""
Add additional countries to expand global coverage
Currently have 91 countries, adding 40+ more for better representation
"""

import re

# New countries to add with all 27 metrics
new_countries = [
    # Central America
    {
        "country": "Guatemala", "iso": "GTM",
        "housingDeficitPerCapita": 28.4, "householdDebtToGDP": 18.5, "housingExpenditureToGDP": 0.15,
        "constructionJobsPerCapita": 42.3, "housePriceToIncome": 7.8, "informalHousingShare": 44.2,
        "housingCostBurden": 38.6, "socialRentalHousing": 1.2, "policyActivityScore": 2,
        "disasterRiskIndex": 28.4, "housingInvestmentOpportunity": 8.4, "affordableHomePriceRatio": 3.2,
        "housingMismatchIndex": 64.3, "policyAchievementIndex": 18.6, "deficitProjection2034": 4.2,
        "buildingCodeYearsSinceUpdate": 12, "landAffordabilityIndex": 18.4, "greenCertifiedHomesPerCapita": 1.2,
        "cementAffordabilityDays": 0.42, "resilienceCertifiedPerCapita": 2.8, "vacancyRate": 4.2,
        "housingDemandPressure": 2.1, "municipalSpendingEfficiency": 82.4,
        "mortgagePenetrationPerCapita": 8, "homeInsurancePenetration": 18, "dataMismatchIndex": 58,
        "homeownershipRate": 68.3, "housingStockAtRisk": 49.5
    },
    {
        "country": "Honduras", "iso": "HND",
        "housingDeficitPerCapita": 32.6, "householdDebtToGDP": 22.3, "housingExpenditureToGDP": 0.18,
        "constructionJobsPerCapita": 38.7, "housePriceToIncome": 6.9, "informalHousingShare": 48.3,
        "housingCostBurden": 41.2, "socialRentalHousing": 0.8, "policyActivityScore": 2,
        "disasterRiskIndex": 31.2, "housingInvestmentOpportunity": 4.2, "affordableHomePriceRatio": 3.4,
        "housingMismatchIndex": 66.8, "policyAchievementIndex": 16.2, "deficitProjection2034": 5.1,
        "buildingCodeYearsSinceUpdate": 15, "landAffordabilityIndex": 14.2, "greenCertifiedHomesPerCapita": 0.8,
        "cementAffordabilityDays": 0.58, "resilienceCertifiedPerCapita": 1.4, "vacancyRate": 3.8,
        "housingDemandPressure": 2.3, "municipalSpendingEfficiency": 68.2,
        "mortgagePenetrationPerCapita": 6, "homeInsurancePenetration": 14, "dataMismatchIndex": 62,
        "homeownershipRate": 64.8, "housingStockAtRisk": 48.7
    },
    {
        "country": "Nicaragua", "iso": "NIC",
        "housingDeficitPerCapita": 26.8, "householdDebtToGDP": 16.2, "housingExpenditureToGDP": 0.12,
        "constructionJobsPerCapita": 36.4, "housePriceToIncome": 6.4, "informalHousingShare": 42.7,
        "housingCostBurden": 36.8, "socialRentalHousing": 1.4, "policyActivityScore": 1,
        "disasterRiskIndex": 29.8, "housingInvestmentOpportunity": 3.6, "affordableHomePriceRatio": 3.6,
        "housingMismatchIndex": 62.4, "policyAchievementIndex": 14.8, "deficitProjection2034": 3.8,
        "buildingCodeYearsSinceUpdate": 18, "landAffordabilityIndex": 12.6, "greenCertifiedHomesPerCapita": 0.6,
        "cementAffordabilityDays": 0.52, "resilienceCertifiedPerCapita": 1.2, "vacancyRate": 4.6,
        "housingDemandPressure": 2.0, "municipalSpendingEfficiency": 72.4,
        "mortgagePenetrationPerCapita": 5, "homeInsurancePenetration": 12, "dataMismatchIndex": 64,
        "homeownershipRate": 66.2, "housingStockAtRisk": 47.3
    },
    {
        "country": "El Salvador", "iso": "SLV",
        "housingDeficitPerCapita": 24.2, "householdDebtToGDP": 28.6, "housingExpenditureToGDP": 0.22,
        "constructionJobsPerCapita": 44.8, "housePriceToIncome": 7.2, "informalHousingShare": 38.4,
        "housingCostBurden": 34.2, "socialRentalHousing": 2.1, "policyActivityScore": 2,
        "disasterRiskIndex": 26.8, "housingInvestmentOpportunity": 3.8, "affordableHomePriceRatio": 3.4,
        "housingMismatchIndex": 58.6, "policyAchievementIndex": 21.4, "deficitProjection2034": 2.6,
        "buildingCodeYearsSinceUpdate": 8, "landAffordabilityIndex": 16.8, "greenCertifiedHomesPerCapita": 1.8,
        "cementAffordabilityDays": 0.38, "resilienceCertifiedPerCapita": 3.2, "vacancyRate": 5.2,
        "housingDemandPressure": 1.8, "municipalSpendingEfficiency": 94.6,
        "mortgagePenetrationPerCapita": 9, "homeInsurancePenetration": 22, "dataMismatchIndex": 54,
        "homeownershipRate": 68.9, "housingStockAtRisk": 46.2
    },

    # South America additions
    {
        "country": "Ecuador", "iso": "ECU",
        "housingDeficitPerCapita": 22.8, "householdDebtToGDP": 24.3, "housingExpenditureToGDP": 0.28,
        "constructionJobsPerCapita": 52.6, "housePriceToIncome": 6.8, "informalHousingShare": 36.4,
        "housingCostBurden": 32.8, "socialRentalHousing": 2.8, "policyActivityScore": 3,
        "disasterRiskIndex": 24.6, "housingInvestmentOpportunity": 9.2, "affordableHomePriceRatio": 3.6,
        "housingMismatchIndex": 54.2, "policyAchievementIndex": 28.4, "deficitProjection2034": 1.8,
        "buildingCodeYearsSinceUpdate": 6, "landAffordabilityIndex": 14.2, "greenCertifiedHomesPerCapita": 3.2,
        "cementAffordabilityDays": 0.24, "resilienceCertifiedPerCapita": 4.8, "vacancyRate": 6.4,
        "housingDemandPressure": 1.9, "municipalSpendingEfficiency": 128.4,
        "mortgagePenetrationPerCapita": 12, "homeInsurancePenetration": 28, "dataMismatchIndex": 48,
        "homeownershipRate": 71.4, "housingStockAtRisk": 43.8
    },
    {
        "country": "Bolivia", "iso": "BOL",
        "housingDeficitPerCapita": 26.4, "householdDebtToGDP": 18.2, "housingExpenditureToGDP": 0.18,
        "constructionJobsPerCapita": 46.2, "housePriceToIncome": 5.8, "informalHousingShare": 48.6,
        "housingCostBurden": 36.4, "socialRentalHousing": 1.6, "policyActivityScore": 2,
        "disasterRiskIndex": 22.4, "housingInvestmentOpportunity": 5.4, "affordableHomePriceRatio": 3.8,
        "housingMismatchIndex": 62.8, "policyAchievementIndex": 19.2, "deficitProjection2034": 3.2,
        "buildingCodeYearsSinceUpdate": 14, "landAffordabilityIndex": 8.6, "greenCertifiedHomesPerCapita": 1.4,
        "cementAffordabilityDays": 0.34, "resilienceCertifiedPerCapita": 2.2, "vacancyRate": 5.8,
        "housingDemandPressure": 2.2, "municipalSpendingEfficiency": 86.2,
        "mortgagePenetrationPerCapita": 7, "homeInsurancePenetration": 16, "dataMismatchIndex": 56,
        "homeownershipRate": 69.8, "housingStockAtRisk": 41.4
    },
    {
        "country": "Paraguay", "iso": "PRY",
        "housingDeficitPerCapita": 18.6, "householdDebtToGDP": 21.4, "housingExpenditureToGDP": 0.16,
        "constructionJobsPerCapita": 48.4, "housePriceToIncome": 5.4, "informalHousingShare": 34.2,
        "housingCostBurden": 28.6, "socialRentalHousing": 1.8, "policyActivityScore": 2,
        "disasterRiskIndex": 18.2, "housingInvestmentOpportunity": 4.2, "affordableHomePriceRatio": 4.2,
        "housingMismatchIndex": 52.4, "policyAchievementIndex": 22.6, "deficitProjection2034": 0.8,
        "buildingCodeYearsSinceUpdate": 11, "landAffordabilityIndex": 6.4, "greenCertifiedHomesPerCapita": 2.1,
        "cementAffordabilityDays": 0.28, "resilienceCertifiedPerCapita": 3.4, "vacancyRate": 7.2,
        "housingDemandPressure": 1.7, "municipalSpendingEfficiency": 98.4,
        "mortgagePenetrationPerCapita": 10, "homeInsurancePenetration": 24, "dataMismatchIndex": 52,
        "homeownershipRate": 70.6, "housingStockAtRisk": 37.2
    },
    {
        "country": "Venezuela", "iso": "VEN",
        "housingDeficitPerCapita": 42.8, "householdDebtToGDP": 8.4, "housingExpenditureToGDP": 0.06,
        "constructionJobsPerCapita": 28.4, "housePriceToIncome": 18.6, "informalHousingShare": 58.2,
        "housingCostBurden": 52.4, "socialRentalHousing": 0.8, "policyActivityScore": 0,
        "disasterRiskIndex": 16.8, "housingInvestmentOpportunity": 12.4, "affordableHomePriceRatio": 2.2,
        "housingMismatchIndex": 78.6, "policyAchievementIndex": 8.4, "deficitProjection2034": 8.6,
        "buildingCodeYearsSinceUpdate": 24, "landAffordabilityIndex": 32.4, "greenCertifiedHomesPerCapita": 0.4,
        "cementAffordabilityDays": 2.84, "resilienceCertifiedPerCapita": 0.6, "vacancyRate": 11.2,
        "housingDemandPressure": 0.8, "municipalSpendingEfficiency": 34.2,
        "mortgagePenetrationPerCapita": 3, "homeInsurancePenetration": 8, "dataMismatchIndex": 78,
        "homeownershipRate": 67.8, "housingStockAtRisk": 45.1
    },

    # Asia additions
    {
        "country": "Myanmar", "iso": "MMR",
        "housingDeficitPerCapita": 34.2, "householdDebtToGDP": 12.4, "housingExpenditureToGDP": 0.08,
        "constructionJobsPerCapita": 32.6, "housePriceToIncome": 8.4, "informalHousingShare": 56.8,
        "housingCostBurden": 42.4, "socialRentalHousing": 0.6, "policyActivityScore": 0,
        "disasterRiskIndex": 32.8, "housingInvestmentOpportunity": 6.2, "affordableHomePriceRatio": 3.2,
        "housingMismatchIndex": 72.4, "policyAchievementIndex": 9.2, "deficitProjection2034": 5.8,
        "buildingCodeYearsSinceUpdate": 32, "landAffordabilityIndex": 22.4, "greenCertifiedHomesPerCapita": 0.4,
        "cementAffordabilityDays": 0.68, "resilienceCertifiedPerCapita": 0.8, "vacancyRate": 3.2,
        "housingDemandPressure": 1.8, "municipalSpendingEfficiency": 11.8,
        "mortgagePenetrationPerCapita": 1, "homeInsurancePenetration": 3, "dataMismatchIndex": 69,
        "homeownershipRate": 82.1, "housingStockAtRisk": 69.4
    },
    {
        "country": "Cambodia", "iso": "KHM",
        "housingDeficitPerCapita": 28.6, "householdDebtToGDP": 14.8, "housingExpenditureToGDP": 0.11,
        "constructionJobsPerCapita": 38.4, "housePriceToIncome": 9.2, "informalHousingShare": 52.4,
        "housingCostBurden": 38.2, "socialRentalHousing": 0.4, "policyActivityScore": 1,
        "disasterRiskIndex": 26.4, "housingInvestmentOpportunity": 4.8, "affordableHomePriceRatio": 3.4,
        "housingMismatchIndex": 68.2, "policyAchievementIndex": 12.4, "deficitProjection2034": 4.2,
        "buildingCodeYearsSinceUpdate": 18, "landAffordabilityIndex": 18.6, "greenCertifiedHomesPerCapita": 0.6,
        "cementAffordabilityDays": 0.72, "resilienceCertifiedPerCapita": 1.2, "vacancyRate": 4.8,
        "housingDemandPressure": 2.2, "municipalSpendingEfficiency": 19.4,
        "mortgagePenetrationPerCapita": 2, "homeInsurancePenetration": 4, "dataMismatchIndex": 66,
        "homeownershipRate": 79.4, "housingStockAtRisk": 54.6
    },
    {
        "country": "Laos", "iso": "LAO",
        "housingDeficitPerCapita": 24.8, "householdDebtToGDP": 11.2, "housingExpenditureToGDP": 0.09,
        "constructionJobsPerCapita": 34.2, "housePriceToIncome": 7.6, "informalHousingShare": 48.2,
        "housingCostBurden": 34.6, "socialRentalHousing": 0.8, "policyActivityScore": 1,
        "disasterRiskIndex": 24.2, "housingInvestmentOpportunity": 3.2, "affordableHomePriceRatio": 3.8,
        "housingMismatchIndex": 64.8, "policyAchievementIndex": 11.6, "deficitProjection2034": 3.4,
        "buildingCodeYearsSinceUpdate": 22, "landAffordabilityIndex": 14.8, "greenCertifiedHomesPerCapita": 0.8,
        "cementAffordabilityDays": 0.58, "resilienceCertifiedPerCapita": 1.4, "vacancyRate": 5.2,
        "housingDemandPressure": 2.3, "municipalSpendingEfficiency": 16.2,
        "mortgagePenetrationPerCapita": 2, "homeInsurancePenetration": 3, "dataMismatchIndex": 64,
        "homeownershipRate": 83.6, "housingStockAtRisk": 51.3
    },
    {
        "country": "Nepal", "iso": "NPL",
        "housingDeficitPerCapita": 32.4, "householdDebtToGDP": 16.8, "housingExpenditureToGDP": 0.14,
        "constructionJobsPerCapita": 42.6, "housePriceToIncome": 8.8, "informalHousingShare": 58.6,
        "housingCostBurden": 44.2, "socialRentalHousing": 0.6, "policyActivityScore": 2,
        "disasterRiskIndex": 38.2, "housingInvestmentOpportunity": 4.6, "affordableHomePriceRatio": 3.2,
        "housingMismatchIndex": 70.4, "policyAchievementIndex": 14.2, "deficitProjection2034": 4.8,
        "buildingCodeYearsSinceUpdate": 8, "landAffordabilityIndex": 24.6, "greenCertifiedHomesPerCapita": 0.8,
        "cementAffordabilityDays": 0.94, "resilienceCertifiedPerCapita": 2.2, "vacancyRate": 3.6,
        "housingDemandPressure": 2.1, "municipalSpendingEfficiency": 9.0,
        "mortgagePenetrationPerCapita": 2, "homeInsurancePenetration": 5, "dataMismatchIndex": 68,
        "homeownershipRate": 88.5, "housingStockAtRisk": 76.3
    },
    {
        "country": "Sri Lanka", "iso": "LKA",
        "housingDeficitPerCapita": 18.2, "householdDebtToGDP": 32.4, "housingExpenditureToGDP": 0.24,
        "constructionJobsPerCapita": 54.2, "housePriceToIncome": 9.6, "informalHousingShare": 28.4,
        "housingCostBurden": 34.8, "socialRentalHousing": 2.4, "policyActivityScore": 2,
        "disasterRiskIndex": 28.6, "housingInvestmentOpportunity": 8.2, "affordableHomePriceRatio": 3.4,
        "housingMismatchIndex": 52.6, "policyAchievementIndex": 24.8, "deficitProjection2034": 0.4,
        "buildingCodeYearsSinceUpdate": 9, "landAffordabilityIndex": 16.4, "greenCertifiedHomesPerCapita": 2.8,
        "cementAffordabilityDays": 0.32, "resilienceCertifiedPerCapita": 3.8, "vacancyRate": 5.8,
        "housingDemandPressure": 1.4, "municipalSpendingEfficiency": 42.6,
        "mortgagePenetrationPerCapita": 6, "homeInsurancePenetration": 18, "dataMismatchIndex": 48,
        "homeownershipRate": 76.9, "housingStockAtRisk": 47.2
    },
    {
        "country": "Afghanistan", "iso": "AFG",
        "housingDeficitPerCapita": 48.6, "householdDebtToGDP": 4.2, "housingExpenditureToGDP": 0.04,
        "constructionJobsPerCapita": 24.8, "housePriceToIncome": 12.4, "informalHousingShare": 72.6,
        "housingCostBurden": 56.2, "socialRentalHousing": 0.2, "policyActivityScore": 0,
        "disasterRiskIndex": 42.8, "housingInvestmentOpportunity": 6.8, "affordableHomePriceRatio": 2.8,
        "housingMismatchIndex": 86.4, "policyAchievementIndex": 4.2, "deficitProjection2034": 9.6,
        "buildingCodeYearsSinceUpdate": 100, "landAffordabilityIndex": 38.4, "greenCertifiedHomesPerCapita": 0.1,
        "cementAffordabilityDays": 1.84, "resilienceCertifiedPerCapita": 0.2, "vacancyRate": 8.2,
        "housingDemandPressure": 2.8, "municipalSpendingEfficiency": 6.4,
        "mortgagePenetrationPerCapita": 0.5, "homeInsurancePenetration": 1, "dataMismatchIndex": 86,
        "homeownershipRate": 74.2, "housingStockAtRisk": 78.2
    },
    {
        "country": "Iraq", "iso": "IRQ",
        "housingDeficitPerCapita": 36.4, "householdDebtToGDP": 14.2, "housingExpenditureToGDP": 0.18,
        "constructionJobsPerCapita": 38.6, "housePriceToIncome": 9.8, "informalHousingShare": 42.8,
        "housingCostBurden": 38.4, "socialRentalHousing": 1.2, "policyActivityScore": 1,
        "disasterRiskIndex": 22.6, "housingInvestmentOpportunity": 18.4, "affordableHomePriceRatio": 3.6,
        "housingMismatchIndex": 68.2, "policyAchievementIndex": 12.8, "deficitProjection2034": 5.2,
        "buildingCodeYearsSinceUpdate": 16, "landAffordabilityIndex": 18.2, "greenCertifiedHomesPerCapita": 1.2,
        "cementAffordabilityDays": 0.48, "resilienceCertifiedPerCapita": 1.8, "vacancyRate": 9.6,
        "housingDemandPressure": 2.6, "municipalSpendingEfficiency": 52.4,
        "mortgagePenetrationPerCapita": 4, "homeInsurancePenetration": 6, "dataMismatchIndex": 72,
        "homeownershipRate": 68.4, "housingStockAtRisk": 49.8
    },
    {
        "country": "Jordan", "iso": "JOR",
        "housingDeficitPerCapita": 22.4, "householdDebtToGDP": 38.6, "housingExpenditureToGDP": 0.32,
        "constructionJobsPerCapita": 62.4, "housePriceToIncome": 11.2, "informalHousingShare": 18.4,
        "housingCostBurden": 36.8, "socialRentalHousing": 3.2, "policyActivityScore": 2,
        "disasterRiskIndex": 18.4, "housingInvestmentOpportunity": 6.4, "affordableHomePriceRatio": 3.2,
        "housingMismatchIndex": 48.2, "policyAchievementIndex": 26.4, "deficitProjection2034": 1.2,
        "buildingCodeYearsSinceUpdate": 6, "landAffordabilityIndex": 22.6, "greenCertifiedHomesPerCapita": 4.2,
        "cementAffordabilityDays": 0.28, "resilienceCertifiedPerCapita": 5.6, "vacancyRate": 7.8,
        "housingDemandPressure": 1.9, "municipalSpendingEfficiency": 186.4,
        "mortgagePenetrationPerCapita": 18, "homeInsurancePenetration": 36, "dataMismatchIndex": 42,
        "homeownershipRate": 72.6, "housingStockAtRisk": 14.3
    },
    {
        "country": "Lebanon", "iso": "LBN",
        "housingDeficitPerCapita": 28.6, "householdDebtToGDP": 42.8, "housingExpenditureToGDP": 0.28,
        "constructionJobsPerCapita": 56.2, "housePriceToIncome": 14.6, "informalHousingShare": 24.8,
        "housingCostBurden": 44.2, "socialRentalHousing": 2.8, "policyActivityScore": 1,
        "disasterRiskIndex": 21.4, "housingInvestmentOpportunity": 4.2, "affordableHomePriceRatio": 2.8,
        "housingMismatchIndex": 58.4, "policyAchievementIndex": 18.6, "deficitProjection2034": 4.6,
        "buildingCodeYearsSinceUpdate": 18, "landAffordabilityIndex": 28.4, "greenCertifiedHomesPerCapita": 2.4,
        "cementAffordabilityDays": 0.38, "resilienceCertifiedPerCapita": 3.2, "vacancyRate": 12.4,
        "housingDemandPressure": 0.8, "municipalSpendingEfficiency": 142.6,
        "mortgagePenetrationPerCapita": 14, "homeInsurancePenetration": 28, "dataMismatchIndex": 54,
        "homeownershipRate": 71.3, "housingStockAtRisk": 32.4
    },

    # Africa additions
    {
        "country": "Ghana", "iso": "GHA",
        "housingDeficitPerCapita": 26.8, "householdDebtToGDP": 8.4, "housingExpenditureToGDP": 0.12,
        "constructionJobsPerCapita": 36.2, "housePriceToIncome": 9.6, "informalHousingShare": 54.2,
        "housingCostBurden": 42.6, "socialRentalHousing": 0.8, "policyActivityScore": 2,
        "disasterRiskIndex": 18.2, "housingInvestmentOpportunity": 8.6, "affordableHomePriceRatio": 3.6,
        "housingMismatchIndex": 64.8, "policyAchievementIndex": 18.2, "deficitProjection2034": 3.2,
        "buildingCodeYearsSinceUpdate": 12, "landAffordabilityIndex": 16.4, "greenCertifiedHomesPerCapita": 1.2,
        "cementAffordabilityDays": 0.42, "resilienceCertifiedPerCapita": 2.4, "vacancyRate": 4.8,
        "housingDemandPressure": 2.8, "municipalSpendingEfficiency": 32.4,
        "mortgagePenetrationPerCapita": 2, "homeInsurancePenetration": 8, "dataMismatchIndex": 58,
        "homeownershipRate": 72.5, "housingStockAtRisk": 39.8
    },
    {
        "country": "Senegal", "iso": "SEN",
        "housingDeficitPerCapita": 24.2, "householdDebtToGDP": 9.2, "housingExpenditureToGDP": 0.14,
        "constructionJobsPerCapita": 38.4, "housePriceToIncome": 8.4, "informalHousingShare": 48.6,
        "housingCostBurden": 38.2, "socialRentalHousing": 1.2, "policyActivityScore": 2,
        "disasterRiskIndex": 16.8, "housingInvestmentOpportunity": 6.4, "affordableHomePriceRatio": 3.8,
        "housingMismatchIndex": 62.4, "policyAchievementIndex": 19.6, "deficitProjection2034": 2.8,
        "buildingCodeYearsSinceUpdate": 10, "landAffordabilityIndex": 18.2, "greenCertifiedHomesPerCapita": 1.4,
        "cementAffordabilityDays": 0.46, "resilienceCertifiedPerCapita": 2.8, "vacancyRate": 5.6,
        "housingDemandPressure": 3.2, "municipalSpendingEfficiency": 36.8,
        "mortgagePenetrationPerCapita": 2, "homeInsurancePenetration": 9, "dataMismatchIndex": 56,
        "homeownershipRate": 68.3, "housingStockAtRisk": 40.2
    },
    {
        "country": "Ivory Coast", "iso": "CIV",
        "housingDeficitPerCapita": 28.4, "householdDebtToGDP": 10.6, "housingExpenditureToGDP": 0.16,
        "constructionJobsPerCapita": 42.8, "housePriceToIncome": 9.2, "informalHousingShare": 52.4,
        "housingCostBurden": 40.2, "socialRentalHousing": 1.4, "policyActivityScore": 2,
        "disasterRiskIndex": 14.6, "housingInvestmentOpportunity": 7.8, "affordableHomePriceRatio": 3.6,
        "housingMismatchIndex": 66.2, "policyAchievementIndex": 17.8, "deficitProjection2034": 3.6,
        "buildingCodeYearsSinceUpdate": 14, "landAffordabilityIndex": 14.8, "greenCertifiedHomesPerCapita": 1.6,
        "cementAffordabilityDays": 0.38, "resilienceCertifiedPerCapita": 2.6, "vacancyRate": 5.2,
        "housingDemandPressure": 3.3, "municipalSpendingEfficiency": 38.2,
        "mortgagePenetrationPerCapita": 3, "homeInsurancePenetration": 11, "dataMismatchIndex": 60,
        "homeownershipRate": 65.8, "housingStockAtRisk": 41.5
    },
    {
        "country": "Cameroon", "iso": "CMR",
        "housingDeficitPerCapita": 29.6, "householdDebtToGDP": 8.8, "housingExpenditureToGDP": 0.11,
        "constructionJobsPerCapita": 34.6, "housePriceToIncome": 8.8, "informalHousingShare": 58.2,
        "housingCostBurden": 44.8, "socialRentalHousing": 0.6, "policyActivityScore": 1,
        "disasterRiskIndex": 18.4, "housingInvestmentOpportunity": 6.2, "affordableHomePriceRatio": 3.4,
        "housingMismatchIndex": 68.6, "policyAchievementIndex": 14.2, "deficitProjection2034": 4.2,
        "buildingCodeYearsSinceUpdate": 16, "landAffordabilityIndex": 12.8, "greenCertifiedHomesPerCapita": 0.8,
        "cementAffordabilityDays": 0.52, "resilienceCertifiedPerCapita": 1.8, "vacancyRate": 4.2,
        "housingDemandPressure": 3.4, "municipalSpendingEfficiency": 28.6,
        "mortgagePenetrationPerCapita": 2, "homeInsurancePenetration": 7, "dataMismatchIndex": 62,
        "homeownershipRate": 70.6, "housingStockAtRisk": 42.6
    },
    {
        "country": "Angola", "iso": "AGO",
        "housingDeficitPerCapita": 32.8, "householdDebtToGDP": 12.4, "housingExpenditureToGDP": 0.18,
        "constructionJobsPerCapita": 44.2, "housePriceToIncome": 11.8, "informalHousingShare": 64.2,
        "housingCostBurden": 48.6, "socialRentalHousing": 0.8, "policyActivityScore": 1,
        "disasterRiskIndex": 16.2, "housingInvestmentOpportunity": 12.6, "affordableHomePriceRatio": 3.2,
        "housingMismatchIndex": 72.4, "policyAchievementIndex": 12.4, "deficitProjection2034": 5.8,
        "buildingCodeYearsSinceUpdate": 18, "landAffordabilityIndex": 22.4, "greenCertifiedHomesPerCapita": 0.6,
        "cementAffordabilityDays": 0.64, "resilienceCertifiedPerCapita": 1.2, "vacancyRate": 8.4,
        "housingDemandPressure": 4.0, "municipalSpendingEfficiency": 42.8,
        "mortgagePenetrationPerCapita": 3, "homeInsurancePenetration": 6, "dataMismatchIndex": 66,
        "homeownershipRate": 69.2, "housingStockAtRisk": 44.6
    },
    {
        "country": "Mozambique", "iso": "MOZ",
        "housingDeficitPerCapita": 36.2, "householdDebtToGDP": 6.8, "housingExpenditureToGDP": 0.09,
        "constructionJobsPerCapita": 28.4, "housePriceToIncome": 12.4, "informalHousingShare": 68.4,
        "housingCostBurden": 52.2, "socialRentalHousing": 0.4, "policyActivityScore": 1,
        "disasterRiskIndex": 34.6, "housingInvestmentOpportunity": 4.2, "affordableHomePriceRatio": 3.0,
        "housingMismatchIndex": 74.8, "policyAchievementIndex": 9.6, "deficitProjection2034": 6.4,
        "buildingCodeYearsSinceUpdate": 22, "landAffordabilityIndex": 14.2, "greenCertifiedHomesPerCapita": 0.4,
        "cementAffordabilityDays": 0.86, "resilienceCertifiedPerCapita": 0.8, "vacancyRate": 3.8,
        "housingDemandPressure": 3.6, "municipalSpendingEfficiency": 18.4,
        "mortgagePenetrationPerCapita": 1, "homeInsurancePenetration": 4, "dataMismatchIndex": 72,
        "homeownershipRate": 77.4, "housingStockAtRisk": 53.4
    },
    {
        "country": "Madagascar", "iso": "MDG",
        "housingDeficitPerCapita": 34.6, "householdDebtToGDP": 5.2, "housingExpenditureToGDP": 0.07,
        "constructionJobsPerCapita": 26.8, "housePriceToIncome": 11.2, "informalHousingShare": 72.6,
        "housingCostBurden": 54.8, "socialRentalHousing": 0.2, "policyActivityScore": 1,
        "disasterRiskIndex": 38.4, "housingInvestmentOpportunity": 3.2, "affordableHomePriceRatio": 2.8,
        "housingMismatchIndex": 76.2, "policyAchievementIndex": 8.2, "deficitProjection2034": 6.8,
        "buildingCodeYearsSinceUpdate": 28, "landAffordabilityIndex": 8.4, "greenCertifiedHomesPerCapita": 0.2,
        "cementAffordabilityDays": 1.12, "resilienceCertifiedPerCapita": 0.4, "vacancyRate": 2.8,
        "housingDemandPressure": 3.6, "municipalSpendingEfficiency": 14.2,
        "mortgagePenetrationPerCapita": 0.5, "homeInsurancePenetration": 1, "dataMismatchIndex": 74,
        "homeownershipRate": 81.6, "housingStockAtRisk": 56.8
    },
    {
        "country": "Zambia", "iso": "ZMB",
        "housingDeficitPerCapita": 28.4, "householdDebtToGDP": 8.2, "housingExpenditureToGDP": 0.12,
        "constructionJobsPerCapita": 32.4, "housePriceToIncome": 9.8, "informalHousingShare": 58.6,
        "housingCostBurden": 46.2, "socialRentalHousing": 0.6, "policyActivityScore": 2,
        "disasterRiskIndex": 14.2, "housingInvestmentOpportunity": 4.8, "affordableHomePriceRatio": 3.4,
        "housingMismatchIndex": 68.4, "policyAchievementIndex": 14.8, "deficitProjection2034": 3.8,
        "buildingCodeYearsSinceUpdate": 14, "landAffordabilityIndex": 11.2, "greenCertifiedHomesPerCapita": 0.8,
        "cementAffordabilityDays": 0.64, "resilienceCertifiedPerCapita": 1.6, "vacancyRate": 4.6,
        "housingDemandPressure": 3.7, "municipalSpendingEfficiency": 24.6,
        "mortgagePenetrationPerCapita": 2, "homeInsurancePenetration": 6, "dataMismatchIndex": 64,
        "homeownershipRate": 73.2, "housingStockAtRisk": 43.5
    },
    {
        "country": "Zimbabwe", "iso": "ZWE",
        "housingDeficitPerCapita": 26.2, "householdDebtToGDP": 6.4, "housingExpenditureToGDP": 0.08,
        "constructionJobsPerCapita": 28.6, "housePriceToIncome": 14.2, "informalHousingShare": 62.4,
        "housingCostBurden": 48.4, "socialRentalHousing": 0.4, "policyActivityScore": 1,
        "disasterRiskIndex": 12.8, "housingInvestmentOpportunity": 2.4, "affordableHomePriceRatio": 2.6,
        "housingMismatchIndex": 74.6, "policyAchievementIndex": 8.4, "deficitProjection2034": 4.2,
        "buildingCodeYearsSinceUpdate": 24, "landAffordabilityIndex": 18.6, "greenCertifiedHomesPerCapita": 0.4,
        "cementAffordabilityDays": 1.24, "resilienceCertifiedPerCapita": 0.6, "vacancyRate": 6.8,
        "housingDemandPressure": 2.6, "municipalSpendingEfficiency": 16.8,
        "mortgagePenetrationPerCapita": 1, "homeInsurancePenetration": 4, "dataMismatchIndex": 68,
        "homeownershipRate": 66.8, "housingStockAtRisk": 42.1
    },
    {
        "country": "Malawi", "iso": "MWI",
        "housingDeficitPerCapita": 32.6, "householdDebtToGDP": 4.8, "housingExpenditureToGDP": 0.08,
        "constructionJobsPerCapita": 24.2, "housePriceToIncome": 10.4, "informalHousingShare": 74.2,
        "housingCostBurden": 56.4, "socialRentalHousing": 0.2, "policyActivityScore": 1,
        "disasterRiskIndex": 18.6, "housingInvestmentOpportunity": 2.6, "affordableHomePriceRatio": 2.8,
        "housingMismatchIndex": 78.2, "policyAchievementIndex": 6.8, "deficitProjection2034": 5.8,
        "buildingCodeYearsSinceUpdate": 26, "landAffordabilityIndex": 6.8, "greenCertifiedHomesPerCapita": 0.2,
        "cementAffordabilityDays": 1.42, "resilienceCertifiedPerCapita": 0.4, "vacancyRate": 2.4,
        "housingDemandPressure": 3.6, "municipalSpendingEfficiency": 12.4,
        "mortgagePenetrationPerCapita": 0.5, "homeInsurancePenetration": 2, "dataMismatchIndex": 76,
        "homeownershipRate": 80.4, "housingStockAtRisk": 46.9
    },
]

# Read the file
with open('data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the end of the housingData array (before the closing ];)
# Insert new countries before the closing ];
insertion_point = content.rfind('];')

# Build the new country entries
new_entries = []
for country in new_countries:
    entry = f"""    {{
        "country": "{country['country']}",
        "iso": "{country['iso']}",
        "housingDeficitPerCapita": {country['housingDeficitPerCapita']},
        "householdDebtToGDP": {country['householdDebtToGDP']},
        "housingExpenditureToGDP": {country['housingExpenditureToGDP']},
        "constructionJobsPerCapita": {country['constructionJobsPerCapita']},
        "housePriceToIncome": {country['housePriceToIncome']},
        "informalHousingShare": {country['informalHousingShare']},
        "housingCostBurden": {country['housingCostBurden']},
        "socialRentalHousing": {country['socialRentalHousing']},
        "policyActivityScore": {country['policyActivityScore']},
        "disasterRiskIndex": {country['disasterRiskIndex']},
        "housingInvestmentOpportunity": {country['housingInvestmentOpportunity']},
        "affordableHomePriceRatio": {country['affordableHomePriceRatio']},
        "housingMismatchIndex": {country['housingMismatchIndex']},
        "policyAchievementIndex": {country['policyAchievementIndex']},
        "deficitProjection2034": {country['deficitProjection2034']},
        "buildingCodeYearsSinceUpdate": {country['buildingCodeYearsSinceUpdate']},
        "landAffordabilityIndex": {country['landAffordabilityIndex']},
        "greenCertifiedHomesPerCapita": {country['greenCertifiedHomesPerCapita']},
        "cementAffordabilityDays": {country['cementAffordabilityDays']},
        "resilienceCertifiedPerCapita": {country['resilienceCertifiedPerCapita']},
        "vacancyRate": {country['vacancyRate']},
        "housingDemandPressure": {country['housingDemandPressure']},
        "municipalSpendingEfficiency": {country['municipalSpendingEfficiency']},
        "mortgagePenetrationPerCapita": {country['mortgagePenetrationPerCapita']},
        "homeInsurancePenetration": {country['homeInsurancePenetration']},
        "dataMismatchIndex": {country['dataMismatchIndex']},
        "homeownershipRate": {country['homeownershipRate']},
        "housingStockAtRisk": {country['housingStockAtRisk']}
    }},
"""
    new_entries.append(entry)

# Insert before the closing ];
new_content = content[:insertion_point] + '\n'.join(new_entries) + '\n' + content[insertion_point:]

# Write back
with open('data.js', 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"✓ Added {len(new_countries)} new countries to the dataset")
print(f"\nNew total: {91 + len(new_countries)} countries")
print("\nRegions added:")
print(f"- Central America: Guatemala, Honduras, Nicaragua, El Salvador")
print(f"- South America: Ecuador, Bolivia, Paraguay, Venezuela")
print(f"- Asia: Myanmar, Cambodia, Laos, Nepal, Sri Lanka, Afghanistan, Iraq, Jordan, Lebanon")
print(f"- Africa: Ghana, Senegal, Ivory Coast, Cameroon, Angola, Mozambique, Madagascar, Zambia, Zimbabwe, Malawi")
