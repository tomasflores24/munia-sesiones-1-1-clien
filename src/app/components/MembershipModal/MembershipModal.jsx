import './MembershipModalStyle.scss';
import MembershipCard from './MembershipCard/MembershipCard';
import CustomButton from './CustomButton/CustomButton';
import { memberships } from './memberships';

const MembershipModal = ({ openModal, handleCloseModal }) => {
  return (
    <>
      {openModal && (
        <div className='modal-root'>
          <section className='modal-content'>
            <header className='modal-header'>
              <span>Seleccionar membresía del cliente</span>
            </header>
            <section className='modal-body'>
              <div className='modal-cards'>
                {memberships.map((membership) => (
                  <div className='card' key={membership.id}>
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
            </section>
            <section className='modal-footer'>
              <CustomButton
                textButton={'Finalizar'}
                className={'modal-button'}
                handleFunction={handleCloseModal}
              />
            </section>
          </section>
        </div>
      )}
    </>
  );
};

export default MembershipModal;
