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
import { setDataSuccess } from "../../../redux/slices/authSlice/authSlice";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import loginImg from "/assets/login_img.png";
import { loginServices } from "../../../services/auth/login.services";
import { useMutation } from "react-query";
import LoadingSpinner from "../../../shared/loadingSpinner/LoadingSpinner";
import jwtDecode from "jwt-decode";
import toast, { Toaster } from "react-hot-toast";

const SignIn = () => {
  const [showPassword, setShowPassword] = React.useState(false);

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

  const { isLoading, mutate } = useMutation(["login"], loginServices.login, {
    onSuccess: (e) => {
      const decoded = jwtDecode(e.data);
      toast.success("¡Inicio de sesión exitoso!");
      setTimeout(() => {
        dispatch(
          setDataSuccess({
            token: e.data,
            isAuthenticated: true,
            user: {
              id: decoded.userId,
              profilePic: decoded.profilePic,
              userTypeId: decoded.userTypeId,
              email: decoded.email,
              name: decoded.name,
              collaboratorId: decoded.collaboratorId
                ? decoded.collaboratorId
                : null,
              providerId: decoded.ProviderId ? decoded.ProviderId : null,
              companyId: decoded.companyId ? decoded.companyId : null,
            },
          })
        );
        navigate("/dashboard/home");
      }, 1800);
    },
    onError: (e) => {
      toast.error(e.response.data.error);
    },
  });

  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(validationSchema),
  });
  const handleGoogle = (event) => {
    event.preventDefault();
    dispatch(loginUser(event));
  };

  const customHandleSubmit = async (data) => {
    mutate(data);
  };

  return (
    <div className="login-root">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <img src={loginImg} className="login-img" alt="" />
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
                  id="filled-password-otro"
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
                  <p className="pBottomGoogle">
                    ¿Todavía no tienes una cuenta?{" "}
                  </p>
                  <NavLink to="/register">
                    <p className="pRegister">Regístrate</p>
                  </NavLink>
                </div>
              </FormControl>
            </div>
          </form>
        </>
      )}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default SignIn;
