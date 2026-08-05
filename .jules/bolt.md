## 2024-08-05 - [Code Splitting Modals]
**Learning:** Initial bundle size can be significantly bloated by importing all modal components upfront, even though users only interact with one at a time.
**Action:** Use React's lazy and Suspense to dynamically import modal components only when they are opened, reducing the initial JS payload.
