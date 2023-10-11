import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
} from "@mui/material";
import ServiceForm from "../ServiceForm/ServiceForm";
import PropTypes from "prop-types";
import "./ServiceModal.style.scss";

const ServiceModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = {},
  isViewMode = false,
  isCreateMode = false,
}) => {
  const handleClose = () => {
    console.log("comentario linea 23 handle")
    onClose();
  };

  const modalTitle = isCreateMode
    ? "Crear Servicio"
    : isViewMode
    ? "Ver Servicio"
    : "Editar Servicio";

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth="md"
      className="service-modal"
    >
      <DialogTitle className="service-modal-title">{modalTitle}</DialogTitle>
      <DialogContent className="service-modal-content">
        {isViewMode ? (
          <div>
            <Typography variant="h6">Nombre: {initialData.name}</Typography>
            <Typography variant="h6">
              Categoria: {initialData.CategoryId}
            </Typography>
          </div>
        ) : (
          <ServiceForm
            onSubmit={onSubmit}
            initialData={initialData}
              isCreateMode={isCreateMode}
              handleClose={handleClose}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

ServiceModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  initialData: PropTypes.object,
  isViewMode: PropTypes.bool,
  onDelete: PropTypes.func,
  isCreateMode: PropTypes.bool,
};

export default ServiceModal;
