import React from "react";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { StatisticsServices } from "../../../../services/dashboard/statistics/statistics.services";
import { useQuery } from "react-query";

const TortaGraphicGender = () => {
  const dataTorta = [
    { name: "Hombre", value: 25 },
    { name: "Mujer", value: 12 },
    { name: "Otros", value: 5 },
  ];

  const COLORS = ["#845f54", "#74635e", "#4d322b", "#AE7A6C"];

  const [category, setCategory] = React.useState("Psicologia");

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const [service, setService] = React.useState("");

  const handleChangeService = (event) => {
    setService(event.target.value);
  };

  const {
    data: categories,
    error,
    isLoading,
  } = useQuery("getAllCategories", StatisticsServices.getAllCategories);

  const { data: services, isSucess } = useQuery(
    ["getAllServices"],
    StatisticsServices.getAllServices
  );

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
          {services?.data.map((el) => {
            return (
              <MenuItem key={el.serviceName} value={el.serviceName}>
                <em>{el.serviceName}</em>
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <PieChart width={400} height={300}>
        <Pie
          data={dataTorta}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#AE7A6C"
          label={({ name }) => name}
        >
          {dataTorta.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default TortaGraphicGender;
