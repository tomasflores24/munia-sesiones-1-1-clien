import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import "./TableShared.scss";
import ClientsRows from "./components/ClientsRows";
import AppointmentRows from "./components/AppointmentRows";
import { TablePagination } from "@mui/material";
import ProvidersRows from "./components/ProvidersRows";
import CollaboratorsRows from "./components/CollaboratorsRows";

const TableShared = ({
  headers,
  data,
  currentPage,
  onEdit,
  onDelete,
  openModal,
}) => {
  const [dataTableFilter, setDataTableFilter] = useState(data);
  const [itemsPaginator, setItemsPaginator] = useState(5);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    console.log(event);

    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    if (data) {
      let startIndex = page * rowsPerPage;
      let endIndex = startIndex + rowsPerPage;
      if (currentPage === "Appointment") {
        let filterData = data?.data?.slice(startIndex, endIndex);
        setItemsPaginator(data.data.length);
        setDataTableFilter([...filterData]);
      } else {
        let filterData = data?.slice(startIndex, endIndex);
        setItemsPaginator(data.length);
        setDataTableFilter([...filterData]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, data]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (currentPage === "Appoiment") {
      let filterData = data?.data?.slice(0, rowsPerPage);
      // Actualiza datos de la tabla
      setDataTableFilter([...filterData]);
    } else {
      let filterData = data.slice(0, rowsPerPage);
      setDataTableFilter([...filterData]);
    }
  }, [rowsPerPage]);

  return (
    <div className="table__root">
      <div className="shared_table__root">
        <div className="headers">
          {headers.map((header, i) => (
            <div className="header__title" key={i}>
              {header}
            </div>
          ))}
        </div>
        {currentPage === "Clients" ? (
          <ClientsRows data={dataTableFilter} />
        ) : null}
        {currentPage === "Appointment" ? (
          <AppointmentRows
            data={dataTableFilter}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ) : null}
        {currentPage === "Providers" ? (
          <ProvidersRows data={dataTableFilter} openModal={openModal} />
        ) : null}
        {currentPage === "Collaborators" ? (
          <CollaboratorsRows data={dataTableFilter} openModal={openModal} />
        ) : null}
        {/* Paginador */}
        <section className="section-paginador-table">
          <TablePagination
            component="div"
            rowsPerPageOptions={[5, 10, 25]}
            count={itemsPaginator}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            className="pagination-componente"
          />
        </section>
      </div>
    </div>
  );
};

TableShared.propTypes = {
  data: PropTypes.array.isRequired,
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentPage: PropTypes.oneOf([
    "Clients",
    "Appointment",
    "Providers",
    "Collaborators",
  ]).isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  openModal: PropTypes.func,
};

export default TableShared;
