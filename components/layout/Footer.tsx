export default function Footer() {
  return (
    <footer className="w-full bg-white border-t mt-10">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
        
        {/* Left - Copyright */}
        <div className="mb-2 md:mb-0">
          © 2025 MyApp. All rights reserved.
        </div>

        {/* Right - Footer Links */}
        <div className="space-x-4">
          <a href="/privacy" className="hover:text-black">Privacy Policy</a>
          <a href="/terms" className="hover:text-black">Terms of Service</a>
          <a href="/contact" className="hover:text-black">Contact</a>
        </div>

      </div>
    </footer>
  );
}