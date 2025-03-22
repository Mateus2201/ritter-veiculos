"use client"

import Cars from '@/src/type/cars';
import React, { useEffect, useState } from 'react';
import GridVehicle from '../grid-vehicle';
import publicApi from '@/src/services/publicApi';

export default function GridHighlights() {
    const [cars, setCars] = useState<Cars[]>([])
    
    useEffect(() => {
        publicApi.get("cars-page/9/0")
            .then((res) => setCars(res.data))
            .catch(() => {
                console.log("Acesso negado! Redirecionando...");
            });
    }, []);

    return <div className={'max-w-full flex items-center justify-center p-10'}>
        <GridVehicle items={cars} />
    </div>
};