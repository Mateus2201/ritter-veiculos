import Optional from "./Optional";

type OptionalCategory = {
  idOptionalCategory: number;
  description: string;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date | null;
  updatedBy: string | null;
  Optional: Optional
};

export default OptionalCategory;
