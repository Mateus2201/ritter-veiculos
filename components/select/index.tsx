import { cn } from '@/lib/utils';
import React from 'react';

interface SelectProps {
    options: { id: number, value: string }[];
    selectedValue?: number;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    placeholder?: string;
    classNameDiv?: string;
    classNameSelect?: string;
}

export default function Select({ options, selectedValue, onChange, placeholder = 'Selecione uma opção', classNameDiv = '', classNameSelect = '', }: SelectProps) {
    return <div className={`mt-5 w-full ${classNameDiv}`}>
        <select
            value={selectedValue || 0}
            onChange={onChange}
            className={cn('w-full border border-background bg-white outline-none h-10 px-3 rounded-sm ', classNameSelect)}
        >
            <option value="" className='text-[#A9A9A9]'>{placeholder}</option>
            {options.map(({ id, value }) => (
                <option key={id} value={id}>{value}</option>
            ))}
        </select>
    </div>
};
