import { PlusIcon } from "@heroicons/react/24/outline";
import { v4 as uuidv4 } from "uuid";

import QuestionEditor from "../organisms/QuestionEditor";

import { useSurveyHook } from "../../contexts/SurveyContext";

const SurveyQuestions = () => {
   const {
      state: { questions },
      setQuestion,
   } = useSurveyHook();

   const addQuestion = (e: React.MouseEvent<HTMLElement>, index?: number) => {
      e.preventDefault();

      const question: QuestionType = {
         id: uuidv4(),
         type: "text",
         question: "",
         description: "",
         data: { options: [] },
      };

      setQuestion({ question, index });
   };

   return (
      <>
         <div className="flex justify-between">
            <h3 className="text-2xl font-bold">Questions</h3>
            <button
               type="button"
               className="flex items-center text-sm py-1 px-4 rounded-sm text-white bg-gray-600 hover:bg-gray-700"
               onClick={(e) => addQuestion(e)}
            >
               <PlusIcon className="w-4 mr-2" />
               Add question
            </button>
         </div>
         {questions!.length ? (
            questions!.map((q, ind) => (
               <QuestionEditor
                  key={q.id}
                  index={ind}
                  question={q}
                  addQuestion={addQuestion}
               />
            ))
         ) : (
            <p className="text-gray-400 text-center py-4">
               You don't have any questions created
            </p>
         )}
      </>
   );
};

export default SurveyQuestions;
