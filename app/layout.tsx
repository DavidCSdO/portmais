import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import localFont from "next/font/local";
import CustomCursor from "./_components/CustomCursor";
import AmbientSpotlight from "./_components/AmbientSpotlight";
import "./_styles/globals.css";

const siteUrl = "https://portmais.vercel.app";

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
  metadataBase: new URL(siteUrl),
  title: {
    default: "David Cardoso — Sites e Sistemas Web",
    template: "%s | David Cardoso",
  },
  description:
    "Desenvolvimento de sites e sistemas web sob medida. Projetos acompanhados diretamente por David Cardoso, do escopo à publicação.",
  keywords: [
    "David Cardoso",
    "Desenvolvedor web",
    "Next.js",
    "React 19",
    "Sites sob medida",
    "Sistemas web",
    "Portfolio",
    "Matter.js",
    "Canvas 2D",
  ],
  authors: [{ name: "David Cardoso", url: "https://github.com/DavidCSdO" }],
  creator: "David Cardoso",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "David Cardoso",
    title: "David Cardoso — Sites e Sistemas Web",
    description:
      "Desenvolvimento de sites e sistemas web sob medida, com contato direto do início à publicação.",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1200,
        height: 630,
        alt: "David Cardoso — desenvolvimento web",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "David Cardoso — Sites e Sistemas Web",
    description:
      "Desenvolvimento de sites e sistemas web sob medida, com contato direto do início à publicação.",
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
        <AmbientSpotlight />
        {children}
      </body>
    </html>
  );
}
