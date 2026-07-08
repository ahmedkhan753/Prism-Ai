import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Prism — AI voice agents & automation for real estate and construction",
  description:
    "Prism builds AI voice agents, follow-up automation, and insights for real estate and construction teams — capturing every lead and handling client calls around the clock.",
  keywords: [
    "AI voice agents",
    "real estate automation",
    "construction automation",
    "lead follow-up",
    "AI agency",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Prism — AI for real estate & construction",
    description:
      "AI voice agents, follow-up automation, and insights that capture every lead — with your team in control.",
    url: "/",
    siteName: "Prism",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prism — AI for real estate & construction",
    description:
      "AI voice agents, follow-up automation, and insights that capture every lead — with your team in control.",
  },
};

export const viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
