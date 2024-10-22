import axiosInstance from "@/lib/axiosInstance";

const getRoomById = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/rooms/${id}`);
    console.log(data);
    
    return data.data;
  } catch (error) {
    console.error("Error fetching room:", error);
    return null;
  }
};

export default getRoomById;
