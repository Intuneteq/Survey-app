export type OptionsType = {
    uuid: string;
    text: string;
}

export type QuestionDataType = {
    options: Array<OptionsType> | []
}

export type QuestionListType = "select" | "text" | "checkbox" | "select" | "radio" | "textarea";

export type QuestionType = {
    id: number;
    type: QuestionListType;
    question: string;
    description: string;
    data: QuestionDataType,
}

export type Survey = {
    id: number;
    image_url: string;
    title: string;
    slug: string;
    status: boolean;
    description: string;
    created_at: Date;
    updated_at: Date;
    expire_date: Date | string;
    questions: Array<QuestionType>
};

export type CreateSurveyType = Partial<Survey> & {
    image: globalThis.File | string;
};
