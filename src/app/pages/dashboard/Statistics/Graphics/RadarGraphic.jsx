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
  return (
    <div>
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
    </div>
  );
};

export default RadarGraphic;
