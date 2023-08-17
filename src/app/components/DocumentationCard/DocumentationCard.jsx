import "./DocumentationCard.scss"; // Archivo de estilos Sass
import PropTypes from "prop-types";
import UploadIcon from '@mui/icons-material/Upload';

export const DocumentationCard = ({ title }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <div className="upload-section">
        <div className="upload-icon">
          <UploadIcon />
        </div>
        <p>Subir imagen</p>
      </div>
    </div>
  );
};

DocumentationCard.propTypes = {
  title: PropTypes.string.isRequired,
};
