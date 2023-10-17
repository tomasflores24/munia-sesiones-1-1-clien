import { HttpRequest } from "../HttpRequest";

export const RegisterServices = {
  signUp: async (data) => HttpRequest.post("/auth/sign-up", data),
  sendFile: async ({ userId, data, accessToken }) => {
    const formData = new FormData();
    formData.append("files", data.file[0]);
    HttpRequest.patchCustomHeaders(`/auth/upload-pic/${userId}`, formData, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${accessToken}`
    });
  },
  sendFiles: async ({ userId, data, accessToken }) => {
    const formData = new FormData();
    data.forEach((item) => {
      formData.append("files", item.file, item.desc)
    });
    HttpRequest.patchCustomHeaders(`/auth/upload-files/${userId}`, formData, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${accessToken}`
    });
  },
};
