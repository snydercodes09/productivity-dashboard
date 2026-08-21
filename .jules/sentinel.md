## 2026-08-07 - Add strict Content-Security-Policy (CSP)
**Vulnerability:** Missing CSP allows unauthorized scripts to run and external connections.
**Learning:** React applications need tailored CSPs that whitelist necessary external origins (e.g., Unsplash, Open-Meteo, DummyJSON) and avoid `unsafe-inline` for scripts.
**Prevention:** Include a carefully crafted CSP in the root HTML template (e.g., `index.html`) early in the project setup, specifically limiting `script-src` and `connect-src`.

## 2026-08-09 - Remove unsafe-eval from CSP and consolidate duplicates
**Vulnerability:** Duplicate conflicting CSPs in index.html where one allowed unsafe-eval, risking code injection (e.g., via prototype pollution or malicious scripts executing strings as code).
**Learning:** Vite dev tools might require unsafe-inline for styles/scripts in some configurations, but unsafe-eval is generally not required for standard React builds and opens up severe injection vectors. Multiple CSPs result in the most restrictive intersection, but it's confusing and error-prone.
**Prevention:** Regularly audit CSP tags to ensure no unsafe directives are left over from debugging or copy-pasting, and ensure only one consolidated CSP exists to avoid unexpected behavior.

## 2026-08-21 - Prevent Local Storage Exhaustion via JS-level input limits
**Vulnerability:** Relying solely on HTML 'maxLength' allows bypassing input limits, which can exhaust 'localStorage' quotas (typically 5MB), causing a client-side DoS.
**Learning:** Malicious inputs or direct API interaction can easily bypass HTML constraints. Security boundaries must be enforced at the state/logic level before persisting data.
**Prevention:** Enforce input truncation (e.g., '.substring()') directly inside event handlers or state setters before saving to persistent storage like 'localStorage'.
