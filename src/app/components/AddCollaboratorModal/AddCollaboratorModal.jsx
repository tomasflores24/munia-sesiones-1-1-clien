import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import UploadIcon from "@mui/icons-material/Upload";
import * as yup from "yup";

import "./AddCollaboratorModalStyle.scss";
import { useForm } from "react-hook-form";
import {
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { yupResolver } from "@hookform/resolvers/yup";

const collaboratorSchema = yup.object({
  profilePic: yup
    .mixed()
    .test("required", "Debe proporcionar una imagen", (value) => {
      return value && value.length;
    })
    .test("fileSize", "la imagen tiene que ser de 2MB", (value) => {
      return value && value[0] && value[0].size <= 2000000;
    }),
  name: yup.string().required("El nombre es requerido"),
  lastName: yup.string().required("El apellido es requerido"),
  email: yup
    .string()
    .required("Correo es requerido")
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Ingresa un correo valido"
    ),
  phone: yup.string().required("El telefono es requerido"),
  password: yup
    .string()
    .required("La contraseña es requerida")
    .min(5, "Tiene que tener una longitud de minimo 5 caracteres"),
  confirmPassword: yup
    .string()
    .required("Confirma la contraseña")
    .oneOf([yup.ref("password"), null], "Las contraseñas deben ser iguales"),
});

const AddCollaboratorModal = ({ handleModal, isLoading }) => {
  const modalRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [imgSrc, setImgSrc] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(collaboratorSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (modalRef) {
      modalRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className="addCollaboratorModal__overlay" ref={modalRef}>
      <div className="addCollaboratorModal__root">
        <h2 className="title">
          Crear <span>Perfil del colaborador</span>
        </h2>
        <div className="addCollaboratorModal__container">
          <form className="collaborator__form">
            <div className="img__container">
              <label className="upload" htmlFor="uploadImg">
                <img
                  src={
                    imgSrc
                      ? imgSrc
                      : "https://www.iprcenter.gov/image-repository/blank-profile-picture.png/@@images/image.png"
                  }
                  alt=""
                  id="profile"
                />
                <div className="upload__label">
                  <UploadIcon className="icon" />
                  <p>Subir imagen</p>
                </div>
                <div className="round">
                  <input
                    type="file"
                    id="uploadImg"
                    accept=".png"
                    {...register("profilePic", {
                      onChange: (e) => {
                        const file = e.target.files?.[0];
                        const reader = new FileReader();

                        reader.onload = (e) => {
                          const result = e.target.result;
                          setImgSrc(result.toString());
                        };

                        reader.readAsDataURL(file);
                      },
                    })}
                  />
                </div>
              </label>
              {errors?.profilePic && (
                <p className="input__error">{errors?.profilePic?.message}</p>
              )}
            </div>
            <div className="text_inputs">
              <TextField
                className="input"
                label="Nombre"
                variant="standard"
                name="name"
                {...register("name")}
                error={!!errors?.name}
                helperText={errors?.name?.message}
              />
              <TextField
                className="input"
                label="Apellido/s"
                variant="standard"
                {...register("lastName")}
                helperText={errors?.lastName?.message}
                error={!!errors?.lastName}
              />
              <TextField
                className="input"
                label="Correo"
                {...register("email")}
                helperText={errors?.email?.message}
                variant="standard"
                error={!!errors?.email}
              />
              <TextField
                className="input"
                label="Telefono"
                variant="standard"
                {...register("phone")}
                helperText={errors?.phone?.message}
                error={!!errors?.phone}
              />
              <FormControl className="input" variant="standard">
                <InputLabel htmlFor="standard-adornment-password">
                  Password
                </InputLabel>
                <Input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword((show) => !show)}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {errors?.password && (
                  <FormHelperText className="input__error">
                    {errors?.password?.message}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl className="input" variant="standard">
                <InputLabel htmlFor="standard-adornment-password">
                  Repetir contraseña
                </InputLabel>
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowConfirmPassword((show) => !show)}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {errors?.confirmPassword && (
                  <FormHelperText className="input__error">
                    {errors?.confirmPassword?.message}
                  </FormHelperText>
                )}
              </FormControl>
            </div>
          </form>
          <div className="action__buttons">
            <button
              onClick={handleModal}
              className="addCollaboratorModal__btn cancel"
              disabled={isLoading}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="addCollaboratorModal__btn"
              disabled={isLoading}
              onClick={handleSubmit(onSubmit)}
            >
              {isLoading ? "Registrando ..." : "Registrar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

AddCollaboratorModal.propTypes = {
  handleModal: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default AddCollaboratorModal;
