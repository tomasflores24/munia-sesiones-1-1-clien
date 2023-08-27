import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from "recharts";

import "./Statistics.scss";
import CardsStatistics from "./CardsStatistics";
import LayoutDashboard from "../../pages/dashboard/Layout/LayoutDashboard";

const dataLineal = [
  { name: "Ene", value: 100 },
  { name: "Feb", value: 200 },
  { name: "Mar", value: 150 },
  // ...otros datos
];

const dataColumnas = [
  { name: "Servicio A", count: 50 },
  { name: "Servicio B", count: 70 },
  { name: "Servicio C", count: 30 },
  // ...otros datos
];

const dataTorta = [
  { name: "Servicio A", value: 25 },
  { name: "Servicio B", value: 35 },
  { name: "Servicio C", value: 15 },
  { name: "Servicio D", value: 15 },
  // ...otros datos
];
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
    value: 9,
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

const COLORS = ["#845f54", "#74635e", "#4d322b", "#AE7A6C"];

const Statistics = () => {
  return (
    <LayoutDashboard>
      <div className="statistics-container">
        <div className="statistics-graphics-container">
          {/* <h1>Graficos</h1> */}
          <section className="section-graphics">
            <h2>Gráfico Lineal</h2>
            <LineChart width={400} height={300} data={dataLineal}>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid stroke="#ccc" />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#AE7A6C" />
            </LineChart>
          </section>

          <section className="section-graphics">
            <h2>Gráfico de Columnas - Ranking de Servicios</h2>
            <BarChart width={400} height={300} data={dataColumnas}>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid stroke="#ae7a6c8f" />
              <Tooltip />
              <Bar dataKey="count" fill="#AE7A6C" />
            </BarChart>
          </section>

          <section className="section-graphics">
            <h2>Gráfico de Torta</h2>
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
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </section>
          <section className="section-graphics">
            <h2>Gráfico de Radar</h2>
            <RadarChart
              cx={200}
              cy={150}
              outerRadius={120}
              width={400}
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
          </section>
        </div>
        <CardsStatistics />
      </div>
    </LayoutDashboard>
  );
};

export default Statistics;
