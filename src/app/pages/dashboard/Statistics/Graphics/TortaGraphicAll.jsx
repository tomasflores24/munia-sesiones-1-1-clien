import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";

const TortaGraphicAll = () => {
  const dataTorta = [
    { name: "Usuarios", value: 500 },
    { name: "Psicólogos", value: 200 },
    { name: "Empresas", value: 100 },
  ];

  const COLORS = ["#845f54", "#74635e", "#4d322b", "#AE7A6C"];

  return (
    <div>
      <h2>
        Gráfico de Torta - Distribución de Usuarios, Psicólogos y Empresas
      </h2>
      <PieChart width={400} height={300}>
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