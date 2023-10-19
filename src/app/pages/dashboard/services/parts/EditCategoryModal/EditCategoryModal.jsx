import React from "react";
import { Dialog, DialogTitle, DialogContent, Typography } from "@mui/material";
import EditCategoryForm from "../EditCategoryForm/EditCategoryForm";
import "./EditCategoryModal.style.scss";
const EditCategoryModal = ({
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
      className="edit-category-modal"
    >
      <DialogTitle className="category-modal-title">
        Editar Categoria
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
          <EditCategoryForm
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

export default EditCategoryModal;
