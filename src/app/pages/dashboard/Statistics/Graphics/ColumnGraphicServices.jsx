import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

const ColumnGraphicServices = () => {
  const dataColumnas = [
    { service: "Servicio A", count: 50 },
    { service: "Servicio B", count: 70 },
    { service: "Servicio C", count: 30 },
    { service: "Servicio C", count: 40 },
    // ...otros servicios
  ];

  const [all , setAll] = React.useState('');
  
  const handleChangeAll = (event) => {
    setAll(event.target.value);
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Todos</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={all}
          onChange={handleChangeAll}
          label="All"
        >
          <MenuItem value="">
            <em>Todos</em>
          </MenuItem>
        </Select>
      </FormControl>
      <BarChart width={400} height={300} data={dataColumnas}>
        <XAxis dataKey="service" />
        <YAxis />
        <CartesianGrid stroke="#ae7a6c8f" />
        <Tooltip />
        <Bar dataKey="count" fill="#AE7A6C" />
      </BarChart>
    </div>
  );
};

export default ColumnGraphicServices;
