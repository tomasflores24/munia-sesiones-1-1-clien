import { Button } from "@mui/material";
import CommentModal from "../../../components/CommentModal/CommentModal";
import { useState } from "react";
import "./EndAppointment.scss"

const EndAppointment = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true)
    }
    const handleCloseModal = () => {
        setIsModalOpen(false)
    }
    
    return (
        <div className="root__container">
            <header className="header__container">
                <h1>Cita finalizada</h1>
            </header>
            <section className="section__container">
                <Button
                    onClick={handleOpenModal}
                >Finalizar cita</Button>
                <CommentModal
                    openModal={isModalOpen}
                    handleCloseModal={handleCloseModal}
                />
            </section>
        </div>
    )
}

export default EndAppointment;