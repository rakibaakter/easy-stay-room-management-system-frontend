import axiosInstance from "@/lib/axiosInstance";

const getLoggedInUser = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/users/${id}`);

    return data.data;
  } catch (error) {
    console.error("Error fetching room:", error);
    return null;
  }
};

export default getLoggedInUser;