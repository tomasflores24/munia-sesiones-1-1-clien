import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

const RadarGraphic = () => {
  const dataRadar = [
    {
      name: "Higiene del Sueño",
      value: 8,
    },
    {
      name: "Gestión de la Ansiedad",
      value: 8,
    },
    {
      name: "Mindfulness",
      value: 7,
    },
    {
      name: "Relaciones de Pareja",
      value: 5,
    },
    {
      name: "Gestión de las Adicciones",
      value: 7,
    },
    {
      name: "Gestión Emocional",
      value: 9.2,
    },
    {
      name: "Gestión del Duelo",
      value: 4,
    },
    {
      name: "Gestión del Estrés",
      value: 7,
    },
  ];

  const [category, setCategory] = React.useState('');
  
  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Categorías</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={category}
          onChange={handleChange}
          label="Age"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Todos</MenuItem>
          <MenuItem value={20}>Map Categories</MenuItem>
        </Select>
      </FormControl>
        <RadarChart
          cx={200}
          cy={150}
          outerRadius={120}
          width={350}
          height={300}
          data={dataRadar}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="name" />
          <Radar
            dataKey="value"
            stroke="#AE7A6C"
            fill="#AE7A6C"
            fillOpacity={0.6}
          />
        </RadarChart>
    </div>
  );
};

export default RadarGraphic;
