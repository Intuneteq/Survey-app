import {
   ReactElement,
   createContext,
   useCallback,
   useContext,
   useReducer,
} from "react";
import { QuestionType, SurveyType } from "../types/survey";

export const surveyInitState: SurveyType = {
   title: "",
   slug: "",
   status: false,
   description: "",
   image: "",
   image_url: "",
   expire_date: "",
   questions: [],
};

const enum REDUCER_ACTION_TYPE {
   SET_TITLE,
   SET_STATUS,
   SET_DESCRIPTION,
   SET_IMAGE,
   SET_IMAGE_URL,
   SET_EXPIRE_DATE,
   SET_QUESTION,
   CLEAR_SURVEY,
   DELETE_QUESTION,
   UPDATE_QUESTION,
   SET_SURVEY,
}

type AddQuestionType = { question: QuestionType; index?: number };

type ReducerAction = {
   type: REDUCER_ACTION_TYPE;
   payload:
      | string
      | boolean
      | File
      | SurveyType
      | AddQuestionType
      | QuestionType;
};

const reducer = (state: SurveyType, action: ReducerAction): SurveyType => {
   switch (action.type) {
      case REDUCER_ACTION_TYPE.SET_TITLE:
         return { ...state, title: action.payload as string };

      case REDUCER_ACTION_TYPE.SET_STATUS:
         return { ...state, status: action.payload as boolean };

      case REDUCER_ACTION_TYPE.SET_DESCRIPTION:
         return { ...state, description: action.payload as string };

      case REDUCER_ACTION_TYPE.SET_IMAGE:
         return { ...state, image: action.payload as File };

      case REDUCER_ACTION_TYPE.SET_IMAGE_URL:
         return { ...state, image_url: action.payload as string };

      case REDUCER_ACTION_TYPE.SET_EXPIRE_DATE:
         return { ...state, expire_date: action.payload as string };

      case REDUCER_ACTION_TYPE.SET_QUESTION:
         const { question, index } = action.payload as AddQuestionType;
         if (index) {
            return {
               ...state,
               questions: [
                  ...state.questions!.slice(0, index),
                  question,
                  ...state.questions!.slice(index),
               ],
            };
         } else {
            return { ...state, questions: [...state.questions!, question] };
         }

      case REDUCER_ACTION_TYPE.UPDATE_QUESTION:
         const updated = state.questions?.map((q) => {
            if (q.id == (action.payload as QuestionType).id) {
               return { ...(action.payload as QuestionType) };
            }
            return q;
         });

         return {
            ...state,
            questions: updated,
         };

      case REDUCER_ACTION_TYPE.DELETE_QUESTION:
         const { questions } = state;
         const newQuestions = questions?.filter(
            (q) => q.id !== (action.payload as QuestionType).id
         );
         return { ...state, questions: newQuestions };

      case REDUCER_ACTION_TYPE.SET_SURVEY:
         return { ...(action.payload as SurveyType) };

      case REDUCER_ACTION_TYPE.CLEAR_SURVEY:
         return surveyInitState;

      default:
         throw new Error();
   }
};

const useSurveyContext = (initState: SurveyType) => {
   const [state, dispatch] = useReducer(reducer, initState);

   const setStatus = useCallback((status: boolean) => {
      dispatch({ type: REDUCER_ACTION_TYPE.SET_STATUS, payload: status });
   }, []);

   const setTitle = (title: string) => {
      dispatch({ type: REDUCER_ACTION_TYPE.SET_TITLE, payload: title });
   };

   const setDescription = useCallback((description: string) => {
      dispatch({
         type: REDUCER_ACTION_TYPE.SET_DESCRIPTION,
         payload: description,
      });
   }, []);

   const setImage = useCallback((file: File) => {
      dispatch({ type: REDUCER_ACTION_TYPE.SET_IMAGE, payload: file });
   }, []);

   const setImageUrl = useCallback((url: string) => {
      dispatch({ type: REDUCER_ACTION_TYPE.SET_IMAGE_URL, payload: url });
   }, []);

   const setExpireDate = useCallback((expire_date: string) => {
      dispatch({
         type: REDUCER_ACTION_TYPE.SET_EXPIRE_DATE,
         payload: expire_date,
      });
   }, []);

   const setQuestion = useCallback((payload: AddQuestionType) => {
      dispatch({
         type: REDUCER_ACTION_TYPE.SET_QUESTION,
         payload,
      });
   }, []);

   const updateQuestion = useCallback((question: QuestionType) => {
      if (!question) return;

      dispatch({
         type: REDUCER_ACTION_TYPE.UPDATE_QUESTION,
         payload: question,
      });
   }, []);

   const deleteQuestion = (question: QuestionType) => {
      dispatch({
         type: REDUCER_ACTION_TYPE.DELETE_QUESTION,
         payload: question,
      });
   };

   const setSurvey = useCallback((survey: SurveyType) => {
      dispatch({ type: REDUCER_ACTION_TYPE.SET_SURVEY, payload: survey });
   }, []);

   const clearSurvey = () => {
      dispatch({ type: REDUCER_ACTION_TYPE.CLEAR_SURVEY, payload: "" });
   };

   return {
      state,
      setStatus,
      setTitle,
      setDescription,
      setImage,
      setImageUrl,
      setExpireDate,
      setQuestion,
      deleteQuestion,
      updateQuestion,
      setSurvey,
      clearSurvey
   };
};

type UseSurveyContextType = ReturnType<typeof useSurveyContext>;

type ChildrenType = {
   children?: ReactElement | undefined;
};

const initContextState: UseSurveyContextType = {
   state: surveyInitState,
   setStatus: () => {},
   setTitle: () => {},
   setDescription: () => {},
   setImage: () => {},
   setImageUrl: () => {},
   setExpireDate: () => {},
   setQuestion: () => {},
   deleteQuestion: () => {},
   updateQuestion: () => {},
   setSurvey: () => {},
   clearSurvey: () => {},
};

const SurveyContext = createContext<UseSurveyContextType>(initContextState);

export const SurveyProvider = ({ children }: ChildrenType): ReactElement => {
   return (
      <SurveyContext.Provider value={useSurveyContext(surveyInitState)}>
         {children}
      </SurveyContext.Provider>
   );
};

type UseSurveyHookType = {
   state: SurveyType;
   setStatus: (status: boolean) => void;
   setTitle: (title: string) => void;
   setDescription: (descritpion: string) => void;
   setImage: (file: File) => void;
   setImageUrl: (url: string) => void;
   setExpireDate: (url: string) => void;
   setQuestion: (payload: AddQuestionType) => void;
   deleteQuestion: (question: QuestionType) => void;
   updateQuestion: (question: QuestionType) => void;
   setSurvey: (survey: SurveyType) => void;
   clearSurvey: () => void;
};

export const useSurveyHook = (): UseSurveyHookType => {
   const {
      state,
      setStatus,
      setTitle,
      setDescription,
      setImage,
      setImageUrl,
      setSurvey,
      setQuestion,
      deleteQuestion,
      updateQuestion,
      setExpireDate,
      clearSurvey
   } = useContext(SurveyContext);

   return {
      state,
      setStatus,
      setTitle,
      setDescription,
      setImage,
      setImageUrl,
      setExpireDate,
      setQuestion,
      deleteQuestion,
      updateQuestion,
      setSurvey,
      clearSurvey
   };
};
