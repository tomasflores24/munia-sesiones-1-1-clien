import React from "react";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useQuery } from "react-query";

import { StatisticsServices } from "../../../../services/dashboard/statistics/statistics.services";
import LoadingSpinner from "../../../../shared/loadingSpinner/LoadingSpinner";

const ColumnGraphicAge = ({
  company,
  categoryAges,
  serviceAges,
  setCategoryAges,
  setServiceAges,
}) => {
  const {
    data: servicesFilter,
    isLoading,
    refetch: servicesFilterRefecth,
  } = useQuery(["getServices"], () =>
    StatisticsServices.getServices(categoryAges)
  );

  const {
    data: dataCategory,
    errors,
    refetch: dataCategoryRefetch,
    isLoading: isLoadingCategory,
  } = useQuery(["getAllCategory"], () => StatisticsServices.getAllCategory());

  const {
    data: ages,
    refetch: agesRefetch,
    isLoading: isLoadingAges,
  } = useQuery(["getAllAges"], () =>
    StatisticsServices.getAllAges(serviceAges, company, categoryAges)
  );

  const handleChangeCategory = async (event) => {
    if (event.target.value === "Todos") {
      await setCategoryAges("");
      agesRefetch();
      dataCategoryRefetch();
      servicesFilterRefecth();
    } else {
      await setCategoryAges(event.target.value);
      agesRefetch();
      dataCategoryRefetch();
      servicesFilterRefecth();
    }
  };

  const handleChangeService = async (event) => {
    const { value } = event.target;
    await setServiceAges(value);
    dataCategoryRefetch();
    agesRefetch();
  };

  const formattedData = ages?.data
    .filter((item) => !item.ages)
    .map((item) => {
      const ageRange = Object.keys(item)[0];
      const ages = item[ageRange];
      return {
        años: ageRange,
        count: ages.length,
      };
    });

  return (
    <div>
      {isLoading || isLoadingCategory || isLoadingAges ? (
        <LoadingSpinner />
      ) : (
        <>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Categorías
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={categoryAges}
              onChange={handleChangeCategory}
              label="Category"
            >
              <MenuItem value="Todos">Todos</MenuItem>
              {dataCategory &&
                dataCategory?.data !== undefined &&
                dataCategory.data.length > 0 &&
                dataCategory.data.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    <em>{category.name}</em>
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Servicios
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={serviceAges}
              onChange={handleChangeService}
              label="Service"
            >
              <MenuItem value="">Todos</MenuItem>
              {servicesFilter?.data.map((el) => {
                return (
                  <MenuItem key={el.id} value={el.id}>
                    <em>{el.name}</em>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <BarChart width={400} height={300} data={formattedData}>
            <XAxis dataKey="años" />
            <YAxis />
            <CartesianGrid stroke="#ae7a6c8f" />
            <Tooltip />
            <Bar dataKey="count" fill="#AE7A6C" />
          </BarChart>
        </>
      )}
    </div>
  );
};

export default ColumnGraphicAge;
