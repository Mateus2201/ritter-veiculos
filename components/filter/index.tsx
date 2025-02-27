"use client"

import React, { useState } from 'react';
import InputMask from 'react-input-mask-next';
import FormatNumber from '../format/formatNumber';

interface FilterProps {

}

export default function Filter() {
    const [carName, setCarName] = useState('');
    const [color, setColor] = useState('');
    const [year, setYear] = useState('');
    const [model, setModel] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');


    const handleSearch = () => {
        // Implement search logic here
        console.log({
            carName,
            color,
            year,
            model,
            minPrice,
            maxPrice
        });
    };

    return <div className='flex items-center justify-center p-10'>
        <div className='container flex flex-col items-center justify-center '>
            <div className='w-full '>
                <p className='text-white font-semibold text-5xl select-none'>Seu carro aqui:</p>
            </div>
            <div className='mt-10 w-full '>
                <input
                    type="text"
                    value={carName}
                    onChange={(e) => setCarName(e.target.value)}
                    className=' w-full border-white bg-white no-underline outline-0 h-10 p-5 rounded-sm'
                    placeholder='Nome do carro'
                />
            </div>
            <div className="md:grid md:grid-cols-6 md:gap-5 w-full">
                <div className='mt-5'>
                    <input
                        type="text"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className=' w-full border-white bg-white no-underline outline-0 h-10 p-5 rounded-sm'
                        placeholder='Cor'
                    />
                </div>
                <div className='mt-5'>
                    <input
                        type="text"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className=' w-full border-white bg-white no-underline outline-0 h-10 p-5 rounded-sm'
                        placeholder='Ano'
                    />
                </div>
                <div className='mt-5'>
                    <input
                        type="text"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        className=' w-full border-white bg-white no-underline outline-0 h-10 p-5 rounded-sm'
                        placeholder='Modelo'
                    />
                </div>
                <div className='mt-5'>
                    <input
                        type="text"
                        value={minPrice}
                        onChange={(e) => setMinPrice(FormatNumber.formatCurrency(e.target.value).toString())}
                        className=' w-full border-white bg-white no-underline outline-0 h-10 p-5 rounded-sm'
                        placeholder='Preço mínimo'
                    />
                </div>
                <div className='mt-5'>
                    <input
                        type="text"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(FormatNumber.formatCurrency(e.target.value).toString())}
                        className=' w-full border-white bg-white no-underline outline-0 h-10 p-5 rounded-sm'
                        placeholder='Preço máximo'
                    />
                </div>
                <div className='mt-5'>
                    <button className='flex justify-center items-center w-full  bg-secondary no-underline outline-0 h-10 p-5 rounded-sm'>
                        <p className='font-bold text-md text-white'>BUSCAR</p>
                    </button>
                </div>
            </div>
        </div>
    </div>
};