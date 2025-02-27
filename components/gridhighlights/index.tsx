import { BadgePercent, Calendar1, Fuel, Gauge, Joystick } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';
import React from 'react';

interface GridHighlightsProps {
    id: number,
    title: string,
    description: string,
    value: string,
    km: string,
    typeOil: string,
    transmission: string,
    year: string,
    image: StaticImageData
}

export default function GridHighlights({ itens }: { itens: GridHighlightsProps[] }) {

    return (
        <div className={'max-w-full flex items-center justify-center p-10'}>
            <div className="container md:grid md:grid-cols-3  gap-5">
                {itens.map(({ id, title, image, description, transmission, km, typeOil, value, year }) => (
                    <div key={id} className={' md:h-140 border not-md:mt-5 rounded-lg bg-primary'}>
                        <Image src={image} alt={title} className={'w-full md:w-140 md:h-70 object-cover rounded-t-md'} />
                        <div className={'mt-5 px-3 text-white '}>
                            <div className='flex justify-start items-baseline gap-1 m-5 '>
                                <h1 className=' text-2xl font-bold text-white' >{title} - </h1>
                                <p className='text-xl m-0 text-white'>{description}</p>
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
    );
};