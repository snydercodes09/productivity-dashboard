## 2024-08-05 - [Code Splitting Modals]
**Learning:** Initial bundle size can be significantly bloated by importing all modal components upfront, even though users only interact with one at a time.
**Action:** Use React's lazy and Suspense to dynamically import modal components only when they are opened, reducing the initial JS payload.

## 2024-08-08 - [Memoizing Derived Lists with Controlled Inputs]
**Learning:** In components with controlled inputs (like `TodoModal.jsx`), the component re-renders on every keystroke. Derived state calculations like array filtering without memoization execute unnecessarily, creating O(N) operations that can block the main thread and cause input lag as the array grows.
**Action:** Use `useMemo` to cache derived list calculations that depend on props or state, ensuring they only recalculate when their specific dependencies (like the array or filter mode) change, rather than on unrelated state changes like text inputs.

## 2024-05-17 - Bypassing Expensive Browser APIs (Geolocation) with Cache
**Learning:** Browser APIs like `navigator.geolocation` can be extremely slow (up to 10 seconds timeout) and resource-intensive (waking up GPS hardware, showing permission prompts), which blocks or delays application initialization. Checking cache only right before a network fetch is insufficient if we still pay the cost of geolocation first.
**Action:** Always place cache checks *before* expensive browser APIs like Geolocation or Bluetooth, not just before the network request. If fresh data exists, skip the hardware API entirely to save battery and avoid UI latency.
## 2025-02-20 - Syncing UI clocks efficiently
**Learning:** React state updates driven by fixed intervals (like `setInterval(fn, 1000)`) for minute-precision UI clocks cause 59 unnecessary CPU wakeups and React render passes per minute. This is a common performance anti-pattern in long-running dashboard tabs that drains battery and steals main thread time.
**Action:** Next time, always sync clock updates to the actual system rollover by calculating `60000 - (now.getSeconds() * 1000 + now.getMilliseconds())` and using a recursive `setTimeout`.
