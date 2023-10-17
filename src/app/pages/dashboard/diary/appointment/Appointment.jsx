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
  const user = useSelector((state) => state.auth.auth.user)
  const onEdit = () => {
    console.log("Edit");
  };
 
  
  const {
    data: appoimentsById,
    isLoading,
    refetch: appoimentRefetch,
    isSuccess
  } = useQuery(["getAppoiments"], () =>
    AppointmentService.getAppointments(user.providerId, user.collaboratorId)
  );

  const [cancel, setCancel] = useState();

  const {
    data: cancelAppointment,
    refetch: cancelAppointmentRefetch,
    isLoading: isLoadingCancelAppoiment,
  } = useQuery(["cancelAppointment"], () =>
    cancel ? AppointmentService.cancelAppointment(cancel) : null
  );

  const onDelete = (e) => {
    const id = e.target.value;
    console.log(id);
    setCancel(id);
    appoimentRefetch();
    cancelAppointmentRefetch();
  };
  
  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : isSuccess && !isLoading ?  (
        <div className="appointment_table">
          <div className="appoiment-title">
            <h1>Citas Programadas</h1>
            <div className="appoiment-serchBar">
              <input
                id=""
                className="input-SearchBar"
                type="text"
                placeholder="Busca comentarios aquí"
                value=""
                onChange=""
              />
              <button
                className="button-SearchBar"
                onClick={async () => {
                  ratingsRefetch();
                }}
              >
                Buscar
              </button>
            </div>
          </div>

          <TableShared
            data={appoimentsById?.data || []}
            currentPage="Appointment"
            headers={appointmentHeaders}
            onEdit={onEdit}
            onDelete={onDelete}
          />
          {appoimentsById?.data?.length === 0 && <Alert variant="filled" color="secondary" severity="info">Todavía no hay clientes, crea uno primero</Alert>}
        </div>
      ) : (
        <Alert severity="error">No se pudieron cargar los clientes</Alert>
      )}
    </>
  );
};

export default Appointment;
