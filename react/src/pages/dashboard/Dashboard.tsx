import { useEffect, useState } from "react";
import { EyeIcon, PencilIcon } from "@heroicons/react/24/outline";

import TButton from "../../components/atoms/TButton";
import PageComponent from "../../components/organisms/PageComponent";
import DashboardCard from "../../components/molecules/DashboardCard";

import { axiosClient } from "../../api/axios";
import { DashboardDataType } from "../../types/user";
import SurveySkeleton from "../../components/skeletons/SurveySkeleton";

const Dashboard = () => {
   const [loading, setLoading] = useState(false);
   const [data, setData] = useState<Partial<DashboardDataType>>({});

   useEffect(() => {
      setLoading(true);

      const getData = async () => {
         try {
            const res = await axiosClient.get("/users/dashboard");
            setData(res.data);
         } catch (error) {
            console.log(error);
         }
         setLoading(false);
      };

      getData();
   }, []);

   const loadingContent = (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
         {[...Array(3).keys()].map((i) => {
            return <SurveySkeleton key={i} />;
         })}
      </div>
   );

   return (
      <PageComponent title="Dashboard">
         {loading && loadingContent}
         {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-gray-700">
               <DashboardCard
                  title="Total Surveys"
                  className="order-1 lg:order-2"
                  style={{ animationDelay: '0.1s' }}
               >
                  <div className="text-8xl pb-4 font-semibold flex-1 flex items-center justify-center">
                     {data.totalSurveys}
                  </div>
               </DashboardCard>
               <DashboardCard
                  title="Total Answers"
                  className="order-2 lg:order-4"
                  style={{ animationDelay: '0.2s' }}
               >
                  <div className="text-8xl pb-4 font-semibold flex-1 flex items-center justify-center">
                     {data.totalAnswers}
                  </div>
               </DashboardCard>
               <DashboardCard
                  title="Latest Survey"
                  className="order-3 lg:order-1 row-span-2"
                  style={{ animationDelay: '0.2s' }}
               >
                  <>
                     {data.latestSurveys && (
                        <div>
                           <img
                              src={data.latestSurveys.image_url}
                              className="w-[240px] mx-auto"
                           />
                           <h3 className="font-bold text-xl mb-3">
                              {data.latestSurveys.title}
                           </h3>
                           <div className="flex justify-between text-sm mb-1">
                              <div>Create Date:</div>
                              <div>{data.latestSurveys.created_at}</div>
                           </div>
                           <div className="flex justify-between text-sm mb-1">
                              <div>Expire Date:</div>
                              <div>{data.latestSurveys.expire_date}</div>
                           </div>
                           <div className="flex justify-between text-sm mb-1">
                              <div>Status:</div>
                              <div>
                                 {data.latestSurveys.status
                                    ? "Active"
                                    : "Draft"}
                              </div>
                           </div>
                           <div className="flex justify-between text-sm mb-1">
                              <div>Questions:</div>
                              <div>{data.latestSurveys.questions}</div>
                           </div>
                           <div className="flex justify-between text-sm mb-3">
                              <div>Answers:</div>
                              <div>{data.latestSurveys.answers}</div>
                           </div>
                           <div className="flex justify-between">
                              <TButton
                                 to={`/surveys/${data.latestSurveys.id}/edit`}
                                 link
                              >
                                 <PencilIcon className="w-5 h-5 mr-2" />
                                 Edit Survey
                              </TButton>

                              <TButton link>
                                 <EyeIcon className="w-5 h-5 mr-2" />
                                 View Answers
                              </TButton>
                           </div>
                        </div>
                     )}
                     {!data.latestSurveys && (
                        <div className="text-gray-600 text-center py-16">
                           Your don't have surveys yet
                        </div>
                     )}
                  </>
               </DashboardCard>
               <DashboardCard
                  title="Latest Answers"
                  className="order-4 lg:order-3 row-span-2"
                  style={{ animationDelay: '0.3s' }}
               >
                  <>
                     {data.latestAnswers?.length && (
                        <div className="text-left">
                           {data.latestAnswers.map((answer) => (
                              <a
                                 href="#"
                                 key={answer.id}
                                 className="block p-2 hover:bg-gray-100/90"
                              >
                                 <div className="font-semibold">
                                    {answer.survey.title}
                                 </div>
                                 <small>
                                    Answer Made at:
                                    <i className="font-semibold">
                                       {answer.end_date}
                                    </i>
                                 </small>
                              </a>
                           ))}
                        </div>
                     )}
                     {!data.latestAnswers?.length && (
                        <div className="text-gray-600 text-center py-16">
                           Your don't have answers yet
                        </div>
                     )}
                  </>
               </DashboardCard>
            </div>
         )}
      </PageComponent>
   );
};

export default Dashboard;
