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

const ServiceForm = ({ initialData = {} }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(serviceSchema),
    defaultValues: {
      name: initialData.name || "",
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
