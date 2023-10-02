import { Dialog, DialogContent } from "@mui/material";
import { useState } from "react";
import PropTypes from "prop-types";

import SelectMembership from "./createParts/Part2/SelectMembership";
import ClientForm from "./createParts/Part1/ClientForm";
import "./CreateUserModalStyle.scss";

const CreateUserModal = ({ open, closeModal }) => {
  const [step, setStep] = useState(2);
  const [companyId, setCompanyId] = useState(null);

  const formDispense = () => {
    switch (step) {
      case 1:
        return (
          <ClientForm
            setStep={setStep}
            closeModal={closeModal}
            setCompanyId={setCompanyId}
          />
        );
      case 2:
        return <SelectMembership companyId={companyId} />;
      default:
        break;
    }
  };

  return (
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
  );
};

CreateUserModal.propTypes = {
  open: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
};

export default CreateUserModal;
