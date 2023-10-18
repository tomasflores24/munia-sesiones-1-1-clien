/* import PropTypes from "prop-types"; */
import React from "react";
import { Button, Dialog, DialogContent, IconButton, useMediaQuery } from "@mui/material";
import idIcon from '/assets/idIcon.svg';
import displomaIcon from '/assets/diplomaIcon.svg';
import proCardIcon from '/assets/proCardIcon.svg';
import portfolioServiciosIcon from '/assets/portfolioServiciosIcon.svg';
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import './ModalAcceptance.scss'

const ModalAcceptance = ({ openModal, closeModal, data}) => {

    return (
        <Dialog open={openModal} onClose={closeModal}>
            <DialogContent>
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
                            <a
                                href={data?.dniDoc}
                                download
                            >
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
                            <a
                                href={data?.universityDegree}
                                download
                            >
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
                            <a
                                href={data?.profesionalCard}
                                download
                            >
                                <IconButton>
                                    <FileDownloadIcon color="tertiary" />
                                </IconButton>
                            </a>
                        </div>
                    </div>
                    <div className="provider__profile__documents">
                        <div className="provider__profile__documents__label">
                            Portfolio de servicios
                        </div>
                        <div className="provider__profile__documents__logo">
                            <img
                                className="provider__profile__documents__logo__icon"
                                src={portfolioServiciosIcon}
                            />
                        </div>
                        <div className="provider__profile__documents__buttons__container">
                            <a
                                href={data?.curriculum}
                                download
                            >
                                <IconButton>
                                    <FileDownloadIcon color="tertiary" />
                                </IconButton>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="provider__buttons__container">
                    <Button variant="contained" >Aceptar</Button>
                    <Button variant="contained" >Rechazar</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ModalAcceptance;