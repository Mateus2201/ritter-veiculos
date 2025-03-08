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
            className={cn(`w-full border bg-white outline-none h-10 p-2 rounded-sm`, classNameSelect)}
        >
            <option value="" className='text-gray-500'>{placeholder}</option>
            {options.map(({ id, value }) => (
                <option key={id} value={id}>{value}</option>
            ))}
        </select>
    </div>
};
