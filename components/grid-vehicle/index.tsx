import React from 'react'
import CardCar from '../card-car';
import Car from '@/src/type/cars';
import { cn } from '@/lib/utils';
import PropagateLoader from 'react-spinners/PropagateLoader';

interface GridVehicleProps {
    items: Car[]
    className?: string
    classNameCard?: string
}

export default function GridVehicle({ items, className, classNameCard }: GridVehicleProps) {
    return <div className={cn("container xl:grid xl:grid-cols-3 gap-5", className)}>
        {items
            ? items.map(item => <CardCar key={item.idveiculo} car={item} className={classNameCard} />)
            : <PropagateLoader color={'#000'} loading={true} size={15} />
        }
    </div>
}
