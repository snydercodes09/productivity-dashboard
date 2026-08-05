## 2024-05-18 - Input Length Limitations for LocalStorage Exhaustion
**Vulnerability:** Missing input length limits on Todo, Planner, and Goals modals can allow extremely long strings to be added. Because these are synced to LocalStorage, users might accidentally or maliciously write unbounded strings, causing LocalStorage capacity exhaustion and potential main-thread blockages.
**Learning:** React hooks synced with LocalStorage are vulnerable if they do not validate string length before setting state. Since inputs can be arbitrarily large, setting the maximum length directly on inputs acts as a quick line of defense. `prompt` dialogs can also bypass UI maxlength limitations, requiring server-side or business logic clipping.
**Prevention:** Always add `maxLength` attributes to form inputs, and explicitly slice or limit variable size before persisting inputs out of controlled elements like `prompt()` to local state.
## 2023-10-27 - Content Security Policy added
**Vulnerability:** Missing Content Security Policy (CSP) header
**Learning:** Adding a CSP header significantly mitigates Cross-Site Scripting (XSS) and other code injection attacks by restricting the sources of executable scripts, stylesheets, and other resources.
**Prevention:** Always include a CSP header in the main HTML file of web applications.
