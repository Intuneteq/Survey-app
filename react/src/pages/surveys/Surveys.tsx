import { PlusCircleIcon } from "@heroicons/react/24/outline";

import TButton, { Colors } from "../../components/atoms/TButton";
import SurveyListItem from "../../components/molecules/SurveyListItem";
import PageComponent from "../../components/organisms/PageComponent";

import { useAppHook } from "../../contexts/AppContext";
import { Survey } from "../../types/survey";
import { useEffect } from "react";
import { axiosClient } from "../../api/axios";

const Surveys = () => {
    const { surveys, setSurvey } = useAppHook();

    const onDeleteClick = () => {
        console.log("survey delete");
    };

    const createBtn = (
        <TButton color={Colors.GREEN} to="/surveys/create">
            <PlusCircleIcon className="h-6 w-6 mr-2" />
            Create new
        </TButton>
    );

    useEffect(() => {
        const getSurveys = async () => {
            try {
                const res = await axiosClient.get("/surveys");
                setSurvey(res.data.data)
            } catch (error) {
                console.log(error);
            }
        };
        getSurveys();
    }, []);

    return (
        <PageComponent title="Surveys" buttons={createBtn}>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                {surveys.map((survey: Survey) => (
                    <SurveyListItem
                        key={survey.id}
                        survey={survey}
                        onDeleteClick={onDeleteClick}
                    />
                ))}
            </div>
        </PageComponent>
    );
};

export default Surveys;
