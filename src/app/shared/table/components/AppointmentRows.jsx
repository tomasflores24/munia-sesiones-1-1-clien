import PropTypes from "prop-types";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Chip } from "@mui/material";
import { CancelOutlined } from "@mui/icons-material";
import { format } from "date-fns";
import ChangeCircleOutlinedIcon from "@mui/icons-material/ChangeCircleOutlined";
import { Link } from "react-router-dom";
const AppointmentRows = ({ data, onEdit, onDelete }) => {
  return (
    <div>
      <div className="shared_table-body">
        {Array.isArray(data) ? (
          data.map((appointment, index) => (
            <div className="row-table-container" key={index}>
              <div className="data-row-tag">
                <div className="imageName__wrapper">
                  <img
                    src={appointment?.provider?.user?.profilePic}
                    alt="picture"
                  />
                  <p>{appointment?.provider?.user?.name}</p>
                </div>
              </div>
              <div className="data-row-tag">
                {appointment?.Available?.startTime
                  ? format(
                      new Date(appointment?.Available?.startTime),
                      "dd/MM/yyyy HH:mm"
                    )
                  : null}
              </div>
              <div className="data-row-tag">
                <Chip
                  label={appointment?.service?.name}
                  size="small"
                  className="service-type"
                />
              </div>
              <div className="data-row-tag">
                <div>
                  {appointment?.Available?.StatusId === 1 ? (
                    <div>
                      Disponible
                      <CheckCircleOutlineIcon fontSize="22" stroke="#068F1C" />
                    </div>
                  ) : appointment?.Available?.StatusId === 2 ? (
                    <div>
                      Terminado
                      <CheckCircleOutlineIcon fontSize="22" stroke="#068F1C" />
                    </div>
                  ) : appointment?.Available?.StatusId === 3 ? (
                    <div>
                      Cancelado
                      <CancelOutlined fontSize="22" stroke="#FF0000" />
                    </div>
                  ) : appointment?.Available?.StatusId === 4 ? (
                    <div>
                      En Progreso
                      <ChangeCircleOutlinedIcon fontSize="80" stroke="yellow" />
                    </div>
                  ) : appointment?.Available?.StatusId === 5 ? (
                    <div>
                      No Disponible
                      <CancelOutlined fontSize="22" stroke="#FF0000" />
                    </div>
                  ) : appointment?.Available?.StatusId === 6 ? (
                    <div>
                      En Aprobacion
                      <ChangeCircleOutlinedIcon fontSize="80" stroke="yellow" />
                    </div>
                  ) : appointment?.Available?.StatusId === 7 ? (
                    <div>
                      Confirmado
                      <CheckCircleOutlineIcon fontSize="22" stroke="#068F1C" />
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="data-row-tag">
                {appointment?.provider?.user?.email}
              </div>
              <div className="data-row-tag data-row-actions">
                <button
                  type="button"
                  onClick={onEdit}
                  className="action-button"
                >
                  Reprogramar
                </button>

                {appointment?.Available?.StatusId === 3 ? null : (
                  <>
                    <button
                      type="button"
                      value={appointment?.id}
                      onClick={onDelete}
                      className="action-button"
                    >
                      Cancelar Cita
                    </button>
                    <Link to="/dashboard/endAppointment">
                      <button
                        type="button"
                        onClick={onEdit}
                        className="action-button"
                      >
                        Ir a la cita
                      </button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No hay datos disponibles.</p>
        )}
      </div>
    </div>
  );
};

AppointmentRows.propTypes = {
  data: PropTypes.array,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default AppointmentRows;
