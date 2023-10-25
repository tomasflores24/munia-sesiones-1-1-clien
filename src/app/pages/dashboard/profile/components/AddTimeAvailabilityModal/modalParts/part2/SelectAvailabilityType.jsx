import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { format, parseISO, isValid, setMonth } from "date-fns";
import {
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import "./SelectAvailabilityTypeStyle.scss";
import {
  calculateMonthMinDate,
  calculateWeekMinMaxDates,
} from "../../../../../../../utils/calendar";
import { useMutation } from "react-query";
import { AvailableService } from "../../../../../../../services/dashboard/available/available.service";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../../../../../shared/loadingSpinner/LoadingSpinner";

const SelectAvailabilityType = ({ closeModal }) => {
  const [minInterval, setMinInterval] = useState("");
  const [availabilityType, setAvailabilityType] = useState("");
  const [rangeDate, setRangeDate] = useState({ min: "", max: "" });
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [isError, setIsError] = useState(false);
  const providerId = useSelector((state) => state.auth.auth.user.providerId);
  const handleChangeTimeInterval = (event) => {
    setMinInterval(event.target.value);
  };

  const handleChangeAvailabilityType = ({ target: { value } }) => {
    if (value === "week") {
      setRangeDate(calculateWeekMinMaxDates());
    } else if (value === "month") {
      setRangeDate({ min: calculateMonthMinDate().min, max: "" });
    }
    setSelectedDate("");
    setAvailabilityType(value);
  };

  const handleChangeDate = (event) => {
    setSelectedDate(event.target.value);
  };

  const { mutateAsync, isLoading } = useMutation(
    ["createAvailability"],
    (data) => AvailableService.createAvailability(data),
    {
      onSuccess: async () => {
        toast.success("Se agrego la disponibilidad exitosamente");
        setTimeout(() => {
          
          closeModal();
        }, 3000);
      },
      onError: async () => {
        toast.error("Error al crear la disponibilidad");
      },
    }
  );

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!selectedDate || !minInterval) {
      setIsError(true);
      return;
    }
    const [year, month, day] = selectedDate.split("-");
    const isWeek = selectedDate.includes("W");
    const isDay = selectedDate.split("-").length === 3;
    await mutateAsync({
      ProviderId: providerId,
      year: +year,
      month: +month,
      interval: minInterval,
      ...(isDay && { day: +day }),
      ...(isWeek && { week: selectedDate.split("W").join("").concat("w") }),
    });
  };

  useEffect(() => {
    let isValidDate = false;
    let monthName = "";
    if (availabilityType === "week") {
      const result = parseISO(selectedDate + "-1");
      isValidDate = isValid(result);
      monthName = isValidDate ? format(result, "yyyy-MM") : "";
    } else {
      const monthNumber = selectedDate.split("-")?.[1];
      const dateWithMonth = setMonth(new Date(), monthNumber - 1);
      monthName = isValid(dateWithMonth)
        ? format(dateWithMonth, "yyyy-MM")
        : "";
    }
    setIsError(false);
    setSelectedMonth(monthName);
  }, [availabilityType, selectedDate]);

  return (
    <div className="selectAvailabilityType__root">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="selectAvailabilityType__header">
            <h2 className="title">Agregar Disponibilidad</h2>
            <CloseIcon className="closeIcon" onClick={closeModal} />
          </div>

          <form className="selectAvailabilityType__form" onSubmit={onSubmit}>
            <div className="form-header">
              <span className="desc">
                Seleccione el mes, año y intervalo entre sesiones
              </span>
            </div>

            <div className="form__content">
              <FormControl>
                <label id="month">Mes</label>
                <input
                  type="month"
                  min={rangeDate.min}
                  value={selectedMonth}
                  className="date__range"
                  disabled={availabilityType !== "month"}
                  onChange={handleChangeDate}
                />
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
                    id="availabilityType"
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
                    <MenuItem value="week">Semanal</MenuItem>
                    <MenuItem value="month">Mensual</MenuItem>
                  </Select>
                </FormControl>
                {availabilityType === "day" && (
                  <input
                    type="date"
                    className="date__range"
                    min={format(new Date(), "yyyy-MM-dd")}
                    onChange={handleChangeDate}
                  />
                )}
                {availabilityType === "week" && (
                  <input
                    type="week"
                    min={rangeDate.min}
                    max={rangeDate.max}
                    className="date__range"
                    onChange={handleChangeDate}
                  />
                )}
              </div>

              <FormControl size="small">
                <InputLabel id="timeInterval">Intervalo en minutos</InputLabel>
                <Select
                  labelId="timeInterval"
                  id="timeInterval"
                  value={minInterval}
                  label="Age"
                  onChange={handleChangeTimeInterval}
                  placeholder="Seleccione un intervalo"
                  variant="standard"
                >
                  <MenuItem value="" disabled>
                    <em>Selecione uno</em>
                  </MenuItem>
                  <MenuItem value={15}>15</MenuItem>
                  <MenuItem value={30}>30</MenuItem>
                  <MenuItem value={45}>45</MenuItem>
                  <MenuItem value={60}>60</MenuItem>
                </Select>
              </FormControl>
            </div>

            {isError && (
              <p className="form__error">Seleccione todos los campos</p>
            )}
            <section className="selectAvailabilityType__action-button">
              <button className={`continue__btn`} type="submit">
                Confirmar
              </button>
            </section>
          </form>
        </>
      )}
    </div>
  );
};

SelectAvailabilityType.propTypes = {
  nextStep: PropTypes.func,
  closeModal: PropTypes.func.isRequired,
};

export default SelectAvailabilityType;
