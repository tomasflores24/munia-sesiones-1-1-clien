import "./Table.scss";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SettingsIcon from "@mui/icons-material/Settings";
import LayoutDashboard from "../../pages/dashboard/Layout/LayoutDashboard";

const Table = () => {
  const top = {
    title: "Citas programadas",
    button: "Nueva cita",
  };
  const titles = [
    "Pacientes",
    "Fecha y hora",
    "Tipo de servicio",
    "Estado de la cita",
    "Acciones",
  ];
  const informations = [
    {
      name: "Juan Pablo Osudar",
      date: "Mie. 16 - 08 - 2023",
      hour: "13:30 pm",
      service: "Nutrición y/o trastornos alimenticios",
      state: "Confirmado",
    },
    {
      name: "Joel Ochoa",
      date: "Mie. 16 - 08 - 2023",
      hour: "14:30 pm",
      service: "Higiene del sueño",
      state: "Cancelado",
    },
    {
      name: "Juan Camilo Moreno",
      date: "Jue. 17 - 08 - 2023",
      hour: "10:30 am",
      service: "Asesoría financiera",
      state: "Reprogramado",
    },
    {
      name: "Pedro Terraf",
      date: "Mar. 22 - 08 - 2023",
      hour: "10:30 am",
      service: "Asesoría financiera",
      state: "Confirmado",
    },
  ];

  return (
    <LayoutDashboard>
      <div className="ContainerAll">
        <div className="Container">
          <div className="TopContainer">
            <p>{top?.title}</p>
            <button className="ButtonNewDate">{top?.button}</button>
          </div>
          <div className="TopContainerTitles">
            {titles.map((title, index) => (
              <div
                key={title}
                className={
                  titles.length - 1 === index
                    ? "BoxTitle"
                    : "BoxTitle BoxTitleBorder"
                }
              >
                <p className="pTitle ">{title}</p>
              </div>
            ))}
          </div>
          {informations?.map((information) => (
            <div key={information.name} className="CardsContainer">
              <div className="BoxCards BoxCardsBorder">
                <p className="pCards">{information?.name}</p>
              </div>
              <div className="BoxCards BoxCardsBorder BoxCardsDate">
                <p className="pCards">{information?.date}</p>
                <p className="pCards">{information?.hour}</p>
              </div>
              <div className="BoxCards BoxCardsBorder BoxCardsServices">
                <div className="BoxCenterService pCardsLimit">
                  <p className="pCards pCardsLimit BoxCardsBackground">
                    {information?.service}
                  </p>
                </div>
              </div>
              <div className="BoxCards BoxCardsBorder">
                <div className="BoxCenterState">
                  <p className="pCards pCardsStatus">{information?.state}</p>
                  {information.state === "Confirmado" ? (
                    <CheckCircleIcon className="ImgConfirm" />
                  ) : information.state === "Cancelado" ? (
                    <CancelIcon className="ImgDenied" />
                  ) : information.state === "Reprogramado" ? (
                    <AccessTimeIcon className="ImgRescheduled" />
                  ) : null}
                </div>
              </div>
              <div>
                <div className="BoxCards BoxCardsButtonsActions">
                  <SettingsIcon className="ImgSettings" />
                  <CloseIcon className="ImgSettings ImgSettingsRed" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </LayoutDashboard>
  );
};

export default Table;
