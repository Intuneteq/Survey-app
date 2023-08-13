import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios, { CancelToken } from "axios";

import { FetchQuestionType, SurveyType } from "../../types/survey";
import { axiosClient } from "../../api/axios";

const SurveyView = () => {
   const [loading, setLoading] = useState(false);
   const [survey, setSurvey] = useState<SurveyType>({});
   const [questions, setQuestions] = useState<FetchQuestionType>([]);
   const { id } = useParams();

   const getSurvey = async (token: CancelToken) => {
      try {
         const res = await axiosClient.get(`/surveys/${id}`, {
            cancelToken: token,
         });
         return res.data;
      } catch (error) {
         console.log(error);
      }
   };

   const getQuestions = async (token: CancelToken) => {
      try {
         const res = await axiosClient.get(`/questions/surveys/${id}`, {
            cancelToken: token,
         });
         return res.data;
      } catch (error) {
         console.log(error);
      }
   };

   function testJSON(text: any) {
      if (typeof text !== "string") {
         return false;
      }
      try {
         JSON.parse(text);
         return true;
      } catch (error) {
         return false;
      }
   }

   useEffect(() => {
      setLoading(true);

      let source = axios.CancelToken.source();

      const fetch = async () => {
         const [sur, question] = await Promise.all([
            getSurvey(source.token),
            getQuestions(source.token),
         ]);

         setSurvey(sur.data as SurveyType);
         setQuestions(question.data);
      };

      fetch();

      setLoading(false);

      return () => {
         source.cancel();
      };
   }, []);

   const loadingContent = <p>Loading...</p>;

   const content = (
      <>
         <div className="mt-1 flex items-center">
            <img
               className="w-48 h-48 object-cover"
               src={survey?.image_url}
               alt="img"
            />
         </div>
         <h3>{survey?.title}</h3>
         <p>{survey?.description}</p>
         <h4>Questions</h4>
         <div>
            {questions?.map((question) => (
               <div key={question.id}>
                  {question.answers.map((answer) => (
                     <div key={answer.id}>
                        <p>
                           {testJSON(answer.answer)
                              ? JSON.parse(answer.answer)
                              : answer.answer}
                        </p>
                     </div>
                  ))}
               </div>
            ))}
         </div>
      </>
   );

   return loading ? loadingContent : content;
};

export default SurveyView;
