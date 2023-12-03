import { useReducer, createContext, useContext } from "react";
import { AppStatesProps as P } from "../types";

type AfterReducer = [P.States, React.Dispatch<P.Actions>];

// Create Reducer
const stateReducer = (s: P.States, action: P.Actions): P.States => {
  switch (action.type) {
    case "togglePopUpAccount":
      return {
        PopAccount: { isClosed: !s.PopAccount.isClosed },
        Auth: s.Auth,
        PopUploadVideo: s.PopUploadVideo,
        PopUpAfterUpload: s.PopUpAfterUpload,
        isModalClosed:
          !s.PopAccount.isClosed &&
          s.PopUploadVideo.isClosed &&
          s.PopUpAfterUpload.isClosed
            ? true
            : false,
      };
    case "fillAuth":
      return {
        PopAccount: s.PopAccount,
        Auth: {
          email: action.value.email,
          name: action.value.name,
          pictureUrl: action.value.pictureUrl,
        },
        PopUploadVideo: s.PopUploadVideo,
        PopUpAfterUpload: s.PopUpAfterUpload,
        isModalClosed: s.isModalClosed,
      };
    case "togglePopUpUploadVideo":
      return {
        PopAccount: s.PopAccount,
        Auth: s.Auth,
        PopUploadVideo: { isClosed: !s.PopUploadVideo.isClosed },
        PopUpAfterUpload: s.PopUpAfterUpload,
        isModalClosed:
          s.PopAccount.isClosed &&
          !s.PopUploadVideo.isClosed &&
          s.PopUpAfterUpload.isClosed
            ? true
            : false,
      };
    case "togglePopUpAfterUpload":
      return {
        PopAccount: s.PopAccount,
        Auth: s.Auth,
        PopUploadVideo: s.PopUploadVideo,
        PopUpAfterUpload: { isClosed: !s.PopUpAfterUpload.isClosed },
        isModalClosed:
          s.PopAccount.isClosed &&
          s.PopUploadVideo.isClosed &&
          !s.PopUpAfterUpload.isClosed
            ? true
            : false,
      };
    default:
      throw new Error("unknown action");
  }
};

const initialStates: P.States = {
  PopAccount: { isClosed: true },
  PopUploadVideo: { isClosed: true },
  PopUpAfterUpload: { isClosed: true },
  Auth: { email: "", name: "", pictureUrl: "" },
  isModalClosed: true,
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
