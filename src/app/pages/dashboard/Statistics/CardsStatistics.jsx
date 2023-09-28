import "./CardsStatistics.scss";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import React from "react";
import { StatisticsServices } from "../../../services/dashboard/statistics/statistics.services";
import { useQuery } from "react-query";

const CardsStatistics = () => {
  const [company, setCompany] = React.useState("");

  const handleChange = (event) => {
    setCompany(event.target.value);
    console.log(company);
  };

  const { data: collaborators } = useQuery(
    ["getAllCollaborators"],
    StatisticsServices.getAllCollaborators
  );

  const { data: companies } = useQuery(
    ["getAllcompanies"],
    StatisticsServices.getAllCompanies
  );

  const { data: provider } = useQuery(
    ["getAllProvider"],
    StatisticsServices.getAllProvider
  );

  return (
    <div className="cards-container">
      <div className="card-top">
        <FormControl variant="standard" className="select__top">
          <InputLabel
            id="demo-simple-select-standard-label"
            className="select__p__top"
          >
            Seleccionar Asociación
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={company}
            onChange={handleChange}
            label="Company"
          >
            {companies?.data.allCompanies.map((company) => (
              <MenuItem key={company.id} value={company.id}>
                <em>{company.user.name}</em>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="card-header">
        <div className="card__value">25</div>
        <div className="card__title">Usuarios</div>
      </div>
      <div className="card-header">
        <div className="card__value">12</div>
        <div className="card__title">Citas programadas</div>
      </div>
      <div className="card-header">
        <div className="card__value__services">Higiene del sueño</div>
        <div className="card__title__services">Servicio mas utilizado</div>
      </div>
      <div className="card-header">
        <div className="card__value">4.0 - 5.0</div>
        <div className="card__title">Promedio de satisfacción general</div>
      </div>
      <p className="divisor-header-bottom">Información general</p>
      <div className="card-bottom">
        <div className="card__value">
          {collaborators?.data.allCollaborators.length}
        </div>
        <div className="card__title">Usuarios</div>
      </div>
      <div className="card-bottom">
        <div className="card__value">{companies?.data.allCompanies.length}</div>
        <div className="card__title">Clientes</div>
      </div>
      <div className="card-bottom">
        <div className="card__value">{provider?.data.allProvider.length}</div>
        <div className="card__title">Proveedores</div>
      </div>
    </div>
  );
};

export default CardsStatistics;
