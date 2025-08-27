import { useState, useEffect, useRef } from "react"

type Option = {
  label: string
  value: string
  badge?: string
  disabled?: boolean
}

type SingleSelectProps = {
  label: string
  options: Option[]
  multiple?: false
  selected: string | null
  onChange: (value: string) => void
}

type MultiSelectProps = {
  label: string
  options: Option[]
  multiple: true
  selected: string[]
  onChange: (value: string[]) => void
}

type SelectProps = SingleSelectProps | MultiSelectProps

export default function Selection({
  label,
  options,
  multiple = false,
  selected,
  onChange,
}: SelectProps) {
  const [open, setOpen] = useState(false)
  const [dropUp, setDropUp] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Detect outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Detect whether to open dropdown up or down
  useEffect(() => {
    if (!open || !buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()
    const spaceBelow = window.innerHeight - rect.bottom
    const spaceAbove = rect.top

    // assume max 200px menu height
    if (spaceBelow < 200 && spaceAbove > spaceBelow) {
      setDropUp(true)
    } else {
      setDropUp(false)
    }
  }, [open])

  const toggleOption = (value: string) => {
    if (multiple) {
      const current = selected as string[]
      const onMultiChange = onChange as (value: string[]) => void
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value]
      onMultiChange(updated)
    } else {
      const onSingleChange = onChange as (value: string) => void
      onSingleChange(value)
      setOpen(false)
    }
  }

  return (
    <div ref={dropdownRef} className="relative inline-block text-left min-w-[140px]">
      <div>
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setOpen(!open)}
          className="inline-flex h-10 justify-between items-center w-full rounded-full border border-gray-200 shadow-sm px-4 py-1.5 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none cursor-pointer"
        >
          {multiple
            ? (selected as string[]).length > 0
              ? (selected as string[]).join(', ')
              : label
            : typeof selected === 'string'
              ? options.find(o => o.value === selected)?.label ?? label
              : label}
          <svg
            className="ml-2 -mr-1 h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.23 8.27a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {open && (
        <div
          className={`z-10 absolute w-full rounded-md shadow-lg bg-white ring-1 ring-gray-200 ring-opacity-5 ${
            dropUp ? "bottom-full mb-2" : "mt-2"
          }`}
        >
          <ul className="py-1 text-sm text-gray-700 max-h-60 overflow-auto">
            {options.map((opt) => (
              <li
                key={opt.value}
                className={`flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                  opt.disabled ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={() => !opt.disabled && toggleOption(opt.value)}
              >
                <span>{opt.label}</span>
                {opt.badge && (
                  <span className="ml-2 bg-blue-100 text-blue-700 text-xs rounded-full px-2 py-0.5">
                    {opt.badge}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}


// Usage Guide
// import { useState } from "react"
// import Selection from "./Selection" // Adjust path as needed

// const options = [
//   { label: "Apple", value: "apple" },
//   { label: "Banana", value: "banana", badge: "New" },
//   { label: "Orange", value: "orange" },
//   { label: "Grapes", value: "grapes", disabled: true },
// ]

// export default function SelectExample() {
//   // 👇 Single select state
//   const [singleSelected, setSingleSelected] = useState<string | null>(null)

//   // 👇 Multi select state
//   const [multiSelected, setMultiSelected] = useState<string[]>([])

//   return (
//     <div className="space-y-6 p-4">
//       <h2 className="text-lg font-semibold">Single Select Example</h2>
//       <Selection
//         label="Pick a fruit"
//         options={options}
//         selected={singleSelected}
//         onChange={(value) => {
//           console.log("Single selected:", value)
//           setSingleSelected(value)
//         }}
//       />

//       <h2 className="text-lg font-semibold mt-6">Multi Select Example</h2>
//       <Selection
//         label="Pick multiple fruits"
//         options={options}
//         multiple
//         selected={multiSelected}
//         onChange={(values) => {
//           console.log("Multiple selected:", values)
//           setMultiSelected(values)
//         }}
//       />
//     </div>
//   )
// }