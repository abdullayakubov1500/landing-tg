import { Unbounded, Manrope } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";

const display = Unbounded({
  subsets: ["latin", "cyrillic"],
  variable: "--font-display",
});

const sans = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Оксид — сайт, который сам собирает заявки",
  description:
    "Веб-ателье: продающие лендинги с ИИ-квизом, админкой заявок и дублем в Telegram.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" suppressHydrationWarning className={`${display.variable} ${sans.variable} h-full`}>
      <body className="min-h-full bg-bg font-sans text-fg antialiased">
        <Providers>
          <div className="grain" aria-hidden="true" />
          {children}
        </Providers>
      </body>
    </html>
  );
}
