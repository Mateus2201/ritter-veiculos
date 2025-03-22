"use client";

import React, { useEffect, useState } from 'react';
import argo from "@/src/img/carros/argo.jpeg"
import chevette from "@/src/img/carros/chevette.jpeg"
import hilux from "@/src/img/carros/hilux.jpeg"
import Image from 'next/image';
import { Armchair, CalendarCheck2, CarFront, CheckCheck, ClipboardList, Factory, FastForward, Fuel, Gauge, HandHelping, Joystick,  PaintbrushVertical, RockingChair } from 'lucide-react';
import Cars from '@/src/type/cars';
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

const images = [argo, argo, hilux, argo, chevette, chevette, chevette, hilux, chevette, hilux, hilux,];

export default function CarPage({ params }: { params: { id: string } }) {
    const { id } = params;

    const [mainSwiper, setMainSwiper] = useState<any>(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [car, setCar] = useState<Cars>();

    useEffect(() => {
        publicApi.get(`cars/${id}`)
            .then((res) => setCar(res.data))
            .catch(() => {
                console.log("Acesso negado! Redirecionando...");
            });
    }, []);

    console.log(car);


    return car && <div className=" bg-gray-300">
        <div className="container mx-auto p-4 ">

            <div className='xl:flex mt-4 bg-white rounded-xl p-3'>
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
                <div className='xl:w-4/10 lg:p-5 pt-5'>
                    {/* <UploadImage/> */}
                    <h1 className="text-5xl font-bold m-2">{car?.modelo}</h1>
                    <p className="text-gray-600 m-2">{car?.observacao}</p>
                    <h1 className="lg:text-4xl text-stone-700 text-4xl font-bold m-2">{FormatNumber.formatPrice(car.valor)} {car?.exibicao_valor}</h1>
                    <p className="text-stone-700 m-2 flex items-center gap-2"><ClipboardList /> {car?.placa} {car?.exibicao_placa} </p>
                    <p className="text-stone-700 m-2 flex items-center gap-2"><HandHelping /> {car?.aceita_proposta} </p>
                    <p className="text-stone-700 m-2 flex items-center gap-2"><Fuel /> {car?.combustivel} </p>
                    <p className="text-stone-700 m-2 flex items-center gap-2"><CarFront /> {car?.modelo} </p>
                    <p className="text-stone-700 m-2 flex items-center gap-2"><Joystick /> {car?.motor} </p>
                    <p className="text-stone-700 m-2 flex items-center gap-2"><Armchair /> {car?.qtde_lugar} </p>
                    <p className="text-stone-700 m-2 flex items-center gap-2"><Gauge /> {car?.quilometragem} </p>
                    <p className="text-stone-700 m-2 flex items-center gap-2"><Factory /> {car?.idfabricante} </p>
                    <p className="text-stone-700 m-2 flex items-center gap-2"><CalendarCheck2 /> {car?.ano_fabricacao} / {car?.ano_modelo} </p>
                    <p className="text-stone-700 m-2 flex items-center gap-2"><PaintbrushVertical /> {car?.idcor} </p>
                    <p className="text-stone-700 m-2 flex items-center gap-2"><PaintbrushVertical /> {car?.idtipo_veiculo} </p>
                </div>
            </div>
            <Optionals Car={car} />

            <div className="mt-4 flex space-x-4">
                <div className="flex-1 bg-green-100 p-4 rounded-lg">
                    <h3 className="font-semibold">What's good</h3>
                    <ul className="list-disc pl-4 text-sm">
                        <li>Large and practical</li>
                        <li>Good to drive</li>
                    </ul>
                </div>
                <div className="flex-1 bg-red-100 p-4 rounded-lg">
                    <h3 className="font-semibold">What's not so good</h3>
                    <ul className="list-disc pl-4 text-sm">
                        <li>Basic interior</li>
                        <li>Pricey</li>
                    </ul>
                </div>
            </div>

            <div className="mt-4 flex space-x-4">
                <Link href="https://m.autocarro.com.br/andrigoveiculos/anuncio/nissan-kicks-1-6-sl-2018-marrom/1761035">View

                    <Button className="bg-green-500 hover:bg-green-600 text-offWhite" text='KICKS 1.6 SL 16V' />

                </Link>
                <Button className="bg-blue-500 hover:bg-blue-600 text-offWhite" text='Take the Quiz' />
            </div>
        </div>
    </div>
};