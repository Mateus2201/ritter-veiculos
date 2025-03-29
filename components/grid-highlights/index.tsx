"use client"

import Car from '@/src/type/cars';
import React, { useEffect, useState } from 'react';
import GridVehicle from '../grid-vehicle';
import publicApi from '@/src/services/publicApi';

export default function GridHighlights() {
    const [cars, setCars] = useState<Car[]>([])

    useEffect(() => {
        publicApi.get("cars-highlights/9")
            .then((res) => setCars(res.data))
            .catch(() => {
                console.log("Acesso negado! Redirecionando...");
            });
    }, []);

    return <div className={'max-w-full flex items-center justify-center p-10 bg-gray-300'}>
        <GridVehicle classNameCard='bg-white text-primary' items={cars} />
    </div>
};