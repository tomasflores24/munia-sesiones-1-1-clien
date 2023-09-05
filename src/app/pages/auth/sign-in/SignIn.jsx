import "./SignInStyle.scss";
import * as React from "react";
import { TextField } from "@mui/material";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../redux/slices/authSlice/authSlice";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

const SignIn = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const userLogin = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const validationSchema = useMemo(() => {
    return yup.object({
      email: yup
        .string()
        .required("Correo es requerido")
        .matches(
          /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|([a-zA-Z\-0-9]+\.[a-zA-Z]{2,}))$/,
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
  
  const handleGoogle = (event) => {
    event.preventDefault();
    dispatch(loginUser(event));
  }

  const customHandleSubmit = (data) => {
      dispatch(loginUser(data))
      navigate("/home")
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '¡Inicio de sesión exitoso!',
        showConfirmButton: false,
        timer: 1500
      })
/*       Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Esta cuenta no existe Regístrate',
        showConfirmButton: false,
        timer: 1500
      }) */
  };

  return (
    <div className="login-root">
      <img
        src="https://s3-alpha-sig.figma.com/img/5555/3e83/3aac822dea85c905e6500a4bf92911fe?Expires=1694390400&Signature=i5fjZp~Qkm7aCLDYCd09MQY6GVK4V17Gjv2YZFl-3Koxvzdp6vrtBrRTtDb7QZn3gr6foj3154Cs3jtHTSmwvHD7P3v-zSlspGSrTeHRSlkD3Bh5Nx0SkXj678QODi54YBQ9zbfAZ0yfZCAkMfVSK0OXVNkh7L0oqrKtHx27-tRHNHZlKbAlg1idBhPReXWjACCl1SK9-UEe3B6ckW-URy1F0Qp~7rA-atUDUxV8qaEIxDoKI-fLiPl8u1n8EgU4uGCc~L7gbRtz8A~vaDglXdE2CWsfPTP8zfoGJeVZb3ThF4RdGH6blj5-whFXcqWc6HVxYkDIVdtx0aAE1VpOng__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
        className="login-img"
        alt=""
      />
      <form className="form" onSubmit={handleSubmit(customHandleSubmit)}>
        <div className="titleH1">
          <h1>Ingresar</h1>
        </div>
        <div className="formBox">
          <FormControl className="formControlSignIn" variant="outlined">
            <h2 className="pTitleBoxForm">Correo</h2>
            <TextField
              className="InputBoxForm"
              {...register("email")}
              helperText={errors?.email ? errors?.email?.message : ""}
              id="filled-password-input"
              variant="standard"
              required
            />
            <h2 className="pTitleBoxForm">Contraseña</h2>
            <TextField
              className="InputBoxForm"
              required
              id="filled-password-input"
              autoComplete="current-password"
              variant="standard"
              {...register("password")}
              helperText={errors?.password ? errors?.password?.message : ""}
              type={showPassword ? "text" : "password"}
              endadornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Mostrar/ocultar contraseña"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <NavLink to="/recoverPassword" className="ResetPassword">
              <p className="ResetPassword">¿Has olvidado tu contraseña?</p>
            </NavLink>
            <div className="BoxLoginSend">
              <button className="loginSend" type="submit">
                Ingresar
              </button>
              <p className="pTopGoogle">O Regístrate Utilizando</p>
              <button style={{ border:'none', background:'transparent'}} onClick={() => handleGoogle} type="submit">
                <img className="imgGoogle" src='../../../../assets/Google.jpg' />
              </button>
              <p className="pBottomGoogle">¿Todavía no tienes una cuenta? </p>
              <NavLink to="/register">
                <p className="pRegister">Regístrate</p>
              </NavLink>
            </div>
          </FormControl>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
