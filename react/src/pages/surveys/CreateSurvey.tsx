import { ChangeEvent, FormEvent, useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import TButton from "../../components/atoms/TButton";
import PageComponent from "../../components/organisms/PageComponent";
import SurveyQuestions from "../../components/molecules/SurveyQuestions";

import { useAppHook } from "../../contexts/AppContext";
import { ApiError, axiosClient } from "../../api/axios";
import showError from "../../utils/errors";

import { CreateSurveyType } from "../../types/survey";
import { ErrorObj } from "../../types/auth";

const CreateSurvey = () => {
    const navigate = useNavigate();
    const { setSurvey: updateSurvey } = useAppHook();

    const [error, setError] = useState<ErrorObj>({ __html: "" });

    const [survey, setSurvey] = useState<CreateSurveyType>({
        title: "",
        slug: "",
        status: false,
        description: "",
        image: "",
        image_url: "",
        expire_date: "",
        questions: [],
    });

    const onImageChoose = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];

        const reader = new FileReader();

        reader.onload = () => {
            setSurvey({
                ...survey,
                image: file,
                image_url: reader.result as string,
            });
        };

        e.target.value = "";

        reader.readAsDataURL(file);
    };

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError({ __html: "" });

        const data = { ...survey };

        if (data.image) {
            data.image = data.image_url as string;
        }

        delete data.image_url;

        try {
            const { data: res } = await axiosClient.post("/surveys", data);

            updateSurvey(res);
            navigate("/surveys");
        } catch (error: any) {
            const axiosError: AxiosError<ApiError> = error;

            if (axiosError.response) {
                setError(showError(axiosError.response));
            }

            console.log(error);
        }
    };

    return (
        <PageComponent title="Create Survey">
            <form action="#" method="POST" onSubmit={(e) => onSubmit(e)}>
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
                                {survey.image_url && (
                                    <img
                                        src={survey.image_url}
                                        alt=""
                                        className="w-32 h-32 object-cover"
                                    />
                                )}
                                {!survey.image_url && (
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
                                onChange={(ev) =>
                                    setSurvey({
                                        ...survey,
                                        title: ev.target.value,
                                    })
                                }
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
                            {/* <pre>{ JSON.stringify(survey, undefined, 2) }</pre> */}
                            <textarea
                                name="description"
                                id="description"
                                value={survey.description || ""}
                                onChange={(ev) =>
                                    setSurvey({
                                        ...survey,
                                        description: ev.target.value,
                                    })
                                }
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
                                onChange={(ev) =>
                                    setSurvey({
                                        ...survey,
                                        expire_date: ev.target.value,
                                    })
                                }
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
                                    onChange={(ev) =>
                                        setSurvey({
                                            ...survey,
                                            status: ev.target.checked,
                                        })
                                    }
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label
                                    htmlFor="comments"
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

                        <SurveyQuestions
                            survey={survey}
                            setSurvey={setSurvey}
                        />
                    </div>
                    <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                        <TButton>Save</TButton>
                    </div>
                </div>
            </form>
        </PageComponent>
    );
};

export default CreateSurvey;
