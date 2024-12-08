import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export interface MyChatsInput {
  page: number;
  limit: number;
  token: string;
}

const getMyChats = async ({ page, limit, token }: MyChatsInput) => {
  try {
    const { data } = await api
      .get("/chat/my-chats", {
        params: {
          page,
          limit,
        },
        headers: {
          Authorization: `Bearer ${token}`,
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

export const chat = {
  getMyChats: getMyChats,
};
