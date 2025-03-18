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

interface FilterProps {
    className?: string;
    children?: React.ReactNode;
    classNameGap?: string;
}

export default function Filter({ className, children, classNameGap }: FilterProps) {
    const [carName, setCarName] = useState<string>('');

    const [colorOptions, setColorsOptions] = useState<Color[]>([]);
    const [color, setColors] = useState<Color>();

    const [modelOptions, setModelsOptions] = useState<CarsOptions[]>([]);
    const [model, setModels] = useState<TypeCars>();

    const [year, setYear] = useState<string>('');

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

    const changeSelectModel = (value: number) => {
        setModels(modelOptions.find((model) => model.idtipo_veiculo == value));
    }

    const changeSelectColors = (value: number) => {
        setColors(colorOptions.find((color) => color.idcor == value));
    }

    return <div className={cn('flex items-center justify-center p-10 bg-primary', className)}>
        <div className='container flex flex-col items-center justify-center '>
            <div className={cn('h-full w-full', classNameGap)}>
                {children}
                <Input
                    value={carName}
                    onChange={({ target }) => setCarName(target.value)}
                    placeholder='Nome do carro' classNameDiv='md:col-span-6' />
                <Input
                    value={year}
                    onChange={({ target }) => setYear(FormatNumber.formatNumber(target.value, '9999').toString())}
                    placeholder='Ano' />
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
                    onClick={() => { }}
                    className='bg-secondary text-offWhite hover:bg-white hover:text-primary'
                />
            </div>
        </div>
    </div>
};