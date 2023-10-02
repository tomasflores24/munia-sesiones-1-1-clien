import './MembershipsMainStyle.scss';
import MembershipCard from '../../../components/MembershipModal/MembershipCard/MembershipCard';
import { memberships } from '../../../components/MembershipModal/memberships';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const MembershipsMain = () => {
  return (
    <div className='membership-root'>
      <header className='membership-header'>
        <nav className='membership-navbar'>
          <figure>
            <img
              src='/assets/logoMunia.png'
              alt='Munia-logo'
              className='logo'
            />
          </figure>
        </nav>
      </header>
      <div className='membership-content'>
        <main className='membership-main'>
          <h3 className='membership-title'>
            Elige tu Camino hacia el Bienestar Mental
          </h3>
          <p className='membership-paragraph'>
            Nuestras membresías están diseñadas para fomentar el desarrollo de
            habilidades y competencias orientadas a generar bienestar integral
            en la vida. Desde opciones esenciales hasta experiencias premium,
            tenemos la solución perfecta para cada individuo y empresa que busca
            el equilibrio emocional y la salud mental óptima.
          </p>
          <section className='section-cards'>
            <div className='arrow-container'>
              <ArrowBackIosNewIcon className='arrowIcon' fontSize='large' />
            </div>
            <div className='membership-container'>
              {memberships.map((membership) => (
                <div className='membership-card' key={membership.id}>
                  <MembershipCard
                    levels={membership.levels}
                    infoMessage={'Precio único por membresía'}
                    price={membership.price}
                    backgroundColor={membership.backgroundColor}
                    description={membership.description}
                    benefits={membership.benefits}
                    handleFunction={() => {
                      console.log('click');
                    }}
                  />
                </div>
              ))}
            </div>
            <div className='arrow-container'>
              <ArrowForwardIosIcon className='arrowIcon' fontSize='large' />
            </div>
          </section>
        </main>
      </div>
      <footer className='membership-footer'></footer>
    </div>
  );
};

export default MembershipsMain;
