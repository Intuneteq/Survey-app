import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { useSurveyHook } from "../../contexts/SurveyContext";
import { useParams } from "react-router-dom";

type PropTypes = { data: string; question: QuestionType };

const CheckboxInput = ({ data, question }: PropTypes) => {
   const [checked, setChecked] = useState(false);

   const { updateQuestion } = useSurveyHook();

   const { id } = useParams();

   const handleOptions = (): QuestionType => {
      // if check is true
      if (checked) {
         const newOption = {
            uuid: uuidv4(),
            text: data,
         };

         question.data.options = [...question.data.options, newOption];
      } else {
         question.data.options = question.data.options.filter(
            (item) => item.text !== data
         );
      }

      return question;
   };

   useEffect(() => {
      if (id) {
         question.data.options.forEach((item) => {
            if(item.text === data) {
               setChecked(true)
            }
         })
      }
   }, []);

   useEffect(() => {
      updateQuestion(handleOptions());
   }, [checked]);

   return (
      <div className="relative flex gap-x-3">
         <div className="flex h-6 items-center">
            <input
               id={data}
               name={data}
               type="checkbox"
               checked={checked}
               onChange={(e) => setChecked(e.target.checked)}
               className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
         </div>
         <div className="text-sm leading-6">
            <label htmlFor="radio" className="font-medium text-gray-900">
               {data}
            </label>
         </div>
      </div>
   );
};

export default CheckboxInput;
