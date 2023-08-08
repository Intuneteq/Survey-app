import { useEffect, useState } from "react";
import { PencilIcon } from "@heroicons/react/24/outline";

import { useAppHook } from "../contexts/AppContext";
import { capitalizeFLetter } from "../utils/reuables";

import FormSkeleton from "../components/skeletons/FormSkeleton";
import TButton, { Colors } from "../components/atoms/TButton";

export default function Profile() {
   const { user } = useAppHook();

   const [loading, setLoading] = useState(false);
   const [email, setEmail] = useState(user.email);
   const [name, setName] = useState(user.name);
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [showInput, setshowInput] = useState({ index: 0, state: false });

   const submitProfile = (index: number) => {
      console.log(index);
      setshowInput({ index, state: false });
   };

   const handleChangePassword = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
   };

   useEffect(() => {
      setLoading(true);

      if (user.name) {
         setLoading(false);
      }
   }, [user]);

   const isLoading = <FormSkeleton />;

   return loading ? (
      isLoading
   ) : (
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 ">
         <div className="shadow sm:overflow-hidden sm:rounded-md space-y-6 bg-white px-4 py-5 sm:p-6">
            <div className="px-4 sm:px-0">
               <h3 className="leading-7 text-gray-900 text-2xl font-bold">
                  Your Profile
               </h3>
               <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                  Personal details and update.
               </p>
            </div>
            <div className="mt-6 border-t border-gray-100">
               <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                     <dt className="text-sm font-medium leading-6 text-gray-900">
                        Full name
                     </dt>
                     {showInput.index === 0 && showInput.state ? (
                        <>
                           <div className="sm:col-span-2 sm:mt-0">
                              <input
                                 id="name"
                                 name="name"
                                 value={name}
                                 onChange={(e) => setName(e.target.value)}
                                 type="text"
                                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              />
                           </div>
                           <div className="leading-6 mt-1 flex gap-2">
                              <TButton
                                 color={Colors.GREEN}
                                 onClick={() => submitProfile(0)}
                              >
                                 Submit
                              </TButton>
                              <TButton
                                 color={Colors.RED}
                                 onClick={() =>
                                    setshowInput({ index: 0, state: false })
                                 }
                              >
                                 Cancel
                              </TButton>
                           </div>
                        </>
                     ) : (
                        <>
                           <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                              {capitalizeFLetter(user.name)}
                           </dd>
                           <div className="leading-6 mt-1">
                              <TButton
                                 onClick={() =>
                                    setshowInput({ index: 0, state: true })
                                 }
                              >
                                 <PencilIcon className="w-5 h-5 mr-2" />
                                 Edit
                              </TButton>
                           </div>
                        </>
                     )}
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                     <dt className="text-sm font-medium leading-6 text-gray-900">
                        Email address
                     </dt>
                     {showInput.index === 1 && showInput.state ? (
                        <>
                           <div className="sm:col-span-2 sm:mt-0">
                              <input
                                 id="email"
                                 name="email"
                                 value={email}
                                 onChange={(e) => setEmail(e.target.value)}
                                 type="text"
                                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              />
                           </div>
                           <div className="leading-6 mt-1 flex gap-2">
                              <TButton
                                 color={Colors.GREEN}
                                 onClick={() => submitProfile(1)}
                              >
                                 Submit
                              </TButton>
                              <TButton
                                 color={Colors.RED}
                                 onClick={() =>
                                    setshowInput({ index: 1, state: false })
                                 }
                              >
                                 Cancel
                              </TButton>
                           </div>
                        </>
                     ) : (
                        <>
                           <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                              {capitalizeFLetter(user.email)}
                           </dd>
                           <div className="leading-6 mt-1">
                              <TButton
                                 onClick={() =>
                                    setshowInput({ index: 1, state: true })
                                 }
                              >
                                 <PencilIcon className="w-5 h-5 mr-2" />
                                 Edit
                              </TButton>
                           </div>
                        </>
                     )}
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                     <dt className="text-sm font-medium leading-6 text-gray-900">
                        About
                     </dt>
                     {showInput.index === 2 && showInput.state ? (
                        <>
                           <div className="sm:col-span-2 sm:mt-0">
                              <input
                                 value={name}
                                 // onChange={(e) => handleFormChange(e, item.title)}
                                 type="text"
                                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              />
                           </div>
                           <div className="leading-6 mt-1">
                              <TButton
                                 color={Colors.GREEN}
                                 onClick={() => submitProfile(2)}
                              >
                                 Submit
                              </TButton>
                           </div>
                        </>
                     ) : (
                        <>
                           <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                              Fugiat ipsum ipsum deserunt culpa aute sint do
                              nostrud anim incididunt cillum culpa consequat.
                              Excepteur quiipsum aliquip consequat sint. Sit id
                              mollit nulla mollit nostrud in ea officia
                              proident. Irure nostrud pariatur mollit ad
                              adipisicing reprehenderit deserunt qui eu.
                           </dd>
                           <div className="leading-6 mt-1">
                              <TButton>
                                 <PencilIcon className="w-5 h-5 mr-2" />
                                 Edit
                              </TButton>
                           </div>
                        </>
                     )}
                  </div>
               </dl>
            </div>
         </div>

         <div className="mt-5 shadow sm:overflow-hidden sm:rounded-md space-y-6 bg-white px-4 py-5 sm:p-6">
            <h3 className="text-2xl font-bold">Change Password</h3>
            <form
               onSubmit={(e) => handleChangePassword(e)}
               action=""
               method="post"
            >
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
                        className="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                     />
                  </div>
               </div>
               <div className="mt-2">
                  <TButton loading={loading} >Save</TButton>
               </div>
            </form>
         </div>
      </div>
   );
}
