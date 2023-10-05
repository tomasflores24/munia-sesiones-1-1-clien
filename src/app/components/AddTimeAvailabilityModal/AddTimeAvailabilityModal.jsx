import { useState } from "react";
import { Dialog, DialogContent } from "@mui/material";
import PropTypes from "prop-types";

import "./AddTimeAvailabilityStyle.scss";
import SelectHours from "./modalParts/part1/SelectHours";
import SelectAvailabilityType from "./modalParts/part2/SelectAvailabilityType";
import SelectServices from "./modalParts/part3/SelectServices";
import { useGetProviders } from "../../hooks/provider/useProviders";
import { selectUser } from "../../redux/slices/authSlice/authSlice";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

const AddTimeAvailabilityModal = ({ open, closeModal }) => {
  const [step, setStep] = useState(1);
  const user = useSelector(selectUser);

  const { data, isLoading } = useGetProviders(user.email);

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const formDispense = () => {
    switch (step) {
      case 1:
        return (
          <SelectHours
            nextStep={nextStep}
            closeModal={closeModal}
            provider={data?.data?.[0]}
            loadingProvider={isLoading}
          />
        );
      case 2:
        return (
          <SelectAvailabilityType nextStep={nextStep} closeModal={closeModal} />
        );
      case 3:
        return (
          <SelectServices
            closeModal={closeModal}
            providerId={data?.data?.[0].id}
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
        maxWidth="md"
        sx={{
          "& .MuiDialog-paper": { borderRadius: "25px" },
          "& .MuiDialogContent-root": { padding: "0px" },
        }}
      >
        <DialogContent>
          <div className="addTimeAvailability__root">{formDispense()}</div>
        </DialogContent>
      </Dialog>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

AddTimeAvailabilityModal.propTypes = {
  open: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default AddTimeAvailabilityModal;
