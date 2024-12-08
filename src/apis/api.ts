import axios from "axios";
import { auth } from "./auth";
import { chat } from "./chat";
import { user } from "./user";
import { createClient } from "@/utils/supabase/client";

const getAuthToken = async () => {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    return session.access_token;
  }
};

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const API = {
  auth: auth,
  user: user,
  chat: chat,
};

export { axiosInstance, getAuthToken };
export default API;
