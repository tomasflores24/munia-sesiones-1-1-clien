import { HttpRequest } from "../../HttpRequest";

export const StatisticsServices = {
  getAllCollaborators: async () => HttpRequest.get("/collaborator"),
  getAllCompanies: async () => HttpRequest.get("/company/"),
  getAllProvider: async () => HttpRequest.get("/provider"),
  getAllAges: async () => HttpRequest.get("/statistics/ages"),
  getAllCategories: async () => HttpRequest.get("/statistics/categories"),
  getUsers: async () => HttpRequest.get("/statistics/users"),
  getAllUsers: async (scaleTime, userType) => {
    let url = "/statistics/users";

    if (!scaleTime && !userType) {
      return HttpRequest.get(url);
    } else {
      const queryParams = [
        { name: "scaleTime", value: scaleTime },
        { name: "userType", value: userType },
      ];
      const filteredQuerys = queryParams
        .filter((el) => el.value)
        .map((el, index) => {
          if (index === 0) {
            url = url + `?${el.name}=${el.value}`;
          } else {
            url = url + `&${el.name}=${el.value}`;
          }
          return url;
        });
    }
    return HttpRequest.get(url);
  },

  getAllCategory: async (categoryId) =>
    HttpRequest.get(categoryId ? `/category/${categoryId}` : "/category"),
  getAllServices: async (categoryId) =>
    await HttpRequest.get(
      categoryId
        ? `/statistics/services?CategoryId=${categoryId}`
        : "/statistics/services"
    ),
  getAllGeneral: async (CompanyId) =>
    HttpRequest.get(
      CompanyId
        ? `/statistics/general?CompanyId=${CompanyId}`
        : "/statistics/general"
    ),
  getServices: async (categoryId) =>
    HttpRequest.get(
      categoryId ? `/service/?CategoryId=${categoryId}` : "/service/"
    ),

  getAllAges: async (ServiceId, CategoryId) => {
    let url = "/statistics/ages";

    if (!ServiceId && !CategoryId) {
      return HttpRequest.get(url);
    } else {
      const queryParams = [
        { name: "ServiceId", value: ServiceId },
        { name: "CategoryId", value: CategoryId },
      ];
      const filteredQuerys = queryParams
        .filter((el) => el.value)
        .map((el, index) => {
          if (index === 0) {
            url = url + `?${el.name}=${el.value}`;
          } else {
            url = url + `&${el.name}=${el.value}`;
          }
          return url;
        });
    }
    return HttpRequest.get(url);
  },

  getAllGenders: async (CategoryId, ServiceId) => {
    let url = "/statistics/genders";

    if (!CategoryId && !ServiceId) {
      return HttpRequest.get(url);
    } else {
      const queryParams = [
        { name: "CategoryId", value: CategoryId },
        { name: "ServiceId", value: ServiceId },
      ];
      const filteredQuerys = queryParams
        .filter((el) => el.value)
        .map((el, index) => {
          if (index === 0) {
            url = url + `?${el.name}=${el.value}`;
          } else {
            url = url + `&${el.name}=${el.value}`;
          }
          return url;
        });
    }
    return HttpRequest.get(url);
  },
};
