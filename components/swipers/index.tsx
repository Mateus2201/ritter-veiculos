'use client';

import React, { useState } from 'react';
import argo from "@/src/img/carros/argo.jpeg";
import chevette from "@/src/img/carros/chevette.jpeg";
import hilux from "@/src/img/carros/hilux.jpeg";
import Image from 'next/image';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useIsMobile } from '@/hook/use-mobile';

const images = [argo, argo, hilux, argo, chevette, chevette, chevette, hilux, chevette, hilux, hilux];



export default function Swipers(idVehicle?: number) {
    const isMobile = useIsMobile();
    const [mainSwiper, setMainSwiper] = useState<SwiperClass | null>(null);
    const [selectedIndex, setSelectedIndex] = useState(0);

    

    return <div className="lg:flex lg:flex-row-reverse gap-4 w-full h-full max-w-5xl mx-auto">
        {/* Swiper principal */}
        <div className="lg:w-4/5 w-full h-full">
            <Swiper
                modules={[Navigation, Pagination, A11y]}
                direction="horizontal"
                slidesPerView={1}
                pagination={{ clickable: true }}
                initialSlide={selectedIndex}
                onSwiper={setMainSwiper}
                className="rounded-lg h-full"
            >
                {images.map((image, index) => (
                    <div className='relative w-full h-[525px]'>
                        <SwiperSlide key={index} className="cursor-pointer">
                            <Image src={image} alt={'imagem - ${index'} className='lg:h-[525px] object-center' />
                        </SwiperSlide>

                    </div>
                ))}
            </Swiper>
        </div>
        {!isMobile
            ? <div className="w-2/10 m-1 not-lg:hidden">
                <Swiper
                    modules={[Navigation, Pagination, A11y]}
                    direction="vertical"
                    spaceBetween={50}
                    slidesPerView={4}
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
                            <Image src={image} alt={'imagem - ${index}'} className='w-full rounded-lg' />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            : <div className="lg:hidden w-full mt-3 px-1">
                <Swiper
                    modules={[Scrollbar, A11y]}
                    direction="horizontal"
                    slidesPerView={4}
                    spaceBetween={10}
                    scrollbar={{ draggable: true }}
                >
                    {images.map((image, index) => (
                        <SwiperSlide
                            key={index}
                            className="relative aspect-video w-full cursor-pointer"
                            onClick={() => {
                                setSelectedIndex(index);
                                if (mainSwiper) mainSwiper.slideTo(index);
                            }}
                        >
                            <Image
                                src={image}
                                alt={`miniatura-${index}`}
                                fill
                                className="object-cover rounded-md"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>}
    </div >
}
