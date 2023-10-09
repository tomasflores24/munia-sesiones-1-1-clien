import { useSelector } from "react-redux";
import LayoutDashboard from "../Layout/LayoutDashboard";
import MembershipsMain from "./MembershipsMain";
import MembershipsAdmin from "./membershipsAdmin/MembershipsAdmin";
import LoadingSpinner from "../../../shared/loadingSpinner/LoadingSpinner";
import { useState } from "react";

LayoutDashboard;

const Memberships = () => {
  const [isLoading, setIsloading] = useState(false);
  const user = useSelector((state) => state.auth.auth.user.userTypeId);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {user === 1 || user === 2 || user === 3 ? <MembershipsMain /> : null}

          {user === 4 ? <MembershipsAdmin /> : null}
        </>
      )}
    </>
  );
};

export default Memberships;
