'use client'

import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import argo from '@/src/img/carros/argo.jpeg'
import chevette from '@/src/img/carros/chevette.jpeg'
import hilux from '@/src/img/carros/hilux.jpeg'
import Image from 'next/image';
import VehicleImage from '@/types/VehicleImage';
import { useVehicleImage } from '@/hook/use-vehicle-images';
import { useEffect } from 'react';

type SwiperImagesProps = {
    idVehicle: number;
}

// const images = [argo, argo, hilux, argo, chevette, chevette, chevette, hilux, chevette, hilux, hilux,];

export default function SwiperImages({ idVehicle }: SwiperImagesProps) {
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
    
    return <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        direction='horizontal'
        slidesPerView={1}
        pagination={{ clickable: true }}
        initialSlide={0}
        className='max-h-130 h-1/1 items-center rounded-t-lg '
    >
        {images.map((image, index) => (
            <SwiperSlide key={index} className='cursor-pointer' >
                <Image
                    src={image.secureURL}
                    alt={`imagem-${index}`}
                    width={400}
                    height={300}
                    className='h-auto not-lg:h-full w-auto not-lg:w-full z-1' />
            </SwiperSlide>
        ))}
    </Swiper>

}