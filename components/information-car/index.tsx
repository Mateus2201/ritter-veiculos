import Car from '@/src/type/cars';
import React from 'react'
import { Armchair, CalendarCheck2, CarFront, CheckCheck, ClipboardList, Factory, FastForward, Fuel, Gauge, HandHelping, Joystick, PaintbrushVertical, RockingChair } from 'lucide-react';
import FormatNumber from '@/components/format/formatNumber';

type InformationCarProps = {
    id: string;
    car: Car;
}

export default function InformationCar({ id,car}: InformationCarProps) {

    return car && <div className='xl:w-4/10 lg:p-5 pt-5'>
        <div className='flex items-baseline'>
            <h1 className="text-5xl font-bold m-2">{car?.modelo}  </h1>
            <h2 className="text-3xl font-bold m-2">{car?.motor}</h2>
        </div>

        <h1 className='text-3xl font-bold '> </h1>


        <p className="text-gray-600 m-2">{car?.observacao}</p>
        <h1 className="lg:text-3xl  text-4xl font-bold m-2">{car.exibicao_valor === 'S' ? FormatNumber.formatPrice(car.valor) : ('R$ ').concat(car.valor.toString().replace(/./g, "*"))}</h1>
        <p className=" m-2 flex items-center gap-2"><ClipboardList />  {FormatNumber.formatPlate(car.placa, car.exibicao_placa == 'S')} </p>
        <p className=" m-2 flex items-center gap-2"><HandHelping /> {car?.aceita_proposta} </p>
        <p className=" m-2 flex items-center gap-2"><Fuel /> {car?.combustivel} </p>
        {/* <p className=" m-2 flex items-center gap-2"><CarFront /> {  car?.modelo} </p> */}
        <p className=" m-2 flex items-center gap-2"><Joystick /> {car?.motor} </p>
        <p className=" m-2 flex items-center gap-2"><Armchair /> {car?.qtde_lugar} </p>
        <p className=" m-2 flex items-center gap-2"><Gauge /> {car?.quilometragem} </p>
        <p className=" m-2 flex items-center gap-2"><Factory /> {car?.idfabricante} </p>
        <p className=" m-2 flex items-center gap-2"><CalendarCheck2 /> {car?.ano_fabricacao} / {car?.ano_modelo} </p>
        <p className=" m-2 flex items-center gap-2"><PaintbrushVertical /> {car?.idcor} </p>
    </div>
}