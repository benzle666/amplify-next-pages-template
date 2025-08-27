import React, { useState, useImperativeHandle, forwardRef } from "react";

export type LoaderHandle = {
  next: () => void;
  finish: () => void;
  reset: () => void;
};

type LoaderProps = {
  stepSize?: number;
};

const Loader = forwardRef<LoaderHandle, LoaderProps>(({ stepSize = 10 }, ref) => {
  const [percent, setPercent] = useState(0);

  useImperativeHandle(ref, () => ({
    next() {
      setPercent((prev) => (prev + stepSize < 100 ? prev + stepSize : prev));
    },
    finish() {
      setPercent(100);
    },
    reset() {
      setPercent(0);
    },
  }));

  return (
    <div className="w-full bg-gray-700 rounded-xl overflow-hidden h-0.5">
      <div
        className="bg-orange-500 text-white text-sm text-center h-full transition-all duration-300"
        style={{ width: `${percent}%` }}
      >
      </div>
    </div>
  );
});

export default Loader;

// import React, { useRef } from "react";
// import Loader, { LoaderHandle } from "./Loader";

// function App() {
//   const loaderRef = useRef<LoaderHandle>(null);

//   async function runTasks() {
//     await fakeStep();
//     loaderRef.current?.next();

//     await fakeStep();
//     loaderRef.current?.next();

//     await fakeStep();
//     loaderRef.current?.finish();
//   }

//   function fakeStep() {
//     return new Promise((res) => setTimeout(res, 1000));
//   }

//   return (
//     <div className="p-4 space-y-4">
//       <Loader ref={loaderRef} />
//       <button
//         className="px-4 py-2 bg-blue-500 text-white rounded-lg"
//         onClick={runTasks}
//       >
//         Run tasks
//       </button>
//     </div>
//   );
// }

// export default App;
