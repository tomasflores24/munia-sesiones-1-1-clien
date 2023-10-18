import "./Acceptance.scss";
import { useState } from "react";
import LoadingSpinner from "../../../shared/loadingSpinner/LoadingSpinner";
/* import BanUserModal from "../../../components/BanUserModal/BanUserModal"; */
import { Alert } from "@mui/material";
import { useQuery } from "react-query";
import { ProvidersServices } from "../../../services/dashboard/providers/providers.services";
import { useDeleteProvider } from "../../../hooks/provider/useProviders";
import TableShared from "../../../shared/table/tableShared";
import ModalAcceptance from "./Components/ModalAcceptance";

const appointmentHeaders = [
  "Profesional",
  "Servicios",
  "Sesiones agregadas",
  "Calificaciones",
  "Contacto",
  "Acciones",
];

const Acceptance = () => {
  const { isLoading, isSuccess, data, refetch } = useQuery(
    ["getInactiveProviders"],
    () => ProvidersServices.getInactiveProviders(),
    {
      enabled: true,
      refetchOnWindowFocus: false,
    }
  );
  const [showModal, setShowModal] = useState(false);
  const [dataModal, setDataModal] = useState();

  const onSearch = (event) => {
    event.preventDefault();
    const searchData = new FormData(event.target);
    console.log(searchData.get("search"));
  };

  const openModal = (provider) => {
    setShowModal(true);
    setDataModal(provider);
  };
  const closeModal = () => {
    setShowModal(false);
    refetch();
  };

  const documentos = [
    {
      nombre: "Certificación bancaria",
      contenido: data?.data?.masterDegree,
    },
    {
      nombre: "Diploma de grado",
      contenido: data?.data?.universityDegree,
    },
    {
      nombre: "Tarjeta profesional",
      contenido: data?.data?.dniDoc,
    },
    {
      nombre: "Portfolio de servicios",
      contenido: data?.data?.curriculum,
    },
  ];

  const descargarDocumentos = () => {
    documentos.forEach((documento) => {
      // Crea un objeto Blob con el contenido del documento
      const blob = new Blob([documento.contenido], { type: "application/pdf" });

      // Crea un enlace de descarga
      const a = document.createElement("a");
      a.href = documento.contenido;
      a.download = documento.nombre;
      a.style.display = "none";

      // Agrega el enlace al DOM y simula un clic
      document.body.appendChild(a);
      a.click();

      // Limpia y remueve el enlace
      window.URL.revokeObjectURL(a.href);
      document.body.removeChild(a);
    });
  };

  return (
    <div className="providers__root">
      <header className="providers__header">
        <h1 className="title">Profesionales</h1>
        <form className="providers__search_bar" onSubmit={onSearch}>
          <input
            type="text"
            name="search"
            placeholder="Buscar a un profesional"
            className="search__input"
          />
          <button type="submit" className="search__button">
            Buscar
          </button>
        </form>
      </header>
      {isLoading ? (
        <LoadingSpinner />
      ) : !isLoading && isSuccess ? (
        <div className="providers_table">
          <TableShared
            data={data.data || []}
            currentPage="Acceptance"
            headers={appointmentHeaders}
            openModal={openModal}
          />
          {data?.data?.length === 0 && (
            <Alert variant="filled" color="secondary" severity="info">
              Todavía no hay clientes, crea uno primero
            </Alert>
          )}
        </div>
      ) : (
        <Alert severity="error">No se pudieron cargar los clientes</Alert>
      )}
      {showModal && (
        <ModalAcceptance
          openModal={openModal}
          closeModal={closeModal}
          data={dataModal}
        />
      )}
    </div>
  );
};

export default Acceptance;
