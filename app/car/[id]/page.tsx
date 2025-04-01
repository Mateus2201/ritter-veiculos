"use client";

import React, { useEffect, useState } from 'react';
import argo from "@/src/img/carros/argo.jpeg"
import chevette from "@/src/img/carros/chevette.jpeg"
import hilux from "@/src/img/carros/hilux.jpeg"
import { Armchair, CalendarCheck2, CarFront, ClipboardList, Factory, Fuel, Gauge, HandHelping, PaintbrushVertical } from 'lucide-react';
import Car from '@/src/type/cars';
import publicApi from '@/src/services/publicApi';
import FormatNumber from '@/components/format/formatNumber';
import Optionals from '@/components/optionals';
import { useParams } from 'next/navigation';
import { scroller } from 'react-scroll';
import Swipers from '@/components/swipers';

const images = [argo, argo, hilux, argo, chevette, chevette, chevette, hilux, chevette, hilux, hilux,];

export default function CarPage() {
    const params = useParams();
    const { id } = params as { id: string };
    const [car, setCar] = useState<Car>();

    useEffect(() => {
        publicApi.get(`cars/${id}`)
            .then((res) => {
                setCar(res.data)
            })
            .catch(() => {
                console.log("Acesso negado! Redirecionando...");
            });
    }, []);

    useEffect(() => {
        scroller.scrollTo("car", {
            duration: 1500,
            smooth: true,
            offset: 0,
        });
    }, []);

    return car && <div className=" bg-gray-300">
        <div className="container mx-auto p-4 ">
            <div className=' bg-white rounded-xl p-3 text-stone-700'>
                <h1 className="text-5xl font-bold my-5 ">{car?.modelo} - {car?.motor}</h1>
                <div className='car xl:flex mt-4 '>
                    <Swipers />
                    <div className='xl:w-4/10 lg:px-5 not-lg:pt-5 '>
                        {car?.exibicao_valor === 'S' && <h2 className="lg:text-5xl text-4xl font-bold text-accent"> {FormatNumber.formatPrice(car.valor)} </h2>}
                        {(car?.valor_parcela > 0 && car?.quantidade_parcela) && <h3 className="text-2xl font-semibold pt-3">Parcelas de {FormatNumber.formatPrice(car.valor_parcela)} em {car.quantidade_parcela}x</h3>}
                        <div className='grid gap-5 lg:grid-cols-2 grid-cols-1 pt-5'>
                            <p className=" flex items-center gap-2"><Factory size={36} absoluteStrokeWidth /> {car?.Fabricante?.nome} </p>
                            <p className=" flex items-center gap-2"><CalendarCheck2 size={36} absoluteStrokeWidth /> {car?.ano_fabricacao} / {car?.ano_modelo} </p>
                            <p className=" flex items-center gap-2"><ClipboardList size={36} absoluteStrokeWidth /> {FormatNumber.formatPlate(car.placa, car?.exibicao_placa == 'S')}  </p>
                            <p className=" flex items-center gap-2"><Fuel size={36} absoluteStrokeWidth /> {car?.combustivel} </p>
                            <p className=" flex items-center gap-2"><Armchair size={36} absoluteStrokeWidth /> {car?.qtde_lugar} Lugares </p>
                            <p className=" flex items-center gap-2"><Gauge size={36} absoluteStrokeWidth /> {car?.quilometragem} </p>
                            <p className=" flex items-center gap-2"><PaintbrushVertical size={36} absoluteStrokeWidth /> {car?.Cor?.descricao} </p>
                            {<p className=" flex items-center gap-2"><CarFront size={36} absoluteStrokeWidth /> {car?.TipoVeiculo?.descricao} </p>}
                        </div>
                        {car?.aceita_proposta == 'S' && <p className="flex items-center pt-3 gap-2">
                            <HandHelping size={36} absoluteStrokeWidth /> {'Aceitamos Proposta! Fale conosco'}
                        </p>}
                    </div>
                </div>
            </div>
            <Optionals Car={car} />
            {/* <div className="mt-4 flex space-x-4 none">
                <div className="flex-1 bg-green-100 p-4 rounded-lg">
                    <h3 className="font-semibold">Observação</h3>
                    <p className="text-sm">{car?.observacao}</p>
                </div>
            </div> */}
        </div>
    </div>
};