import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { useQuery } from "react-query";
import { StatisticsServices } from "../../../../services/dashboard/statistics/statistics.services";

const RadarGraphic = () => {
  const {
    data: categories,
    error,
    isLoading,
  } = useQuery("getAllCategories", StatisticsServices.getAllCategories);

  const { data: services, isSucess } = useQuery(
    ["getAllServices"],
    StatisticsServices.getAllServices
  );

  // const dataRadar = [
  //   {
  //     name: "Higiene del Sueño",
  //     value: 10,
  //   },
  //   {
  //     name: "Gestión de la Ansiedad",
  //     value: 4,
  //   },
  // {
  //   name: "Mindfulness",
  //   value: 0,
  // },
  // {
  //   name: "Relaciones de Pareja",
  //   value: 0,
  // },
  // {
  //   name: "Gestión de las Adicciones",
  //   value: 0,
  // },
  // {
  //   name: "Gestión Emocional",
  //   value: 0,
  // },
  // {
  //   name: "Gestión del Duelo",
  //   value: 0,
  // },
  // {
  //   name: "Gestión del Estrés",
  //   value: 0,
  // },
  // ];

  const [category, setCategory] = React.useState("todos");

  const handleChange = (event) => {
    setCategory(event.target.value);
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
          onChange={handleChange}
          label="Age"
        >
          <MenuItem value={"todos"}>Todos</MenuItem>

          {categories &&
            categories?.data.allCategories !== undefined &&
            categories.data.allCategories.length > 0 &&
            categories.data.allCategories.map((category) => (
              <MenuItem key={category.id} value={category.name}>
                <em>{category.name}</em>
              </MenuItem>
            ))}
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

export default RadarGraphic;
