"use client"

import { Menu, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import SearchModal from "../modal/SearchModal";

type Props = {
  onMenuClick: () => void;
};

export default function Navbar({ onMenuClick }: Props) {

  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  return (
    <div className="sticky top-0 z-3 w-full bg-white px-4 md:px-6 lg:px-8 2xl:px-0 py-4 flex items-center justify-between shadow">
      
      {/* Logo */}
      <h1 className="text-2xl font-bold tracking-tight">
        <Link href="/">Noor<span className="text-primary">Quran</span></Link>
      </h1>

      {/* Right Icons */}
      <div className="flex items-center gap-5">
        <Search onClick={() => setIsSearchOpen(true)} className="w-5 h-5 cursor-pointer text-gray-700 hover:text-primary transition" />
        <Menu
          className="w-6 h-6 cursor-pointer text-gray-800"
          onClick={onMenuClick}
        />
      </div>

      {/* Search Modal */}
      {isSearchOpen && <SearchModal onClose={() => setIsSearchOpen(false)} />}
    </div>
  );
}
