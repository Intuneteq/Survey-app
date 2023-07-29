import { SurveyType } from './survey'

export type SurveyDashboardType = {
    id: number;
    image_url: string;
    title: string;
    slug: string,
    status: boolean,
    created_at: string,
    expire_date: string,
    questions: number,
    answers: number
}

export type SurveyAnswerType = {
    id: number,
    survey: SurveyType,
    end_date: string;
}

export type DashboardDataType = {
    totalSurveys: number;
    latestSurveys: SurveyDashboardType;
    totalAnswers: number;
    latestAnswers: Array<SurveyAnswerType>;
}