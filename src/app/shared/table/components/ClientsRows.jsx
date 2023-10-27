import React from "react";
import { format } from "date-fns";

const ClientsRows = ({ data }) => {
  return (
    <div className="shared_table-body">
      {data.map((client, index) => (
        <div className="row-table-container" key={index}>
          <div className="data-row-tag">
            <div className="imageName__wrapper">
              <img src={client.user.profilePic} alt="picture" className="complete-img"/>
            </div>
          </div>
          <div className="data-row-tag ">
            <div className="imageName__wrapper">
              <p>{client.user.name}</p>
            </div>
          </div>
          <div className="data-row-tag">
            {format(new Date(client.user.createdAt), "dd/MM/yyyy HH:mm")}
          </div>
          <div className="data-row-tag">
            {client.purchase_membership.length !== 0
              ? client.purchase_membership[0].membership.name
              : "No tiene membresia"}
          </div>
          <div className="data-row-tag">{client.user.country.name}</div>
          <div className="data-row-tag">{client.collaborator}</div>
          <div className="data-row-tag">{client.user.email}</div>
          <div className="data-row-tag">
            {client.purchase_membership.length !== 0
              ? client.purchase_membership[0].amountHistory
              : 0}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClientsRows;
