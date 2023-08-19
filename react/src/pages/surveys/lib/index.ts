import { axiosClient } from "../../../api/axios";

export const surveyUrlEndpoint = "/surveys";

export async function getSurveys(url?: string) {
    const res = await axiosClient.get(url ?? "/surveys");

    return {
        surveys: res.data.data as Survey[],
        meta: res.data.meta as MetaType,
    };
}

export async function deleteSurvey(
    id: number,
    showNotification: (message: string) => void
) {
    if (window.confirm("Are you sure yo want to delete this survey")) {
        await axiosClient.delete(`surveys/${id}`);
        showNotification("Survey was deleted");
    }
}

export async function onPageClick(link: LinkType) {
    return await getSurveys(link.url);
}

export async function getSurvey(id: string): Promise<SurveyType> {
    try {
        const res = await axiosClient.get(`/surveys/${id}`);
        return res.data;
    } catch (error: any) {
        console.log(error);
        throw new Error(error.response.data.message);
    }
}

export async function getQuestions(id: string): Promise<FetchQuestionType> {
    try {
        const res = await axiosClient.get(`/${id}`);
        return res.data.data;
    } catch (error: any) {
        console.log(error);
        throw new Error(error.response.data.message);
    }
}
