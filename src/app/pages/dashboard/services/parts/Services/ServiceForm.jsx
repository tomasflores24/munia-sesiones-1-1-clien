import React from "react";
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

const ServiceForm = ({ onSubmit, initialData = {} }) => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: initialData,
  });

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            name="nombre"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nombre del Servicio"
                fullWidth
                required
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="descripcion"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Descripción del Servicio"
                multiline
                fullWidth
                required
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="precio"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Precio del Servicio"
                type="number"
                fullWidth
                required
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="duracion"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Duración del Servicio"
                fullWidth
                required
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Categoría del Servicio</InputLabel>
            <Controller
              name="categoria"
              control={control}
              render={({ field }) => (
                <Select {...field}>
                  <MenuItem value="Categoria1">Categoría 1</MenuItem>
                  <MenuItem value="Categoria2">Categoría 2</MenuItem>
                  <MenuItem value="Categoria3">Categoría 3</MenuItem>
                  {/* Agrega más opciones de categoría según tus necesidades */}
                </Select>
              )}
            />
          </FormControl>
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

export default ServiceForm;
