import React, { useState } from 'react'
import argo from "@/src/img/carros/argo.jpeg"
import chevette from "@/src/img/carros/chevette.jpeg"
import hilux from "@/src/img/carros/hilux.jpeg"
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';

const images = [argo, argo, hilux, argo, chevette, chevette, chevette, hilux, chevette, hilux, hilux,];


export default function Swipers() {

    const [mainSwiper, setMainSwiper] = useState<any>(null);
    const [selectedIndex, setSelectedIndex] = useState(0);

    return <div className="lg:flex lg:flex-row-reverse lg:w-6/10 w-full">
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
}
