import './MembershipCardStyle.scss';
import PropTypes from 'prop-types';
import CheckIcon from '@mui/icons-material/Check';
import CustomButton from '../CustomButton/CustomButton';

const MembershipCard = ({
  levels,
  infoMessage,
  price,
  description,
  benefits,
  backgroundColor,
  handleFunction,
  textButton,
}) => {
  const boxStyle = {
    backgroundColor: backgroundColor,
  };
  return (
    <>
      <div className='box-root'>
        <div>
          <header className='box-header' style={boxStyle}>
            <h4 className='box-title'>{levels}</h4>
          </header>
          <section className='box-content'>
            <div className='box-info'>{infoMessage}</div>
            <div className='box-price'>{price}</div>
            <div className='box-description'>{description}</div>
            <div className='box-benefits'>
              {benefits.map((benefit) => (
                <div key={benefit.id} className='benefits-container'>
                  <span>
                    <CheckIcon className='benefit-icon' />
                  </span>
                  <div className='benefit-paragraphs'>
                    <p key={benefit.id} className='benefit-paragraph'>
                      {benefit.benefit}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
        <section className='box-footer'>
          {textButton ? (
            <CustomButton
              textButton={textButton}
              className={'select-button'}
              handleFunction={handleFunction}
            />
          ) : (
            ''
          )}
        </section>
      </div>
    </>
  );
};

MembershipCard.propTypes = {
  levels: PropTypes.string,
  infoMessage: PropTypes.string,
  price: PropTypes.string,
  description: PropTypes.string,
  benefits: PropTypes.arrayOf(PropTypes.object),
  backgroundColor: PropTypes.string,
  textButton: PropTypes.string,
  handleFunction: PropTypes.func,
};

export default MembershipCard;
