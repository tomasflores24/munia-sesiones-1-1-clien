import "./CardsStatistics.scss";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import React from "react";
import { StatisticsServices } from "../../../services/dashboard/statistics/statistics.services";
import { useQuery } from "react-query";

const CardsStatistics = () => {
  const [company, setCompany] = React.useState(
    "4ec50719-1919-41fe-96ed-7e2070e2d5e9"
  );

  const { data: collaborators } = useQuery(
    ["getAllCollaborators"],
    StatisticsServices.getAllCollaborators
  );

  const { data: companies, refetch: companiesRefetch } = useQuery(
    ["getAllcompanies"],
    StatisticsServices.getAllCompanies
  );
  const { data: provider } = useQuery(
    ["getAllProvider"],
    StatisticsServices.getAllProvider
  );

  const { data: general, refetch: generalRefetch } = useQuery(
    ["getAllGeneral"],
    () => StatisticsServices.getAllGeneral(company)
  );

  const handleChange = async (event) => {
    await setCompany(event.target.value);
    companiesRefetch();
    generalRefetch();
  };

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
            {companies?.data.map((company) => (
              <MenuItem key={company.id} value={company.id}>
                <em>{company.user.name}</em>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="card-header">
        <div className="card__value">{general?.data.totalUsers}</div>
        <div className="card__title">Usuarios</div>
      </div>
      <div className="card-header">
        <div className="card__value">{general?.data.totalAppointments}</div>
        <div className="card__title">Citas programadas</div>
      </div>
      <div className="card-header">
        <div className="card__value__services">
          {general?.data.mostUsedService}
        </div>
        <div className="card__title__services">Servicio mas utilizado</div>
      </div>
      <div className="card-header">
        <div className="card__value">{general?.data.averageRating}</div>
        <div className="card__title">Promedio de satisfacción general</div>
      </div>
      <p className="divisor-header-bottom">Información general</p>
      <div className="card-bottom">
        <div className="card__value">{collaborators?.data.length}</div>
        <div className="card__title">Usuarios</div>
      </div>
      <div className="card-bottom">
        <div className="card__value">{companies?.data?.length}</div>
        <div className="card__title">Clientes</div>
      </div>
      <div className="card-bottom">
        <div className="card__value">{provider?.data.length}</div>
        <div className="card__title">Proveedores</div>
      </div>
    </div>
  );
};

export default CardsStatistics;
