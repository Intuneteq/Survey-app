import PageComponent from "../organisms/PageComponent";
import Skeleton from "./Skeleton";

const FormSkeleton = () => {
   return (
      <PageComponent title="Edit survey">
         <div className="shadow sm:overflow-hidden sm:rounded-md">
            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
               <Skeleton classes="w-32 h-32" />
               <Skeleton classes="title border-red-500 border-solid" />
               <Skeleton classes="w-full h-12 border-red-500 border-solid" />
               <Skeleton classes="title border-red-500 border-solid" />
               <Skeleton classes="w-16 h-8" />
               <div className="flex justify-between items-center">
                  <Skeleton classes="w-1/3 h-8" />
                  <Skeleton classes="w-24 h-8" />
               </div>
               <Skeleton classes="w-1/3 h-4" />
               <Skeleton classes="title border-red-500 border-solid" />
               <Skeleton classes="w-1/3 h-4" />
               <Skeleton classes="title border-red-500 border-solid" />
               <Skeleton classes="w-1/3 h-4" />
               <Skeleton classes="title border-red-500 border-solid" />
               <Skeleton classes="w-1/3 h-4" />
               <Skeleton classes="title border-red-500 border-solid" />
            </div>
         </div>
      </PageComponent>
   );
};

export default FormSkeleton;
