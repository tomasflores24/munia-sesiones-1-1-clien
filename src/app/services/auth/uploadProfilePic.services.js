import { HttpRequest } from "../HttpRequest";

export const uploadProfilePicServices = {
    sendFile: async ({ userId, file }) => {
        const formData = new FormData();
        formData.append("files", file);
        HttpRequest.patchCustomHeaders(`/auth/upload-pic/${userId}`, formData, {
            "Content-Type": "multipart/form-data",
        });
    },
    
};