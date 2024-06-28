import type { GetServerSideProps, Metadata } from 'next';
import { Inter } from "next/font/google";
import "./globals.css";
import Link from 'next/link';
import { SORTED_PAGES } from '@/data/legacy/filters';
import Navigation from '@/components/Navigation';
import { stringToColor } from '@/utils/color/stringToColor';

const inter = Inter({ subsets: ["latin"] });

const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      currentPath: context.resolvedUrl
    }
  };
};

export const metadata: Metadata = {
  title: "some chick's vinyl collection",
  description: "curated by: hanna",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const title = "vinyl"
  return (
    <html lang="en">
    <body className={inter.className}>
    <h1 className={"mt-6 ml-2 lg:ml-6 font-black text-7xl spacing tracking-tighter"}>
      {title.split('').map((char, index) => (
        <span key={index} style={{ color: stringToColor(char) }}>
          {char}
        </span>
      ))}
    </h1>
    <h1>

    </h1>
    <nav>
      <Navigation />
    </nav>
    {children}
    </body>
    </html>
  );
}
