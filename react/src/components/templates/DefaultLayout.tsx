import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
   Bars3Icon,
   XMarkIcon,
   UserIcon,
   ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { Link, NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

import { useAppHook } from "../../contexts/AppContext";
import { axiosClient } from "../../api/axios";
import Notifications from "../molecules/Notifications";

import myAvatar from "../../assets/my avatar.png";
import { capitalizeFLetter } from "../../utils/reuables";

type NavigationType = { name: string; to: string; current: boolean };

const navigation: Array<NavigationType> = [
   { name: "Dashboard", to: "/dashboard", current: true },
   { name: "surveys", to: "/surveys", current: false },
];

function classNames(...classes: Array<string>) {
   return classes.filter(Boolean).join(" ");
}

export default function DefaultLayout() {
   const [fetching, setFetching] = useState(false);
   const navigate = useNavigate();

   const {
      user,
      setUser,
      token,
      logout: logOut,
      showNotification,
   } = useAppHook();

   if (!token) {
      return <Navigate to={"/login"} />;
   }

   useEffect(() => {
      let source = axios.CancelToken.source();
      setFetching(true);

      const getUser = async () => {
         try {
            const res = await axiosClient.get("/users/me", {
               cancelToken: source.token,
            });
            setUser(res.data);
         } catch (error) {
            console.log(error);
         }
      };

      getUser();

      setTimeout(() => {
         setFetching(false);
      }, 5000);

      return () => {
         source.cancel();
      };
   }, []);

   async function logout(e: React.MouseEvent<HTMLElement>): Promise<void> {
      e.preventDefault();

      try {
         await axiosClient.post("/auth/logout", null);
         logOut();
         navigate('/login')
      } catch (error) {
         console.log(error);
      }
   }

   async function resendVerificationEmail() {
      try {
         const send = async () => {
            const res = await axiosClient.post("/auth/email/re-send", null);
            console.log(res.data);

            showNotification("verification sent");
         };

         send();
      } catch (error) {
         console.log("error");
      }
   }

   const verificationModal = (
      <div className="absolute top-0 w-screen px-6 h-28 sm:h-16 z-10 bg-sky-100 flex justify-start items-center sm:gap-2 lg:gap-4 lg:px-10 animate-fade-in-down">
         <ExclamationCircleIcon
            className="h-12 w-12 sm:h-8 sm:w-8 lg:h-6 lg:w-6 mr-2"
            color="black"
         />
         <div className="flex flex-col gap-1 sm:flex-row sm:justify-center sm:items-center sm:gap-4">
            <p className="text-sm sm:text-md">
               Please activate your account to start creating surveys. We sent
               an activation email to{" "}
               <span className="font-bold">
                  {capitalizeFLetter(user.email)}
               </span>
            </p>
            <button
               type="button"
               onClick={resendVerificationEmail}
               className="w-48 h-8 border border-solid border-gray-600 rounded-sm text-sm hover:bg-slate-300"
            >
               Resend Activation
            </button>
         </div>
      </div>
   );

   return (
      <>
         {!user.email_verified_at && !fetching && verificationModal}
         <div className="min-h-full">
            <Disclosure as="nav" className="bg-gray-800">
               {({ open }) => (
                  <>
                     <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                           <div className="flex items-center">
                              <div className="flex-shrink-0">
                                 <img
                                    className="h-8 w-8"
                                    src={myAvatar}
                                    alt="me"
                                 />
                              </div>
                              <div className="hidden md:block">
                                 <div className="ml-10 flex items-baseline space-x-4">
                                    {navigation.map((item) => (
                                       <NavLink
                                          key={item.name}
                                          to={item.to}
                                          className={({ isActive }) =>
                                             classNames(
                                                isActive
                                                   ? "bg-gray-900 text-white"
                                                   : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                                "rounded-md px-3 py-2 text-sm font-medium"
                                             )
                                          }
                                       >
                                          {item.name}
                                       </NavLink>
                                    ))}
                                 </div>
                              </div>
                           </div>
                           <div className="hidden md:block">
                              <div className="ml-4 flex items-center md:ml-6">
                                 <div className="flex flex-col">
                                    <p className="text-base font-medium leading-none text-white">
                                       {user.name}
                                    </p>
                                    <p className="text-sm font-medium leading-none text-gray-400">
                                       {user.email}
                                    </p>
                                 </div>
                                 {/* Profile dropdown */}
                                 <Menu as="div" className="relative ml-3">
                                    <div>
                                       <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                          <span className="sr-only">
                                             Open user menu
                                          </span>
                                          <UserIcon className="w-8 h-8 bg-black/25 p-2 rounded-full text-white" />
                                       </Menu.Button>
                                    </div>
                                    <Transition
                                       as={Fragment}
                                       enter="transition ease-out duration-100"
                                       enterFrom="transform opacity-0 scale-95"
                                       enterTo="transform opacity-100 scale-100"
                                       leave="transition ease-in duration-75"
                                       leaveFrom="transform opacity-100 scale-100"
                                       leaveTo="transform opacity-0 scale-95"
                                    >
                                       <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                          <Menu.Item>
                                             {() => (
                                                <Link
                                                   to={"/dashboard/profile"}
                                                   className={
                                                      "block px-4 py-2 text-sm text-gray-700 hover:bg-slate-400"
                                                   }
                                                >
                                                   Profile
                                                </Link>
                                             )}
                                          </Menu.Item>
                                          <Menu.Item>
                                             {() => (
                                                <a
                                                   onClick={(e) => logout(e)}
                                                   href="#"
                                                   className={
                                                      "block px-4 py-2 text-sm text-gray-700 hover:bg-slate-400"
                                                   }
                                                >
                                                   Sign Out
                                                </a>
                                             )}
                                          </Menu.Item>
                                       </Menu.Items>
                                    </Transition>
                                 </Menu>
                              </div>
                           </div>
                           <div className="-mr-2 flex md:hidden">
                              {/* Mobile menu button */}
                              <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                 <span className="sr-only">Open main menu</span>
                                 {open ? (
                                    <XMarkIcon
                                       className="block h-6 w-6"
                                       aria-hidden="true"
                                    />
                                 ) : (
                                    <Bars3Icon
                                       className="block h-6 w-6"
                                       aria-hidden="true"
                                    />
                                 )}
                              </Disclosure.Button>
                           </div>
                        </div>
                     </div>

                     <Disclosure.Panel className="md:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                           {navigation.map((item) => (
                              <NavLink
                                 key={item.name}
                                 to={item.to}
                                 className={({ isActive }) =>
                                    classNames(
                                       isActive
                                          ? "bg-gray-900 text-white"
                                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                       "block rounded-md px-3 py-2 text-base font-medium"
                                    )
                                 }
                              >
                                 {item.name}
                              </NavLink>
                           ))}
                        </div>
                        <div className="border-t border-gray-700 pb-3 pt-4">
                           <div className="flex items-center px-5">
                              <div className="flex-shrink-0">
                                 <UserIcon className="w-8 h-8 bg-black/25 p-2 rounded-full text-white" />
                              </div>
                              <div className="ml-3">
                                 <div className="text-base font-medium leading-none text-white">
                                    {user.name}
                                 </div>
                                 <div className="text-sm font-medium leading-none text-gray-400">
                                    {user.email}
                                 </div>
                              </div>
                           </div>
                           <div className="mt-3 space-y-1 px-2">
                              <Disclosure.Button
                                 as="a"
                                 href="#"
                                 onClick={(e) => logout(e)}
                                 className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                              >
                                 Sign Out
                              </Disclosure.Button>
                              <Link
                                 to={"/dashboard/profile"}
                                 className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                              >
                                 Profile
                              </Link>
                           </div>
                        </div>
                     </Disclosure.Panel>
                  </>
               )}
            </Disclosure>
            <Outlet />

            <Notifications />
         </div>
      </>
   );
}
