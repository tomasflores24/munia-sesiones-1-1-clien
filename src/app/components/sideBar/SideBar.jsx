import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Drawer, IconButton } from "@mui/material";
import "./SideBar.scss";
import { useSelector } from "react-redux";
import NavItems from "./commonSideBar/NavItems";

const ADMIN = 4;

export default function SideBar() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const user = useSelector((state) => state.auth.AuthSlice.user)

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
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
          {user.userTypeId === ADMIN ? (
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
            <NavItems userTypeId={user.userTypeId} />
          </section>
        </nav>
      </Drawer>
      <nav className="container">
        {user.userTypeId === ADMIN ? (
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
          <NavItems userTypeId={user.userTypeId} />
        </section>
      </nav>
    </>
  );
}
