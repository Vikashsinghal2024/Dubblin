import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";


const Outfit = localFont({
  src: "./fonts/Outfit-VariableFont_wght.ttf",
  variable: "--font-Outfit",
  weight: "100-900",
});

const Cinzel = localFont({
  src: "./fonts/Cinzel-VariableFont_wght.ttf",
  variable: "--font-Cinzel",
  weight: "100-900",
})


export const metadata = {
  title: "Dubblin",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${Outfit.variable} ${Cinzel.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
