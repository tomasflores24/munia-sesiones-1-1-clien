import { HttpRequest } from "../HttpRequest";

export const RegisterServices = {
  signUp: async (data) => HttpRequest.post("/auth/sign-up", data),
  sendFile: async ({ userId, data }) => {
    const formData = new FormData();
    formData.append("files", data.file[0]);
    HttpRequest.postCustomHeaders(`/auth/upload-pic/${userId}`, formData, {
      "Content-Type": "multipart/form-data",
    });
  },
};
