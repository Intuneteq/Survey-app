import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import getSurvey from "../../utils/surveys";
import { SurveyType } from "../../types/survey";

const PublicSurvey = () => {
   const [survey, setSurvey] = useState<SurveyType>({});
   const [loading, setLoading] = useState<boolean>(false);

   const { slug } = useParams();

   useEffect(() => {
      const call = async () => {
         const survey = (await getSurvey({
            url: `/surveys/slugs/${slug}`,
            setLoading,
            id: slug,
         })) as SurveyType;
         setSurvey(survey);
      };

      call();
   }, []);

   return <div>PublicSurvey</div>;
};

export default PublicSurvey;
