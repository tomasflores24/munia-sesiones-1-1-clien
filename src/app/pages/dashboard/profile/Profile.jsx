import "./Profile.scss";
import { useEffect, useState } from "react";
import AddTimeAvailabilityModal from "./components/AddTimeAvailabilityModal/AddTimeAvailabilityModal";
import lockResetIcon from "/assets/lockResetIcon.png";
import idIcon from "/assets/idIcon.svg";
import displomaIcon from "/assets/diplomaIcon.svg";
import proCardIcon from "/assets/proCardIcon.svg";
import portfolioServiciosIcon from "/assets/portfolioServiciosIcon.svg";
import masterDegreeIcon from "/assets/masterDegreeIcon.svg"
import bankCertificate from "/assets/bankCertificate.svg"
import curriculum from "/assets/curriculum.svg"
import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  ThemeProvider,
  createTheme,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import UploadImage from "../../../components/uploadImages/UploadImage";
import { useMutation, useQuery } from "react-query";
import { ProvidersServices } from "../../../services/dashboard/providers/providers.services";
import { ClientsServices } from "../../../services/dashboard/clients/clients.services";
import { useSelector } from "react-redux";
import { CollaboratorsService } from "../../../services/dashboard/collaborators/collaborators.service";
import { CountriesServices } from "../../../services/dashboard/countries/countries.services";
import { uploadProfilePicServices } from "../../../services/auth/uploadProfilePic.services";
import LoadingSpinner from "../../../shared/loadingSpinner/LoadingSpinner";

