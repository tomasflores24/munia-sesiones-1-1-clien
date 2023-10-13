import "./ProviderProfile.scss";
import { useEffect, useState } from "react";
import AddTimeAvailabilityModal from "../../../../components/AddTimeAvailabilityModal/AddTimeAvailabilityModal";
import timeIcon from "/assets/timeIcon.png"
import lockResetIcon from "/assets/lockResetIcon.png"
import antecedentesPenalesIcon from "/assets/antecedentesPenalesIcon.png"
import displomaIcon from "/assets/diplomaIcon.png"
import proCardIcon from "/assets/proCardIcon.png"
import portfolioServiciosIcon from "/assets/portfolioServiciosIcon.png"
import subirImagenSVG from "/assets/subirImagenSVG.svg"
import Ellipse7 from "/assets/Ellipse7.svg"
import providerPic from "/assets/providerPic.png"
import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  ThemeProvider,
  createTheme,
  Button,
  IconButton,
} from "@mui/material";
import LoadingSpinner from "../../../../shared/loadingSpinner/LoadingSpinner";
import VisibilityIcon from '@mui/icons-material/Visibility';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import UploadImage from "../../../../components/uploadImages/UploadImage";
import { useQuery } from "react-query";
import { ProvidersServices } from "../../../../services/dashboard/providers/providers.services";
import { ClientsServices } from "../../../../services/dashboard/clients/clients.services";
import { useSelector } from "react-redux";
import { CollaboratorsService } from "../../../../services/dashboard/collaborators/collaborators.service";
import { CountriesServices } from "../../../../services/dashboard/countries/countries.services";



