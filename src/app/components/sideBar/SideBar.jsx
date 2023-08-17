import Buttons from "./commonSideBar/buttons";
import { buttonData } from "../../utils/buttonOptions";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import "./SideBar.scss";

export default function SideBar() {

  const navigate = useNavigate();
  const redirect = (redirect)=>{
    navigate(redirect);
  }
  return (
    <>
      <nav className="container">
        <header className="profile-data">
          <img src="Ellipse 7.svg" className="img" />
          <h2 className="user-data">María Agustina Lahitou</h2>
        </header>
        <section className="navigation-buttons">
        {buttonData.map((e) => (
          <Buttons
            title={e.title}
            icon={e.icon}
            key={e.title}
            selected={e.selected}
            onClick={redirect(e.redirect)}
          />
        ))}
        </section>
        <button className="logOut">
          <LogoutIcon style={{ fontSize: '30px' }}  />
          <span className="span">Salir</span>
        </button>
      </nav>
    </>
  );
}
