import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { useSurveyHook } from "../../contexts/SurveyContext";
import { useParams } from "react-router-dom";

type PropTypes = {
   data: string;
   question: QuestionType;
   radio: string;
   setRadio: React.Dispatch<React.SetStateAction<string>>;
};

const RadioInput = ({ data, question, radio, setRadio }: PropTypes) => {
   const { updateQuestion } = useSurveyHook();

   const { id } = useParams();

   const handleOptions = (): QuestionType => {
      const newOption = {
         uuid: uuidv4(),
         text: radio,
      };

      question.data.options = [newOption];

      return question;
   };

   useEffect(() => {
      if (id) {
         setRadio(question.data.options[0]?.text ?? "");
      }
   }, []);

   useEffect(() => {
      if (radio) {
         updateQuestion(handleOptions());
      }
   }, [radio]);

   return (
      <div className="flex items-center gap-x-3">
         <input
            id={data}
            name={data}
            type="radio"
            value={data}
            checked={radio === data}
            onChange={() => setRadio(data)}
            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
         />
         <label
            htmlFor={data}
            className="block text-sm font-medium leading-6 text-gray-900"
         >
            {data}
         </label>
      </div>
   );
};

export default RadioInput;
