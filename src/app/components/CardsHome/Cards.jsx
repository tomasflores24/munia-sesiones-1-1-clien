import { NavLink } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const Card = ({ to, imgComponent, title, variables }) => {
    return (
        <NavLink className='Link' to={to}>
            <div className='Cards'>
                <div className='ImgContainer'>
                {imgComponent}
                </div>
                <div className='Title'>
                {title}
                </div>
                <div className='Variables'>
                {variables}
                </div>
            </div>
        </NavLink>
    );
};

export default Card;