'use client';

import publicApi from '@/lib/api';
import Vehicle from '@/types/Vehicle';
import { Ban, CheckCheck } from 'lucide-react';
import { useEffect, useState } from 'react';

interface CategoryProps {
    Vehicle: Vehicle;
}

type GroupedOptionals = Record<number, {
    categoryDescription: string;
    optionals: string[];
}>;

export default function Optionals({ Vehicle }: CategoryProps) {
    const { idVehicle } = Vehicle;

    const [groupedOptions, setGroupedOptions] = useState<GroupedOptionals>({});
    const [hasData, setHasData] = useState(false);

    useEffect(() => {
        if (!idVehicle) return;

        publicApi.get<any[]>(`/cars-options/${idVehicle}`)
            .then(({ data }) => {
                if (!Array.isArray(data)) return;

                const grouped = data.reduce((acc, item) => {
                    const optional = item.Optional;
                    const category = optional?.OptionalCategory;
                    if (!optional || !category) return acc;

                    const categoryId = category.idOptionalCategory;
                    const categoryDescription = category.description;

                    if (!acc[categoryId]) {
                        acc[categoryId] = {
                            categoryDescription,
                            optionals: [],
                        };
                    }

                    acc[categoryId].optionals.push(optional.description);
                    return acc;
                }, {} as GroupedOptionals);

                setGroupedOptions(grouped);
                setHasData(Object.keys(grouped).length > 0);
            })
            .catch(() => {
                console.log("Erro ao buscar opcionais.");
            });
    }, [idVehicle]);

    return <section className="rounded-2xl p-8 mt-6 shadow-xl border border-gray-100">
        {hasData && (
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">
                Opcionais do Veículo
            </h2>
        )}

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {hasData ? (
                Object.entries(groupedOptions).map(([id, { categoryDescription, optionals }]) => (
                    <div
                        key={id}
                        className="bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200 rounded-xl p-5 shadow-sm"
                    >
                        <h3 className="text-xl font-semibold text-gray-700 mb-3 border-b pb-2">
                            {categoryDescription}
                        </h3>
                        <ul className="space-y-2">
                            {optionals.map((nome) => (
                                <li key={nome} className="flex items-center text-gray-600 text-md">
                                    <CheckCheck className="w-4 h-4 mr-2 text-green-600" />
                                    {nome}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            ) : (
                <div className="col-span-full flex flex-col items-center justify-center text-gray-500 py-10">
                    <Ban className="w-6 h-6 mb-2" />
                    <span className="text-base font-medium">Nenhum opcional disponível</span>
                </div>
            )}
        </div>
    </section>

}
