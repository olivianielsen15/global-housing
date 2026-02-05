// ──────────────────────────────────────────────
//  Home Remedy — Prescriptions for Housing Affordability
// ──────────────────────────────────────────────

const STEPS = [
    // Step 0 — Role
    {
        id: 'role',
        title: 'What best describes your role?',
        hint: 'This helps us tailor recommendations to your levers of influence.',
        type: 'single',
        options: [
            { value: 'policymaker',  icon: '\u{1F3DB}', label: 'Policymaker / Government Official', desc: 'Zoning, funding, regulation' },
            { value: 'developer',    icon: '\u{1F3D7}', label: 'Developer / Builder',                desc: 'Design, construction, financing' },
            { value: 'nonprofit',    icon: '\u{1F91D}', label: 'Nonprofit / Community Org',          desc: 'Advocacy, programs, services' },
            { value: 'investor',     icon: '\u{1F4C8}', label: 'Investor / Lender',                  desc: 'Capital allocation, lending' },
            { value: 'resident',     icon: '\u{1F3E0}', label: 'Resident / Advocate',                desc: 'Personal housing, community voice' }
        ]
    },
    // Step 1 — Market type
    {
        id: 'market',
        title: 'What type of housing market are you in?',
        hint: 'Different markets need very different strategies.',
        type: 'single',
        options: [
            { value: 'urban_high',   icon: '\u{1F3D9}', label: 'High-cost Urban',        desc: 'Major city, expensive land & rents' },
            { value: 'urban_mid',    icon: '\u{1F3E2}', label: 'Mid-cost Urban',          desc: 'City with moderate but rising costs' },
            { value: 'suburban',     icon: '\u{1F3D8}', label: 'Suburban / Peri-urban',    desc: 'Growing areas outside city core' },
            { value: 'rural',        icon: '\u{1F333}', label: 'Rural / Small Town',       desc: 'Low density, limited infrastructure' },
            { value: 'informal',     icon: '\u{1F6D6}', label: 'Informal / Rapid-growth',  desc: 'Informal settlements, fast urbanization' }
        ]
    },
    // Step 2 — Biggest barriers (multi-select)
    {
        id: 'barriers',
        title: 'What are the biggest barriers to affordability?',
        hint: 'Select all that apply.',
        type: 'multi',
        options: [
            { value: 'land_cost',        label: 'High land costs' },
            { value: 'construction',     label: 'Construction costs' },
            { value: 'financing',        label: 'Limited mortgage / financing access' },
            { value: 'regulation',       label: 'Restrictive zoning & permits' },
            { value: 'supply',           label: 'Overall housing supply shortage' },
            { value: 'infrastructure',   label: 'Lack of infrastructure' },
            { value: 'income',           label: 'Low household incomes' },
            { value: 'speculation',      label: 'Speculation & vacancy' }
        ]
    },
    // Step 3 — Target income band
    {
        id: 'income',
        title: 'What income group are you primarily trying to serve?',
        hint: 'Select the main target population.',
        type: 'single',
        options: [
            { value: 'very_low', icon: '\u{1F7E5}', label: 'Very Low Income',   desc: 'Bottom 20% — deep subsidies needed' },
            { value: 'low',      icon: '\u{1F7E7}', label: 'Low Income',         desc: '20th–40th percentile' },
            { value: 'moderate', icon: '\u{1F7E8}', label: 'Moderate Income',    desc: '40th–80th percentile — "missing middle"' },
            { value: 'mixed',    icon: '\u{1F7E9}', label: 'Mixed Income',       desc: 'Broad range, inclusive communities' }
        ]
    },
    // Step 4 — Available resources (multi-select)
    {
        id: 'resources',
        title: 'What resources or assets are available?',
        hint: 'Select all that apply — this shapes what\'s realistic.',
        type: 'multi',
        options: [
            { value: 'public_land',      label: 'Public land' },
            { value: 'government_funds',  label: 'Government funding' },
            { value: 'private_capital',   label: 'Private capital / investors' },
            { value: 'community',         label: 'Community labor / sweat equity' },
            { value: 'partnerships',      label: 'Public-private partnerships' },
            { value: 'international',     label: 'International aid / grants' },
            { value: 'tax_tools',         label: 'Tax incentive tools' },
            { value: 'none',             label: 'Very limited resources' }
        ]
    }
];

