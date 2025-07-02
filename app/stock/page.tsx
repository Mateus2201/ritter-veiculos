"use client";

import React, { useEffect, useMemo, useState } from "react";
import publicApi from "@/lib/publicApi";
import ReactPaginate from "react-paginate";
import Filter from "@/components/filter";
import { scroller } from "react-scroll";
import Vehicle from "@/types/Vehicle";
import Loading from "@/components/loading";
import SwiperImages from "@/components/swiper-images";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    ClipboardList,
    Calendar1,
    Fuel,
    Gauge,
    Loader,
} from "lucide-react";

const itensForPages = 9;

export default function StockPage() {
    const [offset, setPageConfig] = useState<number>(0);
    const [items, setItems] = useState<Vehicle[]>([]);
    const [countCarsTotal, setCountCarsTotal] = useState<number>();
    const [loading, setLoading] = useState<boolean>(true);
    const [loader, setLoader] = useState<number | null>(null);

    useEffect(() => {
        publicApi
            .get(`/cars-stock/9/${offset}`)
            .then((res) => {
                setItems(res.data.cars);
                setCountCarsTotal(res.data.count ?? 0);
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

    return (
        <div className="min-h-screen bg-gray-300">
            <div className="container mx-auto flex flex-col xl:flex-row gap-4 p-4">
                <div className="w-full xl:w-1/4">
                    <div id="filters">
                        <Filter className="w-full p-5 rounded-lg bg-white">
                            <h1 className="text-3xl font-bold text-background">Estoque</h1>
                        </Filter>
                    </div>
                </div>

                <div className="w-full xl:w-3/4">
                    {loading ? (
                        <Loading />
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {items.map((vehicle) => (
                                <div
                                    key={vehicle.idVehicle}
                                    className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-lg hover:shadow-2xl transition-transform hover:-translate-y-1 flex flex-col"
                                >
                                    <div className="h-60 w-full relative">
                                        <SwiperImages id={vehicle.idVehicle} />
                                        {!!vehicle.sold && (
                                            <Badge className="absolute top-4 left-4 bg-red-600 text-white">
                                                Vendido
                                            </Badge>
                                        )}
                                        {!!vehicle.featured && !vehicle.sold && (
                                            <Badge className="absolute top-4 left-4 bg-green-600 text-white">
                                                Destaque
                                            </Badge>
                                        )}
                                    </div>

                                    <div className="p-5 flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-center mb-3">
                                                <h2 className="text-xl font-bold text-gray-800">
                                                    {vehicle.model}
                                                </h2>
                                                <p className="text-lg font-semibold text-indigo-600">
                                                    {vehicle.priceDisplay && vehicle.price > 0
                                                        ? `R$ ${vehicle.price.toLocaleString("pt-BR")}`
                                                        : "Sob consulta"}
                                                </p>
                                            </div>

                                            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                                                <p className="flex items-center gap-1">
                                                    <ClipboardList className="w-4 h-4" />
                                                    {vehicle.licensePlateDisplay
                                                        ? vehicle.licensePlate
                                                        : "Placa oculta"}
                                                </p>
                                                <p className="flex items-center gap-1">
                                                    <Calendar1 className="w-4 h-4" />
                                                    {vehicle.modelYear}/{vehicle.manufacturingYear}
                                                </p>
                                                <p className="flex items-center gap-1">
                                                    <Fuel className="w-4 h-4" />
                                                    {vehicle.fuel}
                                                </p>
                                                <p className="flex items-center gap-1">
                                                    <Gauge className="w-4 h-4" />
                                                    {vehicle.mileage.toLocaleString("pt-BR")} km
                                                </p>
                                            </div>

                                            <div className="flex flex-wrap gap-2">
                                                {!!vehicle.armored && (
                                                    <Badge className="bg-yellow-400 text-black">Blindado</Badge>
                                                )}
                                                {!!vehicle.allowsTrade && (
                                                    <Badge className="bg-blue-600 text-white">Aceita troca</Badge>
                                                )}
                                                {!!vehicle.allowsProposal && (
                                                    <Badge className="bg-purple-600 text-white">Aceita proposta</Badge>
                                                )}
                                            </div>
                                        </div>

                                        <div className="pt-5">
                                            <Link href={`/car/${vehicle.idVehicle}`}>
                                                <Button
                                                    onClick={() => setLoader(vehicle.idVehicle)}
                                                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                                                >
                                                    {loader === vehicle.idVehicle ? (
                                                        <Loader className="animate-spin h-5 w-5" />
                                                    ) : (
                                                        <span>Ver Mais</span>
                                                    )}
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {typeof countCarsTotal === "number" && countCarsTotal > 9 && (
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
                            previousClassName="select-none items-center hover:bg-secondary hover:text-offWhite border-white rounded-md p-2"
                            nextClassName="select-none items-center hover:bg-secondary hover:text-offWhite border-white rounded-md p-2"
                            pageClassName="select-none items-center not-md:hidden hover:bg-secondary hover:text-offWhite border-white rounded-md p-2"
                            breakClassName="select-none items-center not-md:hidden hover:bg-secondary hover:text-offWhite border-white rounded-md p-2"
                            disabledClassName="select-none items-center not-md:hidden hover:bg-secondary hover:text-offWhite border-white rounded-md p-2"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}