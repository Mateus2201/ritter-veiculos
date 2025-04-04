"use client";

import React, { useEffect, useMemo, useState } from 'react';
import GridVehicle from '@/components/grid-vehicle';
import publicApi from '@/src/services/publicApi';
import ReactPaginate from 'react-paginate';
import Filter from '@/components/filter';
import { scroller, } from "react-scroll";
import Car from '@/src/type/cars';
import ScaleLoader from "react-spinners/ScaleLoader";
import Loading from '@/components/loading';

const itensForPages = 9

export default function StockPage() {
    const [offset, setPageConfig] = useState<number>(0);
    const [items, setItems] = useState<Car[]>([]);
    const [countCarsTotal, setCountCarsTotal] = useState<number>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        publicApi.get(`cars-stock/9/${offset}`)
            .then((res) => {
                setItems(res.data.cars);
                setCountCarsTotal(res.data.count);
                setLoading(false);
            })
            .catch(() => {
                console.log("Acesso negado! Redirecionando...");
            });


    }, [offset]);

    const totalPages = useMemo(() => {
        return countCarsTotal ? Math.ceil(countCarsTotal / itensForPages) : 0;
    }, [countCarsTotal, itensForPages]);


    const changePage = (event: { selected: number }) => {
        scroller.scrollTo("filters", {
            duration: 1500,
            smooth: true,
            offset: -10,
        });

        setPageConfig(event.selected++)
    };

    return <div className=" min-h-screen bg-gray-300">
        <div className='container mx-auto  flex flex-col'>
            <div className='md:flex h-full '>
                <Filter className='filters w-full md:w-1/4 p-5 my-5 rounded-lg bg-white items-start'>
                    <h1 className='text-3xl flex items-baseline font-bold text-background'>Estoque</h1>
                </Filter>
                {loading ? <Loading /> :
                    <div className='h-full w-full md:w-3/4 p-5 '>
                        {items.length > 0 ? <div className={'max-w-full flex items-center justify-center '}>
                            <GridVehicle items={items} classNameCard='bg-white text-primary' />
                        </div> : <div className='flex items-center justify-center w-full h-full'>
                            <h1 className='text-3xl font-bold text-background'>Nenhum veículo encontrado</h1>
                        </div>}
                        {(countCarsTotal && countCarsTotal < 9) &&
                            <ReactPaginate
                                previousLabel={"Anterior"}
                                nextLabel={"Próximo"}
                                breakLabel={"..."}
                                pageCount={totalPages}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={3}
                                onPageChange={changePage}
                                containerClassName="flex items-center justify-center gap-2 w-full h-15 p-0 mt-5"
                                activeClassName="text-xl bg-secondary text-offWhite"
                                previousClassName="select-none items-center  hover:bg-secondary hover:text-offWhite border-white rounded-md p-2 "
                                nextClassName="select-none items-center  hover:bg-secondary hover:text-offWhite border-white rounded-md p-2 "
                                pageClassName="select-none items-center not-md:hidden  hover:bg-secondary hover:text-offWhite border-white rounded-md p-2 "
                                breakClassName="select-none items-center not-md:hidden  hover:bg-secondary hover:text-offWhite border-white rounded-md p-2 "
                                disabledClassName="select-none items-center not-md:hidden  hover:bg-secondary hover:text-offWhite border-white rounded-md p-2 "
                            />}
                    </div>}
            </div>
        </div>
    </div>
};

