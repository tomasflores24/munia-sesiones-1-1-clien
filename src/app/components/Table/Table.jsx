import PropTypes from "prop-types";
import "./Table.scss";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import CancelIcon from "@mui/icons-material/Cancel";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CloseIcon from "@mui/icons-material/Close";
import SettingsIcon from "@mui/icons-material/Settings";
import CreateCompany from "../CreateCompany/CreateCompany";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const Table = ({ titles, informations, top, onClick }) => {

  const [showLogin, setShowLogin] = useState(false);

  const handleShow = () => {
    console.log(onClick, 'ONCLICK', showLogin, 'SHOWLOGIN')
    if (onClick) onClick();
    setShowLogin(true);
  }


  return (
    <>
      <div className="ContainerAll">
        <div className="Container">
          <div className="TopContainer">
            <p>{top?.title}</p>
            <button className="ButtonNewDate" type="submit" onClick={handleShow}>{top?.button}</button>
          </div>
          <div className="TopContainerTitles">
            {titles.map((title, index) => (
              <div
                key={title.value}
                className={
                  titles.length - 1 === index
                    ? "BoxTitle"
                    : "BoxTitle BoxTitleBorder"
                }
              >
                <p className="pTitle ">{title.title}</p>
              </div>
            ))}
            <div className="BoxTitle BoxTitleBorder">
              <p className="pTitle ">{"Acciones"}</p>
            </div>
          </div>
          {informations?.map((information) => (
            <div key={information.name} className="CardsContainer">
              {titles.map((title) => (
                <div key={title.value} className="BoxCards BoxCardsBorder">
                  <p className="pCards">{information[title.value]}</p>
                </div>
              ))}
              <div className="BoxCards BoxCardsButtonsActions">
                <SettingsIcon className="ImgSettings" />
                <CloseIcon className="ImgSettings ImgSettingsRed" />
              </div>
              {/* <div className="BoxCards BoxCardsBorder">
                <div className="BoxCenterState">
                  <p className="pCards pCardsStatus">{information.state}</p>
                  {information.state === "Confirmado" ? (
                    <CheckCircleIcon className="ImgConfirm" />
                  ) : information.state === "Cancelado" ? (
                    <CancelIcon className="ImgDenied" />
                  ) : information.state === "Reprogramado" ? (
                    <AccessTimeIcon className="ImgRescheduled" />
                  ) : null}
                </div>
              </div> */}
            </div>
          ))}
        </div>
      </div>
      <CreateCompany showLogin={showLogin} setShowLogin={setShowLogin}></CreateCompany>
    </>
  );
};

Table.propTypes = {
  top: PropTypes.shape({
    title: PropTypes.string,
    button: PropTypes.string,
  }),
  titles: PropTypes.arrayOf(
    PropTypes.shape({ title: PropTypes.string, value: PropTypes.string })
  ),
  informations: PropTypes.arrayOf(
    PropTypes.shape({
      state: PropTypes.string, // You can add other expected properties here
    })
  ),
};

export default Table;
