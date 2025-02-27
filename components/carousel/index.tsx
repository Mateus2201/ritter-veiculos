'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ArrowBigLeft, ArrowBigRight } from 'lucide-react';

interface CarouselProps {
	images: { src: string }[];
}

export default function Carousel({ images }: CarouselProps) {
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const carouselRef = useRef<HTMLDivElement>(null);
	const touchStartX = useRef<number | null>(null);

	useEffect(() => {
		const slideInterval = setInterval(() => {
			nextSlide();
		}, 5000);

		return () => clearInterval(slideInterval);
	}, [currentIndex]);

	const nextSlide = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
	};

	const prevSlide = () => {
		setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
	};

	const handleTouchStart = (e: React.TouchEvent) => {
		touchStartX.current = e.touches[0].clientX;
	};

	const handleTouchMove = (e: React.TouchEvent) => {
		if (!touchStartX.current) return;
		const touchEndX = e.touches[0].clientX;
		const diff = touchStartX.current - touchEndX;

		if (diff > 50) {
			nextSlide();
			touchStartX.current = null;
		} else if (diff < -50) {
			prevSlide();
			touchStartX.current = null;
		}
	};

	return (
		<div ref={carouselRef} className="relative w-screen h-[10vh] sm:h-[50vh] overflow-hidden" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
			<div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
				{images.map((image, index) => (
					<div key={index} className="w-full h-full flex-shrink-0">
						<img src={image.src} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
					</div>
				))}
			</div>
			{/* <button className="absolute top-1/2 left-25 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full" onClick={prevSlide}>
				<ArrowBigLeft />
			</button>
			<button className="absolute top-1/2 right-25 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full" onClick={nextSlide}>
				<ArrowBigRight />
			</button> */}
			<div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
				{images.map((_, index) => (
					<div key={index} onClick={() => setCurrentIndex(index)} className={`w-3 h-3 select-none rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray-400'}`}></div>
				))}
			</div>
		</div>
	);
};
