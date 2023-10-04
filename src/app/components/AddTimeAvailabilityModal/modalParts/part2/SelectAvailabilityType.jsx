import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
  format,
  parseISO,
  isValid,
  setMonth,
} from "date-fns";
import {
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import "./SelectAvailabilityType.Style.scss";
import {
  calculateMonthMinDate,
  calculateWeekMinMaxDates,
} from "../../../../utils/calendar";

const SelectAvailabilityType = ({ closeModal }) => {
  const [timeInterval, setTimeInterval] = useState("");
  const [availabilityType, setAvailabilityType] = useState("");
  const [rangeDate, setRangeDate] = useState({ min: "", max: "" });
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  const handleChangeTimeInterval = (event) => {
    setTimeInterval(event.target.value);
  };

  const handleChangeAvailabilityType = (event) => {
    const value = event.target.value;
    const weekMinMaxDates = calculateWeekMinMaxDates();
    if (value === "week") {
      setRangeDate(weekMinMaxDates);
      setSelectedDate(weekMinMaxDates.min);
    } else if (value === "weekly") {
      setRangeDate(weekMinMaxDates);
    } else if (value === "month") {
      setRangeDate({ min: calculateMonthMinDate().min, max: "" });
    }
    setAvailabilityType(event.target.value);
  };

  const handleChangeDate = (event) => {
    setSelectedDate(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    console.log({
      selectedDate,
      selectedMonth,
      timeInterval,
      year: selectedDate.split("-")[0],
    });
  };

  useEffect(() => {
    let isValidDate = false;
    let monthName = "";
    if (availabilityType === "weekly" || availabilityType === "week") {
      const result = parseISO(selectedDate + "-1");
      isValidDate = isValid(result);
      monthName = isValidDate ? format(result, "MMMM") : "";
    } else {
      const monthNumber = selectedDate.split("-")?.[1];
      const dateWithMonth = setMonth(new Date(0), monthNumber - 1);
      monthName = isValid(dateWithMonth) ? format(dateWithMonth, "MMMM") : "";
    }

    setSelectedMonth(monthName);
  }, [availabilityType, selectedDate]);

  return (
    <div className="selectAvailabilityType__root">
      <div className="selectAvailabilityType__header">
        <h2 className="title">Agregar Disponibilidad</h2>
        <CloseIcon className="closeIcon" onClick={closeModal} />
      </div>

      <form className="selectAvailabilityType__body" onSubmit={onSubmit}>
        <div className="body-header">
          <span className="desc">
            Seleccione el mes, año y intervalo entre sesiones
          </span>
        </div>

        <div className="body__content">
          <FormControl size="small" variant="standard">
            <InputLabel id="">Mes</InputLabel>
            <Input value={selectedMonth} readOnly />
          </FormControl>
          <FormControl size="small" variant="standard">
            <InputLabel id="">Año</InputLabel>
            <Input value={selectedDate.split("-")[0]} readOnly />
          </FormControl>
          <div className="flex">
            <FormControl size="small" sx={{ minWidth: 120 }} fullWidth>
              <InputLabel id="availabilitySelect">
                Tipo de disponibilidad
              </InputLabel>
              <Select
                labelId="availabilitySelect"
                id="demo-select-small"
                value={availabilityType}
                label="Age"
                onChange={handleChangeAvailabilityType}
                placeholder="Seleccione tipo de disponibilidad"
                variant="standard"
              >
                <MenuItem value="" disabled>
                  <em>Selecione uno</em>
                </MenuItem>
                <MenuItem value="day">Para un dia</MenuItem>
                <MenuItem value="week">{`${
                  new Date().getDay() <= 1
                    ? "Para esta semana"
                    : "Para la siguiente semana"
                } `}</MenuItem>
                <MenuItem value="weekly">Semanal</MenuItem>
                <MenuItem value="month">Todo El mes</MenuItem>
              </Select>
            </FormControl>
            {availabilityType === "day" && (
              <DateInput
                type="date"
                min={format(new Date(), "yyyy-MM-dd")}
                onChange={handleChangeDate}
              />
            )}
            {availabilityType === "week" && (
              <DateInput type="week" value={selectedDate} disabled />
            )}
            {availabilityType === "weekly" && (
              <DateInput
                type="week"
                min={rangeDate.min}
                max={rangeDate.max}
                onChange={handleChangeDate}
              />
            )}
            {availabilityType === "month" && (
              <DateInput
                type="month"
                min={rangeDate.min}
                onChange={handleChangeDate}
              />
            )}
          </div>

          <FormControl size="small">
            <InputLabel id="timeInterval">Intervalo en minutos</InputLabel>
            <Select
              labelId="timeInterval"
              id="demo-select-small"
              value={timeInterval}
              label="Age"
              onChange={handleChangeTimeInterval}
              placeholder="Seleccione un intervalo"
              variant="standard"
            >
              <MenuItem value="" disabled>
                <em>Selecione uno</em>
              </MenuItem>
              <MenuItem value={10}>15</MenuItem>
              <MenuItem value={30}>30</MenuItem>
              <MenuItem value={45}>45</MenuItem>
              <MenuItem value={60}>60</MenuItem>
            </Select>
          </FormControl>
        </div>

        <section className="selectAvailabilityType__action-button">
          <button className={`continue__btn`} type="submit">
            Confirmar
          </button>
        </section>
      </form>
    </div>
  );
};

// eslint-disable-next-line react/prop-types
function DateInput({ type, min, max, onChange, ...props }) {
  return (
    <input
      type={type}
      className="date__range"
      min={min}
      max={max}
      onChange={onChange}
      {...props}
    />
  );
}

SelectAvailabilityType.propTypes = {
  nextStep: PropTypes.func,
  closeModal: PropTypes.func.isRequired,
};

export default SelectAvailabilityType;
