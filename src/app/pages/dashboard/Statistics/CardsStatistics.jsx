import "./CardsStatistics.scss";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React from "react";


const CardsStatistics = () => {

  const [company, setCompany] = React.useState('');

  const handleChange = (event) => {
    setCompany(event.target.value);
  };

  return (
    <div className="cards-container">
      <div className="card-top">
      <FormControl variant="standard" className="select__top" >
        <InputLabel id="demo-simple-select-standard-label" className="select__p__top">Seleccionar Asociación</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={company}
          onChange={handleChange}
          label="Company"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Todos</MenuItem>
          <MenuItem value={20}>Map Company</MenuItem>
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
        <div className="card__value">70</div>
        <div className="card__title">Usuarios</div>
      </div>
      <div className="card-bottom">
        <div className="card__value">10</div>
        <div className="card__title">Clientes</div>
      </div>
      <div className="card-bottom">
        <div className="card__value">4</div>
        <div className="card__title">Proveedores</div>
      </div>
    </div>
  );
};

export default CardsStatistics;
