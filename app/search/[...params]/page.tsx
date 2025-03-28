"use client";

import React, { useEffect, useState } from 'react';
import GridVehicle from '@/components/grid-vehicle';
import publicApi from '@/src/services/publicApi';
import ReactPaginate from 'react-paginate';
import Filter from '@/components/filter';
import { scroller } from "react-scroll";
import Car from '@/src/type/cars';
import { useParams, useSearchParams } from 'next/navigation';

const itensForPages = 9

export default function SearchPage({ params }: { params: { params: string[] } }) {
    const slug = params.params || [];
    const [name, manufacturer, color, model, minPrice, maxPrice] = slug;
    const [pageConfig, setPageConfig] = useState<{ limit?: number, offset?: number }>({ limit: 0, offset: 0 });
    const [sectionPage, setSectionPage] = useState<Car[]>([]);
    const [totalPaginas, setTotalPaginas] = useState<number>(0)
    const [offset, setOffset] = useState<number>(0)

    console.log('slug', slug);
        

    useEffect(() => {
        const parameters = slug.map((param) => param ? param : '_').join('/');

        console.log('parameters', parameters);
        console.log('slug', slug);
        

        // publicApi.get(`cars/${pageConfig.limit}/${pageConfig.offset}/${parameters}`)
        //     .then((res) => {
        //         console.log(res.data);
                
        //         setSectionPage(res.data.cars)
        //     })
        //     .catch(() => {
        //         console.log("Acesso negado! Redirecionando...");
        //     });
    }, [pageConfig]);

    useEffect(() => {
        if (sectionPage) {
            setTotalPaginas(Math.ceil(sectionPage.length / itensForPages))
            setPageConfig({ ...pageConfig, offset: (pageConfig?.offset ?? 0 - 1) * itensForPages })
        }
    }, [sectionPage]);

    const mudarPagina = (event: { selected: number }) => {
        setPageConfig({ ...pageConfig, offset: (pageConfig?.offset ?? 0 - event.selected + 1) });
        scroller.scrollTo("filters", {
            duration: 1500,
            smooth: true,
            offset: 0,
        });
    };

    return <div className=" min-h-screen bg-primary">
        <div className='container mx-auto flex flex-col'>
            <div className='md:flex h-full '>
                <Filter className='w-full md:w-1/4 p-5 filters items-start'>
                    <h1 className='text-3xl flex items-baseline font-bold text-offWhite'>Estoque</h1>
                </Filter>
                <div className='h-full w-full md:w-3/4 p-5 '>
                    <div className={'max-w-full flex items-center justify-center '}>
                        {sectionPage ? <GridVehicle items={sectionPage} /> : <h1 className='text-2xl flex items-baseline font-bold text-background'>Stock </h1>}
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
                        previousClassName="select-none items-center bg-white hover:bg-secondary hover:text-offWhite border-white rounded-md p-2 "
                        nextClassName="select-none items-center bg-white hover:bg-secondary hover:text-offWhite border-white rounded-md p-2 "
                        pageClassName="select-none items-center not-md:hidden bg-white hover:bg-secondary hover:text-offWhite border-white rounded-md p-2 "
                        breakClassName="select-none items-center not-md:hidden bg-white hover:bg-secondary hover:text-offWhite border-white rounded-md p-2 "
                        disabledClassName="select-none items-center not-md:hidden bg-white hover:bg-secondary hover:text-offWhite border-white rounded-md p-2 "
                    />
                </div>
            </div>
        </div>
    </div>
};

