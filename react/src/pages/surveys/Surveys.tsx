import { useEffect, useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

import TButton, { Colors } from "../../components/atoms/TButton";
import SurveyListItem from "../../components/molecules/SurveyListItem";
import PageComponent from "../../components/organisms/PageComponent";
import PaginationLinks from "../../components/organisms/PaginationLinks";

import { useAppHook } from "../../contexts/AppContext";
import { LinkType, MetaType, Survey } from "../../types/survey";

import getSurveys from "../../utils/surveys";

const Surveys = () => {
    const { surveys, setSurvey } = useAppHook();

    const [loading, setLoading] = useState(false);
    const [meta, setMeta] = useState<MetaType>({
        current_page: 1,
        to: 1,
        from: 1,
        total: 1,
        last_page: 1,
        per_page: 1,
        links: [],
    });

    const onDeleteClick = () => {
        console.log("survey delete");
    };

    const onPageClick = (link: LinkType) => {
        getSurveys({ url: link.url, setLoading, setMeta, setSurvey });
    };

    useEffect(() => {
        getSurveys({ url: undefined, setLoading, setMeta, setSurvey });
    }, []);

    const loadingContent = <p className="text-center text-lg">loading...</p>;

    const content = (
        <>
            {!surveys.length ? (
                <p> You have no surveys yet</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                        {surveys.map((survey: Survey) => (
                            <SurveyListItem
                                key={survey.id}
                                survey={survey}
                                onDeleteClick={onDeleteClick}
                            />
                        ))}
                    </div>
                    {surveys.length > 0 && (
                        <PaginationLinks
                            meta={meta}
                            onPageClick={onPageClick}
                        />
                    )}
                </>
            )}
        </>
    );

    const createBtn = (
        <TButton color={Colors.GREEN} to="/surveys/create">
            <PlusCircleIcon className="h-6 w-6 mr-2" />
            Create new
        </TButton>
    );

    return (
        <PageComponent title="Surveys" buttons={createBtn}>
            {loading ? loadingContent : content}
        </PageComponent>
    );
};

export default Surveys;
