import {
    createContext,
    useContext,
    useReducer,
    useCallback,
    ReactElement,
} from "react";

import { QuestionListType, Survey } from "../types/survey";
import { User } from "../types/auth";

const TMP_SURVEY: Array<Survey> = [
    {
        id: 1,
        image_url: "https://api.yoursurveys.xyz/images/vJutXzn02CDwdOyh.png",
        title: "TheCodeholic YouTube channel",
        slug: "thecodeholic-youtube-channel",
        status: true,
        description:
            "My name is Zura.<br>I am Web Developer with 9+ years of experience, free educational content creator, CTO, Lecturer and father of two wonderful daughters.<br><br>The purpose of the channel is to share my several years of experience with beginner developers.<br>Teach them what I know and make my experience as a lesson for others.",
        created_at: new Date("2022-01-07 13:23:41"),
        updated_at: new Date("2022-01-18 16:34:19"),
        expire_date: new Date("2022-01-23"),
        questions: [
            {
                id: 15,
                type: "text",
                question: "From which country are you?",
                description: "",
                data: {
                    options: [],
                },
            },
            {
                id: 16,
                type: "checkbox",
                question:
                    "Which language videos do you want to see on my channel?",
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda cumque earum eos esse est ex facilis, iure laboriosam maiores neque nesciunt nulla placeat praesentium quae quos ratione, recusandae totam velit!",
                data: {
                    options: [
                        {
                            uuid: "8ee03188-9e7e-44e5-9176-7574c0beec6f",
                            text: "JavaScript",
                        },
                        {
                            uuid: "fe9497f2-8f05-4c82-9586-26e36736fa9e",
                            text: "PHP",
                        },
                        {
                            uuid: "db0f194c-d32d-4e19-929e-08f7b4e2bcc0",
                            text: "HTML + CSS",
                        },
                        {
                            uuid: "93273c4c-ac8f-432e-b847-e467df64ab9c",
                            text: "All of the above",
                        },
                        {
                            uuid: "d54818a7-ad7e-4b69-9287-16a8dc50a6cb",
                            text: "Everything Zura thinks will be good",
                        },
                    ],
                },
            },
            {
                id: 17,
                type: "select",
                question:
                    "Which PHP framework videos do you want to see on my channel?",
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda cumque earum eos esse est ex facilis, iure laboriosam maiores neque nesciunt nulla placeat praesentium quae quos ratione, recusandae totam velit!",
                data: {
                    options: [
                        {
                            uuid: "fb907cfe-b7a1-4b24-86fb-03f9c44aa710",
                            text: "Laravel",
                        },
                        {
                            uuid: "e2629262-93ca-4a7a-8129-19c765664a04",
                            text: "Yii2",
                        },
                        {
                            uuid: "9a11a425-d9fe-4fe9-86af-bb814e3d9271",
                            text: "Codeigniter",
                        },
                        {
                            uuid: "484268b1-d3aa-47f8-a185-356ed48e50fe",
                            text: "Symfony",
                        },
                    ],
                },
            },
            {
                id: 18,
                type: "radio",
                question: "Which Laravel Framework do you love most?",
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda cumque earum eos esse est ex facilis, iure laboriosam maiores neque nesciunt nulla placeat praesentium quae quos ratione, recusandae totam velit!",
                data: {
                    options: [
                        {
                            uuid: "c02e50e6-5ebf-4344-9822-baa16502dbdb",
                            text: "Laravel 5",
                        },
                        {
                            uuid: "90a15aae-ef4c-4d04-aa05-8e840d4a2ded",
                            text: "Laravel 6",
                        },
                        {
                            uuid: "93c64532-c1eb-4bfd-bd00-ab51cafdee78",
                            text: "Laravel 7",
                        },
                        {
                            uuid: "51f6a704-7a86-47a4-9b2d-72bb026a3371",
                            text: "Laravel 8",
                        },
                    ],
                },
            },
            {
                id: 19,
                type: "checkbox",
                question:
                    "What type of projects do you want to see on my channel built with Laravel?",
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda cumque earum eos esse est ex facilis, iure laboriosam maiores neque nesciunt nulla placeat praesentium quae quos ratione, recusandae totam velit!",
                data: {
                    options: [
                        {
                            uuid: "c5519ab0-3282-4758-a34b-506052bf1342",
                            text: "REST API",
                        },
                        {
                            uuid: "dfbbc0af-8fff-44ae-be36-e85270041729",
                            text: "E-commerce",
                        },
                        {
                            uuid: "6940c122-505f-4d9d-a103-472f923fad94",
                            text: "Real Estate",
                        },
                        {
                            uuid: "2b3c12a4-8f3c-4276-ae59-4e9d55e849be",
                            text: "All of the above",
                        },
                    ],
                },
            },
            {
                id: 22,
                type: "textarea",
                question: "What do you think about TheCodeholic channel?",
                description:
                    "Write your honest opinion. Everything is anonymous.",
                data: {
                    options: [],
                },
            },
            {
                id: 23,
                type: "text",
                question: "Which channel is your favorite one?",
                description: "",
                data: {
                    options: [],
                },
            },
        ],
    },
    {
        id: 2,
        image_url: "https://api.yoursurveys.xyz/images/gjIHElz4aKrL0nT0.png",
        title: "React",
        slug: "react",
        status: true,
        description:
            "React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.",
        created_at: new Date("2022-01-07 08:50:40"),
        updated_at: new Date("2022-01-07 13:37:37"),
        expire_date: new Date("2022-02-01"),
        questions: [],
    },
    {
        id: 3,
        image_url: "https://api.yoursurveys.xyz/images/WPfzo0g66huUYYwR.png",
        title: "Laravel 9",
        slug: "laravel-9",
        status: true,
        description:
            "Laravel is a web application framework with expressive, elegant syntax. We\u2019ve already laid the foundation \u2014 freeing you to create without sweating the small things.",
        created_at: new Date("2022-01-07 13:28:56"),
        updated_at: new Date("2022-01-07 13:28:56"),
        expire_date: new Date("2022-01-20"),
        questions: [],
    },
];

