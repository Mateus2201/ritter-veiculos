"use client";

import React, { useEffect, useState } from 'react';
import argo from "@/src/img/carros/argo.jpeg"
import chevette from "@/src/img/carros/chevette.jpeg"
import hilux from "@/src/img/carros/hilux.jpeg"
import Image from 'next/image';
import { Armchair, CalendarCheck2, CarFront, CheckCheck, ClipboardList, Factory, FastForward, Fuel, Gauge, HandHelping, Joystick, PaintbrushVertical, RockingChair } from 'lucide-react';
import Car from '@/src/type/cars';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import publicApi from '@/src/services/publicApi';
import FormatNumber from '@/components/format/formatNumber';
import Button from '@/components/button';
import UploadImage from '@/components/upload';
import Optionals from '@/components/optionals';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { scroller } from 'react-scroll';

const images = [argo, argo, hilux, argo, chevette, chevette, chevette, hilux, chevette, hilux, hilux,];

export default function CarPage() {
    const params = useParams();
    const { id } = params as { id: string };

    const [mainSwiper, setMainSwiper] = useState<any>(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
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
                    <div className="lg:flex lg:flex-row-reverse lg:w-6/10 w-full">
                        <div className="lg:w-8/10 w-full not-sm:w-full p-1">
                            <Swiper
                                modules={[Navigation, Pagination, Scrollbar, A11y]}
                                direction='horizontal'
                                slidesPerView={1}
                                pagination={{ clickable: true }}
                                scrollbar={{ draggable: true }}
                                initialSlide={selectedIndex}
                                onSwiper={setMainSwiper}
                                className="max-h-130 h-1/1 items-center rounded-lg "
                            >
                                {images.map((image, index) => (
                                    <SwiperSlide key={index} className="cursor-pointer">
                                        <Image src={image} alt={`imagem-${index}`} className='h-full' />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                        <div className="w-2/10 m-1 not-lg:hidden">
                            <Swiper
                                modules={[Navigation, Pagination, Scrollbar, A11y]}
                                direction="vertical"
                                slidesPerView={4}
                                scrollbar={{ draggable: true }}
                                className="max-h-130 h-1/1 rounded-lg "
                            >
                                {images.map((image, index) => (
                                    <SwiperSlide
                                        key={index}
                                        className="w-auto rounded-lg cursor-pointer mb-1"
                                        onClick={() => {
                                            setSelectedIndex(index);
                                            if (mainSwiper) mainSwiper.slideTo(index);
                                        }}
                                    >
                                        <Image src={image} alt={`imagem-${index}`} className='w-full rounded-lg' />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                        <div className="lg:hidden w-full mt-3 mx-1">
                            <Swiper
                                modules={[Navigation, Pagination, Scrollbar, A11y]}
                                direction="horizontal"
                                spaceBetween={10}
                                slidesPerView={4}
                                scrollbar={{ draggable: true }}
                                className="h-full rounded-lg"
                            >
                                {images.map((image, index) => (
                                    <SwiperSlide
                                        key={index}
                                        className="w-auto rounded-lg cursor-pointer "
                                        onClick={() => {
                                            setSelectedIndex(index);
                                            if (mainSwiper) mainSwiper.slideTo(index);
                                        }}
                                    >
                                        <Image src={image} alt={`imagem-${index}`} className='w-1/1 rounded-lg' />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                    <div className='xl:w-4/10 lg:px-5 not-lg:pt-5 '>
                        {car?.exibicao_valor === 'S' && <h2 className=" lg:text-5xl text-4xl font-bold text-accent"> {FormatNumber.formatPrice(car.valor)} </h2>}
                        {(car?.valor_parcela > 0 && car?.quantidade_parcela) && <h3 className="text-2xl font-semibold pt-3">Parcelas de {FormatNumber.formatPrice(car.valor_parcela)} em {car.quantidade_parcela}x</h3>}
                        {/* <p className="text-gray-600 m-2">{car?.observacao}</p> */}
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
                        {car?.aceita_proposta == 'S' && <p className="  flex items-center gap-2"><HandHelping size={36} absoluteStrokeWidth /> {'Aceitamos Proposta! Fale conosco'} </p>}
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