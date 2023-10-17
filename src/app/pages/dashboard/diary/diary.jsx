// import react from 'React';
// src\app\pages\dashboard\diary\appointment\Appointment.jsx
// import Appointment from "./appointment/Appointment";
import Card from "../../../components/CardsHome/Cards";
import EventNoteIcon from "@mui/icons-material/EventNote";
import "./Diary.style.scss";

function Diary() {
  return (
    <div className="allDiary">
      <div className="diaryContainer">
        <div>
          <Card
            to="/dashboard/appointment"
            imgComponent={<EventNoteIcon className="Img" />}
            title="Mi Agenda"
            variables=".-"
          />
        </div>
        {/* <div>
          <Card
            to="/dashboard/diaryCreate"
            imgComponent={<EventNoteIcon className="Img" />}
            title="Crear Agenda"
            variables=".-"
          />
        </div> */}
      </div>
    </div>
  );
}

export default Diary;
