import { useState } from "react";
import MembershipBox from "../../../../shared/createUserModal/createParts/Part2/MembershipBox/MembershipBox";
import { basic, company, standard } from "../../../../utils/membershipsData";
import "./MembershipsAdmin.scss";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Dialog, DialogContent, TextField } from "@mui/material";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
export const MembershipTypes = {
  BASIC: 1,
  STANDARD: 2,
  COMPANY: 3,
};

const MembershipsAdmin = () => {
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

  return (
    <div className="selectMembership__root">
      <header className="membership-header">
        <nav className="membership-navbar">
          <h1 className="title">Configurar membresías</h1>
          <div className="container-button">
            <button onClick={openModal} className="button">
              Nueva membresía
            </button>
          </div>
        </nav>
      </header>
      {modalOpen && (
        <>
          <Dialog
            open={openModal}
            onClose={closeModal}
            className="createUserModal__root"
            maxWidth="md"
            sx={{ "& .MuiDialog-paper": { borderRadius: "25px" } }}
          >
            <DialogContent>
              <div className="create-membership-modal">
                <h2 className="membership-modal-title">Crear Membresía</h2>
                <h3 className="membership-modal-subtitles">
                  Nombre de la membresía
                </h3>
                <TextField
                  id="standard-basic"
                  label="Nombre de la membresia"
                  variant="standard"
                  placeholder="none"
                />
                <h3 className="membership-modal-subtitles">Descripción</h3>
                <TextareaAutosize
                  aria-label="minimum height"
                  className="membership-modal-textarea"
                />
              </div>
              <button onClick={openModal} className="button">
                Nueva membresía
              </button>
            </DialogContent>
          </Dialog>
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
  );
};

export default MembershipsAdmin;
