import User from "../ui/User";
import Link from "next/link";
import Image from "next/image";

export default function Header() {

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b sm:px-6">
      {/* Left: App name*/}
      <div className="flex items-center">
        <Image src="/logo.png" alt="/" width={60} height={60}/>
        <Link
          href="/user/practice"
          className="text-xl font-bold bg-gradient-to-r from-yellow-500 to-red-500 bg-clip-text text-transparent"
        >
          Talkaura
        </Link>
      </div>

      {/* Right side */}
      <div className="flex items-center">
        {/* Desktop view: User + Settings */}
        <div className="hidden sm:flex items-center gap-2">
          <Link href="/user/setting" className="px-4">
            Setting
          </Link>
          <div className="px-4">
            <User name="khoinguyenbenz@gmail.com"/>
          </div>
        </div>

        {/* Mobile view: dropdown */}
        <div className="relative sm:hidden">
            <Link
              href="/setting"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Settings
            </Link>
        </div>
      </div>
    </header>
  );
}
