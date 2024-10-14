"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { PanelsTopLeft, User, Menu as MenuIcon } from "lucide-react";
import Link from "next/link";

export function Sidebar({ setIsClosed }) {
  const [isOpen, setIsOpen] = useState(false);
console.log(setIsClosed);

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-20 h-screen bg-gray-300 dark:bg-gray-800 shadow-xl text-white transition-transform duration-300",
        isOpen ? "w-56" : "w-[80px] -translate-x-full lg:translate-x-0"
      )}
    >
      <SidebarToggle isOpen={isOpen} setIsOpen={setIsOpen} setIsClosed={setIsClosed} />

      <div className="relative h-full flex flex-col px-4 py-6 bg-gray-300 dark:bg-gray-800">
        <Link href="/dashboard" className="flex items-center gap-3 mb-6">
          <PanelsTopLeft className="w-6 h-6" />
          <h1 className={cn("font-bold text-xl transition-all duration-300", isOpen ? "opacity-100" : "opacity-0")}>
            Brand
          </h1>
        </Link>

        <Menu isOpen={isOpen} />

        <div className="mt-auto border-t border-gray-700 pt-4">
          <Link href="/sign-up" className="flex items-center gap-3 hover:bg-gray-400 hover:dark:bg-gray-900 p-2 rounded-md transition-colors duration-200">
            <User className="w-6 h-6" />
            <span className={cn("font-medium transition-all duration-300", isOpen ? "opacity-100" : "opacity-0")}>
              Profile
            </span>
          </Link>
        </div>
      </div>
    </aside>
  );
}

function SidebarToggle({ isOpen, setIsOpen, setIsClosed }) {
  function handleClick() {
    setIsOpen(!isOpen);
    setIsClosed(!isOpen);
  }

  return (
    <button
      onClick={handleClick}
      className="p-2 text-white hover:bg-gray-400 hover:dark:bg-gray-900 rounded-md transition-all duration-300 ml-2"
    >
      <MenuIcon className={`w-6 h-6 ${isOpen ? "" : "rotate-180"}`} />
    </button>
  );
}

function Menu({ isOpen }) {
  return (
    <nav className="mt-8 flex-1">
      <ul className="space-y-4">
        <li>
          <Link href="/settings" className="flex items-center gap-3 hover:bg-gray-400 hover:dark:bg-gray-900 p-2 rounded-md transition-colors duration-200">
            <span className={cn("font-medium transition-all duration-300", isOpen ? "opacity-100" : "opacity-0")}>
              Settings
            </span>
          </Link>
        </li>
        <li>
          <Link href="/help" className="flex items-center gap-3 hover:bg-gray-400 hover:dark:bg-gray-900 p-2 rounded-md transition-colors duration-200">
            <span className={cn("font-medium transition-all duration-300", isOpen ? "opacity-100" : "opacity-0")}>
              Help
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
