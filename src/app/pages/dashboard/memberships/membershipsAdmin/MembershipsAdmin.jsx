import { useState } from "react";
import MembershipBox from "../../../../shared/createUserModal/createParts/Part2/MembershipBox/MembershipBox";
import { basic, company, standard } from "../../../../utils/membershipsData";
import "./MembershipsAdmin.scss";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Dialog, DialogContent, TextField } from "@mui/material";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { useMutation, useQueryClient } from "react-query";
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
  const queryClient = useQueryClient();

  const { mutate, error, isLoading } = useMutation(
    ["postMembership"],
    async (data) => {
      await MembershipsServices.postMembership(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("posts");
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

  return isLoading ? (
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
        {modalOpen && (
          <>
            <MembershipsCreateModal
              closeModal={closeModal}
              openModal={openModal}
              createMembrships={createMembrships}
            />
          </>
        )}
        <div className="selectMembership__container">
          <div className="arrow-container">
            <ArrowBackIosNewIcon className="arrowIcon" fontSize="large" />
          </div>
          <MembershipBox
            price={basic.price}
            title={basic.title}
            list={basic.list}
            titleBgColor={basic.titleBgColor}
            selected={selectedMembership === MembershipTypes.BASIC}
            selectMembership={() => selectMembership(MembershipTypes.BASIC)}
          />
          <MembershipBox
            price={standard.price}
            title={standard.title}
            list={standard.list}
            titleBgColor={standard.titleBgColor}
            selected={selectedMembership === MembershipTypes.STANDARD}
            selectMembership={() => selectMembership(MembershipTypes.STANDARD)}
          />
          <MembershipBox
            price={company.price}
            title={company.title}
            list={company.list}
            titleBgColor={company.titleBgColor}
            description={company.description}
            selected={selectedMembership === MembershipTypes.COMPANY}
            selectMembership={() => selectMembership(MembershipTypes.COMPANY)}
          />
          <div className="arrow-container">
            <ArrowForwardIosIcon className="arrowIcon" fontSize="large" />
          </div>
        </div>
      </div>
    </>
  );
};

export default MembershipsAdmin;