// App state type (the user)
type AppState = {
    user: User;
    token: string;
    surveys: Array<Survey>;
};

const user: User = {
    name: "",
    email: "",
    avatar: "",
};

// Initial app state for the reducer
export const initState: AppState = {
    user,
    token: localStorage.getItem("TOKEN") || "",
    surveys: [...TMP_SURVEY],
};

// The list of actions to be taken by the reducer
const enum REDUCER_ACTION_TYPE {
    SET_USER,
    SET_TOKEN,
    SET_SURVEY,
    LOG_OUT,
}

// Reducer action type
type ReducerAction = {
    type: REDUCER_ACTION_TYPE;
    payload: User | Survey | string;
};

// Reducer Function
const reducer = (state: AppState, action: ReducerAction): AppState => {
    switch (action.type) {
        case REDUCER_ACTION_TYPE.SET_USER:
            return { ...state, user: action.payload as User };

        case REDUCER_ACTION_TYPE.SET_TOKEN:
            return { ...state, token: action.payload as string };

        case REDUCER_ACTION_TYPE.SET_SURVEY:
            return {
                ...state,
                surveys: [...state.surveys, action.payload as Survey],
            };

        case REDUCER_ACTION_TYPE.LOG_OUT:
            return {
                user: { name: "", email: "", avatar: "" },
                token: "",
                surveys: [],
            };

        default:
            throw new Error();
    }
};

// Custom hook to use App reducers in context. It wil return values needed in the provider
const useAppContext = (initState: AppState) => {
    const [state, dispatch] = useReducer(reducer, initState);

    const setUser = useCallback((user: User) => {
        dispatch({ type: REDUCER_ACTION_TYPE.SET_USER, payload: user });
    }, []);

    const setToken = useCallback((token: string) => {
        localStorage.setItem("TOKEN", token);
        dispatch({
            type: REDUCER_ACTION_TYPE.SET_TOKEN,
            payload: token,
        });
    }, []);

    const setSurvey = useCallback((survey: Survey) => {
        dispatch({ type: REDUCER_ACTION_TYPE.SET_SURVEY, payload: survey });
    }, []);

    const logout = () => {
        localStorage.removeItem("TOKEN");
        dispatch({ type: REDUCER_ACTION_TYPE.LOG_OUT, payload: "" });
    };

    return { state, setUser, setToken, setSurvey, logout };
};

// use App Context return type
type UseAppContextType = ReturnType<typeof useAppContext>;

// App provider children type
type ChildrenType = {
    children?: ReactElement | undefined;
};

// Initial state for the app context
const initContextState: UseAppContextType = {
    state: initState,
    setToken: () => {},
    setUser: () => {},
    setSurvey: () => {},
    logout: () => {},
};

export const AppContext = createContext<UseAppContextType>(initContextState);

export const AppProvider = ({ children }: ChildrenType): ReactElement => {
    return (
        <AppContext.Provider value={useAppContext(initState)}>
            {children}
        </AppContext.Provider>
    );
};

type UseAppHookType = {
    user: User;
    token: string;
    surveys: Array<Survey>;
    questionsType: QuestionListType[];
    setToken: (token: string) => void;
    setUser: (user: User) => void;
    setSurvey: (survey: Survey) => void;
    logout: () => void;
};

export const useAppHook = (): UseAppHookType => {
    const {
        state: { user, token, surveys },
        setToken,
        setUser,
        setSurvey,
        logout,
    } = useContext(AppContext);

    const questionsType: QuestionListType[] = [
        "select",
        "text",
        "checkbox",
        "radio",
        "textarea",
    ];

    return {
        user,
        token,
        surveys,
        questionsType,
        setToken,
        setUser,
        setSurvey,
        logout,
    };
};
