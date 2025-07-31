"use client"

import Image from 'next/image';
import { useState } from 'react'
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

interface HeaderProps {
    logo: any;
}

const MenuItems = [
    { id: 1, name: 'Home', href: '/' },
    { id: 2, name: 'Estoque', href: '/stock' },
    { id: 3, name: 'Blindados', href: '/armored' },
    { id: 4, name: 'Clássicos', href: '/classic' },
    // { id: 5, name: 'Contato', href: '/contact' },
    { id: 6, name: 'Sobre Nós', href: '/about' },
]

export default function Header({ logo }: HeaderProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return <main className='w-screen'>
        <div className="w-full flex justify-center">
            <header className="flex justify-center bg-primary h-70 lg:h-60 w-full">
                <div className="container relative flex justify-center items-center ">
                    <div className="absolute cursor-pointer top-1/3 lg:left-1/10">
                    <Link href={'/'}>
                        <Image src={logo} alt="hero" className='w-60 lg:w-80'  />
                    </Link>
                    </div>
                    <div className="absolute not-lg:container not-lg:flex not-lg:justify-center not-lg:top-2/3 lg:left-5/10 text-offWhite z-100 ">
                        <nav className=''>
                            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden w-full text-offWhite">
                                {isOpen ? <X className='w-full' /> : <Menu className='w-full' />}
                            </button>
                            <ul className={`not-lg:absolute lg:flex lg:justify-between text-center list-none bg-primary text-offWhite mt-4 lg:mt-0 not-lg:top-2/3 not-lg:left-0/3 not-lg:w-full ${isOpen ? 'block' : 'hidden'}`}>
                                {MenuItems.map(({ id, name, href }) =>
                                    <Link href={href} key={id} onClick={() => setIsOpen(false)}>
                                        <li key={id} className="lg:text-lg cursor-pointer select-none p-5 h-15 font-semibold hover:text-secondary">{name}</li>
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
