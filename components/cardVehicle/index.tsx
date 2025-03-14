import Image from 'next/image';
import React from 'react'
import { Calendar1, Fuel, Gauge, Joystick } from 'lucide-react';
import Button from '../button';
import Cars from '@/src/type/cars';
import formatPrice from '../formatter';
import FormatNumber from '../format/formatNumber';

export default function CardVehicle({ idveiculo, modelo, observacao, valor, ano_fabricacao, ano_modelo, motor, quilometragem, combustivel }: Cars) {
    return <div key={idveiculo} className={'xl:h-160 not-xl:mt-5 rounded-lg bg-background'}>
        {/* <Image src={image} alt={name} className={'w-full xl:w-140 xl:h-70 object-cover rounded-t-md'} /> */}
        <div className="w-full xl:w-140 xl:h-70 object-cover rounded-t-md"></div>
        <div className={'mt-5 px-3 text-offWhite '}>
            <div className='flex justify-start items-baseline gap-1 m-5 '>
                <div className='relative w-full overflow-hidden'>
                    <div className="items-baseline whitespace-nowrap transition-transform duration-500 ease-in-out translate-x-0 hover:-translate-x-2/3 flex">
                        <h1 className="text-2xl font-bold text-offWhite">{modelo} - </h1>
                        <p className='text-xl m-0 text-offWhite '>&nbsp;{observacao.replaceAll('*', '')}</p>
                    </div>
                </div>
            </div>
            <div className='flex justify-between items-center m-5'>
                <h1 className='text-3xl font-bold text-offWhite'> {FormatNumber.formatPrice(valor)}</h1>
            </div>
            <div className='grid grid-cols-1 gap-5 md:gap-2 m-5 md:relative w-full overflow-hidden whitespace-nowrap'>
                <p className='z-20 flex items-center gap-2 w-8/10 overflow-hidden whitespace-nowrap text-ellipsis'><Joystick />{motor ? motor : "?"}</p>
                <p className='z-21 flex items-center gap-2 w-full overflow-hidden whitespace-nowrap text-ellipsis'><Calendar1 />{ano_modelo} / {ano_fabricacao} </p>
                <p className='z-23 flex items-center gap-2 w-full overflow-hidden whitespace-nowrap text-ellipsis'><Fuel />{combustivel} </p>
                <p className='z-22 flex items-center gap-2 w-full overflow-hidden whitespace-nowrap text-ellipsis'><Gauge />{quilometragem} </p>
            </div>
        </div>
        <div className='p-2 border-t-2 border-white'>
            <Button text={'Ver mais'} onClick={() => { }} classname=' w-full bg-white hover:bg-secondary hover:text-offWhite  ' />
        </div>
    </div>
}
