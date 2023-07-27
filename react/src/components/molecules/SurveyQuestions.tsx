import { PlusIcon } from "@heroicons/react/24/outline";
import { v4 as uuidv4 } from "uuid";

import QuestionEditor from "./QuestionEditor";

import { CreateSurveyType, QuestionType } from "../../types/survey";

type PropsType = {
    survey: CreateSurveyType;
    setSurvey: React.Dispatch<React.SetStateAction<CreateSurveyType>>;
};

const SurveyQuestions = ({ survey, setSurvey }: PropsType) => {
    const addQuestion = (e: React.MouseEvent<HTMLElement>, index?: number) => {
        e.preventDefault();

        const question: QuestionType = {
            id: uuidv4(),
            type: "text",
            question: "",
            description: "",
            data: { options: [] },
        };

        if (index) {
            setSurvey((prev) => ({
                ...prev,
                questions: [
                    ...prev.questions!.slice(0, index),
                    question,
                    ...prev.questions!.slice(index),
                ],
            }));
        } else {
            setSurvey((prev) => ({
                ...prev,
                questions: [...prev.questions!, question],
            }));
        }
    };

    const questionChange = (question: QuestionType) => {
        if (!question) return;

        const newQuestions = survey.questions?.map((q) => {
            if (q.id == question.id) {
                return { ...question };
            }
            return q;
        });
        setSurvey({ ...survey, questions: newQuestions });
    };

    const deleteQuestion = (question: QuestionType) => {
        console.log(question);

        const newQuestions = survey.questions?.filter(
            (q) => q.id !== question.id
        );

        setSurvey({ ...survey, questions: newQuestions });
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
            {survey.questions!.length ? (
                survey.questions!.map((q, ind) => (
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
