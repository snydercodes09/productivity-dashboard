## 2024-08-05 - [Code Splitting Modals]
**Learning:** Initial bundle size can be significantly bloated by importing all modal components upfront, even though users only interact with one at a time.
**Action:** Use React's lazy and Suspense to dynamically import modal components only when they are opened, reducing the initial JS payload.

## 2024-08-08 - [Memoizing Derived Lists with Controlled Inputs]
**Learning:** In components with controlled inputs (like `TodoModal.jsx`), the component re-renders on every keystroke. Derived state calculations like array filtering without memoization execute unnecessarily, creating O(N) operations that can block the main thread and cause input lag as the array grows.
**Action:** Use `useMemo` to cache derived list calculations that depend on props or state, ensuring they only recalculate when their specific dependencies (like the array or filter mode) change, rather than on unrelated state changes like text inputs.

## 2024-05-17 - Bypassing Expensive Browser APIs (Geolocation) with Cache
**Learning:** Browser APIs like `navigator.geolocation` can be extremely slow (up to 10 seconds timeout) and resource-intensive (waking up GPS hardware, showing permission prompts), which blocks or delays application initialization. Checking cache only right before a network fetch is insufficient if we still pay the cost of geolocation first.
**Action:** Always place cache checks *before* expensive browser APIs like Geolocation or Bluetooth, not just before the network request. If fresh data exists, skip the hardware API entirely to save battery and avoid UI latency.
## 2024-08-19 - PlannerModal TimeSlots Re-render Penalty
**Learning:** Found an anti-pattern in `PlannerModal.jsx` where 24 time slot inputs were rendered in a single loop, pulling state from a shared `plannerData` object. Because the inputs were not memoized, typing in *one* input caused a full re-render of all 24 inputs, leading to typing latency.
**Action:** Always extract items rendered in a large loop (especially inputs) into their own `React.memo` wrapped components. Pair this with `useCallback` and functional state updates `(prev => ...)` in the parent to keep the change handler reference stable, ensuring only the modified item re-renders.
