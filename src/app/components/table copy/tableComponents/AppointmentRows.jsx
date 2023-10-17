import PropTypes from "prop-types";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Chip } from "@mui/material";
import { CancelOutlined } from "@mui/icons-material";
import { format } from "date-fns";

const AppointmentRows = ({ data, onEdit, onDelete }) => {
  return (
    <div>
      <div className="shared_table-body">
        {Array.isArray(data) ? (
          data.map((appointment, index) => (
            <div className="row-table-container" key={index}>
              <div className="data-row-tag">
                <img src={appointment?.provider?.profilePic} alt="picture" />
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
                {appointment?.Available?.StatusId === 2 ? (
                  <div>
                    Confirmado
                    <CheckCircleOutlineIcon fontSize="22" stroke="#068F1C" />
                  </div>
                ) : (
                  <div>
                    Cancelado <CancelOutlined fontSize="22" stroke="#FF0000" />
                  </div>
                )}
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
