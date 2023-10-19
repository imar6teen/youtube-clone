import { useReducer, createContext, useContext } from "react";

interface PopUpAccountStates {
  isClosed: boolean;
}

interface AuthStates {
  email: string;
  name: string;
  pictureUrl: string;
}

interface States {
  PopAccount: PopUpAccountStates;
  Auth: AuthStates;
}

type Actions =
  | { type: "togglePopUpAccount" }
  | { type: "fillAuth"; value: AuthStates };
// | {} fill it when add new state

type AfterReducer = [States, React.Dispatch<Actions>];

// Create Reducer
const stateReducer = (state: States, action: Actions): States => {
  switch (action.type) {
    case "togglePopUpAccount":
      return {
        PopAccount: { isClosed: !state.PopAccount.isClosed },
        Auth: state.Auth,
      };
    case "fillAuth":
      return {
        PopAccount: state.PopAccount,
        Auth: {
          email: action.value.email,
          name: action.value.name,
          pictureUrl: action.value.pictureUrl,
        },
      };
    default:
      throw new Error("unknown action");
  }
};

const initialStates: States = {
  PopAccount: { isClosed: true },
  Auth: { email: "", name: "", pictureUrl: "" },
};

const useReducerStates = () => useReducer(stateReducer, initialStates);

// Create Context
const escapeError: unknown = 0;
const escapeError2: unknown = 0;
const ContextProviderStates = createContext<AfterReducer>([
  escapeError,
  escapeError2,
] as AfterReducer);

const useContextStates = () => useContext(ContextProviderStates);

type ImportObject = {
  reducer: () => AfterReducer;
  ContextProvider: React.Context<AfterReducer>;
  useContextStates: () => AfterReducer;
};

const importObject: ImportObject = {
  reducer: useReducerStates,
  ContextProvider: ContextProviderStates,
  useContextStates: useContextStates,
};

export default importObject;
