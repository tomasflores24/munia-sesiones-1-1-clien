import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import "./PersonalInfo.scss";

const PersonalInfoTab = () => {
  return (
    <div className="info-personal">
      <h3 className="title-info-personal">
        Comencemos con la información más básica
      </h3>
      <div className="info">
        <div className="info-inputs">
          <div className="input-field">
            <input type="text" className="custom-input" placeholder="Nombre" />
          </div>
          <div className="input-field">
            <input type="email" className="custom-input" placeholder="Correo" />
          </div>
          <div className="input-field">
            <input type="tel" className="custom-input" placeholder="Teléfono" />
          </div>
          <div className="input-field">
            <input
              type="password"
              className="custom-input"
              placeholder="Contraseña"
            />
          </div>
          <div className="input-field">
            <input
              type="password"
              className="custom-input"
              placeholder="Repetir Contraseña"
            />
          </div>
        </div>

        <div className="upload-section">
          <div className="upload-image">
            <Avatar sx={{ width: 80, height: 80 }}>
              <InsertPhotoIcon fontSize="large" />
            </Avatar>
          </div>
        </div>
      </div>
      <div className="next-button">
        <Button variant="contained" color="primary">
          Siguiente
        </Button>
      </div>
    </div>
  );
};

export default PersonalInfoTab;
