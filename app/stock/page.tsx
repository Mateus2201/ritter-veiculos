"use client";

import React, { useEffect, useState } from 'react';
import GridVehicle from '@/components/gridVehicle';
import publicApi from '@/src/services/publicApi';
import ReactPaginate from 'react-paginate';
import Filter from '@/components/filter';
import { scroller } from "react-scroll";
import Cars from '@/src/type/cars';

const itensForPages = 9

export default function Stock() {
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [sectionPage, setSectionPage] = useState<Cars[]>([]);
    const [totalPaginas, setTotalPaginas] = useState<number>(0)

    useEffect(() => {
        publicApi.get(`cars-page/9/${(paginaAtual - 1) * itensForPages}`)
            .then((res) => setSectionPage(res.data))
            .catch(() => {
                console.log("Acesso negado! Redirecionando...");
            });
    }, [paginaAtual]);

    useEffect(() => {
        publicApi.get("/cars-count/")
            .then((res) => {
                const count = res.data
                setTotalPaginas(Math.ceil(count / itensForPages))
            })
            .catch(() => {
                console.log("Acesso negado! Redirecionando...");
            });
    }, []);

    const mudarPagina = (event: { selected: number }) => {
        setPaginaAtual(event.selected + 1);
        scroller.scrollTo("filters", {
            duration: 1500,
            smooth: true,
            offset: 0,
        });
    };

    return <div className="min-h-screen bg-stone-900">
        <div className='container min-h-screen mx-auto  flex flex-col'>
            <div className='md:flex h-full bg-stone-700'>
                <Filter className='h-full w-full md:w-1/4 p-5 filters'>
                    <h1 className='text-2xl flex items-baseline font-bold text-white'>Stock </h1>
                </Filter>
                <div className='gridVeiculos h-full w-full md:w-3/4 p-5'>
                    <div className={'max-w-full flex items-center justify-center '}>
                        {sectionPage ? <GridVehicle items={sectionPage} /> : <h1 className='text-2xl flex items-baseline font-bold text-white'>Stock </h1>}
                    </div>
                    <ReactPaginate
                        previousLabel={"Anterior"}
                        nextLabel={"Próximo"}
                        breakLabel={"..."}
                        pageCount={totalPaginas}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        onPageChange={mudarPagina}
                        containerClassName="mt-5 w-full flex items-center justify-center flex gap-2"
                        pageClassName="px-3 py-2 border not-sm:hidden rounded-full min-w-10 cursor-pointer select-none hover:bg-secondary hover:text-white transition"
                        activeClassName="bg-secondary text-white"
                        previousClassName="px-4 py-2 border  rounded-full cursor-pointer select-none hover:bg-gray-200 transition"
                        nextClassName="px-4 py-2 border rounded-full cursor-pointer select-none hover:bg-gray-200 transition"
                        breakClassName="px-3 py-2 not-sm:hidden"
                        disabledClassName="opacity-50 cursor-not-allowed"
                    />
                </div>
            </div>
        </div>
    </div>
};

