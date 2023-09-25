import React from "react";
import { format } from "date-fns";

const ClientsRows = ({ data }) => {
  console.log(new Date(data[0].user.createdAt));
  return (
    <div className="shared_table-body">
      {data.map((client, index) => (
        <div className="row-table-container" key={index}>
          <div className="data-row-tag">{client.user.name}</div>
          <div className="data-row-tag">
            {format(new Date(client.user.createdAt), "dd/MM/yyyy HH:mm")}
          </div>
          <div className="data-row-tag">parrafo</div>
          <div className="data-row-tag">{client.user.country.name}</div>
          <div className="data-row-tag">parrafo</div>
          <div className="data-row-tag">{client.user.email}</div>
        </div>
      ))}
    </div>
  );
};

export default ClientsRows;
