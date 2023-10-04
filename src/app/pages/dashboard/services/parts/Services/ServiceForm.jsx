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
  nombre: yup.string().required("El nombre es requerido"),
  descripcion: yup.string().required("La descripción es requerida"),
  precio: yup.number().required("El precio es requerido").positive(),
  duracion: yup.string().required("La duración es requerida"),
  categoria: yup.string().required("La categoría es requerida"),
});

const ServiceForm = ({ initialData = {} }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(serviceSchema),
    defaultValues: {
      nombre: initialData.nombre || "",
      descripcion: initialData.descripcion || "",
      precio: initialData.precio || "",
      duracion: initialData.duracion || "",
      categoria: initialData.categoria || "Categoria1",
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
    createServiceMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            name="nombre"
            control={control}
            defaultValue={initialData.nombre || ""}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nombre del Servicio"
                fullWidth
                required
                error={!!errors.nombre}
                helperText={errors.nombre?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="descripcion"
            control={control}
            defaultValue={initialData.descripcion || ""}
            render={({ field }) => (
              <TextField
                {...field}
                label="Descripción del Servicio"
                multiline
                fullWidth
                required
                error={!!errors.descripcion}
                helperText={errors.descripcion?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="precio"
            control={control}
            defaultValue={initialData.precio || ""}
            render={({ field }) => (
              <TextField
                {...field}
                label="Precio del Servicio"
                type="number"
                fullWidth
                required
                error={!!errors.precio}
                helperText={errors.precio?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="duracion"
            control={control}
            defaultValue={initialData.duracion || ""}
            render={({ field }) => (
              <TextField
                {...field}
                label="Duración del Servicio"
                fullWidth
                required
                error={!!errors.duracion}
                helperText={errors.duracion?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="categoria"
            control={control}
            defaultValue={initialData.categoria || "Categoria1"}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>Categoría del Servicio</InputLabel>
                <Select {...field}>
                  <MenuItem value="Categoria1">Categoría 1</MenuItem>
                  <MenuItem value="Categoria2">Categoría 2</MenuItem>
                  <MenuItem value="Categoria3">Categoría 3</MenuItem>
                </Select>
              </FormControl>
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Guardar
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
