import "./globals.css";
import { Poppins, Playfair_Display } from "next/font/google";
import { Dancing_Script } from "next/font/google";
import Providers from "./providers";
import { Inter, Manrope, Plus_Jakarta_Sans } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta-sans",
});

const dancing = Dancing_Script({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-cursive",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-poppins",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-playfair",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${playfair.variable} ${dancing.variable} ${inter.variable} ${manrope.variable} ${jakarta.variable}`}
      >
        {/* {children} */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
