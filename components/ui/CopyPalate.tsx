import { useState } from "react";

interface Tab {
  label: string;
  content: string;
}

interface TabsProps {
  tabs: Tab[];
  maxHeight?: string; // optional max height
}

export default function Tabs({ tabs, maxHeight = "64" }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Copied to clipboard!");
    });
  };

  return (
    <div className="w-full max-w-lg mx-auto p-4 border rounded-lg shadow-md">
      {/* Tab buttons */}
      <div className="flex border-b mb-4">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`px-4 py-2 -mb-px font-medium border-b-2 ${
              index === activeIndex
                ? "border-blue-500 text-blue-500"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="relative">
        <pre
          className={`bg-gray-100 p-4 rounded-lg overflow-x-auto overflow-y-auto max-h-[${maxHeight}rem] whitespace-pre-wrap`}
        >
          {tabs[activeIndex].content}
        </pre>
        <button
          onClick={() => copyToClipboard(tabs[activeIndex].content)}
          className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-sm hover:bg-blue-600"
        >
          Copy
        </button>
      </div>
    </div>
  );
}


// Usage Guide
{/* <CopyPalate
    tabs={[
    { label: "JavaScript", content: "console.log('Hello World');" },
    { label: "Python", content: "print('Hello World')" },
    { label: "HTML", content: "<h1>Hello World</h1>" },
    ]}
/> */}