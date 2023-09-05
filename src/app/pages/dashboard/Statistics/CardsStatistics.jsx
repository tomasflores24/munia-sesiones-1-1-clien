import "./CardsStatistics.scss";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const CardsStatistics = () => {
  return (
    <div className="cards-container">
      <div className="card_top">
        <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }}>
        <InputLabel id="demo-simple-select-standard-label">Seleccionar Asociación</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={'Todos'}
          onChange={'handleChange'}
          label="company"
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
        <div className="card__value">Higiene del sueño</div>
        <div className="card__title">Servicio mas utilizado</div>
      </div>
      <div className="card-header">
        <div className="card__value">4.0 - 5.0</div>
        <div className="card__title">Promedio de satisfacción general</div>
      </div>
      <div>
        <p>Información general</p>
      </div>
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
