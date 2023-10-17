import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import "./DocumentationStyle.scss";
import { setParts } from "../../../../../redux/slices/registerSlice/registerSlice";

const filesSchema = yup.object({
  dniDoc: yup
    .mixed()
    .test("required", "Debe proporcionar Documento de DNI", (value) => {
      return value && value.length;
    })
    .test("fileSize", "El archivo tiene que ser menos de 2MB", (value) => {
      return value && value[0] && value[0].size <= 2000000;
    }),
  universityDegree: yup
    .mixed()
    .test(
      "required",
      "Debe proporcionar Documento de Titulación Universitaria",
      (value) => {
        return value && value.length;
      }
    )
    .test("fileSize", "El archivo tiene que ser menos de 2MB", (value) => {
      return value && value[0] && value[0].size <= 2000000;
    }),
  masterDegree: yup
    .mixed()
    .test("fileSize", "El archivo tiene que ser menos de 2MB", (value) => {
      return value?.[0] ? value[0].size <= 2000000 : true;
    }),
  curriculum: yup
    .mixed()
    .test(
      "required",
      "Debe proporcionar Documento de Curriculum",
      (value) => {
        return value && value.length;
      }
    )
    .test("fileSize", "El archivo tiene que ser menos de 2MB", (value) => {
      return value && value[0] && value[0].size <= 2000000;
    }),
  profesionalCard: yup
    .mixed()
    .test("fileSize", "El archivo tiene que ser menos de 2MB", (value) => {
      return value?.[0] ? value[0].size <= 2000000 : true;
    }),
  bankCertification: yup
    .mixed()
    .test(
      "required",
      "Debe proporcionar Documento de Certificación Bancaria",
      (value) => {
        return value && value.length;
      }
    )
    .test("fileSize", "El archivo tiene que ser menos de 2MB", (value) => {
      return value && value[0] && value[0].size <= 2000000;
    }),
});

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({
    resolver: yupResolver(filesSchema),
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
      <h4 className="subtitle">Comencemos con la información básica.</h4>
      <form
        className="documentation__form"
        onSubmit={handleSubmit(customHandleSubmit)}
      >
        <div className="wrapper-file_input">
          <InputLabel required>DNI documento</InputLabel>
          <div className="file__container">
            <Button
              component="label"
              variant="contained"
              fullWidth
              startIcon={<CloudUploadIcon className="fileBtn_icon" />}
            >
              {fileNames.dniDoc ? fileNames.dniDoc : "Subir Archivo"}
              <VisuallyHiddenInput
                type="file"
                accept=".pdf"
                {...register("dniDoc", {
                  onChange: (e) => handleChange(e),
                })}
              />
            </Button>
            {errors?.dniDoc && (
              <p className="error_text">{errors?.dniDoc?.message}</p>
            )}
          </div>
        </div>
        <div className="wrapper-file_input">
          <InputLabel required>Título universitario</InputLabel>
          <div className="file__container">
            <Button
              component="label"
              variant="contained"
              fullWidth
              startIcon={<CloudUploadIcon className="fileBtn_icon" />}
            >
              {fileNames.universityDegree
                ? fileNames.universityDegree
                : "Subir Archivo"}
              <VisuallyHiddenInput
                type="file"
                accept=".pdf"
                {...register("universityDegree", {
                  onChange: (e) => handleChange(e),
                })}
              />
            </Button>
            {errors?.universityDegree && (
              <p className="error_text">{errors?.universityDegree?.message}</p>
            )}
          </div>
        </div>
        <div className="wrapper-file_input">
          <InputLabel>Título de maestria</InputLabel>
          <div className="file__container">
            <Button
              fullWidth
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon className="fileBtn_icon" />}
            >
              {fileNames.masterDegree
                ? fileNames.masterDegree
                : "Subir Archivo"}
              <VisuallyHiddenInput
                type="file"
                accept=".pdf"
                {...register("masterDegree", {
                  onChange: (e) => handleChange(e),
                })}
              />
            </Button>
            {errors?.masterDegree && (
              <p className="error_text">{errors?.masterDegree?.message}</p>
            )}
          </div>
        </div>
        <div className="wrapper-file_input">
          <InputLabel required>Currículum</InputLabel>
          <div className="file__container">
            <Button
              component="label"
              variant="contained"
              fullWidth
              startIcon={<CloudUploadIcon className="fileBtn_icon" />}
            >
              {fileNames.curriculum ? fileNames.curriculum : "Subir Archivo"}
              <VisuallyHiddenInput
                type="file"
                accept=".pdf"
                {...register("curriculum", {
                  onChange: (e) => handleChange(e),
                })}
              />
            </Button>
            {errors?.curriculum && (
              <p className="error_text">{errors?.curriculum?.message}</p>
            )}
          </div>
        </div>
        <div className="wrapper-file_input">
          <InputLabel>Carta profesional</InputLabel>
          <div className="file__container">
            <Button
              component="label"
              variant="contained"
              fullWidth
              startIcon={<CloudUploadIcon className="fileBtn_icon" />}
            >
              {fileNames.profesionalCard
                ? fileNames.profesionalCard
                : "Subir Archivo"}
              <VisuallyHiddenInput
                type="file"
                accept=".pdf"
                {...register("profesionalCard", {
                  onChange: (e) => handleChange(e),
                })}
              />
            </Button>
            {errors?.profesionalCard && (
              <p className="error_text">{errors?.profesionalCard?.message}</p>
            )}
          </div>
        </div>
        <div className="wrapper-file_input">
          <InputLabel required>Certificación bancaria</InputLabel>
          <div className="file__container">
            <Button
              component="label"
              variant="contained"
              fullWidth
              startIcon={<CloudUploadIcon className="fileBtn_icon" />}
            >
              {fileNames.bankCertification
                ? fileNames.bankCertification
                : "Subir Archivo"}
              <VisuallyHiddenInput
                type="file"
                accept=".pdf"
                {...register("bankCertification", {
                  onChange: (e) => handleChange(e),
                })}
              />
            </Button>
            {errors?.bankCertification && (
              <p className="error_text">{errors?.bankCertification?.message}</p>
            )}
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
