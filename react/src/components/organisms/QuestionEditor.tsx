import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

import {
   OptionsType,
   QuestionListType,
   QuestionType,
} from "../../types/survey";

import SelectBoxInput from "../atoms/SelectBoxInput";

import { useSurveyHook } from "../../contexts/SurveyContext";
import { useAppHook } from "../../contexts/AppContext";

type PropTypes = {
   index: number;
   question: QuestionType;
   addQuestion: (e: React.MouseEvent<HTMLElement>, index?: number) => void;
};

const QuestionEditor = ({ index = 0, question, addQuestion }: PropTypes) => {
   const [model, setModel] = useState<QuestionType>({ ...question });

   const { questionsType } = useAppHook();
   const { deleteQuestion, updateQuestion } = useSurveyHook();

   useEffect(() => {
      updateQuestion(model);
   }, [model]);

   function upperCaseFirst(str: QuestionListType) {
      return str.charAt(0).toUpperCase() + str.slice(1);
   }

   function onTypeChange(e: React.ChangeEvent<HTMLSelectElement>) {
      const type = e.target.value as QuestionListType;

      const newModel = { ...model, type };

      if (shouldHaveOptions(type)) {
         if (newModel.data.options.length) {
            setModel(newModel);
            return;
         }

         const options: OptionsType[] = [];

         options.push({
            uuid: uuidv4(),
            text: "",
         });

         newModel.data = { options };
      }

      setModel(newModel);
   }

   function shouldHaveOptions(type = model.type) {
      return ["select", "radio", "checkbox"].includes(type);
   }

   function addOptions() {
      const newOption = {
         uuid: uuidv4(),
         text: "",
      };

      setModel({
         ...model,
         data: { options: [...model.data.options, newOption] },
      });
   }

   return (
      <>
         <div>
            <div className="flex justify-between mb-2">
               <h4>
                  {index + 1} {model.question}
               </h4>
               <div className="flex items-center">
                  <button
                     type="button"
                     className="flex items-center text-xs py-1 px-2 mr-2 rounded-sm text-white bg-gray-600 hover:bg-gray-700"
                     onClick={(e) => addQuestion(e, index + 1)}
                  >
                     <PlusIcon className="w-4" />
                     add
                  </button>
                  <button
                     type="button"
                     className="flex items-center text-xs py-1 px-3 rounded-sm border border-transparent text-red-500 hover:border-red-600 font-semibold"
                     onClick={() => deleteQuestion(question)}
                  >
                     <TrashIcon className="w-4" />
                     Delete
                  </button>
               </div>
            </div>
            <div className="flex gap-3 justify-between mb-3">
               {/* Question Text */}
               <div className="flex-1">
                  <label
                     htmlFor="question"
                     className="block text-sm font-medium text-gray-700"
                  >
                     Question
                  </label>
                  <input
                     type="text"
                     name="question"
                     id="question"
                     value={model.question}
                     onChange={(e) => {
                        setModel({ ...model, question: e.target.value });
                     }}
                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
               </div>
               {/* Question Text */}

               {/* Question Type */}
               <div>
                  <label
                     htmlFor="questionType"
                     className="block text-sm font-medium text-gray-700 w-40"
                  >
                     QuestionType
                  </label>
                  <select
                     name="questionType"
                     id="questionType"
                     value={model.type}
                     onChange={(e) => onTypeChange(e)}
                     className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  >
                     {questionsType.map((type) => (
                        <option value={type} key={type}>
                           {upperCaseFirst(type)}
                        </option>
                     ))}
                  </select>
               </div>
            </div>
            {/* Question Type */}

            {/* Description */}
            <div className="mb-3">
               <label
                  htmlFor="questionDescription"
                  className="block text-sm font-medium text-gray-700"
               >
                  Description
               </label>
               <textarea
                  name="questionDescription"
                  id="questionDescription"
                  value={model.description}
                  onChange={(e) =>
                     setModel({ ...model, description: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
               ></textarea>
            </div>
            {/* Description */}

            {/* Question Type options */}
            <div>
               {shouldHaveOptions() && (
                  <div>
                     <h4 className="text-sm font-semibold mb-1 flex justify-between items-center ">
                        Options
                        <button
                           type="button"
                           onClick={addOptions}
                           className="flex items-center text-xs py-1 px-2 rounded-sm text-white bg-gray-600 hover:bg-gray-700"
                        >
                           Add
                        </button>
                     </h4>
                     {!model.data.options.length ? (
                        <div className="text-xs text-gray-600 text-center py-3">
                           You don't have any options defined
                        </div>
                     ) : (
                        <div>
                           {model.data.options.map((data, ind) => (
                              <SelectBoxInput
                                 key={data.uuid}
                                 data={data}
                                 index={ind}
                                 question={model}
                              />
                           ))}
                        </div>
                     )}
                  </div>
               )}
            </div>

            {/* Question Type options */}
         </div>
         <hr />
      </>
   );
};

export default QuestionEditor;
