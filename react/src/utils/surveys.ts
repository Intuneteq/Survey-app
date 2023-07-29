import { axiosClient } from "../api/axios";
import { SurveyType, MetaType, Survey } from "../types/survey";

type ChildrenType = {
    url: string | undefined;
    setLoading: (value: React.SetStateAction<boolean>) => void;
    setSurvey?: (surveys: Survey[]) => void;
    setMeta?: (value: React.SetStateAction<MetaType>) => void;
    id?: string;
};

export default async ({
    url = "/surveys",
    setLoading,
    setMeta,
    setSurvey,
    id
}: ChildrenType): Promise<SurveyType | void> => {
    setLoading(true);
    try {
        const res = await axiosClient.get(url);

        if (setSurvey) {
            setSurvey(res.data.data);
        }

        if (setMeta) {
            setMeta(res.data.meta);
        }

        if(id) {
            setLoading(false);
            return res.data.data
        }
    } catch (error) {
        console.log(error);
    }
    setLoading(false);
};
