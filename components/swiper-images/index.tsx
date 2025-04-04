'use client'

import React, { useState } from 'react'
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import argo from "@/src/img/carros/argo.jpeg"
import chevette from "@/src/img/carros/chevette.jpeg"
import hilux from "@/src/img/carros/hilux.jpeg"
import Image from 'next/image';

type SwiperImagesProps = {
    id: number;
}

const images = [argo, argo, hilux, argo, chevette, chevette, chevette, hilux, chevette, hilux, hilux,];

export default function SwiperImages({ id }: SwiperImagesProps) {
    const [mainSwiper, setMainSwiper] = useState<any>(null);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    return <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        direction='horizontal'
        slidesPerView={1}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        initialSlide={selectedIndex}
        onSwiper={setMainSwiper}
        className="max-h-130 h-1/1 items-center rounded-t-lg "
    >
        {images.map((image, index) => (
            <SwiperSlide key={index} className="cursor-pointer" >
                <Image src={image} alt={`imagem-${index}`} className='h-auto not-lg:h-full w-auto not-lg:w-full'/>
            </SwiperSlide>
        ))}
    </Swiper>

}