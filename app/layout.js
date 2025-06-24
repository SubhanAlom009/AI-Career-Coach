import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/themeProvider";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "SensAi",
  description: "sensAi is a SaaS",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className}`}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {/* Header */}
            <Header />

            {/* Main content */}
            <main className="flex min-h-screen flex-col mt-12">{children}</main>
            <Toaster richColors />

            {/* Footer */}
            <footer className="flex items-center justify-center border-t border-slate-700 p-4 text-sm text-gray-500">
              <div className="container mx-auto text-center">
                <p>
                  &copy; {new Date().getFullYear()} SensAi. All rights reserved.
                </p>
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