// ── Strategy Database ──
const STRATEGIES = [
    {
        name: 'Inclusionary Zoning',
        desc: 'Require a percentage of new developments to include affordable units.',
        roles: ['policymaker'],
        markets: ['urban_high', 'urban_mid', 'suburban'],
        barriers: ['supply', 'regulation', 'speculation'],
        incomes: ['low', 'moderate', 'mixed'],
        resources: ['public_land', 'tax_tools', 'partnerships'],
        impact: 'high',
        timeframe: 'Medium-term',
        actions: [
            'Set mandatory affordable unit percentages (10–20%)',
            'Offer density bonuses to incentivize compliance',
            'Implement long-term affordability covenants (30+ years)',
            'Create monitoring and enforcement mechanisms'
        ]
    },
    {
        name: 'Community Land Trusts',
        desc: 'Separate land ownership from building ownership to keep homes permanently affordable.',
        roles: ['nonprofit', 'policymaker', 'resident'],
        markets: ['urban_high', 'urban_mid', 'suburban', 'rural'],
        barriers: ['land_cost', 'speculation'],
        incomes: ['very_low', 'low', 'moderate'],
        resources: ['public_land', 'community', 'government_funds', 'international'],
        impact: 'high',
        timeframe: 'Long-term',
        actions: [
            'Identify and acquire land (public surplus, donated, purchased)',
            'Establish CLT governance with community board representation',
            'Develop ground lease model with resale price restrictions',
            'Partner with housing developers for construction'
        ]
    },
    {
        name: 'Upzoning & Density Reforms',
        desc: 'Allow higher-density housing (duplexes, ADUs, mid-rise) in traditionally single-family zones.',
        roles: ['policymaker', 'developer'],
        markets: ['urban_high', 'urban_mid', 'suburban'],
        barriers: ['regulation', 'supply', 'land_cost'],
        incomes: ['moderate', 'mixed', 'low'],
        resources: ['tax_tools', 'partnerships', 'public_land'],
        impact: 'high',
        timeframe: 'Medium-term',
        actions: [
            'Legalize ADUs and duplexes in all residential zones',
            'Reduce minimum lot sizes and parking requirements',
            'Allow mid-rise near transit corridors',
            'Streamline permitting for compliant projects'
        ]
    },
    {
        name: 'Microfinance & Incremental Housing Loans',
        desc: 'Small loans allowing families to build or improve homes in stages.',
        roles: ['investor', 'nonprofit', 'resident'],
        markets: ['informal', 'rural', 'urban_mid'],
        barriers: ['financing', 'income', 'construction'],
        incomes: ['very_low', 'low'],
        resources: ['private_capital', 'international', 'community', 'partnerships'],
        impact: 'high',
        timeframe: 'Quick-win',
        actions: [
            'Partner with microfinance institutions or create a housing loan fund',
            'Design loan products for incremental building (room-by-room)',
            'Provide technical assistance for safe construction',
            'Establish group lending or community guarantee models'
        ]
    },
    {
        name: 'Modular & Prefab Construction',
        desc: 'Use factory-built housing components to cut costs and construction time.',
        roles: ['developer', 'investor', 'policymaker'],
        markets: ['urban_high', 'urban_mid', 'suburban'],
        barriers: ['construction', 'supply'],
        incomes: ['low', 'moderate', 'mixed'],
        resources: ['private_capital', 'government_funds', 'partnerships'],
        impact: 'medium',
        timeframe: 'Medium-term',
        actions: [
            'Identify or invest in local modular production facilities',
            'Update building codes to accommodate modular certification',
            'Pilot a modular project on public land',
            'Create supply chain partnerships for materials'
        ]
    },
    {
        name: 'Rent Stabilization & Tenant Protections',
        desc: 'Cap rent increases and strengthen tenant rights to prevent displacement.',
        roles: ['policymaker', 'resident', 'nonprofit'],
        markets: ['urban_high', 'urban_mid'],
        barriers: ['speculation', 'income'],
        incomes: ['very_low', 'low', 'moderate'],
        resources: ['government_funds', 'tax_tools'],
        impact: 'medium',
        timeframe: 'Quick-win',
        actions: [
            'Enact annual rent increase caps tied to inflation',
            'Require just-cause eviction protections',
            'Create a tenant hotline and legal aid fund',
            'Establish a rental registry for enforcement'
        ]
    },
    {
        name: 'Social Housing Development',
        desc: 'Government-built or funded housing kept permanently off the speculative market.',
        roles: ['policymaker', 'nonprofit'],
        markets: ['urban_high', 'urban_mid', 'suburban', 'rural'],
        barriers: ['supply', 'income', 'speculation'],
        incomes: ['very_low', 'low', 'mixed'],
        resources: ['public_land', 'government_funds', 'international'],
        impact: 'high',
        timeframe: 'Long-term',
        actions: [
            'Audit public land for development suitability',
            'Create a dedicated social housing funding stream',
            'Design mixed-income developments to avoid stigma',
            'Establish professional management and maintenance plans'
        ]
    },
    {
        name: 'Employer-Assisted Housing',
        desc: 'Employers contribute to worker housing through benefits, loans, or direct investment.',
        roles: ['investor', 'developer', 'policymaker'],
        markets: ['urban_high', 'suburban', 'rural'],
        barriers: ['financing', 'income', 'supply'],
        incomes: ['low', 'moderate'],
        resources: ['private_capital', 'partnerships', 'tax_tools'],
        impact: 'medium',
        timeframe: 'Medium-term',
        actions: [
            'Survey major employers on workforce housing needs',
            'Design tax credits for employer housing contributions',
            'Create down-payment assistance programs funded by employers',
            'Develop housing near major employment centers'
        ]
    },
    {
        name: 'Infrastructure-Led Development',
        desc: 'Invest in roads, water, and utilities to unlock affordable land for housing.',
        roles: ['policymaker', 'developer', 'investor'],
        markets: ['informal', 'suburban', 'rural'],
        barriers: ['infrastructure', 'land_cost', 'supply'],
        incomes: ['low', 'moderate', 'mixed'],
        resources: ['government_funds', 'international', 'partnerships', 'private_capital'],
        impact: 'high',
        timeframe: 'Long-term',
        actions: [
            'Map areas where infrastructure gaps block development',
            'Prioritize water, sanitation, and transport connections',
            'Use land value capture to fund infrastructure',
            'Zone newly connected areas for mixed-income housing'
        ]
    },
    {
        name: 'Vacant Property Tax / Anti-Speculation',
        desc: 'Tax vacant and underused properties to bring them back into the housing supply.',
        roles: ['policymaker'],
        markets: ['urban_high', 'urban_mid'],
        barriers: ['speculation', 'supply'],
        incomes: ['moderate', 'mixed', 'low'],
        resources: ['tax_tools', 'government_funds'],
        impact: 'medium',
        timeframe: 'Quick-win',
        actions: [
            'Establish a vacant property registry and reporting requirement',
            'Implement escalating vacancy taxes (e.g. 1% year 1, 3% year 2)',
            'Create incentives for owners to convert to rentals',
            'Earmark vacancy tax revenue for affordable housing funds'
        ]
    },
    {
        name: 'Self-Build & Sites-and-Services',
        desc: 'Provide serviced plots and technical support for families to build their own homes.',
        roles: ['policymaker', 'nonprofit', 'resident'],
        markets: ['informal', 'rural'],
        barriers: ['income', 'infrastructure', 'land_cost'],
        incomes: ['very_low', 'low'],
        resources: ['public_land', 'community', 'international', 'government_funds'],
        impact: 'high',
        timeframe: 'Medium-term',
        actions: [
            'Allocate public land and subdivide into affordable plots',
            'Install basic infrastructure (water, electricity, roads)',
            'Provide approved building plans and technical assistance',
            'Offer materials loans or subsidies for construction'
        ]
    },
    {
        name: 'Housing Vouchers / Demand-Side Subsidies',
        desc: 'Give rental or purchase subsidies directly to low-income households.',
        roles: ['policymaker', 'nonprofit'],
        markets: ['urban_high', 'urban_mid', 'suburban', 'rural'],
        barriers: ['income', 'financing'],
        incomes: ['very_low', 'low'],
        resources: ['government_funds', 'international'],
        impact: 'medium',
        timeframe: 'Quick-win',
        actions: [
            'Design income-targeted voucher eligibility criteria',
            'Set payment standards at local fair market rents',
            'Recruit landlords and incentivize participation',
            'Fund a dedicated voucher administration office'
        ]
    },
    {
        name: 'Transit-Oriented Development',
        desc: 'Concentrate affordable housing near public transit to reduce transport costs.',
        roles: ['policymaker', 'developer'],
        markets: ['urban_high', 'urban_mid', 'suburban'],
        barriers: ['land_cost', 'supply', 'infrastructure'],
        incomes: ['low', 'moderate', 'mixed'],
        resources: ['public_land', 'partnerships', 'tax_tools', 'government_funds'],
        impact: 'high',
        timeframe: 'Long-term',
        actions: [
            'Zone for high-density mixed-use within 800m of transit stops',
            'Require affordable units in transit-adjacent projects',
            'Use public land near stations for affordable development',
            'Implement anti-displacement protections for existing residents'
        ]
    },
    {
        name: 'Cooperative Housing',
        desc: 'Resident-owned cooperatives where members share ownership and costs.',
        roles: ['nonprofit', 'resident', 'investor'],
        markets: ['urban_mid', 'suburban', 'rural'],
        barriers: ['financing', 'speculation', 'income'],
        incomes: ['low', 'moderate'],
        resources: ['community', 'partnerships', 'government_funds', 'private_capital'],
        impact: 'medium',
        timeframe: 'Medium-term',
        actions: [
            'Form a cooperative entity with community members',
            'Secure financing (cooperative-specific loans, grants)',
            'Acquire or build the housing collectively',
            'Establish bylaws for democratic governance and cost-sharing'
        ]
    },
    {
        name: 'Building Code Modernization',
        desc: 'Update codes to allow alternative materials and construction methods that lower costs.',
        roles: ['policymaker', 'developer'],
        markets: ['informal', 'rural', 'urban_mid', 'suburban'],
        barriers: ['construction', 'regulation'],
        incomes: ['very_low', 'low', 'moderate'],
        resources: ['government_funds', 'partnerships', 'international'],
        impact: 'medium',
        timeframe: 'Medium-term',
        actions: [
            'Review and benchmark codes against peer countries',
            'Approve alternative materials (compressed earth, bamboo, etc.)',
            'Create a fast-track approval for pre-certified designs',
            'Train inspectors on new materials and methods'
        ]
    },
    {
        name: 'Impact Investment Funds',
        desc: 'Create or join investment funds that target affordable housing for social + financial returns.',
        roles: ['investor', 'developer'],
        markets: ['urban_high', 'urban_mid', 'suburban', 'informal'],
        barriers: ['financing', 'supply'],
        incomes: ['low', 'moderate', 'mixed'],
        resources: ['private_capital', 'partnerships', 'international'],
        impact: 'medium',
        timeframe: 'Medium-term',
        actions: [
            'Structure a fund with blended finance (public guarantee, private capital)',
            'Set measurable affordability impact targets',
            'Identify pipeline of projects with proven developers',
            'Report transparently on social outcomes alongside returns'
        ]
    },
    {
        name: 'Land Value Capture & Tax Increment Financing',
        desc: 'Capture increases in land value from public investments to fund affordable housing.',
        roles: ['policymaker', 'investor'],
        markets: ['urban_high', 'urban_mid', 'suburban'],
        barriers: ['land_cost', 'financing', 'infrastructure'],
        incomes: ['mixed', 'moderate', 'low'],
        resources: ['tax_tools', 'government_funds', 'partnerships'],
        impact: 'high',
        timeframe: 'Long-term',
        actions: [
            'Establish TIF districts around planned infrastructure improvements',
            'Set aside a share of captured value for affordable housing',
            'Create transparent governance for fund allocation',
            'Monitor land value changes and adjust capture rates'
        ]
    },
    {
        name: 'Community-Driven Slum Upgrading',
        desc: 'Work with informal settlement residents to improve housing in place rather than relocating.',
        roles: ['nonprofit', 'policymaker', 'resident'],
        markets: ['informal'],
        barriers: ['infrastructure', 'income', 'land_cost'],
        incomes: ['very_low', 'low'],
        resources: ['community', 'international', 'government_funds', 'public_land'],
        impact: 'high',
        timeframe: 'Medium-term',
        actions: [
            'Conduct participatory mapping and enumeration with residents',
            'Secure tenure (land titles, long-term leases, or guarantees)',
            'Prioritize water, sanitation, and drainage upgrades',
            'Support incremental home improvements with materials and training'
        ]
    }
];

