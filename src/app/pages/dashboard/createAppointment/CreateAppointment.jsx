import { useState } from "react";
import { Toaster } from "react-hot-toast";
import SelectCategory from "./components/selectCategory/SelectCategory";
import SelectService from "./components/selectService/selectService";
import "./CreateAppointment.style.scss";

import AppointmentCalendar from "../../../components/AppointmentCalendar/AppointmentCalendar";
import SelectProvider from "./components/provider/SelectProvider";

const CreateAppointment = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [selectedProviderId, setSelectedProviderId] = useState(null);

  return (
    <div className="createAppointment__root">
      <SelectCategory
        selectedCategoryId={selectedCategoryId}
        setSelectedCategoryId={setSelectedCategoryId}
      />
      {selectedCategoryId === "" ? null : (
        <SelectService
          categoryId={selectedCategoryId}
          setSelectedServiceId={setSelectedServiceId}
          selectedService={selectedServiceId}
        />
      )}

      <div className="textArea-container">
        <label className="textArea-label">Razón de la consulta</label>
        <textarea className="textArea" rows="4"></textarea>
      </div>

      {selectedServiceId ? (
        <SelectProvider
          setSelectedProviderId={setSelectedProviderId}
          serviceId={selectedServiceId}
        />
      ) : null}

      {selectedProviderId ? <AppointmentCalendar /> : null}

      <Toaster position="bottom-center" />
    </div>
  );
};
export default CreateAppointment;
