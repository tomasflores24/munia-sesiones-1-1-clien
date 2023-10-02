import { HttpRequest } from "../HttpRequest";

const CommentsServices = {
  getAllRatings: async (keyword, rating, serviceId, date) => {
    let url = `/rating`;
    const querys = [
      { name: "keyword", value: keyword },
      { name: "rating", value: rating },
      { name: "serviceId", value: serviceId },
      { name: "date", value: date },
    ];

    if (!keyword && !rating && !serviceId && !date) {
      return HttpRequest.get(url);
    } else {
      querys.filter((el) => el.value).map((el, index) => {
        if (index === 0) {
          url = url + `?${el.name}=${el.value}`
        } else {
          url = url + `&${el.name}=${el.value}`
        }
      })
      return HttpRequest.get(url)
    }
  },
  getAllService: async () => HttpRequest.get(`/service),
};

export default CommentsServices;
