import { cn } from '@/lib/utils'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select'

interface Option {
    value: number | string
    description: string
}

interface SelectComponentProps {
    id: string
    label?: string
    value?: string | number
    onChange?: (value: string | number) => void
    options: Option[]
    classNameWrapper?: string
    classNameSelect?: string
}

export default function SelectComponent({
    id,
    label = 'Selecione uma opção',
    value,
    onChange,
    options,
    classNameWrapper = '',
    classNameSelect = '',
}: SelectComponentProps) {
    return <div className={cn('mt-5 w-full', classNameWrapper)}>
        <Select
            onValueChange={onChange}
            value={value ? String(value) : ''}
        >
            <SelectTrigger className={cn('w-full text-lg bg-white border border-background no-underline outline-0 h-10 p-5 rounded-sm', classNameSelect)} id={id}>
                <SelectValue placeholder={label} />
            </SelectTrigger>
            <SelectContent className="z-10 bg-white max-h-60 overflow-auto">
                {options.map((opt, ind) => (
                    <SelectItem key={ind} value={String(opt.value)}>
                        {opt.description}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    </div>
}
