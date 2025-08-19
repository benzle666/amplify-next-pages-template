import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react"

type TimerProps = {
  initialSeconds: number
  onTimeUp: () => void
  visible: Boolean
}

export type TimerHandle = {
  start: () => void
  stop: () => void
  reset: () => void
}

const Timer = forwardRef<TimerHandle, TimerProps>(({ initialSeconds, onTimeUp, visible }, ref) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds)
  const intervalRef = useRef<number | null>(null)
  const finishedRef = useRef(false) // ✅ ensures callback fires only once per run

  const start = () => {
    if (intervalRef.current) return // already running
    finishedRef.current = false // reset finished state

    intervalRef.current = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!)
          intervalRef.current = null
          if (!finishedRef.current) {
            finishedRef.current = true
            onTimeUp() // only fires once
          }
          return initialSeconds // reset automatically
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
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
  }

  return (
    <div>
      {visible ? (
        <div className="inline-flex items-center justify-center rounded-lg text-black font-mono text-sm">
          {formatTime(secondsLeft)}
        </div>
      ) : (
        <div className="inline-flex"></div>
      )}
    </div>
  )
})

export default Timer





