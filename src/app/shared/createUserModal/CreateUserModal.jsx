import { Dialog, DialogContent } from "@mui/material";
import React from "react";

const CreateUserModal = ({ open, closeModal, onSubmit, isLoadingModal }) => {
  return (
    <Dialog open={open} onClose={closeModal}>
      <DialogContent>
        Hola mundo
        <button type="button" onClick={() => closeModal()}>
          Cerrar
        </button>
        <button type="button" onClick={() => onSubmit()}>
          Enviar
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserModal;
