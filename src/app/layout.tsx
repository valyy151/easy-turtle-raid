import "@/styles/globals.css";

import { Concert_One, Inter } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { Navbar } from "../components/navbar";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const concertOne = Concert_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-concert",
});

export const metadata = {
  title: "Easy Turtle Raid",
  description: "Turtle WoW Raiding Guide",
  icons: [{ rel: "icon", url: "/turtle.svg" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} ${concertOne.variable}`}>
        <TRPCReactProvider>
          <Navbar />
          {children}
          <Toaster />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
