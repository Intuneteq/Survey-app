type SurveyDashboardType = {
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

type SurveyAnswerType = {
    id: number,
    survey: SurveyType,
    end_date: string;
}

type DashboardDataType = {
    totalSurveys: number;
    latestSurvey: SurveyDashboardType;
    totalAnswers: number;
    latestAnswers: Array<SurveyAnswerType>;
}