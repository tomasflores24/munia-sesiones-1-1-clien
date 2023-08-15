import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import "./PersonalInfo.scss";

const PersonalInfoTab = () => {
  return (
    <div className="info-personal">
      <Typography variant="h6" align="center">
        Comencemos con la información más básica
      </Typography>
      <div className="info">
        <div className="info-inputs">
          <div className="input-field">
            <TextField label="Nombre" fullWidth />
          </div>
          <div className="input-field">
            <TextField label="Correo" fullWidth />
          </div>
          <div className="input-field">
            <TextField label="Teléfono" fullWidth />
          </div>
          <div className="input-field">
            <TextField label="Contraseña" fullWidth type="password" />
          </div>
          <div className="input-field">
            <TextField label="Repetir Contraseña" fullWidth type="password" />
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
