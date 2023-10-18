/* import PropTypes from "prop-types"; */
import React from "react";
import { Button, Dialog, DialogContent, IconButton } from "@mui/material";
import idIcon from "/assets/idIcon.svg";
import displomaIcon from "/assets/diplomaIcon.svg";
import proCardIcon from "/assets/proCardIcon.svg";
import portfolioServiciosIcon from "/assets/portfolioServiciosIcon.svg";
import masterDegreeIcon from "/assets/masterDegreeIcon.svg"
import bankCertificate from "/assets/bankCertificate.svg"
import curriculum from "/assets/curriculum.svg"
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import "./ModalAcceptance.scss";
import { useMutation } from "react-query";
import { approvalServices } from "../../../../services/dashboard/approval/approval.services";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../../shared/loadingSpinner/LoadingSpinner";

const ModalAcceptance = ({ openModal, closeModal, data }) => {
  const { isLoading, mutate } = useMutation(
    ["accept"],
    approvalServices.accept,
    {
      onSuccess: () => {
        toast.success("Usuario Aceptado con exito");
        setTimeout(() => {
          closeModal();
        }, 3000);
      },
      onError: () => {
        toast.error("Ha ocurrido un error");
      },
    }
  );

  const { isLoading: isLoadingReject, mutate: mutateReject } = useMutation(
    ["reject"],
    approvalServices.reject,
    {
      onSuccess: () => {
        toast.success("Usuario Rechazado con éxito");

        setTimeout(() => {
          closeModal();
        }, 3000);
      },
      onError: () => {
        toast.error("Ha ocurrido un error");
      },
    }
  );

  const handleAccept = () => mutate(data.UserId);
  const handleReject = () => {
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
        mutateReject(data.UserId);
      }
    });
  };

  return (
    <Dialog
      className="modal__dialog"
      open={openModal}
      onClose={closeModal}
      sx={{
        zIndex: 0,
      }}
    >
      <DialogContent className="modal__dialog__content">
        {isLoading || isLoadingReject ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="provider__container">
              <div className="provider__profile__documents">
                <div className="provider__profile__documents__label">
                  Documento de identidad
                </div>
                <div className="provider__profile__documents__logo">
                  <img
                    className="provider__profile__documents__logo__icon"
                    src={idIcon}
                  />
                </div>
                <div className="provider__profile__documents__buttons__container">
                  <a href={data?.dniDoc} download>
                    <IconButton>
                      <FileDownloadIcon color="tertiary" />
                    </IconButton>
                  </a>
                </div>
              </div>
              <div className="provider__profile__documents">
                <div className="provider__profile__documents__label">
                  Diploma de grado
                </div>
                <div className="provider__profile__documents__logo">
                  <img
                    className="provider__profile__documents__logo__icon"
                    src={displomaIcon}
                  />
                </div>
                <div className="provider__profile__documents__buttons__container">
                  <a href={data?.universityDegree} download>
                    <IconButton>
                      <FileDownloadIcon color="tertiary" />
                    </IconButton>
                  </a>
                </div>
              </div>
              <div className="provider__profile__documents">
                <div className="provider__profile__documents__label">
                  Tarjeta profesional
                </div>
                <div className="provider__profile__documents__logo">
                  <img
                    className="provider__profile__documents__logo__icon"
                    src={proCardIcon}
                  />
                </div>
                <div className="provider__profile__documents__buttons__container">
                  <a href={data?.profesionalCard} download>
                    <IconButton>
                      <FileDownloadIcon color="tertiary" />
                    </IconButton>
                  </a>
                </div>
              </div>
              <div className="provider__profile__documents">
                <div className="provider__profile__documents__label">
                  Currículum
                </div>
                <div className="provider__profile__documents__logo">
                  <img
                    className="provider__profile__documents__logo__icon"
                    src={curriculum}
                  />
                </div>
                <div className="provider__profile__documents__buttons__container">
                  <a href={data?.curriculum} download>
                    <IconButton>
                      <FileDownloadIcon color="tertiary" />
                    </IconButton>
                  </a>
                </div>
              </div>
              <div className="provider__profile__documents">
                <div className="provider__profile__documents__label">
                  Diploma de maestría
                </div>
                <div className="provider__profile__documents__logo">
                  <img
                    className="provider__profile__documents__logo__icon"
                    src={masterDegreeIcon}
                  />
                </div>
                <div className="provider__profile__documents__buttons__container">
                  <a href={data?.masterDegree} download>
                    <IconButton>
                      <FileDownloadIcon color="tertiary" />
                    </IconButton>
                  </a>
                </div>
              </div>
              <div className="provider__profile__documents">
                <div className="provider__profile__documents__label">
                  Certificación bancaria
                </div>
                <div className="provider__profile__documents__logo">
                  <img
                    className="provider__profile__documents__logo__icon"
                    src={bankCertificate}
                  />
                </div>
                <div className="provider__profile__documents__buttons__container">
                  <a href={data?.bankCertification} download>
                    <IconButton>
                      <FileDownloadIcon color="tertiary" />
                    </IconButton>
                  </a>
                </div>
              </div>
            </div>
            <div className="provider__buttons__container">
              <Button variant="contained" onClick={handleAccept}>
                Aceptar
              </Button>
              <Button variant="contained" onClick={handleReject}>
                Rechazar
              </Button>
            </div>
          </>
        )}
      </DialogContent>
      <Toaster position="top-center" />
    </Dialog>
  );
};

export default ModalAcceptance;
