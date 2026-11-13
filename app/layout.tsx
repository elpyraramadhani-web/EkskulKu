import { Suspense } from "react";
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: {
    template: "%s · EkskulKu",
    default: "EkskulKu",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        <Suspense fallback={null}>
        <Navbar />
        </Suspense>
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}