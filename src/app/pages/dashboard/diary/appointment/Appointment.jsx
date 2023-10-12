import { useQuery } from "react-query";
import { AppointmentService } from "../../../../services/dashboard/appointments/appointment.service";
import TableShared from "../../../../shared/table/TableShared";
import "./AppointmentStyle.scss";
import LoadingSpinner from "../../../../shared/loadingSpinner/LoadingSpinner";
import { useSelector } from "react-redux";
import { useState } from "react";

const appointmentHeaders = [
  "Profesional",
  "Fecha y Hora",
  "Tipo de Servicio",
  "Estado",
  "Contacto",
  "Acciones",
];

const Appointment = () => {
  const userId = useSelector((state) => state.auth.auth.user.collaboratorId);
  console.log(userId);
  const onEdit = () => {
    console.log("Edit");
  };

  const {
    data: appoimentsById,
    isLoading,
    refetch: appoimentRefetch,
  } = useQuery(["getAppoiments"], () =>
    AppointmentService.getAppointments(userId)
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
      ) : (
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
            data={appoimentsById}
            currentPage="Appointment"
            headers={appointmentHeaders}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      )}
    </>
  );
};

export default Appointment;
