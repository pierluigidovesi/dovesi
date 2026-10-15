# Project guidance

- Keep the decorative Hough canvas still during scrolling, isolated on its own composited layer with a capped backing resolution. Redraw only when the viewport or theme changes so native scrolling stays responsive.
