import "./ProviderProfile.scss";
import { useState } from "react";
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
} from "@mui/material";
import UploadImage from "../../../../components/uploadImages/UploadImage";
import { useQuery } from "react-query";
import { ProvidersServices } from "../../../../services/dashboard/providers/providers.services";
import { useSelector } from "react-redux";

/* import SelectServices from "../../../../components/AddTimeAvailabilityModal/modalParts/part3/SelectServices"; */


const inputsInitialState = {
  name: "",
  GenderId: "",
  phone: "",
  email: "",
  last_name: "",
  CountryId: "",
  city: "",
  birthDate: "",
}

const ProviderProfile = () => {
  const [openClientModal, setOpenClientModal] = useState(false);
  const [inputValues, setInputValues] = useState(inputsInitialState);
  const [selectedImage, setSelectedImage] = useState(null);

  const { data: providerData } = useQuery(
    ["getProviderById"],
    () => ProvidersServices.getProviderById("7e6f5e4d-bb8a-4dc1-aa1b-6d5e4c3b2a1a")
  )

  const user = useSelector(state => state.auth.auth.user);
  const handleSubmit = (e) => {
    console.log(user.userTypeId);
  }

  const handleCloseModal = () => setOpenClientModal(false);

  const handleChangeInputs = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    })
    /* console.log(value); */
  }

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
            <div className="provider__profile__info__container">
              <ThemeProvider theme={providerInputsTheme}>
                <TextField id="standard-basic" name="name" label="Nombre" variant="standard" value={inputValues.name} onChange={handleChangeInputs} />
                <TextField id="standard-basic" name="last_name" label="Apellido" variant="standard" value={inputValues.last_name} onChange={handleChangeInputs} />
                <FormControl variant="standard">
                  <InputLabel id="demo-simple-select-standard-label">Género</InputLabel>
                  <Select variant="standard" name="GenderId" value={inputValues.GenderId} onChange={handleChangeInputs}>
                    <MenuItem value={1}>Masculino</MenuItem>
                    <MenuItem value={2}>Femenino</MenuItem>
                    <MenuItem value={3}>Otro</MenuItem>

                  </Select>
                </FormControl>
                <FormControl variant="standard">
                  <InputLabel id="demo-simple-select-standard-label">País</InputLabel>
                  <Select variant="standard" name="CountryId" value={inputValues.CountryId} onChange={handleChangeInputs}>
                    <MenuItem value="Argentina">Argentina</MenuItem>
                    <MenuItem value="Colombia">Colombia</MenuItem>
                  </Select>
                </FormControl>
                <TextField id="standard-basic" name="phone" label="Teléfono" variant="standard" value={inputValues.phone} onChange={handleChangeInputs} />
                <TextField id="standard-basic" name="city" label="Ciudad" variant="standard" value={inputValues.city} onChange={handleChangeInputs} />
                <TextField id="standard-basic" name="email" label="Correo" variant="standard" value={inputValues.email} onChange={handleChangeInputs} />
                <div className="provider__profile__info__date__container">
                  <p style={{width:'max-content'}}>Fecha de nacimiento</p>
                <input type="date" on id="provider-profile-date" className="provider__profile__info__date" />
                </div>
              </ThemeProvider>
            </div>
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
            <div className="provider__profile__documents__container">

              <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                <div style={{ left: 0, top: 0, position: 'absolute', color: 'black', fontSize: 10, fontFamily: 'Montserrat', fontWeight: '600', wordWrap: 'break-word' }}>Antecedentes penales</div>
                <div style={{ width: 100, height: 100, left: 5, top: 18, position: 'absolute' }}>
                  <div style={{ width: 100, height: 100, left: 0, top: 0, position: 'absolute', background: '#D9D9D9', borderRadius: 9999 }} />
                  <img style={{ width: 75, height: 75, left: 12, top: 11, position: 'absolute' }} src={antecedentesPenalesIcon} />
                  {/* <label htmlFor="profile-documents-input">
                  <input
                    type="file"
                    id="profile-documents-input"
                    name="profileImage"
                    accept=".pdf"
                    style={{ display: "none" }}
                    />
                  </label> */}
                </div>
              </div>

              <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                <div style={{ left: 0, top: 0, position: 'absolute', color: 'black', fontSize: 10, fontFamily: 'Montserrat', fontWeight: '600', wordWrap: 'break-word' }}>Diploma de grado</div>
                <div style={{ width: 100, height: 100, left: 5, top: 18, position: 'absolute' }}>
                  <div style={{ width: 100, height: 100, left: 0, top: 0, position: 'absolute', background: '#D9D9D9', borderRadius: 9999 }} />
                  <img style={{ width: 75, height: 74, left: 12, top: 17, position: 'absolute' }} src={displomaIcon} />
                </div>
              </div>

              <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                <div style={{ left: 0, top: 0, position: 'absolute', color: 'black', fontSize: 10, fontFamily: 'Montserrat', fontWeight: '600', wordWrap: 'break-word' }}>Tarjeta profesional</div>
                <div style={{ width: 100, height: 100, left: 5, top: 18, position: 'absolute' }}>
                  <div style={{ width: 100, height: 100, left: 0, top: 0, position: 'absolute', background: '#D9D9D9', borderRadius: 9999 }} />
                  <img style={{ width: 75, height: 75, left: 12, top: 11, position: 'absolute' }} src={proCardIcon} />
                </div>
              </div>

              <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                <div style={{ left: 0, top: 0, position: 'absolute', color: 'black', fontSize: 10, fontFamily: 'Montserrat', fontWeight: '600', wordWrap: 'break-word' }}>Portfolio de servicios</div>
                <div style={{ width: 100, height: 100, left: 5, top: 18, position: 'absolute' }}>
                  <div style={{ width: 100, height: 100, left: 0, top: 0, position: 'absolute', background: '#D9D9D9', borderRadius: 9999 }} />
                  <img style={{ width: 78, height: 73, left: 15, top: 17, position: 'absolute' }} src={portfolioServiciosIcon} />
                </div>
              </div>

            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ProviderProfile;
