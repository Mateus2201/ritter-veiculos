"use client"

import Carousel from '@/components/carousel'
import Filter from '@/components/filter'
import Header from '@/components/navbar'
import foto1 from '@/src/img/banner-2.png';
import foto2 from '@/src/img/banner.png';
import foto3 from '@/public/foto-3.jpg';
import Logo from '@/public/logo.png'
import { useState } from 'react';

export default function home() {
	

	return <div className='bg-primary min-h-screen max-w-screen w-[100vw]'>
		<Header logo={Logo} />
		<Carousel images={[foto1, foto2]} />
		<Filter />
		
	</div>
}
