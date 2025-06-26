"use client";

import React, { useEffect, useState } from 'react';
import { Armchair, CalendarCheck2, ClipboardList, Factory, Fuel, Gauge, HandHelping, PaintbrushVertical, CarFront } from 'lucide-react';
import Vehicle from '@/types/Vehicle';
import publicApi from '@/src/services/publicApi';
import FormatNumber from '@/components/format/formatNumber';
import Optionals from '@/components/optionals';
import { useParams } from 'next/navigation';
import { scroller } from 'react-scroll';
import Swipers from '@/components/swipers';
import Button from '@/components/button';

export default function VehiclePage() {
    const params = useParams();
    const { id } = params as { id: string };
    const [vehicle, vetVehicle] = useState<Vehicle>();

    useEffect(() => {
        publicApi.get<{ cars: Vehicle }>(`vehicles/${id}`)
            .then((res) => {
                vetVehicle(res.data?.cars ?? []);
            })
            .catch(() => {
                console.log("Acesso negado! Redirecionando...");
            });
    }, [id]);

    useEffect(() => {
        scroller.scrollTo("vehicle", {
            duration: 1500,
            smooth: true,
            offset: 0,
        });
    }, []);

    return vehicle && <div className=" bg-gray-300">
        <div className="container mx-auto p-4 ">
            <div className=' bg-white rounded-xl p-3 text-stone-700'>
                <h1 className="text-5xl font-bold my-5 ">{vehicle?.model} - {vehicle?.engine}</h1>
                <div className='vehicle xl:flex mt-4'>
                    <Swipers />
                    <div className='xl:w-4/10 lg:px-5 not-lg:pt-5'>
                        {vehicle?.priceDisplay && <h2 className="lg:text-5xl text-4xl font-bold text-accent"> {FormatNumber.formatPrice(vehicle.price)} </h2>}
                        {(vehicle?.installmentValue > 0 && vehicle?.installmentCount) && <h3 className="text-2xl font-semibold pt-3">Parcelas de {FormatNumber.formatPrice(vehicle.installmentValue)} em {vehicle.installmentCount}x</h3>}
                        <div className='grid gap-5 lg:grid-cols-2 grid-cols-1 pt-5'>
                            <p className=" flex items-center gap-2"><Factory size={36} absoluteStrokeWidth /> {vehicle?.Manufacturer?.name} </p>
                            <p className=" flex items-center gap-2"><CalendarCheck2 size={36} absoluteStrokeWidth /> {vehicle?.modelYear} / {vehicle?.modelYear} </p>
                            <p className=" flex items-center gap-2"><ClipboardList size={36} absoluteStrokeWidth /> {FormatNumber.formatPlate(vehicle.licensePlate, vehicle?.licensePlateDisplay)}  </p>
                            <p className=" flex items-center gap-2"><Fuel size={36} absoluteStrokeWidth /> {vehicle?.fuel} </p>
                            <p className=" flex items-center gap-2"><Armchair size={36} absoluteStrokeWidth /> {vehicle?.seatCount} Lugares </p>
                            <p className=" flex items-center gap-2"><Gauge size={36} absoluteStrokeWidth /> {vehicle?.mileage} </p>
                            <p className=" flex items-center gap-2"><PaintbrushVertical size={36} absoluteStrokeWidth /> {vehicle?.Color?.description} </p>
                            {<p className=" flex items-center gap-2"><CarFront size={36} absoluteStrokeWidth /> {vehicle?.VehicleType?.description} </p>}
                        </div>
                        {vehicle?.allowsProposal && <p className="flex items-center pt-3 gap-2">
                            <HandHelping size={36} absoluteStrokeWidth /> {'Aceitamos Proposta! Fale conosco'}
                        </p>}
                        <div className="mt-4 space-x-4">
                            <div className="relative bottom-0 bg-green-100 w-full p-5 rounded-lg">
                                <h3 className="font-semibold">Observação:</h3>
                                <p className="text-sm">{vehicle?.notes}</p>
                            </div>
                        </div>
                        <Button>
                            <a href={`https://api.whatsapp.com/send?phone=5551984454592&text=Olá, gostaria de saber mais sobre o ${vehicle?.model} - ${vehicle?.engine}`} target="_blank" rel="noopener noreferrer">
                                Falar com vendedor
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
            <Optionals Vehicle={vehicle} />

        </div>
    </div>
};