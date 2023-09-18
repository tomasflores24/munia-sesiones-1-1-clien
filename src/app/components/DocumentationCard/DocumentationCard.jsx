import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import "./DocumentationCard.scss";
import { unifiedString } from "../../utils/unifiedStrings";
import { saveDocumentationUser } from "../../redux/slices/registrationSlice/registrationSlice";

export const DocumentationCard = ({ title }) => {
  const dispatch = useDispatch();
  const documentationStorage = useSelector(
    (state) => state.registration.documentationUser[unifiedString(title)]
  );
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = (e) => {
    const imageFile = e.target.files[0];
    const documentUpload = URL.createObjectURL(imageFile);

    // Dispatch action to update Redux state with the uploaded image
    setImagePreview(documentUpload);
    dispatch(saveDocumentationUser({ [unifiedString(title)]: documentUpload }));
  };

  // { title: "Antecedentes Penales" },
  //   { title: "Diploma de Grado" },
  //   { title: "Tarjeta Profesional" },
  //   { title: "Portfolio de Servicios" },
  useEffect(() => {
    if (documentationStorage) {
      setImagePreview(documentationStorage);
    }
  }, [documentationStorage]);

  //imagen a mostrar card
  const images = {
    backgroundImage: `url(${
      imagePreview
        ? imagePreview
        : title === "Antecedentes Penales"
        ? "../../../assets/antecedenteNotFound.png"
        : title === "Diploma de Grado"
        ? "../../../assets/diplomaNotFound.png"
        : title === "Tarjeta Profesional"
        ? "../../../assets/tarjetaNotFound.png"
        : title === "Portfolio de Servicios"
        ? "../../../assets/portFolioNotFound.png"
        : null
    })`,
  };
  return (
    <div className="card">
      <h3>{title}</h3>
      <div className="upload-section" style={images}>
        <section className="upload">
          <label htmlFor={`${title}-document`} className="upload-icon">
            <FileUploadOutlinedIcon sx={{ width: "60%", height: "90%", cursor: 'pointer' }} />
            <input
              type="file"
              id={`${title}-document`}
              name={unifiedString(title)}
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
            Subir imagen
          </label>
        </section>
      </div>
    </div>
  );
};

DocumentationCard.propTypes = {
  title: PropTypes.string.isRequired,
};
