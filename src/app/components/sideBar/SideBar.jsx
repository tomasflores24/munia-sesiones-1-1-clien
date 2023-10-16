import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Drawer, IconButton } from "@mui/material";
import "./SideBar.scss";
import { useSelector } from "react-redux";
import NavItems from "./commonSideBar/NavItems";
import muniaLogo from "/assets/muniaLogo.png";

const ADMIN = 4;

export default function SideBar() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const user = useSelector((state) => state.auth.auth.user);

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  return (
    <>
      <IconButton className="menuButton" onClick={toggleSidebar}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={openSidebar} onClose={toggleSidebar}>
        <nav className="container-responsive">
          {user.userTypeId === ADMIN ? (
            <header className="admin-data">
              <img src={muniaLogo} className="img" alt="Logo" />
            </header>
          ) : (
            <header className="profile-data">
              <div className="profile-img-container">
                <img
                  src={user.profilePic}
                  className="img-profile"
                  alt="Profile"
                />
              </div>
              <h2 className="user-data">{user.name}</h2>
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
            <img src={muniaLogo} className="img" alt="Logo" />
          </header>
        ) : (
          <header className="profile-data">
            <img src={user.profilePic} className="img-profile" alt="Profile" />
            <h2 className="user-data">{user.name}</h2>
          </header>
        )}
        <section className="navigation-buttons">
          <NavItems userTypeId={user.userTypeId} />
        </section>
      </nav>
    </>
  );
}