// ── State ──
let currentStep = 0;
const answers = {};
let diagnosticStarted = false;

// ── Start the diagnostic (called from hero CTA) ──
function startDiagnostic() {
    if (diagnosticStarted) return;
    diagnosticStarted = true;
    document.getElementById('progressBar').style.display = '';
    document.getElementById('questionCard').style.display = '';
    document.getElementById('navButtons').style.display = '';
    render();
}

// ── Rendering ──
function render() {
    const step = STEPS[currentStep];
    const card = document.getElementById('questionCard');
    const progressFill = document.getElementById('progressFill');
    const progressLabel = document.getElementById('progressLabel');
    const btnBack = document.getElementById('btnBack');
    const btnNext = document.getElementById('btnNext');

    // Progress
    const pct = ((currentStep + 1) / STEPS.length) * 100;
    progressFill.style.width = pct + '%';
    progressLabel.textContent = 'Step ' + (currentStep + 1) + ' of ' + STEPS.length;

    // Back button
    btnBack.style.display = currentStep > 0 ? 'inline-block' : 'none';
    btnNext.textContent = currentStep === STEPS.length - 1 ? 'Get My Prescription' : 'Next';

    // Card content
    let html = '<h2>' + step.title + '</h2>';
    html += '<p class="hint">' + step.hint + '</p>';

    if (step.type === 'single') {
        html += '<div class="options">';
        step.options.forEach(function (opt) {
            const sel = answers[step.id] === opt.value ? ' selected' : '';
            html += '<div class="option' + sel + '" data-value="' + opt.value + '" onclick="selectSingle(\'' + step.id + '\',\'' + opt.value + '\')">';
            html += '<div class="icon">' + opt.icon + '</div>';
            html += '<div><div class="label">' + opt.label + '</div><div class="desc">' + opt.desc + '</div></div>';
            html += '</div>';
        });
        html += '</div>';
    } else if (step.type === 'multi') {
        const selected = answers[step.id] || [];
        html += '<div class="checkbox-grid">';
        step.options.forEach(function (opt) {
            const sel = selected.indexOf(opt.value) !== -1 ? ' selected' : '';
            const chk = sel ? '\u2713' : '';
            html += '<div class="checkbox-item' + sel + '" onclick="toggleMulti(\'' + step.id + '\',\'' + opt.value + '\')">';
            html += '<div class="check">' + chk + '</div>';
            html += '<span>' + opt.label + '</span>';
            html += '</div>';
        });
        html += '</div>';
    }

    card.innerHTML = html;
}

