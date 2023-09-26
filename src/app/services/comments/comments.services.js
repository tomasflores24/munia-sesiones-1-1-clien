import { HttpRequest } from "../HttpRequest";

const CommentsServices = {
  getAllRatings: async () => HttpRequest.get("/rating"),
};

export default CommentsServices;