import { Dialog, DialogContent } from "@mui/material";
import { useState } from "react";
import PropTypes from "prop-types";
import { Toaster } from "react-hot-toast";

import SelectMembership from "./createParts/Part2/SelectMembership";
import ClientForm from "./createParts/Part1/ClientForm";
import "./CreateUserModalStyle.scss";

const CreateUserModal = ({ open, closeModal, refetch }) => {
  const [step, setStep] = useState(0);
  const [companyId, setCompanyId] = useState(null);

  const formDispense = () => {
    switch (step) {
      case 0:
        return (
          <ClientForm
            setStep={setStep}
            closeModal={closeModal}
            setCompanyId={setCompanyId}
            refetch={refetch}
          />
        );
      case 1:
        return (
          <SelectMembership
            companyId={companyId}
            setStep={setStep}
            closeModal={closeModal}
            refetch={refetch}
          />
        );
      default:
        break;
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={closeModal}
        className="createUserModal__root"
        maxWidth="md"
        sx={{ "& .MuiDialog-paper": { borderRadius: "25px" } }}
      >
        <DialogContent>
          <div className="createUserModal__steps">{formDispense()}</div>
        </DialogContent>
      </Dialog>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

CreateUserModal.propTypes = {
  open: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  refetch: PropTypes.func
};

export default CreateUserModal;
