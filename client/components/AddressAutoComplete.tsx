import { useState, useEffect, useRef } from 'react'

interface Props {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  label?: string
}

export default function AddressAutocomplete({
  value,
  onChange,
  placeholder = 'Enter address',
  label = 'Address',
}: Props) {
  const [inputValue, setInputValue] = useState(value)
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [isSelected, setIsSelected] = useState(false)
  const hasMounted = useRef(false)

  useEffect(() => {
    setInputValue(value)
  }, [value])

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true
      return
    }
    if (isSelected) return

    const timeout = setTimeout(async () => {
      if (inputValue.length < 5) {
        setSuggestions([])
        return
      }

      const res = await fetch(`/api/v1/address/autocomplete?text=${inputValue}`)
      const data = await res.json()
      setSuggestions(data.features || [])
    }, 300)

    return () => clearTimeout(timeout)
  }, [inputValue])

  function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(evt.target.value)
    onChange(evt.target.value)
    setIsSelected(false)
  }
  function handleSelect(address: string) {
    setInputValue(address)
    onChange(address)
    setSuggestions([])
    setIsSelected(true)
  }

  return (
    <div className="relative flex flex-col gap-1.5">
      <label className="text-xs font-medium text-slate-500 pink:text-pink-700 dark:text-zinc-400">
        {label}
      </label>

      <input
        type="text"
        value={inputValue}
        placeholder={placeholder}
        onChange={handleChange}
        className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 transition-colors placeholder:text-slate-400 focus:border-amber-500 focus:outline-none pink:border-pink-200 pink:bg-white pink:text-pink-900 pink:placeholder:text-pink-300 pink:focus:border-pink-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-600"
      />

      {suggestions.length > 0 && (
        <ul className="absolute top-full z-10 mt-1 max-h-48 w-full overflow-y-auto rounded-lg border bg-white text-slate-900 shadow-md">
          {suggestions.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSelect(item.properties.formatted)}
              className="cursor-pointer px-3 py-2 hover:bg-slate-100"
            >
              {item.properties.formatted}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
