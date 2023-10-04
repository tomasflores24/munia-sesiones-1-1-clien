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

const StackedAreaGraphics = () => {
  const [timeScale, setTimeScale] = useState("");

  const handleTimeScaleChange = async (event) => {
    await setTimeScale(event.target.value);
    usersRefetch();
  };

  let tickCount = 10;
  if (timeScale === "month") {
    tickCount = 7;
  } else if (timeScale === "year") {
    tickCount = 5;
  }

  const [option, setOption] = React.useState("");

  const handleChangeOption = async (event) => {
    const selectedOption = event.target.value;
    await setOption(selectedOption);
    usersRefetch();
  };

  const { data: users, refetch: usersRefetch } = useQuery("getAllUsers", () =>
    StatisticsServices.getAllUsers(timeScale, option)
  );

  const formatDataForAreaChart = (data) => {
    const formattedData = [];
    const uniqueDates = [
      ...new Set(data?.flatMap((item) => item[Object.keys(item)].CreatedAt)),
    ];

    uniqueDates.forEach((date) => {
      const dateObj = { time: date };

      data.forEach((item) => {
        const category = Object.keys(item)[0];
        const createdAt = item[category].CreatedAt;
        const count = createdAt.filter((date) => date === dateObj.time).length;
        dateObj[category] = count;
      });

      formattedData.push(dateObj);
    });

    return formattedData;
  };
  const formattedData = formatDataForAreaChart(users?.data);

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
          <MenuItem value="">Todos</MenuItem>
          <MenuItem value="Colaborador">Colaborador</MenuItem>
          <MenuItem value="Empresa">Cliente</MenuItem>
          <MenuItem value="Profesional">Proveedor</MenuItem>
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
          data={formattedData}
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
            dataKey="Cliente"
            stackId="1"
            stroke="#8884d8"
            fill="#8884d8"
          />
          <Area
            type="monotone"
            dataKey="Colaborador"
            stackId="1"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
          <Area
            type="monotone"
            dataKey="Proveedor"
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
