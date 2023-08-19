import { useEffect, useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

import TButton, { Colors } from "../../components/atoms/TButton";
import SurveyListItem from "../../components/molecules/SurveyListItem";
import PageComponent from "../../components/organisms/PageComponent";
import PaginationLinks from "../../components/organisms/PaginationLinks";
import SurveySkeleton from "../../components/skeletons/SurveySkeleton";

import { useAppHook } from "../../contexts/AppContext";

import getSurveys from "../../utils/surveys";
import { axiosClient } from "../../api/axios";

const Surveys = () => {
   const { surveys, setSurvey, showNotification } = useAppHook();

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

   const onDeleteClick = async (id: number) => {
      if (window.confirm("Are you sure yo want to delete this survey")) {
         try {
            await axiosClient.delete(`surveys/${id}`);
            getSurveys({ url: undefined, setLoading, setMeta, setSurvey });
            showNotification("The survey was deleted");
         } catch (error) {
            console.log(error);
         }
      }
   };

   const onPageClick = (link: LinkType) => {
      getSurveys({ url: link.url, setLoading, setMeta, setSurvey });
   };

   useEffect(() => {
      getSurveys({ url: undefined, setLoading, setMeta, setSurvey });
   }, []);

   const loadingContent = (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
         {[...Array(6).keys()].map((i) => {
            return <SurveySkeleton key={i} />;
         })}
      </div>
   );

   const content = (
      <>
         {!surveys.length ? (
            <p className="py-8 text-center text-gray-700">
               {" "}
               You have no surveys yet
            </p>
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
                  <PaginationLinks meta={meta} onPageClick={onPageClick} />
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
