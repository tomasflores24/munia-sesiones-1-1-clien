import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import LogoutIcon from "@mui/icons-material/Logout";

import {
  buttonDataAdmin,
  buttonDataCollaborators,
  buttonDataCompanies,
  buttonDataProfessionals,
} from "../../../utils/buttonOptions";
import Buttons from "./buttons";
import { useDispatch } from "react-redux";
import { logOut } from "../../../redux/slices/authSlice/authSlice";

const USER_TYPE_ID = {
  1: buttonDataCompanies,
  2: buttonDataCollaborators,
  3: buttonDataProfessionals,
  4: buttonDataAdmin,
};

const NavItems = ({ userTypeId }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();

  const redirect = (buttonTitle, redirect) => {
    if (!redirect) {
      console.log(`Route for ${buttonTitle} is not implemented`);
      return;
    }
    navigate(`/dashboard/${redirect}`);
  };

  const buttons = USER_TYPE_ID[userTypeId] || [];

  return (
    <>
      {buttons.map((button) => (
        <Buttons
          className="sidebarButtons"
          title={button.title}
          icon={button.icon}
          key={button.title}
          selected={location.pathname.includes(`/${button.redirect}`)}
          onClick={() => redirect(button.title, button.redirect)}
        />
      ))}
      <Buttons
        className="sidebarButtons"
        title="Salir"
        icon={<LogoutIcon style={{ fontSize: "30px" }} />}
        selected={location.pathname.includes("/logout")}
        onClick={() => dispatch(logOut())}
      />
    </>
  );
};

NavItems.propTypes = {
  userTypeId: PropTypes.number,
};

export default NavItems;
