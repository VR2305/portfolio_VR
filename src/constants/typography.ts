// src/constants/typography.ts
export const FONT_FAMILY = {
  primary: "'Inter', sans-serif",
  secondary: "'Dancing Script', cursive",
};

export const FONT_SIZE = {
  // Expressive yet scalable sizes using clamp for responsiveness
  xs: "clamp(0.75rem, 1vw, 0.875rem)",
  sm: "clamp(1rem, 1.2vw, 1.125rem)",
  md: "clamp(1.25rem, 1.5vw, 1.5rem)",
  lg: "clamp(1.5rem, 2vw, 1.75rem)",
  xl: "clamp(2.4rem, 4.5vw, 3.75rem)", // Used for major headings
  xl2: "clamp(2.6rem, 5vw, 4.2rem)", // Dancing Script headline
  body: "clamp(1rem, 1.3vw, 1.125rem)",
  small: "clamp(0.875rem, 1.1vw, 1rem)",
};
