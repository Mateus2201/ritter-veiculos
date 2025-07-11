'use client';

import React, { useState } from 'react';
import argo from "@/src/img/carros/argo.jpeg";
import chevette from "@/src/img/carros/chevette.jpeg";
import hilux from "@/src/img/carros/hilux.jpeg";
import Image from 'next/image';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { useIsMobile } from '@/hook/use-mobile';
import { useVehicleImage } from '@/hook/use-vehicle-images';
import { useEffect } from 'react';
import VehicleImage from '@/types/VehicleImage';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

// const images = [argo, argo, hilux, argo, chevette, chevette, chevette, hilux, chevette, hilux, hilux];

type SwipersProps = {
    idVehicle?: number;
};

export default function Swipers({ idVehicle }: SwipersProps) {
    const isMobile = useIsMobile();
    const [mainSwiper, setMainSwiper] = useState<SwiperClass | null>(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [images, setImages] = useState<VehicleImage[]>([]); // Assumindo tipo

    const { getAllVehicleImage } = useVehicleImage();

    useEffect(() => {
        getAllVehicleImage(idVehicle)
            .then((data) => {
                if (data && Array.isArray(data)) setImages(data);
            })
            .catch((error) => {
                console.error("Erro ao buscar imagens do veículo:", error);
            });
    }, []);

    return <div className="lg:flex lg:flex-row-reverse gap-4 w-full h-full max-w-4xl mx-auto">
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
                            <Image
                                src={image.secureURL}
                                alt={image.name || `imagem-${index}`}
                                // fill
                                width={400}
                                height={300}
                                className="object-cover rounded h-full w-full"
                                priority={index === 0}
                            />
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
                    spaceBetween={2}
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
                            <Image
                                src={image.secureURL}
                                alt={`miniatura-${index}`}
                                width={400}
                                height={300}
                                className="object-cover rounded max-h-full max-w-full"
                                priority={false} />
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
                                src={image.secureURL}
                                alt={`miniatura-${index}`}
                                width={400}
                                height={300}
                                className="object-cover rounded max-h-full max-w-full"
                                priority={false}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>}
    </div >
}
