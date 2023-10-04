import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import ServiceForm from "./ServiceForm";
import PropTypes from "prop-types";

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
  const actionButtonLabel = isCreateMode ? "Crear" : "Guardar";

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="md">
      <DialogTitle>{modalTitle}</DialogTitle>
      <DialogContent>
        {isViewMode ? (
          <div>
            <Typography variant="h6">Nombre: {initialData.name}</Typography>
            <Typography variant="h6">Categoria: {initialData.CategoryId}</Typography>
          </div>
        ) : (
          <ServiceForm onSubmit={onSubmit} initialData={initialData} />
        )}
      </DialogContent>
      <DialogActions>
        {!isViewMode && (
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
        )}
        {onDelete && isViewMode && (
          <Button onClick={onDelete} color="secondary">
            Eliminar
          </Button>
        )}
        {!isViewMode && (
          <Button type="submit" variant="contained" color="primary">
            {actionButtonLabel}
          </Button>
        )}
        {isViewMode && (
          <Button onClick={handleClose} color="primary">
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
