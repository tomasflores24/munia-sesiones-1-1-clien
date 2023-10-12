import { useState } from "react";
import { Toaster } from "react-hot-toast";
import SelectCategory from "./components/selectCategory/SelectCategory";
import SelectService from "./components/selectService/selectService";
import "./CreateAppointment.style.scss";

// import AppointmentCalendar from "../../../components/AppointmentCalendar/AppointmentCalendar";

const CreateAppointment = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  // const [selectedProvider, setSelectedProvider] = useState(null);

  // use mutattion

  return (
    <div style={{ marginLeft: "50px" }}>
      <div>CreateAppointment</div>
      <SelectCategory
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      {selectedCategory === "" ? null : (
        <SelectService
          selectedCategory={selectedCategory}
          setSelectedService={setSelectedService}
          selectedService={selectedService}
        />
      )}
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
      <div className="textArea-container">
        <label className="textArea-label">Razón de la consulta</label>
        <textarea className="textArea"
          rows="4"
        ></textarea>
      </div>

      <Toaster position="bottom-center" />
    </div>
  );
};
export default CreateAppointment;
