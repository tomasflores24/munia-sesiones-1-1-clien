import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import ServiceModal from "./parts/Services/ServiceModal";
import { ServiceServices } from "../../../services/dashboard/service/service.service";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../shared/loadingSpinner/LoadingSpinner";

function Service() {
  const queryClient = useQueryClient();
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const {
    data: services,
    isLoading,
    isSuccess,
  } = useQuery("services", ServiceServices.getAllServices);

  const createServiceMutation = useMutation(ServiceServices.createService, {
    onSuccess: () => {
      queryClient.invalidateQueries("services");
      setCreateModalOpen(false);
    },
  });

  const updateServiceMutation = useMutation(ServiceServices.updateService, {
    onSuccess: () => {
      queryClient.invalidateQueries("services");
      setEditModalOpen(false);
    },
  });

  const deleteServiceMutation = useMutation(ServiceServices.deleteService, {
    onSuccess: () => {
      queryClient.invalidateQueries("services");
      setViewModalOpen(false);
    },
  });

  const openCreateModal = () => {
    setCreateModalOpen(true);
    setSelectedService(null);
  };

  const openEditModal = (service) => {
    setSelectedService(service);
    setEditModalOpen(true);
  };

  const openViewModal = (service) => {
    setSelectedService(service);
    setViewModalOpen(true);
  };

  const handleDeleteService = async () => {
    if (selectedService) {
      await deleteServiceMutation.mutateAsync(selectedService.id);
      setSelectedService(null);
    }
  };

  const alertdeleteService = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00A7AF",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteService();
        Swal.fire("¡Eliminado!", "El servicio ha sido eliminado.", "success");
      }
    });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div>
        <h1>Listado de Servicios</h1>
        <Button variant="contained" onClick={openCreateModal}>
          Crear Servicio
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Servicios</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isSuccess && !isLoading ? (
              services.data.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>{service.name}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => openEditModal(service)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => openViewModal(service)}
                    >
                      Ver
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setSelectedService(service);
                        alertdeleteService();
                      }}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>No hay servicios disponibles.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {isCreateModalOpen && (
        <ServiceModal
          isOpen={isCreateModalOpen}
          onClose={() => setCreateModalOpen(false)}
          onSubmit={createServiceMutation.mutateAsync}
          title="Crear Servicio"
          isCreateMode={true}
        />
      )}

      {isEditModalOpen && (
        <ServiceModal
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          onSubmit={(data) =>
            updateServiceMutation.mutateAsync({
              id: selectedService.id,
              name: data.name,
              CategoryId: data.CategoryId,
            })
          }
          title="Editar Servicio"
          initialData={selectedService}
        />
      )}

      {isViewModalOpen && (
        <ServiceModal
          isOpen={isViewModalOpen}
          onClose={() => setViewModalOpen(false)}
          title="Ver Servicio"
          isViewMode={true}
          onCloseButton={true}
          initialData={selectedService}
        />
      )}
    </div>
  );
}

export default Service;
