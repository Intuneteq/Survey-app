import { useState } from "react";
import { useParams } from "react-router-dom";

import SurveyForm from "../../components/organisms/SurveyForm";

import { CreateSurveyType } from "../../types/survey";

const EditSurvey = () => {
    const { id } = useParams();

    const [survey, setSurvey] = useState<CreateSurveyType>({
        title: "",
        slug: "",
        status: false,
        description: "",
        image: "",
        image_url: "",
        expire_date: "",
        questions: [],
    });

    return (
        <SurveyForm
            title="Edit Survey"
            method="put"
            survey={survey}
            setSurvey={setSurvey}
            id={id}
        />
    );
};

export default EditSurvey;
