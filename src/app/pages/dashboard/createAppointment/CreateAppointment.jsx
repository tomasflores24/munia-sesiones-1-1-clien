import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import SelectCategory from "./components/selectCategory/SelectCategory";
import SelectService from "./components/selectService/selectService";
import "./CreateAppointment.style.scss";

import AppointmentCalendar from "../../../components/AppointmentCalendar/AppointmentCalendar";
import SelectProvider from "./components/provider/SelectProvider";
import { useMutation, useQueryClient } from "react-query";
import { AppointmentService } from "../../../services/dashboard/appointments/appointment.service";

const CreateAppointment = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [selectedProviderId, setSelectedProviderId] = useState(null);
  const [selectedHour, setSelectedHour] = useState({ id: undefined });

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    AppointmentService.createAppointment,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("providerAvailable");
        toast.success("Reunión agendada con éxito");
        setSelectedHour({ id: undefined });
      },
      onError: (err) => {
        toast.error(err.response?.data?.error || "Algo salio mal");
      },
    }
  );
  console.log({ selectedProviderId, selectedHour });

  const onSubmit = () => {
    mutate({
      ServiceId: selectedServiceId,
      CollaboratorId: "f4c2d071-b2a9-4c71-b1ea-96bfc2d4b19e",
      ProviderId: selectedHour.ProviderId,
      AvailableId: selectedHour.id,
    });
  };

  return (
    <>
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
          <textarea className="textArea" rows="4" />
        </div>

        {selectedServiceId ? (
          <SelectProvider
            setSelectedProviderId={setSelectedProviderId}
            serviceId={selectedServiceId}
          />
        ) : null}

        {selectedProviderId ? (
          <AppointmentCalendar
            providerId={selectedProviderId}
            selectedHour={selectedHour}
            setSelectedHour={setSelectedHour}
          />
        ) : null}

        <button
          className="confirm-button"
          disabled={isLoading}
          type="button"
          onClick={onSubmit}
        >
          Confirm
        </button>
      </div>
      <Toaster position="bottom-center" />
    </>
  );
};
export default CreateAppointment;
