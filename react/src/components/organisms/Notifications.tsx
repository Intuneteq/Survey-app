// import React from 'react'

import { useAppHook } from "../../contexts/AppContext";

const Notifications = () => {
    const { notification } = useAppHook();

    if (notification.show) {
        return (
            <div className="py-2 px-3 text-white rounded bg-emerald-500 fixed right-4 bottom-2 z-50">
                {notification.message}
            </div>
        );
    }
};

export default Notifications;
