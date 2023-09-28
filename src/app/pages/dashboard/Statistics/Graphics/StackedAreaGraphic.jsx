import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useQuery } from "react-query";
import { StatisticsServices } from "../../../../services/dashboard/statistics/statistics.services";
const data = [
  { time: "2023-01-01", uv: 4000, pv: 2400, amt: 2400 },
  { time: "2024-02-01", uv: 3000, pv: 1398, amt: 2210 },
  { time: "2025-03-01", uv: 2000, pv: 9800, amt: 2290 },
  { time: "2026-04-01", uv: 2780, pv: 3908, amt: 2000 },
  { time: "2027-05-01", uv: 1890, pv: 4800, amt: 2181 },
  { time: "2028-06-01", uv: 2390, pv: 3800, amt: 2500 },
  { time: "2029-07-01", uv: 3490, pv: 4300, amt: 2100 },
];

const StackedAreaGraphics = () => {
  const [timeScale, setTimeScale] = useState("day");

  const handleTimeScaleChange = (event) => {
    setTimeScale(event.target.value);
  };

  let tickCount = 10; // Default value
  if (timeScale === "month") {
    tickCount = 7; // Show around 7 ticks for months
  } else if (timeScale === "year") {
    tickCount = 5; // Show around 5 ticks for years
  }

  const [option, setOption] = React.useState("");

  const handleChangeOption = (event) => {
    setOption(event.target.value);
  };

  const { data: users } = useQuery(
    "getAllUsers",
    StatisticsServices.getAllUsers
  );

  // console.log(users.data.statistics.data.Colaborador);

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
          <MenuItem value="Colaborador">Colaborador</MenuItem>
          <MenuItem value="Empresa">Empresa</MenuItem>
          <MenuItem value="Colaborador">Profesional</MenuItem>
        </Select>
      </FormControl>
      <div style={{ m: 1, display: "flex", flexDirection: "row" }}>
        <p>Seleccione la escala de tiempo : </p>
        <select value={timeScale} onChange={handleTimeScaleChange}>
          <option value="day">Día</option>
          <option value="month">Mes</option>
          <option value="year">Año</option>
        </select>
      </div>
      <ResponsiveContainer width={400} height={300}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
            tickCount={tickCount}
            tickFormatter={(value) => {
              const date = new Date(value);
              if (timeScale === "day") {
                return date.toLocaleDateString();
              } else if (timeScale === "month") {
                return date.toLocaleDateString("default", { month: "short" });
              } else {
                return date.getFullYear().toString();
              }
            }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="uv"
            stackId="1"
            stroke="#8884d8"
            fill="#8884d8"
          />
          <Area
            type="monotone"
            dataKey="pv"
            stackId="1"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
          <Area
            type="monotone"
            dataKey="amt"
            stackId="1"
            stroke="#ffc658"
            fill="#ffc658"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StackedAreaGraphics;
