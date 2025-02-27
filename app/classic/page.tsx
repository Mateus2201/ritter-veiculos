"use client";

import FormatNumber from '@/components/format/formatNumber';
import { Calendar1, Filter, Fuel, Gauge, Joystick } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

import highlight1 from '@/src/highlights/foto-1.jpg';
import highlight2 from '@/src/highlights/foto-2.webp';
import highlight3 from '@/src/highlights/foto-3.jpg';

interface Vehicle {
    id: number;
    make: string;
    model: string;
    year: number;
    price: number;
}

const vehicles: Vehicle[] = [
    { id: 1, make: 'Toyota', model: 'Corolla', year: 2020, price: 20000 },
    { id: 2, make: 'Honda', model: 'Civic', year: 2019, price: 18000 },
    { id: 3, make: 'Ford', model: 'Mustang', year: 2021, price: 30000 },
    // Add more vehicles as needed
];

export default function Classic() {
    const [filter, setFilter] = useState<string>('');
    const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>(vehicles);
    const [carName, setCarName] = useState('');
    const [color, setColor] = useState('');
    const [year, setYear] = useState('');
    const [model, setModel] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const itens = [
        { id: 1, title: 'BMW', description: 'I8 Roadster 1.5 Turbo I8 Roadster 1.5 Turbo', image: highlight1, value: 'R$ 100.000,00', km: '100.000 km', typeOil: 'Óleo', transmission: 'Automático', year: '2021' },
        { id: 2, title: 'BMW', description: 'I8 Roadster 1.5 Turbo I8 Roadster 1.5 Turbo', image: highlight2, value: 'R$ 100.000,00', km: '100.000 km', typeOil: 'Óleo', transmission: 'Automático', year: '2021' },
        { id: 3, title: 'BMW', description: 'I8 Roadster 1.5 Turbo I8 Roadster 1.5 Turbo', image: highlight3, value: 'R$ 100.000,00', km: '100.000 km', typeOil: 'Óleo', transmission: 'Automático', year: '2021' },
        { id: 4, title: 'BMW', description: 'I8 Roadster 1.5 Turbo I8 Roadster 1.5 Turbo', image: highlight1, value: 'R$ 100.000,00', km: '100.000 km', typeOil: 'Óleo', transmission: 'Automático', year: '2021' },
        { id: 5, title: 'BMW', description: 'I8 Roadster 1.5 Turbo I8 Roadster 1.5 Turbo', image: highlight2, value: 'R$ 100.000,00', km: '100.000 km', typeOil: 'Óleo', transmission: 'Automático', year: '2021' },
        { id: 6, title: 'BMW', description: 'I8 Roadster 1.5 Turbo I8 Roadster 1.5 Turbo', image: highlight3, value: 'R$ 100.000,00', km: '100.000 km', typeOil: 'Óleo', transmission: 'Automático', year: '2021' },
        { id: 7, title: 'BMW', description: 'I8 Roadster 1.5 Turbo I8 Roadster 1.5 Turbo', image: highlight1, value: 'R$ 100.000,00', km: '100.000 km', typeOil: 'Óleo', transmission: 'Automático', year: '2021' },
        { id: 8, title: 'BMW', description: 'I8 Roadster 1.5 Turbo I8 Roadster 1.5 Turbo', image: highlight2, value: 'R$ 100.000,00', km: '100.000 km', typeOil: 'Óleo', transmission: 'Automático', year: '2021' },
        { id: 9, title: 'BMW', description: 'I8 Roadster 1.5 Turbo I8 Roadster 1.5 Turbo', image: highlight3, value: 'R$ 100.000,00', km: '100.000 km', typeOil: 'Óleo', transmission: 'Automático', year: '2021' },
    ];

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

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setFilter(value);
        setFilteredVehicles(
            vehicles.filter(vehicle =>
                vehicle.make.toLowerCase().includes(value.toLowerCase()) ||
                vehicle.model.toLowerCase().includes(value.toLowerCase())
            )
        );
    };



    return <div className="min-h-screen bg-stone-900">
        <div className='container min-h-screen mx-auto  flex flex-col'>
            <div className='md:flex h-full bg-stone-700'>
                <div className='h-full w-full md:w-1/4 p-5'>
                    <h1 className='text-2xl flex items-baseline font-bold text-white'><Filter />Stock </h1>
                    <div className='mt-5 w-full '>
                        <input
                            type="text"
                            value={carName}
                            onChange={(e) => setCarName(e.target.value)}
                            className=' w-full border-white bg-white no-underline outline-0 h-10 p-5 rounded-sm'
                            placeholder='Nome do carro'
                        />
                    </div>
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
                        <button className='flex justify-center items-center w-full bg-secondary text-white hover:bg-white hover:text-primary no-underline outline-0 h-10 p-5 rounded-sm'>
                            <p className='font-bold text-md '>BUSCAR</p>
                        </button>
                    </div>
                </div>
                <div className='h-full w-full md:w-3/4 p-5'>
                    <div className={'max-w-full flex items-center justify-center '}>
                        <div className="container xl:grid xl:grid-cols-3  gap-5">
                            {itens.map(({ id, title, image, description, transmission, km, typeOil, value, year }) => (
                                <div key={id} className={' xl:h-150 not-xl:mt-5 rounded-lg bg-primary'}>
                                    <Image src={image} alt={title} className={'w-full xl:w-140 xl:h-70 object-cover rounded-t-md'} />
                                    <div className={'mt-5 px-3 text-white '}>
                                        <div className='flex justify-start items-baseline gap-1 m-5 '>
                                            <div className='relative w-full overflow-hidden'>
                                                <div className="whitespace-nowrap transition-transform duration-500 ease-in-out translate-x-0 hover:-translate-x-2/3">
                                                    <h1 className="text-2xl font-bold text-white">{title} - </h1>
                                                    <p className='text-xl m-0 text-white'>{description}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex justify-between items-center m-5'>
                                            <h1 className='text-2xl font-bold text-white'>{value}</h1>
                                        </div>
                                        <div className='grid grid-cols-2 gap-2 m-5'>
                                            <p className='flex items-center gap-2 text-white'><Joystick />{transmission}</p>
                                            <p className='flex items-center gap-2 text-white'><Calendar1 />{year} </p>
                                            <p className='flex items-center gap-2 text-white'><Gauge />{km} </p>
                                            <p className='flex items-center gap-2 text-white'><Fuel />{typeOil} </p>
                                        </div>

                                    </div>
                                    <div className='mt-5 p-3 pt-5 border-t-2 border-white'>
                                        <button className='font-bold bg-white hover:bg-secondary hover:text-white  w-full p-2 rounded-md'>Ver mais</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
};

