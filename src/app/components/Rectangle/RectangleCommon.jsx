import "./RectangleCommon.scss";
const RectangleCommon = ({ Icon, text }) => {
  return (
    <div className="agendar__container">
      <Icon className="icon" />
      <h3 className="route">{text}</h3>
    </div>
  );
};

export default RectangleCommon;
