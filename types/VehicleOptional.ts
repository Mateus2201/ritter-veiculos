import Optional from "./optional";

type VehicleOptional = {
  idVehicleOptional: number;
  idVehicle: number;
  idOptional: number;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  optional: Optional;
};

export default VehicleOptional;