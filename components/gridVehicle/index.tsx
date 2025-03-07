"use client";

import React, { useEffect, useState } from 'react'
import CardVehicle from '../cardVehicle';
import Cars from '@/src/type/cars';
import publicApi from '@/src/services/publicApi';

export default function GridVehicle({ items }: { items: Cars[] }) {
    return <div className="container xl:grid xl:grid-cols-3 gap-5">
        {items.map((item) => <CardVehicle key={item.idveiculo} {...item} />)}
    </div>
}
