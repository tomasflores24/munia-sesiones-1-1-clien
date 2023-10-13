import Card from "../../../components/CardsHome/Cards"
import EventNoteIcon from '@mui/icons-material/EventNote';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import PeopleIcon from '@mui/icons-material/People';
import TextsmsIcon from '@mui/icons-material/Textsms';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SettingsIcon from '@mui/icons-material/Settings';
import './Home.scss'
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.auth.auth.user.userTypeId);
  
  return (

    <div className='AllHome'>
      <div className='HomeContainer '>
        <div className='ContainerCards'>
          {user === 1 || user === 4 || user === 3 ?

            <Card to='/dashboard/statistics' imgComponent={<AnalyticsIcon className='Img' />} title='Estadísticas' variables='.-' />
            : null
          }
          {user === 1 || user === 3 || user === 2 ?
            <Card to='/dashboard/appointments/create' imgComponent={<EventNoteIcon className='Img' />} title='Agendar' variables='.-' />
            : null
          }
          {user === 3 || user === 4 ?
            <Card to='/dashboard/comments' imgComponent={<TextsmsIcon className='Img' />} title='Comentarios' variables='1130' />
            : null
          }
          {user === 1 || user === 4 ?
            <Card to='/dashboard/memberships' imgComponent={<SettingsIcon className='Img' />} title='Membresías' variables='.-' />
            : null
          }
          {user === 4 ?
            <>
              <Card to='/dashboard/clients' imgComponent={<PeopleIcon className='Img' />} title='Clientes' variables='37' />
              <Card to='/dashboard/providers' imgComponent={<PsychologyIcon className='Img' />} title='Proveedores' variables='5' />
            </>
            : null
          }
        </div>
      </div>
    </div>
  )
}

export default Home
