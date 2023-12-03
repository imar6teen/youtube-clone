import { useState } from "react";
import "../assets/pages/home.css";
import { SidebarAccount, Body, Footer, Header } from "../components";
import { UploadVideoModal } from "../components/";
import { appStates } from "../hooks";
import axios, { AxiosProgressEvent, AxiosResponse } from "axios";
import { VITE_BACKEND_URL } from "../config/app";
import AfterUploadModal from "../components/AfterUploadModal";

function Home() {
  const [states, dispatch] = appStates.useContextStates();
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [video, setVideo] = useState<File>();
  const [uploadResponse, setUploadResponse] =
    useState<AxiosResponse<any, any>>();

  const options = {
    onUploadProgress: (progressEvent: AxiosProgressEvent) => {
      const { loaded, total } = progressEvent;
      if (total === undefined) return;

      let percentage = Math.floor((loaded * 100) / total);

      setUploadProgress(percentage);
    },
  };

  // upload video
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files === null) return;

    const tempFile = files[0];
    setVideo(tempFile);

    const formData = new FormData();
    formData.append("video", tempFile);

    dispatch({ type: "togglePopUpUploadVideo" });
    dispatch({ type: "togglePopUpAfterUpload" });

    axios
      .post(`${VITE_BACKEND_URL}/api/v1/video`, formData, options)
      .then((res) => {
        setUploadResponse(res);
      });
  };

  return (
    <div id="home">
      <Header />
      {states.PopUploadVideo.isClosed ? null : (
        <UploadVideoModal handleUpload={handleUpload} />
      )}
      {states.PopAccount.isClosed ? null : <SidebarAccount />}
      {states.PopUpAfterUpload.isClosed ? null : (
        <AfterUploadModal
          uploadProgress={uploadProgress}
          video={video}
          uploadResponse={uploadResponse}
        />
      )}
      <Body />
      <Footer />
    </div>
  );
}

export default Home;
