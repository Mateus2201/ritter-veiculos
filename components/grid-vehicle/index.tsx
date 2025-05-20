import React from 'react'
import CardCar from '../card-car';
import Vehicle from '@/types/Vehicle';
import { cn } from '@/lib/utils';
import PropagateLoader from 'react-spinners/PropagateLoader';

interface GridVehicleProps {
    Vehicles: Vehicle[]
    className?: string
    classNameCard?: string
}

export default function GridVehicle({ Vehicles, className, classNameCard }: GridVehicleProps) {
    return <div className={cn("container md:grid md:grid-cols-2 xl:grid-cols-3 gap-5", className)}>
        {Vehicles
            ? Vehicles.map(item => <CardCar key={item.id} Vehicle={item} className={classNameCard} />)
            : <PropagateLoader color={'#000'} loading={true} size={15} />
        }
    </div>
}
