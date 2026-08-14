## 2026-08-07 - Add strict Content-Security-Policy (CSP)
**Vulnerability:** Missing CSP allows unauthorized scripts to run and external connections.
**Learning:** React applications need tailored CSPs that whitelist necessary external origins (e.g., Unsplash, Open-Meteo, DummyJSON) and avoid `unsafe-inline` for scripts.
**Prevention:** Include a carefully crafted CSP in the root HTML template (e.g., `index.html`) early in the project setup, specifically limiting `script-src` and `connect-src`.

## 2026-08-09 - Remove unsafe-eval from CSP and consolidate duplicates
**Vulnerability:** Duplicate conflicting CSPs in index.html where one allowed unsafe-eval, risking code injection (e.g., via prototype pollution or malicious scripts executing strings as code).
**Learning:** Vite dev tools might require unsafe-inline for styles/scripts in some configurations, but unsafe-eval is generally not required for standard React builds and opens up severe injection vectors. Multiple CSPs result in the most restrictive intersection, but it's confusing and error-prone.
**Prevention:** Regularly audit CSP tags to ensure no unsafe directives are left over from debugging or copy-pasting, and ensure only one consolidated CSP exists to avoid unexpected behavior.

## 2026-08-14 - Fix local storage DoS vulnerability
**Vulnerability:** Client-Side DoS via Local Storage Exhaustion.
**Learning:** Relying solely on HTML `maxLength` attributes to limit input size before persisting it to local storage is insecure as these can be trivially bypassed by malicious users directly modifying the DOM or using automated tools.
**Prevention:** Always enforce strict input length validation and truncation at the JavaScript/state level before writing user input to persistent storage.
