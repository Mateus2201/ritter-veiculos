import { cn } from '@/lib/utils';
import React from 'react'

interface ButtonProps {
    onClick?: () => void;
    text: string;
    classname?: string;
}

export default function Button({ onClick, text, classname }: ButtonProps) {
    return <div className='mt-5'>
        <button className={cn(`flex justify-center items-center w-full no-underline outline-0 h-10 p-5 rounded-sm`, classname)} >
            <p className='font-bold text-md '>{text}</p>
        </button>
    </div>
}
