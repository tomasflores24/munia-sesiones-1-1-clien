import ModalAgendar from "./ModalAgendar";
import { useState } from "react";
import "./Agenda.scss";
import PersonIcon from "@mui/icons-material/Person";
import EventNoteIcon from "@mui/icons-material/EventNote";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Agenda = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [indexSlide, setIndexSlide] = useState(0);

  const [direction, setDirection] = useState("none");
  function handleModal() {
    setModalIsOpen(!modalIsOpen);
  }
  return (
    <section className="section">
      <div onClick={handleModal} className="agendar__container">
        <PersonIcon className="icon" />
        <h3 className="route">Agendar</h3>
      </div>
      <div className="agendar__container">
        <EventNoteIcon className="icon" />
        <h3 className="route">Mis citas</h3>
      </div>
      <section className={modalIsOpen ? "view_window" : "view_windowClose"}>
        {modalIsOpen && <ModalAgendar handleModal={handleModal} />}
      </section>

      {/*    <div className="slider">
        <KeyboardArrowDownIcon
          className="slider__arrowLeft"
          onClick={() => setIndexSlide(indexSlide + 1)}
        />
        <div className="slider__container">
          <img
            src="https://concepto.de/wp-content/uploads/2018/08/persona-e1533759204552.jpg"
            alt=""
            className={` slider__img ${
              indexSlide === 0 ? "slider__img--active" : ""
            }`}
          />
          <img
            src="https://aishlatino.com/wp-content/uploads/2021/11/que-tipo-de-persona-te-gustaria-ser-730x411-SP.jpg"
            alt=""
            className={` slider__img ${
              indexSlide === 1 ? "slider__img--active" : ""
            }`}
          />
        </div>

        <KeyboardArrowDownIcon
          className="slider__arrowRight"
          onClick={() => setIndexSlide(indexSlide - 1)}
        />
      </div> */}
    </section>
  );
};

export default Agenda;
