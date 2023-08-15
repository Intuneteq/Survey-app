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

   function showAnswer(data: string, index: number) {
      const parsed = JSON.parse(data);

      if (Array.isArray(parsed)) {
         return (
            <>
               <p>
                  {index}: {parsed}
               </p>
            </>
         );
      } else {
         return <p>{parsed}</p>;
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
      <div className="p-4">
         <div className="mt-1 flex items-end justify-center gap-3">
            <img
               className="w-48 h-48 object-cover"
               src={survey?.image_url}
               alt="img"
            />
            <section>
               <h3 className="text-2xl">
                  <b>Title:</b> {survey?.title}
               </h3>
               <p className="text-xl">
                  <b>Description:</b> {survey?.description}
               </p>
            </section>
         </div>
         <h4 className="text-3xl mt-20 mb-5 font-bold">Questions</h4>
         <>
            {questions?.map((question) => (
               <div className="mb-2" key={question.id}>
                  <article>
                     <h6>Title: {question.question}</h6>
                     <p>Description: {question.description}</p>
                     <h6 className="font-semibold">Answers</h6>
                  </article>
                  {question.answers.map((answer, index) => (
                     <div key={answer.id}>
                        {testJSON(answer.answer) ? (
                           showAnswer(answer.answer, index + 1)
                        ) : (
                           <p>
                              {index + 1}: {answer.answer}
                           </p>
                        )}
                     </div>
                  ))}
               </div>
            ))}
         </>
      </div>
   );

   return loading ? loadingContent : content;
};

export default SurveyView;
