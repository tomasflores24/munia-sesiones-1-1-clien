import "./CardsStatistics.scss";

const CardsStatistics = () => {
  return (
    <div className="cards-container">
      <div className="card">
        <div className="card__value">70</div>
        <div className="card__title">usuarios</div>
      </div>
      <div className="card">
        <div className="card__value">5</div>
        <div className="card__title">usuarios</div>
      </div>
      <div className="card">
        <div className="card__value">3</div>
        <div className="card__title">psicologos</div>
      </div>
    </div>
  );
};

export default CardsStatistics;
