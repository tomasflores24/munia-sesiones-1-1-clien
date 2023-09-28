import { Chip } from "@mui/material";
import PropTypes from "prop-types";

const CollaboratorsRows = ({ data, openModal }) => {
  // services colors: text: #00000099,  parent: #D9D9D9

  return (
    <>
      <div className="shared_table-body">
        {data?.map((collaborator) => (
          <div className="row-table-container" key={collaborator.id}>
            <div className="data-row-tag">
              <div className="imageName__wrapper">
                <img src={collaborator.user.profilePic} alt="picture" />
                <p>{collaborator.user.name}</p>
              </div>
            </div>
            <div className="data-row-tag">
              <Chip label="Servicios" size="small" className="service-type" />
            </div>
            <div className="data-row-tag">
              <button
                type="button"
                onClick={() => {
                  console.log("asignar sesiones");
                }}
                className="action-button"
              >
                Dar de baja
              </button>
              <p className="sessions_text">Sesiones restantes 20</p>
            </div>
            <div className="data-row-tag">
              <div className="comment_wrapper">
                <p className="comment">Comentario ...</p>
                <span className="rating">3.9/5.0</span>
              </div>
            </div>
            <div className="data-row-tag">{collaborator.user.email}</div>
            <div className="data-row-tag data-row-actions">
              <button
                type="button"
                onClick={() => {
                  window.scrollTo(0, 0);
                  console.log("here")
                  openModal(collaborator.id);
                }}
                className="action-button"
              >
                Dar de baja
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

CollaboratorsRows.propTypes = {
  data: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default CollaboratorsRows;
