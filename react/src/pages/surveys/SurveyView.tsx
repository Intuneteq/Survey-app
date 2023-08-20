import useSWR from "swr";
import { useParams } from "react-router-dom";

import { getQuestions, getSurvey } from "./lib";
import { testJSON } from "../../utils/reuables";

const SurveyView = () => {
   const { id } = useParams();

   const {
      isLoading: surveyLoading,
      data: survey,
      error: surveyError,
   } = useSWR(`${id}`, getSurvey);

   const {
      isLoading: questionsLoading,
      data: questions,
      error: questionsError,
   } = useSWR(`questions/surveys/${id}`, getQuestions);

   let content;
   if (surveyLoading || questionsLoading) {
      content = <p>loading....</p>;
   } else if (surveyError || questionsError) {
      throw new Error();
   } else if (!survey || !questions) {
      throw new Error();
   } else {
      content = (
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

   return content;
};

export default SurveyView;
