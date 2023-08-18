import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import "./DocumentationCard.scss";
import { unifiedString } from "../../utils/unifiedStrings";
import { useSelector } from "react-redux";
export const DocumentationCard = ({ title, getDocument }) => {
  const [documentationUser, setDocumentationUser] = useState({});

  const handleImageUpload = (e) => {
    const { name } = e.target;
    const imageFile = e.target.files[0];
    const documentUpload = URL.createObjectURL(imageFile);
    setDocumentationUser({ ...documentationUser, [name]: documentUpload });
    getDocument(documentationUser);
  };

  const documentImageUrl = `../../../assets/uploadDocument-${title}.png`;
  const documentationStorage = useSelector(
    (state) => state.registration.documentationUser
  );
  useEffect(() => {
    const showDocumentation = {
      backgroundImage: documentationStorage[unifiedString(title)]
        ? `url(${documentationStorage[unifiedString(title)]})`
        : documentationUser[title]
        ? `url(${documentationUser[title]})`
        : `url(${documentImageUrl})`,
    }[documentationStorage];
  });
  return (
    <div className="card">
      <h3>{title}</h3>
      <div
        className="upload-section"
        style={showDocumentation}
        // style={{
        //   backgroundImage: documentationUser[title]
        //     ? `url(${documentationUser[title]})`
        //     : `url(${documentImageUrl})`,
        // }}
      >
        <section className="upload">
          <label htmlFor={`${title}-document`} className="upload-icon">
            <FileUploadIcon sx={{ width: "60%", height: "90%" }} />
            <input
              type="file"
              id={`${title}-document`}
              name={unifiedString(title)}
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
          </label>
          {!documentationUser[title] && <p>Subir imagen</p>}
        </section>
      </div>
    </div>
  );
};

DocumentationCard.propTypes = {
  title: PropTypes.string.isRequired,
  getDocument: PropTypes.func,
};
