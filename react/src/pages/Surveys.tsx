import SurveyListItem from "../components/molecules/SurveyListItem";
import PageComponent from "../components/organisms/PageComponent";
import { Survey, useAppHook } from "../contexts/AppContext";

const Surveys = () => {
    const { surveys } = useAppHook();

    const onDeleteClick = () => {
        console.log("survey delete");
    };

    return (
        <PageComponent title="Surveys">
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
