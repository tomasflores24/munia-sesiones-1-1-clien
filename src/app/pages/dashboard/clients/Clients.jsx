import { useMutation, useQuery } from "react-query";
import {
  informations,
  titles,
  top,
} from "../../../Models/tablesDashboard/tableClientsModel";
import Table from "../../../components/Table/Table";
import { ClientsServices } from "../../../services/dashboard/clients/clients.services";
import TableShared from "../../../shared/table/tableShared";
import LayoutDashboard from "../Layout/LayoutDashboard";
import LoadingSpinner from "../../../shared/loadingSpinner/LoadingSpinner";
import CreateUserModal from "../../../shared/createUserModal/CreateUserModal";
import { useState } from "react";

const Clientes = () => {
  const [openClientModal, setOpenClientModal] = useState(false);

  const { isLoading, data, isSucess } = useQuery(
    ["getAllClients"],
    ClientsServices.getAllClients
  );

  const {isLoading: isLoadingModal, mutate } = useMutation(["enviar info"], ()=>console.log("se envio data"))


  const handleCloseModal = () => setOpenClientModal(false);

  // console.log(isLoading ? data : data.data.allCompanies);
  return (
    <LayoutDashboard>
      {/* <Table informations={informations} titles={titles} top={top} /> */}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <button type="button" onClick={() => setOpenClientModal(true)}>
            Crear Compañia
          </button>
          <TableShared
            data={data.data.allCompanies}
            currentPage="Clients"
            headers={[
              "Nombre",
              "Fecha de vinculación",
              "Paquete contratado",
              "País",
              "Colaboradores",
              "Contacto",
            ]}
          />
          <CreateUserModal
            closeModal={handleCloseModal}
            open={openClientModal}
            isLoading={isLoadingModal}
            onSubmit={mutate}
          />
        </>
      )}
    </LayoutDashboard>
  );
};

export default Clientes;
