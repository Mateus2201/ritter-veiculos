"use client"

import React, { useEffect, useState } from 'react';
import Input from '../input';
import Button from '../button';
import Select from '../select';
import { cn } from '@/lib/utils';
import { redirect } from 'next/navigation';
import Loading from '../loading';
import { useRef } from 'react';

import publicApi from '@/lib/publicApi';

import OptionalCategory from '@/types/OptionalCategory';
import Manufacturer from '@/types/Manufacturers';
import Color from '@/types/Colors';

import FormatNumber from '../format/formatNumber';

interface FilterProps {
    className?: string;
    children?: React.ReactNode;
    classNameGap?: string;
}

export default function Filter({ className, children, classNameGap }: FilterProps) {
    const [loader, setLoader] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [color, setColors] = useState<Color>();
    const [model, setModels] = useState<OptionalCategory>();
    const [manufacturer, setManufacturer] = useState<Manufacturer>();
    const [minPrice, setMinPrice] = useState<string>('');
    const [maxPrice, setMaxPrice] = useState<string>('');
    const lastQueryRef = useRef<string>("");

    const [colorOptions, setColorsOptions] = useState<Color[]>([]);
    const [modelOptions, setModelsOptions] = useState<OptionalCategory[]>([]);
    const [manufacturerOption, setManufacturerOptions] = useState<Manufacturer[]>([]);

    useEffect(() => {
        publicApi.get("/colors")
            .then((res) => {
                setColorsOptions(res.data)
            })
            .catch(() => {
                console.log("Acesso negado! Redirecionando...");
            });
    }, []);

    useEffect(() => {
        publicApi.get("/vehicle-category")
            .then((res) => {
                setModelsOptions(res.data)
            })
            .catch(() => {
                console.log("Acesso negado! Redirecionando...");
            });
    }, []);

    useEffect(() => {
        publicApi.get("/manufacturer")
            .then((res) => {
                setManufacturerOptions(res.data)
            })
            .catch(() => {
                console.log("Acesso negado! Redirecionando...");
            });
    }, []);

    const changeSelectModel = (value: number) => {
        setModels(modelOptions.find((model) => model.idOptionalCategory == value));
    }

    const changeSelectColors = (value: number) => {
        setColors(colorOptions.find((color) => color.idColor == value));
    }

    const changeSelectProduced = (value: number) => {
        setManufacturer(manufacturerOption.find((produced) => produced.idManufacturer == value));
    }

    const changeValueForLink = () => {
        const queryParams = [
            name || "name",
            manufacturer?.idManufacturer || "produced",
            color?.idColor || "color",
            model?.idOptionalCategory || "type",
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

    return <div className={cn('flex items-center justify-center p-10 bg-primary', className)}>
        <div className='container flex flex-col items-center justify-center '>
            <div className={cn('h-full w-full', classNameGap)}>
                {children}
                <Input
                    value={name}
                    onChange={({ target }) => setName(target.value)}
                    placeholder='Nome do carro' classNameDiv='md:col-span-6' />
                <Select
                    options={manufacturerOption.map(({ idManufacturer, name }) => ({ id: idManufacturer, value: name }))}
                    onChange={({ target }) => changeSelectProduced(Number(target.value))}
                    selectedValue={manufacturer?.idManufacturer}
                    placeholder='Fabricante'
                />
                <Select
                    options={colorOptions.map(({ idColor, description }) => ({ id: idColor, value: description }))}
                    onChange={({ target }) => changeSelectColors(Number(target.value))}
                    selectedValue={color?.idColor}
                    placeholder='Cores'
                />
                <Select
                    options={modelOptions.map(({ idOptionalCategory: idOptionalType, description }) => ({ id: idOptionalType, value: description }))}
                    onChange={({ target }) => changeSelectModel(Number(target.value))}
                    selectedValue={model?.idOptionalCategory}
                    placeholder='Modelo'
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
                    className='hover:bg-secondary hover:text-offWhite font-bold bg-gray-300 '>
                    {loader
                        ? <Loading />
                        : <p className='font-bold text-md '>{'BUSCAR'}</p>
                    }
                </Button>

            </div>
        </div>
    </div>
};