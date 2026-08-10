## 2026-08-07 - Add strict Content-Security-Policy (CSP)
**Vulnerability:** Missing CSP allows unauthorized scripts to run and external connections.
**Learning:** React applications need tailored CSPs that whitelist necessary external origins (e.g., Unsplash, Open-Meteo, DummyJSON) and avoid `unsafe-inline` for scripts.
**Prevention:** Include a carefully crafted CSP in the root HTML template (e.g., `index.html`) early in the project setup, specifically limiting `script-src` and `connect-src`.

## 2026-08-09 - Remove unsafe-eval from CSP and consolidate duplicates
**Vulnerability:** Duplicate conflicting CSPs in index.html where one allowed unsafe-eval, risking code injection (e.g., via prototype pollution or malicious scripts executing strings as code).
**Learning:** Vite dev tools might require unsafe-inline for styles/scripts in some configurations, but unsafe-eval is generally not required for standard React builds and opens up severe injection vectors. Multiple CSPs result in the most restrictive intersection, but it's confusing and error-prone.
**Prevention:** Regularly audit CSP tags to ensure no unsafe directives are left over from debugging or copy-pasting, and ensure only one consolidated CSP exists to avoid unexpected behavior.

## 2026-08-11 - Enforce State-Level Input Length Limits (Local Storage DoS)
**Vulnerability:** Relying solely on HTML `maxLength` attributes to limit input size.
**Learning:** HTML attributes can be bypassed easily by users or malicious scripts. If unchecked inputs are saved to persistent storage like `localStorage`, it can quickly exhaust the 5MB storage limit, leading to client-side Denial of Service (DoS) where the application crashes or fails to save critical data.
**Prevention:** Always enforce input length limits and validation at the JavaScript/state level before writing to persistent storage, regardless of HTML validations.
