import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CHIN IT Tools — Free Online Tools for Developers & IT Professionals",
  description:
    "150+ free online tools for IT developers and networking professionals. JSON converters, regex tester, subnet calculator, code formatters, and more. By CHOMRAEUN CHIN.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-gray-50">
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
          <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
                C
              </div>
              <span className="text-lg font-bold text-gray-900">
                CHIN IT Tools
              </span>
            </Link>
            <nav className="flex items-center gap-4 text-sm text-gray-600">
              <Link href="/" className="hover:text-indigo-600">
                All Tools
              </Link>
              <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-600">
                150+ Free Tools
              </span>
            </nav>
          </div>
        </header>
        <main className="flex-1 px-4 py-6 sm:px-6">{children}</main>
        <footer className="border-t border-gray-200 bg-white py-6 text-center text-xs text-gray-500">
          <p>
            Built by <strong className="text-gray-700">CHOMRAEUN CHIN</strong>.
            All tools run in your browser — no data is sent to any server.
          </p>
        </footer>
      </body>
    </html>
  );
}
