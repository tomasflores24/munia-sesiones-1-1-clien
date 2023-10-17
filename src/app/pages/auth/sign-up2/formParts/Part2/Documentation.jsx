import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./DocumentationStyle.scss";
import { setParts } from "../../../../../redux/slices/registerSlice/registerSlice";

const Documentation = ({ setStep }) => {
  const [fileNames, setFileNames] = useState({});
  const dispatch = useDispatch();

  const {
    dniDoc,
    universityDegree,
    masterDegree,
    curriculum,
    profesionalCard,
    bankCertification,
  } = useSelector((state) => state.register);

  useEffect(() => {
    setFileNames((prev) => ({
      ...prev,
      ...(dniDoc.name && {
        dniDoc: dniDoc.name,
      }),
      ...(universityDegree.name && {
        universityDegree: universityDegree.name,
      }),
      ...(masterDegree.name && {
        masterDegree: masterDegree.name,
      }),
      ...(curriculum.name && {
        curriculum: curriculum.name,
      }),
      ...(profesionalCard.name && {
        profesionalCard: profesionalCard.name,
      }),
      ...(bankCertification.name && {
        bankCertification: bankCertification.name,
      }),
    }));
  }, []);

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      dniDoc: dniDoc.file ? dniDoc.file : "",
      universityDegree: universityDegree.file ? universityDegree.file : "",
      masterDegree: masterDegree.file ? masterDegree.file : "",
      curriculum: curriculum.file ? curriculum.file : "",
      profesionalCard: profesionalCard.file ? profesionalCard.file : "",
      bankCertification: bankCertification.file ? bankCertification.file : "",
    },
  });

  const customHandleSubmit = (data) => {
    dispatch(
      setParts({
        dniDoc: {
          name: fileNames.dniDoc,
          file: data.dniDoc,
        },
        universityDegree: {
          name: fileNames.universityDegree,
          file: data.universityDegree,
        },
        masterDegree: {
          name: fileNames.masterDegree,
          file: data.masterDegree,
        },
        curriculum: {
          name: fileNames.curriculum,
          file: data.curriculum,
        },
        profesionalCard: {
          name: fileNames.profesionalCard,
          file: data.profesionalCard,
        },
        bankCertification: {
          name: fileNames.bankCertification,
          file: data.bankCertification,
        },
      })
    );
    setStep((prev) => prev + 1);
  };

  const handleChange = (e) => {
    const { name, files } = e.target;

    setFileNames((prev) => ({
      ...prev,
      [name]: files[0].name,
    }));
  };

  return (
    <section className="documentation__root">
      <h4>Comencemos con la información básica.</h4>
      <form
        className="documentation__form"
        onSubmit={handleSubmit(customHandleSubmit)}
      >
        <div className="wrapper-file_input">
          <h5>DNI documento</h5>
          <div className="img__container">
            <div className="upload">
              <img src="" alt="" className="profile" />
              <div className="round">
                <input
                  type="file"
                  accept=".pdf"
                  className="file-input__input"
                  {...register("dniDoc", {
                    onChange: (e) => handleChange(e),
                  })}
                />
              </div>
              <p className="pic-text">
                {fileNames.dniDoc ? fileNames.dniDoc : "Subir Archivo"}
              </p>
            </div>
          </div>
        </div>
        <div className="wrapper-file_input">
          <h5>Título universitario</h5>
          <div className="img__container">
            <div className="upload">
              <img src="" alt="" className="profile" />
              <div className="round">
                <input
                  type="file"
                  accept=".pdf"
                  className="file-input__input"
                  {...register("universityDegree", {
                    onChange: (e) => handleChange(e),
                  })}
                />
              </div>
              <p className="pic-text">
                {fileNames.universityDegree
                  ? fileNames.universityDegree
                  : "Subir Archivo"}
              </p>
            </div>
          </div>
        </div>
        <div className="wrapper-file_input">
          <h5>Título de maestria</h5>
          <div className="img__container">
            <div className="upload">
              <img src="" alt="" className="profile" />
              <div className="round">
                <input
                  type="file"
                  accept=".pdf"
                  className="file-input__input"
                  {...register("masterDegree", {
                    onChange: (e) => handleChange(e),
                  })}
                />
              </div>
              <p className="pic-text">
                {fileNames.masterDegree
                  ? fileNames.masterDegree
                  : "Subir Archivo"}
              </p>
            </div>
          </div>
        </div>
        <div className="wrapper-file_input">
          <h5>Currículum</h5>
          <div className="img__container">
            <div className="upload">
              <img src="" alt="" className="profile" />
              <div className="round">
                <input
                  type="file"
                  accept=".pdf"
                  className="file-input__input"
                  {...register("curriculum", {
                    onChange: (e) => handleChange(e),
                  })}
                />
              </div>
              <p className="pic-text">
                {fileNames.curriculum ? fileNames.curriculum : "Subir Archivo"}
              </p>
            </div>
          </div>
        </div>
        <div className="wrapper-file_input">
          <h5>Carta profesional</h5>
          <div className="img__container">
            <div className="upload">
              <img src="" alt="" className="profile" />
              <div className="round">
                <input
                  type="file"
                  accept=".pdf"
                  className="file-input__input"
                  {...register("profesionalCard", {
                    onChange: (e) => handleChange(e),
                  })}
                />
              </div>
              <p className="pic-text">
                {fileNames.profesionalCard
                  ? fileNames.profesionalCard
                  : "Subir Archivo"}
              </p>
            </div>
          </div>
        </div>
        <div className="wrapper-file_input">
          <h5>Certificación bancaria</h5>
          <div className="img__container">
            <div className="upload">
              <img src="" alt="" className="profile" />
              <div className="round">
                <input
                  type="file"
                  accept=".pdf"
                  className="file-input__input"
                  {...register("bankCertification", {
                    onChange: (e) => handleChange(e),
                  })}
                />
              </div>
              <p className="pic-text">
                {fileNames.bankCertification
                  ? fileNames.bankCertification
                  : "Subir Archivo"}
              </p>
            </div>
          </div>
        </div>
      </form>
      <div className="actions">
        <button
          type="button"
          className="back_btn"
          onClick={() => setStep((prev) => prev - 1)}
        >
          Atras
        </button>
        <button
          type="button"
          onClick={() => handleSubmit(customHandleSubmit)()}
          className={isValid ? "submit_btn" : "submit_btn disabled"}
        >
          Siguiente
        </button>
      </div>
    </section>
  );
};

Documentation.propTypes = {
  setStep: PropTypes.func,
};

export default Documentation;
