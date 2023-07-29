import { useParams } from "react-router-dom";

import SurveyForm from "../../components/organisms/SurveyForm";

const EditSurvey = () => {
   const { id } = useParams();

   return <SurveyForm title="Edit Survey" method="put" id={id} />;
};

export default EditSurvey;
