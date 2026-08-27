# Security Policy & Zero-PII Protocol

## 🛡️ Security Architecture

IKOLI AI is built on clinical zero-trust, patient dignity, and frontline SecDevOps standards. The architecture strictly enforces:

1. **Zero-PII Standard**:
   - No patient biometric images or personal identifiable information are permanently persisted on cloud servers.
   - Clinical calculations and lesion feature extractions are processed ephemerally.
   - Public health epidemiological telemetry is anonymized with cryptographic HMAC tokens.

2. **Client-Side Security Hardening**:
   - **Content Security Policy (CSP)**: Strict resource origin restrictions preventing script injection, framing attacks, and unvetted data destinations.
   - **X-Content-Type-Options: nosniff**: Protects against MIME-type confusion vulnerabilities.
   - **Referrer-Policy: strict-origin-when-cross-origin**: Restricts leakage of sensitive query parameters across external origins.
   - **Zero Raw HTML Injection**: All clinical assistant responses and markdown streams are parsed into React tokens without `dangerouslySetInnerHTML`.

3. **SecDevOps & CI/CD Security Gate**:
   - Automated `npm audit --audit-level=high` runs on every pull request and weekly cron.
   - Strict TypeScript compilation (`tsc -b`) and static code hygiene checks.
   - Content Security Policy verification automated in `.github/workflows/secdevops.yml`.

## 🔒 Reporting a Vulnerability

If you discover a security vulnerability or clinical privacy concern, please disclose it responsibly:
- **Email**: security@ikoli.ng / privacy@redaidnigeria.org
- **Response SLA**: Initial triage within 24 hours; remediation within 72 hours.
