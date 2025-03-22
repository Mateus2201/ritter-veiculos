'use client'

import publicApi from '@/src/services/publicApi';
import Cars from '@/src/type/cars';
import CarsOptions from '@/src/type/cars-options';
import { Ban, CheckCheck } from 'lucide-react'
import React, { useEffect, useState } from 'react'

interface CategoryProps {
    Car: Cars;
}

export default function Optionals({ Car }: CategoryProps) {
    const { idveiculo } = Car;

    const [OptionsVehicles, setOptionsVehicles] = useState<CarsOptions[]>([])
    const [groupedOptions, setGroupedOptions] = useState<Record<number, { descricao: string; opcionais: string[] }>>()

    useEffect(() => {
        publicApi.get(`/cars-options/`.concat(idveiculo.toString()))
            .then(({ data }) => setOptionsVehicles(data))
            .catch(() => {
                console.log("Acesso negado! Redirecionando...");
            });
    }, []);

    useEffect(() => {
        setGroupedOptions(
            OptionsVehicles?.reduce((acc, { Opcional: optional }) => {
                if (!optional.TipoOpcional) return acc;

                const { idtipo_opcional, descricao } = optional.TipoOpcional;

                if (!acc[idtipo_opcional]) {
                    acc[idtipo_opcional] = { descricao, opcionais: [] };
                }

                acc[idtipo_opcional].opcionais.push(optional.nome);
                return acc;
            }, {} as Record<number, { descricao: string; opcionais: string[] }>)
        );
    }, [OptionsVehicles]);

    console.log(OptionsVehicles);


    return <div className="grid gap-10 lg:grid-cols-4 grid-cols-1 bg-white mt-4 p-10 rounded-lg w-full">
        {OptionsVehicles.length > 0?
            Object.entries(groupedOptions ?? {}).map(([id, { descricao, opcionais }]) => <div>
                <h2 className="text-lg font-semibold">{descricao}:</h2>
                {opcionais.map((nome) => (
                    <p key={nome} className="m-2 flex items-center gap-2">
                        <CheckCheck /> {nome}
                    </p>
                ))}
            </div>)
            : <div className='flex space-x-2 items-center text-secondary'><Ban /><h1 className="text-lg   font-semibold"> Nenhuma opcional disponível!</h1></div>}
    </div>


}
