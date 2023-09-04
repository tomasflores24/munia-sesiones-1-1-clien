import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

const ColumnGraphicAge = () => {
  const dataColumnas = [
    { service: "Servicio A", count: 50 },
    { service: "Servicio B", count: 70 },
    { service: "Servicio C", count: 30 },
    // ...otros servicios
  ];

  return (
    <div>
      <h2>Gráfico de Columnas - Ranking de Servicios</h2>
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
