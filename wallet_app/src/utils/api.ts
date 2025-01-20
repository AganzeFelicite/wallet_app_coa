import axios, { AxiosResponse } from "axios";
import { useAuth } from "../auth/context/AuthContext";
export interface Account {
  id: number;
  name: string;
  balance: string;
  account_type: string;
}

export const fetchAccounts = async (): Promise<Account[]> => {
  const { authToken } = useAuth();
  try {
    const response: AxiosResponse<Account[]> = await axios.get(
      "http://127.0.0.1:8000/api/wallet/accounts/",
      {
        headers: {
          Authorization: `JWT ${authToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching accounts:", error);
    throw error;
  }
};
