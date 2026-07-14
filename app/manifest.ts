import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "AXIS Robotics",
    short_name: "AXIS",
    description:
      "工業機器人學習、題庫特訓、弱點複習與能力追蹤平台。",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#050505",
    theme_color: "#050505",
    orientation: "any",

    categories: [
      "education",
      "productivity"
    ],

    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable"
      }
    ],

    shortcuts: [
      {
        name: "今日學習",
        short_name: "今日",
        url: "/",
        icons: [
          {
            src: "/icon.svg",
            sizes: "any",
            type: "image/svg+xml"
          }
        ]
      },
      {
        name: "開始特訓",
        short_name: "特訓",
        url: "/practice",
        icons: [
          {
            src: "/icon.svg",
            sizes: "any",
            type: "image/svg+xml"
          }
        ]
      }
    ]
  };
}
