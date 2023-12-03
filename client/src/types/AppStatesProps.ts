namespace AppStatesProps {
  export interface PopUpAccountStates {
    isClosed: boolean;
  }

  export interface PopUpUploadVideoStates {
    isClosed: boolean;
  }

  export interface PopUpAfterUploadStates {
    isClosed: boolean;
  }

  export interface AuthStates {
    email: string;
    name: string;
    pictureUrl: string;
  }

  export interface States {
    PopAccount: PopUpAccountStates;
    PopUploadVideo: PopUpUploadVideoStates;
    PopUpAfterUpload: PopUpAfterUploadStates;
    Auth: AuthStates;
    isModalClosed: boolean;
  }

  export type Actions =
    | { type: "togglePopUpAccount" }
    | { type: "togglePopUpUploadVideo" }
    | { type: "togglePopUpAfterUpload" }
    | { type: "fillAuth"; value: AuthStates };
  // | {} fill it when add new state
}

export default AppStatesProps;
