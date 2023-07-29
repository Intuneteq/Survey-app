// import React from 'react'

import { TrashIcon } from "@heroicons/react/24/outline";
import { OptionsType } from "../../types/survey";

type PropsType = { data: OptionsType; index: number };

const SelectBoxInput = ({ data, index }: PropsType) => {
   return (
      <div key={data.uuid} className="flex items-center mb-1">
         <span className="w-6 text-sm">{index + 1}.</span>

         <input
            type="text"
            value={data.text}
            // onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
            //     data.text = e.target.value;
            //     setModel({
            //         ...model,
            //     });
            // }}
            className="w-full rounded-sm py-1 px-2 text-xs border border-gray-300 focus:border-indigo-500"
         />

         <button
            type="button"
            className="h-6
                        w-6
                        rounded-full
                        flex
                        items-center
                        justify-center
                        border border-transparent
                        transition-colors
                        hover:border-red-100"
            // onClick={() => deleteOption(data)}
         >
            <TrashIcon className="w-3 h-3 text-red-500" />
         </button>
      </div>
   );
};

export default SelectBoxInput;
