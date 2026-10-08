import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import localFont from "next/font/local";
import CustomCursor from "./_components/CustomCursor";
import "./_styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400"],
});

const delamoore = localFont({
  src: "../public/fonts/Delamoore.woff",
  variable: "--font-delamoore",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://davidcardoso.dev"),
  title: {
    default: "David Cardoso — Creative Developer & Digital Architect",
    template: "%s | David Cardoso",
  },
  description:
    "Portfólio profissional de David Cardoso. Engenharia criativa, interfaces imersivas, WebGL, Next.js e design sensorial de alto desempenho.",
  keywords: [
    "David Cardoso",
    "Creative Developer",
    "Frontend Engineer",
    "Next.js",
    "React 19",
    "Design Imersivo",
    "WebGL",
    "Portfolio",
    "Matter.js",
    "Canvas 2D",
  ],
  authors: [{ name: "David Cardoso", url: "https://github.com/DavidCSdO" }],
  creator: "David Cardoso",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://davidcardoso.dev",
    siteName: "David Cardoso — Portfolio",
    title: "David Cardoso — Creative Developer & Digital Architect",
    description:
      "Do conceito à execução técnica. Interfaces de alto impacto, física em tempo real e arquitetura escalável.",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1200,
        height: 630,
        alt: "David Cardoso — Creative Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "David Cardoso — Creative Developer & Digital Architect",
    description:
      "Do conceito à execução técnica. Interfaces de alto impacto, física em tempo real e arquitetura escalável.",
    images: ["/images/hero.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} ${delamoore.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="film-grain-overlay" aria-hidden="true" />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
