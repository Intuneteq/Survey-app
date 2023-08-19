import { axiosClient } from "../api/axios";
import { CancelToken } from "axios";

type ChildrenType = {
    url: string | undefined;
    setLoading: (value: React.SetStateAction<boolean>) => void;
    token?: CancelToken;
    setSurvey?: (surveys: Survey[]) => void;
    setMeta?: (value: React.SetStateAction<MetaType>) => void;
    id?: string;
};

export default async ({
    url = "/surveys",
    setLoading,
    setMeta,
    setSurvey,
    id,
    token,
}: ChildrenType): Promise<SurveyType | void> => {
    setLoading(true);
    try {
        const res = await axiosClient.get(url, { cancelToken: token });

        if (setSurvey) {
            setSurvey(res.data.data);
        }

        if (setMeta) {
            setMeta(res.data.meta);
        }

        if (id) {
            setLoading(false);
            return res.data.data;
        }
    } catch (error) {
        console.log(error);
    }
    setLoading(false);
};
