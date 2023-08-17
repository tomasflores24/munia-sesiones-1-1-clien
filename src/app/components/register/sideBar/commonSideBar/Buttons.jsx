import PropTypes from 'prop-types';
import "./Buttons.scss"

Buttons.propTypes = {
    icon: PropTypes.element.isRequired,
    title: PropTypes.string.isRequired,
    selected: PropTypes.bool
};

export default function Buttons(props) {
    return (
        <button className={`button-sideBar ${props.selected ? "selected" : ""}`}>
            {props.icon}
            <span className='span'>{props.title}</span>
        </button>
    );
}
