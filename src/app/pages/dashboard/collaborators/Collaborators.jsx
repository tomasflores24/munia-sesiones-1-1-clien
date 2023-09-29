import { useState } from "react";

import BanUserModal from "../../../components/BanUserModal/BanUserModal";
import LoadingSpinner from "../../../shared/loadingSpinner/LoadingSpinner";
import TableShared from "../../../shared/table/tableShared";
import {
  useDeleteCollaborator,
  useGetCollaborators,
} from "../../../hooks/collaborator/useCollaborator";
import "./CollaboratorsStyle.scss";
import AddCollaboratorModal from "../../../components/AddCollaboratorModal/AddCollaboratorModal";

const collaboratorsHeaders = [
  "Colaboradores",
  "Servicios",
  "Sesiones",
  "Comentarios",
  "Contacto",
  "Acciones",
];

const Collaborators = () => {
  const { isLoading, isSuccess, data } = useGetCollaborators();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [providerId, setProviderId] = useState(null);
  const { mutateAsync, isLoading: isLoadingDelete } = useDeleteCollaborator();

  const onSearch = (event) => {
    event.preventDefault();
    const searchData = new FormData(event.target);
    console.log(searchData.get("search"));
  };

  const openModal = (userId) => {
    setProviderId(userId);
    setShowDeleteModal(true);
  };

  const onDelete = async (message) => {
    // TODO: hacer algo con el mensage(descripcion de la baja del usuario)
    console.log({ message });
    await mutateAsync(providerId);
    setShowDeleteModal(false);
  };

  return (
    <div className="collaborators__root">
      <header className="collaborators__header">
        <h1 className="title">Colaboradores</h1>
        <form className="collaborators__search_bar" onSubmit={onSearch}>
          <input
            type="text"
            name="search"
            placeholder="Buscar a un colaborador"
            className="search__input"
          />
          <button type="submit" className="search__button">
            Buscar
          </button>
        </form>
        <button
          type="button"
          className="button__new"
          onClick={() => setShowCreateModal(true)}
        >
          Nuevo colaborador
        </button>
      </header>
      {isLoading ? (
        <LoadingSpinner />
      ) : !isLoading && isSuccess ? (
        <div className="collaborators_table">
          <TableShared
            data={data.data.allCollaborators}
            currentPage="Collaborators"
            headers={collaboratorsHeaders}
            openModal={openModal}
          />
        </div>
      ) : null}
      {showDeleteModal && (
        <BanUserModal
          handleModal={() => setShowDeleteModal(false)}
          onDelete={onDelete}
          isLoading={isLoadingDelete}
        />
      )}
      {showCreateModal && (
        <AddCollaboratorModal
          handleModal={() => setShowCreateModal(false)}
          isLoading={false}
        />
      )}
    </div>
  );
};
export default Collaborators;
