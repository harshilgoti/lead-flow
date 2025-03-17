import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    // Ensure shadcn/ui is included
    "./node_modules/@shadcn/ui/dist/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