function selectSingle(stepId, value) {
    answers[stepId] = value;
    render();
}

function toggleMulti(stepId, value) {
    if (!answers[stepId]) answers[stepId] = [];
    const idx = answers[stepId].indexOf(value);
    if (idx === -1) {
        answers[stepId].push(value);
    } else {
        answers[stepId].splice(idx, 1);
    }
    render();
}

function goNext() {
    const step = STEPS[currentStep];
    // Validate
    if (step.type === 'single' && !answers[step.id]) return;
    if (step.type === 'multi' && (!answers[step.id] || answers[step.id].length === 0)) return;

    if (currentStep < STEPS.length - 1) {
        currentStep++;
        render();
    } else {
        showResults();
    }
}

function goBack() {
    if (currentStep > 0) {
        currentStep--;
        render();
    }
}

// ── Scoring & Results ──
function scoreStrategies() {
    const role = answers.role;
    const market = answers.market;
    const barriers = answers.barriers || [];
    const income = answers.income;
    const resources = answers.resources || [];

    const scored = STRATEGIES.map(function (s) {
        let score = 0;

        // Role match
        if (s.roles.indexOf(role) !== -1) score += 30;

        // Market match
        if (s.markets.indexOf(market) !== -1) score += 20;

        // Barrier overlap
        const barrierHits = s.barriers.filter(function (b) { return barriers.indexOf(b) !== -1; }).length;
        score += barrierHits * 10;

        // Income match
        if (s.incomes.indexOf(income) !== -1) score += 15;

        // Resource overlap
        const resourceHits = s.resources.filter(function (r) { return resources.indexOf(r) !== -1; }).length;
        score += resourceHits * 5;

        return { strategy: s, score: score };
    });

    scored.sort(function (a, b) { return b.score - a.score; });
    return scored;
}

