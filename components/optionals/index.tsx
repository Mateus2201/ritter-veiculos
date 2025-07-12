'use client'

import publicApi from '@/lib/api';
import OptionalCategory from '@/types/OptionalCategory';
import Vehicle from '@/types/Vehicle';
import VehicleOptional from '@/types/VehicleOptional';
import { Ban, CheckCheck } from 'lucide-react'
import { useEffect, useState } from 'react'

interface CategoryProps {
    Vehicle: Vehicle;
}

type GroupedOptionals = Record<number, {
    description: string;
    opcionais: string[];
}>;

export default function Optionals({ Vehicle }: CategoryProps) {
    const { idVehicle } = Vehicle;

    const [OptionsVehicles, setOptionsVehicles] = useState<OptionalCategory[]>([])
    const [groupedOptions, setGroupedOptions] = useState<GroupedOptionals>({})

    useEffect(() => {
        if (!idVehicle) return;

        publicApi.get<any>(`/cars-options/${idVehicle}`)
            .then(({ data }) => {
                console.log(data)

                setOptionsVehicles(data)
            })
            .catch(() => {
                console.log("Acesso negado! Redirecionando...");
            });
    }, [idVehicle]);

    useEffect(() => {

        setGroupedOptions(
            OptionsVehicles?.reduce((acc, { Optional: optional }) => {
                if (!optional.OptionalType) return acc;

                const { idOptionalCategory: idOptionalType, description } = optional.OptionalType;

                if (!acc[idOptionalType]) {
                    acc[idOptionalType] = { description, opcionais: [] };
                }

                acc[idOptionalType].opcionais.push(optional.description);
                return acc;
            }, {} as Record<number, { description: string; opcionais: string[] }>)
        );
    }, [OptionsVehicles]);


    return (
        <div className="flex flex-col items-start justify-start bg-white mt-4 p-10 w-full rounded-lg">
            {OptionsVehicles.length > 0 && (
                <h1 className="text-3xl font-semibold text-center w-full mb-5">Opcionais:</h1>
            )}
            <div className="grid gap-10 lg:grid-cols-4 grid-cols-1">
                {OptionsVehicles.length > 0 ? (
                    Object.entries(groupedOptions).map(([id, { description, opcionais }]) => (
                        <div key={id} className="flex flex-col items-start justify-start p-4 rounded-lg">
                            <h2 className="text-lg font-semibold">{description}:</h2>
                            {opcionais.map((nome) => (
                                <p key={nome} className="m-2 text-black flex items-center gap-2">
                                    <CheckCheck /> {nome}
                                </p>
                            ))}
                        </div>
                    ))
                ) : (
                    <div className="flex space-x-2 items-center justify-center text-secondary">
                        <Ban />
                        <h1 className="text-lg font-semibold">Nenhuma opcional disponível!</h1>
                    </div>
                )}
            </div>
        </div>
    );
}
