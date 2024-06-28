"use client"
import Link from 'next/link';
import React from 'react';
import { SORTED_PAGES } from '@/data/legacy/filters';
import { usePathname } from 'next/navigation';
import { stringToColor } from '@/utils/color/stringToColor';

function Navigation() {
  const pathname = usePathname()
  const split = pathname.split("/");
  const filter = split[split.length - 1]
  const style = {
    color: stringToColor(filter) // name of filter
  }
  return (
    <ul className={"mt-6 ml-2 lg:ml-6"}>
      {SORTED_PAGES.map((pn, idx) => (
        <Link key={idx} href={`/browse/${pn}`}>
          <li style={filter === pn ? style : {}} className={'leading-8 text-3xl '}>{pn}</li>
        </Link>
      ))}
    </ul>
  );
};

export default Navigation;