function labelFor(stepId, value) {
    var step = STEPS.find(function (s) { return s.id === stepId; });
    if (!step) return value;
    var opt = step.options.find(function (o) { return o.value === value; });
    return opt ? opt.label : value;
}

function showResults() {
    // Hide question UI
    document.getElementById('questionCard').style.display = 'none';
    document.getElementById('navButtons').style.display = 'none';
    document.getElementById('progressBar').style.display = 'none';

    const panel = document.getElementById('resultsPanel');
    panel.style.display = 'block';

    const scored = scoreStrategies();
    const top = scored.slice(0, 6);

    // Profile summary
    let html = '<div class="profile-summary">';
    html += '<div class="profile-item">Role: <span>' + labelFor('role', answers.role) + '</span></div>';
    html += '<div class="profile-item">Market: <span>' + labelFor('market', answers.market) + '</span></div>';
    html += '<div class="profile-item">Target: <span>' + labelFor('income', answers.income) + '</span></div>';
    html += '<div class="profile-item">Barriers: <span>' + (answers.barriers || []).map(function (b) { return labelFor('barriers', b); }).join(', ') + '</span></div>';
    html += '</div>';

    // Strategy cards
    top.forEach(function (item, i) {
        var s = item.strategy;
        var impactClass = s.impact === 'high' ? 'impact-high' : s.impact === 'medium' ? 'impact-medium' : 'impact-low';
        var tagClass = s.impact === 'high' ? 'tag-high' : s.impact === 'medium' ? 'tag-medium' : 'tag-quick';
        var impactWidth = s.impact === 'high' ? '90%' : s.impact === 'medium' ? '60%' : '35%';
        var matchPct = Math.min(100, Math.round((item.score / 90) * 100));

        html += '<div class="result-section">';
        html += '<h3>' + (i + 1) + '. ' + s.name + '</h3>';
        html += '<p style="color:#90a4ae;font-size:0.9rem;margin-bottom:0.8rem;">' + s.desc + '</p>';
        html += '<div style="margin-bottom:0.7rem;">';
        html += '<span class="tag ' + tagClass + '">' + s.impact.charAt(0).toUpperCase() + s.impact.slice(1) + ' Impact</span>';
        html += '<span class="tag tag-quick">' + s.timeframe + '</span>';
        html += '<span style="font-size:0.8rem;color:#607d8b;margin-left:0.5rem;">' + matchPct + '% match</span>';
        html += '</div>';
        html += '<div class="impact-bar"><div class="impact-bar-fill ' + impactClass + '" style="width:' + impactWidth + ';"></div></div>';
        html += '<ul style="margin-top:0.8rem;">';
        s.actions.forEach(function (a) {
            html += '<li>\u2022 ' + a + '</li>';
        });
        html += '</ul>';
        html += '</div>';
    });

    document.getElementById('resultsContent').innerHTML = html;
}

function restartDiagnostic() {
    currentStep = 0;
    for (var key in answers) {
        if (answers.hasOwnProperty(key)) delete answers[key];
    }
    document.getElementById('questionCard').style.display = '';
    document.getElementById('navButtons').style.display = '';
    document.getElementById('progressBar').style.display = '';
    document.getElementById('resultsPanel').style.display = 'none';
    render();
}
