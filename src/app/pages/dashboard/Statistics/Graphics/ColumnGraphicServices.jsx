import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import { StatisticsServices } from "../../../../services/dashboard/statistics/statistics.services";
const ColumnGraphicServices = () => {
  const {
    data: categories,
    error,
    isLoading,
  } = useQuery("getAllCategories", StatisticsServices.getAllCategories);

  return (
    <div>
      <BarChart width={410} height={300} data={categories?.data}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid stroke="#ae7a6c8f" />
        <Tooltip />
        <Bar dataKey="count" fill="#AE7A6C" />
      </BarChart>
    </div>
  );
};

export default ColumnGraphicServices;
