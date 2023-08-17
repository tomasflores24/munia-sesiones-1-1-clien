import PropTypes from 'prop-types';
import "./Buttons.scss"

Buttons.propTypes = {
    icon: PropTypes.element.isRequired,
    title: PropTypes.string.isRequired,
    selected: PropTypes.bool,
    onClick: PropTypes.func
};

export default function Buttons(props) {
    return (
        <button className={`button-sideBar ${props.selected ? "selected" : ""}`} onClick={props.onClick}>
            {props.icon}
            <span className='span'>{props.title}</span>
        </button>
    );
}
