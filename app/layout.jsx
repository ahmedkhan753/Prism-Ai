import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://prism-ai.vercel.app"),
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
  openGraph: {
    title: "Prism — AI for real estate & construction",
    description:
      "AI voice agents, follow-up automation, and insights that capture every lead — with your team in control.",
    type: "website",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
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
