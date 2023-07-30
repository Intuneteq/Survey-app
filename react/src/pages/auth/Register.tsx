import { Link } from "react-router-dom";
import { FormEvent, useState } from "react";

import { ApiError, axiosClient } from "../../api/axios";
import { AxiosError } from "axios";
import { useAppHook } from "../../contexts/AppContext";

import { ErrorObj } from "../../types/auth";
import showError from "../../utils/errors";

const Register = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [error, setError] = useState<ErrorObj>({ __html: "" });

    const { setToken, setUser } = useAppHook();

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError({ __html: "" });

        const data = {
            name,
            email,
            password,
            password_confirmation: confirmPassword,
        };

        try {
            const { data: res } = await axiosClient.post("/auth/register", data);

            setUser(res.user);
            setToken(res.token);
        } catch (error: any) {
            const axiosError: AxiosError<ApiError> = error;

            if (axiosError.response) {
                setError(showError(axiosError.response));
            }

            console.log(error);
        }
    };

    return (
        <>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign up to your account
            </h2>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                {error.__html && (
                    <div
                        className="bg-red-500 rounded py-2 px-3 text-white"
                        dangerouslySetInnerHTML={error}
                    ></div>
                )}
                <form
                    onSubmit={onSubmit}
                    className="space-y-6"
                    action="#"
                    method="POST"
                >
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Full Name
                        </label>
                        <div className="mt-2">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="confirm_password"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Confirm Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="confirm_password"
                                name="confirm_password"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Already have an account?{" "}
                    <Link
                        to={"/login"}
                        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </>
    );
};

export default Register;
