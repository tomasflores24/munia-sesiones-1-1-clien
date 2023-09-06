import React from "react";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const ColumnGraphicAge = () => {
  const dataColumnas = [
    { service: "Servicio A", count: 50 },
    { service: "Servicio B", count: 70 },
    { service: "Servicio C", count: 30 },
    // ...otros servicios
  ];

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

export default ColumnGraphicAge;
