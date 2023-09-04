import { useState } from "react";
import PropTypes from "prop-types";
import {
  Container,
  Grid,
  TextField,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import "./UserProfile.scss"; // Importa los estilos Sass
import UploadImage from "../../../components/uploadImages/UploadImage";
import { Controller, useForm } from "react-hook-form";
import SelectedOptions from "../../../components/SelectedOptions/SelectedOptions";
import Button from "../../../components/Common/Button/Button";

const UserProfile = ({ profileImage, username, description, inputsData }) => {
  const { handleSubmit, control } = useForm();
  const [selectedImage, setSelectedImage] = useState(null);

  const onSubmit = (data) => {
    console.log(data); // Aquí puedes hacer lo que necesites con los datos del formulario
  };

  const handleImageUpload = (e) => {
    const imageFile = e.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    setSelectedImage(imageUrl);
  };

  const handleChangePassword = () => {
    // Agrega lógica para cambiar la contraseña aquí
    console.log("Cambiando contraseña...");
  };

  const options = ["Opción 1", "Opción 2", "Opción 3"];

  // Define una función para manejar los cambios en las opciones seleccionadas
  const handleSelectedOptionsChange = (selectedOptions) => {
    // Hacer algo con las opciones seleccionadas, por ejemplo, guardarlas en el estado del componente
    console.log("Opciones seleccionadas en MyComponent:", selectedOptions);
  };

  return (
    <Container maxWidth="md" className="user-profile">
      <div className="user-profile-header">
        <UploadImage
          profileImage={selectedImage || profileImage}
          handleImageUpload={handleImageUpload}
          showFileUploadIcon={true}
        />
        <div className="user-profile-description">
          <h2>{username}</h2>
          <p>{description}</p>
        </div>
      </div>
      <div className="user-profile-form">
        <form className="user-profile-inputs">
          <Grid container spacing={2}>
            {inputsData.map((input, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <div className="user-input">
                  <label className="user-input-label" htmlFor={input.id}>
                    {input.label}:
                  </label>
                  {input.type === "select" ? (
                    <FormControl fullWidth variant="outlined">
                      <Controller
                        name={input.id}
                        control={control}
                        variant="filled"
                        defaultValue={input.value || ""}
                        render={({ field }) => (
                          <Select variant="filled" {...field}>
                            {input.options?.map((option, optionIndex) => (
                              <MenuItem key={optionIndex} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                        )}
                      />
                    </FormControl>
                  ) : (
                    <Controller
                      name={input.id}
                      control={control}
                      defaultValue={input.value || ""}
                      render={({ field }) => (
                        <TextField {...field} variant="filled" fullWidth />
                      )}
                    />
                  )}
                </div>
              </Grid>
            ))}
          </Grid>
          <div className="buttons-userProfile-container">
            <Button
              className={"buttons-userProfile"}
              textButton="Cambiar Contraseña"
              handleFunction={handleChangePassword}
              name="btn-changePassword"
            />
            <Button
              className={"buttons-userProfile"}
              textButton="Actualizar Perfil"
              handleFunction={() => handleSubmit(onSubmit)}
              name="btn-updateProfile"
            />
          </div>
        </form>
        <SelectedOptions
          options={options}
          onSelectedOptionsChange={handleSelectedOptionsChange}
          title="Intereses"
        />
      </div>
    </Container>
  );
};

UserProfile.propTypes = {
  profileImage: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  inputsData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
};

export default UserProfile;
