import { useState } from "react";

import { CreateSurveyType } from "../../types/survey";

import SurveyForm from "../../components/organisms/SurveyForm";

const CreateSurvey = () => {
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
            title="Create Survey"
            method="post"
            survey={survey}
            setSurvey={setSurvey}
        />
    );
};

export default CreateSurvey;
