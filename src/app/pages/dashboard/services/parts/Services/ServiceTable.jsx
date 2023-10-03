// import React from "react";
import propTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

const ServiceTable = ({ services, onEdit, onView }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell>Duración</TableCell>
            <TableCell>Categoría</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {services.map((service) => (
            <TableRow key={service.id}>
              <TableCell>{service.nombre}</TableCell>
              <TableCell>{service.descripcion}</TableCell>
              <TableCell>{service.precio}</TableCell>
              <TableCell>{service.duracion}</TableCell>
              <TableCell>{service.categoria}</TableCell>
              <TableCell>
                <Button variant="outlined" onClick={() => onEdit(service)}>
                  Editar
                </Button>
                <Button variant="outlined" onClick={() => onView(service)}>
                  Ver
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};


ServiceTable.propTypes = {
    services: propTypes.array.isRequired,
    onEdit: propTypes.func.isRequired,
    onView: propTypes.func.isRequired,
};
    

export default ServiceTable;
