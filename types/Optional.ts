import OptionalCategory from "./OptionalCategory";

type Optional = {
  idOptional: number;
  description: string;
  idOptionalType: number;
  idVehicleType: number;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  OptionalType: OptionalCategory;
};

export default Optional;
