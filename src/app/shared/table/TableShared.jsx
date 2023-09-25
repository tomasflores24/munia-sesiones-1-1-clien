import React, { useState, useEffect } from "react";
import "./TableShared.scss";
import ClientsRows from "./components/ClientsRows";
import AppointmentRows from "./components/AppointmentRows";
import { TablePagination } from "@mui/material";

const TableShared = ({ headers, data, currentPage }) => {
  const [dataTableFilter, setDataTableFilter] = useState(data);
  const [itemsPaginator, setItemsPaginator] = useState(5);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event,newPage) => {
    if(false){
      console.log(event)
    }
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    HandleUpdateTableChangePage();
  }, [page]);

  const HandleUpdateTableChangePage = () => {
    let indexInicio = page * rowsPerPage;
    let indexFinal = indexInicio + rowsPerPage;
    let filterData = data.slice(indexInicio, indexFinal);
    setItemsPaginator(data.length);
    setDataTableFilter([...filterData]);
  };


  useEffect(() => {
    if (data) {
      setItemsPaginator(data.length);
      setDataTableFilter(data);
    }
  }, [data]);

  useEffect(() => {
    let filterData = data.slice(0, rowsPerPage);
    // Actualiza datos de la tabla
    setDataTableFilter([...filterData]);
  }, [rowsPerPage]);

  return (
    <div className="table__root">
      <div className="shared_table__root">
        <div className="headers">
          {headers.map((header) => (
            <div className="header__title">{header}</div>
          ))}
        </div>
        {currentPage === "Clients" ? (
          <ClientsRows data={dataTableFilter} />
        ) : null}
        {currentPage === "Appointment" ? <AppointmentRows /> : null}
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

export default TableShared;
