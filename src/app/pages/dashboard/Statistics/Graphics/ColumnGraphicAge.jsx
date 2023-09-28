import React from "react";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { useQuery } from "react-query";
import { useState } from "react";
import { StatisticsServices } from "../../../../services/dashboard/statistics/statistics.services";

const ColumnGraphicAge = () => {
  // const dataColumnas = [
  //   { service: "Servicio A", count: 50 },
  //   { service: "Servicio B", count: 70 },
  //   { service: "Servicio C", count: 30 },
  //   // ...otros servicios
  // ];

  const {
    data: categories,
    isLoading,
    error,
  } = useQuery("getAllCategories", StatisticsServices.getAllCategories);

  // const [statisticsServices, setStatisticsServices] = useState([]);

  const { data: services, isSucess } = useQuery(
    ["getAllServices"],
    StatisticsServices.getAllServices
  );

  // const [categories, setCategories] = React.useState([]);
  const [category, setCategory] = useState("Psicologia");
  const [service, setService] = useState("");

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleChangeService = (event) => {
    setService(event.target.value);
  };

  return (
    <div>
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
          <MenuItem value={10}>Todos</MenuItem>
          {categories?.data.allCategories &&
            categories.data.allCategories !== undefined &&
            categories.data.allCategories.length > 0 &&
            categories.data.allCategories.map((category) => (
              <MenuItem key={category.id} value={category.name}>
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
          <MenuItem value={10}>Todos</MenuItem>
          {services?.data.map((el) => {
            return (
              <MenuItem key={el.serviceName} value={el.serviceName}>
                <em>{el.serviceName}</em>
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <BarChart width={400} height={300} data={services?.data}>
        <XAxis dataKey="serviceName" />
        <YAxis />
        <CartesianGrid stroke="#ae7a6c8f" />
        <Tooltip />
        <Bar dataKey="count" fill="#AE7A6C" />
      </BarChart>
    </div>
  );
};

export default ColumnGraphicAge;
