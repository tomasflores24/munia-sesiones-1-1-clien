import { useState } from "react";
import {
  useDeleteProvider,
  useGetProviders,
} from "../../../hooks/provider/useProviders";
import LoadingSpinner from "../../../shared/loadingSpinner/LoadingSpinner";
import TableShared from "../../../shared/table/TableShared";
import "./ProviderStyle.scss";
import BanUserModal from "../../../components/BanUserModal/BanUserModal";
import { Alert } from "@mui/material";

const appointmentHeaders = [
  "Profesional",
  "Servicios",
  "Sesiones agregadas",
  "Calificaciones",
  "Contacto",
  "Acciones",
];

const Providers = () => {
  const { isLoading, isSuccess, data } = useGetProviders();
  const [showModal, setShowModal] = useState(false);
  const [providerId, setProviderId] = useState(null);

  const { mutateAsync, isLoading: isLoadingDelete } = useDeleteProvider();

  const onSearch = (event) => {
    event.preventDefault();
    const searchData = new FormData(event.target);
    console.log(searchData.get("search"));
  };

  const openModal = (userId) => {
    setProviderId(userId);
    setShowModal(true);
  };

  const onDelete = async (message) => {
    // TODO: hacer algo con el mensage(descripcion de la baja del usuario)
    console.log({ message });
    await mutateAsync(providerId);
    setShowModal(false);
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
          {data?.data?.length === 0 ? (
            <Alert variant="outlined"  severity="info">
              No hay proveedores por el momento, vuelve mas tarde.
            </Alert>
          ) : (
            <TableShared
              data={data.data || []}  
              currentPage="Providers"
              headers={appointmentHeaders}
              openModal={openModal}
            />
          )}
        </div>
      ) : (
        <Alert severity="error">No se pudieron cargar los proveedores</Alert>
      )}
      {showModal && (
        <BanUserModal
          handleModal={() => setShowModal(false)}
          onDelete={onDelete}
          isLoading={isLoadingDelete}
          title="Dar de baja proveedor"
        />
      )}
    </div>
  );
};
export default Providers;
