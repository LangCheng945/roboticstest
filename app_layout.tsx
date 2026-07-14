import type { Metadata, Viewport } from "next";

import "@/app/globals.css";

import { AppShell } from "@/components/app-shell";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: {
    default: "AXIS Robotics",
    template: "%s · AXIS Robotics"
  },

  description:
    "工業機器人學習、題庫特訓、弱點複習與能力追蹤平台。",

  applicationName: "AXIS Robotics",
  manifest: "/manifest.webmanifest",

  appleWebApp: {
    capable: true,
    title: "AXIS",
    statusBarStyle: "black-translucent"
  },

  formatDetection: {
    telephone: false
  },

  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#050505",
  colorScheme: "dark"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-Hant"
      className="dark"
      suppressHydrationWarning
    >
      <body>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
