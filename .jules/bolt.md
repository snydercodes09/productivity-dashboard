## 2024-08-05 - [Code Splitting Modals]
**Learning:** Initial bundle size can be significantly bloated by importing all modal components upfront, even though users only interact with one at a time.
**Action:** Use React's lazy and Suspense to dynamically import modal components only when they are opened, reducing the initial JS payload.
## 2023-10-27 - Cache API Calls with Stale-while-revalidate for Instant UX
**Learning:** Initializing React state directly from `localStorage` using a lazy initializer (`useState(() => ...)`) combined with a caching mechanism (stale-while-revalidate) for remote APIs provides instant perceived load times and eliminates layout shifts caused by "Loading..." states, bypassing network latency.
**Action:** Always consider `localStorage` for semi-static API responses to hydrate state synchronously on mount, and skip network calls if the data is sufficiently fresh.
