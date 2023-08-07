import { Navigate, Outlet } from "react-router-dom";

import { useAppHook } from "../../contexts/AppContext";

import myAvatar from "../../assets/my avatar.png";

const GuestLayout = () => {
   const { token } = useAppHook();

   if (token) {
      return <Navigate to={"/dashboard"} />;
   }

   return (
      <div className="bg-gray-200 h-full min-h-screen w-full p-10">
         <div className="w-full">
            <div className="w-16 h-16 rounded-full bg-white sm:mx-auto p-2">
               <img
                  className="w-full h-full object-contain"
                  src={myAvatar}
                  alt="my logo"
               />
            </div>
         </div>
         <Outlet />
      </div>
   );
};

export default GuestLayout;
