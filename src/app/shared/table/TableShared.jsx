import React from "react";
import "./TableShared.scss";
import ClientsRows from "./components/ClientsRows";
import AppointmentRows from "./components/AppointmentRows";

const TableShared = ({ headers, data, currentPage }) => {

  return (
    <div className="shared_table__root">
      <div className="headers">
        {headers.map((header) => (
          <div className="header__title">
            <p className="header">{header}</p>
          </div>
        ))}
      </div>
      <div className="shared_table_rows">
        {currentPage === "Clients" ? <ClientsRows data={data} /> : null}
        {currentPage === "Appointment" ? <AppointmentRows /> : null}
      </div>
    </div>
  );
};

export default TableShared;
