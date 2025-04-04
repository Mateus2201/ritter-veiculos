import Image from 'next/image';
import React, { useState } from 'react'
import { Calendar1, ClipboardList, Fuel, Gauge, Loader } from 'lucide-react';
import Button from '../button';
import Car from '@/src/type/cars';
import FormatNumber from '../format/formatNumber';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import SwiperImages from '../swiper-images';

interface CardCarProps {
    car: Car
    className?: string
}

export default function CardCar({ car, className }: CardCarProps) {
    const { idveiculo, modelo, observacao, valor, motor, ano_modelo, ano_fabricacao, combustivel, quilometragem, exibicao_valor } = car;
    const [loader, setLoader] = useState<boolean>(false);

    return <div key={idveiculo} className={cn('xl:h-full not-xl:mt-5 rounded-lg text-offWhite', className)}>
        <div className='relative top-0 left-0 w-full h-70'>
            <SwiperImages id={idveiculo} />
        </div>
        <div className='mt-5 px-3'>
            <div className='flex justify-start items-baseline gap-1 m-5'>
                <div className='relative w-full overflow-hidden'>
                    <div className="whitespace-nowrap transition-transform duration-1000 ease-in-out translate-x-0 hover:-translate-x-2/3 flex text-2xl gap-2">
                        <h1 className="font-bold">{modelo} - </h1>
                        <h2 className='font-semibold'>{motor}</h2>
                    </div>
                </div>
            </div>
            <div className='flex justify-between items-center m-5'>
                <h1 className='text-3xl font-bold'> {exibicao_valor === 'S' ? FormatNumber.formatPrice(valor) : ('R$ ').concat(valor.toString().replace(/./g, "*"))}</h1>
            </div>
            <div className='grid grid-cols-1 gap-5 md:gap-2 m-5 md:relative w-full overflow-hidden whitespace-nowrap'>
                <p className="z-21 flex items-center gap-2 w-full overflow-hidden whitespace-nowrap text-ellipsis"><ClipboardList /> {FormatNumber.formatPlate(car.placa, car?.exibicao_placa == 'S')}  </p>
                <p className='z-21 flex items-center gap-2 w-full overflow-hidden whitespace-nowrap text-ellipsis'><Calendar1 />{ano_modelo} / {ano_fabricacao} </p>
                <p className='z-23 flex items-center gap-2 w-full overflow-hidden whitespace-nowrap text-ellipsis'><Fuel />{combustivel} </p>
                <p className='z-22 flex items-center gap-2 w-full overflow-hidden whitespace-nowrap text-ellipsis'><Gauge />{quilometragem} </p>
            </div>
        </div>
        <div className='p-2'>
            <Link href={`/car/${idveiculo}`}>
                <Button
                    onClick={() => { setLoader(true) }}
                    className='w-full bg-white text-background hover:bg-secondary hover:text-offWhite border rounded-lg border-gray-300 hover:border-0' >
                    {loader
                        ? <Loader className='animate-spin text-secondary opacity-100 hover:opacity-100  transition-opacity duration-1300 ease-in-out' />
                        : <p className='font-bold text-md '>{'VER MAIS'}</p>
                    }
                </Button>
            </Link>
        </div>
    </div>
}
