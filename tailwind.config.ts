import { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}", // Tailwind가 적용될 파일 경로
  ],
  theme: {
    extend: {
      screens: {
        sm: "320px", // 모바일 (기본값)
        md: "420px", // 넓은 모바일
        xl: "1024px", // 데스크톱
      },
    },
  },
  plugins: [],
};

export default config;
