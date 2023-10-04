import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "react-query";
import toast from "react-hot-toast";

import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";

import "./SelectHoursStyle.scss";
import { AppointmentService } from "../../../../services/dashboard/appointments/appointment.service";
import LoadingSpinner from "../../../../shared/loadingSpinner/LoadingSpinner";

const initialData = {
  mon: false,
  tue: false,
  wed: false,
  thu: false,
  fri: false,
  sat: false,
  sun: false,
  monStart: "",
  tueStart: "",
  wedStart: "",
  thuStart: "",
  friStart: "",
  satStart: "",
  sunStart: "",
  monEnd: "",
  tueEnd: "",
  wedEnd: "",
  thuEnd: "",
  friEnd: "",
  satEnd: "",
  sunEnd: "",
};

const SelectHours = ({ closeModal, nextStep, provider, loadingProvider }) => {
  const [allStartValue, setAllStartValue] = useState("");
  const [allEndValue, setAllEndValue] = useState("");

  const {
    formState: { isValid },
    register,
    reset,
    handleSubmit,
    watch,
    control,
  } = useForm({ defaultValues: initialData });

  const handleAllEndChange = (event) => {
    const watchMon = watch("mon");
    const watchTue = watch("tue");
    const watchWed = watch("wed");
    const watchThu = watch("thu");
    const watchFri = watch("fri");
    const watchSat = watch("sat");
    const watchSun = watch("sun");
    const newValue = event.target.value;
    reset({
      mon: watchMon,
      tue: watchTue,
      wed: watchWed,
      thu: watchThu,
      fri: watchFri,
      sat: watchSat,
      sun: watchSun,
      monEnd: watchMon ? newValue : "",
      tueEnd: watchTue ? newValue : "",
      wedEnd: watchWed ? newValue : "",
      thuEnd: watchThu ? newValue : "",
      friEnd: watchFri ? newValue : "",
      satEnd: watchSat ? newValue : "",
      sunEnd: watchSun ? newValue : "",
    });
    setAllEndValue(newValue);
  };

  const handleAllStartChange = (event) => {
    const watchMon = watch("mon");
    const watchTue = watch("tue");
    const watchWed = watch("wed");
    const watchThu = watch("thu");
    const watchFri = watch("fri");
    const watchSat = watch("sat");
    const watchSun = watch("sun");
    const newValue = event.target.value;
    setAllStartValue(newValue);
    reset({
      mon: watchMon,
      tue: watchTue,
      wed: watchWed,
      thu: watchThu,
      fri: watchFri,
      sat: watchSat,
      sun: watchSun,
      monStart: watchMon ? newValue : "",
      tueStart: watchTue ? newValue : "",
      wedStart: watchWed ? newValue : "",
      thuStart: watchThu ? newValue : "",
      friStart: watchFri ? newValue : "",
      satStart: watchSat ? newValue : "",
      sunStart: watchSun ? newValue : "",
    });
  };

  const { mutate } = useMutation(
    ["updateSchedule"],
    AppointmentService.updateAppointment,
    {
      onSuccess: () => {
        toast.success("Se ha actualizado la disponibilidad exitosamente");
        nextStep();
      },
      onError: () => {
        toast.error("Ha ocurrido un error");
      },
    }
  );

  const onSubmit = (values) => {
    mutate({ providerId: provider.id, body: values });
  };

  useEffect(() => {
    if (provider) {
      reset({
        mon: provider.mon,
        tue: provider.tue,
        wed: provider.wed,
        thu: provider.thu,
        fri: provider.fri,
        sat: provider.sat,
        sun: provider.sun,
        monStart: provider.monStart,
        tueStart: provider.tueStart,
        wedStart: provider.wedStart,
        thuStart: provider.thuStart,
        friStart: provider.friStart,
        satStart: provider.satStart,
        sunStart: provider.sunStart,
        monEnd: provider.monEnd,
        tueEnd: provider.tueEnd,
        wedEnd: provider.wedEnd,
        thuEnd: provider.thuEnd,
        friEnd: provider.friEnd,
        satEnd: provider.satEnd,
        sunEnd: provider.sunEnd,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider]);

  return (
    <div className="selectHours__root">
      <div className="selectHours__header">
        <h2 className="title">Agregar Disponibilidad</h2>
        <CloseIcon className="closeIcon" onClick={closeModal} />
      </div>
      <form className="selectHours__body" onSubmit={handleSubmit(onSubmit)}>
        <div className="body-header">
          <h3 className="subtitle">Horas Global</h3>
          <span className="desc">
            Solo se agregará la hora global a los campos que esten chequeados
          </span>
        </div>
        <section className="selectHours__form">
          {/* los checkboxes de lso 7 dias de la semana */}
          <div className="form__all-select">
            <label htmlFor="allStart">
              Inicio de jornada
              <input
                type="time"
                className=""
                id="allStart"
                name="allStart"
                value={allStartValue}
                onChange={handleAllStartChange}
              />
            </label>
            <span className="separator" />
            <label htmlFor="allEnd">
              <input
                type="time"
                className=""
                id="allEnd"
                name="allEnd"
                value={allEndValue}
                onChange={handleAllEndChange}
              />
              Final de jornada
            </label>
          </div>

          {loadingProvider ? (
            <LoadingSpinner />
          ) : (
            <section className="form__daysOfWeek">
              <div className="dayOfWeek">
                <label className="title" htmlFor="mon">
                  Lunes
                  <Controller
                    name="mon"
                    control={control}
                    render={({ field }) => (
                      <>
                        <input type="checkbox" id="mon" {...field} />
                        {field.value ? (
                          <CheckCircleOutlineIcon className="checked" />
                        ) : (
                          <CancelIcon className="cancel" />
                        )}
                      </>
                    )}
                  />
                </label>
                <div className="select__hour-container">
                  <input
                    type="time"
                    className="hours-active ml"
                    id=""
                    {...register("monStart")}
                  />
                  <span className="separator" />
                  <input
                    type="time"
                    className="hours-active next"
                    id=""
                    {...register("monEnd")}
                  />
                </div>
              </div>
              <div className="dayOfWeek">
                <label className="title">
                  Martes
                  <Controller
                    name="tue"
                    control={control}
                    render={({ field }) => (
                      <>
                        <input type="checkbox" id="tue" {...field} />
                        {field.value ? (
                          <CheckCircleOutlineIcon className="checked" />
                        ) : (
                          <CancelIcon className="cancel" />
                        )}
                      </>
                    )}
                  />
                </label>
                <div className="select__hour-container">
                  <input
                    type="time"
                    className="hours-active ml"
                    id=""
                    {...register("tueStart")}
                  />
                  <span className="separator" />
                  <input
                    type="time"
                    className="hours-active next"
                    id=""
                    {...register("tueEnd")}
                  />
                </div>
              </div>
              <div className="dayOfWeek">
                <label className="title">
                  Miércoles
                  <Controller
                    name="wed"
                    control={control}
                    render={({ field }) => (
                      <>
                        <input type="checkbox" id="wed" {...field} />
                        {field.value ? (
                          <CheckCircleOutlineIcon className="checked" />
                        ) : (
                          <CancelIcon className="cancel" />
                        )}
                      </>
                    )}
                  />
                </label>
                <div className="select__hour-container">
                  <input
                    type="time"
                    className="hours-active ml"
                    id=""
                    {...register("wedStart")}
                  />
                  <span className="separator" />
                  <input
                    type="time"
                    className="hours-active next"
                    id=""
                    {...register("wedEnd")}
                  />
                </div>
              </div>
              <div className="dayOfWeek">
                <label className="title">
                  Jueves
                  <Controller
                    name="thu"
                    control={control}
                    render={({ field }) => (
                      <>
                        <input type="checkbox" id="thu" {...field} />
                        {field.value ? (
                          <CheckCircleOutlineIcon className="checked" />
                        ) : (
                          <CancelIcon className="cancel" />
                        )}
                      </>
                    )}
                  />
                </label>
                <div className="select__hour-container">
                  <input
                    type="time"
                    className="hours-active ml"
                    id=""
                    {...register("thuStart")}
                  />
                  <span className="separator" />
                  <input
                    type="time"
                    className="hours-active next"
                    id=""
                    {...register("thuEnd")}
                  />
                </div>
              </div>
              <div className="dayOfWeek">
                <label className="title">
                  Viernes
                  <Controller
                    name="fri"
                    control={control}
                    render={({ field }) => (
                      <>
                        <input type="checkbox" id="fri" {...field} />
                        {field.value ? (
                          <CheckCircleOutlineIcon className="checked" />
                        ) : (
                          <CancelIcon className="cancel" />
                        )}
                      </>
                    )}
                  />
                </label>
                <div className="select__hour-container">
                  <input
                    type="time"
                    className="hours-active ml"
                    id=""
                    {...register("friStart")}
                  />
                  <span className="separator" />
                  <input
                    type="time"
                    className="hours-active next"
                    id=""
                    {...register("friEnd")}
                  />
                </div>
              </div>
              <div className="dayOfWeek">
                <label className="title">
                  Sábado
                  <Controller
                    name="sat"
                    control={control}
                    render={({ field }) => (
                      <>
                        <input type="checkbox" id="sat" {...field} />
                        {field.value ? (
                          <CheckCircleOutlineIcon className="checked" />
                        ) : (
                          <CancelIcon className="cancel" />
                        )}
                      </>
                    )}
                  />
                </label>
                <div className="select__hour-container">
                  <input
                    type="time"
                    className="hours-active ml"
                    id=""
                    {...register("satStart")}
                  />
                  <span className="separator" />
                  <input
                    type="time"
                    className="hours-active next"
                    id=""
                    {...register("satEnd")}
                  />
                </div>
              </div>
              <div className="dayOfWeek">
                <label className="title">
                  Domingo
                  <Controller
                    name="sun"
                    control={control}
                    render={({ field }) => (
                      <>
                        <input type="checkbox" id="sun" {...field} />
                        {field.value ? (
                          <CheckCircleOutlineIcon className="checked" />
                        ) : (
                          <CancelIcon className="cancel" />
                        )}
                      </>
                    )}
                  />
                </label>
                <div className="select__hour-container">
                  <input
                    type="time"
                    className="hours-active ml"
                    id=""
                    {...register("sunStart")}
                  />
                  <span className="separator" />
                  <input
                    type="time"
                    className="hours-active next"
                    id=""
                    {...register("sunEnd")}
                  />
                </div>
              </div>
            </section>
          )}
        </section>

        <section className="selectHours__action-button">
          <button
            className={`continue__btn ${isValid && "disabled"}`}
            type="submit"
          >
            Continuar
          </button>
        </section>
      </form>
    </div>
  );
};

SelectHours.propTypes = {
  nextStep: PropTypes.func,
  closeModal: PropTypes.func.isRequired,
  provider: PropTypes.object,
  loadingProvider: PropTypes.bool,
};

export default SelectHours;
