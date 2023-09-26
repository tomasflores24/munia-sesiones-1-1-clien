import { HttpRequest } from "../HttpRequest";

const CommentsServices = {
  getAllRatings: async (keyword) =>
    HttpRequest.get(keyword ? `/rating?keyword=${keyword}` : "/rating"),
};

export default CommentsServices;
