// Data Sources Registry for Global Housing Data Visualization
// Comprehensive source metadata for all metrics with citation support

const dataSources = {
    // Primary data source definitions
    primary: [
        {
            id: 'oecd-ahd',
            organization: 'OECD',
            title: 'Affordable Housing Database',
            year: '2024-2025',
            url: 'https://www.oecd.org/housing/data/affordable-housing-database/',
            accessDate: '2025-01-15',
            metrics: ['housingExpenditureToGDP', 'socialRentalHousing', 'housingCostBurden', 'housePriceToIncome', 'policyActivityScore']
        },
        {
            id: 'world-bank',
            organization: 'World Bank',
            title: 'Global Housing Indicators',
            year: '2024',
            url: 'https://data.worldbank.org/topic/urban-development',
            accessDate: '2025-01-15',
            metrics: ['housingDeficitPerCapita', 'householdDebtToGDP', 'constructionJobsPerCapita', 'informalHousingShare', 'homeownershipRate']
        },
        {
            id: 'imf-gdd',
            organization: 'International Monetary Fund',
            title: 'Global Debt Database',
            year: '2024',
            url: 'https://www.imf.org/external/datamapper/datasets/GDD',
            accessDate: '2025-01-15',
            metrics: ['householdDebtToGDP', 'mortgagePenetrationPerCapita']
        },
        {
            id: 'un-habitat',
            organization: 'UN-Habitat',
            title: 'Global Housing Reports',
            year: '2024',
            url: 'https://unhabitat.org/topic/housing',
            accessDate: '2025-01-15',
            metrics: ['housingDeficitPerCapita', 'informalHousingShare', 'housingStockAtRisk']
        },
        {
            id: 'cahf',
            organization: 'Centre for Affordable Housing Finance in Africa',
            title: 'Housing Finance in Africa Yearbook',
            year: '2024',
            edition: '15th Edition',
            url: 'https://housingfinanceafrica.org/documents/yearbook/',
            accessDate: '2025-01-15',
            metrics: ['housingDeficitPerCapita', 'mortgagePenetrationPerCapita', 'affordableHomePriceRatio', 'landAffordabilityIndex']
        },
        {
            id: 'worldrisk',
            organization: 'Bündnis Entwicklung Hilft & IFHV',
            title: 'WorldRiskReport 2024',
            year: '2024',
            url: 'https://weltrisikobericht.de/en/',
            accessDate: '2025-01-15',
            metrics: ['disasterRiskIndex', 'housingStockAtRisk', 'uninsurableHomesPercent']
        },
        {
            id: 'eurostat',
            organization: 'Eurostat',
            title: 'Housing Statistics',
            year: '2024-2025',
            url: 'https://ec.europa.eu/eurostat/web/housing',
            accessDate: '2025-01-15',
            metrics: ['housingCostBurden', 'socialRentalHousing', 'homeownershipRate', 'vacancyRate']
        },
        {
            id: 'ilo',
            organization: 'International Labour Organization',
            title: 'Employment Statistics',
            year: '2024',
            url: 'https://ilostat.ilo.org/',
            accessDate: '2025-01-15',
            metrics: ['constructionJobsPerCapita']
        },
        {
            id: 'trading-economics',
            organization: 'Trading Economics',
            title: 'Global Economic Indicators',
            year: '2024',
            url: 'https://tradingeconomics.com/',
            accessDate: '2025-01-15',
            metrics: ['householdDebtToGDP', 'housePriceToIncome', 'mortgagePenetrationPerCapita']
        },
        {
            id: 'swiss-re',
            organization: 'Swiss Re Institute',
            title: 'Sigma World Insurance Reports',
            year: '2024',
            url: 'https://www.swissre.com/institute/research/sigma-research.html',
            accessDate: '2025-01-15',
            metrics: ['homeInsurancePenetration', 'uninsurableHomesPercent']
        },
        {
            id: 'numbeo',
            organization: 'Numbeo',
            title: 'Cost of Living Database',
            year: '2024',
            url: 'https://www.numbeo.com/property-investment/',
            accessDate: '2025-01-15',
            metrics: ['housePriceToIncome', 'affordableHomePriceRatio', 'cementAffordabilityDays']
        },
        {
            id: 'global-economy',
            organization: 'The Global Economy',
            title: 'Economic Indicators Database',
            year: '2024',
            url: 'https://www.theglobaleconomy.com/',
            accessDate: '2025-01-15',
            metrics: ['buildingCodeYearsSinceUpdate', 'municipalSpendingEfficiency', 'greenCertifiedHomesPerCapita']
        }
    ],

    // Metric to source mapping
    metricSources: {
        housingDeficitPerCapita: ['un-habitat', 'world-bank', 'oecd-ahd'],
        householdDebtToGDP: ['imf-gdd', 'world-bank', 'trading-economics'],
        housingExpenditureToGDP: ['oecd-ahd'],
        constructionJobsPerCapita: ['ilo', 'world-bank'],
        housePriceToIncome: ['oecd-ahd', 'numbeo', 'world-bank'],
        informalHousingShare: ['un-habitat', 'world-bank'],
        housingCostBurden: ['oecd-ahd', 'eurostat'],
        socialRentalHousing: ['oecd-ahd', 'eurostat'],
        disasterRiskIndex: ['worldrisk'],
        housingInvestmentOpportunity: ['world-bank', 'oecd-ahd'],
        affordableHomePriceRatio: ['numbeo', 'cahf'],
        housingMismatchIndex: ['oecd-ahd', 'world-bank'],
        policyAchievementIndex: ['oecd-ahd'],
        deficitProjection2034: ['un-habitat', 'world-bank'],
        buildingCodeYearsSinceUpdate: ['global-economy'],
        landAffordabilityIndex: ['cahf', 'world-bank'],
        greenCertifiedHomesPerCapita: ['global-economy'],
        cementAffordabilityDays: ['numbeo'],
        resilienceCertifiedPerCapita: ['worldrisk'],
        vacancyRate: ['eurostat', 'world-bank'],
        housingDemandPressure: ['oecd-ahd', 'un-habitat'],
        municipalSpendingEfficiency: ['global-economy', 'oecd-ahd'],
        mortgagePenetrationPerCapita: ['imf-gdd', 'trading-economics', 'cahf'],
        homeInsurancePenetration: ['swiss-re'],
        dataMismatchIndex: ['world-bank', 'oecd-ahd'],
        homeownershipRate: ['world-bank', 'eurostat'],
        housingStockAtRisk: ['worldrisk', 'un-habitat'],
        affordabilityTrend: ['oecd-ahd', 'world-bank'],
        housingUnaffordabilityRate: ['oecd-ahd'],
        programTargetingEfficiency: ['oecd-ahd'],
        uninsurableHomesPercent: ['swiss-re', 'worldrisk'],
        policyActivityScore: ['oecd-ahd'],
        housingRecommendations: ['cahf', 'world-bank', 'oecd-ahd', 'un-habitat']
    },

    // Get source objects for given metrics
    getSourcesForMetrics(metrics) {
        const sourceIds = new Set();
        metrics.forEach(metric => {
            const sources = this.metricSources[metric];
            if (sources) {
                sources.forEach(id => sourceIds.add(id));
            }
        });
        return this.primary.filter(s => sourceIds.has(s.id));
    },

    // Generate citations in different formats
    generateCitations(metrics, format = 'apa') {
        const sources = this.getSourcesForMetrics(metrics);

        switch (format.toLowerCase()) {
            case 'apa':
                return this.generateAPACitations(sources);
            case 'mla':
                return this.generateMLACitations(sources);
            case 'chicago':
                return this.generateChicagoCitations(sources);
            case 'bibtex':
                return this.generateBibTeXCitations(sources);
            default:
                return this.generateAPACitations(sources);
        }
    },

    // APA Format Citations
    generateAPACitations(sources) {
        return sources.map(s => {
            let citation = `${s.organization} (${s.year}). ${s.title}`;
            if (s.edition) {
                citation += ` (${s.edition})`;
            }
            citation += `. Retrieved ${this.formatAccessDate(s.accessDate)}, from ${s.url}`;
            return citation;
        }).join('\n\n');
    },

    // MLA Format Citations
    generateMLACitations(sources) {
        return sources.map(s => {
            let citation = `${s.organization}. "${s.title}."`;
            if (s.edition) {
                citation += ` ${s.edition}.`;
            }
            citation += ` ${s.year}. Web. ${this.formatAccessDateMLA(s.accessDate)}.`;
            return citation;
        }).join('\n\n');
    },

    // Chicago Format Citations
    generateChicagoCitations(sources) {
        return sources.map(s => {
            let citation = `${s.organization}. "${s.title}."`;
            if (s.edition) {
                citation += ` ${s.edition}.`;
            }
            citation += ` ${s.year}. ${s.url}.`;
            return citation;
        }).join('\n\n');
    },

    // BibTeX Format Citations
    generateBibTeXCitations(sources) {
        return sources.map((s, index) => {
            const key = s.id;
            let bibtex = `@misc{${key},\n`;
            bibtex += `  author = {${s.organization}},\n`;
            bibtex += `  title = {${s.title}},\n`;
            bibtex += `  year = {${s.year}},\n`;
            bibtex += `  url = {${s.url}},\n`;
            bibtex += `  note = {Accessed: ${s.accessDate}}\n`;
            bibtex += `}`;
            return bibtex;
        }).join('\n\n');
    },

    // Format access date for APA (Month Day, Year)
    formatAccessDate(dateStr) {
        const date = new Date(dateStr);
        const months = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
        return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    },

    // Format access date for MLA (Day Month Year)
    formatAccessDateMLA(dateStr) {
        const date = new Date(dateStr);
        const months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June',
                       'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];
        return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    },

    // Get full citation block for exports
    getExportCitationBlock(metrics, format = 'apa') {
        const currentDate = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        let block = '='.repeat(80) + '\n';
        block += 'DATA SOURCES\n';
        block += '='.repeat(80) + '\n\n';
        block += 'This data was exported from the Global Housing Data Visualization\n';
        block += `(${window.location.href})\n`;
        block += `Export Date: ${currentDate}\n\n`;
        block += 'Primary Data Sources:\n\n';
        block += this.generateCitations(metrics, format);
        block += '\n\n';
        block += 'Data Quality Notes:\n';
        block += '- All metrics based on 2024-2025 data from authoritative international sources\n';
        block += '- Some values are estimates where direct data is unavailable\n';
        block += '- African data enhanced by CAHF Housing Finance in Africa Yearbook (2024)\n';
        block += '- Eastern European data from Eurostat 2024-2025\n';
        block += '- OECD countries have the most comprehensive data coverage\n\n';
        block += 'For complete methodology and interactive visualization, visit:\n';
        block += 'https://olivianielsen15.github.io/global-housing/\n';
        block += '='.repeat(80) + '\n';

        return block;
    },

    // Get all metrics from data
    getAllMetrics() {
        return Object.keys(this.metricSources);
    }
};

// Make globally available
if (typeof window !== 'undefined') {
    window.dataSources = dataSources;
}
