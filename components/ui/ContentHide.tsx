import { useState } from "react";

type FlipCardProps = {
  title: string;
  children: React.ReactNode;
  opened?: boolean;
};

export default function FlipCard({ title, children, opened = false }: FlipCardProps) {
  const [open, setOpen] = useState(opened);

  return (
    <div className="max-w-120 p-2 mx-auto">
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="w-full min-h-40 bg-white hover:bg-orange-400 rounded-2xl shadow-lg overflow-hidden 
                     transform transition-transform duration-200 hover:scale-105 
                     focus:outline-none focus:ring-1 focus:ring-black cursor-pointer"
          aria-expanded={open}
        >
          <div className="h-full flex flex-col items-center justify-center p-4">
              <p className="text-gray-700">{title}</p>
              <p className="text-sm text-gray-700">Open to get test materials</p>
          </div>
        </button>
      )}

      {open && (
        <div className="relative bg-white min-h-40 rounded-2xl shadow-sm p-6 text-gray-700">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 cursor-pointer"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-off-icon lucide-eye-off"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/></svg>
          </button>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">{title}</h3>
          <div className="text-sm leading-relaxed">{children}</div>
        </div>
      )}
    </div>
  );
}

{/* <FlipCard title="My Book" cover="https://placekitten.com/400/240">
  <p>This is the hidden content revealed when you click the cover.  
     Could be a description, stats, or extra details.</p>
</FlipCard> */}