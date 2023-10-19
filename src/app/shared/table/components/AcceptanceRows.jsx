import PropTypes from "prop-types";
import React from "react";

const AcceptanceRows = ({ data, openModal }) => {
  // services colors: text: #00000099,  parent: #D9D9D9


  return (
    <>
      <div className="shared_table-body">
        {data?.map((appointment) => (
          <div className="row-table-container" key={appointment.id}>
            <div className="data-row-tag">
              <div className="imageName__wrapper">
                <img src={appointment.user.profilePic} alt="picture" />
                <p>{appointment.user.name}</p>
              </div>
            </div>
            <div className="data-row-tag">Servicios</div>
            <div className="data-row-tag">Sesiones agregadas</div>
            <div className="data-row-tag">Calificaciones</div>
            <div className="data-row-tag">{appointment.user.email}</div>
            <div className="data-row-tag data-row-actions">
              <button
                type="button"
                onClick={() => openModal(appointment)}
                className="action-button"
              >
                Ver documentación
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

AcceptanceRows.propTypes = {
  data: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default AcceptanceRows;
