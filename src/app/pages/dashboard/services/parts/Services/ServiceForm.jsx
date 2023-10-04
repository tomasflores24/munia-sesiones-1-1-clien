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
  // description: yup.string().required("La descripción es requerida"),
  // price: yup.number().required("El precio es requerido").positive(),
  // duration: yup.string().required("La duración es requerida"),
  CategoryId: yup.number().required("La categoría es requerida"),
});

const ServiceForm = ({ initialData = {} }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(serviceSchema),
    defaultValues: {
      name: initialData.name || "",
      // description: initialData.descripcion || "",
      // price: initialData.precio || "",
      // duration: initialData.duracion || "",
      CategoryId: initialData.categoria || "1",
    },
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

  const handleFormSubmit = (data) => {
    createServiceMutation.mutate({
      name: data.name,
      CategoryId: data.CategoryId,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            name="name"
            control={control}
            defaultValue={initialData.name || ""}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nombre del Servicio"
                fullWidth
                required
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />
        </Grid>
        {/* Otras opciones de formulario
        <Grid item xs={12}>
          <Controller
            name="description"
            control={control}
            defaultValue={initialData.description || ""}
            render={({ field }) => (
              <TextField
                {...field}
                label="Descripción del Servicio"
                multiline
                fullWidth
                required
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="price"
            control={control}
            defaultValue={initialData.price || ""}
            render={({ field }) => (
              <TextField
                {...field}
                label="Precio del Servicio"
                type="number"
                fullWidth
                required
                error={!!errors.price}
                helperText={errors.price?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="duration"
            control={control}
            defaultValue={initialData.duration || ""}
            render={({ field }) => (
              <TextField
                {...field}
                label="Duración del Servicio"
                fullWidth
                required
                error={!!errors.duration}
                helperText={errors.duration?.message}
              />
            )}
          />
        </Grid> 
         */}
        <Grid item xs={12}>
          <Controller
            name="CategoryId"
            control={control}
            defaultValue={initialData.CategoryId || "1"}
            render={({ field }) => (
              <FormControl fullWidth>
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
          <Button type="submit" variant="contained" color="primary">
            Crear
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

ServiceForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.object,
};

export default ServiceForm;
