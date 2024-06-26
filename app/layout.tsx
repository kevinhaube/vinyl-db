import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "some chick's vinyl collection",
  description: "curated by: hanna",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pageNames = ["about", "collections", "browse"]
  return (
    <html lang="en">
      <body className={inter.className}>
        <h1 className={"ml-2 font-black text-7xl spacing tracking-tighter"}>vinyl</h1>
        <nav>
          <ul className={"mt-6 ml-2"}>
            {pageNames.map((pn, idx) => <li key={idx} className={"leading-7 text-3xl"}>{pn}</li>)}
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}
