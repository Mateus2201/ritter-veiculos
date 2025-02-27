"use client";

import FormatNumber from '@/components/format/formatNumber';
import { Calendar1, Filter, Fuel, Gauge, Joystick } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';
import React, { use, useEffect, useState } from 'react';

import highlight1 from '@/src/highlights/foto-1.jpg';
import highlight2 from '@/src/highlights/foto-2.webp';
import highlight3 from '@/src/highlights/foto-3.jpg';
import Input from '@/components/input';
import Button from '@/components/button';
import GridVehicle from '@/components/gridVehicle';
import Vehicle from '@/src/type/vehicle';

const itens: Vehicle[] = [
    { id: 1, name: 'BMW', description: 'I8 Roadster 1.5 Turbo I8 Roadster 1.5 Turbo', image: highlight1, value: 'R$ 100.000,00', km: '100.000 km', typeOil: 'Óleo', transmission: 'Automático', year: '2021' },
    { id: 2, name: 'BMW', description: 'I8 Roadster 1.5 Turbo I8 Roadster 1.5 Turbo', image: highlight2, value: 'R$ 100.000,00', km: '100.000 km', typeOil: 'Óleo', transmission: 'Automático', year: '2021' },
    { id: 3, name: 'BMW', description: 'I8 Roadster 1.5 Turbo I8 Roadster 1.5 Turbo', image: highlight3, value: 'R$ 100.000,00', km: '100.000 km', typeOil: 'Óleo', transmission: 'Automático', year: '2021' },
    { id: 4, name: 'BMW', description: 'I8 Roadster 1.5 Turbo I8 Roadster 1.5 Turbo', image: highlight1, value: 'R$ 100.000,00', km: '100.000 km', typeOil: 'Óleo', transmission: 'Automático', year: '2021' },
    { id: 5, name: 'BMW', description: 'I8 Roadster 1.5 Turbo I8 Roadster 1.5 Turbo', image: highlight2, value: 'R$ 100.000,00', km: '100.000 km', typeOil: 'Óleo', transmission: 'Automático', year: '2021' },
    { id: 6, name: 'BMW', description: 'I8 Roadster 1.5 Turbo I8 Roadster 1.5 Turbo', image: highlight3, value: 'R$ 100.000,00', km: '100.000 km', typeOil: 'Óleo', transmission: 'Automático', year: '2021' },
    { id: 7, name: 'BMW', description: 'I8 Roadster 1.5 Turbo I8 Roadster 1.5 Turbo', image: highlight1, value: 'R$ 100.000,00', km: '100.000 km', typeOil: 'Óleo', transmission: 'Automático', year: '2021' },
    { id: 8, name: 'BMW', description: 'I8 Roadster 1.5 Turbo I8 Roadster 1.5 Turbo', image: highlight2, value: 'R$ 100.000,00', km: '100.000 km', typeOil: 'Óleo', transmission: 'Automático', year: '2021' },
    { id: 9, name: 'BMW', description: 'I8 Roadster 1.5 Turbo I8 Roadster 1.5 Turbo', image: highlight3, value: 'R$ 100.000,00', km: '100.000 km', typeOil: 'Óleo', transmission: 'Automático', year: '2021' },
    { id: 10, name: 'BMW', description: 'I8 Roadster 1.5 Turbo I8 Roadster 1.5 Turbo', image: highlight3, value: 'R$ 100.000,00', km: '100.000 km', typeOil: 'Óleo', transmission: 'Automático', year: '2021' },
    { id: 11, name: 'BMW', description: 'I8 Roadster 1.5 Turbo I8 Roadster 1.5 Turbo', image: highlight3, value: 'R$ 100.000,00', km: '100.000 km', typeOil: 'Óleo', transmission: 'Automático', year: '2021' },
    { id: 12, name: 'BMW', description: 'I8 Roadster 1.5 Turbo I8 Roadster 1.5 Turbo', image: highlight3, value: 'R$ 100.000,00', km: '100.000 km', typeOil: 'Óleo', transmission: 'Automático', year: '2021' },
    { id: 13, name: 'BMW', description: 'I8 Roadster 1.5 Turbo I8 Roadster 1.5 Turbo', image: highlight3, value: 'R$ 100.000,00', km: '100.000 km', typeOil: 'Óleo', transmission: 'Automático', year: '2021' },
    { id: 14, name: 'BMW', description: 'I8 Roadster 1.5 Turbo I8 Roadster 1.5 Turbo', image: highlight3, value: 'R$ 100.000,00', km: '100.000 km', typeOil: 'Óleo', transmission: 'Automático', year: '2021' },
    { id: 15, name: 'BMW', description: 'I8 Roadster 1.5 Turbo I8 Roadster 1.5 Turbo', image: highlight3, value: 'R$ 100.000,00', km: '100.000 km', typeOil: 'Óleo', transmission: 'Automático', year: '2021' },
    { id: 16, name: 'BMW', description: 'I8 Roadster 1.5 Turbo I8 Roadster 1.5 Turbo', image: highlight3, value: 'R$ 100.000,00', km: '100.000 km', typeOil: 'Óleo', transmission: 'Automático', year: '2021' },
];

export default function Stock() {
    const [sectionPage, setSectionPage] = useState<Vehicle[]>([]);
    const [qtyPages, setQtyPages] = useState<number>(0);

    const [carName, setCarName] = useState<string>('');
    const [color, setColor] = useState<string>('');
    const [year, setYear] = useState<string>('');
    const [model, setModel] = useState<string>('');
    const [minPrice, setMinPrice] = useState<string>('');
    const [maxPrice, setMaxPrice] = useState<string>('');

    useEffect(() => {
        setQtyPages(Math.ceil(itens.length / 9));

        setSectionPage(itens.slice(0, 9));

        console.log('Itens:', sectionPage);

        console.log('Qtd Pages:', qtyPages);

    }, [itens]);

    return <div className="min-h-screen bg-stone-900">
        <div className='container min-h-screen mx-auto  flex flex-col'>
            <div className='md:flex h-full bg-stone-700'>
                <div className='h-full w-full md:w-1/4 p-5'>
                    <h1 className='text-2xl flex items-baseline font-bold text-white'><Filter />Stock </h1>
                    <Input
                        value={carName}
                        onChange={(e) => setCarName(e.target.value)}
                        placeholder='Nome do carro'
                    />
                    <Input
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        placeholder='Cor do carro'
                    />
                    <Input
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        placeholder='Ano do carro'
                    />
                    <Input
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        placeholder='Modelo do Carro'
                    />
                    <Input
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        placeholder='Preço Mínimo'
                    />
                    <Input
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        placeholder='Preço Máximo'
                    />
                    <Button text='BUSCAR' onClick={() => { }} classname='bg-secondary text-white hover:bg-white hover:text-primary' />

                </div>
                <div className='h-full w-full md:w-3/4 p-5'>
                    <div className={'max-w-full flex items-center justify-center '}>
                        <GridVehicle items={sectionPage} />
                    </div>
                </div>
            </div>
        </div>
    </div>
};

