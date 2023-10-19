import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import UploadIcon from "@mui/icons-material/Upload";
import * as yup from "yup";
import { CollaboratorsService } from "../../../../../services/dashboard/collaborators/collaborators.service";
import "./AddCollaboratorModalStyle.scss";
import { get, useForm } from "react-hook-form";
import {
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Select,
  TextField,
  MenuItem,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { uploadProfilePicServices } from "../../../../../services/auth/uploadProfilePic.services";
import toast, { Toaster } from "react-hot-toast";
import LoadingSpinner from "../../../../../shared/loadingSpinner/LoadingSpinner";

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
  age: yup.string().required("La edad es requerida  "),
  email: yup
    .string()
    .required("Correo es requerido")
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Ingresa un correo valido"
    ),
  phone: yup.string().required("El telefono es requerido"),
  country: yup.string().required("El pais es requerido"),
  city: yup.string().required("La ciudad es requerida"),
  gender: yup.string().required("El genero es requerido"),
  password: yup
    .string()
    .required("La contraseña es requerida")
    .min(5, "Tiene que tener una longitud de minimo 5 caracteres"),
  confirmPassword: yup
    .string()
    .required("Confirma la contraseña")
    .oneOf([yup.ref("password"), null], "Las contraseñas deben ser iguales"),
});

const AddCollaboratorModal = ({ handleModal }) => {
  const { companyId } = useSelector((state) => state.auth.auth.user);
  const modalRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [imgSrc, setImgSrc] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(collaboratorSchema),
    defaultValues: {
      profilePic: "",
      name: "",
      lastName: "",
      email: "",
      phone: "",
      country: "",
      city: "",
      gender: "",
      password: "",
      confirmPassword: "",
    },
  });

  const queryClient = useQueryClient();

  const { isLoading, mutateAsync } = useMutation(
    ["createCollaborator"],
    (data) => CollaboratorsService.createCollaborator(data),
    {
      onSuccess: async (e) => {
        await uploadProfilePicServices.sendFile({
          userId: e.data,
          file: getValues().profilePic[0],
        });
        toast.success("Se ha creado el colaborador exitosamente");

        setTimeout(() => {
          handleModal(false);
          queryClient.invalidateQueries("collaborators");
        }, 3000);
      },
      onError: () => {
        toast.error("Ha ocurrido un error");
      },
    }
  );

  const { data: countries } = useQuery(["getAllCountries"], () =>
    CollaboratorsService.getAllCountries()
  );
  const onSubmit = async (data) => {
    // collaboratorMutation.mutate(data);
    await mutateAsync({
      profilePic: "",
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      CountryId: +data.country,
      CompanyId: companyId,
      city: data.city,
      age: +data.age,
      isActive: true,
      UserTypeId: 3,
      GenderId: +data.gender,
    });
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
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
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
                    <p className="input__error">
                      {errors?.profilePic?.message}
                    </p>
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
                  <TextField
                    className="input"
                    type="number"
                    label="Edad"
                    variant="standard"
                    {...register("age")}
                    helperText={errors?.age?.message}
                    error={!!errors?.age}
                  />
                  <FormControl variant="standard" error={!!errors?.country}>
                    <InputLabel id="demo-simple-select-standard-label">
                      Pais
                    </InputLabel>

                    <Select variant="standard" {...register("country")}>
                      <MenuItem disabled hidden>
                        Selecciona un país
                      </MenuItem>
                      {countries?.data.map((el, index) => {
                        return (
                          <MenuItem key={index} value={el.id}>
                            <em>{el.name}</em>
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText>{errors?.country?.message}</FormHelperText>
                  </FormControl>
                  <TextField
                    className="input"
                    label="Ciudad"
                    variant="standard"
                    {...register("city")}
                    helperText={errors?.city?.message}
                    error={!!errors?.city}
                  />
                  <FormControl variant="standard" error={!!errors?.gender}>
                    <InputLabel id="demo-simple-select-standard-label">
                      Genero
                    </InputLabel>
                    <Select variant="standard" {...register("gender")}>
                      <MenuItem disabled hidden>
                        Selecciona tu genero
                      </MenuItem>
                      <MenuItem value="1">Masculino</MenuItem>
                      <MenuItem value="2">Femenino</MenuItem>
                      <MenuItem value="3">Otro</MenuItem>
                    </Select>
                    <FormHelperText>{errors?.gender?.message}</FormHelperText>
                  </FormControl>
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
          </>
        )}
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

AddCollaboratorModal.propTypes = {
  handleModal: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default AddCollaboratorModal;
