import typography from "@tailwindcss/typography";
import forms from "@tailwindcss/forms";
import aspectRatio from "@tailwindcss/aspect-ratio";
import containerQueries from "@tailwindcss/container-queries";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "var(--color-primary)",
        "primary-gradient": "var(--color-primary-gradient)",
        "primary-hover": "var(--color-primary-hover)",
        "primary-text": "var(--color-primary-text)",

        "themed-text": "var(--text-color)",
        "themed-bg": "var(--general-background-color)",
        "themed-insert": "var(--insert-background-color)",

        "navbar-border": "var(--nav-border-color)",
        "nav-element-hover": "var(--nav-element-background-color-hover)",
        "nav-element-deployed": "var(--nav-deployed-element-background-color)",
        "nav-element-selected-text": "var(--nav-selected-element-text-color)",

        "insert-border": "var(--insert-border)",
      },
      boxShadow: {
        "nav": "var(--nav-box-shadow)",
        "insert": "var(--insert-box-shadow)",
      }
    },
  },
  plugins: [
    typography,
    forms,
    aspectRatio,
    containerQueries,
  ],
}

