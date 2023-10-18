import { Dialog, DialogTitle, DialogContent, Typography } from "@mui/material";
import PropTypes from "prop-types";
import "./CategoryModal.style.scss";
import CategoryForm from "../CategoryForm/CategoryForm";

const CategoryModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = {},
  isViewMode = false,
  isCreateMode = false,
}) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth="md"
      className="category-modal"
    >
      <DialogTitle className="category-modal-title">
        Crear Categoria
      </DialogTitle>
      <DialogContent className="category-modal-content">
        {isViewMode ? (
          <div>
            <Typography variant="h6">Nombre: {initialData.name}</Typography>
            <Typography variant="h6">
              Categoria: {initialData.CategoryId}
            </Typography>
          </div>
        ) : (
          <CategoryForm
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

CategoryModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  initialData: PropTypes.object,
  isViewMode: PropTypes.bool,
  onDelete: PropTypes.func,
  isCreateMode: PropTypes.bool,
};

export default CategoryModal;
