"use client"

import React, { useEffect, useState } from 'react';
import Input from '../input';
import Button from '../button';
import SelectComponent from '../select';
import { cn } from '@/lib/utils';
import { redirect } from 'next/navigation';
import Loading from '../loading';
import { useRef } from 'react';
import publicApi from '@/lib/publicApi';
import Manufacturer from '@/types/Manufacturers';
import Color from '@/types/Colors';
import VehicleCategory from '@/types/VehicleCategory';
import FormatNumber from '../format/formatNumber';


interface FilterProps {
    titleFilters: 'Estoque' | 'Blindados' | 'Clássicos' | 'Busca' | 'Seu carro aqui:';
    className?: string;
    children?: React.ReactNode;
    classNameGap?: string;
}

export default function Filter({ className, classNameGap, titleFilters }: FilterProps) {
    const [loader, setLoader] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [color, setColors] = useState<Color>();
    const [model, setModels] = useState<VehicleCategory>();
    const [manufacturer, setManufacturer] = useState<Manufacturer>();
    const [minPrice, setMinPrice] = useState<string>('');
    const [maxPrice, setMaxPrice] = useState<string>('');
    const lastQueryRef = useRef<string>("");

    const [colorOptions, setColorsOptions] = useState<Color[]>([]);
    const [modelOptions, setModelsOptions] = useState<VehicleCategory[]>([]);
    const [manufacturerOption, setManufacturerOptions] = useState<Manufacturer[]>([]);

    useEffect(() => {
        publicApi.get<Color[]>("/colors")
            .then((res) => {
                setColorsOptions(res.data)
            })
            .catch(() => {
                console.log("Acesso negado! Redirecionando...");
            });
    }, []);

    useEffect(() => {
        publicApi.get<VehicleCategory[]>("/vehicle-category")
            .then((res) => {
                setModelsOptions(res.data)
            })
            .catch(() => {
                console.log("Acesso negado! Redirecionando...");
            });
    }, []);

    useEffect(() => {
        publicApi.get<Manufacturer[]>("/manufacturer")
            .then((res) => {
                setManufacturerOptions(res.data)
            })
            .catch(() => {
                console.log("Acesso negado! Redirecionando...");
            });
    }, []);

    const changeValueForLink = () => {
        const queryParams = [
            name || "name",
            manufacturer?.idManufacturer || "produced",
            color?.idColor || "color",
            model?.idVehicleCategory || "type",
            minPrice ? FormatNumber.parseCurrency(minPrice) : "min-price",
            maxPrice ? FormatNumber.parseCurrency(maxPrice) : "max-price"
        ].join("/")

        if (queryParams !== lastQueryRef.current && queryParams !== "name/produced/color/type/min-price/max-price") {
            setLoader(true);
            redirect(`/search/${queryParams}`);
        }

        lastQueryRef.current = queryParams;
        return;
    };

    return <div className="w-full xl:w-1/4">
        <div id="filters">
            <div className={cn('flex items-center justify-center p-10 bg-primary', className)}>
                <div className='container flex flex-col items-center justify-center '>
                    <div className={cn('h-full w-full', classNameGap)}>
                        <h1 className="text-3xl font-bold text-background">{titleFilters}</h1>
                        <Input
                            value={name}
                            onChange={({ target }) => setName(target.value)}
                            placeholder='Nome do carro' classNameDiv='md:col-span-6' />
                        <SelectComponent
                            id="manufacturer"
                            options={manufacturerOption.map(({ idManufacturer, name }) => ({
                                value: idManufacturer,
                                description: name,
                            }))}
                            value={manufacturer?.idManufacturer}
                            onChange={(val) => setManufacturer(manufacturerOption.find((produced) => produced.idManufacturer == val))}
                            label="Fabricante"
                        />
                        <SelectComponent
                            id="colors"
                            options={colorOptions.map(({ idColor, description }) => ({
                                value: idColor, description
                            }))}
                            value={color?.idColor}
                            onChange={(val) => setColors(colorOptions.find((color) => color.idColor == val))}
                            label="Cores"
                        />
                        <SelectComponent
                            id="vehicleCategory"
                            label="Categoria"
                            value={model?.idVehicleCategory}
                            onChange={(val) => setModels(modelOptions.find((model) => model.idVehicleCategory == val))}
                            options={modelOptions.map(({ idVehicleCategory: idVehicleType, description }) => ({
                                value: idVehicleType,
                                description,
                            }))}
                        />
                        <Input
                            value={minPrice}
                            onChange={({ target }) => setMinPrice(FormatNumber.formatCurrency(target.value).toString())}
                            placeholder='Preço Mínimo (R$)' />
                        <Input
                            value={maxPrice}
                            onChange={({ target }) => setMaxPrice(FormatNumber.formatCurrency(target.value).toString())}
                            placeholder='Preço Máximo (R$)' />
                        <Button
                            onClick={changeValueForLink}
                            className='hover:bg-secondary hover:text-offWhite font-bold bg-red-700  text-white w-full flex items-center justify-center gap-2 rounded-lg'>
                            {loader
                                ? <Loading />
                                : <p className='font-bold text-md '>{'BUSCAR'}</p>
                            }
                        </Button>

                    </div>
                </div>
            </div>
        </div>
    </div>
};