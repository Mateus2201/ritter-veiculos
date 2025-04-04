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
import { redirect } from 'next/navigation';
import { Loader } from 'lucide-react';
import Loading from '../loading';
import { useRef } from 'react';

interface FilterProps {
    className?: string;
    children?: React.ReactNode;
    classNameGap?: string;
}

export default function Filter({ className, children, classNameGap }: FilterProps) {
    const [loader, setLoader] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [colorOptions, setColorsOptions] = useState<Color[]>([]);
    const [color, setColors] = useState<Color>();
    const [modelOptions, setModelsOptions] = useState<CarsOptions[]>([]);
    const [model, setModels] = useState<TypeCars>();
    const [producedOptions, setProducedOptions] = useState<Produced[]>([]);
    const [produced, setProduced] = useState<Produced>();
    const [minPrice, setMinPrice] = useState<string>('');
    const [maxPrice, setMaxPrice] = useState<string>('');
    const lastQueryRef = useRef<string>("");

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
        const queryParams = [
            name || "name",
            produced?.idfabricante || "produced",
            color?.idcor || "color",
            model?.idtipo_veiculo || "type",
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