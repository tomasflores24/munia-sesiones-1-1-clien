import React from "react";
import "./ServiceForm.style.scss";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import PropTypes from "prop-types";
import { useMutation, useQuery, useQueryClient } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ServiceServices } from "../../../../../services/dashboard/service/service.service";
import LoadingSpinner from "../../../../../shared/loadingSpinner/LoadingSpinner";

const serviceSchema = yup.object({
  name: yup.string().required("El nombre es requerido"),
  CategoryId: yup.number().required("La categoría es requerida"),
});

const ServiceForm = ({ initialData = {}, isCreateMode, handleClose }) => {
  const { data: categories, isLoading } = useQuery(
    "categories",
    ServiceServices.getAllCategory
  );
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(serviceSchema),
    defaultValues: isCreateMode
      ? { name: "", CategoryId: 1 }
      : { name: initialData.name, CategoryId: initialData.CategoryId },
  });

  const queryClient = useQueryClient();

  const { isLoading: isLoadingCreate, mutate } = useMutation(
    ServiceServices.createService,
    {
      onSuccess: () => {
        console.log("onSuccess is called");
        toast.success("¡Servicio creado con éxito!");
        queryClient.invalidateQueries("services");
        setTimeout(() => {
          handleClose();
        }, 2000);
      },
      onError: (error) => {
        toast.error(error.message || "Hubo un error al crear el servicio");
      },
    }
  );

  const { mutate: mutateUpdate, isLoading: isLoadingUpdate } = useMutation(
    ServiceServices.updateService,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("services");
        toast.success("¡Servicio actualizado con éxito!");
        setTimeout(() => {
          handleClose();
        }, 2000);
      },
      onError: (error) => {
        toast.error(error.message || "Hubo un error al actualizar el servicio");
      },
    }
  );

  const handleFormSubmit = (data) => {
    if (isCreateMode) {
      mutate(data);
    } else {
      mutateUpdate({
        ...data,
        id: initialData.id,
        isActive: initialData.isActive,
      });
    }
  };

  return (
    <>
      {isLoadingCreate || isLoadingUpdate || isLoading ? (
        <LoadingSpinner />
      ) : (
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="service-form"
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="name"
                control={control}
                defaultValue={isCreateMode ? "" : initialData.name}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Nombre del Servicio"
                    required
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    className="service-textfield"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="CategoryId"
                control={control}
                defaultValue={isCreateMode ? 1 : initialData.CategoryId}
                render={({ field }) => (
                  <FormControl fullWidth className="service-select">
                    <InputLabel>Categoría del Servicio</InputLabel>
                    <Select {...field}>
                      {categories.data.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
            <div className="service-form-actions">
              <div item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  className="service-button-form"
                >
                  {isCreateMode ? "Crear" : "Guardar"}
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

ServiceForm.propTypes = {
  isCreateMode: PropTypes.bool.isRequired,
  initialData: PropTypes.object,
  onClose: PropTypes.func,
  handleClose: PropTypes.func,
};

export default ServiceForm;
