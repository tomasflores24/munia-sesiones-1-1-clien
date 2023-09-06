import React from "react";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const TortaGraphicGender = () => {
  const dataTorta = [
    { name: "Hombre", value: 25 },
    { name: "Mujer", value: 12 },
    { name: "Otros", value: 5 },
  ];

  const COLORS = ["#845f54", "#74635e", "#4d322b", "#AE7A6C"];

  const [category, setCategory] = React.useState('');
  
  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const [service, setService] = React.useState('');
  
  const handleChangeService = (event) => {
    setService(event.target.value);
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Categorías</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={category}
          onChange={handleChangeCategory}
          label="Category"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Todos</MenuItem>
          <MenuItem value={20}>Map Categories</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Servicios</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={service}
          onChange={handleChangeService}
          label="Service"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Todos</MenuItem>
          <MenuItem value={20}>Map Categories</MenuItem>
        </Select>
      </FormControl>
      <PieChart width={300} height={300}>
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
