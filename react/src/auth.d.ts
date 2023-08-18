// import { registerUser } from "./pages/auth/api/auth";

type User = {
    name: string;
    email: string;
    avatar: string;
    email_verified_at: null | string;
};

type RegisterUser = {
    name: string;
    email: string;
    password: string;
    confirm_password: string;
};


interface ApiError {
    errors: Array<string[]>;
    error: string;
    message: string;
}

type RegisterResult = {
    user?: string;
    token?: string;
    error?: AxiosError<ApiError>
}

type ErrorObj = { __html: string };
