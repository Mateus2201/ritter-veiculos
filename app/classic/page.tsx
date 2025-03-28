"use client";

import React, { useEffect, useMemo, useState } from 'react';
import GridVehicle from '@/components/grid-vehicle';
import publicApi from '@/src/services/publicApi';
import ReactPaginate from 'react-paginate';
import Filter from '@/components/filter';
import { scroller } from "react-scroll";
import Car from '@/src/type/cars';

const itensForPages = 9

export default function ClassisPage() {
    const [offset, setPageConfig] = useState<number>(0);
    const [sectionPage, setSectionPage] = useState<Car[]>([]);
    const [countCarsTotal, setCountCarsTotal] = useState<number>();

    useEffect(() => {
        publicApi.get(`cars-stock/9/${offset}`)
            .then((res) => {
                setSectionPage(res.data.cars);
                setCountCarsTotal(res.data.count);
            })
            .catch(() => {
                console.log("Acesso negado! Redirecionando...");
            });
    }, [offset]);

    const totalPaginas = useMemo(() => {
        return countCarsTotal ? Math.ceil(countCarsTotal / itensForPages) : 0;
    }, [countCarsTotal, itensForPages]);


    const mudarPagina = (event: { selected: number }) => {
        setPageConfig(event.selected++)

        scroller.scrollTo("filters", {
            duration: 1500,
            smooth: true,
            offset: 0,
        });
    };

    return <div className=" min-h-screen bg-gray-300">
        <div className='container mx-auto  flex flex-col'>
            <div className='md:flex h-full '>
                <Filter className='w-full md:w-1/4 p-5 my-5 rounded-lg bg-white items-start'>
                    <h1 className='text-3xl flex items-baseline font-bold text-background'>Clássicos</h1>
                </Filter>
                <div className='gridVeiculos h-full w-full md:w-3/4 p-5 '>
                    <div className={'max-w-full flex items-center justify-center '}>
                        <GridVehicle items={sectionPage} classNameCard='bg-white text-primary'/>
                    </div>
                    <ReactPaginate
                        previousLabel={"Anterior"}
                        nextLabel={"Próximo"}
                        breakLabel={"..."}
                        pageCount={totalPaginas}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        onPageChange={mudarPagina}
                        containerClassName="flex items-center justify-center gap-2 w-full h-15 p-0 mt-5"
                        activeClassName="text-xl bg-secondary text-offWhite"
                        previousClassName="select-none items-center  hover:bg-secondary hover:text-offWhite border-white rounded-md p-2 "
                        nextClassName="select-none items-center  hover:bg-secondary hover:text-offWhite border-white rounded-md p-2 "
                        pageClassName="select-none items-center not-md:hidden  hover:bg-secondary hover:text-offWhite border-white rounded-md p-2 "
                        breakClassName="select-none items-center not-md:hidden  hover:bg-secondary hover:text-offWhite border-white rounded-md p-2 "
                        disabledClassName="select-none items-center not-md:hidden  hover:bg-secondary hover:text-offWhite border-white rounded-md p-2 "
                    />
                </div>
            </div>
        </div>
    </div>
};

