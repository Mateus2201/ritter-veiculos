'use client';

import { useState } from 'react';
import Card from '../card';
import Vehicle from '@/types/Vehicle';
import { cn } from '@/lib/utils';
import PropagateLoader from 'react-spinners/PropagateLoader';
import SwiperImages from "@/components/swiper-images";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    ClipboardList,
    Calendar1,
    Fuel,
    Gauge,
    Loader,
} from "lucide-react";

interface GridProps {
    vehicles: Vehicle[]
    className?: string
    classNameCard?: string
}

export default function Grid({ vehicles }: GridProps) {
    const [loader, setLoader] = useState<number | null>(null);

    return <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
            <div
                key={vehicle.idVehicle}
                className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-lg hover:shadow-2xl transition-transform hover:-translate-y-1 flex flex-col"
            > 
                <div className="h-60 w-full relative">
                    <SwiperImages id={vehicle.idVehicle} />
                    {!!vehicle.sold && (
                        <Badge className="absolute top-4 left-4 bg-red-600 z-1 text-white">
                            Vendido
                        </Badge>
                    )}
                    {!!vehicle.featured && !vehicle.sold && (
                        <Badge className="absolute top-4 left-4 bg-green-600 z-1 text-white">
                            Destaque
                        </Badge>
                    )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <h2 className="text-xl font-bold text-gray-800">
                                {vehicle.model}
                            </h2>
                            <p className="text-lg font-semibold text-indigo-600">
                                {vehicle.priceDisplay && vehicle.price > 0
                                    ? `R$ ${vehicle.price.toLocaleString("pt-BR")}`
                                    : "Sob consulta"}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                            <p className="flex items-center gap-1">
                                <ClipboardList className="w-4 h-4" />
                                {vehicle.licensePlateDisplay
                                    ? vehicle.licensePlate
                                    : "Placa oculta"}
                            </p>
                            <p className="flex items-center gap-1">
                                <Calendar1 className="w-4 h-4" />
                                {vehicle.modelYear}/{vehicle.manufacturingYear}
                            </p>
                            <p className="flex items-center gap-1">
                                <Fuel className="w-4 h-4" />
                                {vehicle.fuel}
                            </p>
                            <p className="flex items-center gap-1">
                                <Gauge className="w-4 h-4" />
                                {vehicle.mileage.toLocaleString("pt-BR")} km
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {!!vehicle.armored && (<Badge className="bg-yellow-400 text-black">Blindado</Badge>)}
                            {!!vehicle.allowsTrade && (<Badge className="bg-blue-600 text-white">Aceita troca</Badge>)}
                            {!!vehicle.allowsProposal && (<Badge className="bg-purple-600 text-white">Aceita proposta</Badge>)}
                        </div>
                    </div>

                    <div className="pt-5">
                        <Link href={`/car/${vehicle.idVehicle}`}>
                            <Button
                                onClick={() => setLoader(vehicle.idVehicle)}
                                className="w-full bg-red-700 hover:bg-red-800 text-white"
                            >
                                {loader === vehicle.idVehicle
                                    ? <Loader className="animate-spin h-5 w-5" />
                                    : <span>Ver Mais</span>
                                }
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        ))}
    </div>
}
