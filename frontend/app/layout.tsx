import type { Metadata } from "next";
import { Inter } from "next/font/google";

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
      <head>
        <link rel="icon" type="image/png" href="Logochrome.png" />
      </head>
      <body
        className={inter.className}
        style={{ margin: 0, overflowX: "hidden" }}
      >
        {children}
      </body>
    </html>
  );
}
