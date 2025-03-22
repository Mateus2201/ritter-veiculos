import { cn } from '@/lib/utils';
import React from 'react'

interface ButtonProps {
    onClick?: () => void;
    text: string;
    className?: string;
}

export default function Button({ onClick, text, className }: ButtonProps) {
    return <div className='mt-5'>
        <button onClick={onClick} className={cn(`flex justify-center items-center w-full no-underline outline-0 h-10 p-5 rounded-sm`, className)} >
            <p className='font-bold text-md '>{text}</p>
        </button>
    </div>
}
