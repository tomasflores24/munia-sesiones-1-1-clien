import SideBar from '../../components/sideBar/SideBar';
import Card from '../../components/CardsHome/Cards';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import PeopleIcon from '@mui/icons-material/People';
import TextsmsIcon from '@mui/icons-material/Textsms';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SettingsIcon from '@mui/icons-material/Settings';
import './Home.scss'

const Home = () => {
  return (
    <div className='AllHome'>
      <SideBar />
      <div className='HomeContainer'>
        <div className='ContainerCards'>
          <Card to='/admin/agenda' imgComponent={<EventNoteIcon className='Img' />} title='Agenda' variables='.-' />
          <Card to='/admin/statistics' imgComponent={<AnalyticsIcon className='Img' />} title='Estadísticas' variables='.-' />
          <Card to='/admin/clients' imgComponent={<PeopleIcon className='Img' />} title='Clientes' variables='37' />
          <Card to='/admin/comments' imgComponent={<TextsmsIcon className='Img' />} title='Comentarios' variables='1130' />
          <Card to='/admin/providers' imgComponent={<PsychologyIcon className='Img' />} title='Proveedores' variables='5' />
          <Card to='/admin/memberships' imgComponent={<SettingsIcon className='Img' />} title='Membresías' variables='.-' />
        </div>
      </div>
    </div>
  );
};

export default Home;
