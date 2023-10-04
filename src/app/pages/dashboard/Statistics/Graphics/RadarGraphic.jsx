import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import { useQuery } from "react-query";
import { StatisticsServices } from "../../../../services/dashboard/statistics/statistics.services";

const RadarGraphic = () => {
  const [category, setCategory] = React.useState("");

  const { data: services, refetch: serviceRefetch } = useQuery(
    ["getAllServices"],
    () => StatisticsServices.getAllServices(category)
  );

  const {
    data: dataCategory,
    errors,
    refetch: refetchCategory,
  } = useQuery(["getAllCategory"], () => StatisticsServices.getAllCategory());

  const handleChange = async (event) => {
    const selectedCategory = event.target.value;
    console.log(selectedCategory);
    if (selectedCategory === "Todos") {
      await setCategory("");
      serviceRefetch();
      refetchCategory();
    } else {
      await setCategory(selectedCategory);
      serviceRefetch();
      refetchCategory();
    }
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
          label="Category"
        >
          <MenuItem value="Todos">Todos</MenuItem>
          {dataCategory &&
            dataCategory?.data !== undefined &&
            dataCategory.data.length > 0 &&
            dataCategory.data.map((el) => (
              <MenuItem key={el.id} value={el.id}>
                <em>{el.name}</em>
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <BarChart width={410} height={300} data={services?.data}>
        <XAxis dataKey="serviceName" />
        <YAxis />
        <CartesianGrid stroke="#ae7a6c8f" />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#AE7A6C" />
      </BarChart>
    </div>
  );
};

export default RadarGraphic;
