## 2024-08-05 - [Code Splitting Modals]
**Learning:** Initial bundle size can be significantly bloated by importing all modal components upfront, even though users only interact with one at a time.
**Action:** Use React's lazy and Suspense to dynamically import modal components only when they are opened, reducing the initial JS payload.

## 2024-08-08 - [Memoizing Derived Lists with Controlled Inputs]
**Learning:** In components with controlled inputs (like `TodoModal.jsx`), the component re-renders on every keystroke. Derived state calculations like array filtering without memoization execute unnecessarily, creating O(N) operations that can block the main thread and cause input lag as the array grows.
**Action:** Use `useMemo` to cache derived list calculations that depend on props or state, ensuring they only recalculate when their specific dependencies (like the array or filter mode) change, rather than on unrelated state changes like text inputs.

## 2024-05-17 - Bypassing Expensive Browser APIs (Geolocation) with Cache
**Learning:** Browser APIs like `navigator.geolocation` can be extremely slow (up to 10 seconds timeout) and resource-intensive (waking up GPS hardware, showing permission prompts), which blocks or delays application initialization. Checking cache only right before a network fetch is insufficient if we still pay the cost of geolocation first.
**Action:** Always place cache checks *before* expensive browser APIs like Geolocation or Bluetooth, not just before the network request. If fresh data exists, skip the hardware API entirely to save battery and avoid UI latency.
## 2025-02-20 - Unnecessary Re-renders in Large Forms with LocalStorage
**Learning:** Binding `onChange` of multiple child inputs directly to a parent component's state (which then writes to `localStorage` via a custom hook) causes the entire parent and *all* child inputs to re-render on every single keystroke. In `PlannerModal`, this caused 24 inputs to re-render for a single character typed, leading to noticeable UI lag.
**Action:** Always extract items in a large list (especially inputs) into their own `React.memo` components, and pass them a stable callback (using `useCallback`) for updates. This ensures only the single input being typed into re-renders.
