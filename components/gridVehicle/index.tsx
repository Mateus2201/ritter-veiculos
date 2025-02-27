import React from 'react'
import CardVehicle from '../cardVehicle';
import Vehicle from '@/src/type/vehicle';

export default function GridVehicle({ items }: { items: Vehicle[] }) {
    return <div className="container xl:grid xl:grid-cols-3 gap-5">
        {items.map((item) => (
            <CardVehicle key={item.id} {...item} />
        ))}
    </div>
}
