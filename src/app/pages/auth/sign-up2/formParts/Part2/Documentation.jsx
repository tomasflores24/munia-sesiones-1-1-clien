import { useForm } from "react-hook-form";
import "./DocumentationStyle.scss";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setParts } from "../../../../../redux/slices/registerSlice/registerSlice";

const Documentation = ({ step, setStep }) => {
  const [filesValue, setFiles] = useState({});
  const dispatch = useDispatch();

  const { antPenales, diploma, tarjProf, portServicios } = useSelector(
    (state) => state.register
  );

  useEffect(() => {
    if (
      antPenales.name ||
      diploma.name ||
      tarjProf.name ||
      portServicios.name
    ) {
      setFiles({
        ...filesValue,
        ...(antPenales && {
          antPenales: antPenales.name,
        }),
        ...(diploma && {
          diploma: diploma.name,
        }),
        ...(tarjProf && {
          tarjProf: tarjProf.name,
        }),
        ...(portServicios && {
          portServicios: portServicios.name,
        }),
      });
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      antPenales: antPenales.file ? antPenales.file : "",
      diploma: diploma.file ? diploma.file : "",
      tarjProf: tarjProf.file ? tarjProf.file : "",
      portServicios: portServicios.file ? portServicios.file : "",
    },
  });

  const customHandleSubmit = (data) => {
    dispatch(
      setParts({
        antPenales: {
          name: filesValue.antPenales,
          file: data.antPenales,
        },
        diploma: {
          name: filesValue.diploma,
          file: data.diploma,
        },
        tarjProf: {
          name: filesValue.tarjProf,
          file: data.tarjProf,
        },
        portServicios: {
          name: filesValue.portServicios,
          file: data.portServicios,
        },
      })
    );
    setStep(step + 1);
  };

  const handleChange = (e) => {
    const { name, files } = e.target;

    setFiles({
      ...filesValue,
      [name]: files[0].name,
    });
  };

  return (
    <section className="documentation__root">
      <h4>Comencemos con la información básica.</h4>
      <form
        className="documentation__form"
        onSubmit={handleSubmit(customHandleSubmit)}
      >
        <div className="wrapper-file_input">
          <h5>Antecendentes Penales</h5>
          <div className="img__container">
            <div className="upload">
              <img src="" alt="" className="profile" />
              <div className="round">
                <input
                  type="file"
                  accept=".pdf"
                  className="file-input__input"
                  {...register("antPenales", {
                    onChange: (e) => handleChange(e),
                  })}
                />
              </div>
              <p className="pic-text">
                {filesValue.antPenales
                  ? filesValue.antPenales
                  : "Subir Archivo"}
              </p>
            </div>
          </div>
        </div>
        <div className="wrapper-file_input">
          <h5>Antecendentes Penales</h5>
          <div className="img__container">
            <div className="upload">
              <img src="" alt="" className="profile" />
              <div className="round">
                <input
                  type="file"
                  accept=".pdf"
                  className="file-input__input"
                  {...register("diploma", {
                    onChange: (e) => handleChange(e),
                  })}
                />
              </div>
              <p className="pic-text">
                {filesValue.diploma ? filesValue.diploma : "Subir Archivo"}
              </p>
            </div>
          </div>
        </div>
        <div className="wrapper-file_input">
          <h5>Antecendentes Penales</h5>
          <div className="img__container">
            <div className="upload">
              <img src="" alt="" className="profile" />
              <div className="round">
                <input
                  type="file"
                  accept=".pdf"
                  className="file-input__input"
                  {...register("tarjProf", {
                    onChange: (e) => handleChange(e),
                  })}
                />
              </div>
              <p className="pic-text">
                {filesValue.tarjProf ? filesValue.tarjProf : "Subir Archivo"}
              </p>
            </div>
          </div>
        </div>
        <div className="wrapper-file_input">
          <h5>Antecendentes Penales</h5>
          <div className="img__container">
            <div className="upload">
              <img src="" alt="" className="profile" />
              <div className="round">
                <input
                  type="file"
                  accept=".pdf"
                  className="file-input__input"
                  {...register("portServicios", {
                    onChange: (e) => handleChange(e),
                  })}
                />
              </div>
              <p className="pic-text">
                {filesValue.portServicios
                  ? filesValue.portServicios
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
          onClick={() => setStep(step - 1)}
        >
          atras
        </button>
        <button
          type="button"
          onClick={() => handleSubmit(customHandleSubmit)()}
          className={isValid ? "submit_btn" : "submit_btn disabled"}
        >
          siguiente
        </button>
      </div>
    </section>
  );
};

export default Documentation;
