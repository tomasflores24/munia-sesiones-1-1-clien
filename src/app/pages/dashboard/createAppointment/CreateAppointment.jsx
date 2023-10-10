import { Toaster } from "react-hot-toast";

import AppointmentCalendar from "../../../components/AppointmentCalendar/AppointmentCalendar";

const CreateAppointment = () => {
  return (
    <div style={{ marginLeft: "50px" }}>
      <div>CreateAppointment</div>
      <AppointmentCalendar />
      <Toaster position="bottom-center" />
    </div>
  );
};
export default CreateAppointment;
