import publicApi from "@/lib/api";
import VehicleImage from "@/types/VehicleImage";

export const useVehicleImage = () => {
  const getAllVehicleImage = async (id?: number) => {
    try {
      const response = await publicApi.get<{ images: VehicleImage[], fromCache: boolean }>(`/cars/${id}/images`);
      const { images, fromCache } = response.data;

      return (images as VehicleImage[]) || [];
    } catch (error) {
      console.error("Error fetching Vehicle:", error);
      throw error;
    }
  };

  return {
    getAllVehicleImage,
  };
};
