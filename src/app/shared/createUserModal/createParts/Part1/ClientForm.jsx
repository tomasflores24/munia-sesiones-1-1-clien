import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
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
import UploadIcon from "@mui/icons-material/Upload";
import PropTypes from "prop-types";

import "./ClientFormStyle.scss";
import { useMutation } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import { ClientsServices } from "../../../../services/dashboard/clients/clients.services";

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

const ClientForm = ({ setStep, closeModal, setCompanyId }) => {
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

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { isLoading, mutate } = useMutation(
    ["registerClient"],
    ClientsServices.createClient,
    {
      onSuccess: (e) => {
        const company = e.data;
        setCompanyId(company.id);
        toast.success("¡Registro de empresa exitoso!");
        setStep(2);
      },
      onError: (e) => {
        toast.error(e.message);
      },
    }
  );

  const onSubmit = (data) => {
    mutate({
      user: {
        name: data.name,
        email: data.email,
        password: data.password,
        isActive: false,
        isDelete: false,
        UserTypeId: 1,
        city: "bs as",
        CountryId: 1,
      },
      profile: {
        phone: parseInt(data.phone, 10),
        register_id: "123123",
      },
      auth: {
        type: "Empresa",
      },
    });
  };

  return (
    <div className="clientForm__root">
      <h2 className="title">
        Crear <span>Perfil de Empresa</span>
      </h2>
      <div className="clientForm__container">
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
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
            onClick={closeModal}
            className="clientForm__btn cancel"
            disabled={isLoading}
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="clientForm__btn"
            disabled={isLoading}
            onClick={handleSubmit(onSubmit)}
          >
            {isLoading ? "Registrando ..." : "Continuar"}
          </button>
        </div>
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

ClientForm.propTypes = {
  setStep: PropTypes.func,
  closeModal: PropTypes.func.isRequired,
  setCompanyId: PropTypes.func,
};

export default ClientForm;
