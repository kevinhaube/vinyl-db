import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from 'next/link';
import { SORTED_PAGES } from '@/data/legacy/filters';

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
  return (
    <html lang="en">
      <body className={inter.className}>
        <h1 className={"mt-6 ml-2 lg:ml-6 font-black text-7xl spacing tracking-tighter"}>vinyl</h1>
        <nav>
          <ul className={"mt-6 ml-2 lg:ml-6"}>
            {SORTED_PAGES.map((pn, idx) => (
              <Link key={idx} href={`/browse/${pn}`}>
                <li className={'leading-7 text-3xl'}>{pn}</li>
              </Link>
            ))}
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}
