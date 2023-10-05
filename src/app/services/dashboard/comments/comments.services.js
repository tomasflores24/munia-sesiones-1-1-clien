import { HttpRequest } from "../../HttpRequest";

const CommentsServices = {
  getAllRatings: async (keyword, rating, serviceId, date, providerId) => {
    let url = `/rating`;
    const querys = [
      { name: "keyword", value: keyword },
      { name: "rating", value: rating },
      { name: "serviceId", value: serviceId },
      { name: "fecha", value: date },
      { name: "ProviderId", value: providerId },
    ];

    if (!keyword && !rating && !serviceId && !date && !providerId) {
      return HttpRequest.get(url);
    } else {
      querys.filter((el) => el.value).map((el, index) => {
        if (index === 0) {
          url = url + `?${el.name}=${el.value}`
        } else {
          url = url + `&${el.name}=${el.value}`
        }
      })
      return await HttpRequest.get(url)
    }
  },
  getAllService: async (ProviderId) => await HttpRequest.get(ProviderId ? `/service/provider/${ProviderId}`: `/service`),
};

export default CommentsServices;
