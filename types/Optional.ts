import OptionalCategory from "./OptionalCategory";

type Optional = {
  idOptional: number;
  name: string;
  idOptionalType: number;
  idVehicleType: number;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  OptionalType: OptionalCategory;
};

export default Optional;
