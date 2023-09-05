import { useState } from "react";
import CardProfesional from "./CardProfesional";

const CardsProfesionals = () => {
  const profesionales = [0];

  return (
    <section className="section2">
      {profesionales.map((profesional) => (
        <CardProfesional />
      ))}
    </section>
  );
};

export default CardsProfesionals;
