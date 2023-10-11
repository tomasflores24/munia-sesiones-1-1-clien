import "./ProviderProfile.scss";
import { useState } from "react";
import AddTimeAvailabilityModal from "../../../../components/AddTimeAvailabilityModal/AddTimeAvailabilityModal";
import Ellipse7 from "/assets/Ellipse7.png"
import timeIcon from "/assets/timeIcon.png"
import lockResetIcon from "/assets/lockResetIcon.png"
import antecedentesPenalesIcon from "/assets/antecedentesPenalesIcon.png"
import displomaIcon from "/assets/diplomaIcon.png"
import proCardIcon from "/assets/proCardIcon.png"
import portfolioServiciosIcon from "/assets/portfolioServiciosIcon.png"

import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import UploadImage from "../../../../components/uploadImages/UploadImage";
/* import SelectServices from "../../../../components/AddTimeAvailabilityModal/modalParts/part3/SelectServices"; */


const inputsInitialState = {
  nombre: "",
  género: "",
  teléfono: "",
  correo: "",
  apellido: "",
  país: "",
  ciudad: "",
  fechaDeNacimiento: "",
}

const ProviderProfile = () => {
  const [openClientModal, setOpenClientModal] = useState(false);
  const [inputValues, setInputValues] = useState(inputsInitialState);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleCloseModal = () => setOpenClientModal(false);

  const handleChangeInputs = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    })
  }

  const handleImageUpload = (e) => {
    const imageFile = e.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    setSelectedImage(imageUrl);
  };

  return (
    <div className="root__container">
      <header className="provider__image__container">
        <div className="provider__image">
          <UploadImage
            profileImage={selectedImage ? selectedImage : Ellipse7}
            handleImageUpload={handleImageUpload}
            showFileUploadIcon={true}
          />
        </div>
      </header>
      <main className="provider__profile__container">
        <div className="provider__profile">
          <section className="provider__profile__first__section">
            <div className="provider__profile__info__container">
              <TextField id="standard-basic" label="Nombre" variant="standard" />
              <TextField id="standard-basic" label="Apellido" variant="standard" />
              <FormControl variant="standard">
                <InputLabel id="demo-simple-select-standard-label">Género</InputLabel>
                <Select variant="standard" name="género" value={inputValues.género} onChange={handleChangeInputs}>
                  <MenuItem value="Masculino">Masculino</MenuItem>
                  <MenuItem value="femenino" >Femenino</MenuItem>
                  <MenuItem value="otro">Otro</MenuItem>

                </Select>
              </FormControl>
              <FormControl variant="standard">
                <InputLabel id="demo-simple-select-standard-label">País</InputLabel>
                <Select variant="standard" name="país" value={inputValues.país} onChange={handleChangeInputs}>
                  <MenuItem value="Argentina">Argentina</MenuItem>
                  <MenuItem value="Colombia">Colombia</MenuItem>
                </Select>
              </FormControl>
              <TextField id="standard-basic" label="Teléfono" variant="standard" />
              <FormControl variant="standard">
                <InputLabel id="demo-simple-select-standard-label">Ciudad</InputLabel>
                <Select variant="standard" name="ciudad" value={inputValues.ciudad} onChange={handleChangeInputs}>
                  <MenuItem value="Opción 1">Opción 1</MenuItem>
                </Select>
              </FormControl>
              <TextField id="standard-basic" label="Correo" variant="standard" />
              <FormControl variant="standard">
                <InputLabel id="demo-simple-select-standard-label">Fecha de nacimiento</InputLabel>
                <Select variant="standard" name="fechaDeNacimiento" value={inputValues.fechaDeNacimiento} onChange={handleChangeInputs}>
                  <MenuItem value="Opción 1">Opción 1</MenuItem>
                </Select>
              </FormControl>
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
              <button className="profile__btnGuardar">Actualizar perfil</button>
            </div>
            <div className="provider__profile__documents__container">

              <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                <div style={{ left: 0, top: 0, position: 'absolute', color: 'black', fontSize: 10, fontFamily: 'Montserrat', fontWeight: '600', wordWrap: 'break-word' }}>Antecedentes penales</div>
                <div style={{ width: 100, height: 100, left: 5, top: 18, position: 'absolute' }}>
                  <div style={{ width: 100, height: 100, left: 0, top: 0, position: 'absolute', background: '#D9D9D9', borderRadius: 9999 }} />
                  <img style={{ width: 75, height: 75, left: 12, top: 11, position: 'absolute' }} src={antecedentesPenalesIcon} />
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