const ProviderProfile = () => {
  const user = useSelector(state => state.auth.auth.user);
  const { data: providerData, refetch: providerRefetch, isLoading: providerIsLoading } = useQuery(
    ["getProviderById"],
    () => ProvidersServices.getProviderById('7e6f5e4d-bb8a-4dc1-aa1b-6d5e4c3b2a1a')
  )
  /* user.providerId */
  const { data: clientData, isLoading: clientIsLoading } = useQuery(
    ["getCompaniesById"],
    () => ClientsServices.getCompaniesById('d224d2b3-8284-4105-9fb3-d61388edd35f')
  )
  /* user.companyId */
  const { data: collaboratorData, isLoading: collaboratorIsLoading } = useQuery(
    ["getCollaboratorById"],
    () => CollaboratorsService.getCollaboratorById('04351ef9-ba29-4bff-ac30-475bd5eba030')
  )
  /* user.collaboratorId */
  const { data: countries, isLoading: countriesAreLoading, isSuccess: countriesSuccess} = useQuery(
    ["getAllCountries"],
    () => CountriesServices.getAllCountries()
  )



  const inputsInitialState = {
    name: "",
    GenderId: "",
    phone: "",
    email: user.email,
    last_name: "",
    CountryId: '',
    city: "",
    birthDate: "",
  }
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
      })
    }
    if (clientData && user.userTypeId === 1) {
      setInputValues({
        name: clientData.data.user.name,
        phone: clientData.data.phone,
        CountryId: clientData.data.user.CountryId,
        city: clientData.data.user.city,
      })
    }
    if (collaboratorData && user.userTypeId === 2) {
      setInputValues({
        GenderId: collaboratorData.data.GenderId,
        last_name: collaboratorData.data.last_name,
        CountryId: collaboratorData.data.user.CountryId,
        city: collaboratorData.data.user.city,
        name: collaboratorData.data.user.name,
      })
    }

  }, [providerData, clientData, countries, collaboratorData])

  const handleSubmit = (e) => {
  }

  const handleDownload = () => {
    // Crear un enlace temporal para descargar la imagen en una nueva pestaña
    const downloadLink = document.createElement('a');
    downloadLink.href = antecedentesPenalesIcon;
    downloadLink.download = 'imagen.jpg';
    downloadLink.click();
  };

  const handleCloseModal = () => setOpenClientModal(false);

  const handleChangeInputs = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    })
  };

  const handleImageUpload = (e) => {
    const imageFile = e.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    setSelectedImage(imageUrl);
  };

  const providerInputsTheme = createTheme({
    palette: {
      primary: {
        main: '#ae7a6c',
      },
      secondary: {
        main: '#ebdcc1',
      },
      tertiary: {
        main: '#535353'
      }
    },
  });


  return (
    <div className="root__container">
      <header className="provider__image__container">
        <div className="provider__image">
          <UploadImage
            profileImage={selectedImage ? selectedImage : providerPic}
            handleImageUpload={handleImageUpload}
            showFileUploadIcon={true}
          />
        </div>
      </header>
      <main className="provider__profile__container">
        <div className="provider__profile">
          <section className="provider__profile__first__section">
            {clientIsLoading && countriesAreLoading ? (
              <LoadingSpinner />
            ) : user.userTypeId === 1 && countriesSuccess ?
              <div className="provider__profile__info__container">
                <ThemeProvider theme={providerInputsTheme}>
                  <TextField id="provider-input-name" name="name" label="Nombre" variant="standard" value={inputValues.name} onChange={handleChangeInputs} />
                  <FormControl variant="standard">
                    <InputLabel id="demo-simple-select-standard-label">País</InputLabel>
                    <Select variant="standard" name="CountryId" value={inputValues.CountryId} onChange={handleChangeInputs}>
                      {countriesSuccess ? (
                        countries?.data?.map((country, index) => {
                          <MenuItem
                            key={index}
                            value={country.id}
                          >{country.name}
                          </MenuItem>
                        })
                      ): null
                      }
                    </Select>
                  </FormControl>
                  <TextField id="provider-input-phone" name="phone" label="Teléfono" variant="standard" value={inputValues.phone} onChange={handleChangeInputs} />
                  <TextField id="provider-input-city" name="city" label="Ciudad" variant="standard" value={inputValues.city} onChange={handleChangeInputs} />
                  <TextField id="provider-input-email" name="email" label="Correo" disabled variant="standard" value={inputValues.email} onChange={handleChangeInputs} />
                </ThemeProvider>
              </div>
              : <div className="provider__profile__info__container">
                <ThemeProvider theme={providerInputsTheme}>
                  <TextField id="provider-input-name" name="name" label="Nombre" variant="standard" value={inputValues.name} onChange={handleChangeInputs} />
                  <TextField id="provider-input-last-name" name="last_name" label="Apellido" variant="standard" value={inputValues.last_name} onChange={handleChangeInputs} />
                  <FormControl variant="standard">
                    <InputLabel id="demo-simple-select-standard-label">Género</InputLabel>
                    <Select variant="standard" name="GenderId" value={inputValues.GenderId} onChange={handleChangeInputs}>
                      <MenuItem value={1}>Masculino</MenuItem>
                      <MenuItem value={2}>Femenino</MenuItem>
                      <MenuItem value={3}>Otro</MenuItem>

                    </Select>
                  </FormControl>
                  {/* <FormControl variant="standard">
                    <InputLabel id="demo-simple-select-standard-label">País</InputLabel>
                    <Select variant="standard" name="CountryId" value={inputValues.CountryId} onChange={handleChangeInputs}>
                      <MenuItem value="Argentina">Argentina</MenuItem>
                      <MenuItem value="Colombia">Colombia</MenuItem>
                    </Select>
                  </FormControl> */}
                  <TextField id="provider-input-city" name="city" label="Ciudad" variant="standard" value={inputValues.city} onChange={handleChangeInputs} />
                  <TextField id="provider-input-email" name="email" label="Correo" disabled variant="standard" value={inputValues.email} onChange={handleChangeInputs} />
                  <div className="provider__profile__info__date__container">
                    <p className="provider__profile__info__date__title">Fecha de nacimiento</p>
                    <input type="date" id="provider-profile-date" className="provider__profile__info__date" />
                  </div>
                </ThemeProvider>
              </div>
            }
            {providerIsLoading ? (
              <LoadingSpinner />
            ) : user.userTypeId === 3 ?
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
                  {/* <SelectServices
                  closeModal={}
                  providerId={"81a9c3f8-28e3-4c21-98ab-e820c61ea52b"}
                /> */}
                </div>
              </div>
              : null
            }
          </section>
          <section className="provider__profile__second__section">
            <div className="provider__profile__buttons__container">
              <div className="profile__contraseña">
                <button className="profile__btnContraseña">
                  <img src={lockResetIcon} />
                  Cambiar contraseña
                </button>
              </div>
              <button type="submit" className="profile__btnGuardar" onClick={handleSubmit} /* disabled={} */>Actualizar perfil</button>
            </div>
            {user.userTypeId === 3 ?
              <div className="provider__profile__documents__container">
                <ThemeProvider theme={providerInputsTheme}>
                  <div className="provider__profile__documents">
                    <div className="provider__profile__documents__label">Antecedentes penales</div>
                    <div className="provider__profile__documents__logo">
                      <div className="provider__profile__documents__logo__background" />
                      <img className="provider__profile__documents__logo__icon" src={antecedentesPenalesIcon} />
                    </div>
                    <div className="provider__profile__documents__buttons__container">
                      <a href={providerData?.data.user.profilePic} target="_blank" rel="noopener noreferrer">
                        <IconButton>
                          <VisibilityIcon color="tertiary" />
                        </IconButton>
                      </a>
                      <a href={providerData?.data.user.profilePic} download>
                        <IconButton>
                          <FileDownloadIcon color="tertiary" />
                        </IconButton>
                      </a>
                    </div>
                  </div>
                  <div className="provider__profile__documents">
                    <div className="provider__profile__documents__label">Diploma de grado</div>
                    <div className="provider__profile__documents__logo">
                      <div className="provider__profile__documents__logo__background" />
                      <img className="provider__profile__documents__logo__icon" src={displomaIcon} />
                    </div>
                    <div className="provider__profile__documents__buttons__container">
                      <a href={providerData?.data.user.profilePic} target="_blank" rel="noopener noreferrer">
                        <IconButton>
                          <VisibilityIcon color="tertiary" />
                        </IconButton>
                      </a>
                      <a href={providerData?.data.user.profilePic} download>
                        <IconButton>
                          <FileDownloadIcon color="tertiary" />
                        </IconButton>
                      </a>
                    </div>
                  </div>
                  <div className="provider__profile__documents">
                    <div className="provider__profile__documents__label">Tarjeta profesional</div>
                    <div className="provider__profile__documents__logo">
                      <div className="provider__profile__documents__logo__background" />
                      <img className="provider__profile__documents__logo__icon" src={proCardIcon} />
                    </div>
                    <div className="provider__profile__documents__buttons__container">
                      <a href={providerData?.data.user.profilePic} target="_blank" rel="noopener noreferrer">
                        <IconButton>
                          <VisibilityIcon color="tertiary" />
                        </IconButton>
                      </a>
                      <a href={providerData?.data.user.profilePic} download>
                        <IconButton>
                          <FileDownloadIcon color="tertiary" />
                        </IconButton>
                      </a>
                    </div>
                  </div>
                  <div className="provider__profile__documents">
                    <div className="provider__profile__documents__label">Portfolio de servicios</div>
                    <div className="provider__profile__documents__logo">
                      <div className="provider__profile__documents__logo__background" />
                      <img className="provider__profile__documents__logo__icon" src={portfolioServiciosIcon} />
                    </div>
                    <div className="provider__profile__documents__buttons__container">
                      <a href={providerData?.data.user.profilePic} target="_blank" rel="noopener noreferrer">
                        <IconButton>
                          <VisibilityIcon color="tertiary" />
                        </IconButton>
                      </a>
                      <a href={providerData?.data.user.profilePic} download>
                        <IconButton>
                          <FileDownloadIcon color="tertiary" />
                        </IconButton>
                      </a>
                    </div>
                  </div>
                </ThemeProvider>
              </div>
              : null
            }
          </section>
        </div>
      </main>
    </div>
  );
};

export default ProviderProfile;
