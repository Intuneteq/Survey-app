// import React from 'react'

import { TrashIcon } from "@heroicons/react/24/outline";
import { OptionsType, QuestionType } from "../../types/survey";
import { useState, useEffect } from "react";
import { useSurveyHook } from "../../contexts/SurveyContext";

type PropsType = { data: OptionsType; index: number; question: QuestionType };

const SelectBoxInput = ({ data, index, question }: PropsType) => {
   const [option, setOption] = useState({ ...data });

   const { updateQuestion } = useSurveyHook();

   const handleOptions = (): QuestionType => {
      const updatedOptions = question.data.options.map((op) => {
         if (op.uuid === option.uuid) {
            return { ...option };
         }

         return op;
      });

      question.data.options = updatedOptions;

      return question;
   };

   function deleteOption(op: OptionsType) {
      question.data.options = question.data.options.filter(
         (option) => option.uuid != op.uuid
      );
      updateQuestion(question);
   }

   useEffect(() => {
      updateQuestion(handleOptions());
   }, [option]);

   return (
      <div className="flex items-center mb-1">
         <span className="w-6 text-sm">{index + 1}.</span>

         <input
            type="text"
            value={option.text}
            onChange={(e) => setOption({ ...option, text: e.target.value })}
            className="w-full rounded-sm py-1 px-2 text-xs border border-gray-300 focus:border-indigo-500"
         />

         <button
            type="button"
            className="h-6 w-6 rounded-full flex items-center justify-center border border-transparent transition-colors hover:border-red-100"
            onClick={() => deleteOption(data)}
         >
            <TrashIcon className="w-3 h-3 text-red-500" />
         </button>
      </div>
   );
};

export default SelectBoxInput;
