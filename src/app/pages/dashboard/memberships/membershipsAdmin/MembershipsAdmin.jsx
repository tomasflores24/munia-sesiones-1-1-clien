import { useState } from "react";
import MembershipBox from "../../../../shared/createUserModal/createParts/Part2/MembershipBox/MembershipBox";
import { basic, company, standard } from "../../../../utils/membershipsData";
import "./MembershipsAdmin.scss";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useMutation, useQuery } from "react-query";
import { MembershipsServices } from "../../../../services/dashboard/memberships/memberships.services";
import MembershipsCreateModal from "./components/MembershipsCreateModal";
import LoadingSpinner from "../../../../shared/loadingSpinner/LoadingSpinner";
import { toast, Toaster } from "react-hot-toast";

export const MembershipTypes = {
  BASIC: 1,
  STANDARD: 2,
  COMPANY: 3,
};

const MembershipsAdmin = () => {
  const { isLoading, data, isSuccess } = useQuery(
    ["getMemberships"],
    MembershipsServices.getAllMemberships
  );

  const { mutate, isLoading: isLoadingMutation } = useMutation(
    ["postMembership"],
    async (data) => {
      await MembershipsServices.postMembership(data);
    },
    {
      onSuccess: () => {
        toast.success("Se creó la membresía con exito");
        setTimeout(() => setModalOpen(false), 3000);
      },
      onError: () => toast.error("Error al crear la membresia"),
    }
  );
  const [selectedMembership, setSelectedMembership] = useState(
    MembershipTypes.BASIC
  );
  const selectMembership = (type) => {
    setSelectedMembership(type);
  };

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const createMembrships = async (e, data) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const amount = parseFloat(document.getElementById("amount").value);
    if (isLoading) {
      return;
    }
    mutate({ name, amount });
  };

  return isLoading || isLoadingMutation ? (
    <LoadingSpinner />
  ) : (
    <>
      <Toaster position="top-center" />
      <div className="selectMembership__root">
        <header className="membership-header">
          <nav className="membership-navbar">
            <h1 className="title">Configurar membresías</h1>
            <div className="container-button">
              <button onClick={openModal} className="membership-button">
                Nueva membresía
              </button>
            </div>
          </nav>
        </header>

        <div className="selectMembership__container">
          <div className="arrow-container">
            <ArrowBackIosNewIcon className="arrowIcon" fontSize="large" />
          </div>
          {!isLoading && isSuccess ? (
            <>
              {data?.data.map((el) => (
                <MembershipBox
                  key={el.id}
                  price={`$${el.amount}`}
                  title={el.name}
                  list={basic.list}
                  titleBgColor={
                    el.id % 2 === 0 ? company.titleBgColor : basic.titleBgColor
                  }
                  selected={selectedMembership?.id === el.id}
                  selectMembership={() => selectMembership(el)}
                />
              ))}
            </>
          ) : (
            <Alert severity="error" className="full-width">
              Ha ocurrido un error obteniendo las membresias
            </Alert>
          )}
          <div className="arrow-container">
            <ArrowForwardIosIcon className="arrowIcon" fontSize="large" />
          </div>
        </div>
        <MembershipsCreateModal
          closeModal={closeModal}
          openModal={modalOpen}
          createMembrships={createMembrships}
        />
      </div>
    </>
  );
};

export default MembershipsAdmin;
