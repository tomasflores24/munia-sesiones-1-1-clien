import PropTypes from "prop-types";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import "./UploadImage.scss";

const UploadImage = ({ profileImage, handleImageUpload, showFileUploadIcon }) => {
  return (
    <div
      className="upload-section"
      style={{
        backgroundImage: `url(${
          profileImage ? profileImage : "../../../../assets/noImageUser.png"
        })`,
      }}
    >
      <div className="upload-image">
        {showFileUploadIcon && (
          <label htmlFor="profile-image" className="upload-label">
            <FileUploadIcon visibility="hidden" sx={{fontSize:"15vh"}}/>
          </label>
        )}
        <input
          type="file"
          id="profile-image"
          name="profileImage"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageUpload}
        />
      </div>
    </div>
  );
};

UploadImage.propTypes = {
  profileImage: PropTypes.string, // URL de la imagen de perfil
  handleImageUpload: PropTypes.func.isRequired, // Función para manejar la carga de la imagen
  showFileUploadIcon: PropTypes.bool, // Prop para mostrar u ocultar el icono de carga de archivos
};

export default UploadImage;
