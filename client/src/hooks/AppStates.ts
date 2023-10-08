import { useReducer, createContext, useContext } from "react";

interface PopUpAccountStates {
  isClosed: boolean;
}

interface States {
  PopAccount: PopUpAccountStates;
}

type Actions = { type: "togglePopUpAccount" };
// | {} fill it when add new state

type AfterReducer = [States, React.Dispatch<Actions>];

// Create Reducer
const stateReducer = (state: States, action: Actions): States => {
  switch (action.type) {
    case "togglePopUpAccount":
      return { PopAccount: { isClosed: !state.PopAccount.isClosed } };
    default:
      throw new Error("unknown action");
  }
};

const initialStates: States = {
  PopAccount: { isClosed: true },
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
