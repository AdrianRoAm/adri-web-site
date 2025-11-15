import localFont from "next/font/local";

export const fontSans = localFont({
  src: [
    {
      path: "../../public/fonts/HelveticaNeue-ThinCond.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/HelveticaNeue-UltraLigCond.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/HelveticaNeue-LigCond.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/HelveticaNeue-Condensed.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/HelveticaNeue-MediumCond.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/HelveticaNeue-BoldCond.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/HelveticaNeue-HeavyCond.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/HelveticaNeue-BlackCond.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-sans",
});

export const fontSansOutline = localFont({
  src: [
    {
      path: "../../public/fonts/HelveticaNeue-Outline.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-sans-outline",
});