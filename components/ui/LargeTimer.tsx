import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react"

type TimerProps = {
  initialSeconds: number
  onTimeUp: () => void
  visible?: boolean
  formatUnits?: ("days" | "hours" | "minutes" | "seconds")[]
  autoStart?: boolean
}

export type TimerHandle = {
  start: () => void
  stop: () => void
  reset: () => void
}

const LargeTimer = forwardRef<TimerHandle, TimerProps>(
  (
    {
      initialSeconds,
      onTimeUp,
      visible = true,
      formatUnits = ["minutes", "seconds"],
      autoStart = false,
    },
    ref
  ) => {
    const [secondsLeft, setSecondsLeft] = useState(initialSeconds)
    const intervalRef = useRef<number | null>(null)
    const finishedRef = useRef(false)

    const start = () => {
      if (intervalRef.current) return
      finishedRef.current = false

      intervalRef.current = window.setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!)
            intervalRef.current = null
            if (!finishedRef.current) {
              finishedRef.current = true
              onTimeUp()
            }
            return initialSeconds // reset automatically after finishing
          }
          return prev - 1
        })
      }, 1000)
    }

    const stop = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    const reset = () => {
      stop()
      setSecondsLeft(initialSeconds)
      finishedRef.current = false
    }

    useImperativeHandle(ref, () => ({
      start,
      stop,
      reset,
    }))

    useEffect(() => {
      if (autoStart) start()
      return () => stop()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autoStart])

    const formatTime = (secs: number) => {
      const days = Math.floor(secs / (24 * 3600))
      const hours = Math.floor((secs % (24 * 3600)) / 3600)
      const minutes = Math.floor((secs % 3600) / 60)
      const seconds = secs % 60

      const parts: string[] = []

      if (formatUnits.includes("days")) parts.push(`${days}d`)
      if (formatUnits.includes("hours")) parts.push(`${hours}h`)
      if (formatUnits.includes("minutes")) parts.push(`${minutes}m`)
      if (formatUnits.includes("seconds")) parts.push(`${seconds}s`)

      return parts.join(" ")
    }

    if (!visible) return null

    return (
      <div className="inline-flex items-center justify-center rounded-lg">
        {formatTime(secondsLeft)}
      </div>
    )
  }
)

LargeTimer.displayName = "Timer"

export default LargeTimer

// import { useRef, useEffect } from "react"
// import Timer, { TimerHandle } from "./Timer"

// export default function App() {
//   const timerRef = useRef<TimerHandle>(null)

//   useEffect(() => {
//     // Manual start example
//     timerRef.current?.start()
//   }, [])

//   return (
//     <div className="p-4">
//       {/* Auto-start with custom format */}
//       <Timer
//         initialSeconds={1_000_000}
//         onTimeUp={() => alert("Time's up!")}
//         formatUnits={["days", "hours", "minutes", "seconds"]}
//         autoStart
//       />

//       {/* Controlled with ref */}
//       <Timer
//         ref={timerRef}
//         initialSeconds={300}
//         onTimeUp={() => alert("Finished 5 minutes!")}
//         formatUnits={["minutes", "seconds"]}
//       />
//     </div>
//   )
// }

