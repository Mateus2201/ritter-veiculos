import Image from 'next/image';
import React from 'react'
import { Calendar1, Fuel, Gauge, Joystick } from 'lucide-react';
import Button from '../button';
import Car from '@/src/type/cars';
import FormatNumber from '../format/formatNumber';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import hilux from '@/src/img/carros/hilux.jpeg';
import PropagateLoader from 'react-spinners/PropagateLoader';

interface CardCarProps {
    car: Car
    className?: string
}

export default function CardCar({ car, className }: CardCarProps) {
    const { idveiculo, modelo, observacao, valor, motor, ano_modelo, ano_fabricacao, combustivel, quilometragem, exibicao_valor } = car;

    return <div key={idveiculo} className={cn('xl:h-160 not-xl:mt-5 rounded-lg bg-background text-offWhite', className)}>
        {hilux
            ? <div className='relative top-0 left-0 w-full h-70'>
                <Image src={'https://res.cloudinary.com/dwq0pruh5/image/upload/v1742268942/your-cloudinary-folder-name/file_hubxny.jpg'}
                    fill
                    alt={'hillux'}
                    className={'w-full xl:w-140 xl:h-70 object-contain md:object-cover rounded-t-md'}
                />
            </div>
            : <div className="w-full h-70 flex items-center justify-center bg-accent rounded-t-md">
                <PropagateLoader color={'#000'} loading={true} size={15} />
            </div>
        }
        <div className={'mt-5 px-3  '}>
            <div className='flex justify-start items-baseline gap-1 m-5 '>
                <div className='relative w-full overflow-hidden'>
                    <div className="items-baseline whitespace-nowrap transition-transform duration-500 ease-in-out translate-x-0 hover:-translate-x-2/3 flex">
                        <h1 className="text-2xl font-bold ">{modelo} - </h1>
                        <p className='text-xl m-0  '>&nbsp;{observacao.replaceAll('*', '')}</p>
                    </div>
                </div>
            </div>
            <div className='flex justify-between items-center m-5'>
                <h1 className='text-3xl font-bold '> {exibicao_valor === 'S' ? FormatNumber.formatPrice(valor) : ('R$ ').concat(valor.toString().replace(/./g, "*"))}</h1>
            </div>
            <div className='grid grid-cols-1 gap-5 md:gap-2 m-5 md:relative w-full overflow-hidden whitespace-nowrap'>
                <p className='z-20 flex items-center gap-2 w-8/10 overflow-hidden whitespace-nowrap text-ellipsis'><Joystick />{motor ? motor : "?"}</p>
                <p className='z-21 flex items-center gap-2 w-full overflow-hidden whitespace-nowrap text-ellipsis'><Calendar1 />{ano_modelo} / {ano_fabricacao} </p>
                <p className='z-23 flex items-center gap-2 w-full overflow-hidden whitespace-nowrap text-ellipsis'><Fuel />{combustivel} </p>
                <p className='z-22 flex items-center gap-2 w-full overflow-hidden whitespace-nowrap text-ellipsis'><Gauge />{quilometragem} </p>
            </div>
        </div>
        <div className='p-2 border-t-2 border-white'>
            <Link href={`/car/${idveiculo}`}>
                <Button text={'Ver mais'} className=' w-full bg-white text-background hover:bg-secondary hover:text-offWhite ' />
            </Link>
        </div>
    </div>
}
