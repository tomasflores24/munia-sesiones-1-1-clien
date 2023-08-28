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
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);


  const validationSchema = useMemo(() => {
    return yup.object({
      email: yup
        .string()
        .required("Correo es requerido")
        .matches(
          // eslint-disable-next-line no-useless-escape
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Ingrese una dirección de correo electrónico válida"
        ),
      password: yup
        .string()
        .required("La contraseña es requerida")
        .min(5, "La contraseña tiene que ser de minimo 5 caracteres"),
    });
  }, []);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(validationSchema),
  });

  const customHandleSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="login-root">
      <img
        src="https://kinsta.com/es/wp-content/uploads/sites/8/2020/10/tipos-de-archivos-de-imagen.png"
        className="login-img"
        alt=""
      />
      <form className="form" onSubmit={handleSubmit(customHandleSubmit)}>
        <div className="titleH1">
          <h1>Ingresar</h1>
        </div>
        <div className="formBox">
          <FormControl sx={{ m: 1, width: '40ch' }} variant="outlined">
          <h2>Correo</h2>
            <TextField
              {...register("email")} 
              helperText={errors?.email?.message}
              label="Usuario"
              id="filled-password-input"
              variant="standard"
            />
            <h2>Contraseña</h2>
              <TextField
                id="filled-password-input"
                label="Password"
                autoComplete="current-password"
                variant="standard"
                {...register("password")}
                helperText={errors?.password?.message}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            <p className="ResetPassword">¿Has olvidado tu contraseña?</p>
            <Button type="submit">Enviar</Button>
          </FormControl>
        </div>
      </form>
    </div>
  );
};

export default SignIn;