import PropType from "prop-types";
import CheckIcon from "@mui/icons-material/Check";

import "./MembershipBoxStyle.scss";

const MembershipBox = ({
  title,
  price,
  description,
  list,
  titleBgColor,
  selectMembership,
  selected,
}) => {
  return (
    <div className={`membershipBox__root ${selected && "selected"}`}>
      <div
        style={{ backgroundColor: titleBgColor }}
        className="membershipBox__header"
      >
        <h3>{title}</h3>
      </div>
      <div className="membershipBox__body">
        <div className="membershipBox__content">
          <span className="titleDesc">precio único por membresía</span>
          <p className="body__price">{price}</p>
          {description && <p className="body__desc">{description}</p>}
          <ul className="body__list">
            {list.map((item, i) => (
              <li key={i} className="body__list-item">
                <CheckIcon className="check__icon" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="membershipBox__footer">
          <button
            type="button"
            className="select__button"
            onClick={selectMembership}
          >
            Seleccionar
          </button>
        </div>
      </div>
    </div>
  );
};

MembershipBox.propTypes = {
  title: PropType.string.isRequired,
  price: PropType.string.isRequired,
  description: PropType.string,
  list: PropType.arrayOf(PropType.string).isRequired,
  titleBgColor: PropType.string.isRequired,
  selectMembership: PropType.func.isRequired,
  selected: PropType.bool,
};

export default MembershipBox;
