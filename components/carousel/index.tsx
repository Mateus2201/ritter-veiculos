'use client';

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import Image from "next/image";
import { useEffect } from "react";
import publicApi from "@/lib/api";

interface CarouselProps {
	images: { src: string }[];
}

export default function Carousel({ images }: CarouselProps) {
	useEffect(() => {
		publicApi.get<any>(`/site-images?folder=registro-site`)
			.then((data) => console.log(data))

		// fetch('https://api.ritterveiculos.com.br/site-images?folder=registro-site')
		//     .then((res) => res.json())
	}, [])

	return <Swiper
		modules={[Navigation, Pagination, Scrollbar, A11y]}
		direction='horizontal'
		pagination={{ clickable: true }}
	>
		{images.map((image, index) => (
			<SwiperSlide key={index} className='cursor-pointer' >
				<Image
					src={image.src}
					alt={`imagem-${index}`}
					width={1000}
					height={1000}
					className='lg:max-h-[60vh] h-auto w-screen object-cover' />
			</SwiperSlide>
		))}
	</Swiper>

};
