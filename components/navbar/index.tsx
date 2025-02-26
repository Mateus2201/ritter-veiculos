"use client"

import Image from 'next/image'
import React, { useState } from 'react'
import { Menu, X } from 'lucide-react';

interface HeaderProps {
    logo: { src: string };
}
export default function Header({ logo }: HeaderProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <main className='w-screen'>
            <div className="w-full flex justify-center">
                <header className="flex justify-center bg-primary h-70 md:h-60 w-full">
                    <div className="container relative md:flex justify-center items-center ">
                        <div className="absolute top-1/3 left-1/5 md:left-1/10 ">
                            <img src={logo.src} alt="hero" className='w-60 md:w-80' />
                        </div>
                        <div className="absolute not-md:top-2/3 md:right-1/10 text-white">
                            <nav className='flex md:justify-between list-none'>
                                <button onClick={() => setIsOpen(!isOpen)} className="md:hidden w-full bg-cyan-200 text-white">
                                    {isOpen ? <X className='w-full' /> : <Menu className='w-full' />}
                                </button>
                                <ul className={`not-md:absolute md:flex md:justify-between text-center list-none bg-primary text-white mt-4 md:mt-0 not-md:top-2/3 not-md:w-full ${isOpen ? 'block' : 'hidden'}`}>
                                    <li className="p-5 h-15 font-semibold hover:text-secondary">Home</li>
                                    <li className="p-5 h-15 font-semibold hover:text-secondary">Estoque</li>
                                    <li className="p-5 h-15 font-semibold hover:text-secondary">Blindados</li>
                                    <li className="p-5 h-15 font-semibold hover:text-secondary">Clássicos</li>
                                    <li className="p-5 h-15 font-semibold hover:text-secondary">Contato</li>
                                    <li className="p-5 h-15 font-semibold hover:text-secondary">Sobre Nós</li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </header>
            </div>
        </main>
    )
}
