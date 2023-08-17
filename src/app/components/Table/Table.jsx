import './Table.scss'
import CloseIcon from '@mui/icons-material/Close';
//import CheckCircleIcon from '@mui/icons-material/CheckCircle';
//import CancelIcon from '@mui/icons-material/Cancel'; 
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SettingsIcon from '@mui/icons-material/Settings';


const Table = () => {

    return(
        <div className='all'>
            {/* <NavBar /> */}
            <div className='TopContainer'>
                <p>Citas programadas</p>
                <button className='ButtonNewDate'>Nueva Cita +</button>
            </div>
            <div className='TopContainerTitles'>
                <div className='BoxTitle BoxTitleBorder'>
                    <p className='pTitle '>Pacientes</p>
                </div>
                <div className='BoxTitle BoxTitleBorder'>
                    <p className='pTitle '>Fecha y hora</p> 
                </div>
                <div className='BoxTitle BoxTitleBorder'>
                    <p className='pTitle '>Tipo de servicio</p>
                </div>
                <div className='BoxTitle BoxTitleBorder'>
                    <p className='pTitle '>Estado de la cita</p>
                </div>
                <div className='BoxTitle '>
                    <p className='pTitle '>Acciones</p>
                </div>
            </div>
            {
            <div className='CardsContainer'>
                <div className='BoxCards BoxCardsBorder'>
                    <p className='pCards'>Juan Pablo Osudar</p>
                </div>
                <div className='BoxCards BoxCardsBorder BoxCardsDate'>
                    <p className='pCards'>Mie. 16 - 08 - 2023</p>
                    <p className='pCards'>13:30pm</p>
                </div>
                <div className='BoxCards BoxCardsBorder BoxCardsServices'>
                    <div className='BoxCardsBackground'>
                        <p className='pCards pCardsLimit '>Nutrición y/o trastornos alimenticios</p>
                    </div>
                </div>
                <div className='BoxCards BoxCardsBorder'>
{/*                     {
                    <div className='BoxCardsState'>
                        <p className='pCards pCardsStatus'>Confirmado</p>
                        <CheckCircleIcon className='ImgConfirm' />
                    </div>
                    } 
                     
                    {
                    <div className='BoxCardsState'>
                        <p className='pCards pCardsStatus'>Cancelado</p>
                        <CancelIcon className='ImgDenied'/>
                    </div>
                    }
                  */}
                    {
                    <div className='BoxCardsState'>
                        <p className='pCards pCardsStatus'>Reprogramado</p>
                        <AccessTimeIcon className='ImgRescheduled' />
                    </div>
                    }  
                </div>
                <div>
                    <div className='BoxCards BoxCardsButtonsActions'>
                        <SettingsIcon className='ImgSettings' />
                        <CloseIcon className='ImgSettings ImgSettingsRed' />
                    </div>
                </div>
            </div>
            }   
        </div>
    )
}

export default Table;