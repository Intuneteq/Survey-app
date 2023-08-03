import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";

import { ApiError, axiosClient } from "../../api/axios";
import { useAppHook } from "../../contexts/AppContext";
import { ErrorObj } from "../../types/auth";
import showError from "../../utils/errors";
import FormLayout from "../../components/templates/FormLayout";

const Login = () => {
   const [email, setEmail] = useState<string>("");
   const [password, setPassword] = useState<string>("");
   const [error, setError] = useState<ErrorObj>({ __html: "" });

   const { setToken, setUser } = useAppHook();

   const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError({ __html: "" });

      const data = { email, password };

      try {
         const { data: res } = await axiosClient.post("/auth/login", data);

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

   async function oauthLogin(provider: string) {
      console.log(provider);

      try {
         const res = await axiosClient.get("/auth/redirect");

         window.location.href = res.data;
      } catch (error) {
         console.log(error);
      }
   }

   return (
      <FormLayout title="Sign in to your account">
         {error.__html && (
            <div
               className="bg-red-500 rounded py-2 px-3 text-white"
               dangerouslySetInnerHTML={error}
            ></div>
         )}
         <form
            onSubmit={onSubmit}
            className="space-y-6 bg-white p-10 shadow-lg rounded-lg w-full"
            action="#"
            method="POST"
         >
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
                     autoComplete="email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
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
                  <div className="text-sm">
                     <a
                        href="#"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                     >
                        Forgot password?
                     </a>
                  </div>
               </div>
               <div className="mt-2">
                  <input
                     id="password"
                     name="password"
                     type="password"
                     autoComplete="current-password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     required
                     className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
               </div>
            </div>
            <div className="flex items-center justify-between">
               <div className="flex items-center">
                  <input
                     id="remember-me"
                     name="remember-me"
                     type="checkbox"
                     className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                     htmlFor="remember-me"
                     className="ml-2 block text-sm text-gray-900"
                  >
                     Remember me
                  </label>
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

            <div className="flex justify-between items-center">
               <hr className="bg-gray-500 w-24" />
               <p className="text-dark text-gray-900">Or continue with</p>
               <hr className="bg-gray-500 w-24" />
            </div>

            <div className="flex items-center justify-between gap-4">
               <button
                  className="w-3/6 h-10 text-slate-900 font-semibold rounded-md bg-gray-100 hover:bg-slate-300 flex items-center justify-center gap-2"
                  type="button"
                  onClick={() => oauthLogin("google")}
               >
                  <img
                     className="w-4 h-4"
                     src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                     alt="google"
                  />
                  Google
               </button>
               <button
                  className="w-3/6 h-10 text-white font-semibold rounded-md bg-slate-950 hover:bg-slate-600 flex items-center justify-center gap-2"
                  type="button"
                  onClick={() => oauthLogin("github")}
               >
                  <img
                     className="w-6 h-6 rounded-md"
                     src="https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_1280.png"
                     alt="github"
                  />
                  Github
               </button>
            </div>
         </form>

         <p className="mt-10 text-center text-sm text-gray-500">
            You don't have an account?{" "}
            <Link
               to={"/register"}
               className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
               Sign up for free
            </Link>
         </p>
      </FormLayout>
   );
};

export default Login;
