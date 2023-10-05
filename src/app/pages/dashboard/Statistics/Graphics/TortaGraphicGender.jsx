import React, { useEffect, useState } from "react";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { StatisticsServices } from "../../../../services/dashboard/statistics/statistics.services";
import { useQuery } from "react-query";
import LoadingSpinner from "../../../../shared/loadingSpinner/LoadingSpinner";

const TortaGraphicGender = () => {
  const COLORS = ["#845f54", "#74635e", "#4d322b", "#AE7A6C"];
  const [category, setCategory] = React.useState(1);
  const [service, setService] = React.useState("");

  const {
    data: servicesFilter,
    refetch: servicesFilterRefetch,
    isLoading,
  } = useQuery(["getServices"], () => StatisticsServices.getServices());

  const {
    data: dataCategory,
    errors,
    refetch: categoriesRefetch,
    isLoading: isLoadingCategory,
  } = useQuery(["getAllCategory"], () => StatisticsServices.getAllCategory());

  const {
    data: gender,
    errorss,
    refetch: genderRefetch,
    isLoading: isLoadingGenders,
  } = useQuery(["getAllGenders"], () =>
    StatisticsServices.getAllGenders(category, service)
  );

  const handleChangeCategory = async (event) => {
    const selectedCategory = event.target.value;
    if (selectedCategory === "Todos") {
      await setCategory();
      categoriesRefetch();
      genderRefetch();
    } else {
      await setCategory(selectedCategory);
      categoriesRefetch();
      genderRefetch();
    }
  };

  const handleChangeService = async (event) => {
    const selectedService = event.target.value;
    if (selectedService === "Todos") {
      await setService();
      genderRefetch();
      servicesFilterRefetch();
    } else {
      await setService(selectedService);
      genderRefetch();
      servicesFilterRefetch();
    }
  };

  const genderData = gender?.data.map((item) => {
    const key = Object.keys(item)[0];
    const value = item[key];
    return { name: key, value };
  });

  return (
    <div>
      {isLoading || isLoadingCategory || isLoadingGenders ? (
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
              value={category}
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
              value={service}
              onChange={handleChangeService}
              label="Service"
            >
              <MenuItem value="Todos">Todos</MenuItem>
              {servicesFilter?.data.map((el) => {
                return (
                  <MenuItem key={el.id} value={el.id}>
                    <em>{el.name}</em>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <PieChart width={400} height={300}>
            <Pie
              data={genderData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#AE7A6C"
              label={({ name }) => name}
            >
              {genderData?.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </>
      )}
    </div>
  );
};

export default TortaGraphicGender;
