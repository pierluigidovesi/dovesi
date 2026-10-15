# Project guidance

- Keep the Hough canvas animated by scrolling. Render its curves in an OffscreenCanvas worker where supported so native desktop scrolling stays responsive; retain a main-thread fallback, composited layer, capped backing resolution, and reduced-motion support.
