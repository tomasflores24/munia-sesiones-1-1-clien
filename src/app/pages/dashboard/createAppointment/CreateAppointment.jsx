import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

import "./CreateAppointment.style.scss";
import SelectService from "./components/selectService/selectService";
import SelectCategory from "./components/selectCategory/selectCategory";
import AppointmentCalendar from "../../../components/AppointmentCalendar/AppointmentCalendar";
import SelectProvider from "./components/provider/SelectProvider";
import { AppointmentService } from "../../../services/dashboard/appointments/appointment.service";
import LoadingSpinner from "../../../shared/loadingSpinner/LoadingSpinner";
import { useSelector } from "react-redux";

const CreateAppointment = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [selectedProviderId, setSelectedProviderId] = useState(null);
  const [selectedHour, setSelectedHour] = useState({ id: undefined });
  const user = useSelector((state) => state.auth.auth.user);

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    AppointmentService.createAppointment,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("providerAvailable");
        toast.success("Reunión agendada con éxito");
        setSelectedHour({ id: undefined });
        setSelectedCategoryId("");
        setSelectedServiceId(null);
        setSelectedProviderId(null);
      },
      onError: (err) => {
        toast.error(err.response?.data?.error || "Algo salio mal");
      },
    }
  );

  const onSubmit = () => {
    mutate({
      ServiceId: selectedServiceId,
      CollaboratorId: user.collaboratorId,
      ProviderId: selectedHour.ProviderId,
      AvailableId: selectedHour.id,
    });
  };

  return (
    <>
      <div className="createAppointment__root">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="createAppointment__container">
            <div className="createAppointment__header">
              <h1 className="title">Agendar tu cita</h1>
              <p className="desc">Sesiones restantes 15</p>
            </div>
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

            {selectedProviderId ? (
              <AppointmentCalendar
                providerId={selectedProviderId}
                selectedHour={selectedHour}
                setSelectedHour={setSelectedHour}
              />
            ) : null}

            <div className="textArea-container">
              <label className="textArea-label">Razón de la consulta</label>
              <textarea className="textArea" rows="4" />
            </div>

            <div className="createAppointment__footer">
              <h3 className="providerSelected">Profesional Seleccionado</h3>
              {selectedServiceId ? (
                <SelectProvider
                  setSelectedProviderId={setSelectedProviderId}
                  serviceId={selectedServiceId}
                />
              ) : null}

              <button
                className="confirm-button"
                disabled={isLoading}
                type="button"
                onClick={onSubmit}
              >
                Confirmar
              </button>
            </div>
          </div>
        )}
      </div>
      <Toaster position="bottom-center" />
    </>
  );
};
export default CreateAppointment;
