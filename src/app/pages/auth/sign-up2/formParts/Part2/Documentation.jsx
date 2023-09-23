import { useForm } from "react-hook-form";
import "./DocumentationStyle.scss";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setParts } from "../../../../../redux/slices/registerSlice/registerSlice";

const Documentation = ({ step, setStep }) => {
  const [files, setFiles] = useState({});
  const dispatch = useDispatch();

  const dataSlice = useSelector((state) => state.register);
  console.log(dataSlice);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      antPenales: "",
      diploma: "",
      tarjProf: "",
      portServicios: "",
    },
  });

  const customHandleSubmit = (data) => {
    dispatch(
      setParts({
        antPenales: {
          name: files.antPenales,
          file: data.antPenales,
        },
        diploma: {
          name: files.diploma,
          file: data.diploma,
        },
        tarjProf: {
          name: files.tarjProf,
          file: data.tarjProf,
        },
        portServicios: {
          name: files.portServicios,
          file: data.portServicios,
        },
      })
    );
    setStep(step + 1);
  };

  const handleChange = (e) => {
    const { name, files } = e.target;

    setFiles({
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
          <input
            type="file"
            accept=".pdf"
            {...register("antPenales", {
              onChange: (e) => handleChange(e),
            })}
          />
          <p>{files.antPenales ? files.antPenales : "Subir Archivo"}</p>
        </div>
        <div className="wrapper-file_input">
          <h5>Diploma de Grado</h5>
          <input
            type="file"
            {...register("diploma", {
              onChange: (e) => handleChange(e),
            })}
          />
          <p>Subir Archivo</p>
        </div>
        <div className="wrapper-file_input">
          <h5>Tarjeta Profesional</h5>
          <input
            type="file"
            {...register("tarjProf", {
              onChange: (e) => handleChange(e),
            })}
          />
          <p>Subir Archivo</p>
        </div>
        <div className="wrapper-file_input">
          <h5>Portfolio de Servicios </h5>
          <input
            type="file"
            {...register("portServicios", {
              onChange: (e) => handleChange(e),
            })}
          />
          <p>Subir Archivo</p>
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
          type="submit"
          className="submit_btn"
          onClick={() => handleSubmit(customHandleSubmit)()}
        >
          siguiente
        </button>
      </div>
    </section>
  );
};

export default Documentation;
