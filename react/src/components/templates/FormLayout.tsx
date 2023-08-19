import { ReactNode } from "react";

type Proptypes = { title: string; children: ReactNode };

const FormLayout = ({ title, children }: Proptypes) => {
   return (
      <div>
         <h2 className="w-full mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
           {title}
         </h2>

         <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm md:max-w-md">
            {children}
         </div>
      </div>
   );
};

export default FormLayout;
