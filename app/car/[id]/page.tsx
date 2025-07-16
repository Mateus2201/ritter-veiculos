"use client";

import React, { useEffect, useState } from 'react';
import Vehicle from '@/types/Vehicle';
import publicApi from '@/lib/api';
import { useParams } from 'next/navigation';
import { scroller } from 'react-scroll';
import Swipers from '@/components/swipers';
import Button from '@/components/button';
import WhatsAppIcon from '@/src/svg/whatsapp.svg';

import {
    Armchair,
    CalendarCheck2,
    Factory,
    Fuel,
    Gauge,
    HandHelping,
    PaintbrushVertical,
    CarFront,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Optionals from '@/components/optionals';


export default function VehiclePage() {
    const params = useParams();
    const { id } = params as { id: string };
    const [vehicle, setVehicle] = useState<Vehicle>();

    useEffect(() => {

        publicApi.get<Vehicle>(`/cars/${id}`)
            .then((res) => {
                console.log("Carro encontrado:", res.data);

                setVehicle(res.data);
            })
            .catch((): void => { console.log("Acesso negado! Redirecionando..."); });
    }, [id]);

    useEffect(() => {
        scroller.scrollTo("vehicle", {
            duration: 1500,
            smooth: true,
            offset: 0,
        });
    }, []);

    if (!vehicle) return null;

    return <div className="bg-gray-100 min-h-screen py-10 px-4">
        <div className="w-full xl:w-6/7 mx-auto bg-white shadow-xl rounded-3xl p-8 flex flex-col lg:flex-row gap-10">
            <Swipers idVehicle={vehicle.idVehicle} />
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    {/* Título + Preço */}
                    <h1 className="text-5xl font-bold text-gray-800 mb-2">
                        {vehicle?.model || 'Modelo não informado'} - {vehicle?.engine || 'Motor não informado'}
                    </h1>
                    {vehicle?.priceDisplay && vehicle?.price ? (
                        <p className="text-5xl text-red-600 font-bold truncate">
                            {Number(vehicle?.price).toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            })}
                        </p>
                    ) : <p className="text-5xl text-red-600 font-bold truncate">
                            Preço indisponível
                        </p>}

                    {/* Parcelamento */}
                    {vehicle?.installmentValue > 0 && (
                        <p className="text-sm mt-1 text-gray-500">
                            Parcelas de <strong>R$ {vehicle.installmentValue.toLocaleString('pt-BR')}</strong> em {vehicle.installmentCount}x
                        </p>
                    )}

                    {/* Grade de dados */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6 text-lg text-gray-700">
                        <p className="flex items-center gap-2">
                            <Factory className="w-4 h-4" /> {vehicle?.Manufacturer?.name || 'Fabricante'}
                        </p>
                        <p className="flex items-center gap-2">
                            <CalendarCheck2 className="w-4 h-4" /> {vehicle?.modelYear}/{vehicle?.manufacturingYear}
                        </p>
                        <p className="flex items-center gap-2">
                            <Fuel className="w-4 h-4" /> {vehicle?.fuel}
                        </p>
                        <p className="flex items-center gap-2">
                            <Armchair className="w-4 h-4" /> {vehicle?.seatCount || '-'} lugares
                        </p>
                        <p className="flex items-center gap-2">
                            <Gauge className="w-4 h-4" /> {vehicle?.mileage?.toLocaleString('pt-BR')} km
                        </p>
                        <p className="flex items-center gap-2">
                            <PaintbrushVertical className="w-4 h-4" /> {vehicle?.Color?.description || '-'}
                        </p>
                        {/* <p className="flex items-center gap-2">
                            <CarFront className="w-4 h-4" /> {vehicle?.VehicleType?.description || '-'}
                        </p> */}
                    </div>
                    {vehicle?.notes ? <div className="bg-green-50 border border-green-200 rounded-md p-4 mt-15">
                        <h4 className="text-green-800 font-semibold mb-1">Observação:</h4>
                        <p className="text-sm text-green-900">{vehicle.notes}</p>
                    </div>
                        : null}
                    {vehicle?.allowsProposal ? <div className="text-blue-600 font-medium flex items-center gap-2 mt-4 text-sm">
                        <HandHelping className="w-4 h-4" />
                        Aceitamos proposta. Fale conosco.
                    </div>
                        : null}
                </div>
                {/* Botão */}
                <div className="mt-8">
                    <Link
                        href="https://api.whatsapp.com/send?phone=5551999522616"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button className=" font-bold bg-gray-300 border  text-gray-600 w-full flex items-center justify-center gap-2 rounded-lg">
                            <Image src={WhatsAppIcon} alt="WhatsApp" className="w-5 h-5" />
                            Falar com vendedor
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
        <div className="xl:w-6/7 mx-auto bg-white shadow-xl rounded-3xl" id="vehicle">
            <Optionals Vehicle={vehicle} />
        </div>
    </div>


}