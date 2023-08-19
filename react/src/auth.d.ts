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

type LoginUser = {
    email: string;
    password: string;
};

interface ApiError {
    errors: Array<string[]>;
    error: string;
    message: string;
}

type RegisterResult = {
    user?: User;
    token?: string;
    error?: AxiosError<ApiError>;
};

type ErrorObj = { __html: string };
