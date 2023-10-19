import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Controller, useForm } from "react-hook-form";
import { ServiceServices } from "../../../../../services/dashboard/service/service.service";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import LoadingSpinner from "../../../../../shared/loadingSpinner/LoadingSpinner";
import "./EditCategoryForm.style.scss";
const EditCategoryForm = ({ handleClose }) => {
  const queryClient = useQueryClient();

  // const {
  //   handleSubmit,
  //   control,
  //   formState: { errors },
  //   watch,
  // } = useForm({
  //   defaultValues: { name: "" },
  // });

  const { mutate, isLoading: isLoadingEdit } = useMutation(
    ["editCategory"],
    ServiceServices.editCategory,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("categories");
        toast.success("¡Categoria editada con éxito!");
        setTimeout(() => {
          handleClose();
        }, 2000);
      },
      onError: (error) => {
        toast.error(
          error?.response?.data?.error || "Hubo un error al editar la categoría"
        );
      },
    }
  );
  const { data: categories, isLoading } = useQuery(
    "categories",
    ServiceServices.getAllCategory
  );

  const handleFormSubmit = ({ CategoryId, name }) => {
    mutate({ CategoryId, data: { name } });
  };

  const [nameCategory, setNameCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState();

  return (
    <>
      {isLoading || isLoadingEdit ? (
        <LoadingSpinner />
      ) : (
        <form className="edit-category-form">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth className="edit-category-select">
                <InputLabel>Categorías</InputLabel>
                <Select
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setNameCategory(categoria.name);
                    // console.log(e.target);
                  }}
                  value={selectedCategory}
                >
                  <MenuItem disabled>Categoria</MenuItem>
                  {categories?.data?.map((category) => (
                    <MenuItem
                      key={category.id}
                      value={category.id}
                      id={category.name}
                    >
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(e) => setNameCategory(e.target.value)}
                label="Nombre de la categoria"
                required
                className="edit-category-textfield"
                value={nameCategory}
              />
            </Grid>

            <div className="edit-category-form-actions">
              <div item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  className="edit-category-button-form"
                >
                  Editar
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

export default EditCategoryForm;
