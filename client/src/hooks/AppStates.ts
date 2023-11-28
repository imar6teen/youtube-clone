import { useReducer, createContext, useContext } from "react";
import { AppStatesProps as P } from "../types";

type AfterReducer = [P.States, React.Dispatch<P.Actions>];

// Create Reducer
const stateReducer = (state: P.States, action: P.Actions): P.States => {
  switch (action.type) {
    case "togglePopUpAccount":
      return {
        PopAccount: { isClosed: !state.PopAccount.isClosed },
        Auth: state.Auth,
        PopUploadVideo: state.PopUploadVideo,
      };
    case "fillAuth":
      return {
        PopAccount: state.PopAccount,
        Auth: {
          email: action.value.email,
          name: action.value.name,
          pictureUrl: action.value.pictureUrl,
        },
        PopUploadVideo: state.PopUploadVideo,
      };
    case "togglePopUpUploadVideo":
      return {
        PopAccount: state.PopAccount,
        Auth: state.Auth,
        PopUploadVideo: { isClosed: !state.PopUploadVideo.isClosed },
      };
    default:
      throw new Error("unknown action");
  }
};

const initialStates: P.States = {
  PopAccount: { isClosed: true },
  Auth: { email: "", name: "", pictureUrl: "" },
  PopUploadVideo: { isClosed: true },
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

const importObject = {
  reducer: useReducerStates,
  ContextProvider: ContextProviderStates,
  useContextStates: useContextStates,
};

export default importObject;
