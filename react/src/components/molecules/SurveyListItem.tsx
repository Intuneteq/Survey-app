import {
    ArrowTopRightOnSquareIcon,
    TrashIcon,
    PencilIcon,
} from "@heroicons/react/24/outline";

import TButton, { Colors } from "../atoms/TButton";

import { Survey } from "../../types/survey";

type PropsType = {
    survey: Survey;
    onDeleteClick: (id: number) => void;
};

const SurveyListItem = ({ survey, onDeleteClick }: PropsType) => {
    return (
        <div className="flex flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 h-[470px]">
            <img
                src={survey.image_url}
                alt={survey.title}
                className="w-full h-48 object-cover"
            />
            <h4 className="mt-4 text-lg font-bold">{survey.title}</h4>
            <div
                dangerouslySetInnerHTML={{ __html: survey.description }}
                className="overflow-hidden flex-1"
            ></div>

            <div className="flex justify-between items-center mt-3">
                <TButton to={`/surveys/${survey.id}/edit`}>
                    <PencilIcon className="w-5 h-5 mr-2" />
                    Edit
                </TButton>
                <TButton to={`/surveys/${survey.id}`}>
                <ArrowTopRightOnSquareIcon className="w-5 h-5 mr-2" />
                    View
                </TButton>
            </div>
            <div className="flex items-center">
                <TButton href={`/surveys/${survey.id}`} circle link>
                    <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                </TButton>

                {survey.id && (
                    <TButton
                        onClick={() => onDeleteClick(survey.id)}
                        circle
                        link
                        color={Colors.RED}
                    >
                        <TrashIcon className="w-5 h-5" />
                    </TButton>
                )}
            </div>
        </div>
    );
};

export default SurveyListItem;
