import { useQuery } from "react-query";
import { AppointmentService } from "../../../../services/dashboard/appointments/appointment.service";
import TableShared from "../../../../shared/table/TableShared";
import "./AppointmentStyle.scss";
import LoadingSpinner from "../../../../shared/loadingSpinner/LoadingSpinner";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Alert } from "@mui/material";

const appointmentHeaders = [
  "Profesional",
  "Fecha y Hora",
  "Tipo de Servicio",
  "Estado",
  "Contacto",
  "Acciones",
];

const Appointment = () => {
  const user = useSelector((state) => state.auth.auth.user);

  const {
    data: appointmentsById,
    isLoading,
    refetch: appointmentRefetch,
    isSuccess,
  } = useQuery(
    ["getAppointments"],
    () =>
      AppointmentService.getAppointments(user.providerId, user.collaboratorId),
    { retry: 2 }
  );
  const [cancel, setCancel] = useState();

  const { refetch: cancelAppointmentRefetch } = useQuery(
    ["cancelAppointment"],
    () => (cancel ? AppointmentService.cancelAppointment(cancel) : null)
  );

  const onEdit = () => {
    console.log("Edit");
  };

  const onDelete = (e) => {
    const id = e.target.value;
    setCancel(id);
    appointmentRefetch();
    cancelAppointmentRefetch();
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : isSuccess && !isLoading ? (
        <div className="appointment_table">
          <div className="appoiment-title">
            <h1>Citas Programadas</h1>
            <div className="appoiment-serchBar">
              <input
                id=""
                className="input-SearchBar"
                type="text"
                placeholder="Busca comentarios aquí"
              />
              <button
                className="button-SearchBar"
                onClick={() => {
                  console.log("TODO");
                }}
              >
                Buscar
              </button>
            </div>
          </div>

          <TableShared
            data={appointmentsById?.data || []}
            currentPage="Appointment"
            headers={appointmentHeaders}
            onEdit={onEdit}
            onDelete={onDelete}
          />
          {appointmentsById?.data?.length === 0 && (
            <Alert variant="filled" color="secondary" severity="info">
              Todavía no hay citas programadas, crea uno primero
            </Alert>
          )}
        </div>
      ) : (
        <Alert severity="error">No se pudieron cargar las citas</Alert>
      )}
    </>
  );
};

export default Appointment;
