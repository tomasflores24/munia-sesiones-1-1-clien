import React from "react";
import { Controller, useForm } from "react-hook-form";
import { TextField, Button, Grid } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import LoadingSpinner from "../../../../../shared/loadingSpinner/LoadingSpinner";
import { useQueryClient, useMutation } from "react-query";
import { ServiceServices } from "../../../../../services/dashboard/service/service.service";
import "./CategoryForm.style.scss";

const CategoryForm = ({ handleClose }) => {
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { name: "" },
  });

  const { mutate, isLoading: isLoadingCreate } = useMutation(
    ServiceServices.createCategory,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("categories");
        toast.success("¡Categoria creada con éxito!");
        setTimeout(() => {
          handleClose();
        }, 2000);
      },
      onError: (error) => {
        toast.error(
          error?.response?.data?.error || "Hubo un error al crear la categoría"
        );
      },
    }
  );

  const handleFormSubmit = (data) => {
    mutate(data);
  };

  return (
    <>
      {isLoadingCreate ? (
        <LoadingSpinner />
      ) : (
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="category-form"
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                rules={{ required: true }}
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Nombre de la categoria"
                    required
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    className="category-textfield"
                  />
                )}
              />
            </Grid>

            <div className="category-form-actions">
              <div item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  className="category-button-form"
                >
                  Crear
                </Button>
              </div>
              <div item xs={12}>
                <Button
                  onClick={handleClose}
                  variant="contained"
                  className="close-modal-btn"
                >
                  Cerrar
                </Button>
              </div>
            </div>
          </Grid>
        </form>
      )}
      <Toaster position="top-center" />
    </>
  );
};

export default CategoryForm;
