## 2024-08-05 - [Code Splitting Modals]
**Learning:** Initial bundle size can be significantly bloated by importing all modal components upfront, even though users only interact with one at a time.
**Action:** Use React's lazy and Suspense to dynamically import modal components only when they are opened, reducing the initial JS payload.
## 2025-02-12 - Optimize Unsplash Image Loading in Grid Layouts
**Learning:** Loading high-resolution Unsplash images (e.g., `w=2000`) for responsive grid layouts where images are constrained to 1/3 or 2/3 of the container width creates a massive, unnecessary network and memory bottleneck (approx 2MB total).
**Action:** Always constrain Unsplash (or any remote) image parameters (e.g., using `w=800` or `w=1000`) appropriately for their rendered display size, particularly in grid layouts, to significantly reduce payload size and improve time-to-interactive.
