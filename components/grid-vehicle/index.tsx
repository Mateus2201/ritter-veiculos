"use client";

import React from 'react'
import CardCar from '../card-car';
import Cars from '@/src/type/cars';
import { cn } from '@/lib/utils';

interface GridVehicleProps {
    items: Cars[]
    className?: string
    classNameCard?: string
}


export default function GridVehicle({ items, className, classNameCard }: GridVehicleProps) {
    return <div className={cn("container xl:grid xl:grid-cols-3 gap-5", className)}>
        {items.map((item) => <CardCar key={item.idveiculo} car={item} className={classNameCard} />)}
    </div>
}
