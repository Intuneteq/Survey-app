import { AxiosError } from "axios";
import { axiosClient } from "../../../api/axios";

export const registerUser = async (data: RegisterUser) => {
    try {
        const res = await axiosClient.post("/auth/register", data);

        return {
            user: res.data.user as User,
            token: res.data.token as string,
            error: "",
        };
    } catch (error: any) {
        const axiosError: AxiosError<ApiError> = error;

        return { error: axiosError, user: {}, token: "" };
    }
};