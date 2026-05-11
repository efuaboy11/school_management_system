import type { Metadata } from "next";
import {Inter } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap JS
import { ThemeProvider } from "@/context/ThemeContext";
import { ThemeToggleButton } from "@/components/themeToggleButton";
import '../css/site.css'
import  { AuthProvider } from "@/context/AuthContext";
import '@fortawesome/fontawesome-svg-core/styles.css'; // Prevents auto-adding CSS
import '../libs/fontawesome';
import { AllDataProvider } from "@/context/AllData";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../css/authCss/auth.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <AllDataProvider>
            <ThemeProvider>
              <div>
                <div>
                  <ThemeToggleButton />
                </div>
              </div>
              {children}
            </ThemeProvider>
          </AllDataProvider>
        </AuthProvider>


      </body>
    </html>
  );
}
