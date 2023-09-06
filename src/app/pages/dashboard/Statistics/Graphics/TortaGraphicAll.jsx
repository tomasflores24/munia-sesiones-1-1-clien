import React from "react";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const TortaGraphicAll = () => {
  const dataTorta = [
    { name: "Usuarios", value: 500 },
    { name: "Psicólogos", value: 200 },
    { name: "Empresas", value: 100 },
  ];

  const COLORS = ["#845f54", "#74635e", "#4d322b", "#AE7A6C"];

  const [option, setOption] = React.useState('');
  
  const handleChangeOption = (event) => {
    setOption(event.target.value);
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Opciones</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={option}
          onChange={handleChangeOption}
          label="Option"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Map Options</MenuItem>
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

export default TortaGraphicAll;