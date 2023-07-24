import {
    createContext,
    useContext,
    useReducer,
    useCallback,
    ReactElement,
} from "react";

// User Type
type User = {
    name: string;
    avatar: string;
};

// App state type (the user)
type AppState = {
    user: User;
    token: string;
};

// Initial app state for the reducer
export const initState: AppState = {
    user: { name: "", avatar: "" },
    token: "",
};

// The list of actions to be taken by the reducer
const enum REDUCER_ACTION_TYPE {
    UPDATE_USER,
    UPDATE_TOKEN,
}

// Reducer action type
type ReducerAction = {
    type: REDUCER_ACTION_TYPE;
    payload: User | string;
};

// Reducer Function
const reducer = (state: AppState, action: ReducerAction): AppState => {
    switch (action.type) {
        case REDUCER_ACTION_TYPE.UPDATE_USER:
            return { ...state, user: action.payload as User };

        case REDUCER_ACTION_TYPE.UPDATE_TOKEN:
            return { ...state, token: action.payload as string };

        default:
            throw new Error();
    }
};

// Custom hook to use App reducers in context. It wil return values needed in the provider
const useAppContext = (initState: AppState) => {
    const [state, dispatch] = useReducer(reducer, initState);

    const updateUser = useCallback(
        (user: User) =>
            dispatch({ type: REDUCER_ACTION_TYPE.UPDATE_USER, payload: user }),
        []
    );

    const updateToken = useCallback(
        (token: string) =>
            dispatch({
                type: REDUCER_ACTION_TYPE.UPDATE_TOKEN,
                payload: token,
            }),
        []
    );

    return { state, updateUser, updateToken };
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
    updateToken: () => {},
    updateUser: () => {},
};

export const AppContext = createContext<UseAppContextType>(initContextState);

export const ContextProvider = ({ children }: ChildrenType): ReactElement => {
    return (
        <AppContext.Provider value={useAppContext(initState)}>
            {children}
        </AppContext.Provider>
    );
};

type UseAppHookType = {
    user: User;
    token: string;
    updateToken: (token: string) => void;
    updateUser: (user: User) => void;
};

export const useAppHook = (): UseAppHookType => {
    const {
        state: { user, token },
        updateToken,
        updateUser,
    } = useContext(AppContext);

    return { user, token, updateToken, updateUser };
};
