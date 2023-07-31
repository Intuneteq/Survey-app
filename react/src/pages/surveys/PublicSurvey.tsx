import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import getSurvey from "../../utils/surveys";

import PublicQuestions from "../../components/molecules/PublicQuestions";

import { QuestionType, SurveyType } from "../../types/survey";
import { axiosClient } from "../../api/axios";

const PublicSurvey = () => {
   const [survey, setSurvey] = useState<SurveyType>({ questions: [] });
   const [surveyFinished, setSurveyFinished] = useState(false);
   const [loading, setLoading] = useState<boolean>(false);
   let answers: Record<number, any> = {};

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
   

   function answerChanged(question: QuestionType, value: string | string[]) {
      answers[question.id as number] = value;
   }

   const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
      ev.preventDefault();
      console.log("submitted", answers);

      try {
         await axiosClient.post(`/answers/surveys/${survey.id}`, {answers});
         setSurveyFinished(true);
      } catch (error: any) {
         console.log(error);
      }
   };

   if (loading) {
      return <div className="flex justify-center">....loading</div>;
   } else {
      return surveyFinished ? (
         <div className="py-8 px-6 bg-emerald-500 text-white w-[600px] mx-auto">
            Thank you for participating in the survey
         </div>
      ) : (
         
         <form
            onSubmit={(ev) => onSubmit(ev)}
            className="container mx-auto p-4"
         >
            <div className="grid grid-cols-6">
               <div className="mr-4">
                  <img src={survey.image_url ?? ""} alt="" />
               </div>

               <div className="col-span-5">
                  <h1 className="text-3xl mb-3">{survey.title}</h1>
                  <p className="text-gray-500 text-sm mb-3">
                     Expire Date: {survey.expire_date as string}
                  </p>
                  <p className="text-gray-500 text-sm mb-3">
                     {survey.description}
                  </p>
               </div>
            </div>

            <div>
               {survey.questions?.map((question, index) => (
                  <PublicQuestions
                     key={question.id}
                     question={question}
                     index={index}
                     answerChanged={(val) => answerChanged(question, val)}
                  />
               ))}
            </div>
            <button
               type="submit"
               className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
               Submit
            </button>
         </form>
      );
   }
};

export default PublicSurvey;
