// import React from 'react'
const RadioInput = ({ data }: { data: string }) => {
    return (
        <div className="flex items-center gap-x-3">
            <input
                id="push-email"
                name="push-notifications"
                type="radio"
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <label
                htmlFor="push-email"
                className="block text-sm font-medium leading-6 text-gray-900"
            >
                {data}
            </label>
        </div>
    );
};

export default RadioInput;
