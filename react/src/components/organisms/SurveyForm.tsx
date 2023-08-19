import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { LinkIcon, PhotoIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import PageComponent from "./PageComponent";
import SurveyQuestions from "../molecules/SurveyQuestions";
import TButton, { Colors } from "../atoms/TButton";

import { axiosClient } from "../../api/axios";

import showError from "../../utils/errors";
import getSurveys from "../../utils/surveys";

import { useAppHook } from "../../contexts/AppContext";
import { useSurveyHook } from "../../contexts/SurveyContext";
import FormSkeleton from "../skeletons/FormSkeleton";

type SurveyForm = {
   title: string;
   method: string;
   id?: string;
};

const SurveyForm = ({ title, method, id }: SurveyForm) => {
   const navigate = useNavigate();
   const { showNotification } = useAppHook();
   const {
      state: survey,
      setImage,
      setTitle,
      setDescription,
      setImageUrl,
      setExpireDate,
      setStatus,
      setSurvey,
      clearSurvey,
   } = useSurveyHook();

   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<ErrorObj>({ __html: "" });

   const onImageChoose = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files![0];

      const reader = new FileReader();

      reader.onload = () => {
         setImage(file);
         setImageUrl(reader.result as string);
      };

      e.target.value = "";

      reader.readAsDataURL(file);
   };

   const onDelete = () => {
      console.log("deleted");
   };

   const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError({ __html: "" });

      const data = { ...survey };
      console.log(data);

      if (data.image) {
         data.image = data.image_url as string;
      }

      delete data.image_url;

      try {
         if (id) {
            await axiosClient.put(`/surveys/${id}`, data);
            showNotification("The survey was updated");
         } else {
            await axiosClient.post("/surveys", data);
            showNotification("The survey was created");
         }
         clearSurvey();
         navigate("/surveys");
      } catch (error: any) {
         const axiosError: AxiosError<ApiError> = error;

         if (axiosError.response) {
            setError(showError(axiosError.response));
         }

         console.log(error);
      }
   };

   useEffect(() => {
      clearSurvey();

      if (id) {
         async function call() {
            const survey = (await getSurveys({
               url: `/surveys/${id}`,
               setLoading,
               id,
            })) as SurveyType;

            setSurvey(survey);
         }
         call();
      }
   }, []);

   const isLoading = <FormSkeleton />;

   const buttons = (
      <div className="flex gap-2">
         <TButton color={Colors.GREEN} href={`/surveys/public/${survey.slug}`}>
            <LinkIcon className="h-4 w-4 mr-2" />
            Public Link
         </TButton>
         <TButton color={Colors.RED} onClick={onDelete}>
            <TrashIcon className="h-4 w-4 mr-2" />
            Delete
         </TButton>
      </div>
   );

   const content = (
      <PageComponent title={title} buttons={buttons}>
         <form
            action="#"
            method={method.toUpperCase()}
            onSubmit={(e) => onSubmit(e)}
         >
            <div className="shadow sm:overflow-hidden sm:rounded-md">
               <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                  {/* error */}
                  {error.__html && (
                     <div
                        className="bg-red-500 text-white py-3 px-3"
                        dangerouslySetInnerHTML={error}
                     ></div>
                  )}
                  {/* error */}

                  {/*Image*/}
                  <div>
                     <label className="block text-sm font-medium text-gray-700">
                        Photo
                     </label>
                     <div className="mt-1 flex items-center">
                        {survey?.image_url && (
                           <img
                              src={survey.image_url}
                              alt=""
                              className="w-32 h-32 object-cover"
                           />
                        )}
                        {!survey?.image_url && (
                           <span className="flex justify-center  items-center text-gray-400 h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                              <PhotoIcon className="w-8 h-8" />
                           </span>
                        )}
                        <button
                           type="button"
                           className="relative ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                           <input
                              type="file"
                              // required
                              className="absolute left-0 top-0 right-0 bottom-0 opacity-0"
                              onChange={onImageChoose}
                           />
                           Change
                        </button>
                     </div>
                  </div>
                  {/*Image*/}

                  {/*Title*/}
                  <div className="col-span-6 sm:col-span-3">
                     <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                     >
                        Survey Title
                     </label>
                     <input
                        type="text"
                        name="title"
                        id="title"
                        required
                        value={survey.title}
                        onChange={(ev) => setTitle(ev.target.value)}
                        placeholder="Survey Title"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                     />
                  </div>
                  {/*Title*/}

                  {/*Description*/}
                  <div className="col-span-6 sm:col-span-3">
                     <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700"
                     >
                        Description
                     </label>
                     
                     <textarea
                        name="description"
                        id="description"
                        value={survey.description || ""}
                        onChange={(ev) => setDescription(ev.target.value)}
                        placeholder="Describe your survey"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                     ></textarea>
                  </div>
                  {/*Description*/}

                  {/*Expire Date*/}
                  <div className="col-span-6 sm:col-span-3">
                     <label
                        htmlFor="expire_date"
                        className="block text-sm font-medium text-gray-700"
                     >
                        Expire Date
                     </label>
                     <input
                        type="date"
                        name="expire_date"
                        id="expire_date"
                        required
                        value={survey.expire_date as string}
                        onChange={(ev) => setExpireDate(ev.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                     />
                  </div>
                  {/*Expire Date*/}

                  {/*Active*/}
                  <div className="flex items-start">
                     <div className="flex h-5 items-center">
                        <input
                           id="status"
                           name="status"
                           type="checkbox"
                           checked={survey.status}
                           onChange={(ev) => setStatus(ev.target.checked)}
                           className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                     </div>
                     <div className="ml-3 text-sm">
                        <label
                           htmlFor="status"
                           className="font-medium text-gray-700"
                        >
                           Active
                        </label>
                        <p className="text-gray-500">
                           Whether to make survey publicly available
                        </p>
                     </div>
                  </div>
                  {/*Active*/}

                  <SurveyQuestions />
               </div>
               <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <TButton>Save</TButton>
               </div>
            </div>
         </form>
      </PageComponent>
   );

   return loading ? isLoading : content;
};

export default SurveyForm;
