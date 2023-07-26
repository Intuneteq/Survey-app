import { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { v4 as uuidv4 } from "uuid";

import QuestionEditor from "./QuestionEditor";

import { CreateSurveyType, QuestionType } from "../../types/survey";

type PropsType = {
    survey: CreateSurveyType;
    onSurveyUpdate: (survey: CreateSurveyType) => void;
};

const SurveyQuestions = ({ survey, onSurveyUpdate }: PropsType) => {
    const [model, setModel] = useState<CreateSurveyType>({ ...survey });

    const addQuestion = (index?: number) => {
        if (index) {
            setModel({
                ...model,
                questions: [
                    ...model.questions!.slice(0, index),
                    {
                        id: uuidv4(),
                        type: "text",
                        question: "",
                        description: "",
                        data: { options: [] },
                    },
                    ...model.questions!.slice(index),
                ],
            });
        } else {
            setModel({
                ...model,
                questions: [
                    ...model.questions!,
                    {
                        id: parseInt(uuidv4()),
                        type: "text",
                        question: "",
                        description: "",
                        data: { options: [] },
                    },
                ],
            });
        }
    };

    const questionChange = (question: QuestionType) => {
        if (!question) return;

        const newQuestions = model.questions?.map((q) => {
            if (q.id == question.id) {
                return { ...question };
            }
            return q;
        });
        setModel({ ...model, questions: newQuestions });
    };

    const deleteQuestion = (question: QuestionType) => {
        console.log(question);
        
        const newQuestions = model.questions?.filter(
            (q) => q.id !== question.id
        );

        setModel({ ...model, questions: newQuestions });
    };

    useEffect(() => {
        onSurveyUpdate(model);
    }, [model]);

    return (
        <>
            <div className="flex justify-between">
                <h3 className="text-2xl font-bold">Questions</h3>
                <button
                    type="button"
                    className="flex items-center text-sm py-1 px-4 rounded-sm text-white bg-gray-600 hover:bg-gray-700"
                    onClick={() => addQuestion()}
                >
                    <PlusIcon className="w-4 mr-2" />
                    Add question
                </button>
            </div>
            {model.questions!.length ? (
                model.questions!.map((q, ind) => (
                    <QuestionEditor
                        key={q.id}
                        index={ind}
                        question={q}
                        questionChange={questionChange}
                        addQuestion={addQuestion}
                        deleteQuestion={deleteQuestion}
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
