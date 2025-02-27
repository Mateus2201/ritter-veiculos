import Image from 'next/image';
import React from 'react'
import { Calendar1, Fuel, Gauge, Joystick } from 'lucide-react';
import Button from '../button';
import Vehicle from '@/src/type/vehicle';

export default function CardVehicle({ id, name, image, description, transmission, km, typeOil, value, year }: Vehicle) {
    return <div key={id} className={' xl:h-150 not-xl:mt-5 rounded-lg bg-primary'}>
        <Image src={image} alt={name} className={'w-full xl:w-140 xl:h-70 object-cover rounded-t-md'} />
        <div className={'mt-5 px-3 text-white '}>
            <div className='flex justify-start items-baseline gap-1 m-5 '>
                <div className='relative w-full overflow-hidden'>
                    <div className="whitespace-nowrap transition-transform duration-500 ease-in-out translate-x-0 hover:-translate-x-2/3">
                        <h1 className="text-2xl font-bold text-white">{name} - </h1>
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
        <div className='p-2 border-t-2 border-white'>
            <Button text={'Ver mais'} onClick={() => { }} classname=' w-full bg-white hover:bg-secondary hover:text-white  ' />
        </div>
    </div>
}
