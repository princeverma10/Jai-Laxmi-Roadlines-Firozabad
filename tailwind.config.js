tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#0B3D91", // Trustworthy Blue (#0B3D91)
        secondary: "#F57C00", // Action Orange (#F57C00)
        accent: "#FFC107", // Alert Yellow (#FFC107)
        background: "#FFFFFF",
        text: "#222222",
        "primary-fixed-dim": "#b1c5ff",
        "error": "#ba1a1a",
        "on-secondary-fixed": "#311300",
        "primary-fixed": "#dae2ff",
        "tertiary-fixed": "#ffdf9e",
        "outline": "#747783",
        "error-container": "#ffdad6",
        "on-tertiary-fixed-variant": "#5b4300",
        "on-primary-container": "#8dadff",
        "surface-dim": "#dcd9d9",
        "on-secondary-fixed-variant": "#723600",
        "secondary-fixed-dim": "#ffb786",
        "surface": "#fcf9f8",
        "surface-container": "#f0eded",
        "tertiary": "#3a2a00",
        "on-background": "#1b1c1c",
        "on-error-container": "#93000a",
        "on-surface": "#1b1c1c",
        "surface-container-lowest": "#ffffff",
        "tertiary-fixed-dim": "#fabd00",
        "surface-bright": "#fcf9f8",
        "on-primary-fixed": "#001947",
        "secondary-container": "#fc820c",
        "on-primary": "#ffffff",
        "on-primary-fixed-variant": "#144296",
        "surface-tint": "#345baf",
        "on-secondary-container": "#5e2c00",
        "on-tertiary-container": "#dda600",
        "surface-container-high": "#eae7e7",
        "on-secondary": "#ffffff",
        "tertiary-container": "#563f00",
        "on-tertiary": "#ffffff",
        "on-error": "#ffffff",
        "on-surface-variant": "#434652",
        "on-tertiary-fixed": "#261a00",
        "secondary-fixed": "#ffdcc6",
        "surface-container-highest": "#e5e2e1",
        "surface-glass": "rgba(255, 255, 255, 0.7)",
        "primary-container": "#0b3d91",
        "surface-variant": "#e5e2e1",
        "border-subtle": "#E5E7EB",
        "bg-foundation": "#F9FAFB",
        "outline-variant": "#c4c6d3",
        "inverse-surface": "#303030",
        "surface-container-low": "#f6f3f2",
        "inverse-primary": "#b1c5ff",
        "inverse-on-surface": "#f3f0ef"
      },
      borderRadius: {
        "DEFAULT": "0.5rem", // standard rounded corners (8px)
        "sm": "0.25rem", // small elements (4px)
        "md": "0.75rem", // medium cards (12px)
        "lg": "1rem", // large cards (16px)
        "xl": "1.5rem", // large containers/imagery (24px)
        "full": "9999px"
      },
      spacing: {
        "unit": "8px",
        "margin-mobile": "16px",
        "stack-lg": "32px",
        "container-max": "1280px",
        "gutter": "24px",
        "margin-desktop": "40px",
        "stack-md": "16px",
        "stack-sm": "8px"
      },
      fontFamily: {
        "display-lg-mobile": ["Montserrat", "Poppins", "sans-serif"],
        "headline-md": ["Montserrat", "Poppins", "sans-serif"],
        "headline-sm": ["Montserrat", "Poppins", "sans-serif"],
        "label-bold": ["Inter", "sans-serif"],
        "button-text": ["Montserrat", "Poppins", "sans-serif"],
        "body-md": ["Inter", "sans-serif"],
        "display-lg": ["Montserrat", "Poppins", "sans-serif"],
        "body-lg": ["Inter", "sans-serif"]
      },
      fontSize: {
        "display-lg-mobile": ["32px", { "lineHeight": "40px", "fontWeight": "700" }],
        "headline-md": ["32px", { "lineHeight": "40px", "fontWeight": "700" }],
        "headline-sm": ["24px", { "lineHeight": "32px", "fontWeight": "600" }],
        "label-bold": ["14px", { "lineHeight": "20px", "fontWeight": "600" }],
        "button-text": ["16px", { "lineHeight": "24px", "fontWeight": "600" }],
        "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
        "display-lg": ["48px", { "lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
        "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }]
      }
    }
  }
};