const Profile = () => {
  const user = useSelector((state) => state.auth.auth.user);
  const {
    data: providerData,
    refetch: providerRefetch,
    isLoading: providerIsLoading,
  } = useQuery(
    ["getProviderById"],
    () => ProvidersServices.getProviderById(user.providerId),
    { refetchOnWindowFocus: false }
  );
  const { data: clientData, isLoading: clientIsLoading } = useQuery(
    ["getCompaniesById"],
    () => ClientsServices.getCompaniesById(user.companyId),
    { refetchOnWindowFocus: false }
  );
  const { data: collaboratorData, isLoading: collaboratorIsLoading } = useQuery(
    ["getCollaboratorById"],
    () => CollaboratorsService.getCollaboratorById(user.collaboratorId),
    { refetchOnWindowFocus: false }
  );
  const {
    data: countries,
    isLoading: countriesAreLoading,
    isSuccess: countriesSuccess,
  } = useQuery(["getAllCountries"], () => CountriesServices.getAllCountries(), {
    refetchOnWindowFocus: false,
  });
  const { mutate: providerMutate } = useMutation(["mutateProviders"], () =>
    ProvidersServices.updateProvider(user.providerId, inputValues)
  );
  const { mutate: clientsMutate } = useMutation(["mutateClients"], () =>
    ClientsServices.updateClient(user.companyId, inputValues)
  );
  const { mutate: collaboratorsMutate } = useMutation(
    ["mutateCollaborator"],
    () =>
      CollaboratorsService.updateCollaborator(user.collaboratorId, inputValues)
  );
  const { mutate: userProfilePicMutate } = useMutation(
    ["mutateProvidersPic"],
    uploadProfilePicServices.sendFile
  );
  const inputsInitialState = {
    profilePic: user.profilePic,
    name: "",
    GenderId: "",
    phone: "",
    email: user.email,
    last_name: "",
    CountryId: "",
    city: "",
    birthDate: "",
  };
  const [openClientModal, setOpenClientModal] = useState(false);
  const [inputValues, setInputValues] = useState(inputsInitialState);
  const [selectedImage, setSelectedImage] = useState(null);
  useEffect(() => {
    if (providerData && user.userTypeId === 3) {
      setInputValues({
        ...inputValues,
        name: providerData.data.user.name,
        last_name: providerData.data.last_name,
        GenderId: providerData.data.GenderId,
        city: providerData.data.user.city,
        CountryId: providerData.data.user.CountryId,
      });
    }
    if (clientData && user.userTypeId === 1) {
      setInputValues({
        ...inputValues,
        name: clientData.data.user.name,
        phone: clientData.data.phone,
        CountryId: clientData.data.user.CountryId,
        city: clientData.data.user.city,
      });
    }
    if (collaboratorData && user.userTypeId === 2) {
      setInputValues({
        ...inputValues,
        GenderId: collaboratorData.data.GenderId,
        last_name: collaboratorData.data.last_name,
        CountryId: collaboratorData.data.user.CountryId,
        city: collaboratorData.data.user.city,
        name: collaboratorData.data.user.name,
      });
    }
  }, [providerData, clientData, countries, collaboratorData]);
  const handleSubmit = () => {
    if (providerData && user.userTypeId === 3) {
      providerMutate({
        last_name: inputValues.last_name,
        GenderId: inputValues.GenderId,
        name: inputValues.name,
        city: inputValues.city,
        CountryId: inputValues.CountryId,
      });
    }
    if (clientData && user.userTypeId === 1) {
      clientsMutate({
        name: inputValues.name,
        phone: inputValues.phone,
        CountryId: inputValues.CountryId,
        city: inputValues.city,
      });
    }
    if (collaboratorData && user.userTypeId === 2) {
      collaboratorsMutate({
        GenderId: inputValues.GenderId,
        last_name: inputValues.last_name,
        CountryId: inputValues.CountryId,
        city: inputValues.city,
        name: inputValues.name,
      });
    }
  };
  const handleCloseModal = () => setOpenClientModal(false);
  const handleChangeInputs = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };
  const handleImageUpload = (e) => {
    const imageFile = e.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    setSelectedImage(imageUrl);
    if (providerData && user.userTypeId === 3) {
      userProfilePicMutate({
        userId: user.id,
        file: imageFile,
      });
    }
    if (clientData && user.userTypeId === 1) {
      userProfilePicMutate({
        userId: user.id,
        file: imageFile,
      });
    }
    if (collaboratorData && user.userTypeId === 2) {
      userProfilePicMutate({
        userId: user.id,
        file: imageFile,
      });
    }
  };
  const providerInputsTheme = createTheme({
    palette: {
      primary: {
        main: "#ae7a6c",
      },
      secondary: {
        main: "#ebdcc1",
      },
      tertiary: {
        main: "#535353",
      },
    },
  });


  return (
    <div className="root__container">
      <header className="provider__image__container">
        <div className="provider__image">
          <UploadImage
            profileImage={
              selectedImage
                ? selectedImage
                : providerData?.data?.user?.profilePic
            }
            handleImageUpload={handleImageUpload}
            showFileUploadIcon={true}
          />
        </div>
      </header>
      <main className="provider__profile__container">
        {(clientIsLoading && countriesAreLoading) ||
          (providerIsLoading && countriesAreLoading) ||
          (providerIsLoading && countriesAreLoading) ? (
          <LoadingSpinner />
        ) : (
          <div className="provider__profile">
            <section className="provider__profile__first__section">
              {user.userTypeId === 1 && countriesSuccess ? (
                <div className="provider__profile__info__container">
                  <ThemeProvider theme={providerInputsTheme}>
                    <TextField
                      id="provider-input-name"
                      name="name"
                      label="Nombre"
                      variant="standard"
                      value={inputValues.name}
                      onChange={handleChangeInputs}
                    />
                    {/* <FormControl variant="standard">
                    <InputLabel id="demo-simple-select-standard-label">País</InputLabel>
                    <Select variant="standard" name="CountryId" value={inputValues.CountryId} onChange={handleChangeInputs} style={{ width: '100%' }}>
                      {countriesSuccess ? (
                        countries?.data?.map((country, index) => {
                          <MenuItem
                            key={index}
                            value={country.id}
                          >{country.name}
                          </MenuItem>
                        })
                      ) : null
                      }
                    </Select>
                  </FormControl> */}
                    <TextField
                      id="provider-input-phone"
                      name="phone"
                      label="Teléfono"
                      variant="standard"
                      value={inputValues.phone}
                      onChange={handleChangeInputs}
                    />
                    <TextField
                      id="provider-input-city"
                      name="city"
                      label="Ciudad"
                      variant="standard"
                      value={inputValues.city}
                      onChange={handleChangeInputs}
                    />
                    <TextField
                      id="provider-input-email"
                      name="email"
                      label="Correo"
                      disabled
                      variant="standard"
                      value={inputValues.email}
                      onChange={handleChangeInputs}
                    />
                  </ThemeProvider>
                </div>
              ) : (
                <div className="provider__profile__info__container">
                  <ThemeProvider theme={providerInputsTheme}>
                    <TextField
                      id="provider-input-name"
                      name="name"
                      label="Nombre"
                      variant="standard"
                      value={inputValues.name}
                      onChange={handleChangeInputs}
                    />
                    <TextField
                      id="provider-input-last-name"
                      name="last_name"
                      label="Apellido"
                      variant="standard"
                      value={inputValues.last_name}
                      onChange={handleChangeInputs}
                    />
                    <FormControl variant="standard">
                      <InputLabel id="demo-simple-select-standard-label">
                        Género
                      </InputLabel>
                      <Select
                        variant="standard"
                        name="GenderId"
                        value={inputValues.GenderId}
                        onChange={handleChangeInputs}
                        style={{ width: "100%" }}
                      >
                        <MenuItem value={1}>Masculino</MenuItem>
                        <MenuItem value={2}>Femenino</MenuItem>
                        <MenuItem value={3}>Otro</MenuItem>
                      </Select>
                    </FormControl>
                    {/* <FormControl variant="standard">
                    <InputLabel id="demo-simple-select-standard-label">País</InputLabel>
                    <Select variant="standard" name="CountryId" value={inputValues.CountryId} onChange={handleChangeInputs} style={{width:'100%'}}>
                      {countriesSuccess ? (
                        countries?.data?.map((country, index) => {
                          <MenuItem
                            key={index}
                            value={country.id}
                          >{country.name}
                          </MenuItem>
                        })
                      ) : null
                      }
                    </Select>
                  </FormControl> */}
                    <TextField
                      id="provider-input-city"
                      name="city"
                      label="Ciudad"
                      variant="standard"
                      value={inputValues.city}
                      onChange={handleChangeInputs}
                    />
                    <TextField
                      id="provider-input-email"
                      name="email"
                      label="Correo"
                      disabled
                      variant="standard"
                      value={inputValues.email}
                      onChange={handleChangeInputs}
                    />
                    <div className="provider__profile__info__date__container">
                      <p className="provider__profile__info__date__title">
                        Fecha de nacimiento
                      </p>
                      <input
                        type="date"
                        id="provider-profile-date"
                        className="provider__profile__info__date"
                      />
                    </div>
                  </ThemeProvider>
                </div>
              )}
              {providerIsLoading ? (
                <LoadingSpinner />
              ) : user.userTypeId === 3 ? (
                <div className="provider__profile__modals__container">
                  <div className="container__modal__availability">
                    <button
                      type="button"
                      className="btn__modal__availability"
                      onClick={() => setOpenClientModal(true)}
                    >
                      <div className="btn__modal__availability__items">
                        Agregar disponibilidad
                      </div>
                    </button>
                    <AddTimeAvailabilityModal
                      closeModal={handleCloseModal}
                      open={openClientModal}
                    />
                  </div>
                  <div className="container__modal__add__services">
                    <button
                      type="button"
                      className="btn__modal__availability"
                      onClick={() => setOpenClientModal(true)}
                    >
                      <div className="btn__modal__availability__items">
                        Agregar servicios
                      </div>
                    </button>
                  </div>
                </div>
              ) : null}
            </section>

            <section className="provider__profile__second__section">
              {user.userTypeId ? (
                <div className="provider__profile__buttons__container">
                  <div className="profile__contraseña">
                    <button className="profile__btnContraseña">
                      <img src={lockResetIcon} />
                      Cambiar contraseña
                    </button>
                  </div>
                  <button
                    type="submit"
                    className="profile__btnGuardar"
                    onClick={handleSubmit}
                  >
                    Actualizar perfil
                  </button>
                </div>
              ) : null}
              {providerIsLoading && countriesAreLoading ? (
                <LoadingSpinner />
              ) : user.userTypeId === 3 ? (
                <div className="provider__profile__documents__container">
                  <ThemeProvider theme={providerInputsTheme}>
                    <div className="provider__container">
                      <div className="provider__profile__documents">
                        <div className="provider__profile__documents__label">
                          Documento de identidad
                        </div>
                        <div className="provider__profile__documents__logo">
                          <img
                            className="provider__profile__documents__logo__icon"
                            src={idIcon}
                          />
                        </div>
                        <div className="provider__profile__documents__buttons__container">
                          <a href={providerData?.data?.dniDoc} download>
                            <IconButton>
                              <FileDownloadIcon color="tertiary" />
                            </IconButton>
                          </a>
                        </div>
                      </div>
                      <div className="provider__profile__documents">
                        <div className="provider__profile__documents__label">
                          Diploma de grado
                        </div>
                        <div className="provider__profile__documents__logo">
                          <img
                            className="provider__profile__documents__logo__icon"
                            src={displomaIcon}
                          />
                        </div>
                        <div className="provider__profile__documents__buttons__container">
                          <a href={providerData?.data?.universityDegree} download>
                            <IconButton>
                              <FileDownloadIcon color="tertiary" />
                            </IconButton>
                          </a>
                        </div>
                      </div>
                      <div className="provider__profile__documents">
                        <div className="provider__profile__documents__label">
                          Tarjeta profesional
                        </div>
                        <div className="provider__profile__documents__logo">
                          <img
                            className="provider__profile__documents__logo__icon"
                            src={proCardIcon}
                          />
                        </div>
                        <div className="provider__profile__documents__buttons__container">
                          <a href={providerData?.data?.profesionalCard} download>
                            <IconButton>
                              <FileDownloadIcon color="tertiary" />
                            </IconButton>
                          </a>
                        </div>
                      </div>
                      <div className="provider__profile__documents">
                        <div className="provider__profile__documents__label">
                          Currículum profesional
                        </div>
                        <div className="provider__profile__documents__logo">
                          <img
                            className="provider__profile__documents__logo__icon"
                            src={curriculum}
                          />
                        </div>
                        <div className="provider__profile__documents__buttons__container">
                          <a href={providerData?.data?.curriculum} download>
                            <IconButton>
                              <FileDownloadIcon color="tertiary" />
                            </IconButton>
                          </a>
                        </div>
                      </div>
                      <div className="provider__profile__documents">
                        <div className="provider__profile__documents__label">
                          Diploma de maestría
                        </div>
                        <div className="provider__profile__documents__logo">
                          <img
                            className="provider__profile__documents__logo__icon"
                            src={masterDegreeIcon}
                          />
                        </div>
                        <div className="provider__profile__documents__buttons__container">
                          <a href={providerData?.data?.masterDegree} download>
                            <IconButton>
                              <FileDownloadIcon color="tertiary" />
                            </IconButton>
                          </a>
                        </div>
                      </div>
                      <div className="provider__profile__documents">
                        <div className="provider__profile__documents__label">
                          Certificación bancaria
                        </div>
                        <div className="provider__profile__documents__logo">
                          <img
                            className="provider__profile__documents__logo__icon"
                            src={bankCertificate}
                          />
                        </div>
                        <div className="provider__profile__documents__buttons__container">
                          <a href={providerData?.data?.bankCertification} download>
                            <IconButton>
                              <FileDownloadIcon color="tertiary" />
                            </IconButton>
                          </a>
                        </div>
                      </div>
                    </div>
                  </ThemeProvider>
                </div>
              ) : null}
            </section>
          </div>
        )}
      </main>
    </div>
  );
};

export default Profile;
