"use client"

import Image from 'next/image'
import React, { useState } from 'react'
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

interface HeaderProps {
    logo: { src: string };
}

const MenuItems = [
    { id: 1, name: 'Home', href: '/' },
    { id: 2, name: 'Estoque', href: '/stock' },
    { id: 3, name: 'Blindados', href: '/' },
    { id: 4, name: 'Clássicos', href: '/' },
    { id: 5, name: 'Contato', href: '/' },
    { id: 6, name: 'Sobre Nós', href: '/' },
]
export default function Header({ logo }: HeaderProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return <main className='w-screen'>
        <div className="w-full flex justify-center">
            <header className="flex justify-center bg-primary h-70 md:h-60 w-full">
                <div className="container relative md:flex justify-center items-center ">
                    <div className="absolute cursor-pointer top-1/3 left-1/5 md:left-1/10 ">
                        <img src={logo.src} alt="hero" className='w-60 md:w-80' />
                    </div>
                    <div className="absolute not-sm:container not-md:flex not-md:justify-center not-md:top-2/3 md:left-5/10 text-white z-100">
                        <nav className=''>
                            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden w-full text-white">
                                {isOpen ? <X className='w-full' /> : <Menu className='w-full' />}
                            </button>
                            <ul className={`not-md:absolute md:flex md:justify-between text-center list-none bg-primary text-white mt-4 md:mt-0 not-md:top-2/3 not-md:left-0/3 not-md:w-full ${isOpen ? 'block' : 'hidden'}`}>
                                {MenuItems.map(({ id, name, href }) =>
                                    <Link href={href} key={id}>
                                        <li key={id} className="cursor-pointer select-none p-5 h-15 font-semibold hover:text-secondary">{name}</li>
                                    </Link>
                                )}
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
        </div>
    </main>
}
