import React, {useId} from 'react'
import { Input as UiInput } from './ui/input'
import { Label } from './ui/label'
import { cn } from '../lib/utils'

const Input = React.forwardRef( function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref){
    const id = useId()
    return (
        <div className='w-full'>
            {label && <Label
            className='mb-2 inline-block pl-1 text-sm font-medium text-slate-700'
            htmlFor={id}>
                {label}
            </Label>
            }
            <UiInput
            type={type}
            className={cn(className)}
            ref={ref}
            {...props}
            id={id}
            />
        </div>
    )
})

export default Input