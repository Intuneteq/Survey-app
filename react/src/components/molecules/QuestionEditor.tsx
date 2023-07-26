import { useEffect, useState } from "react";

import { useAppHook } from "../../contexts/AppContext";

import { QuestionListType, QuestionType } from "../../types/survey";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

type PropTypes = {
    index: number;
    question: QuestionType;
    questionChange: (question: QuestionType) => void;
    addQuestion: (index?: number) => void;
    deleteQuestion: (question: QuestionType) => void;
};

const QuestionEditor = ({
    index = 0,
    question,
    questionChange,
    addQuestion,
    deleteQuestion,
}: PropTypes) => {
    const [model, setModel] = useState<QuestionType>({ ...question });

    const { questionsType } = useAppHook();

    useEffect(() => {
        questionChange(model);
    }, [model]);

    function upperCaseFirst(str: QuestionListType) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function onTypeChange() {
        console.log("change type");
    }

    return (
        <div>
            <div className="flex justify-between mb-2">
                <h4>
                    {index + 1} {model.question}
                </h4>
                <div className="flex items-center">
                    <button
                        type="button"
                        className="flex items-center text-xs py-1 px-2 mr-2 rounded-sm text-white bg-gray-600 hover:bg-gray-700"
                        onClick={() => addQuestion(index + 1)}
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
                        onChange={(e) =>
                            setModel({ ...model, question: e.target.value })
                        }
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
                        onChange={onTypeChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    >
                        {questionsType.map((type) => (
                            <option
                                value={type}
                                key={type}
                            >
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
        </div>
    );
};

export default QuestionEditor;
