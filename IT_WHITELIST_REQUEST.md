# IT Whitelist Request - Global Housing Database

**To:** IT Security / Firewall Administration
**Subject:** Domain Whitelist Request - globalhousingdatabase.com
**Priority:** Medium

---

## Request Summary

Please whitelist the following domain for access:
- **Domain:** `globalhousingdatabase.com`
- **Category:** Educational Research Resource
- **Purpose:** Housing policy research and data analysis

---

## Business Justification

### Site Description
Global Housing Data Visualization is an educational platform providing interactive data analysis for housing metrics across 91 countries. The site aggregates data from authoritative sources including:

- **OECD** Affordable Housing Database
- **World Bank** Global Debt Database & Housing Data
- **UN-Habitat** SDG 11.1.1 Slum/Informal Settlements Data
- **IMF** Global Debt Statistics
- **WorldRiskReport 2024** (Disaster Risk)
- **ILO** International Labour Organization Statistics
- **Eurostat** Housing Statistics

### Use Case
Required for:
- Housing policy research and comparative analysis
- International development project planning
- Urban planning data visualization
- Academic research on global housing affordability

### Security Assessment

**✅ Security Headers Verified:**
- HSTS enabled (2-year max-age with preload)
- Content-Security-Policy implemented
- X-Frame-Options: SAMEORIGIN
- X-Content-Type-Options: nosniff
- X-XSS-Protection enabled
- Referrer-Policy configured
- Permissions-Policy restrictive

**✅ No Security Risks:**
- Static educational content (HTML, CSS, JavaScript)
- No user authentication or data collection
- No forms or user input
- Publicly funded data sources only
- No malware signatures (verified via VirusTotal)

**✅ Infrastructure:**
- Hosted on: Vercel (enterprise CDN platform)
- HTTPS enforced with valid SSL certificate
- Security.txt published per RFC 9116

**✅ Domain Age:**
- Recently launched (2024/2025)
- Blocked due to "new domain" policy, not security threat
- No malicious content or phishing detected

### Verification Steps

IT can verify site safety:
1. **VirusTotal scan:** https://www.virustotal.com/gui/url/[site-url]
2. **SSL Labs test:** https://www.ssllabs.com/ssltest/analyze.html?d=globalhousingdatabase.com
3. **Security Headers:** https://securityheaders.com/?q=globalhousingdatabase.com
4. **View source:** All code is open-source and inspectable

### Alternative Verification

If direct whitelisting is not possible, please consider:
- **Time-limited access:** 30-day trial period
- **User-specific exception:** Whitelist for specific employees/departments
- **Content review:** IT review of site content before approval

---

## Technical Details

**Site Type:** Static web application (data visualization)
**Technologies:** HTML5, CSS3, JavaScript (Globe.GL library)
**External Dependencies:**
- unpkg.com (CDN for Globe.GL library)
- cdn.jsdelivr.net (TopoJSON data)

**No User Data Collection:** Site does not collect, store, or transmit user information

---

## Contact Information

**Site Maintainer:** Olivia Nielsen
**GitHub Repository:** https://github.com/olivianielsen15/global-housing
**Security Contact:** [Via GitHub Issues]

---

## Approval Request

Please approve whitelisting for:
- ✅ `globalhousingdatabase.com`
- ✅ `*.globalhousingdatabase.com` (if subdomains exist)

**Requested by:** [Employee Name]
**Department:** [Your Department]
**Date:** [Current Date]
**Business Need:** Research / Policy Analysis

---

Thank you for your consideration.
