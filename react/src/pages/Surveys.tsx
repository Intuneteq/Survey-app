import PageComponent from "../components/organisms/PageComponent";
import { useAppHook } from "../contexts/AppContext";

const Surveys = () => {
    const { surveys } = useAppHook();
    console.log(surveys);
    
    return (
        <PageComponent title="Surveys">
            {/* {surveys.map(survey)} */}
        </PageComponent>
    );
};

export default Surveys;
