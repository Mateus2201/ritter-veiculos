"use client";

import React, { useEffect, useMemo, useState } from 'react';
import Grid from '@/components/grid-vehicle';
import publicApi from '@/lib/api';
import ReactPaginate from 'react-paginate';
import Filter from '@/components/filter';
import { scroller } from "react-scroll";
import Vehicle from '@/types/Vehicle';
import { useParams } from 'next/navigation';
import Loading from '@/components/loading';

const itensForPages = 9

export default function SearchPage() {
    const params = useParams();
    const slug = params.params as string[];

    const [pageIndex, setPageIndex] = useState<number>(0);
    const [countCarsTotal, setCountCarsTotal] = useState<number>();
    const [loading, setLoading] = useState<boolean>(true);
    const [allCars, setAllCars] = useState<Vehicle[]>([]);

    const currentItems = useMemo(() => {
        const start = pageIndex * itensForPages;
        return allCars.slice(start, start + itensForPages);
    }, [allCars, pageIndex]);

    const totalPages = useMemo(() => {
        return Math.ceil(allCars.length / itensForPages);
    }, [allCars]);

    useEffect(() => {
        setLoading(true);
        publicApi
            .get<{ cars: Vehicle[]; count?: number }>(`cars-search/0/0/${slug.join('/')}`)
            .then(({ data }) => {
                console.log(data);
                const filtered = data.cars.filter(v => !v.sold);

                setAllCars(filtered);
                setCountCarsTotal(filtered.length);
                setLoading(false);
            })
            .catch(() => {
                console.log("Erro ao carregar dados.");
            });
    }, []);

    const changePage = (event: { selected: number }) => {
        scroller.scrollTo("filters", {
            duration: 1500,
            smooth: true,
            offset: -10,
        });
        setPageIndex(event.selected);
    };

    return <div className="min-h-screen bg-gray-300">
        <div className="container mx-auto flex flex-col xl:flex-row gap-4 p-4">
            <Filter titleFilters="Busca" className="w-full p-5 xl:w-1/4 bg-white rounded-xl overflow-hidden border border-gray-200 shadow-lg min-h-[490px]" />
            <div className="w-full xl:w-3/4">
                {loading
                    ? <Loading />
                    : <Grid Vehicles={currentItems.filter(v => !v.sold)} />
                }
            </div>
        </div>
        {typeof countCarsTotal === "number"
            && countCarsTotal > itensForPages
            ? <ReactPaginate
                previousLabel={"Anterior"}
                nextLabel={"Próximo"}
                breakLabel={"..."}
                pageCount={totalPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={changePage}
                containerClassName="flex items-center justify-center gap-2 w-full h-15 p-0 mx-5 "
                activeClassName="text-xl bg-secondary text-offWhite"
                previousClassName="select-none items-center hover:bg-secondary hover:text-offWhite border-white rounded-md p-2"
                nextClassName="select-none items-center hover:bg-secondary hover:text-offWhite border-white rounded-md p-2"
                pageClassName="select-none items-center not-md:hidden hover:bg-secondary hover:text-offWhite border-white rounded-md p-2"
                breakClassName="select-none items-center not-md:hidden hover:bg-secondary hover:text-offWhite border-white rounded-md p-2"
                disabledClassName="select-none items-center not-md:hidden hover:bg-secondary hover:text-offWhite border-white rounded-md p-2"
            /> : null}
    </div>
};

