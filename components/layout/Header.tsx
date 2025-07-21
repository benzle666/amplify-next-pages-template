import { Settings, Menu } from "lucide-react";
import User from "../ui/User";
import Link from "next/link";
import { useState } from "react";

type HeaderProps = {
  pageTitle: string;
};

export default function Header({ pageTitle }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b sm:px-6">
      {/* Left: App name + separator + page title */}
      <div className="flex items-center gap-2 text-pink-600 font-semibold">
        <Link href="/dashboard" className="text-xl">
          MyApp
        </Link>
        <span className="text-gray-400">|</span>
        <span className="text-base text-gray-700">{pageTitle}</span>
      </div>

      {/* Right side */}
      <div className="flex items-center">
        {/* Desktop view: User + Settings */}
        <div className="hidden sm:flex items-center gap-2">
          <User name="khoinguyenbenz@gmail.com" />
          <Link href="/setting">
            <Settings className="w-5 h-5 text-gray-500 cursor-pointer" />
          </Link>
        </div>

        {/* Mobile view: dropdown */}
        <div className="relative sm:hidden">
          <Menu
            className="w-5 h-5 text-gray-700 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          />
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
              <div className="px-4 py-2 border-b text-sm text-gray-600">
                <User name="khoinguyenbenz@gmail.com" />
              </div>
              <Link
                href="/setting"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Settings
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
