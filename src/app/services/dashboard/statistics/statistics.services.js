import { HttpRequest } from "../../HttpRequest";

export const StatisticsServices = {
  getAllCollaborators: async () => HttpRequest.get("/collaborator"),
  getAllCompanies: async () => HttpRequest.get("/company/"),
  getAllProvider: async () => HttpRequest.get("/provider"),
  getAllAges: async () => HttpRequest.get("/statistics/ages"),

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

  getAllCategories: async (CompanyId) =>
    HttpRequest.get(
      CompanyId
        ? `/statistics/categories?CompanyId=${CompanyId}`
        : "/statistics/categories"
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

  getAllServices: async (CompanyId, CategoryId) => {
    let url = "/statistics/services";

    if (!CompanyId && !CategoryId) {
      return HttpRequest.get(url);
    } else {
      const queryParams = [
        { name: "CompanyId", value: CompanyId },
        { name: "CategoryId", value: CategoryId },
      ];
      queryParams
        .filter((el) => el.value)
        .map((el, index) => {
          if (index === 0) {
            url = url + `?${el.name}=${el.value}`;
          } else {
            url = url + `&${el.name}=${el.value}`;
          }
        });
      return HttpRequest.get(url);
    }
  },

  getAllAges: async (ServiceId, CompanyId, CategoryId) => {
    let url = "/statistics/ages";

    if (!ServiceId && !CompanyId && !CategoryId) {
      return HttpRequest.get(url);
    } else {
      const queryParams = [
        { name: "ServiceId", value: ServiceId },
        { name: "CompanyId", value: CompanyId },
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
      return HttpRequest.get(url);
    }
  },

  getAllGenders: async (CompanyId, CategoryId, ServiceId) => {
    let url = "/statistics/genders";

    if (!CategoryId && !CompanyId && !ServiceId) {
      return HttpRequest.get(url);
    } else {
      const queryParams = [
        { name: "CompanyId", value: CompanyId },
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
      return HttpRequest.get(url);
    }
  },
};
