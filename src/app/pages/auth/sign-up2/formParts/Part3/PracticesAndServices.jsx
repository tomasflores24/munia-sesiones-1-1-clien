import { useForm, Controller } from "react-hook-form";
import PropTypes from "prop-types";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useMutation } from "react-query";

import "./PracticesAndServicesStyle.scss";
import { MenuProps } from "./multiselect.utils";
import { useGetServices } from "../../../../../hooks/Register/useServices";
import LoadingSpinner from "../../../../../shared/loadingSpinner/LoadingSpinner";
import { RegisterServices } from "../../../../../services/auth/register.services";

const PracticesAndServices = ({ step, setStep, setRegisterToken }) => {
  const [selectedServices, setSelectedServices] = useState([]);

  const registerData = useSelector((state) => state.register);

  const {
    handleSubmit,
    formState: { isValid, errors },
    control,
  } = useForm();

  const { isLoading, isSuccess, data: services } = useGetServices();

  const { isLoading: isRegisterLoading, mutate } = useMutation(
    ["sign-up"],
    RegisterServices.signUp,
    {
      onSuccess: (res) => {
        setRegisterToken(res.data.token);
        setStep((prev) => prev + 1);
      },
      onError: (err) => {
        toast.error(err.response?.data?.error || "Algo salio mal.");
      },
    }
  );

  const isAllSelected =
    services?.data?.length > 0 &&
    selectedServices.length === services?.data?.length;

  const handleChange = (event) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setSelectedServices(
        selectedServices.length === services?.data?.length ? [] : services?.data
      );
      return;
    }
    setSelectedServices(value);
  };

  const customHandleSubmit = (data) => {
    console.log({ data, selectedServices, registerData });
    // TODO: what to do with selectedServices and other data
    mutate({
      profilePic: "https://picsum.photos/200",
      name: registerData.name,
      lastName: registerData.lastName,
      email: registerData.email,
      password: registerData.password,
      CountryId: 1,
      city: "Cityville",
      isActive: false,
      UserTypeId: 3,
      GenderId: 3,
    });
  };

  return (
    <section className="practiceAndServices__root">
      <div className="practiceAndServices__topWrapper">
        <h2 className="practiceAndServices__title">
          Selecciona los campos en los que deseas asistir a los pacientes.
        </h2>

        <div className="practiceAndService__multiselect">
          {isLoading ? (
            <LoadingSpinner />
          ) : isSuccess && !isLoading ? (
            <FormControl className="multiselect__container">
              <InputLabel id="mutiple-select-label" className="label">
                Servicios
              </InputLabel>
              <Select
                labelId="mutiple-select-label"
                multiple
                value={selectedServices}
                onChange={handleChange}
                renderValue={(selected) =>
                  selected?.map((option) => option.name).join(", ")
                }
                MenuProps={MenuProps}
                className="select__input"
              >
                <MenuItem value="all">
                  <ListItemIcon>
                    <Checkbox
                      checked={isAllSelected}
                      indeterminate={
                        selectedServices.length > 0 &&
                        selectedServices.length < services.length
                      }
                    />
                  </ListItemIcon>
                  <ListItemText primary="Select All" />
                </MenuItem>
                {services?.data?.map((option) => (
                  <MenuItem key={option.id} value={option}>
                    <ListItemIcon>
                      <Checkbox
                        checked={selectedServices.indexOf(option) > -1}
                      />
                    </ListItemIcon>
                    <ListItemText primary={option.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : null}
        </div>
      </div>

      <div className="actions">
        <button
          type="button"
          className="back_btn"
          disabled={isRegisterLoading}
          onClick={() => setStep(step - 1)}
        >
          atras
        </button>
        <div className="wrapper__term_of_use">
          <div className="term_of_use">
            <Controller
              name="termsOfUse"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <Checkbox color="default" {...field} />}
            />
            <p>
              Acepto los <span>Términos de uso</span>
            </p>
          </div>
          {errors?.termsOfUse && (
            <span className="error">Debes aceptar los términos de uso</span>
          )}
        </div>
        <button
          type="button"
          onClick={handleSubmit(customHandleSubmit)}
          disabled={isRegisterLoading}
          className={isValid ? "submit_btn" : "submit_btn disabled"}
        >
          {isRegisterLoading ? "Cargando..." : "Registrarse"}
        </button>
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </section>
  );
};

PracticesAndServices.propTypes = {
  step: PropTypes.number,
  setStep: PropTypes.func,
  setRegisterToken: PropTypes.func,
};

export default PracticesAndServices;
