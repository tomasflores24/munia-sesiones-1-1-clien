import { useState } from "react";
import AddTimeAvailabilityModal from "../../../../components/AddTimeAvailabilityModal/AddTimeAvailabilityModal";

const ProviderProfile = () => {
  const [openClientModal, setOpenClientModal] = useState(false);

  const handleCloseModal = () => setOpenClientModal(false);

  return (
    <div>
      <h1>ProviderProfile</h1>
      <button
        type="button"
        className="btn__AddAvailability"
        onClick={() => setOpenClientModal(true)}
      >
        Agregar disponibilidad
      </button>
      <AddTimeAvailabilityModal
        closeModal={handleCloseModal}
        open={openClientModal}
      />
    </div>
  );
};
export default ProviderProfile;
