import type { Metadata } from "next";
import { Press_Start_2P, Caveat } from "next/font/google";
import "./globals.css";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start-2p",
});

const caveat = Caveat({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  title: "Doopiedéx",
  description: "Pokédex-style interface for the Doopies NFT collection on Solana",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${pressStart2P.variable} ${caveat.variable} font-sans antialiased bg-gradient-to-br from-pink-50 via-purple-50 via-blue-50 to-green-50 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]`}
      >
        {children}
      </body>
    </html>
  );
}
