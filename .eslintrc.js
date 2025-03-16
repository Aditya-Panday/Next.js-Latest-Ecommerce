module.exports = {
  extends: [
    "next/core-web-vitals", // Next.js ke liye core rules
    "plugin:react/recommended", // React ke recommended rules
    "plugin:react-hooks/recommended", // React hooks ke recommended rules
  ],
  plugins: ["react", "react-hooks"],
  rules: {
    "no-console": "warn", // Console logs pe warning dega
    "react-hooks/rules-of-hooks": "error", // React hooks ke rules enforce karega
    "react-hooks/exhaustive-deps": "warn", // useEffect ke dependencies check karega
  },
  settings: {
    react: {
      version: "detect", // React version auto detect karega
    },
  },
};
