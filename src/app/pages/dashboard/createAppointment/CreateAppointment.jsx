import { useState } from "react";
import { Toaster } from "react-hot-toast";

// import AppointmentCalendar from "../../../components/AppointmentCalendar/AppointmentCalendar";

const CreateAppointment = () => {
  // const [selectedCategory, setSelectedCategory] = useState(null);
  // const [selectedService, setSelectedService] = useState(null);
  // const [selectedProvider, setSelectedProvider] = useState(null);

  // use mutattion

  return (
    <div style={{ marginLeft: "50px" }}>
      <div>CreateAppointment</div>
      {/* <Category setSelectedCategory={setSelectedCategory} />
      {selectedCategory && (
        <Service
          selectedCategory={selectedCategory}
          setSelectedService={setSelectedService}
        />
      )}
      {selectedService && (
        <Provider
          setSelectedProvider={setSelectedProvider}
          selectedService={selectedService}
        />
      )}
      {selectedProvider && <AppointmentCalendar />} */}

      <Toaster position="bottom-center" />
    </div>
  );
};
export default CreateAppointment;
