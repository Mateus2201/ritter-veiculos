import { StaticImageData } from "next/image";

type Vehicle = {
  id: number;
  name: string;
  description: string;
  image: StaticImageData;
  value: string;
  km: string;
  typeOil: string;
  transmission: string;
  year: string;
};

export default Vehicle;
