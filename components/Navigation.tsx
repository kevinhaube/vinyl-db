"use client"
import React from 'react';
import Link from 'next/link';
import { SORTED_PAGES } from '@/data/filters';
import { usePathname } from 'next/navigation';
import { stringToColor } from '@/utils/color/stringToColor';

function Navigation() {
  const pathname = usePathname()
  const split = pathname.split("/");
  const filter = split[split.length - 1]
  const style = {
    color: stringToColor(filter, "first") // name of filter
  }
  return (
    <ul className={"mt-6 ml-2 lg:ml-6"}>
      {SORTED_PAGES.map((pn, idx) => (
        <li key={idx} style={filter === pn.slug ? style : {}} className={'leading-8 text-3xl '}>
          <Link href={`/browse/${pn.slug}`}>
            {pn.label}
          </Link>
        </li>
        ))}
    </ul>
  );
}

export default Navigation;
