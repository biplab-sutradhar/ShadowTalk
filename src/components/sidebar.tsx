"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Home, Settings, HelpCircle, Menu as MenuIcon, User, Send } from "lucide-react";
import Link from "next/link";

export function Sidebar({ setIsClosed }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
    setIsClosed((prev) => !prev);
  };

  const navItems = [
    { href: "/dashboard", icon: <Home className="w-6 h-6" />, label: "Dashboard" },
    { href: "/message", icon: <Send className="w-6 h-6" />, label: "Message" },
    // { href: "/settings", icon: <Settings className="w-6 h-6" />, label: "Settings" },
    { href: "/help", icon: <HelpCircle className="w-6 h-6" />, label: "Help" },
  ];

  return (
    <aside className={cn("fixed top-0 left-0 z-20 h-screen bg-gray-300 dark:bg-gray-800 shadow-xl text-white transition-transform duration-", isOpen ? "w-52" : "w-[80px] -translate-x-full lg:translate-x-0")}>
      <button onClick={toggleSidebar} className="p-2 text-white hover:bg-gray-400 hover:dark:bg-gray-900 rounded-md transition-all duration- ml-2">
        <MenuIcon className={`w-6 h-6 ${isOpen ? "" : "rotate-180"}`} />
      </button>

      {isOpen && (
        <div className="relative h-[90%] flex flex-col px-4 py-6">
          <nav className="mt-8 flex-1">
            <ul className="space-y-4">
              {navItems.map(({ href, icon, label }) => (
                <li key={href}>
                  <Link href={href} className="flex items-center gap-3 p-2 text-white rounded-md hover:bg-gray-400 hover:dark:bg-gray-900 transition-colors duration-">
                    {icon}
                    <span className={cn("font-medium", isOpen ? "opacity-100" : "opacity-0")}>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto border-t border-gray-700 pt-4">
            <Link href="/sign-up" className="flex items-center gap-3 p-2 text-white rounded-md hover:bg-gray-400 hover:dark:bg-gray-900 transition-colors duration-">
              <User className="w-6 h-6" />
              <span className={cn("font-medium", isOpen ? "opacity-100" : "opacity-0")}>Profile</span>
            </Link>
          </div>
        </div>
      )}
    </aside>
  );
}
