import { AxiosResponse } from "axios";

const showError = (error: AxiosResponse<ApiError>): ErrorObj => {
    if (error.data.errors) {
        const errors = Object.values(error.data.errors);
        const finalErrors = errors.reduce(
            (acc: string[], next: string[]) => [...acc, ...next],
            []
        );

        return { __html: finalErrors.join("<br>") };
    } else {
        return { __html: error.data.message };
    }
};

export default showError;
