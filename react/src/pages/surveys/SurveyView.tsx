import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import getSurvey from "../../utils/surveys";
import { SurveyType } from "../../types/survey";

const SurveyView = () => {
   const [loading, setLoading] = useState(false);
   const [survey, setSurvey] = useState<SurveyType>({});
   const { id } = useParams();

   useEffect(() => {
      setLoading(true);

      let source = axios.CancelToken.source();

      const fetch = async () => {
         const res = await getSurvey({
            url: `/surveys/${id}`,
            setLoading,
            token: source.token,
            id,
         });

         setSurvey(res as SurveyType);
      };

      fetch();

      return () => {
         source.cancel();
      };
   }, []);

   const loadingContent = <p>Loading...</p>

   const content = <p>{JSON.stringify(survey)}</p>

   return loading ? loadingContent : content;
};

export default SurveyView;
