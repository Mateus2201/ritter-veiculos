'use client'

import React, { useEffect, useState } from "react";
import SwiperImages from "../swiper-images";
import InformationCar from "../information-car";
import Optionals from "../optionals";
import publicApi from "@/src/services/publicApi";
import Car from "@/src/type/cars";

type CardInformationCarProps = {
  id: string;
};

export default function CardInformationCar({ id }: CardInformationCarProps) {
  const [car, setCar] = useState<Car>();

  useEffect(() => {
    publicApi.get('cars/'.concat(id))
      .then((res) => setCar(res.data))
      .catch(() => {
        console.log("Acesso negado! Redirecionando...");
      });
  }, []);

  return <div className="container mx-auto p-4 ">
    {car && <div className='xl:w-4/10 lg:p-5 pt-5'>
      <div className='xl:flex mt-4 bg-white rounded-xl p-3'>
        <SwiperImages id={id} />
        <InformationCar id={id} Vehicle={car}/>
      </div>
      <Optionals Car={car} />
    </div>}
  </div>
}
