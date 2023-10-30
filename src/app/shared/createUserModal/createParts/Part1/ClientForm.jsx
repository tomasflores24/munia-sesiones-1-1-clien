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
import toast from "react-hot-toast";
import { ClientsServices } from "../../../../services/dashboard/clients/clients.services";
import LoadingSpinner from "../../../loadingSpinner/LoadingSpinner";
import { uploadProfilePicServices } from "../../../../services/auth/uploadProfilePic.services";


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
  email: yup
    .string()
    .required("Correo es requerido")
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Ingresa un correo valido"
    ),
  phone: yup
    .number()
    .typeError("El telefono debe ser un numero")
    .required("El telefono es requerido"),
  registerId: yup
    .number()
    .typeError("El NIT debe ser un numero")
    .required("El NIT es requerido"),
  password: yup
    .string()
    .required("La contraseña es requerida")
    .min(5, "Tiene que tener una longitud de minimo 5 caracteres"),
  confirmPassword: yup
    .string()
    .required("Confirma la contraseña")
    .oneOf([yup.ref("password"), null], "Las contraseñas deben ser iguales"),
});

const ClientForm = ({ setStep, closeModal, setCompanyId, refetch }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [imgSrc, setImgSrc] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
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
      onSuccess: async (res) => {
        setCompanyId(res.data.id);

        await uploadProfilePicServices.sendFile({
          userId: res.data.UserId,
          file: getValues().profilePic[0],
        });
        toast.success("¡Registro de empresa exitoso!");
        refetch()
        setTimeout(() => {
          setStep(1);
        }, [1000]);
      },
      onError: (err) => {
        toast.error(err.message || "Algo salio mal.");
      },
    }
  );

  const onSubmit = async (data) => {
    // TODO: fix the city, must be dynamic.
    mutate({
      profilePic: "https://picsum.photos/200",
      name: data.name,
      email: data.email,
      password: data.password,
      CountryId: 1,
      city: "Seattle",
      isActive: false,
      UserTypeId: 2,
      phone: `${data.phone}`,
      register_id: `${data.registerId}`,
    });
  };

  return (
    <div className="clientForm__root">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
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
                      accept=".png, .jpg"
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
                <TextField
                  className="input"
                  label="NIT"
                  variant="standard"
                  {...register("registerId")}
                  helperText={errors?.registerId?.message}
                  error={!!errors?.registerId}
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
                          onClick={() =>
                            setShowConfirmPassword((show) => !show)
                          }
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
                Continuar
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

ClientForm.propTypes = {
  setStep: PropTypes.func,
  closeModal: PropTypes.func.isRequired,
  setCompanyId: PropTypes.func,
  refetch: PropTypes.func
};

export default ClientForm;
