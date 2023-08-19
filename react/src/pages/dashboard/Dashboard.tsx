import useSWR from "swr";
import { EyeIcon, PencilIcon } from "@heroicons/react/24/outline";

import TButton from "../../components/atoms/TButton";
import PageComponent from "../../components/organisms/PageComponent";
import DashboardCard from "../../components/molecules/DashboardCard";
import DashboardSkeleton from "../../components/skeletons/DashboardSkeleton";

import { getDashboardData, dashboardEndpoint as cacheKey } from "./lib";


const Dashboard = () => {
   const { isLoading, error, data } = useSWR(cacheKey, getDashboardData);

   let content;
   if (isLoading) {
      content = <DashboardSkeleton />;
   } else if (error) {
      throw new Error(error.message);
   } else if (!data) {
      throw new Error('No data from Server')
   } else {
      content = (
         <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-gray-700">
               <DashboardCard
                  title="Total Surveys"
                  className="order-1 lg:order-2"
                  style={{ animationDelay: "0.1s" }}
               >
                  <div className="text-8xl pb-4 font-semibold flex-1 flex items-center justify-center">
                     {data.totalSurveys}
                  </div>
               </DashboardCard>
               <DashboardCard
                  title="Total Answers"
                  className="order-2 lg:order-4"
                  style={{ animationDelay: "0.2s" }}
               >
                  <div className="text-8xl pb-4 font-semibold flex-1 flex items-center justify-center">
                     {data.totalAnswers}
                  </div>
               </DashboardCard>
               <DashboardCard
                  title="Latest Survey"
                  className="order-3 lg:order-1 row-span-2"
                  style={{ animationDelay: "0.2s" }}
               >
                  <>
                     {data.latestSurvey && (
                        <div>
                           <img
                              src={data.latestSurvey.image_url}
                              className="w-[240px] mx-auto"
                           />
                           <h3 className="font-bold text-xl mb-3">
                              {data.latestSurvey.title}
                           </h3>
                           <div className="flex justify-between text-sm mb-1">
                              <div>Create Date:</div>
                              <div>{data.latestSurvey.created_at}</div>
                           </div>
                           <div className="flex justify-between text-sm mb-1">
                              <div>Expire Date:</div>
                              <div>{data.latestSurvey.expire_date}</div>
                           </div>
                           <div className="flex justify-between text-sm mb-1">
                              <div>Status:</div>
                              <div>
                                 {data.latestSurvey.status ? "Active" : "Draft"}
                              </div>
                           </div>
                           <div className="flex justify-between text-sm mb-1">
                              <div>Questions:</div>
                              <div>{data.latestSurvey.questions}</div>
                           </div>
                           <div className="flex justify-between text-sm mb-3">
                              <div>Answers:</div>
                              <div>{data.latestSurvey.answers}</div>
                           </div>
                           <div className="flex justify-between">
                              <TButton
                                 to={`/surveys/${data.latestSurvey.id}/edit`}
                                 link
                              >
                                 <PencilIcon className="w-5 h-5 mr-2" />
                                 Edit Survey
                              </TButton>

                              <TButton
                                 link
                                 to={`/surveys/${data.latestSurvey.id}`}
                              >
                                 <EyeIcon className="w-5 h-5 mr-2" />
                                 View Answers
                              </TButton>
                           </div>
                        </div>
                     )}
                     {!data.latestSurvey && (
                        <div className="text-gray-600 text-center py-16">
                           Your don't have surveys yet
                        </div>
                     )}
                  </>
               </DashboardCard>
               <DashboardCard
                  title="Latest Answers"
                  className="order-4 lg:order-3 row-span-2"
                  style={{ animationDelay: "0.3s" }}
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
         </>
      );
   }

   return <PageComponent title="Dashboard">{content}</PageComponent>;
};

export default Dashboard;
