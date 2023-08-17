import PropTypes from 'prop-types';
import "./Buttons.scss"

Buttons.propTypes = {
    icon: PropTypes.element.isRequired,
    title: PropTypes.string.isRequired
};

export default function Buttons(props) {
    return (
        <button className="button-sideBar">
            {props.icon}
            {props.title}
        </button>
    );
}
