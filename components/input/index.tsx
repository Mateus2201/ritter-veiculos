import { cn } from '@/lib/utils';

interface InputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    classNameDiv?: string;
    classNameInput?: string;
}

export default function Input({ value, onChange, placeholder, classNameDiv, classNameInput }: InputProps) {
    return <div className={cn('mt-5 w-full', classNameDiv)}>
        <input
            type="text"
            value={value}
            onChange={onChange}
            className={cn(' w-full text-lg bg-white border border-background no-underline outline-0 h-10 p-5 rounded-sm', classNameInput)}
            placeholder={placeholder}
        />
    </div>
}