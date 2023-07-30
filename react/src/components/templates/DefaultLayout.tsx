import { Fragment, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, UserIcon } from "@heroicons/react/24/outline";
import { NavLink, Navigate, Outlet } from "react-router-dom";

import { useAppHook } from "../../contexts/AppContext";
import { axiosClient } from "../../api/axios";
import Notifications from "../molecules/Notifications";

import myAvatar from "../../assets/my avatar.png";

type NavigationType = { name: string; to: string; current: boolean };

const navigation: Array<NavigationType> = [
   { name: "Dashboard", to: "/dashboard", current: true },
   { name: "surveys", to: "/surveys", current: false },
];

function classNames(...classes: Array<string>) {
   return classes.filter(Boolean).join(" ");
}

export default function DefaultLayout() {
   const { user, setUser, token, logout: logOut } = useAppHook();

   if (!token) {
      return <Navigate to={"/login"} />;
   }

   useEffect(() => {
      const getUser = async () => {
         try {
            const res = await axiosClient.get("/users/me");
            setUser(res.data);
         } catch (error) {
            console.log(error);
         }
      };

      getUser();
   }, []);

   async function logout(e: React.MouseEvent<HTMLElement>): Promise<void> {
      e.preventDefault();

      try {
         await axiosClient.post("/auth/logout", null);
         logOut();
      } catch (error) {
         console.log(error);
      }
   }

   return (
      <>
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
                                    <p className="text-base font-medium leading-none text-white">{user.name}</p>
                                    <p className="text-sm font-medium leading-none text-gray-400">{user.email}</p>
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
                                                <a
                                                   onClick={(e) => logout(e)}
                                                   href="#"
                                                   className={
                                                      "block px-4 py-2 text-sm text-gray-700"
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
