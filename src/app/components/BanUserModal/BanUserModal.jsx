import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";

import "./BanUserModalStyle.scss";
import { useState } from "react";

const BanUserModal = ({ handleModal }) => {
  const [message, setMessage] = useState("");

  const onConfirm = () => {
    console.log(message);
  };

  return (
    <div className="modal__overlay">
      <div className="modal__root">
        <CloseIcon className="closeIcon" onClick={() => handleModal(false)} />
        <h2 className="title">Dar de baja proveedor</h2>
        <div className="modal__container">
          <section className="modal__body">
            <p className="subtitle">
              Esta accion es irreversibley eliminara al proveedor de nuestra
              base de datos cancelando todas sus citas agendadas
            </p>

            <p className="label">Breve descripcion de la baja</p>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="message"
              cols="20"
              rows="6"
              title="message"
            />
          </section>

          <button onClick={onConfirm} className="modal__btn">
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

BanUserModal.propTypes = {
  handleModal: PropTypes.func,
};

export default BanUserModal;
