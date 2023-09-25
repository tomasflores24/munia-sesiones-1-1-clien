import { useState } from "react";
import Buttons from "./commonSideBar/buttons";
import { buttonDataAdmin, buttonDataUser } from "../../utils/buttonOptions";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { Drawer, IconButton } from "@mui/material";
import "./SideBar.scss";

export default function SideBar() {
  const type = "admin";
  const navigate = useNavigate();
  const [openSidebar, setOpenSidebar] = useState(false);

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  const redirect = (type, redirect) => {
    navigate("/" + "dashboard" + redirect);
  };

  return (
    <>
      <IconButton
        className="menuButton"
        onClick={toggleSidebar}
        sx={{
          display: {
            xs: "block",
            sm: "block",
            md: "block",
            lg: "none",
            xl: "none",
          },
        }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={openSidebar} onClose={toggleSidebar}>
        <nav className="container-responsive">
          {type === "admin" ? (
            <header className="admin-data">
              <img
                src="/public/assets/muniaLogo.png"
                className="img"
                alt="Logo"
              />
            </header>
          ) : (
            <header className="profile-data">
              <img
                src="../../../assets/noImageUser.png"
                className="img"
                alt="Profile"
              />
              <h2 className="user-data">María Agustina Lahitou</h2>
            </header>
          )}
          <section className="navigation-buttons">
            {type === "admin"
              ? buttonDataAdmin.map((e) => (
                  <Buttons
                    className="saidBarButtons"
                    title={e?.title}
                    icon={e?.icon}
                    key={e?.title}
                    selected={e?.selected}
                    onClick={() => redirect(type, e?.redirect)}
                  />
                ))
              : buttonDataUser.map((e) => (
                  <Buttons
                    className="saidBarButtons"
                    title={e?.title}
                    icon={e?.icon}
                    key={e?.title}
                    selected={e?.selected}
                    onClick={() => redirect(type, e?.redirect)}
                  />
                ))}
          </section>
        </nav>
      </Drawer>
      <nav className="container">
          {type === "admin" ? (
            <header className="admin-data">
              <img
                src="/public/assets/muniaLogo.png"
                className="img"
                alt="Logo"
              />
            </header>
          ) : (
            <header className="profile-data">
              <img src="assets/Ellipse 7.svg" className="img" alt="Profile" />
              <h2 className="user-data">María Agustina Lahitou</h2>
            </header>
          )}
          <section className="navigation-buttons">
            {type === "admin"
              ? buttonDataAdmin.map((e) => (
                  <Buttons
                    className="saidBarButtons"
                    title={e?.title}
                    icon={e?.icon}
                    key={e?.title}
                    selected={e?.selected}
                    onClick={() => redirect(type, e?.redirect)}
                  />
                ))
              : buttonDataUser.map((e) => (
                  <Buttons
                    className="saidBarButtons"
                    title={e?.title}
                    icon={e?.icon}
                    key={e?.title}
                    selected={e?.selected}
                    onClick={() => redirect(type, e?.redirect)}
                  />
                ))}
          </section>
      </nav>
    </>
  );
}
