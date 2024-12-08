import axios from "axios";
import { getAuthToken } from "./api";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export interface AddPhoneInput {
  phone: string;
}

export interface VerifyPhoneInput {
  code: string;
}

export interface AddAddressInput {
  street: string;
  city: string;
  province: string;
  postal: string;
  country: string;
  token: string;
}

export interface AddCardInput {
  code: string;
  token: string;
}

export interface AddIdDocsInput {
  formData: FormData;
  token: string;
}

export interface AddSelfieInput {
  formData: FormData;
  token: string;
}

const addPhone = async ({ phone }: AddPhoneInput) => {
  try {
    const { data } = await api
      .patch(
        "/auth/addPhone",
        {
          phone,
        },
        {
          headers: {
            Authorization: `Bearer ${await getAuthToken()}`,
          },
        }
      )
      .catch((error) => {
        throw error.response.data.message;
      });

    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};

const verifyPhone = async ({ code }: VerifyPhoneInput) => {
  try {
    const { data } = await api
      .patch(
        "/auth/verifyPhone",
        {
          code,
        },
        {
          headers: {
            Authorization: `Bearer ${await getAuthToken()}`,
          },
        }
      )
      .catch((error) => {
        throw error.response.data.message;
      });

    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};

const addAddress = async ({
  street,
  city,
  province,
  postal,
  country,
  token,
}: AddAddressInput) => {
  try {
    const { data } = await api
      .patch(
        "/auth/addAddress",
        {
          street,
          city,
          province,
          postal,
          country,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((error) => {
        throw error.response.data.message;
      });

    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};

const addCard = async ({ code, token }: AddCardInput) => {
  try {
    const { data } = await api
      .patch(
        "/auth/addCard",
        {
          token: code,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((error) => {
        throw error.response.data.message;
      });

    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};

const addIdDocs = async ({ formData, token }: AddIdDocsInput) => {
  try {
    const { data } = await api
      .patch("/auth/verifyId", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
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

const addSelfie = async ({ formData, token }: AddSelfieInput) => {
  try {
    const { data } = await api
      .patch("/auth/uploadSelfie", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
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

export const auth = {
  addPhone: addPhone,
  verifyPhone: verifyPhone,
  addAddress: addAddress,
  addCard: addCard,
  addIdDocs: addIdDocs,
  addSelfie: addSelfie,
};
