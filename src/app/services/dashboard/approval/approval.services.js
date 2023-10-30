import { HttpRequest } from "../../HttpRequest";

export const approvalServices = {
    accept: async (userId)=> await HttpRequest.post(`/approval/acceptance/${userId}`),
    reject: async (userId)=> await HttpRequest.post(`/approval/reject/${userId}`)
}