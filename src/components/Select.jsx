import React, {useId} from 'react'
import { cn } from '../lib/utils'

function Select({
    options,
    label,
    className = "",
    ...props
}, ref) {
    const id = useId()
  return (
    <div className='w-full'>
        {label && <label htmlFor={id} className='mb-2 inline-block pl-1 text-sm font-medium text-slate-700'>{label}</label>}
        <select
        {...props}
        id={id}
        ref={ref}
        className={cn(
          'flex h-11 w-full rounded-full border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        >
            <option value="" disabled>
                Select an option
            </option>
            {options?.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    </div>
  )
}

export default React.forwardRef(Select)