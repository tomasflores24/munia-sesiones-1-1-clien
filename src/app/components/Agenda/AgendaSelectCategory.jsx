import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";

const AgendaSelectCategory = () => {
  const categories = ["Psicologia", "Coaching", "Nutricion", "Finanzas"];
  const services = [
    "Gestión de la ansiedad",
    "Gestion del estres",
    "Gestión del duelo",
    "Gestión emocional",
    "Gestión de las adicciones",
    "Relaciones de pareja",
    "Mindfulness",
    "Comunicación asertiva",
    "Coaching de vida y/o objetivos personales",
    "Coaching en liderazgo",
    "Coaching para trabajar en equipo",
    "Higiene del sueño",
    "Nutrición y/o trastornos alimenticios",
    "Asesoría financiera",
  ];
  const [optionSelected, setOptionSelected] = useState("");
  const [categoryIsActive, setCategoryIsActive] = useState(false);
  const [optionSelectedServ, setOptionSelectedServ] = useState("");
  const [categoryIsActiveServ, setCategoryIsActiveServ] = useState(false);
  return (
    <div className="calendar category">
      <div className="category1">
        <button
          className="category__select"
          onClick={() => setCategoryIsActive(!categoryIsActive)}
        >
          Seleccionar categoria
          <KeyboardArrowDownIcon className="arrowIcon" />
        </button>

        {categoryIsActive && (
          <ul className="category__option">
            {categories.map((category) => (
              <option
                className="category__li"
                value={category}
                onClick={(e) => {
                  setCategoryIsActive(false);
                  setOptionSelected(e.target.value);
                }}
              >
                {category}
              </option>
            ))}
          </ul>
        )}

        <p className="optionSelected">{optionSelected}</p>
      </div>{" "}
      <div className="category1 category2">
        <button
          className={
            optionSelected ? "category__select" : "category__select--disabled"
          }
          onClick={() => setCategoryIsActiveServ(!categoryIsActiveServ)}
          disabled={optionSelected ? false : true}
        >
          Seleccionar servicio
          <KeyboardArrowDownIcon className="arrowIcon" />
        </button>

        {categoryIsActiveServ && (
          <ul className="category__option category__option--services">
            {services.map((service) => (
              <option
                className="category__li"
                value={service}
                onClick={(e) => {
                  setCategoryIsActiveServ(false);
                  setOptionSelectedServ(e.target.value);
                }}
              >
                {service}
              </option>
            ))}
          </ul>
        )}

        <p className="optionSelected">{optionSelectedServ}</p>
      </div>
      {/* <div className="category__select">
        Seleccionar servicio
        <KeyboardArrowDownIcon className="arrowIcon" />
      </div> */}
    </div>
  );
};

export default AgendaSelectCategory;
