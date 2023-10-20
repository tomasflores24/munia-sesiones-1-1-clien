import { Button } from "@mui/material";

const EndAppointment = () => {
    return (
        <>
            <h1>Cita finalizada</h1>
            <a href="http://localhost:5173/dashboard/appointments">
                <Button>Finalizar cita</Button>
            </a>
        </>
    )
}

export default EndAppointment;