import "./SignInStyle.scss";
import * as React from 'react';
import { Button, TextField } from "@mui/material";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import * as yup from "yup";

const SignIn = () => {
  const validationSchema = useMemo(() => {
    return yup.object({
      email: yup
        .string()
        .required("Correo es requerido")
        .matches(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Ingrese una dirección de correo electrónico válida"
        ),
      password: yup
        .string()
        .required("La contraseña es requerida")
        .min(5, "La contraseña tiene que ser de minimo 5 caracteres"),
    });
  }, []);

//   const {
//     formState: { errors },
//     handleSubmit,
//     register,
//   } = useForm({
//     mode: "onTouched",
//     resolver: yupResolver(validationSchema),
//   });

//   const customHandleSubmit = (data) => {
//     console.log(data);
//   };

  return (
    <div className="login-root">
      <img
        src="https://kinsta.com/es/wp-content/uploads/sites/8/2020/10/tipos-de-archivos-de-imagen.png"
        className="login-img"
        alt=""
      />
      <h1>Ingresar</h1>
      <form className="form" onSubmit={handleSubmit(customHandleSubmit)}>
        <TextField {...register("email")} helperText={errors?.email?.message} />
        <TextField
          {...register("password")}
          type="password"
          helperText={errors?.password?.message}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

// export default SignIn;