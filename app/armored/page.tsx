"use client";

import React, { useEffect, useMemo, useState } from 'react';
import Grid from '@/components/grid-vehicle';
import publicApi from '@/lib/publicApi';
import ReactPaginate from 'react-paginate';
import Filter from '@/components/filter';
import { scroller } from "react-scroll";
import Vehicle from '../../types/Vehicle';
import Loading from '@/components/loading';

const itensForPages = 9

export default function ArmoredPage() {
    const [offset, setPageConfig] = useState<number>(0);
    const [items, setItems] = useState<Vehicle[]>([]);
    const [countCarsTotal, setCountCarsTotal] = useState<number>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        publicApi
            .get<{ cars: Vehicle[]; count?: number }>(`/cars-stock/9/${offset}`)
            .then(({ data }) => {
                setItems(data.cars);
                setCountCarsTotal(data.count ?? 0);
                setLoading(false);
            })
            .catch(() => {
                console.log("Acesso negado! Redirecionando...");
            });
    }, [offset]);

    const totalPages = useMemo(() => {
        return countCarsTotal ? Math.ceil(countCarsTotal / itensForPages) : 0;
    }, [countCarsTotal]);

    const changePage = (event: { selected: number }) => {
        scroller.scrollTo("filters", {
            duration: 1500,
            smooth: true,
            offset: -10,
        });
        setPageConfig(event.selected);
    };

    return <div className="min-h-screen bg-gray-300">
        <div className="container mx-auto flex flex-col xl:flex-row gap-4 p-4">
            <Filter titleFilters="Blindados" className="w-full p-5 rounded-xl bg-white rounded-xl overflow-hidden border border-gray-200 shadow-lg min-h-[490px]" />
            <div className="w-full xl:w-3/4">
                {loading
                    ? <Loading />
                    : <Grid Vehicles={items} />
                }
                {typeof countCarsTotal === "number"
                    && countCarsTotal > 9
                    && <ReactPaginate
                        previousLabel={"Anterior"}
                        nextLabel={"Próximo"}
                        breakLabel={"..."}
                        pageCount={totalPages}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        onPageChange={changePage}
                        containerClassName="flex items-center justify-center gap-2 w-full h-15 p-0 mt-5"
                        activeClassName="text-xl bg-secondary text-offWhite"
                        previousClassName="select-none items-center hover:bg-secondary hover:text-offWhite border-white rounded-md p-2"
                        nextClassName="select-none items-center hover:bg-secondary hover:text-offWhite border-white rounded-md p-2"
                        pageClassName="select-none items-center not-md:hidden hover:bg-secondary hover:text-offWhite border-white rounded-md p-2"
                        breakClassName="select-none items-center not-md:hidden hover:bg-secondary hover:text-offWhite border-white rounded-md p-2"
                        disabledClassName="select-none items-center not-md:hidden hover:bg-secondary hover:text-offWhite border-white rounded-md p-2"
                    />}
            </div>
        </div>
    </div>
};

