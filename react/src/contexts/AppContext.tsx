import {
    createContext,
    useContext,
    useReducer,
    useCallback,
    ReactElement,
} from "react";

import { QuestionListType, Survey } from "../types/survey";
import { User } from "../types/auth";

export type Notification = {
    message?: string;
    show?: boolean;
};

// App state type (the user)
type AppState = {
    user: User;
    token: string;
    surveys: Array<Survey>;
    notification: Notification;
};

const user: User = {
    name: "",
    email: "",
    avatar: "",
    email_verified_at: null
};

// Initial app state for the reducer
export const initState: AppState = {
    user,
    token: localStorage.getItem("TOKEN") || "",
    surveys: [],
    notification: {
        message: "",
        show: false,
    },
};

// The list of actions to be taken by the reducer
const enum REDUCER_ACTION_TYPE {
    SET_USER,
    SET_TOKEN,
    SET_SURVEY,
    LOG_OUT,
    SHOW_NOTIFICATION,
    KILL_NOTIFICATION,
}

// Reducer action type
type ReducerAction = {
    type: REDUCER_ACTION_TYPE;
    payload: User | Survey[] | string;
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
                surveys: [...(action.payload as Array<Survey>)],
            };

        case REDUCER_ACTION_TYPE.SHOW_NOTIFICATION:
            return {
                ...state,
                notification: {
                    message: action.payload as string,
                    show: true,
                },
            };

        case REDUCER_ACTION_TYPE.KILL_NOTIFICATION:
            return { ...state, notification: initState.notification };

        case REDUCER_ACTION_TYPE.LOG_OUT:
            return initState;

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

    const setSurvey = useCallback((surveys: Survey[]) => {
        dispatch({ type: REDUCER_ACTION_TYPE.SET_SURVEY, payload: surveys });
    }, []);

    const showNotification = useCallback((message: string) => {
        dispatch({
            type: REDUCER_ACTION_TYPE.SHOW_NOTIFICATION,
            payload: message,
        });

        setTimeout(() => {
            dispatch({
                type: REDUCER_ACTION_TYPE.KILL_NOTIFICATION,
                payload: "",
            });
        }, 5000);

    }, []);

    const logout = () => {
        localStorage.removeItem("TOKEN");
        dispatch({ type: REDUCER_ACTION_TYPE.LOG_OUT, payload: "" });
    };

    return { state, setUser, setToken, setSurvey, showNotification, logout };
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
    showNotification: () => {},
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
    notification: Notification;
    questionsType: QuestionListType[];
    setToken: (token: string) => void;
    setUser: (user: User) => void;
    setSurvey: (surveys: Survey[]) => void;
    showNotification: (message: string) => void;
    logout: () => void;
};

export const useAppHook = (): UseAppHookType => {
    const {
        state: { user, token, surveys, notification },
        setToken,
        setUser,
        setSurvey,
        showNotification,
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
        notification,
        questionsType,
        setToken,
        setUser,
        setSurvey,
        showNotification,
        logout,
    };
};
