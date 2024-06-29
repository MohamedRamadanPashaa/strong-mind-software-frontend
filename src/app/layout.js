import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navigation/Navbar";
import StoreProvider from "@/store/storeProvider";
import AuthProvider from "@/AuthProvider/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Strong Mind",
    template: "Strong Mind | %s",
  },
  description:
    "Master your memory with our ultimate training platform. Train across all memory disciplines with national, international, and world standards, or customize your training settings. Join a vibrant community of memory athletes, engage in dynamic chat pages, and compete in exciting competitions. Enhance your cognitive skills and achieve peak memory performance today!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <AuthProvider>
          <StoreProvider>
            <div id="backdrop-hook"></div>
            <div id="modal-hook"></div>

            <Navbar />

            <main>{children}</main>
          </StoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
