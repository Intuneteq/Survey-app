// import React from 'react'

import { OptionsType, QuestionType } from "../../types/survey";

type PropsType = {
   question: QuestionType;
   index: number;
   answerChanged: (val: string | string[]) => void;
};

const PublicQuestions = ({ question, index, answerChanged }: PropsType) => {
   let selectedOptions: Array<string> = [];

   function onCheckboxChange(
      option: OptionsType,
      e: React.ChangeEvent<HTMLInputElement>
   ) {
      e.preventDefault();

      if (e.target.checked) {
         selectedOptions.push(option.uuid);
      } else {
         selectedOptions.filter((op) => op !== option.uuid);
      }
      answerChanged(selectedOptions);
   }
   return (
      <>
         <fieldset className="mb-4">
            <div>
               <legend className="text-base font-medium text-gray-900">
                  {index}
               </legend>
               <p className="text-gray text-sm">{question.description}</p>
            </div>

            <div>
               {question.type === "select" && (
                  <div>
                     <select
                        onChange={(ev) => answerChanged(ev.target.value)}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                     >
                        <option value="">Please Select</option>
                        {question.data.options.map((option) => (
                           <option key={option.uuid} value={option.text}>
                              {option.text}
                           </option>
                        ))}
                     </select>
                  </div>
               )}

               {question.type === "radio" && (
                  <div>
                     {question.data.options.map((option) => (
                        <div key={option.uuid} className="flex items-center">
                           <input
                              id={option.uuid}
                              name={"question" + question.id}
                              value={option.text}
                              onChange={(ev) => answerChanged(ev.target.value)}
                              type="radio"
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                           />
                           <label
                              htmlFor={option.uuid}
                              className="ml-3 block text-sm font-medium text-gray-700"
                           >
                              {option.text}
                           </label>
                        </div>
                     ))}
                  </div>
               )}

               {question.type === "checkbox" && (
                  <div>
                     {question.data.options.map((option) => (
                        <div key={option.uuid} className="flex items-center">
                           <input
                              id={option.uuid}
                              onChange={(ev) => onCheckboxChange(option, ev)}
                              type="checkbox"
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                           />
                           <label
                              htmlFor={option.uuid}
                              className="ml-3 block text-sm font-medium text-gray-700"
                           >
                              {option.text}
                           </label>
                        </div>
                     ))}
                  </div>
               )}

               {question.type === "text" && (
                  <div>
                     <input
                        type="text"
                        onChange={(ev) => answerChanged(ev.target.value)}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                     />
                  </div>
               )}

               {question.type === "textarea" && (
                  <div>
                     <textarea
                        onChange={(ev) => answerChanged(ev.target.value)}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                     ></textarea>
                  </div>
               )}
            </div>
         </fieldset>
         <hr className="mb-4" />
      </>
   );
};

export default PublicQuestions;
