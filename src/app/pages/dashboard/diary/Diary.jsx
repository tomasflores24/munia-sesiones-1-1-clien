import {
  informations,
} from "../../../Models/tablesDashboard/tableDiaryModel";
import TableShared from "../../../shared/table/TableShared";
import './AppointmentStyle.scss'

const appointmentHeaders = [
  "Profesional",
  "Fecha y Hora",
  "Tipo de Servicio",
  "Estado",
  "Contacto",
  "Acciones"
]

const Appointment = () => {
  const onEdit = () => {
    console.log("Edit")
  }

  const onDelete = () => {
    console.log("Delete")
  }

  return (
      <div className="appointment_table">
        <TableShared
          data={informations}
          currentPage="Appointment"
          headers={appointmentHeaders}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    )
};

export default Appointment;
