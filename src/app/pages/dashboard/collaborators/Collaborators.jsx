import { useState } from "react";

import BanUserModal from "../../../components/BanUserModal/BanUserModal";
import LoadingSpinner from "../../../shared/loadingSpinner/LoadingSpinner";
import TableShared from "../../../shared/table/tableShared";
import {
  useDeleteCollaborator,
  useGetCollaborators,
} from "../../../hooks/collaborator/useCollaborator";
import "./CollaboratorsStyle.scss";
import AddCollaboratorModal from "./components/AddCollaboratorModal/AddCollaboratorModal";
import { Alert } from "@mui/material";
import AssignSessionModal from "./components/AssignSessionModal/AssignSessionModal";
import { Toaster } from "react-hot-toast";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/slices/authSlice/authSlice";
import { PurchasesServices } from "../../../services/dashboard/purchases/purchases.services";

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
  const [showAssignSessions, setShowAssignSessions] = useState(false);
  const [providerId, setProviderId] = useState(null);
  const [collaboratorId, setCollaboratorId] = useState("");

  const { companyId } = useSelector(selectUser);

  const { mutateAsync, isLoading: isLoadingDelete } = useDeleteCollaborator();

  const { data: purchase } = useQuery(
    ["company-purchase", companyId],
    () => PurchasesServices.getPurchaseByCompanyId(companyId)
  );

  const onSearch = (event) => {
    event.preventDefault();
    const searchData = new FormData(event.target);
    console.log(searchData.get("search"));
  };

  const openModal = (userId) => {
    setProviderId(userId);
    setShowDeleteModal(true);
  };

  const openAssignSessionsModal = (collaboratorId) => {
    setCollaboratorId(collaboratorId);
    setShowAssignSessions(true);
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
            data={data.data || []}
            currentPage="Collaborators"
            headers={collaboratorsHeaders}
            openModal={openModal}
            openAssignSessionsModal={openAssignSessionsModal}
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
      {showDeleteModal && (
        <BanUserModal
          handleModal={() => setShowDeleteModal(false)}
          onDelete={onDelete}
          isLoading={isLoadingDelete}
          title="Dar de baja collaborador"
        />
      )}
      {showCreateModal && (
        <AddCollaboratorModal handleModal={() => setShowCreateModal(false)} />
      )}
      <AssignSessionModal
        open={showAssignSessions}
        closeModal={() => setShowAssignSessions(false)}
        collaboratorId={collaboratorId}
        companyId={companyId}
        purchaseId={purchase?.data?.id || ""}
      />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};
export default Collaborators;
