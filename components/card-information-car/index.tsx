'use client'

import React, { useEffect, useState } from "react";
import SwiperImages from "../swiper-images";
import InformationCar from "../information-car";
import Optionals from "../optionals";
import publicApi from "@/lib/publicApi";
import Vehicle from '@/types/Vehicle';

type CardInformationCarProps = {
  id: string;
};

export default function CardInformationCar({ id }: CardInformationCarProps) {
  const [useVehicle, setVehicle] = useState<Vehicle>();

  useEffect(() => {
    publicApi.get('cars/'.concat(id))
      .then((res) => setVehicle(res.data))
      .catch(() => {
        console.log("Acesso negado! Redirecionando...");
      });
  }, []);

  return <div className="container mx-auto p-4 ">
    {useVehicle && <div className='xl:w-4/10 lg:p-5 pt-5'>
      <div className='xl:flex mt-4 bg-white rounded-xl p-3'>
        <SwiperImages id={useVehicle.idVehicle} />
        <InformationCar Vehicle={useVehicle}/>
      </div>
      <Optionals Vehicle={useVehicle} />
    </div>}
  </div>
}
