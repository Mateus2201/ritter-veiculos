'use client';

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import Image from "next/image"; 

interface CarouselProps {
	images: { src: string }[];
}

export default function Carousel({ images }: CarouselProps) {
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
