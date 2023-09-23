import React from "react";

const ClientsRows = ({ data }) => {
  // console.log(data);
  return (
    <>
      {data.map((client) => (
        <div className="shared_table-body">
          <div className="rows">
            <p className="pCards">{client.user.name}</p>
          </div>
          <div className="rows">
            <p className="pCards">parrafo</p>
          </div>
          <div className="rows">
            <p className="pCards">parrafo</p>
          </div>
          <div className="rows">
            <p className="pCards">{client.user.city}</p>
          </div>
          <div className="rows">
            <p className="pCards">parrafo</p>
          </div>
          <div className="rows">
            <p className="pCards">{client.user.email}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default ClientsRows;
