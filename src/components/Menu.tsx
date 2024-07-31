"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import RetroGrid from "./RetroGrid";
import SearchBar from './SearchBar';

const Menu = () => {
  const [open, setOpen] = useState(false);



  return (
    <div className="">
      <Image
        src="/menu.png"
        alt=""
        width={28}
        height={28}
        className="cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div onClick={() => setOpen((p) => false)} className="absolute bg-blackk bg-opacity-90 backdrop-blur-sm  text-white left-0 top-20 w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-8 text-xl  z-30 ">
          <RetroGrid className="w-full h-full font-bold" />
          <Link className="animate-underline"  href="/">Homepage</Link>
          <Link className="animate-underline"  href="/list">Shop</Link>
          <Link className="animate-underline"  href="/">Deals</Link>
          <Link className="animate-underline"  href="/">About</Link>
          <Link className="animate-underline"  href="/">Contact</Link>
          <Link className="animate-underline"  href="/">Login</Link>
          <Link className="animate-underline"  href="/">Cart(1)</Link>
        </div>
      )}
    </div>
  );
};

export default Menu;