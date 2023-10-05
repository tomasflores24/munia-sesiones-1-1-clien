import React from "react";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import { useQuery } from "react-query";
import { StatisticsServices } from "../../../../services/dashboard/statistics/statistics.services";
import LoadingSpinner from "../../../../shared/loadingSpinner/LoadingSpinner";

const TortaGraphicAll = () => {
  const COLORS = ["#845f54", "#74635e", "#4d322b", "#AE7A6C"];

  const { data: users, isLoading } = useQuery(
    "getUsers",
    StatisticsServices.getUsers
  );

  const formattedData = users?.data.map((item) => {
    const userName = Object.keys(item)[0];
    const count = item[userName].Count;

    return {
      name: userName,
      count: count,
    };
  });

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <PieChart width={400} height={300}>
          <Pie
            data={formattedData}
            dataKey="count"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#AE7A6C"
            label={({ name }) => name}
          >
            {formattedData?.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      )}
    </div>
  );
};

export default TortaGraphicAll;
