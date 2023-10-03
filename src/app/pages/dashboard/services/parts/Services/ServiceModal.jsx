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
  title,
  initialData = {},
  isViewMode = false,
  onDelete,
}) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="md">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {isViewMode ? (
          <div>
            <Typography variant="h6">Nombre: {initialData.nombre}</Typography>
            <Typography variant="body1">
              Descripción: {initialData.descripcion}
            </Typography>
            <Typography variant="body1">
              Precio: {initialData.precio}
            </Typography>
            <Typography variant="body1">
              Duración: {initialData.duracion}
            </Typography>
            <Typography variant="body1">
              Categoría: {initialData.categoria}
            </Typography>
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
        {isViewMode && onDelete && (
          <Button onClick={onDelete} color="secondary">
            Eliminar
          </Button>
        )}
        {!isViewMode && (
          <Button type="submit" form="service-form" color="primary">
            Guardar
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
};
    

export default ServiceModal;
