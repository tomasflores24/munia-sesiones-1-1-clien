import "./ProviderProfile.scss";
import { useState } from "react";
import AddTimeAvailabilityModal from "../../../../components/AddTimeAvailabilityModal/AddTimeAvailabilityModal";
import Ellipse7 from "/assets/Ellipse7.png"

const ProviderProfile = () => {
  /* const [openClientModal, setOpenClientModal] = useState(false); */

  /* const handleCloseModal = () => setOpenClientModal(false); */

  return (
    <div className="root__container">
      <header className="provider__image__container">
        <div className="provider__image">
          <img src={Ellipse7} width="10%" height="10%" />
        </div>
      </header>
      <main className="provider__profile__container">
        <container className="provider__profile">
          <section className="provider__profile__first__container">
            <div className="provider__profile__info__container">
            </div>
            <div className="provider__profile__modals__container">
            </div>
          </section>
          <section className="provider__profile__second__container">
            <div className="provider__profile__buttons__container">

            </div>
            <div className="provider__profile__documents__container">

            </div>
          </section>
        </container>
      </main>
    </div>
  );
};

export default ProviderProfile;

{/* <button
    type="button"
    className="btn__AddAvailability"
    onClick={() => setOpenClientModal(true)}
  >
    Agregar disponibilidad
  </button>
  <AddTimeAvailabilityModal
    closeModal={handleCloseModal}
    open={openClientModal}
  /> */}