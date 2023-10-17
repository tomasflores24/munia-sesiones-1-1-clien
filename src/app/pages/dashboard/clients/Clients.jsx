import "./ClientsStyle.scss";
import { useMutation, useQuery } from "react-query";
import { ClientsServices } from "../../../services/dashboard/clients/clients.services";
import TableShared from "../../../shared/table/tableShared";
import LoadingSpinner from "../../../shared/loadingSpinner/LoadingSpinner";
import CreateUserModal from "../../../shared/createUserModal/CreateUserModal";
import { useState } from "react";
import { Alert } from "@mui/material";

const clientHeaders = [
  "Nombre",
  "Fecha de vinculación",
  "Paquete contratado",
  "País",
  "Colaboradores",
  "Contacto",
  "N° de sesiones"
];

const Clientes = () => {
  const [openClientModal, setOpenClientModal] = useState(false);

  const { isLoading, data, isSuccess } = useQuery(
    ["getAllClients"],
    ClientsServices.getAllClients
  );

  const { isLoading: isLoadingModal, mutate } = useMutation(
    ["enviar info"],
    () => console.log("se envio data")
  );

  const handleCloseModal = () => setOpenClientModal(false);

  return (
    <div className="clients__root">
      <header className="clients__header">
        <h1>Clientes</h1>
        {/**TODO: search input */}
        <button
          type="button"
          className="btn__newClient"
          onClick={() => setOpenClientModal(true)}
        >
          Nuevo Cliente
        </button>
      </header>
      {isLoading ? (
        <LoadingSpinner />
      ) : isSuccess && !isLoading ? (
        <div className="clients_table">
          <TableShared
            data={data?.data || []}
            currentPage="Clients"
            headers={clientHeaders}
          />
          {data?.data?.length === 0 && <Alert variant="filled" color="secondary" severity="info">Todavía no hay clientes, crea uno primero</Alert>}
        </div>
      ) : (
        <Alert severity="error">No se pudieron cargar los clientes</Alert>
      )}
      <CreateUserModal
        closeModal={handleCloseModal}
        open={openClientModal}
        isLoading={isLoadingModal}
        onSubmit={mutate}
      />
    </div>
  );
};

export default Clientes;
