"use client";

import React, { useEffect, useState } from 'react';
import GridVehicle from '@/components/grid-vehicle';
import publicApi from '@/src/services/publicApi';
import ReactPaginate from 'react-paginate';
import Filter from '@/components/filter';
import { scroller } from "react-scroll";
import Cars from '@/src/type/cars';

const itensForPages = 9

export default function ClassisPage() {
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

