"use client";

import { useContext } from "react";
import { BookingContext } from "./BookingContext";

export default function SectionHeader({ thisPageNumber }: { thisPageNumber: number }) {
  const { pageTitles } = useContext(BookingContext);

  return (
    <div className="text-lg font-bold p-4 bg-bredagh-maroon text-white flex justify-center gap-2">
      {pageTitles.map((title, idx) => (
        <span key={title} className={idx === thisPageNumber - 1 ? "font-bold text-bredagh-accent" : "text-white"}>
          {title}
          {idx < pageTitles.length - 1 && <span className="mx-2 text-gray-400">/</span>}
        </span>
      ))}
    </div>
  );
}
