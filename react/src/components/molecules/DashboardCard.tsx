// import React from 'react'

import { ReactElement } from "react";

type PropsType = {
   title?: string;
   children: ReactElement;
   style?: Record<string, string>;
   className?: string;
};

const DashboardCard = ({
   title,
   style,
   className = "",
   children,
}: PropsType) => {
   return (
      <div
         className={
            "bg-white shadow-md p-3 text-center flex flex-col animate-fade-in-down " +
            className
         }
         style={style}
      >
         {title && <h3 className="text-2xl font-semibold">{title}</h3>}
         {children}
      </div>
   );
};

export default DashboardCard;
