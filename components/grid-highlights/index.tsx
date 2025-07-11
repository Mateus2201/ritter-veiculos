"use client"

import Vehicle from '@/types/Vehicle';
import React, { useEffect, useState } from 'react';
import Grid from '../grid-vehicle';
import publicApi from '@/lib/api';

export default function GridHighlights() {
    const [Vehicles, setVehicles] = useState<Vehicle[]>([])

    useEffect(() => {
        publicApi.get<Vehicle[]>("cars")
            .then((res) => setVehicles(res.data))
            .catch(() => {
                console.log("Acesso negado! Redirecionando...");
            });
    }, []);

    return <div className={'w-full flex items-center justify-center p-10 bg-gray-300 '}>
        <div className='container gap-5'>
            <Grid classNameCard='bg-white text-primary' Vehicles={Vehicles.filter(m => m.featured)} />
        </div>
    </div>
};