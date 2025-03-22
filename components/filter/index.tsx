"use client"

import React, { useEffect, useState } from 'react';
import FormatNumber from '../format/formatNumber';
import Input from '../input';
import Button from '../button';
import Select from '../select';
import Color from '@/src/type/color';
import CarsOptions from '@/src/type/type-cars';
import TypeCars from '@/src/type/type-cars';
import publicApi from '@/src/services/publicApi';
import { cn } from '@/lib/utils';
import Produced from '@/src/type/produced';
import Link from 'next/link';
import Router, { redirect } from 'next/navigation';

interface FilterProps {
    className?: string;
    children?: React.ReactNode;
    classNameGap?: string;
}

export default function Filter({ className, children, classNameGap }: FilterProps) {
    const [stringForLink, setstringForLink] = useState<string>();

    const [carName, setCarName] = useState<string>('');

    const [colorOptions, setColorsOptions] = useState<Color[]>([]);
    const [color, setColors] = useState<Color>();

    const [modelOptions, setModelsOptions] = useState<CarsOptions[]>([]);
    const [model, setModels] = useState<TypeCars>();

    const [producedOptions, setProducedOptions] = useState<Produced[]>([]);
    const [produced, setProduced] = useState<Produced>();

    const [minPrice, setMinPrice] = useState<string>('');
    const [maxPrice, setMaxPrice] = useState<string>('');

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
        publicApi.get("/car-type")
            .then((res) => {
                setModelsOptions(res.data)
            })
            .catch(() => {
                console.log("Acesso negado! Redirecionando...");
            });
    }, []);

    useEffect(() => {
        publicApi.get("/produced")
            .then((res) => {
                setProducedOptions(res.data)
            })
            .catch(() => {
                console.log("Acesso negado! Redirecionando...");
            });
    }, []);

    console.log(stringForLink);


    const changeSelectModel = (value: number) => {
        setModels(modelOptions.find((model) => model.idtipo_veiculo == value));
    }

    const changeSelectColors = (value: number) => {
        setColors(colorOptions.find((color) => color.idcor == value));
    }

    const changeSelectProduced = (value: number) => {
        setProduced(producedOptions.find((produced) => produced.idfabricante == value));
    }

    const changeValueForLink = () => {
        let link = '/stock';

        link += `/${carName ? carName : '?'}`
        link += `/${produced ? produced.idfabricante : '?'}`
        link += `/${color ? color.idcor : '?'}`
        link += `/${model ? model.idtipo_veiculo : '?'}`
        link += `/${minPrice ? FormatNumber.parseCurrency(minPrice) : '?'}`
        link += `/${maxPrice ? FormatNumber.parseCurrency(maxPrice) : '?'}`

        redirect(link);
    }

    return <div className={cn('flex items-center justify-center p-10 bg-primary', className)}>
        <div className='container flex flex-col items-center justify-center '>
            <div className={cn('h-full w-full', classNameGap)}>
                {children}
                <Input
                    value={carName}
                    onChange={({ target }) => setCarName(target.value)}
                    placeholder='Nome do carro' classNameDiv='md:col-span-6' />
                <Select
                    options={producedOptions.map(({ idfabricante, nome }) => ({ id: idfabricante, value: nome }))}
                    onChange={({ target }) => changeSelectProduced(Number(target.value))}
                    selectedValue={produced?.idfabricante}
                    placeholder='Fabricante'
                />
                <Select
                    options={colorOptions.map(({ idcor, descricao }) => ({ id: idcor, value: descricao }))}
                    onChange={({ target }) => changeSelectColors(Number(target.value))}
                    selectedValue={color?.idcor}
                    placeholder='Cores'
                />
                <Select
                    options={modelOptions.map(({ idtipo_veiculo, descricao }) => ({ id: idtipo_veiculo, value: descricao }))}
                    onChange={({ target }) => changeSelectModel(Number(target.value))}
                    selectedValue={model?.idtipo_veiculo}
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
                    text='BUSCAR'
                    onClick={changeValueForLink}
                    className='hover:bg-secondary hover:text-offWhite bg-gray-300 text-background'
                />
            </div>
        </div>
    </div>
};