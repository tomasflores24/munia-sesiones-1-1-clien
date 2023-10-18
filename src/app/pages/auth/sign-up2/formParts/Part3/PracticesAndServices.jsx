import { useForm, Controller } from "react-hook-form";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useMutation } from "react-query";
import jwtDecode from "jwt-decode";

import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import "./PracticesAndServicesStyle.scss";
import { MenuProps } from "./multiselect.utils";
import { useGetServices } from "../../../../../hooks/Register/useServices";
import LoadingSpinner from "../../../../../shared/loadingSpinner/LoadingSpinner";
import { RegisterServices } from "../../../../../services/auth/register.services";
import { Alert } from "@mui/material";
import { cleanParts } from "../../../../../redux/slices/registerSlice/registerSlice";

const PracticesAndServices = ({ step, setStep }) => {
  const [selectedServices, setSelectedServices] = useState([]);

  const registerData = useSelector((state) => state.register);

  const {
    handleSubmit,
    formState: { isValid, errors },
    control,
  } = useForm();

  const { isLoading, isSuccess, data: services, error } = useGetServices();

  const { isLoading: isLoadingRegister, mutateAsync } = useMutation(
    ["sign-up"],
    RegisterServices.signUp
  );

  const { mutateAsync: mutateAsyncProfilePic, isLoading: isLoadingProfilePic } =
    useMutation(["profile-pic"], RegisterServices.sendFile);

  const { mutateAsync: mutateAsyncFiles, isLoading: isLoadingFiles } =
    useMutation(["pdf-files"], RegisterServices.sendFiles);

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

  const customHandleSubmit = async () => {
    try {
      const dataFiles = [];
      const res = await mutateAsync({
        profilePic: "",
        name: registerData.name,
        lastName: registerData.lastName,
        email: registerData.email,
        password: registerData.password,
        CountryId: 1,
        city: "City",
        isActive: false,
        UserTypeId: 3,
        GenderId: 3,
      });

      const decoded = jwtDecode(res.data.token);

      await mutateAsyncProfilePic({
        userId: decoded.userId,
        data: registerData.profilePic,
        accessToken: res.data.token,
      });

      dataFiles.push({ file: registerData.dniDoc.file[0], key: "dniDoc" });
      dataFiles.push({
        file: registerData.universityDegree.file[0],
        key: "universityDegree",
      });
      dataFiles.push({
        file: registerData.masterDegree.file[0],
        key: "masterDegree",
      });
      dataFiles.push({
        file: registerData.curriculum.file[0],
        key: "curriculum",
      });
      dataFiles.push({
        file: registerData.profesionalCard.file[0],
        key: "profesionalCard",
      });
      dataFiles.push({
        file: registerData.bankCertification.file[0],
        key: "bankCertification",
      });

      await mutateAsyncFiles({
        data: dataFiles.filter((item) => !!item.file),
        providerId: decoded.ProviderId,
        accessToken: res.data.token,
      });

      setStep((prev) => prev + 1);
      cleanParts();
    } catch (err) {
      toast.error(err.response?.data?.error || "Algo salio mal.");
    }
  };

  return (
    <section className="practiceAndServices__root">
      {isLoadingRegister || isLoadingProfilePic || isLoadingFiles ? (
        <LoadingSpinner />
      ) : (
        <>
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
              ) : (
                <Alert severity="error">
                  {error.message || "No se puedo cargar los servicios."}
                </Alert>
              )}
            </div>
          </div>

          <div className="actions">
            <button
              type="button"
              className="back_btn"
              disabled={isLoadingRegister}
              onClick={() => setStep(step - 1)}
            >
              Atras
            </button>
            <div className="wrapper__term_of_use">
              <div className="term_of_use">
                <Controller
                  name="termsOfUse"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Checkbox color="default" {...field} />
                  )}
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
              disabled={isLoadingRegister}
              className={isValid ? "submit_btn" : "submit_btn disabled"}
            >
              Registrarse
            </button>
          </div>
        </>
      )}

      <Toaster position="top-center" reverseOrder={false} />
    </section>
  );
};

PracticesAndServices.propTypes = {
  step: PropTypes.number,
  setStep: PropTypes.func,
};

export default PracticesAndServices;
