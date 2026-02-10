import "./globals.css";
import { Poppins,Playfair_Display } from "next/font/google";
import { Dancing_Script } from "next/font/google";
import Providers from "./providers";
import { Manrope, Plus_Jakarta_Sans } from "next/font/google";
import { Inter, Roboto_Mono } from 'next/font/google'
import { Toaster } from "sonner";



const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})
 
const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
})

const cursive = Dancing_Script({
  subsets: ["latin"],
  display: 'swap',
  variable: "--font-cursive",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  // Add normal weights to avoid falling back when text isn't bold.
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <html lang="en" className={`${inter.variable} ${roboto_mono.variable} ${cursive.variable}`}>
     <html lang="en" className={`${inter.variable} ${roboto_mono.variable} ${poppins.variable} ${playfair.variable} ${cursive.variable} ${inter.variable} ${manrope.variable} ${jakarta.variable}`}> 
      <body>
        {/* {children} */}
        <Providers>{children}<Toaster /></Providers>
      </body>
    </html>
  );
}
