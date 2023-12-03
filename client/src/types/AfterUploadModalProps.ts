import { AxiosResponse } from "axios";

type AfterUploadModalProps = {
  uploadProgress: number;
  video: File | undefined;
  uploadResponse: AxiosResponse<any, any> | undefined;
};

export default AfterUploadModalProps;
