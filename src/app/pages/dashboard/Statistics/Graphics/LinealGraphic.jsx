import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const LinealGraphic = () => {
  const dataLineal = [
    { month: "Ene", users: 100, clients: 50, suppliers: 20 },
    { month: "Feb", users: 150, clients: 60, suppliers: 25 },
    { month: "Mar", users: 200, clients: 70, suppliers: 30 },
    // ...otros meses
  ];
  return (
    <div>
      <h2>Gráfico Lineal</h2>
      <LineChart width={400} height={300} data={dataLineal}>
        <XAxis dataKey="month" />
        <YAxis />
        <CartesianGrid stroke="#ccc" />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="users"
          stroke="#AE7A6C"
          name="Usuarios"
        />
        <Line
          type="monotone"
          dataKey="psychologists"
          stroke="#74635e"
          name="Psicólogos"
        />
        <Line
          type="monotone"
          dataKey="companies"
          stroke="#845f54"
          name="Empresas"
        />
      </LineChart>
    </div>
  );
};

export default LinealGraphic;
