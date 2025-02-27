import Vehicle from '@/src/type/vehicle';
import React from 'react';
import GridVehicle from '../gridVehicle';

export default function GridHighlights({ items }: { items: Vehicle[] }) {
    return <div className={'max-w-full flex items-center justify-center p-10'}>
        <GridVehicle items={items} />
    </div>
};