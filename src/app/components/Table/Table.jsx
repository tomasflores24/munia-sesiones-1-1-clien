import PropTypes from "prop-types";
import "./Table.scss";
import CloseIcon from "@mui/icons-material/Close";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import CancelIcon from "@mui/icons-material/Cancel";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SettingsIcon from "@mui/icons-material/Settings";

const Table = ({ titles, informations, top }) => {
  return (
    <div className="ContainerAll">
      <div className="Container">
        <div className="TopContainer">
          <p>{top?.title}</p>
          <button className="ButtonNewDate">{top?.button}</button>
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
