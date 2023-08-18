type OptionsType = {
    uuid: string;
    text: string;
};

type QuestionDataType = {
    options: Array<OptionsType> | [];
};

type QuestionListType =
    | "text"
    | "checkbox"
    | "select"
    | "radio"
    | "textarea";

type QuestionType = {
    id: number | string;
    type: QuestionListType;
    question: string;
    description: string;
    data: QuestionDataType;
};

type Survey = {
    id: number;
    image_url: string;
    title: string;
    slug: string;
    status: boolean;
    description: string;
    created_at: Date;
    updated_at: Date;
    expire_date: Date | string;
    questions: Array<QuestionType>;
};

type SurveyType = Partial<Survey> & {
    image?: globalThis.File | string;
};

type LinkType = {
    active: boolean;
    label: string;
    url: string;
};

type MetaType = {
    current_page: number;
    from: number;
    last_page: number;
    to: number;
    total: number;
    per_page: number;
    links: Array<LinkType>;
};

type Answer = {
    id: string;
    survey_id: string;
    question_id: string;
    answer: string;
    start_date: string;
    end_date: string;
};

type FetchQuestionType = Array<
    Partial<QuestionType> & {
        answers: Array<Answer>;
    }
>;
