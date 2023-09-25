import React, { useMemo, useState, useEffect } from "react";
import "./GeneralInformationStyle.scss";
import {
  TextField,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { setParts } from "../../../../../redux/slices/registerSlice/registerSlice";

const GeneralInformation = ({ step, setStep }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const dispatch = useDispatch();

  const { profilePic, ...dataSlice } = useSelector((state) => state.register);

  useEffect(() => {
    if (profilePic.src) {
      setImgSrc(profilePic.src);
    }
  }, []);

  const schema = useMemo(() => {
    return yup.object({
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
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Ingresa un correo valido"
        ),
      phone: yup.string().required("El telefono es requerido"),
      password: yup
        .string()
        .required("La contraseña es requerida")
        .min(5, "Tiene que tener una longitud de minimo 5 caracteres"),
    });
  }, []);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: dataSlice.name ? dataSlice.name : "",
      email: dataSlice.email ? dataSlice.email : "",
      phone: dataSlice.phone ? dataSlice.phone : "",
      lastName: dataSlice.lastName ? dataSlice.lastName : "",
      password: dataSlice.password ? dataSlice.password : "",
      profilePic: profilePic.file ? profilePic.file : "",
    },
  });
  const customHandleSubmit = (data) => {
    dispatch(
      setParts({
        ...data,
        profilePic: {
          src: imgSrc,
          file: data.profilePic,
        },
      })
    );
    setStep(step + 1);
  };

  return (
    <section className="generalInfo__root">
      <h4>Comencemos con la información básica.</h4>
      <form
        className="generalInfo__form"
        onSubmit={handleSubmit(customHandleSubmit)}
      >
        <div className="img__container">
          <div className="upload">
            <img
              src={
                imgSrc
                  ? imgSrc
                  : "https://www.iprcenter.gov/image-repository/blank-profile-picture.png/@@images/image.png"
              }
              alt=""
              id="profile"
            />
            <div className="round">
              <input
                type="file"
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
          </div>
          {errors?.profilePic && <p>{errors?.profilePic?.message}</p>}
        </div>
        <div className="text_inputs">
          <TextField
            className="auth_input"
            label="Nombre"
            variant="standard"
            name="name"
            {...register("name")}
            helperText={errors?.name?.message}
          />
          <TextField
            className="auth_input"
            label="Apellido/s"
            variant="standard"
            {...register("lastName")}
            helperText={errors?.lastName?.message}
          />
          <TextField
            className="auth_input"
            label="Email"
            {...register("email")}
            helperText={errors?.email?.message}
            variant="standard"
          />
          <TextField
            className="auth_input"
            label="Telefono"
            variant="standard"
            {...register("phone")}
            helperText={errors?.phone?.message}
          />
          <FormControl className="auth_input" variant="standard">
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
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {errors?.password && (
              <FormHelperText>{errors?.password?.message}</FormHelperText>
            )}
          </FormControl>
        </div>
      </form>
      <div className="general-info__actions">
        <button
          type="button"
          onClick={() => handleSubmit(customHandleSubmit)()}
          className={isValid ? "submit_btn" : "submit_btn disabled"}
        >
          Siguiente
        </button>
      </div>
    </section>
  );
};

export default GeneralInformation;
