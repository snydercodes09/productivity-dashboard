## 2026-08-07 - Add strict Content-Security-Policy (CSP)
**Vulnerability:** Missing CSP allows unauthorized scripts to run and external connections.
**Learning:** React applications need tailored CSPs that whitelist necessary external origins (e.g., Unsplash, Open-Meteo, DummyJSON) and avoid `unsafe-inline` for scripts.
**Prevention:** Include a carefully crafted CSP in the root HTML template (e.g., `index.html`) early in the project setup, specifically limiting `script-src` and `connect-src`.

## 2026-08-09 - Remove unsafe-eval from CSP and consolidate duplicates
**Vulnerability:** Duplicate conflicting CSPs in index.html where one allowed unsafe-eval, risking code injection (e.g., via prototype pollution or malicious scripts executing strings as code).
**Learning:** Vite dev tools might require unsafe-inline for styles/scripts in some configurations, but unsafe-eval is generally not required for standard React builds and opens up severe injection vectors. Multiple CSPs result in the most restrictive intersection, but it's confusing and error-prone.
**Prevention:** Regularly audit CSP tags to ensure no unsafe directives are left over from debugging or copy-pasting, and ensure only one consolidated CSP exists to avoid unexpected behavior.

## 2026-08-20 - Prevent client-side DoS via local storage exhaustion
**Vulnerability:** Input fields lacking state-level constraints allowed excessively long strings to be generated, potentially leading to local storage quota exhaustion and causing a client-side Denial of Service.
**Learning:** Relying solely on HTML `maxLength` attributes is insufficient, as DOM constraints can be bypassed or fail to prevent programmatic large string insertions. Local storage limits are small (often 5MB), and unconstrained inputs can fill it quickly, preventing the app from saving essential data or crashing it entirely.
**Prevention:** Always enforce strict input length limits and validation at the JavaScript/state level before writing any data to persistent storage, including local storage.
