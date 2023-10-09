import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
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
  onDelete,
  isCreateMode = false,
}) => {
  const handleClose = () => {
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
          />
        )}
      </DialogContent>
      <DialogActions className="service-modal-actions">
        {!isViewMode && <Button onClick={handleClose}>Cancelar</Button>}
        {onDelete && isViewMode && (
          <Button onClick={onDelete} className="color-secondary">
            Eliminar
          </Button>
        )}
        {isViewMode && (
          <Button onClick={handleClose} className="color-primary">
            Cerrar
          </Button>
        )}
      </DialogActions>
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
