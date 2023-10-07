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
import { useMutation, useQueryClient } from "react-query";
import PropTypes from "prop-types";
import { ServiceServices } from "../../../../../services/dashboard/service/service.service";
import toast from "react-hot-toast";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const serviceSchema = yup.object({
  name: yup.string().required("El nombre es requerido"),
  CategoryId: yup.number().required("La categoría es requerida"),
});

const ServiceForm = ({ initialData = {}, isCreateMode }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(serviceSchema),
    defaultValues: isCreateMode
      ? { name: "", CategoryId: "1" }
      : { name: initialData.name, CategoryId: initialData.CategoryId },
  });

  const queryClient = useQueryClient();

  const createServiceMutation = useMutation(ServiceServices.createService, {
    onSuccess: () => {
      queryClient.invalidateQueries("services");
      toast.success("¡Servicio creado con éxito!");
    },
    onError: (error) => {
      toast.error(error.message || "Hubo un error al crear el servicio");
    },
  });

  const updateServiceMutation = useMutation(ServiceServices.updateService, {
    onSuccess: () => {
      queryClient.invalidateQueries("services");
      toast.success("¡Servicio actualizado con éxito!");
    },
    onError: (error) => {
      toast.error(error.message || "Hubo un error al actualizar el servicio");
    },
  });

  const handleFormSubmit = (data) => {
    if (isCreateMode) {
      createServiceMutation.mutate(data);
    } else {
      updateServiceMutation.mutate({
        ...data,
        id: initialData.id,
        isActive: initialData.isActive,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="service-form">
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
            defaultValue={isCreateMode ? "1" : initialData.CategoryId}
            render={({ field }) => (
              <FormControl fullWidth className="service-select">
                <InputLabel>Categoría del Servicio</InputLabel>
                <Select {...field}>
                  <MenuItem value="1">Categoría 1</MenuItem>
                  <MenuItem value="2">Categoría 2</MenuItem>
                  <MenuItem value="3">Categoría 3</MenuItem>
                </Select>
              </FormControl>
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="service-button"
          >
            {isCreateMode ? "Crear" : "Guardar"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

ServiceForm.propTypes = {
  isCreateMode: PropTypes.bool.isRequired,
  initialData: PropTypes.object,
};

export default ServiceForm;
