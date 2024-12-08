import { axiosInstance, getAuthToken } from "./api";

const getUserProfile = async () => {
  try {
    const { data } = await axiosInstance
      .get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${await getAuthToken()}`,
        },
      })
      .catch((error) => {
        throw error.response.data.message;
      });

    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const user = {
  getUserProfile: getUserProfile,
};
