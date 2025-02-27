"use client"

import React, { useState } from 'react';
import FormatNumber from '../format/formatNumber';
import Input from '../input';
import Button from '../button';

export default function Filter() {
    const [carName, setCarName] = useState<string>('');
    const [color, setColor] = useState<string>('');
    const [year, setYear] = useState<string>('');
    const [model, setModel] = useState<string>('');
    const [minPrice, setMinPrice] = useState<string>('');
    const [maxPrice, setMaxPrice] = useState<string>('');

    return <div className='flex items-center justify-center p-10'>
        <div className='container flex flex-col items-center justify-center '>
            <div className='w-full '>
                <p className='text-white font-semibold text-5xl select-none'>Seu carro aqui:</p>
            </div>
            <div className="md:grid md:grid-cols-6 md:gap-5 w-full">
                <Input value={carName} onChange={(e) => setCarName(e.target.value)} placeholder='Nome do carro' classNameDiv='md:col-span-6'/>
                <Input value={color} onChange={(e) => setColor(e.target.value)} placeholder='Nome do carro' />
                <Input value={year} onChange={(e) => setYear(e.target.value)} placeholder='Nome do carro' />
                <Input value={model} onChange={(e) => setModel(e.target.value)} placeholder='Nome do carro' />
                <Input value={minPrice} onChange={(e) => setMinPrice(FormatNumber.formatCurrency(e.target.value).toString())} placeholder='Nome do carro' />
                <Input value={maxPrice} onChange={(e) => setMaxPrice(FormatNumber.formatCurrency(e.target.value).toString())} placeholder='Nome do carro' />
                <Button text='BUSCAR' onClick={() => { }} classname='bg-secondary text-white hover:bg-white hover:text-primary' />
            </div>
        </div>
    </div>
};