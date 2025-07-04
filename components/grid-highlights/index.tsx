"use client"

import Vehicle from '@/types/Vehicle';
import React, { useEffect, useState } from 'react';
import Grid from '../grid-vehicle';
import publicApi from '@/lib/publicApi';

export default function GridHighlights() {
    const [Vehicles, setVehicles] = useState<Vehicle[]>([])

    useEffect(() => {
        publicApi.get<Vehicle[]>("cars-highlights/9")
            .then((res) => setVehicles(res.data))
            .catch(() => {
                console.log("Acesso negado! Redirecionando...");
            });
    }, []);

    console.log(Vehicles);


    return <>
        {Vehicles.length === 0 &&
            <div className={'max-w-full flex items-center justify-center p-10 bg-gray-300'}>
                <Grid classNameCard='bg-white text-primary' Vehicles={Vehicles} />
            </div>}
    </>
};