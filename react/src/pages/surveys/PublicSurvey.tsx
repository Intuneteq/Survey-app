import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import getSurvey from "../../utils/surveys";

import PublicQuestions from "../../components/molecules/PublicQuestions";
import TButton from "../../components/atoms/TButton";

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
      setLoading(true);

      try {
         await axiosClient.post(`/answers/surveys/${survey.id}`, { answers });
         setSurveyFinished(true);
      } catch (error: any) {
         console.log(error);
      }

      setLoading(false);
   };

   return surveyFinished ? (
      <div className="w-screen h-screen flex justify-center items-center">
         <div className="py-8 px-6 bg-emerald-500 text-white w-[600px] mx-auto">
            <p className="text-center">
               Thank you for participating in the survey
            </p>
         </div>
      </div>
   ) : (
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
         <div className="shadow sm:overflow-hidden sm:rounded-md space-y-6 min-h-screen bg-white px-4 py-5 sm:p-6">
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
               <TButton loading={loading}>Submit</TButton>
            </form>
         </div>
      </div>
   );
   // }
};

export default PublicSurvey;
