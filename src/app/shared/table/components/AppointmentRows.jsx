import PropTypes from "prop-types";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Chip } from "@mui/material";
import { CancelOutlined } from "@mui/icons-material";
import { format } from "date-fns";
import ChangeCircleOutlinedIcon from "@mui/icons-material/ChangeCircleOutlined";

const AppointmentRows = ({ data, onEdit, onDelete }) => {
  return (
    <div>
      <div className="shared_table-body">
        {Array.isArray(data) ? (
          data.map((appointment, index) => (
            <div className="row-table-container" key={index}>
              <div className="data-row-tag">
                <img
                  style={{
                    width: "35%",
                    height: "100%",
                    borderRadius: "10px",
                    padding: "5px",
                  }}
                  src={appointment?.provider?.user?.profilePic}
                  alt="picture"
                />
                <p>{appointment?.provider?.user?.name}</p>
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
                      <h3>Disponible</h3>
                      <CheckCircleOutlineIcon fontSize="22" stroke="#068F1C" />
                    </div>
                  ) : appointment?.Available?.StatusId === 2 ? (
                    <div>
                      <h3>Terminado</h3>
                      <CheckCircleOutlineIcon fontSize="22" stroke="#068F1C" />
                    </div>
                  ) : appointment?.Available?.StatusId === 3 ? (
                    <div>
                      <h6>Cancelado{appointment?.Available?.StatusId}</h6>
                      <CancelOutlined fontSize="22" stroke="#FF0000" />
                    </div>
                  ) : appointment?.Available?.StatusId === 4 ? (
                    <div>
                      En Progreso
                      <ChangeCircleOutlinedIcon fontSize="80" stroke="yellow" />
                    </div>
                  ) : appointment?.Available?.StatusId === 5 ? (
                    <div>
                      <h3>No Disponible {appointment?.Available?.StatusId}</h3>
                      <CancelOutlined fontSize="22" stroke="#FF0000" />
                    </div>
                  ) : appointment?.Available?.StatusId === 6 ? (
                    <div>
                      <h3>En Aprobacion</h3>
                      <ChangeCircleOutlinedIcon fontSize="80" stroke="yellow" />
                    </div>
                  ) : appointment?.Available?.StatusId === 7 ? (
                    <div>
                      <h3>Confirmado</h3>
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
