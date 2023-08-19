import { AxiosError } from "axios";
import { axiosClient } from "../../../api/axios";

export default async function getSurveys(url?: string) {
    try {
        const res = await axiosClient.get(url ?? "/surveys");

        return {
            surveys: res.data.data as Survey[],
            meta: res.data.meta as MetaType,
            error: "",
        };
    } catch (error: any) {
        const axiosError: AxiosError<ApiError> = error;

        return { error: axiosError, surveys: [], meta: "" };
    }
}
