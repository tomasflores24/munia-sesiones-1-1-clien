import { useState } from "react";
import {
  useDeleteProvider,
  useGetProviders,
} from "../../../hooks/provider/useProviders";
import LoadingSpinner from "../../../shared/loadingSpinner/LoadingSpinner";
import TableShared from "../../../shared/table/tableShared";
import "./ProviderStyle.scss";
import BanUserModal from "../../../components/BanUserModal/BanUserModal";

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
          <TableShared
            data={data.data.allProvider}
            currentPage="Providers"
            headers={appointmentHeaders}
            openModal={openModal}
          />
        </div>
      ) : null}
      {showModal && (
        <BanUserModal
          handleModal={() => setShowModal(false)}
          onDelete={onDelete}
          isLoading={isLoadingDelete}
        />
      )}
    </div>
  );
};
export default Providers;
