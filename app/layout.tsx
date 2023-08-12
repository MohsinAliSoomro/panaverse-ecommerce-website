import Navbar from "@/components/navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "./components/commons/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dino Market",
  description: "Dino Market to sell products",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`overflow-x-hidden ${inter.className}`}>
          <Navbar />
          {children}
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              className: "backdrop-blur p-3 bg-blue-400/30",
              style: {
                backgroundColor: "rgba(255, 255, 255, 0.4)",
                backdropFilter: " blur(5px);",
                padding: "10px",
              },
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
