import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "./components/authProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JobPuzzlePro",
  description: "Your Partner in Navigating the World of Jobs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={inter.className}
        style={{ margin: 0, overflowX: "hidden" }}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
