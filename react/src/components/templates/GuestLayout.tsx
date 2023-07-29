import { Navigate, Outlet } from "react-router-dom";

import { useAppHook } from "../../contexts/AppContext";

import myAvatar from "../../assets/my avatar.png";

const GuestLayout = () => {
    const { token } = useAppHook();

    if (token) {
        return <Navigate to={"/dashboard"} />;
    }
    
    return (
        <div>
            <div className="rounded-sm border-solid border-red-50flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
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
