'use client';

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import Image from "next/image";
import { useEffect, useState } from "react";
import publicApi from "@/lib/api";

interface CloudinaryImage {
	url: string;
	publicId: string;
	name: string;
	order: number | null;
}

export default function Carousel() {
	const [images, setImages] = useState<CloudinaryImage[] | null>(null);

	useEffect(() => {
		publicApi.get<CloudinaryImage[]>(`/site-images?folder=registro-site`)
			.then(({ data }) => {
				console.log(data);
				

				setImages(data);
			})
			.catch(err => {
				console.error("Erro ao carregar imagens:", err);
				setImages([]);
			});
	}, []);

	if (images === null) return null; // ainda carregando

	if (images.length === 0) {
		return (
			<div className="flex items-center justify-center w-screen h-[60vh] bg-gray-100 text-gray-500 text-xl">
				Sem imagens disponíveis
			</div>
		);
	}

	return (
		<Swiper
			modules={[Navigation, Pagination, Scrollbar, A11y]}
			direction='horizontal'
			pagination={{ clickable: true }}
		>
			{images.map((image, index) => (
				<SwiperSlide key={image.publicId} className='cursor-pointer'>
					<Image
						src={image.url}
						alt={image.name || `imagem-${index}`}
						width={1000}
						height={1000}
						className='lg:max-h-[60vh] h-auto w-screen object-cover'
					/>
				</SwiperSlide>
			))}
		</Swiper>
	);
}
