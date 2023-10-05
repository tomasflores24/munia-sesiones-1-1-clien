import "./Services.Style.scss";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  Paper,
  Grid,
} from "@mui/material";
import ServiceModal from "./parts/ServiceModal/ServiceModal";
import { ServiceServices } from "../../../services/dashboard/service/service.service";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../shared/loadingSpinner/LoadingSpinner";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

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
// color la letra de el boton cancelar a #AE7A6C
  const alertdeleteService = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#AE7A6C",
      cancelButtonColor: "#AE7A6C", 
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
    <div className="service-container">
      <div className="service-header">
        <h1 className="service-title">Listado de Servicios</h1>
        <Button
          className="button-service"
          variant="contained"
          onClick={openCreateModal}
        >
          Crear Servicio
        </Button>
      </div>

      <Grid container className="service-grid">
        {isSuccess && !isLoading ? (
          services.data.map((service) => (
            <Grid key={service.id} className="service-grid-item">
              <Card className="service-card">
                <CardContent className="service-card-content">
                  <Typography variant="h5">{service.name}</Typography>
                </CardContent>
                <CardActions className="service-card-actions">
                  <Button onClick={() => openEditModal(service)}>
                    <EditIcon />
                  </Button>
                  <Button onClick={() => openViewModal(service)}>
                    <VisibilityIcon />
                  </Button>
                  <Button
                    onClick={() => {
                      setSelectedService(service);
                      alertdeleteService();
                    }}
                  >
                    <DeleteIcon />
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Paper elevation={3} className="service-empty">
            <Typography variant="body1">
              No hay servicios disponibles.
            </Typography>
          </Paper>
        )}
      </Grid>

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
          initialData={{
            name: selectedService.name,
            CategoryId: selectedService.CategoryId,
          }}
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
