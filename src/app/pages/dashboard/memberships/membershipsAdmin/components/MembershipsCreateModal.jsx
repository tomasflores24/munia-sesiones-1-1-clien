import React, { useState } from "react";
import { Dialog, DialogContent, TextField } from "@mui/material";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import "./MembershipsCreateModal.scss";
const MembershipsCreateModal = ({
  openModal,
  closeModal,
  createMembrships,
}) => {
  const [memberships, setMemberships] = useState({
    name: "",
    amount: "",
    description: "",
  });

  const handleChange = (e) => {
    const { value, id } = e.target;
    setMemberships({
      ...memberships,
      [id]: value,
    });
  };

  const isDisabled =
    !memberships.name || !memberships.amount || !memberships.description;
  return (
    <div>
      <Dialog
        open={openModal}
        onClose={closeModal}
        className="createUserModal__root"
        maxWidth="md"
        sx={{ "& .MuiDialog-paper": { borderRadius: "25px" } }}
      >
        <DialogContent>
          <div className="create-membership-modal">
            <h2 className="membership-modal-title">Crear Membresía</h2>
            <TextField
              id="name"
              label="Nombre de la membresia"
              variant="standard"
              placeholder="Nombre de la membresia"
              className="textField-membership"
              onChange={handleChange}
            />
            <br />
            <TextField
              id="amount"
              label="Cantidad"
              variant="standard"
              placeholder="Cantidad"
              className="textField-membership"
              onChange={handleChange}
            />
            <h3 className="membership-modal-subtitles">Descripción</h3>
            <TextareaAutosize
              id="description"
              aria-label="minimum height"
              className="membership-modal-textarea"
              onChange={handleChange}
            />
          </div>
          <div className="container-button">
            <button
              onClick={(e) => createMembrships(e)}
              disabled={isDisabled}
              // className="membership-button"
              className={
                isDisabled ? "membership-button disabled" : "membership-button"
              }
            >
              Nueva membresía
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MembershipsCreateModal;
