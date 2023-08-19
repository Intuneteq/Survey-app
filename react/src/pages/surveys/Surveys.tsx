import useSWR from "swr";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

import TButton, { Colors } from "../../components/atoms/TButton";
import SurveyListItem from "../../components/molecules/SurveyListItem";
import PageComponent from "../../components/organisms/PageComponent";
import PaginationLinks from "../../components/organisms/PaginationLinks";
import SurveySkeleton from "../../components/skeletons/SurveySkeleton";

import {
   getSurveys,
   surveyUrlEndpoint as cacheKey,
   deleteSurvey as onDeleteClick,
   onPageClick,
} from "./lib";

const Surveys = () => {
   const { isLoading, error, data } = useSWR(cacheKey, getSurveys);

   if (isLoading) {
      return (
         <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {[...Array(6).keys()].map((i) => {
               return <SurveySkeleton key={i} />;
            })}
         </div>
      );
   } else if (error) {
      throw new Error(error.message);
   } else if (!data) {
      throw new Error("No data from the server");
   }

   const content = (
      <>
         {!data.surveys.length ? (
            <p className="py-8 text-center text-gray-700">
               {" "}
               You have no surveys yet
            </p>
         ) : (
            <>
               <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                  {data.surveys.map((survey: Survey) => (
                     <SurveyListItem
                        key={survey.id}
                        survey={survey}
                        onDeleteClick={onDeleteClick}
                     />
                  ))}
               </div>
               {data.surveys.length > 0 && (
                  <PaginationLinks meta={data.meta} onPageClick={onPageClick} />
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
         {content}
      </PageComponent>
   );
};

export default Surveys;
