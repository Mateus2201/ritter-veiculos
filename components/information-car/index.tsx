import Vehicles from '@/types/Vehicle';
import { Armchair, CalendarCheck2, ClipboardList, Factory, Fuel, Gauge, HandHelping, Joystick, PaintbrushVertical } from 'lucide-react';
import FormatNumber from '@/components/format/formatNumber';

type InformationCarProps = {
    id?: string;
    Vehicle: Vehicles;
}

export default function InformationCar({ Vehicle }: InformationCarProps) {

    return Vehicle && <div className='xl:w-4/10 lg:p-5 pt-5'>
        <div className='flex items-baseline'>
            <h1 className="text-5xl font-bold m-2">{Vehicle?.model}  </h1>
            <h2 className="text-3xl font-bold m-2">{Vehicle?.engine}</h2>
        </div>
        <h1 className='text-3xl font-bold '> </h1>
        <p className="text-gray-600 m-2">{Vehicle?.notes}</p>
        <h1 className="lg:text-3xl  text-4xl font-bold m-2">{Vehicle.priceDisplay ? FormatNumber.formatPrice(Vehicle.price) : ('R$ ').concat(Vehicle.price.toString().replace(/./g, "*"))}</h1>
        <p className=" m-2 flex items-center gap-2"><ClipboardList />  {FormatNumber.formatPlate(Vehicle.licensePlate, Vehicle.licensePlateDisplay)} </p>
        <p className=" m-2 flex items-center gap-2"><HandHelping /> {Vehicle?.allowsProposal} </p>
        <p className=" m-2 flex items-center gap-2"><Fuel /> {Vehicle?.fuel} </p>
        {/* <p className=" m-2 flex items-center gap-2"><CarFront /> {  car?.modelo} </p> */}
        <p className=" m-2 flex items-center gap-2"><Joystick /> {Vehicle?.engine} </p>
        <p className=" m-2 flex items-center gap-2"><Armchair /> {Vehicle?.seatCount} </p>
        <p className=" m-2 flex items-center gap-2"><Gauge /> {Vehicle?.mileage} </p>
        <p className=" m-2 flex items-center gap-2"><Factory /> {Vehicle?.Manufacturer.name} </p>
        <p className=" m-2 flex items-center gap-2"><CalendarCheck2 /> {Vehicle?.manufacturingYear} / {Vehicle?.modelYear} </p>
        <p className=" m-2 flex items-center gap-2"><PaintbrushVertical /> {Vehicle?.Color.description} </p>
    </div>
}