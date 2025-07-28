import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "@/store/provider";

export const metadata: Metadata = {
  title: "Resume Builder App",
  description:
    "Create a professional resume in minutes with our easy-to-use resume builder. Choose from modern templates, customize your content, and download in PDF format.",
};

import {
  Rubik,
  Arimo,
  Lato,
  Raleway,
  Bitter,
  Exo_2,
  Chivo,
  Tinos,
  Montserrat,
  Oswald,
  Volkhov,
  Gelasio,
} from "next/font/google";

const rubik = Rubik({ subsets: ["latin"], variable: "--font-rubik" });
const arimo = Arimo({ subsets: ["latin"], variable: "--font-arimo" });
const lato = Lato({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-lato",
});
const raleway = Raleway({ subsets: ["latin"], variable: "--font-raleway" });
const bitter = Bitter({ subsets: ["latin"], variable: "--font-bitter" });
const exo2 = Exo_2({ subsets: ["latin"], variable: "--font-exo2" });
const chivo = Chivo({ subsets: ["latin"], variable: "--font-chivo" });
const tinos = Tinos({weight:"400", subsets: ["latin"], variable: "--font-tinos" });
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
const volkhov = Volkhov({weight:"400", subsets: ["latin"], variable: "--font-volkhov" });
const gelasio = Gelasio({ subsets: ["latin"], variable: "--font-gelasio" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${rubik.variable} ${arimo.variable} ${lato.variable} ${raleway.variable} ${bitter.variable} ${exo2.variable} ${chivo.variable} ${tinos.variable} ${montserrat.variable} ${oswald.variable} ${volkhov.variable} ${gelasio.variable}`}
    >
      <body>
        <div>
          <StoreProvider>{children}</StoreProvider>
        </div>
         <div id="modal-portal" />
      </body>
    </html>
  );
}
