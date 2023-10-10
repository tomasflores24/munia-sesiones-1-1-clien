import "./ProviderProfile.scss";
import { useState } from "react";
import AddTimeAvailabilityModal from "../../../../components/AddTimeAvailabilityModal/AddTimeAvailabilityModal";
import Ellipse7 from "/assets/Ellipse7.png"
import timeIcon from "/assets/timeIcon.png"
import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import UploadImage from "../../../../components/uploadImages/UploadImage";


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
  const handleCloseModal = () => setOpenClientModal(false);
  const [inputValues, setInputValues] = useState(inputsInitialState);
  const [selectedImage, setSelectedImage] = useState(null);

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


            </div>
          </section>
          <section className="provider__profile__second__section">
            <div className="provider__profile__buttons__container">

            </div>
            <div className="provider__profile__documents__container">

            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ProviderProfile;
