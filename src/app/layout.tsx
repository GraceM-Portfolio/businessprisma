import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      {/* Added overflow-x-hidden to body */}
      <body className="bg-brand-cream text-brand-charcoal antialiased min-h-screen flex flex-col overflow-x-hidden">
        <CartProvider>
          <Header />
          {/* Added w-full max-w-full overflow-hidden to main */}
          <main className="flex-grow w-full max-w-full overflow-hidden">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
